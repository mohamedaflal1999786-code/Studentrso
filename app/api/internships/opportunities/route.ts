// app/api/internships/opportunities/route.ts
import { NextResponse } from 'next/server';
import {
  VERIFIED_OPPORTUNITIES,
  filterOpportunities,
  OpportunityCategory,
  WorkMode,
  OpportunityClassification,
} from '@/lib/internship-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || searchParams.get('query') || '';
    const category = (searchParams.get('category') as OpportunityCategory | 'all') || 'all';
    const qualification = searchParams.get('qualification') || searchParams.get('cohort') || '';
    const isPaidParam = searchParams.get('isPaid');
    const workMode = (searchParams.get('workMode') as WorkMode | 'all') || 'all';
    const classification = (searchParams.get('classification') as OpportunityClassification | 'all') || 'all';

    let isPaid: boolean | 'all' = 'all';
    if (isPaidParam === 'true') isPaid = true;
    if (isPaidParam === 'false') isPaid = false;

    const filtered = filterOpportunities(VERIFIED_OPPORTUNITIES, {
      query,
      category,
      qualification,
      isPaid,
      workMode,
      classification,
    });

    return NextResponse.json({
      success: true,
      total: filtered.length,
      opportunities: filtered,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching internship opportunities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve opportunities.' },
      { status: 500 }
    );
  }
}
