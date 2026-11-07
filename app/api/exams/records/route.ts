// app/api/exams/records/route.ts
import { NextResponse } from 'next/server';
import {
  EXAMINATIONS_DATABASE,
  getExamsStatistics,
  MAIN_EXAM_SECTIONS,
  COURSE_DISCIPLINES_LIST,
  CourseDiscipline,
} from '@/lib/exams-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const stage = searchParams.get('stage');
    const discipline = searchParams.get('discipline');
    const level = searchParams.get('level');
    const freeOnly = searchParams.get('free') === 'true';
    const query = searchParams.get('q');

    let data = EXAMINATIONS_DATABASE;

    if (category && category !== 'all') {
      if (category === 'govt-exams') {
        data = data.filter((exam) => exam.isGovernment || exam.categories.includes('govt-exams'));
      } else if (category === 'private-exams') {
        data = data.filter((exam) => !exam.isGovernment || exam.categories.includes('private-exams'));
      } else if (category === 'state-level') {
        data = data.filter((exam) => exam.levelClassification === 'State-Level' || exam.categories.includes('state-level'));
      } else if (category === 'central-govt') {
        data = data.filter((exam) => exam.levelClassification === 'Central Government' || exam.categories.includes('central-govt'));
      } else if (category === 'national-entrance') {
        data = data.filter((exam) => exam.levelClassification === 'National Entrance' || exam.categories.includes('national-entrance'));
      } else if (category === 'private-univ-entrance') {
        data = data.filter((exam) => exam.levelClassification === 'Private University / Institutional' || exam.categories.includes('private-univ-entrance'));
      } else if (category === 'pg-research') {
        data = data.filter((exam) =>
          exam.categories.includes('pg-research') ||
          exam.targetStages.includes('Postgraduate') ||
          exam.targetStages.includes('Research / PhD')
        );
      } else {
        data = data.filter((exam) => exam.categories.includes(category as any));
      }
    }

    if (stage && stage !== 'all') {
      if (stage === 'Class 12') {
        data = data.filter((exam) => exam.targetStages.includes('Class 12') || exam.targetStages.includes('Class 11'));
      } else {
        data = data.filter((exam) => exam.targetStages.includes(stage as any));
      }
    }

    if (discipline && discipline !== 'all') {
      data = data.filter((exam) => exam.courseDisciplines && exam.courseDisciplines.includes(discipline as CourseDiscipline));
    }

    if (level && level !== 'all') {
      data = data.filter((exam) => exam.levelClassification === level);
    }

    if (freeOnly) {
      data = data.filter((exam) => exam.feeType === 'Free Application' || exam.feeGeneralInr === 0);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      data = data.filter((exam) => {
        return (
          exam.title.toLowerCase().includes(q) ||
          exam.shortCode.toLowerCase().includes(q) ||
          exam.conductingAuthority.toLowerCase().includes(q) ||
          exam.minimumQualification.toLowerCase().includes(q) ||
          exam.linkedOpportunities.targetProgrammesOrPosts.some((p) => p.toLowerCase().includes(q))
        );
      });
    }

    const stats = getExamsStatistics();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      counts: {
        total: stats.total,
        matched: data.length,
        government: stats.govtCount,
        private: stats.privateCount,
        free: stats.freeCount,
        stateLevel: stats.stateLevelCount,
      },
      categories: MAIN_EXAM_SECTIONS,
      disciplines: COURSE_DISCIPLINES_LIST,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve examination records' },
      { status: 500 }
    );
  }
}
