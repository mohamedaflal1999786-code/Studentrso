import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ bookmarks: [] });
    }

    const { client, user } = auth;
    const { data, error } = await client
      .from('scholarship_bookmarks')
      .select('scholarship_id, notes, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ bookmarks: data || [] });
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
    const scholarshipId = body.scholarshipId;
    if (!scholarshipId) {
      return NextResponse.json({ error: 'Scholarship ID is required.' }, { status: 400 });
    }

    const { client, user } = auth;
    const { data, error } = await client
      .from('scholarship_bookmarks')
      .upsert(
        { user_id: user.id, scholarship_id: scholarshipId, notes: body.notes || null },
        { onConflict: 'user_id,scholarship_id' }
      )
      .select()
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ success: true, bookmark: data });
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
