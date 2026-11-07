import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ tickets: [] });
    }

    const { client, user, isAdmin } = auth;
    let query = client
      .from('scholarship_support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (!isAdmin) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ tickets: data || [], isAdmin });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch support tickets.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Please sign in to submit a support query.' }, { status: 401 });
    }

    const body = await request.json();
    const { category, subject, description, scholarshipId } = body;

    if (!category || !subject || !description) {
      return NextResponse.json(
        { error: 'Category, subject, and description are required.' },
        { status: 400 }
      );
    }

    const { client, user } = auth;
    const ticketRow = {
      user_id: user.id,
      scholarship_id: scholarshipId || null,
      category,
      subject: String(subject).trim().slice(0, 200),
      description: String(description).trim().slice(0, 2000),
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('scholarship_support_tickets')
      .insert(ticketRow)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, ticket: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit support ticket.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth || !auth.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required to resolve tickets.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { ticketId, status, adminResponse } = body;

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID is required.' }, { status: 400 });
    }

    const { client, user } = auth;
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updatePayload.status = status;
    if (adminResponse) updatePayload.admin_response = adminResponse;
    if (status === 'Resolved' || status === 'Closed') {
      updatePayload.resolved_at = new Date().toISOString();
    }

    const { data, error } = await client
      .from('scholarship_support_tickets')
      .update(updatePayload)
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw error;

    await client.from('scholarship_admin_audit_logs').insert({
      admin_id: user.id,
      action: 'REPLY_SUPPORT_TICKET',
      target_table: 'scholarship_support_tickets',
      target_id: ticketId,
      details: { status, adminResponse },
    });

    return NextResponse.json({ success: true, ticket: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update ticket.' },
      { status: 500 }
    );
  }
}
