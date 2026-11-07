import {
  ComprehensiveScholarship,
  EducationStage,
  StructuredEligibilityRule,
} from './scholarships-data';

export interface ExtendedStudentProfile {
  educationStage: EducationStage | '';
  courseName: string;
  courseYear: string;
  previousQualification: string;
  academicPercentage: number | null;
  annualFamilyIncome: number | null;
  incomeRange: string;
  domicileState: string;
  district: string;
  studiesInTamilNadu: boolean;
  communityCategory: string;
  gender: string;
  hasDisability: boolean;
  studiedInTnGovtSchool: boolean;
  isFirstGenerationGraduate: boolean;
  isSingleGirlChild: boolean;

  // Completed UG / Completed PG / Research fields
  highestQualification?: string;
  graduationYear?: number | null;
  researchDiscipline?: string;
  phdAdmissionStatus?: 'Enrolled / Registered' | 'Applied / Awaiting Admission' | 'Not Enrolled' | '';
  hasUgcNetJrf?: boolean;
  hasCsirNetJrf?: boolean;
  hasGate?: boolean;
  hasIcarExam?: boolean;
}

export type MatchCategory =
  | 'POTENTIALLY ELIGIBLE'
  | 'MORE INFORMATION REQUIRED'
  | 'DOES NOT MEET CONFIRMED CONDITIONS'
  | 'SCHEME REQUIRES VERIFICATION';

export interface SchemeEvaluationReport {
  program: ComprehensiveScholarship;
  academicYear: string;
  status: MatchCategory;
  primarySummary: string;
  satisfiedConditions: string[];
  failedConditions: string[];
  missingInformation: string[];
  requiredDocuments: string[];
  sourceNotificationUrl: string;
  officialApplicationUrl: string;
  verificationDate: string;
  disclaimer: string;
}

export function parseIncomeRangeToNumeric(range: string): number | null {
  if (!range) return null;
  const l = range.toLowerCase();
  if (l.includes('below ₹1 lakh') || l.includes('below 1 lakh')) return 100000;
  if (l.includes('₹1–2.5 lakh') || l.includes('1-2.5') || l.includes('2.5 lakh')) return 250000;
  if (l.includes('₹2.5–5 lakh') || l.includes('2.5-5') || l.includes('5 lakh')) return 500000;
  if (l.includes('₹5–8 lakh') || l.includes('5-8') || l.includes('8 lakh')) return 800000;
  if (l.includes('above ₹8 lakh') || l.includes('above 8 lakh')) return 1500000;
  return null;
}

export function evaluateSchemeEligibility(
  program: ComprehensiveScholarship,
  profile: ExtendedStudentProfile
): SchemeEvaluationReport {
  const satisfied: string[] = [];
  const failed: string[] = [];
  const missing: string[] = [];

  const currentVersion = program.versions.find((v) => v.isCurrentVersion) || program.versions[0];
  const academicYear = currentVersion?.academicYear || '2026-2027';
  const verificationDate = currentVersion?.sourceVerificationDate || '2026-11-06';
  const sourceNotificationUrl = currentVersion?.notificationBulletinUrl || program.officialGuidelinesUrl;
  const officialApplicationUrl = program.officialApplicationUrl;
  const disclaimer =
    'Preliminary eligibility intelligence based on official notifications. Final eligibility verification and quota allotments are determined solely by the awarding government department or foundation.';

  // Check scheme verification status
  if (
    currentVersion?.lifecycleStatus === 'Awaiting New Notification' ||
    currentVersion?.lifecycleStatus === 'Source Unavailable'
  ) {
    return {
      program,
      academicYear,
      status: 'SCHEME REQUIRES VERIFICATION',
      primarySummary: 'Official circular for the current academic cycle is awaiting release by the authority.',
      satisfiedConditions: satisfied,
      failedConditions: failed,
      missingInformation: ['Current year notification bulletin from official department portal.'],
      requiredDocuments: program.documents,
      sourceNotificationUrl,
      officialApplicationUrl,
      verificationDate,
      disclaimer,
    };
  }

  // 1. Education Stage Matching
  if (!profile.educationStage) {
    missing.push('Current education stage (e.g. Class 10, Diploma, Undergraduate, Completed PG, PhD, etc.).');
  } else {
    const isStageMatch = program.educationStages.includes(profile.educationStage);

    // Special rule from Part 1 & Part 8:
    // A completed PG student must see relevant research and further study opportunities, not ordinary PG scholarships.
    if (profile.educationStage === 'Completed PG') {
      const isResearchOrPostdoc =
        program.educationStages.includes('Completed PG') ||
        program.educationStages.includes('PhD') ||
        program.educationStages.includes('Junior Research Fellowship') ||
        program.educationStages.includes('Senior Research Fellowship') ||
        program.educationStages.includes('Postdoctoral research');

      if (!isResearchOrPostdoc) {
        failed.push('You have already completed PG. Ordinary school, diploma or PG scholarships no longer apply to you.');
      } else {
        satisfied.push('Matches postgraduate completion / doctoral research eligibility.');
      }
    } else if (profile.educationStage === 'Completed UG') {
      const isPostUg =
        program.educationStages.includes('Completed UG') ||
        program.educationStages.includes('Postgraduate') ||
        program.educationStages.includes('Junior Research Fellowship') ||
        program.educationStages.includes('PhD');

      if (!isPostUg) {
        failed.push('You have completed your UG degree. Ordinary school or undergraduate scholarships no longer apply.');
      } else {
        satisfied.push('Eligible for master’s entry or graduate research fellowship.');
      }
    } else {
      if (!isStageMatch) {
        failed.push(`Scheme is designated for ${program.educationStages.join(', ')}, whereas your stage is ${profile.educationStage}.`);
      } else {
        satisfied.push(`Matches your active education stage: ${profile.educationStage}.`);
      }
    }
  }

  const rules: StructuredEligibilityRule = program.eligibility;

  // 2. Domicile & Study Location
  if (rules.domicileRequired === 'Tamil Nadu') {
    if (profile.domicileState && profile.domicileState !== 'Tamil Nadu') {
      failed.push('Scheme strictly requires Tamil Nadu state domicile (nativity / residence).');
    } else if (profile.domicileState === 'Tamil Nadu') {
      satisfied.push('Satisfies Tamil Nadu resident condition.');
    } else {
      missing.push('State of domicile verification.');
    }
  }

  // 3. Gender Condition
  if (rules.genderEligibility && rules.genderEligibility !== 'All') {
    if (profile.gender && profile.gender !== 'Prefer not to say') {
      const g = profile.gender.toLowerCase();
      const isFemale = g.includes('female') || g.includes('girl') || g.includes('woman');
      const isMale = (g.includes('male') && !g.includes('female')) || g.includes('boy') || g.includes('man');
      const matchesFemale = rules.genderEligibility === 'Girl / Woman' && isFemale;
      const matchesMale = rules.genderEligibility === 'Boy / Man' && isMale;

      if (!matchesFemale && !matchesMale && profile.gender !== rules.genderEligibility) {
        failed.push(`Scheme is exclusively reserved for ${rules.genderEligibility} applicants.`);
      } else {
        satisfied.push(`Meets gender criterion: ${rules.genderEligibility}.`);
      }
    } else {
      missing.push(`Confirmation of gender (${rules.genderEligibility} scheme).`);
    }
  }

  // 4. Tamil Nadu Government Schooling (6th to 12th)
  if (rules.tnGovtSchoolRequired) {
    if (profile.studiedInTnGovtSchool === true) {
      satisfied.push('Meets continuous Class 6 to 12 study in Tamil Nadu Government Schools (EMIS verified).');
    } else if (profile.studiedInTnGovtSchool === false) {
      failed.push('Requires continuous education in Tamil Nadu Government Schools from Class 6 to 12.');
    } else {
      missing.push('Confirmation of whether you completed Class 6 to 12 in a TN Government school.');
    }
  }

  // 5. First Generation Graduate
  if (rules.firstGenerationGraduateRequired) {
    if (profile.isFirstGenerationGraduate === true) {
      satisfied.push('Certified as First Generation Graduate in family.');
    } else if (profile.isFirstGenerationGraduate === false) {
      failed.push('Requires official First Generation Graduate certificate from Revenue Tahsildar.');
    } else {
      missing.push('First Generation Graduate status confirmation.');
    }
  }

  // 6. Disability
  if (rules.disabilityRequired) {
    if (profile.hasDisability === true) {
      satisfied.push('Holds 40%+ benchmark disability with UDID / Medical certificate.');
    } else {
      failed.push('Reserved exclusively for students with benchmark disability (40%+ with UDID card).');
    }
  }

  // 7. Single Girl Child
  if (rules.singleGirlChildRequired) {
    if (profile.isSingleGirlChild === true) {
      satisfied.push('Satisfies Single Girl Child family structure.');
    } else {
      failed.push('Requires legal affidavit confirming status as Single Girl Child (no brothers or sisters).');
    }
  }

  // 8. Community / Category
  if (rules.communityCategories && rules.communityCategories.length > 0) {
    if (profile.communityCategory && profile.communityCategory !== 'Prefer not to say') {
      const studentCat = profile.communityCategory.toUpperCase();
      const eligible = rules.communityCategories.some((cat) => {
        const c = cat.toUpperCase();
        if (c === studentCat) return true;
        if (c === 'SC' && studentCat === 'SCC') return true;
        if (c === 'BC' && (studentCat === 'BCM' || studentCat === 'BC')) return true;
        if (c === 'OBC' && (studentCat === 'BC' || studentCat === 'MBC' || studentCat === 'DNC' || studentCat === 'OBC')) return true;
        if (c === 'MINORITIES' && (studentCat === 'MUSLIM' || studentCat === 'CHRISTIAN' || studentCat === 'OTHER MINORITY')) return true;
        return false;
      });

      if (!eligible) {
        failed.push(`Designated for ${rules.communityCategories.join(', ')} categories, whereas you indicated ${profile.communityCategory}.`);
      } else {
        satisfied.push(`Eligible under category quota: ${profile.communityCategory}.`);
      }
    } else {
      missing.push(`Community category verification (${rules.communityCategories.join(' / ')}).`);
    }
  }

  // 9. Income Ceiling
  if (rules.minIncomeCeiling) {
    const studentIncome = profile.annualFamilyIncome ?? parseIncomeRangeToNumeric(profile.incomeRange);
    if (studentIncome !== null) {
      if (studentIncome > rules.minIncomeCeiling) {
        failed.push(`Estimated family income (₹${studentIncome.toLocaleString('en-IN')}) exceeds official ceiling of ₹${rules.minIncomeCeiling.toLocaleString('en-IN')}/year.`);
      } else {
        satisfied.push(`Family income is within the ₹${rules.minIncomeCeiling.toLocaleString('en-IN')}/year ceiling.`);
      }
    } else {
      missing.push(`Annual family income verification (Ceiling: ₹${rules.minIncomeCeiling.toLocaleString('en-IN')}/year).`);
    }
  }

  // 10. Academic Marks
  if (rules.minMarksPercentage) {
    if (profile.academicPercentage !== null && profile.academicPercentage !== undefined) {
      if (profile.academicPercentage < rules.minMarksPercentage) {
        failed.push(`Requires minimum ${rules.minMarksPercentage}% qualifying marks; your score is ${profile.academicPercentage}%.`);
      } else {
        satisfied.push(`Qualifying marks of ${profile.academicPercentage}% meet the ${rules.minMarksPercentage}% cut-off.`);
      }
    } else {
      missing.push(`Qualifying marks verification (Requires minimum ${rules.minMarksPercentage}%).`);
    }
  }

  // 11. Doctoral & Research Specific Rules
  if (rules.requiresPhdEnrollment) {
    if (profile.phdAdmissionStatus === 'Enrolled / Registered') {
      satisfied.push('Enrolled in recognized doctoral (PhD) research.');
    } else {
      failed.push('Requires registered enrollment in a full-time PhD programme.');
    }
  }

  if (rules.requiresEntranceExam && rules.requiresEntranceExam.length > 0) {
    const hasAnyQualified = rules.requiresEntranceExam.some((exam) => {
      if (exam === 'UGC-NET' && profile.hasUgcNetJrf) return true;
      if (exam === 'CSIR-NET' && profile.hasCsirNetJrf) return true;
      if (exam === 'GATE' && profile.hasGate) return true;
      if (exam === 'ICAR-AICE' && profile.hasIcarExam) return true;
      return false;
    });

    if (hasAnyQualified) {
      satisfied.push(`Passed required national entrance qualification (${rules.requiresEntranceExam.join(', ')}).`);
    } else {
      failed.push(`Requires qualifying score in: ${rules.requiresEntranceExam.join(' or ')}.`);
    }
  }

  // Determine Result Category
  if (failed.length > 0) {
    return {
      program,
      academicYear,
      status: 'DOES NOT MEET CONFIRMED CONDITIONS',
      primarySummary: failed[0],
      satisfiedConditions: satisfied,
      failedConditions: failed,
      missingInformation: missing,
      requiredDocuments: program.documents,
      sourceNotificationUrl,
      officialApplicationUrl,
      verificationDate,
      disclaimer,
    };
  }

  if (missing.length > 0) {
    return {
      program,
      academicYear,
      status: 'MORE INFORMATION REQUIRED',
      primarySummary: `Satisfies ${satisfied.length} verified parameters, but ${missing.length} details must be confirmed.`,
      satisfiedConditions: satisfied,
      failedConditions: [],
      missingInformation: missing,
      requiredDocuments: program.documents,
      sourceNotificationUrl,
      officialApplicationUrl,
      verificationDate,
      disclaimer,
    };
  }

  return {
    program,
    academicYear,
    status: 'POTENTIALLY ELIGIBLE',
    primarySummary: 'Profile satisfies all verified primary eligibility conditions for this scheme.',
    satisfiedConditions: satisfied,
    failedConditions: [],
    missingInformation: [],
    requiredDocuments: program.documents,
    sourceNotificationUrl,
    officialApplicationUrl,
    verificationDate,
    disclaimer,
  };
}

export function rankSmartRecommendations(
  programs: ComprehensiveScholarship[],
  profile: ExtendedStudentProfile
): SchemeEvaluationReport[] {
  const evaluations = programs.map((p) => evaluateSchemeEligibility(p, profile));

  const priorityOrder: Record<MatchCategory, number> = {
    'POTENTIALLY ELIGIBLE': 1,
    'MORE INFORMATION REQUIRED': 2,
    'SCHEME REQUIRES VERIFICATION': 3,
    'DOES NOT MEET CONFIRMED CONDITIONS': 4,
  };

  return evaluations.sort((a, b) => {
    const pA = priorityOrder[a.status];
    const pB = priorityOrder[b.status];
    if (pA !== pB) return pA - pB;
    return b.satisfiedConditions.length - a.satisfiedConditions.length;
  });
}
