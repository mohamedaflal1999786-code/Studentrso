// app/api/internships/tracker/route.ts
import { NextResponse } from 'next/server';
import { SavedApplicationRecord, ApplicationStage } from '@/lib/internship-data';

export const dynamic = 'force-dynamic';

// In-memory fallback cache for development session
let activeUserApplications: SavedApplicationRecord[] = [];

export async function GET(request: Request) {
  try {
    return NextResponse.json({
      success: true,
      total: activeUserApplications.length,
      records: activeUserApplications,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching tracked applications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve application records.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, record }: { action: 'save' | 'update_stage' | 'delete' | 'sync'; record: Partial<SavedApplicationRecord> } = body;

    if (action === 'delete') {
      activeUserApplications = activeUserApplications.filter((r) => r.id !== record.id);
      return NextResponse.json({
        success: true,
        message: 'Opportunity removed from tracker.',
        records: activeUserApplications,
      });
    }

    if (action === 'update_stage' && record.id) {
      const existingIdx = activeUserApplications.findIndex((r) => r.id === record.id);
      if (existingIdx !== -1) {
        activeUserApplications[existingIdx] = {
          ...activeUserApplications[existingIdx],
          stage: (record.stage as ApplicationStage) || activeUserApplications[existingIdx].stage,
          interviewDate: record.interviewDate || activeUserApplications[existingIdx].interviewDate,
          referenceNumber: record.referenceNumber || activeUserApplications[existingIdx].referenceNumber,
          notes: record.notes !== undefined ? record.notes : activeUserApplications[existingIdx].notes,
          updatedAt: new Date().toISOString(),
        };
      }
      return NextResponse.json({
        success: true,
        message: 'Application status updated.',
        record: activeUserApplications[existingIdx],
        records: activeUserApplications,
      });
    }

    // Default: 'save' new or update existing
    if (record.opportunityId) {
      const existingIdx = activeUserApplications.findIndex((r) => r.opportunityId === record.opportunityId);
      if (existingIdx !== -1) {
        activeUserApplications[existingIdx] = {
          ...activeUserApplications[existingIdx],
          ...record,
          updatedAt: new Date().toISOString(),
        } as SavedApplicationRecord;
      } else {
        const newRecord: SavedApplicationRecord = {
          id: record.id || `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          opportunityId: record.opportunityId,
          opportunityTitle: record.opportunityTitle || 'Untitled Opportunity',
          organisation: record.organisation || 'Official Organisation',
          category: record.category || 'government-internship',
          stage: (record.stage as ApplicationStage) || 'Saved',
          appliedDate: record.appliedDate,
          deadline: record.deadline || '2026-12-31',
          interviewDate: record.interviewDate,
          referenceNumber: record.referenceNumber,
          notes: record.notes,
          officialPortalUrl: record.officialPortalUrl || 'https://internship.aicte-india.org/',
          updatedAt: new Date().toISOString(),
        };
        activeUserApplications.unshift(newRecord);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Application tracker updated successfully.',
      records: activeUserApplications,
    });
  } catch (error: any) {
    console.error('Error modifying application tracker:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update application tracker.' },
      { status: 500 }
    );
  }
}
