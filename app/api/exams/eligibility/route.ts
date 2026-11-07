// app/api/exams/eligibility/route.ts
import { NextResponse } from 'next/server';
import { EXAMINATIONS_DATABASE } from '@/lib/exams-data';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stage, stream = 'all', goal = 'all' } = body;

    const matches = EXAMINATIONS_DATABASE.filter((exam) => {
      // Stage check
      if (stage && stage !== 'all') {
        if (stage === 'Class 12') {
          if (!exam.targetStages.includes('Class 12') && !exam.targetStages.includes('Class 11')) {
            return false;
          }
        } else if (!exam.targetStages.includes(stage)) {
          return false;
        }
      }

      // Goal check
      if (goal && goal !== 'all') {
        if (exam.linkedOpportunities.opportunityType !== goal) {
          return false;
        }
      }

      return true;
    }).map((exam) => ({
      id: exam.id,
      title: exam.title,
      shortCode: exam.shortCode,
      conductingAuthority: exam.conductingAuthority,
      opportunityType: exam.linkedOpportunities.opportunityType,
      expectedOutcome: exam.linkedOpportunities.expectedOutcome,
      statutoryQuotaBenefit: exam.linkedOpportunities.statutoryQuotaBenefit,
      minimumQualification: exam.minimumQualification,
      feeType: exam.feeType,
      feeGeneralInr: exam.feeGeneralInr,
      examinationDate: exam.importantDates.examinationDate,
      officialApplicationPortalUrl: exam.officialApplicationPortalUrl,
    }));

    return NextResponse.json({
      success: true,
      evaluatedCriteria: { stage, stream, goal },
      totalMatches: matches.length,
      matches,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process eligibility evaluation' },
      { status: 500 }
    );
  }
}
