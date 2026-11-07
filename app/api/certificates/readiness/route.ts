import { NextRequest, NextResponse } from 'next/server';
import {
  evaluateDocumentReadiness,
  ReadinessInputs,
  EducationStage,
} from '@/lib/certificates-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      educationLevel,
      purpose,
      hasReservationClaim,
      requiresIncomeCert,
      requiresNativityCert,
      hasDisabilityBenefit,
      isFirstGraduateClaim,
      isFreshAdmission,
    } = body;

    if (!educationLevel || !purpose) {
      return NextResponse.json(
        { error: 'Education level and intended purpose are required.' },
        { status: 400 }
      );
    }

    const inputs: ReadinessInputs = {
      educationLevel: educationLevel as EducationStage,
      purpose: purpose as ReadinessInputs['purpose'],
      hasReservationClaim: Boolean(hasReservationClaim),
      requiresIncomeCert: Boolean(requiresIncomeCert),
      requiresNativityCert: Boolean(requiresNativityCert),
      hasDisabilityBenefit: Boolean(hasDisabilityBenefit),
      isFirstGraduateClaim: Boolean(isFirstGraduateClaim),
      isFreshAdmission: Boolean(isFreshAdmission),
    };

    const requirements = evaluateDocumentReadiness(inputs);

    const mandatoryCount = requirements.filter((r) => r.isMandatory).length;
    const conditionalCount = requirements.filter((r) => !r.isMandatory).length;

    return NextResponse.json({
      success: true,
      inputs,
      requirements,
      summary: {
        totalRequired: requirements.length,
        mandatoryCount,
        conditionalCount,
      },
      evaluationTimestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Evaluation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
