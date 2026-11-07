// app/api/academic-support/difficulties/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { ACADEMIC_DIFFICULTIES, EducationStage } from '@/lib/academic-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage') as EducationStage | null;
    const search = searchParams.get('q')?.toLowerCase().trim() || '';

    let items = ACADEMIC_DIFFICULTIES;

    if (stage && stage !== 'All Stages') {
      items = items.filter((item) => item.stage === stage);
    }

    if (search) {
      items = items.filter(
        (item) =>
          item.topic.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.practicalSolutions.some((sol) => sol.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      success: true,
      totalCount: items.length,
      difficulties: items,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in academic difficulties API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch academic difficulties and solutions', message: error.message },
      { status: 500 }
    );
  }
}
