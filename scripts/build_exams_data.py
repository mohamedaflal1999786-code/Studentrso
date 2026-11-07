# scripts/build_exams_data.py
import json
import os

target_path = os.path.join(os.getcwd(), 'lib', 'exams-data.ts')

header_code = """// lib/exams-data.ts
// =============================================================================
// STUDENT RSO 2.0 – MODULE 04: EXAMS & OPPORTUNITY HUB
// Complete Verified Examination, Admission & Career Intelligence Platform
// For Tamil Nadu Students: Class 10 to Postgraduate & Research Scholars
// 100% Genuine Statutory Data | Strict English-Only Interface
// =============================================================================

export type EducationStage =
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'Diploma / Polytechnic'
  | 'ITI'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Research / PhD'
  | 'Postgraduate Completed';

export type ExamCategoryKey =
  | 'overview'
  | 'govt-exams'
  | 'private-exams'
  | 'state-level'
  | 'central-govt'
  | 'national-entrance'
  | 'private-univ-entrance'
  | 'course-wise'
  | 'pg-research'
  | 'calendar'
  | 'eligibility'
  | 'tracker';

export type CourseDiscipline =
  | 'Engineering'
  | 'Medical'
  | 'Dental'
  | 'Pharmacy'
  | 'Nursing'
  | 'Allied Health Sciences'
  | 'Agriculture'
  | 'Veterinary Science'
  | 'Arts'
  | 'Science'
  | 'Commerce'
  | 'Law'
  | 'Architecture'
  | 'Design'
  | 'Management'
  | 'Computer Applications'
  | 'Hotel Management'
  | 'Aviation'
  | 'Maritime Studies'
  | 'Polytechnic'
  | 'ITI'
  | 'Education and Teaching'
  | 'Journalism and Media'
  | 'Social Work'
  | 'Research and PhD'
  | 'Other Recognised Courses';

export type FeeClassification =
  | 'Free Application'
  | 'Paid Application'
  | 'Fee Concession Available'
  | 'Merit / No Exam Fee';

export interface OpportunityDetails {
  summary: string;
  degreesOrPosts: string[];
  salaryOrStipend: string;
  careerAdvancement: string;
  counsellingProcess: string;
  statutoryQuotaBenefit?: string;
}

export interface LinkedOpportunity {
  opportunityType:
    | 'Degree Admission'
    | 'Government Employment'
    | 'Scholarship / Cash Award'
    | 'Research Fellowship'
    | 'Private Trainee / Job'
    | 'Apprenticeship';
  targetProgrammesOrPosts: string[];
  participatingBodies: string;
  selectionStepsAfterExam: string[];
  expectedOutcome: string;
  statutoryQuotaBenefit?: string;
}

export interface PreparationResource {
  syllabusRoadmap: string[];
  recommendedFocus: string[];
  markingScheme: string;
  negativeMarking: string;
  durationMinutes: number;
  samplePaperUrl?: string;
}

export interface ExamRecord {
  id: string;
  title: string;
  shortCode: string;
  conductingAuthority: string;
  authorityType:
    | 'Tamil Nadu State Government'
    | 'Central Government / National Agency'
    | 'Public University'
    | 'Private University / Consortium'
    | 'Public Sector Undertaking';
  isGovernment: boolean;
  levelClassification:
    | 'State-Level'
    | 'Central Government'
    | 'National Entrance'
    | 'Private University / Institutional';
  targetStages: EducationStage[];
  categories: ExamCategoryKey[];
  courseDisciplines: CourseDiscipline[];
  purpose: string;
  whoCanApply: string;
  minimumQualification: string;
  eligibleStreams: string[];
  requiredSubjects: string[];
  minimumMarks?: string;
  ageCriteria: string;
  ageMin?: number;
  ageMax?: number;
  reservationSummary: string;
  examinationMode: string;
  examFormatDescription: string;
  feeType: FeeClassification;
  feeGeneralInr: number;
  feeReservedInr: number;
  feeDescription: string;
  hasFeeConcession: boolean;
  feeConcessionDetails?: string;
  hasScholarship: boolean;
  scholarshipDetails?: string;
  applicationProcedure: string[];
  requiredDocuments: string[];
  importantDates: {
    applicationOpening: string;
    applicationDeadline: string;
    admitCardRelease: string;
    examinationDate: string;
    resultDeclaration: string;
    counsellingOrInterview: string;
    isDeadlineActive: boolean;
    isExpired: boolean;
    academicYear: string;
  };
  officialWebsiteUrl: string;
  officialNotificationUrl: string;
  officialApplicationPortalUrl: string;
  officialSyllabusUrl: string;
  previousPapersUrl?: string;
  opportunityProvided: OpportunityDetails;
  linkedOpportunities: LinkedOpportunity;
  preparation: PreparationResource;
  verificationStatus: 'Official Authority Confirmed' | 'Awaiting New Notification';
  lastVerified: string;
  sourceRegistry: string;
}

export interface NavCategoryMeta {
  key: ExamCategoryKey;
  label: string;
  shortDescription: string;
  badge?: string;
}

export const MAIN_EXAM_SECTIONS: NavCategoryMeta[] = [
  { key: 'overview', label: '1. Overview', shortDescription: 'Comprehensive examination metrics, stage navigators and opportunity highlights.' },
  { key: 'govt-exams', label: '2. Government Examinations', shortDescription: 'State and Central statutory examinations for admissions, recruitment & pensions.' },
  { key: 'private-exams', label: '3. Private Examinations', shortDescription: 'Verified private university entrances, institutional aptitude tests and corporate assessments.' },
  { key: 'state-level', label: '4. State-Level Examinations', shortDescription: 'Tamil Nadu Government entrance, single-window, recruitment and talent examinations.' },
  { key: 'central-govt', label: '5. Central Government Examinations', shortDescription: 'All-India UPSC, SSC, Railway RRB, Defence, and central recruitment tests open to TN students.' },
  { key: 'national-entrance', label: '6. National Entrance Examinations', shortDescription: 'NTA JEE, NEET UG, CUET, CLAT, GATE, NATA, NIFT, and national entrance assessments.' },
  { key: 'private-univ-entrance', label: '7. Private University Entrances', shortDescription: 'VITEEE, SRMJEEE, SAEEE, AEEE, BITSAT, KREE, HITSEEE, VEE, KEE and institution tests.' },
  { key: 'course-wise', label: '8. Course-Wise Exam Finder', shortDescription: 'Discover entrance examinations mapped across 26 academic and professional course disciplines.' },
  { key: 'pg-research', label: '9. Postgraduate & Research', shortDescription: 'GATE, TANCET, IIT JAM, CUET PG, NEET PG, UGC NET, CSIR NET, TN-SET for Masters & PhD.' },
  { key: 'calendar', label: '10. Examination Calendar', shortDescription: 'Dynamic timeline of verified application openings, deadlines, admit cards, and exam dates.' },
  { key: 'eligibility', label: '11. Eligibility Checker', shortDescription: 'Interactive rule-based checker comparing your stage, stream, subjects, and age with verified requirements.' },
  { key: 'tracker', label: '12. My Application Tracker', shortDescription: 'Confidential browser-local checklist to track target exams, admit cards, and application stages.' },
];

export const COURSE_DISCIPLINES_LIST: { id: CourseDiscipline; label: string; desc: string }[] = [
  { id: 'Engineering', label: 'Engineering & Technology', desc: 'B.E., B.Tech, M.Tech across computing, mechanical, civil, electrical and emerging branches.' },
  { id: 'Medical', label: 'Medical (MBBS / AYUSH)', desc: 'MBBS, BDS, BAMS, BHMS, BSMS Siddha admissions via NEET UG single-window.' },
  { id: 'Dental', label: 'Dental Science (BDS / MDS)', desc: 'Bachelor and Master of Dental Surgery in government and private dental colleges.' },
  { id: 'Pharmacy', label: 'Pharmacy (D.Pharm / B.Pharm / GPAT)', desc: 'Diploma, Bachelor, and Master of Pharmacy with central GPAT PG stipends.' },
  { id: 'Nursing', label: 'Nursing (B.Sc / M.Sc Nursing)', desc: 'Professional nursing degrees in government medical colleges and verified private schools.' },
  { id: 'Allied Health Sciences', label: 'Allied Health & Paramedical', desc: 'BPT Physiotherapy, BOT, B.Sc Radiography, Medical Lab Technology, Cardiac Technology.' },
  { id: 'Agriculture', label: 'Agriculture & Horticulture', desc: 'B.Sc (Hons) Agriculture, Horticulture, Forestry via TNAU and ICAR AIQ.' },
  { id: 'Veterinary Science', label: 'Veterinary Science & Animal Husbandry', desc: 'B.V.Sc & A.H. and B.Tech Food/Dairy Tech via TANUVAS Single Window.' },
  { id: 'Arts', label: 'Arts & Humanities', desc: 'B.A. Literature, History, Economics, Political Science in central & state universities.' },
  { id: 'Science', label: 'Pure & Applied Science', desc: 'B.Sc / M.Sc Physics, Chemistry, Mathematics, Biotechnology via CUET, IISER, JAM.' },
  { id: 'Commerce', label: 'Commerce & Professional Accounting', desc: 'B.Com, B.Com Honours, Accounting & Finance in central and state institutions.' },
  { id: 'Law', label: 'Law (B.A. LL.B. / LL.M.)', desc: '5-Year Integrated Law and 1-Year LL.M. via CLAT, AILET, and TNDALU.' },
  { id: 'Architecture', label: 'Architecture & Planning', desc: 'B.Arch admissions via NATA and JEE Main Paper 2 across COA-approved institutions.' },
  { id: 'Design', label: 'Design & Fashion', desc: 'B.Des & M.Des via NID DAT, NIFT, UCEED, CEED at national design institutes.' },
  { id: 'Management', label: 'Management & Business (BBA / MBA)', desc: 'CAT, XAT, MAT, CMAT, TANCET MBA for IIMs, Anna University, and premier business schools.' },
  { id: 'Computer Applications', label: 'Computer Applications (BCA / MCA)', desc: 'BCA, MCA via TANCET, NIMCET, and university entrance tests.' },
  { id: 'Hotel Management', label: 'Hotel Management & Hospitality', desc: 'B.Sc Hospitality & Hotel Administration via NCHM JEE in Central & State IHMs.' },
  { id: 'Aviation', label: 'Aviation & Aerospace', desc: 'Commercial Pilot Licence (CPL), Aeronautical Science, and AFCAT Flying Branch.' },
  { id: 'Maritime Studies', label: 'Maritime Studies & Marine Engineering', desc: 'B.Tech Marine Engineering, B.Sc Nautical Science via IMU CET and AMET.' },
  { id: 'Polytechnic', label: 'Polytechnic Diploma', desc: '3-Year Diploma in Engineering & Technology via DOTE Tamil Nadu Single Window.' },
  { id: 'ITI', label: 'Industrial Training (ITI Trades)', desc: 'Craftsmen Training Scheme trades (Fitter, Electrician, Machinist) via DET Tamil Nadu.' },
  { id: 'Education and Teaching', label: 'Education & Teaching', desc: 'B.Ed, M.Ed, TNTET, and TRB examinations for government school teaching.' },
  { id: 'Journalism and Media', label: 'Journalism & Mass Communication', desc: 'B.A. / M.A. Journalism, Visual Communication, Electronic Media in central & private universities.' },
  { id: 'Social Work', label: 'Social Work (BSW / MSW)', desc: 'Bachelor and Master of Social Work in recognized social science institutions.' },
  { id: 'Research and PhD', label: 'Research & PhD Fellowships', desc: 'UGC NET, CSIR NET, TN-SET, ICMR JRF with monthly research fellowships (₹37,000+).' },
  { id: 'Other Recognised Courses', label: 'Other Professional Programmes', desc: 'Sports education, performing arts, library sciences, and statutory vocational credentials.' },
];
"""

# We will define helper function to format each record into clean TypeScript
print("Writing generator script...")
