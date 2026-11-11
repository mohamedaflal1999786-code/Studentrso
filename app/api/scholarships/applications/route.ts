import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';
import { isUuid } from '@/lib/supabase';

function normalizeApplicationRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    scholarship_id: row.scholarship_id ?? row.program_id ?? null,
    external_application_reference: row.external_application_reference ?? null,
    application_submission_date: row.application_submission_date ?? null,
    academic_year: row.academic_year ?? '2026-2027',
    status: row.status ?? 'Preparing Documents',
    is_self_reported: row.is_self_reported ?? true,
    institution_verified_self_report: Boolean(row.institution_verified_self_report ?? false),
    payment_status_note: row.payment_status_note ?? null,
    disbursed_amount: row.disbursed_amount ?? null,
    student_notes: row.student_notes ?? row.notes ?? null,
    created_at: row.created_at ?? null,
    updated_at: row.updated_at ?? null,
  };
}

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ applications: [] });
    }

    const { client, user } = auth;
    const { data: apps, error } = await client
      .from('scholarship_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      applications: (apps || []).map((row) => normalizeApplicationRow(row as Record<string, unknown>)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch application records.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Please sign in to track applications.' }, { status: 401 });
    }

    const body = await request.json();
    const scholarshipId = typeof body.scholarshipId === 'string' ? body.scholarshipId.trim() : '';
    if (!scholarshipId) {
      return NextResponse.json({ error: 'Scholarship ID is required.' }, { status: 400 });
    }

    const { client, user } = auth;
    const status = body.status || 'Preparing Documents';
    const academicYear = body.academicYear || '2026-2027';

    const insertData: Record<string, unknown> = {
      user_id: user.id,
      scholarship_id: scholarshipId,
      external_application_reference: body.externalReference ? String(body.externalReference).trim() : null,
      application_submission_date: body.submissionDate || null,
      academic_year: academicYear,
      status,
      is_self_reported: true,
      updated_at: new Date().toISOString(),
    };

    if (body.institutionVerifiedSelfReport === true) {
      insertData.institution_verified_self_report = true;
    }
    if (typeof body.paymentStatusNote === 'string' && body.paymentStatusNote.trim()) {
      insertData.payment_status_note = body.paymentStatusNote.trim();
    }
    if (typeof body.disbursedAmount === 'number' && Number.isFinite(body.disbursedAmount)) {
      insertData.disbursed_amount = body.disbursedAmount;
    }
    if (typeof body.notes === 'string' && body.notes.trim()) {
      insertData.student_notes = body.notes.trim();
    }

    const { data, error } = await client
      .from('scholarship_applications')
      .upsert(insertData, { onConflict: 'user_id,scholarship_id,academic_year' })
      .select()
      .maybeSingle();

    if (error) throw error;

    // Log event in scholarship_application_events
    if (data?.id) {
      await client.from('scholarship_application_events').insert({
        application_id: data.id,
        user_id: user.id,
        previous_status: null,
        new_status: status,
        note: 'Application entry created in tracker',
      });
    }

    return NextResponse.json(
      {
        success: true,
        application: data ? normalizeApplicationRow(data as Record<string, unknown>) : null,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save application.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const id = typeof body.id === 'string' ? body.id.trim() : '';
    if (!id) {
      return NextResponse.json({ error: 'Application record ID is required.' }, { status: 400 });
    }
    if (!isUuid(id)) {
      return NextResponse.json({ error: 'Application record not persisted in database.' }, { status: 404 });
    }

    const { client, user } = auth;

    // Retrieve previous status for audit trail
    const { data: previous } = await client
      .from('scholarship_applications')
      .select('status')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (body.status !== undefined) updatePayload.status = body.status;
    if (body.externalReference !== undefined) updatePayload.external_application_reference = body.externalReference;
    if (body.submissionDate !== undefined) updatePayload.application_submission_date = body.submissionDate;
    if (body.institutionVerifiedSelfReport !== undefined)
      updatePayload.institution_verified_self_report = Boolean(body.institutionVerifiedSelfReport);
    if (body.paymentStatusNote !== undefined) updatePayload.payment_status_note = body.paymentStatusNote;
    if (body.disbursedAmount !== undefined) updatePayload.disbursed_amount = body.disbursedAmount;
    if (body.notes !== undefined) updatePayload.student_notes = body.notes;

    const { data, error } = await client
      .from('scholarship_applications')
      .update(updatePayload)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Application record not found.' }, { status: 404 });
    }

    if (body.status && body.status !== previous?.status) {
      await client.from('scholarship_application_events').insert({
        application_id: id,
        user_id: user.id,
        previous_status: previous?.status || null,
        new_status: body.status,
        note: body.eventNote || `Status updated to ${body.status}`,
      });
    }

    return NextResponse.json({
      success: true,
      application: normalizeApplicationRow(data as Record<string, unknown>),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update application.' },
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
    const id = (searchParams.get('id') || '').trim();
    if (!id) {
      return NextResponse.json({ error: 'Application ID is required.' }, { status: 400 });
    }
    if (!isUuid(id)) {
      return NextResponse.json({ success: true, message: 'Local application tracker record removed.' });
    }

    const { client, user } = auth;
    const { error } = await client
      .from('scholarship_applications')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Application tracker record removed.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete application.' },
      { status: 500 }
    );
  }
}
