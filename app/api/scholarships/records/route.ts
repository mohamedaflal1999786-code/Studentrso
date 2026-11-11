import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isValidUnexpiredSupabaseJwt } from '@/lib/supabase';

function getClient(accessToken: string) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase is not configured.');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

async function getUser(request: Request) {
  const raw = request.headers.get('cookie')?.match(/student_rso_access_token=([^;]+)/)?.[1];
  if (!raw) return null;
  const token = decodeURIComponent(raw);
  if (!isValidUnexpiredSupabaseJwt(token)) return null;
  const client = getClient(token);
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  return { client, user: data.user };
}

export async function GET(request: Request) {
  try {
    const auth = await getUser(request);
    if (!auth) return NextResponse.json({ error: 'Sign in to sync your scholarship tracker.' }, { status: 401 });
    const { data, error } = await auth.client.from('scholarship_student_records').select('bookmarks, applications, checklist, updated_at').eq('user_id', auth.user.id).maybeSingle();
    if (error) throw error;
    return NextResponse.json({ record: data || { bookmarks: [], applications: [], checklist: {}, updated_at: null } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not load scholarship records.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getUser(request);
    if (!auth) return NextResponse.json({ error: 'Sign in to sync your scholarship tracker.' }, { status: 401 });
    const body = await request.json();
    const bookmarks = Array.isArray(body.bookmarks) ? body.bookmarks.filter((x: unknown) => typeof x === 'string').slice(0, 100) : [];
    const applications = Array.isArray(body.applications) ? body.applications.slice(0, 100) : [];
    const checklist = body.checklist && typeof body.checklist === 'object' && !Array.isArray(body.checklist) ? body.checklist : {};
    const { error } = await auth.client.from('scholarship_student_records').upsert({
      user_id: auth.user.id,
      bookmarks,
      applications,
      checklist,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (error) throw error;
    return NextResponse.json({ saved: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save scholarship records.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
