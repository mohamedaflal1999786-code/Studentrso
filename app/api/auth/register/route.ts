import { NextResponse } from 'next/server';
import { registerAccount, generateEmailOtp, validatePasswordStrength } from '@/lib/auth-service';
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
    // 1. IP Rate Limiting (Prevent abuse)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rate = checkRateLimit(`reg-${ip}`, 10, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many registration attempts. Please wait a moment.' }, { status: 429 });
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

    // 2. If Supabase is configured, use official Supabase Auth signUp
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
        // Do not pretend success if Supabase returns an error
        return NextResponse.json(
          { error: error.message || 'Could not register student account.' },
          { status: 400 }
        );
      }

      // Also register in local auth store to mirror state
      registerAccount(fullName, email, password);

      return NextResponse.json({
        success: true,
        message: "We've sent a 6-digit verification code to your email. Enter the code to activate your student account.",
        email,
      });
    }

    // 3. Fallback: Local cryptographic store
    const regResult = registerAccount(fullName, email, password);
    if (!regResult.success) {
      return NextResponse.json({ error: regResult.error }, { status: 400 });
    }

    // Generate secure 6-digit OTP
    const { plainOtp } = generateEmailOtp(email, 'signup');

    // Dispatch transactional email via SMTP/Resend
    await sendRegistrationOtpEmail(email, fullName, plainOtp);

    // Never return the OTP in the API response
    return NextResponse.json({
      success: true,
      message: "We've sent a 6-digit verification code to your email. Enter the code to activate your student account.",
      email,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unable to complete registration. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
