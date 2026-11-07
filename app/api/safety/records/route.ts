import { NextResponse } from 'next/server';
import {
  SAFETY_CATEGORIES,
  OFFICIAL_AUTHORITIES,
  EMERGENCY_HELPLINES,
} from '@/lib/safety-data';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      categories: SAFETY_CATEGORIES,
      authorities: OFFICIAL_AUTHORITIES,
      helplines: EMERGENCY_HELPLINES,
      totalCategories: SAFETY_CATEGORIES.length,
      totalAuthorities: OFFICIAL_AUTHORITIES.length,
      lastAuditTimestamp: '2026-11-06T18:00:00.000Z',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch safety records';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
