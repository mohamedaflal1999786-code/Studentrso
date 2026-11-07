// app/api/exams/sources/route.ts
import { NextResponse } from 'next/server';
import { OFFICIAL_REGULATORS_DIRECTORY } from '@/lib/exams-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      lastAudit: new Date().toISOString(),
      regulatorsCount: OFFICIAL_REGULATORS_DIRECTORY.length,
      regulators: OFFICIAL_REGULATORS_DIRECTORY,
      syncSchedule: {
        admissionPortals: 'Every 6 Hours',
        competitiveRecruitment: 'Every 6 Hours',
        collegeProspectus: 'Daily',
        statutoryRecognition: 'Weekly',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve source directories' },
      { status: 500 }
    );
  }
}
