import {
  GENUINE_SCHOLARSHIP_CATALOGUE,
  ComprehensiveScholarship,
  EducationStage,
  SchemeCategory,
  SchemeType,
  LifecycleStatus,
  StructuredEligibilityRule,
} from './scholarships-data';

export type StudyLevel = EducationStage;
export type ScholarshipCategory = SchemeCategory;

export interface Scholarship {
  id: string;
  code?: string;
  name: string;
  tamilName?: string;
  provider: string;
  department: string;
  category: SchemeCategory;
  schemeType: SchemeType;
  levels: EducationStage[];
  audience: string;
  summary: string;
  detailedDescription?: string;
  benefitsDescription?: string;
  amountPublished?: boolean;
  amountDetails?: string;
  academicYear?: string;
  applicationStatus?: LifecycleStatus;
  applicationStartDate?: string | null;
  applicationDeadline?: string | null;
  deadlineNotes?: string;
  officialNotificationUrl?: string;
  officialUrl: string;
  sourceName?: string;
  sourceDepartmentUrl?: string;
  lastVerifiedAt: string;
  verification: 'Official portal' | 'Official provider' | 'Under Review';
  documents: string[];
  eligibility: string[];
  tags: string[];
  amountNote: string;
  isRenewable?: boolean;
  renewalNotes?: string;
}

// Map comprehensive scholarship catalogue into format consumable by views
export const scholarships: Scholarship[] = GENUINE_SCHOLARSHIP_CATALOGUE.map((p) => {
  const currentVersion = p.versions.find((v) => v.isCurrentVersion) || p.versions[0];
  const eligibilityList: string[] = [];

  if (p.eligibility.communityCategories?.length) {
    eligibilityList.push(`Community: ${p.eligibility.communityCategories.join(', ')}`);
  }
  if (p.eligibility.minIncomeCeiling) {
    eligibilityList.push(
      p.eligibility.incomeConditionDescription ||
        `Annual family income ceiling: ₹${p.eligibility.minIncomeCeiling.toLocaleString('en-IN')}`
    );
  }
  if (p.eligibility.minMarksPercentage) {
    eligibilityList.push(
      p.eligibility.marksConditionDescription ||
        `Minimum marks required: ${p.eligibility.minMarksPercentage}%`
    );
  }
  if (p.eligibility.tnGovtSchoolRequired) {
    eligibilityList.push('Requires Class 6 to 12 study in Tamil Nadu Government Schools (EMIS verified)');
  }
  if (p.eligibility.firstGenerationGraduateRequired) {
    eligibilityList.push('Must be certified as First Generation Graduate in family');
  }
  if (p.eligibility.genderEligibility && p.eligibility.genderEligibility !== 'All') {
    eligibilityList.push(`Reserved for: ${p.eligibility.genderEligibility}`);
  }
  if (p.eligibility.disabilityRequired) {
    eligibilityList.push('Benchmark disability of 40%+ with UDID certificate');
  }
  if (p.eligibility.requiresPhdEnrollment) {
    eligibilityList.push('Must be registered in full-time doctoral (PhD) research');
  }
  if (p.eligibility.requiresEntranceExam?.length) {
    eligibilityList.push(`Qualifying exam required: ${p.eligibility.requiresEntranceExam.join(' / ')}`);
  }

  return {
    id: p.id,
    code: p.code,
    name: p.name,
    tamilName: p.tamilName,
    provider: p.provider,
    department: p.department,
    category: p.category,
    schemeType: p.schemeType,
    levels: p.educationStages,
    audience: p.audience,
    summary: p.summary,
    detailedDescription: p.detailedDescription,
    benefitsDescription: currentVersion?.confirmedBenefits || p.summary,
    amountPublished: currentVersion?.amountPublished ?? false,
    amountDetails: currentVersion?.publishedAmountDetails || 'As per current Government Order',
    academicYear: currentVersion?.academicYear || '2026-2027',
    applicationStatus: currentVersion?.lifecycleStatus || 'Upcoming',
    applicationStartDate: currentVersion?.applicationStartDate,
    applicationDeadline: currentVersion?.applicationDeadline,
    officialNotificationUrl: currentVersion?.notificationBulletinUrl || p.officialGuidelinesUrl,
    officialUrl: p.officialApplicationUrl,
    sourceName: p.provider,
    sourceDepartmentUrl: p.officialGuidelinesUrl,
    lastVerifiedAt: currentVersion?.sourceVerificationDate || '2026-11-06',
    verification: 'Official portal',
    documents: p.documents,
    eligibility: eligibilityList.length > 0 ? eligibilityList : ['Refer to current official circular'],
    tags: p.tags,
    amountNote: currentVersion?.publishedAmountDetails || 'Check latest official circular',
    isRenewable: p.isRenewable,
    renewalNotes: p.renewalConditions?.join('; '),
  };
});

export const documentDefaults = [
  'Student Aadhaar Card (Aadhaar-seeded on NPCI mapper)',
  'Permanent Community Certificate (BC / MBC / DNC / SC / ST)',
  'Annual Family Income Certificate (Issued within last 12 months by Revenue Tahsildar)',
  'Previous Examination Marksheet / Consolidated Grade Card',
  'Current Academic Year Bonafide Certificate from College / School',
  'First Generation Graduate Certificate (Issued by Tahsildar / e-Sevai, where applicable)',
  'Tamil Nadu Government School Study Certificate (Class 6 to 12 EMIS verified, where applicable)',
  'Unique Disability ID (UDID) Card (40%+ benchmark disability, where applicable)',
  'Single Girl Child Affidavit on Stamp Paper (where applicable)',
  'PhD Registration Order & Guide Recommendation (for doctoral fellowships)'
];

export * from './scholarships-data';
export * from './scholarship-matcher';
export * from './discovery-engine';
