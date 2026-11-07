import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/scholarship-auth';

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedUser(request);
    if (!auth || !auth.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator access required to view audit logs.' },
        { status: 403 }
      );
    }

    const { client } = auth;
    const { data: logs, error } = await client
      .from('scholarship_admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ logs: logs || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch audit logs.' },
      { status: 500 }
    );
  }
}
