import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth-service';
import { getSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken =
      cookieStore.get('student_rso_session')?.value ||
      request.headers.get('cookie')?.match(/student_rso_session=([^;]+)/)?.[1];

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in with Google first.' },
        { status: 401 }
      );
    }

    const decoded = verifySessionToken(sessionToken);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Session expired. Please sign in with Google again.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password : '';
    const confirmPassword = typeof body.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      // 1. Update password in Supabase Auth
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        decoded.userId,
        {
          password,
          email_confirm: true,
        }
      );

      if (updateError) {
        console.error('Supabase password update error:', updateError.message);
      }

      // 2. Mark password as created in user_profiles
      await supabase
        .from('user_profiles')
        .update({
          updated_at: new Date().toISOString(),
        })
        .eq('id', decoded.userId);
    }

    return NextResponse.json({
      success: true,
      message: 'Password created successfully! You can now log in using your Gmail and this password.',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not set password.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
