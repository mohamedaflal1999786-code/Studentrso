import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendPasswordResetEmail } from '@/lib/email-service';

export const dynamic = 'force-dynamic';

function getRequestOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const host = request.headers.get('host') || 'localhost:3000';
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid Gmail address.' },
        { status: 400 }
      );
    }

    const origin = getRequestOrigin(request);
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth?step=create-password&email=${encodeURIComponent(email)}`,
      });

      if (error) {
        // If Supabase rate limit is triggered, provide friendly feedback
        console.warn('Supabase resetPassword error:', error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `If an account exists for ${email}, a password reset link has been dispatched to your Gmail. You can also click 'Reset instantly with Google' to update it right now.`,
      email,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not process password reset.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
