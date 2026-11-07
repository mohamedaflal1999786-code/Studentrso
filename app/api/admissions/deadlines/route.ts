// app/api/admissions/deadlines/route.ts
import { NextResponse } from 'next/server';
import { ADMISSION_DEADLINES_CALENDAR } from '@/lib/admissions-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      academicYear: '2026-27',
      totalDeadlines: ADMISSION_DEADLINES_CALENDAR.length,
      deadlines: ADMISSION_DEADLINES_CALENDAR,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admission deadlines', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
