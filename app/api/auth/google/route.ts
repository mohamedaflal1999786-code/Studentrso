import { NextResponse } from 'next/server';
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
    const origin = getRequestOrigin(request);
    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (!error && data?.url) {
        return NextResponse.json({ url: data.url });
      }
    }

    // Local / fallback redirect
    return NextResponse.json({
      url: `${origin}/auth/callback?provider=google&source=inbuilt`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not initialize Google authentication.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);
  const supabase = getSupabaseServerClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (!error && data?.url) {
        return NextResponse.redirect(data.url);
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.redirect(`${origin}/auth/callback?provider=google&source=inbuilt`);
}
