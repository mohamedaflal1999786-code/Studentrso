// app/api/internships/sources/route.ts
import { NextResponse } from 'next/server';
import { OFFICIAL_PORTALS_DIRECTORY } from '@/lib/internship-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      total: OFFICIAL_PORTALS_DIRECTORY.length,
      sources: OFFICIAL_PORTALS_DIRECTORY,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching official sources:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve official portal directory.' },
      { status: 500 }
    );
  }
}
