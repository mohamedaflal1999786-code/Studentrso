import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

function normalizeBookmarkRow(row: Record<string, unknown>) {
  return {
    scholarship_id: (row.scholarship_id ?? row.program_id ?? null) as string | null,
    notes: (row.notes ?? null) as string | null,
    created_at: (row.created_at ?? null) as string | null,
  };
}

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ bookmarks: [] });
    }

    const { client, user } = auth;
    const { data, error } = await client
      .from('scholarship_bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const bookmarks = (data || [])
      .map((row) => normalizeBookmarkRow(row as Record<string, unknown>))
      .filter((row) => Boolean(row.scholarship_id));

    return NextResponse.json({ bookmarks });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch bookmarks.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Please sign in to save scholarships.' }, { status: 401 });
    }

    const body = await request.json();
    const scholarshipId = typeof body.scholarshipId === 'string' ? body.scholarshipId.trim() : '';
    if (!scholarshipId) {
      return NextResponse.json({ error: 'Scholarship ID is required.' }, { status: 400 });
    }

    const { client, user } = auth;
    const payload: Record<string, unknown> = {
      user_id: user.id,
      scholarship_id: scholarshipId,
    };
    if (typeof body.notes === 'string' && body.notes.trim()) {
      payload.notes = body.notes.trim();
    }

    let { data, error } = await client
      .from('scholarship_bookmarks')
      .upsert(payload, { onConflict: 'user_id,scholarship_id' })
      .select()
      .maybeSingle();

    // Resilient fallback: if column 'notes' does not exist yet in live database schema (code 42703)
    if (error && (error.code === '42703' || String(error.message).includes('notes'))) {
      delete payload.notes;
      const retryResult = await client
        .from('scholarship_bookmarks')
        .upsert(payload, { onConflict: 'user_id,scholarship_id' })
        .select()
        .maybeSingle();
      data = retryResult.data;
      error = retryResult.error;
    }

    if (error) throw error;

    return NextResponse.json({
      success: true,
      bookmark: data ? normalizeBookmarkRow(data as Record<string, unknown>) : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add bookmark.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const scholarshipId = searchParams.get('scholarshipId');
    if (!scholarshipId) {
      return NextResponse.json({ error: 'Scholarship ID required.' }, { status: 400 });
    }

    const { client, user } = auth;
    const { error } = await client
      .from('scholarship_bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('scholarship_id', scholarshipId);

    if (error) throw error;

    return NextResponse.json({ success: true, removed: scholarshipId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete bookmark.' },
      { status: 500 }
    );
  }
}
