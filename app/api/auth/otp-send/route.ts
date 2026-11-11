import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { generateEmailOtp } from '@/lib/auth-service';
import { sendRegistrationOtpEmail, sendPasswordResetEmail } from '@/lib/email-service';
import { getSupabaseServerClient } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/security-shield';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rate = checkRateLimit(`resend-${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Please wait a moment before requesting another verification code.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const rawEmail = body.email || body.target;
    const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
    const purpose = typeof body.purpose === 'string' ? body.purpose : 'signup';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    const otpCode = crypto.randomInt(100000, 1000000).toString();
    const otpHash = crypto.createHash('sha256').update(otpCode).digest('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    if (supabase) {
      try {
        await supabase.from('auth_otps').insert({
          target: email,
          channel: 'email',
          code: 'hashed',
          code_hash: otpHash,
          purpose,
          expires_at: expiresAt,
          used: false,
          attempts: 0,
        });
      } catch {
        // Table insert fallback
      }

      if (purpose === 'reset') {
        sendPasswordResetEmail(email, email.split('@')[0], otpCode).catch(() => {});
      } else {
        sendRegistrationOtpEmail(email, email.split('@')[0], otpCode).catch(() => {});
      }

      return NextResponse.json({
        success: true,
        message: `A fresh 6-digit verification code has been dispatched to ${email}.`,
        email,
      });
    }

    // Fallback: Local OTP store
    const { plainOtp } = generateEmailOtp(email, purpose as 'signup' | 'login' | 'reset');

    if (purpose === 'reset') {
      sendPasswordResetEmail(email, email.split('@')[0], plainOtp).catch(() => {});
    } else {
      sendRegistrationOtpEmail(email, email.split('@')[0], plainOtp).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to ${email}.`,
      email,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Could not send verification code.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
