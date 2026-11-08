import { NextResponse } from 'next/server';
import {
  createSessionToken,
  authenticateOrRegisterGoogleUser,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      code?: unknown;
      access_token?: unknown;
      refresh_token?: unknown;
      expires_in?: unknown;
      provider?: unknown;
      user_id?: unknown;
      email?: unknown;
      full_name?: unknown;
      is_signup?: unknown;
    };

    const code = typeof body.code === 'string' ? body.code.trim() : '';
    const accessToken = typeof body.access_token === 'string' ? body.access_token.trim() : '';
    const expiresIn = typeof body.expires_in === 'number' ? body.expires_in : 3600;
    const isSignup = Boolean(body.is_signup);

    let userId = typeof body.user_id === 'string' ? body.user_id : '';
    let userEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    let fullName = typeof body.full_name === 'string' ? body.full_name : '';

    const supabase = getSupabaseServerClient();

    // 1. Check with Supabase Access Token
    if (accessToken && supabase) {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser(accessToken);

        if (!error && user) {
          userId = user.id;
          userEmail = user.email || userEmail;
          fullName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            fullName ||
            'Student';
        }
      } catch {
        // Continue
      }
    }

    // 2. PKCE Code Exchange on Server if code provided
    if (code && !userId && supabase) {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data?.user) {
          userId = data.user.id;
          userEmail = data.user.email || userEmail;
          fullName =
            data.user.user_metadata?.full_name ||
            data.user.user_metadata?.name ||
            fullName ||
            'Student';
        }
      } catch {
        // Continue
      }
    }

    // 3. Upsert user profile into Supabase
    if (userId && supabase) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .upsert(
          {
            id: userId,
            email: userEmail,
            full_name: fullName,
            state: 'Tamil Nadu',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select()
        .maybeSingle();

      const sessionToken = createSessionToken(userId, userEmail);
      const response = NextResponse.json({
        success: true,
        isNewUser: isSignup || !profile?.onboarding_completed,
        needsPassword: isSignup,
        user: { id: userId, email: userEmail },
        profile: profile || {
          id: userId,
          email: userEmail,
          full_name: fullName,
          onboarding_completed: false,
        },
      });

      response.cookies.set('student_rso_session', sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      if (accessToken) {
        response.cookies.set('student_rso_access_token', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: expiresIn,
          path: '/',
        });
      }

      return response;
    }

    // 4. Fallback: Authenticate or register simulated Google user
    const targetEmail =
      userEmail ||
      (typeof body.email === 'string' && body.email.includes('@')
        ? body.email
        : 'student.google@studentrso.in');
    const targetName = fullName || 'Google Student';

    const authResult = authenticateOrRegisterGoogleUser(targetEmail, targetName);
    const sessionToken = createSessionToken(authResult.user.id, authResult.user.email);

    const response = NextResponse.json({
      success: true,
      isNewUser: isSignup || !authResult.profile.onboarding_completed,
      needsPassword: isSignup,
      user: authResult.user,
      profile: authResult.profile,
    });

    response.cookies.set('student_rso_session', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    response.cookies.set('student_rso_access_token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Could not process authentication callback.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  if (error || errorDescription) {
    return NextResponse.redirect(
      new URL(
        `/auth/callback?error=${encodeURIComponent(errorDescription || error || 'Access denied')}`,
        request.url
      )
    );
  }

  if (code) {
    return NextResponse.redirect(
      new URL(`/auth/callback?code=${encodeURIComponent(code)}`, request.url)
    );
  }

  return NextResponse.redirect(new URL('/auth', request.url));
}
