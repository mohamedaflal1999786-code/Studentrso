import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function supabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are not configured.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Use a valid email and a password with at least 8 characters.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase().auth.signUp({ email, password });
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      message: data.session ? 'Your account is ready.' : 'Your account is ready. You can now sign in.',
    });
    if (data.session) {
      response.cookies.set('student_rso_access_token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in,
        path: '/',
      });
      response.cookies.set('student_rso_refresh_token', data.session.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }
    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'We could not create your account. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
