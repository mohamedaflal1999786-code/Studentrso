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
      .from('student_certificate_trackers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
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
      return NextResponse.json(
        { error: 'Please sign in to sync your certificate tracker across devices.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      id,
      certificateTitle,
      serviceCode,
      applicationNumber,
      portalName,
      portalTrackingUrl,
      applicationDate,
      reportedStatus,
      targetDeliveryDate,
      acknowledgementNumber,
      notes,
    } = body;

    if (!certificateTitle || !applicationNumber || !portalName) {
      return NextResponse.json(
        { error: 'Certificate title, application number, and portal name are required.' },
        { status: 400 }
      );
    }

    const { client, user } = auth;

    const recordPayload = {
      user_id: user.id,
      certificate_title: certificateTitle,
      service_code: serviceCode || null,
      application_number: applicationNumber,
      portal_name: portalName,
      portal_tracking_url: portalTrackingUrl || 'https://edistricts.tn.gov.in/revenue/status.html',
      application_date: applicationDate || new Date().toISOString().split('T')[0],
      reported_status: reportedStatus || 'Submitted',
      student_disclaimer: 'Student-reported status – not independently verified.',
      target_delivery_date: targetDeliveryDate || null,
      acknowledgement_number: acknowledgementNumber || null,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      const { data, error } = await client
        .from('student_certificate_trackers')
        .update(recordPayload)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, record: data });
    } else {
      const { data, error } = await client
        .from('student_certificate_trackers')
        .insert([recordPayload])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, record: data });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save tracker record';
    return NextResponse.json({ error: message }, { status: 500 });
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

    if (!id) {
      return NextResponse.json({ error: 'Tracker ID required' }, { status: 400 });
    }

    const { client, user } = auth;
    const { error } = await client
      .from('student_certificate_trackers')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete tracker record';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
