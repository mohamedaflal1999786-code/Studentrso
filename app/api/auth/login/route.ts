import { NextResponse } from 'next/server';
import {
  authenticateUser,
  checkLoginLockout,
  recordFailedLogin,
  resetLoginLockout,
  createSessionToken,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email or password is invalid.' }, { status: 400 });
    }

    // 1. Check if email is currently locked out (after 5 failed attempts -> 60s lockout)
    const lockCheck = checkLoginLockout(email);
    if (lockCheck.locked) {
      return NextResponse.json(
        {
          error: `Password entry locked for ${lockCheck.remainingSeconds} seconds due to repeated failed attempts.`,
          locked: true,
          remainingSeconds: lockCheck.remainingSeconds,
        },
        { status: 423 }
      );
    }

    const supabase = getSupabaseServerClient();

    // 2. Try Supabase Auth
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          resetLoginLockout(email);

          const { data: dbProfile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const profile = dbProfile || {
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || 'Student',
            onboarding_completed: false,
          };

          const sessionToken = createSessionToken(data.user.id, data.user.email || email);
          const response = NextResponse.json({
            message: 'Signed in successfully.',
            user: { id: data.user.id, email: data.user.email },
            profile,
          });

          response.cookies.set('student_rso_session', sessionToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
          });

          if (data.session?.access_token) {
            response.cookies.set('student_rso_access_token', data.session.access_token, {
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: data.session.expires_in || 3600,
              path: '/',
            });
          }

          return response;
        }
      } catch {
        // Fall through to local fallback
      }
    }

    // 3. Fallback: Local cryptographic store
    const authResult = authenticateUser(email, password);
    if (authResult.success && authResult.user) {
      resetLoginLockout(email);
      const token = createSessionToken(authResult.user.id, authResult.user.email);
      const response = NextResponse.json({
        message: 'Signed in successfully.',
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
        },
        profile: authResult.user.profile,
      });

      response.cookies.set('student_rso_session', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      response.cookies.set('student_rso_access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    // 4. Record failed attempt
    const failRecord = recordFailedLogin(email);
    if (failRecord.locked) {
      return NextResponse.json(
        {
          error: 'Password entry locked for 60 seconds due to repeated failed attempts.',
          locked: true,
          remainingSeconds: 60,
        },
        { status: 423 }
      );
    }

    return NextResponse.json(
      { error: 'Email or password is invalid.', locked: false },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: 'Email or password is invalid.' }, { status: 500 });
  }
}
