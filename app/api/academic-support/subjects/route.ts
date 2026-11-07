// app/api/academic-support/subjects/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { SUBJECT_DIRECTORY, EducationStage } from '@/lib/academic-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage') as EducationStage | null;
    const stream = searchParams.get('stream')?.toLowerCase().trim() || '';

    let subjects = SUBJECT_DIRECTORY;

    if (stage && stage !== 'All Stages') {
      subjects = subjects.filter((s) => s.stage === stage);
    }

    if (stream) {
      subjects = subjects.filter((s) => s.stream && s.stream.toLowerCase().includes(stream));
    }

    return NextResponse.json({
      success: true,
      totalCount: subjects.length,
      subjects,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in subjects API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subject directory', message: error.message },
      { status: 500 }
    );
  }
}
