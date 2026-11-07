import { NextResponse } from 'next/server';
import {
  verifySessionToken,
  getSavedOpportunities,
  saveOpportunity,
  updateOpportunityStatus,
  removeSavedOpportunity,
  SavedOpportunityRecord,
} from '@/lib/auth-service';
import { sendApplicationStatusUpdateEmail } from '@/lib/email-service';

function getUserId(request: Request): { userId: string; email: string } | null {
  const cookiesHeader = request.headers.get('cookie') || '';
  const sessionToken = cookiesHeader.match(/student_rso_session=([^;]+)/)?.[1];
  if (!sessionToken) return null;
  return verifySessionToken(sessionToken);
}

export async function GET(request: Request) {
  try {
    const auth = getUserId(request);
    const userId = auth?.userId || 'usr-student-001'; // Fallback to demo student if not logged in
    const opportunities = getSavedOpportunities(userId);

    const counts = {
      total: opportunities.length,
      interested: opportunities.filter((o) => o.status === 'Interested').length,
      saved: opportunities.filter((o) => o.status === 'Saved').length,
      preparing: opportunities.filter((o) => o.status === 'Preparing Documents').length,
      applied: opportunities.filter((o) => o.status === 'Applied').length,
      underReview: opportunities.filter((o) => o.status === 'Under Review').length,
      approved: opportunities.filter((o) => o.status === 'Approved').length,
      rejected: opportunities.filter((o) => o.status === 'Rejected').length,
      closed: opportunities.filter((o) => o.status === 'Closed').length,
    };

    return NextResponse.json({ opportunities, counts });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not fetch saved opportunities.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = getUserId(request);
    const userId = auth?.userId || 'usr-student-001';

    const body = (await request.json()) as {
      opportunity_id?: string;
      category?: string;
      title?: string;
      awarding_authority?: string;
      official_url?: string;
      deadline?: string;
      status?: SavedOpportunityRecord['status'];
      notes?: string;
    };

    if (!body.opportunity_id || !body.title || !body.official_url) {
      return NextResponse.json({ error: 'Missing required opportunity details.' }, { status: 400 });
    }

    const saved = saveOpportunity(userId, {
      opportunity_id: body.opportunity_id,
      category: body.category || 'Scholarship',
      title: body.title,
      awarding_authority: body.awarding_authority || 'Official Authority',
      official_url: body.official_url,
      deadline: body.deadline,
      status: body.status || 'Saved',
      notes: body.notes || '',
    });

    return NextResponse.json({ message: 'Opportunity saved successfully.', opportunity: saved });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save opportunity.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = getUserId(request);
    const userId = auth?.userId || 'usr-student-001';

    const body = (await request.json()) as {
      opportunity_id?: string;
      status?: SavedOpportunityRecord['status'];
      notes?: string;
    };

    if (!body.opportunity_id || !body.status) {
      return NextResponse.json({ error: 'Opportunity ID and status are required.' }, { status: 400 });
    }

    const updated = updateOpportunityStatus(userId, body.opportunity_id, body.status, body.notes);
    if (!updated) {
      return NextResponse.json({ error: 'Saved opportunity not found.' }, { status: 404 });
    }

    // Trigger transactional status update email notification asynchronously if user email exists
    if (auth?.email) {
      sendApplicationStatusUpdateEmail(
        auth.email,
        auth.email.split('@')[0],
        updated.title,
        updated.status
      ).catch(() => {});
    }

    return NextResponse.json({ message: 'Status updated.', opportunity: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not update opportunity.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = getUserId(request);
    const userId = auth?.userId || 'usr-student-001';

    const { searchParams } = new URL(request.url);
    const opportunityId = searchParams.get('opportunity_id');

    if (!opportunityId) {
      return NextResponse.json({ error: 'Opportunity ID is required.' }, { status: 400 });
    }

    removeSavedOpportunity(userId, opportunityId);
    return NextResponse.json({ message: 'Opportunity removed from tracker.' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not remove opportunity.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
