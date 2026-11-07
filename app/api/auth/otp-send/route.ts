import { NextResponse } from 'next/server';
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
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      if (purpose === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      } else {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email,
        });
        if (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      }

      return NextResponse.json({
        success: true,
        message: `A fresh 6-digit verification code has been dispatched to ${email}.`,
        email,
      });
    }

    // Fallback: Generate OTP and send email via SMTP/Resend
    const { plainOtp } = generateEmailOtp(email, purpose as 'signup' | 'login' | 'reset');

    if (purpose === 'reset') {
      await sendPasswordResetEmail(email, email.split('@')[0], plainOtp);
    } else {
      await sendRegistrationOtpEmail(email, email.split('@')[0], plainOtp);
    }

    return NextResponse.json({
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to ${email}.`,
      email,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not send verification code.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
