import { NextResponse } from 'next/server';
import {
  createSessionToken,
  authenticateOrRegisterGoogleUser,
} from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      code?: unknown;
      access_token?: unknown;
      refresh_token?: unknown;
      expires_in?: unknown;
      provider?: unknown;
      email?: unknown;
      full_name?: unknown;
    };

    const code = typeof body.code === 'string' ? body.code.trim() : '';
    const accessToken = typeof body.access_token === 'string' ? body.access_token : '';
    const refreshToken = typeof body.refresh_token === 'string' ? body.refresh_token : '';
    const expiresIn = typeof body.expires_in === 'number' ? body.expires_in : 3600;
    const provider = typeof body.provider === 'string' ? body.provider : '';

    const supabase = getSupabaseServerClient();

    // 1. PKCE Code Exchange via Supabase
    if (code && supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error || !data.user) {
        return NextResponse.json(
          { error: error?.message || 'Failed to exchange authorization code.' },
          { status: 400 }
        );
      }

      const user = data.user;
      const userId = user.id;
      const userEmail = user.email || '';
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'Google Student';

      // Check existing database state to identify first-time vs existing student
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      let isNewUser = false;
      let profile = existingProfile;

      if (!existingProfile) {
        // First-time Google user: create safe initial profile with onboarding_completed = false
        isNewUser = true;
        const { data: newProfile } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            email: userEmail,
            full_name: fullName,
            state: 'Tamil Nadu',
            onboarding_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();
        profile = newProfile;
      }

      const sessionToken = createSessionToken(userId, userEmail);
      const response = NextResponse.json({
        success: true,
        isNewUser: isNewUser || !profile?.onboarding_completed,
        user: { id: userId, email: userEmail },
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

    // 2. Token Exchange with Supabase (if tokens supplied from implicit grant or client SDK)
    if (accessToken && supabase) {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (!error && user) {
        const userId = user.id;
        const userEmail = user.email || '';
        const fullName = user.user_metadata?.full_name || 'Google Student';

        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        let isNewUser = false;
        let profile = existingProfile;

        if (!existingProfile) {
          isNewUser = true;
          const { data: newProfile } = await supabase
            .from('user_profiles')
            .insert({
              id: userId,
              email: userEmail,
              full_name: fullName,
              state: 'Tamil Nadu',
              onboarding_completed: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single();
          profile = newProfile;
        }

        const sessionToken = createSessionToken(userId, userEmail);
        const response = NextResponse.json({
          success: true,
          isNewUser: isNewUser || !profile?.onboarding_completed,
          user: { id: userId, email: userEmail },
          profile,
        });

        response.cookies.set('student_rso_session', sessionToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60,
          path: '/',
        });
        response.cookies.set('student_rso_access_token', accessToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: expiresIn,
          path: '/',
        });

        return response;
      }
    }

    // 3. Fallback: Local Google Authentication Simulation
    const targetEmail = typeof body.email === 'string' && body.email.includes('@')
      ? body.email
      : 'student.google@studentrso.in';
    const fullName = typeof body.full_name === 'string' && body.full_name
      ? body.full_name
      : 'Google Student';

    const authResult = authenticateOrRegisterGoogleUser(targetEmail, fullName);
    const sessionToken = createSessionToken(authResult.user.id, authResult.user.email);

    const response = NextResponse.json({
      success: true,
      isNewUser: !authResult.profile.onboarding_completed,
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
    const message = err instanceof Error ? err.message : 'Could not process authentication callback.';
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
      new URL(`/auth/callback?error=${encodeURIComponent(errorDescription || error || 'Access denied')}`, request.url)
    );
  }

  if (code) {
    return NextResponse.redirect(new URL(`/auth/callback?code=${encodeURIComponent(code)}`, request.url));
  }

  return NextResponse.redirect(new URL('/auth', request.url));
}
