import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ checklist: {} });
    }

    const { client, user } = auth;
    // Check scholarship_student_records first or fallback
    const { data, error } = await client
      .from('scholarship_student_records')
      .select('checklist')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ checklist: data?.checklist || {} });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch checklist.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json({ error: 'Please sign in to save your checklist progress.' }, { status: 401 });
    }

    const body = await request.json();
    const checklist = body.checklist && typeof body.checklist === 'object' ? body.checklist : {};

    const { client, user } = auth;
    const { error } = await client
      .from('scholarship_student_records')
      .upsert(
        {
          user_id: user.id,
          checklist,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) throw error;

    return NextResponse.json({ success: true, checklist });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save checklist.' },
      { status: 500 }
    );
  }
}
