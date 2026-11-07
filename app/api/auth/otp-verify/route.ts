import { NextResponse } from 'next/server';
import { verifyEmailOtp, getAccountByEmail, createSessionToken } from '@/lib/auth-service';
import { sendWelcomeEmail } from '@/lib/email-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const code = typeof body.code === 'string' ? body.code.trim() : '';
    const purpose = (typeof body.purpose === 'string' ? body.purpose : 'signup') as 'signup' | 'login' | 'reset';

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and verification code are required.' }, { status: 400 });
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Please enter a valid 6-digit verification code.' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: purpose === 'reset' ? 'recovery' : 'signup',
      });

      if (error) {
        return NextResponse.json(
          { error: error.message || 'Verification code is invalid or has expired.' },
          { status: 400 }
        );
      }

      const userId = data.user?.id || `usr-${Date.now()}`;
      const fullName = data.user?.user_metadata?.full_name || 'Student';

      // Ensure user profile in database
      await supabase
        .from('user_profiles')
        .upsert({
          id: userId,
          email,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (purpose === 'signup') {
        sendWelcomeEmail(email, fullName).catch(() => {});
      }

      const sessionToken = createSessionToken(userId, email);
      const response = NextResponse.json({
        success: true,
        message: 'Account verified successfully. Welcome to Student RSO!',
        user: {
          id: userId,
          email,
          profile: {
            id: userId,
            email,
            full_name: fullName,
            onboarding_completed: false,
          },
        },
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

    // Fallback: Disallowed in production for security. Allowed only in development/testing.
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Authentication service is unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Fallback: Verify against secure hashed OTP store
    const verifyResult = verifyEmailOtp(email, code, purpose);
    if (!verifyResult.success) {
      return NextResponse.json({ error: verifyResult.error }, { status: 400 });
    }

    const account = getAccountByEmail(email);
    if (!account) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 404 });
    }

    if (purpose === 'signup') {
      sendWelcomeEmail(email, account.profile.full_name || 'Student').catch(() => {});
    }

    const sessionToken = createSessionToken(account.id, account.email);
    const response = NextResponse.json({
      success: true,
      message: 'Account verified successfully. Welcome to Student RSO!',
      user: {
        id: account.id,
        email: account.email,
        profile: account.profile,
      },
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
    const msg = err instanceof Error ? err.message : 'Verification failed. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
