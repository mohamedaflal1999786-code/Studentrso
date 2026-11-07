// app/api/academic-support/resources/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import {
  VERIFIED_LEARNING_RESOURCES,
  searchAcademicResources,
  EducationStage,
  ResourceCategory
} from '@/lib/academic-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const stage = (searchParams.get('stage') as EducationStage) || 'All Stages';
    const category = (searchParams.get('category') as ResourceCategory) || 'All Categories';
    const cost = searchParams.get('cost') || '';

    let results = searchAcademicResources(query, stage, category);

    if (cost) {
      results = results.filter((r) => r.cost.toLowerCase().includes(cost.toLowerCase()));
    }

    return NextResponse.json({
      success: true,
      totalCount: results.length,
      resources: results,
      filtersApplied: { query, stage, category, cost },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in academic resources API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch academic learning resources', message: error.message },
      { status: 500 }
    );
  }
}
