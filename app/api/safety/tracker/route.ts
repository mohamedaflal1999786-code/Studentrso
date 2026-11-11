import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ records: [] });
    }

    const { client, user } = auth;
    const { data: records, error } = await client
      .from('student_external_complaint_references')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      // Table may not exist yet in local mode
      return NextResponse.json({ records: [] });
    }

    return NextResponse.json({ records: records || [] });
  } catch (error) {
    return NextResponse.json({ records: [] });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Please sign in to sync your reference tracker.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      authorityName,
      complaintCategory,
      externalReferenceNumber,
      submissionDate,
      status,
      followUpDate,
      personalNotes,
    } = body;

    if (!authorityName || !complaintCategory || !externalReferenceNumber) {
      return NextResponse.json({ error: 'Authority name, category, and reference number are required.' }, { status: 400 });
    }

    const recordId = id || `ref-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();

    const { client, user } = auth;
    const { data, error } = await client
      .from('student_external_complaint_references')
      .upsert({
        id: recordId,
        user_id: user.id,
        authority_name: String(authorityName).trim().slice(0, 150),
        complaint_category: String(complaintCategory).trim().slice(0, 100),
        external_reference_number: String(externalReferenceNumber).trim().slice(0, 100),
        submission_date: submissionDate || now.split('T')[0],
        status: status || 'Submitted',
        follow_up_date: followUpDate || null,
        personal_notes: personalNotes ? String(personalNotes).trim().slice(0, 500) : null,
        updated_at: now,
      })
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, record: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save complaint record.' },
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
    const id = searchParams.get('id');
    const clearAll = searchParams.get('clearAll') === 'true';

    const { client, user } = auth;

    if (clearAll) {
      await client
        .from('student_external_complaint_references')
        .delete()
        .eq('user_id', user.id);
      return NextResponse.json({ success: true, message: 'All complaint references cleared.' });
    }

    if (id) {
      await client
        .from('student_external_complaint_references')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      return NextResponse.json({ success: true, message: 'Complaint reference deleted.' });
    }

    return NextResponse.json({ error: 'Missing id or clearAll parameter' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete record.' },
      { status: 500 }
    );
  }
}
