// app/api/exams/institutions/route.ts
import { NextResponse } from 'next/server';
import { OFFICIAL_REGULATORS_DIRECTORY, EXAMINATIONS_DATABASE } from '@/lib/exams-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    let results = OFFICIAL_REGULATORS_DIRECTORY;

    if (query) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.abbreviation.toLowerCase().includes(query) ||
          c.statutoryRole.toLowerCase().includes(query) ||
          c.associatedExams.some((e) => e.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      totalCount: results.length,
      authorities: results,
      participatingBodiesSummary: EXAMINATIONS_DATABASE.map((e) => ({
        examTitle: e.title,
        shortCode: e.shortCode,
        participatingBodies: e.linkedOpportunities.participatingBodies,
        targetProgrammesOrPosts: e.linkedOpportunities.targetProgrammesOrPosts,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve institution records' },
      { status: 500 }
    );
  }
}
