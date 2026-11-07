// app/api/scholarships/monitor/route.ts
// Automated Link Monitoring & Source Verification API for Module 01: Scholarship Hub

import { NextRequest, NextResponse } from 'next/server';
import { scholarshipLinkMonitor } from '@/lib/scholarship-link-monitor';
import { getScholarshipAuditStats, SCHOLARSHIP_AUDIT_MASTER_52 } from '@/lib/scholarship-url-audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const scholarshipId = searchParams.get('id');

    if (scholarshipId) {
      const record = scholarshipLinkMonitor.getRecordById(scholarshipId);
      if (!record) {
        return NextResponse.json({ error: `Scholarship "${scholarshipId}" not found.` }, { status: 404 });
      }
      return NextResponse.json({ record }, { status: 200 });
    }

    const summary = scholarshipLinkMonitor.getAuditSummary();
    const records = scholarshipLinkMonitor.getAllRecords();
    const schedules = scholarshipLinkMonitor.getMonitoringSchedules();
    const history = scholarshipLinkMonitor.getHistoryLogs();
    const stats = getScholarshipAuditStats();

    return NextResponse.json(
      {
        summary,
        stats,
        schedules,
        records,
        history,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve link monitoring audit report', details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, scholarshipId, newUrl, notes, reason } = body;

    if (action === 'approve_url' && scholarshipId && newUrl) {
      const updated = scholarshipLinkMonitor.approveCorrectedUrl(scholarshipId, newUrl, notes);
      return NextResponse.json({ success: true, record: updated, message: 'URL correction approved.' });
    }

    if (action === 'manual_review' && scholarshipId) {
      const updated = scholarshipLinkMonitor.markForManualReview(scholarshipId, reason || 'Flagged by administrator');
      return NextResponse.json({ success: true, record: updated, message: 'Marked for manual review.' });
    }

    if (scholarshipId) {
      const updated = await scholarshipLinkMonitor.recheckScholarship(scholarshipId);
      return NextResponse.json({ success: true, record: updated, message: `Rechecked ${updated.scholarshipName}.` });
    }

    // Default: Recheck all 52 scholarships
    const result = await scholarshipLinkMonitor.recheckAllScholarships();
    return NextResponse.json({
      success: true,
      auditedCount: result.auditedCount,
      summary: result.summary,
      message: 'Automated 52-record URL audit completed successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to execute link monitoring operation', details: error?.message },
      { status: 500 }
    );
  }
}
