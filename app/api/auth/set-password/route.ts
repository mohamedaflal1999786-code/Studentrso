import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, createSessionToken, hashPassword, getAccountByEmail } from '@/lib/auth-service';
import { getSupabaseServerClient, isUuid } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken =
      cookieStore.get('student_rso_session')?.value ||
      request.headers.get('cookie')?.match(/student_rso_session=([^;]+)/)?.[1];

    let userId = '';
    let userEmail = '';

    if (sessionToken) {
      const decoded = verifySessionToken(sessionToken);
      if (decoded && decoded.userId) {
        userId = decoded.userId;
        userEmail = decoded.email || '';
      }
    }

    const body = (await request.json()) as {
      password?: unknown;
      confirmPassword?: unknown;
      email?: unknown;
    };

    const password = typeof body.password === 'string' ? body.password : '';
    const confirmPassword = typeof body.confirmPassword === 'string' ? body.confirmPassword : '';
    const providedEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (providedEmail && !userEmail) {
      userEmail = providedEmail;
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Resolve real Supabase UUID when missing or non-UUID
    if (!isUuid(userId) && userEmail && supabase) {
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id, email, full_name')
          .eq('email', userEmail)
          .maybeSingle();

        if (profile?.id && isUuid(profile.id)) {
          userId = profile.id;
        } else {
          // Check Supabase Auth users list
          const { data: usersData } = await supabase.auth.admin.listUsers();
          const authUser = usersData?.users?.find(
            (u) => u.email?.toLowerCase() === userEmail
          );
          if (authUser?.id && isUuid(authUser.id)) {
            userId = authUser.id;
          }
        }
      } catch (err) {
        console.warn('Could not resolve user by email:', err);
      }
    }

    // If still no real Supabase UUID exists, create one in Supabase Auth when configured
    if (!isUuid(userId) && userEmail && supabase) {
      try {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: userEmail,
          password,
          email_confirm: true,
        });
        if (!createError && newUser?.user?.id && isUuid(newUser.user.id)) {
          userId = newUser.user.id;
        }
      } catch (err) {
        console.warn('Could not create new user via admin:', err);
      }
    }

    // Fallback to local account store
    if (!userId && userEmail) {
      const localAccount = getAccountByEmail(userEmail);
      if (localAccount?.id) {
        userId = localAccount.id;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Please enter your registered Google email address or sign in first.' },
        { status: 400 }
      );
    }

    // 1. Update password in Supabase Auth & profile only for real auth.users UUIDs
    if (supabase && isUuid(userId)) {
      try {
        const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
          password,
          email_confirm: true,
        });

        if (updateError) {
          console.error('Supabase password update error:', updateError.message);
        }

        // 2. Upsert profile with has_password flag when email is known
        if (userEmail) {
          await supabase
            .from('user_profiles')
            .upsert(
              {
                id: userId,
                email: userEmail,
                has_password: true,
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'id' }
            );
        } else {
          await supabase
            .from('user_profiles')
            .update({
              has_password: true,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
      } catch (err) {
        console.warn('Supabase DB update warning:', err);
      }
    }

    // Issue fresh session cookies so student is immediately signed in
    const newSessionToken = createSessionToken(userId, userEmail);
    const response = NextResponse.json({
      success: true,
      message: 'Password saved successfully! Opening your student dashboard...',
      user: { id: userId, email: userEmail },
    });

    response.cookies.set('student_rso_session', newSessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not set password.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
