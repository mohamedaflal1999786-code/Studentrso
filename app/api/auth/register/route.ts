import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  registerAccount,
  validatePasswordStrength,
  createSessionToken,
} from '@/lib/auth-service';
import { sendRegistrationOtpEmail } from '@/lib/email-service';
import { checkRateLimit } from '@/lib/security-shield';
import { getSupabaseServerClient } from '@/lib/supabase';

function getRequestOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const host = request.headers.get('host') || 'localhost:3000';
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rate = checkRateLimit(`reg-${ip}`, 15, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const confirmPassword = typeof body.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!fullName) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (body.confirmPassword !== undefined && password !== confirmPassword) {
      return NextResponse.json({ error: 'Password confirmation does not match.' }, { status: 400 });
    }

    // Enforce 12+ characters per specification
    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      return NextResponse.json({ error: strength.reason }, { status: 400 });
    }

    const origin = getRequestOrigin(request);
    const supabase = getSupabaseServerClient();

    // 2. Supabase Integration
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        return NextResponse.json(
          { error: error.message || 'Could not register student account.' },
          { status: 400 }
        );
      }

      const userId = data.user?.id || `usr-${Date.now()}`;

      // Ensure profile exists in live database
      const { data: profile } = await supabase
        .from('user_profiles')
        .upsert(
          {
            id: userId,
            email,
            full_name: fullName,
            state: 'Tamil Nadu',
            onboarding_completed: false,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select()
        .maybeSingle();

      // Generate 6-digit OTP and store in persistent auth_otps table
      const otpCode = crypto.randomInt(100000, 1000000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      try {
        await supabase.from('auth_otps').insert({
          target: email,
          channel: 'email',
          code: otpCode,
          purpose: 'signup',
          expires_at: expiresAt,
          used: false,
          attempts: 0,
        });
      } catch {
        // Table insert fallback safe
      }

      // Try sending email notification asynchronously
      sendRegistrationOtpEmail(email, fullName, otpCode).catch(() => {});

      // Mirror to local memory store
      registerAccount(fullName, email, password);

      const sessionToken = createSessionToken(userId, email);
      const response = NextResponse.json({
        success: true,
        autoLogin: true,
        message: 'Your student account has been created successfully! Welcome to Student RSO.',
        email,
        otpCode,
        user: { id: userId, email },
        profile: profile || {
          id: userId,
          email,
          full_name: fullName,
          onboarding_completed: false,
        },
      });

      // Set authentication cookies for seamless instant sign-in
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

    // 3. Fallback: Local cryptographic store
    const regResult = registerAccount(fullName, email, password);
    if (!regResult.success) {
      return NextResponse.json({ error: regResult.error }, { status: 400 });
    }

    const otpCode = crypto.randomInt(100000, 1000000).toString();
    sendRegistrationOtpEmail(email, fullName, otpCode).catch(() => {});

    const userId = regResult.user?.id || `usr-${Date.now()}`;
    const sessionToken = createSessionToken(userId, email);

    const response = NextResponse.json({
      success: true,
      autoLogin: true,
      message: 'Account created successfully! Welcome to Student RSO.',
      email,
      otpCode,
      user: { id: userId, email },
      profile: {
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
    response.cookies.set('student_rso_access_token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
