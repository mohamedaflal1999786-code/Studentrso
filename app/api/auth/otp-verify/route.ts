import { NextResponse } from 'next/server';
import { verifyEmailOtp, getAccountByEmail, createSessionToken } from '@/lib/auth-service';
import { sendWelcomeEmail } from '@/lib/email-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const code = typeof body.code === 'string' ? body.code.trim() : '';
    const purpose = (typeof body.purpose === 'string' ? body.purpose : 'signup') as
      | 'signup'
      | 'login'
      | 'reset';

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required.' },
        { status: 400 }
      );
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit verification code.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    if (supabase) {
      let verified = false;
      let verifiedUserId: string | null = null;
      let verifiedFullName = 'Student';

      // 1. Check persistent auth_otps table
      try {
        const { data: otpRecords } = await supabase
          .from('auth_otps')
          .select('*')
          .eq('target', email)
          .eq('used', false)
          .order('created_at', { ascending: false })
          .limit(1);

        if (otpRecords && otpRecords.length > 0) {
          const record = otpRecords[0];
          const isExpired = new Date(record.expires_at).getTime() < Date.now();
          if (!isExpired && (record.code === code || record.code_hash === code)) {
            verified = true;
            await supabase.from('auth_otps').update({ used: true }).eq('id', record.id);
          }
        }
      } catch {
        // Fall through
      }

      // 2. If not verified via auth_otps, try Supabase auth verifyOtp
      if (!verified) {
        try {
          const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: purpose === 'reset' ? 'recovery' : 'signup',
          });
          if (!error && data?.user) {
            verified = true;
            verifiedUserId = data.user.id;
            verifiedFullName = data.user.user_metadata?.full_name || 'Student';
          }
        } catch {
          // Fall through
        }
      }

      // If verified via either method
      if (verified) {
        let userProfile = null;
        if (verifiedUserId) {
          const { data: prof } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', verifiedUserId)
            .maybeSingle();
          userProfile = prof;
        }

        if (!userProfile) {
          const { data: profByEmail } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('email', email)
            .maybeSingle();
          userProfile = profByEmail;
        }

        const userId = verifiedUserId || userProfile?.id || `usr-${Date.now()}`;
        const fullName = userProfile?.full_name || verifiedFullName;

        // Upsert user profile
        const { data: finalProfile } = await supabase
          .from('user_profiles')
          .upsert(
            {
              id: userId,
              email,
              full_name: fullName,
              state: 'Tamil Nadu',
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          )
          .select()
          .maybeSingle();

        if (purpose === 'signup') {
          sendWelcomeEmail(email, fullName).catch(() => {});
        }

        const sessionToken = createSessionToken(userId, email);
        const response = NextResponse.json({
          success: true,
          message: 'Account verified successfully. Welcome to Student RSO!',
          user: { id: userId, email },
          profile: finalProfile || {
            id: userId,
            email,
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

        return response;
      }

      return NextResponse.json(
        { error: 'Verification code is invalid or has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Fallback: Verify against in-memory OTP store
    const verifyResult = verifyEmailOtp(email, code, purpose);
    if (!verifyResult.success) {
      return NextResponse.json({ error: verifyResult.error }, { status: 400 });
    }

    const account = getAccountByEmail(email);
    const userId = account?.id || `usr-${Date.now()}`;
    const fullName = account?.profile?.full_name || 'Student';

    const sessionToken = createSessionToken(userId, email);
    const response = NextResponse.json({
      success: true,
      message: 'Account verified successfully. Welcome to Student RSO!',
      user: { id: userId, email },
      profile: account?.profile || {
        id: userId,
        email,
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

    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Verification failed. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
