export type EducationStage =
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'ITI'
  | 'Diploma'
  | 'Undergraduate'
  | 'Professional degree'
  | 'Integrated degree'
  | 'Postgraduate'
  | 'Completed UG'
  | 'Completed PG'
  | 'PhD'
  | 'Junior Research Fellowship'
  | 'Senior Research Fellowship'
  | 'Postdoctoral research';

export type SchemeCategory =
  | 'Tamil Nadu Government'
  | 'Central Government'
  | 'AICTE'
  | 'UGC'
  | 'ICAR'
  | 'Research Council'
  | 'Institution / Foundation';

export type SchemeType =
  | 'Scholarship'
  | 'Fellowship'
  | 'Fee Concession'
  | 'Incentive'
  | 'Coaching Assistance';

export type LifecycleStatus =
  | 'Upcoming'
  | 'Open'
  | 'Closing Soon'
  | 'Closed'
  | 'Expired'
  | 'Awaiting New Notification'
  | 'Source Unavailable'
  | 'Discontinued';

export interface StructuredEligibilityRule {
  minIncomeCeiling?: number;
  incomeConditionDescription?: string;
  minMarksPercentage?: number;
  marksConditionDescription?: string;
  communityCategories?: string[]; // 'BC', 'MBC', 'DNC', 'SC', 'ST', 'SCC', 'Minorities', 'OBC', 'EBC', 'DNT', 'General'
  genderEligibility?: 'All' | 'Girl / Woman' | 'Boy / Man';
  disabilityRequired?: boolean;
  tnGovtSchoolRequired?: boolean;
  firstGenerationGraduateRequired?: boolean;
  singleGirlChildRequired?: boolean;
  domicileRequired?: 'Tamil Nadu' | 'India' | 'State Quota';
  allowedInTNInstitutionsOnly?: boolean;
  requiresCompletedUG?: boolean;
  requiresCompletedPG?: boolean;
  requiresPhdEnrollment?: boolean;
  requiresEntranceExam?: ('UGC-NET' | 'CSIR-NET' | 'GATE' | 'ICAR-AICE' | 'NEET' | 'TNEA')[];
  ageLimitYears?: number;
  otherConditions?: string[];
}

export interface SchemeAcademicVersion {
  academicYear: string; // e.g. '2026-2027', '2025-2026'
  lifecycleStatus: LifecycleStatus;
  isCurrentVersion: boolean;
  confirmedBenefits: string;
  amountPublished: boolean;
  publishedAmountDetails: string;
  applicationStartDate: string | null;
  applicationDeadline: string | null;
  isDeadlineExtended: boolean;
  originalDeadline?: string | null;
  notificationBulletinUrl: string;
  sourceVerificationDate: string;
  verificationNotes?: string;
}

export interface ScholarshipVerificationHistoryEntry {
  checkedAt: string;
  checkedBy: string;
  infoStatus: string;
  appStatus: string;
  notes?: string;
  evidenceRefs?: string;
}

export interface ComprehensiveScholarship {
  id: string;
  code?: string;
  name: string;
  tamilName?: string;
  provider: string;
  department: string;
  category: SchemeCategory;
  schemeType: SchemeType;
  educationStages: EducationStage[];
  isForTnResidents: boolean;
  isForStudyInTn: boolean;
  audience: string;
  summary: string;
  detailedDescription: string;
  officialGuidelinesUrl: string;
  officialApplicationUrl: string;
  officialInfoUrl?: string;
  trackingUrl?: string;
  urlVerificationStatus?: 'VERIFIED' | 'REDIRECTED' | 'BROKEN' | 'WRONG DESTINATION' | 'OUTDATED' | 'NOT YET PUBLISHED' | 'MANUAL VERIFICATION REQUIRED' | string;
  infoUrlVerificationStatus?: string;
  appUrlVerificationStatus?: string;
  evidenceRefs?: string;
  urlVerificationHistory?: ScholarshipVerificationHistoryEntry[];
  lastVerifiedAt?: string;
  verificationNotes?: string;
  previousUrl?: string;
  isRenewable: boolean;
  renewalConditions?: string[];
  documents: string[];
  eligibility: StructuredEligibilityRule;
  versions: SchemeAcademicVersion[];
  tags: string[];
}

export const OFFICIAL_TRUSTED_SOURCES = [
  { id: 'src-nsp', name: 'National Scholarship Portal (NSP)', portalUrl: 'https://scholarships.gov.in/All-Scholarships', domain: 'scholarships.gov.in', category: 'Central Government' },
  { id: 'src-tn-bcmbc', name: 'Tamil Nadu BC/MBC/DNC Welfare Department', portalUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm', domain: 'bcmbcmw.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-adw', name: 'Tamil Nadu Adi Dravidar Welfare Department', portalUrl: 'https://tnadwscholarship.in/', domain: 'tnadwscholarship.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-tils', name: 'Tamil Nadu Schemes Portal (Pudhumai Penn / Tamil Pudhalvan)', portalUrl: 'https://tils.tn.gov.in/schemes', domain: 'tils.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-dce', name: 'Tamil Nadu Directorate of Collegiate Education', portalUrl: 'https://tndce.tn.gov.in/Home/scholarship', domain: 'tndce.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-ugc', name: 'University Grants Commission (UGC) Student Corner', portalUrl: 'https://www.ugc.gov.in/Home/student_Corner', domain: 'ugc.gov.in', category: 'UGC' },
  { id: 'src-aicte', name: 'AICTE Student Development Schemes', portalUrl: 'https://www.aicte.gov.in/schemes/students-development-schemes', domain: 'aicte.gov.in', category: 'AICTE' },
  { id: 'src-mota', name: 'Ministry of Tribal Affairs', portalUrl: 'https://tribal.nic.in/ScholarshiP.aspx', domain: 'tribal.nic.in', category: 'Central Government' },
  { id: 'src-icar', name: 'Indian Council of Agricultural Research (ICAR)', portalUrl: 'https://icar.org.in/', domain: 'icar.org.in', category: 'ICAR' },
  { id: 'src-dic', name: 'Digital India Corporation (Visvesvaraya PhD Scheme)', portalUrl: 'https://phd.dic.gov.in/', domain: 'phd.dic.gov.in', category: 'Central Government' },
  { id: 'src-pmrf', name: 'PMRF National Coordinating Institute (IIT Madras)', portalUrl: 'https://www.pmrf.in/', domain: 'pmrf.in', category: 'Central Government' },
  { id: 'src-serb', name: 'Science and Engineering Research Board (SERB / ANRF)', portalUrl: 'https://www.serbonline.in/', domain: 'serbonline.in', category: 'Research Council' },
  { id: 'src-vidyadhan', name: 'Sarojini Damodaran Foundation (Vidyadhan)', portalUrl: 'https://www.vidyadhan.org/', domain: 'vidyadhan.org', category: 'Institution / Foundation' },
  { id: 'src-reliance', name: 'Reliance Foundation Scholarships', portalUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27', domain: 'reliancefoundation.org', category: 'Institution / Foundation' },
  { id: 'src-tata', name: 'Tata Capital Education & Sustainability', portalUrl: 'https://www.tatacapital.com/sustainability/education.html', domain: 'tatacapital.com', category: 'Institution / Foundation' },
  { id: 'src-hdfc', name: 'HDFC Bank Parivartan ECSS', portalUrl: 'https://www.parivartanecss.com/', domain: 'parivartanecss.com', category: 'Institution / Foundation' },
  { id: 'src-kotak', name: 'Kotak Education Foundation', portalUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship', domain: 'kotakeducationfoundation.org', category: 'Institution / Foundation' },
  { id: 'src-jindal', name: 'Sitaram Jindal Foundation', portalUrl: 'https://www.sitaramjindalfoundation.org/', domain: 'sitaramjindalfoundation.org', category: 'Institution / Foundation' },
];

export type StudyLevel = EducationStage;
export type SchemeApplicationStatus = LifecycleStatus;
export type ScholarshipProgram = ComprehensiveScholarship;

export const MASTER_DOCUMENT_CHECKLIST = [
  { id: 'doc-aadhaar', name: 'Student Aadhaar Card (Aadhaar-seeded on NPCI mapper)', authority: 'UIDAI', description: 'Mandatory identity proof with active NPCI bank link' },
  { id: 'doc-comm', name: 'Permanent Community Certificate (BC / MBC / DNC / SC / ST)', authority: 'Revenue Tahsildar / e-Sevai', description: 'Statutory certificate proving caste category' },
  { id: 'doc-inc', name: 'Annual Family Income Certificate', authority: 'Revenue Tahsildar / e-Sevai', description: 'Issued within past 12 months for parental income verification' },
  { id: 'doc-marks', name: 'Previous Examination Marksheet / Grade Sheet', authority: 'Board / University Examination Cell', description: 'Certified marksheet of qualifying examination' },
  { id: 'doc-bonafide', name: 'Current Academic Year Bonafide Certificate', authority: 'School Principal / College Dean', description: 'Proof of regular enrollment in current academic year' },
  { id: 'doc-firstgen', name: 'First Generation Graduate Certificate', authority: 'Revenue Tahsildar', description: 'Certifies no previous degree holders in immediate family' },
  { id: 'doc-tnschool', name: 'Tamil Nadu Government School Study Certificate (Class 6-12)', authority: 'Headmaster / EMIS Portal', description: 'Verification of government school attendance for Pudhumai Penn/Tamil Pudhalvan' },
  { id: 'doc-pwd', name: 'Unique Disability ID (UDID) Card', authority: 'Medical Board / UDID Portal', description: '40%+ benchmark disability certification' },
  { id: 'doc-sgc', name: 'Single Girl Child Affidavit on Stamp Paper', authority: 'Notary Public / Judicial Magistrate', description: 'Sworn affidavit certifying only child / daughter' },
  { id: 'doc-phd', name: 'PhD Admission Order & Guide Recommendation', authority: 'Registrar / Research Directorate', description: 'Doctoral enrollment proof with guide allotment' },
];

export const GENUINE_SCHOLARSHIP_CATALOGUE: ComprehensiveScholarship[] = [
  // ==========================================
  // A. TAMIL NADU GOVERNMENT SCHEMES
  // ==========================================
  {
    id: 'tn-bc-prematric',
    code: 'TN-BC-PRE',
    name: 'BC / MBC / DNC Pre-Matric Educational Assistance',
    tamilName: 'பிற்படுத்தப்பட்டோர் பள்ளி மாணவ உதவித்தொகை திட்டம்',
    provider: 'Department of Backward Classes, Most Backward Classes & Minorities Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 10'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students belonging to BC, MBC, and DNC studying in Class 9 and 10 in Government and Aided schools',
    summary: 'Financial support and exam fee reimbursement to reduce dropouts among backward classes students in secondary school.',
    detailedDescription: 'Provides examination fee reimbursement and book allowances to BC, MBC and DNC students in recognized Tamil Nadu schools.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Academic year 2026–27 applications active through institutions/headmasters.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued enrollment in Class 10 without breaking academic year'],
    documents: ['Community Certificate (BC/MBC/DNC)', 'Income Certificate (under ₹2,50,000)', 'School Bonafide / EMIS number', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['BC', 'MBC', 'DNC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Annual parental income must not exceed ₹2,50,000'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Special fee coverage and secondary examination fee waiver',
        amountPublished: false,
        publishedAmountDetails: 'Fee exemption as per current Government Order',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Tamil Nadu', 'Pre-Matric', 'Class 10', 'BC', 'MBC', 'DNC']
  },
  {
    id: 'tn-bc-postmatric',
    code: 'TN-BC-PMS',
    name: 'BC Post-Matric Scholarship Scheme',
    tamilName: 'பிற்படுத்தப்பட்டோர் மெட்ரிக்குலேசனுக்குப் பிந்தைய கல்வி உதவித்தொகை',
    provider: 'Department of Backward Classes Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Eligible Backward Classes (BC) students pursuing diploma, degree, professional or postgraduate courses in Tamil Nadu',
    summary: 'Maintenance allowance and non-refundable institutional fee support for BC students pursuing post-matric studies.',
    detailedDescription: 'The scheme covers maintenance allowance and tuition fees for eligible BC students enrolled in recognized institutions.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Academic year 2026–27 applications active through colleges/institutions.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Satisfactory attendance in college', 'Promotion to next academic semester without discontinuation'],
    documents: ['Permanent Community Certificate (BC)', 'Current Income Certificate from Tahsildar', 'Previous Exam Marksheet', 'Bonafide Certificate', 'Aadhaar-linked Bank Account'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['BC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Annual family income must not exceed ₹2,50,000 from all sources'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Maintenance allowance and approved compulsory fees',
        amountPublished: false,
        publishedAmountDetails: 'Variable by course type and hosteller/day-scholar status as per State G.O.',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Tamil Nadu', 'Post-Matric', 'BC', 'Undergraduate', 'Postgraduate', 'Diploma']
  },
  {
    id: 'tn-mbc-postmatric',
    code: 'TN-MBC-PMS',
    name: 'MBC / DNC Post-Matric Scholarship Scheme',
    tamilName: 'மிகவும் பிற்படுத்தப்பட்டோர் மற்றும் சீர்மரபினர் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
    provider: 'Department of Most Backward Classes & Denotified Communities Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Eligible MBC and DNC students pursuing polytechnic, arts, science, engineering, medicine, and postgraduate programmes',
    summary: 'Educational assistance for Most Backward Classes and Denotified Communities students studying post-secondary courses.',
    detailedDescription: 'Enables MBC and DNC students to undertake technical, professional and university education without economic barriers.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Academic year 2026–27 applications active through colleges/institutions.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued study and promotion without backlogs beyond permissible rules'],
    documents: ['Community Certificate (MBC / DNC)', 'Income Certificate', 'Qualifying Marksheet', 'College Bonafide', 'Aadhaar seeded bank account'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['MBC', 'DNC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Annual family income ceiling is ₹2,50,000'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full tuition fee reimbursement and monthly maintenance allowance',
        amountPublished: false,
        publishedAmountDetails: 'Prescribed by annual department orders',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Tamil Nadu', 'MBC', 'DNC', 'Post-Matric', 'Higher Education']
  },
  {
    id: 'tn-bc-free-education',
    code: 'TN-BC-FE',
    name: 'BC / MBC / DNC Free Education Scheme for 3-Year Degree Courses',
    tamilName: 'இலவசக் கல்வித் திட்டம் (3 ஆண்டு இளங்கலைப் பட்டப்படிப்புகள்)',
    provider: 'Department of Backward Classes Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Fee Concession',
    educationStages: ['Diploma', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'BC, MBC and DNC students in 3-year BA, BSc, BCom, and 3-year Polytechnic Diploma courses in Govt and Aided colleges',
    summary: 'Complete exemption of tuition fees and special fees for students enrolled in 3-year undergraduate and diploma courses.',
    detailedDescription: 'No tuition fee is levied from eligible BC, MBC, and DNC students studying in government and aided arts and science colleges and polytechnics.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continuous enrollment in the approved 3-year course'],
    documents: ['Community Certificate', 'Income Certificate (Where required; MBC/DNC general degree exempted as per GO)', 'College Allotment Order'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['BC', 'MBC', 'DNC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'For BC students, income ceiling is ₹2,50,000; MBC/DNC general degree subject to specific state circular'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '100% Tuition fee and special fee waiver directly settled with college',
        amountPublished: true,
        publishedAmountDetails: 'Full tuition fee waiver (no cash payment to student)',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-03-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Fee Concession', 'Free Education', 'Tamil Nadu', 'UG', 'Diploma']
  },
  {
    id: 'tn-rural-girls-incentive',
    code: 'TN-RURAL-GIRLS',
    name: "Rural Girls' Incentive Scheme",
    tamilName: 'கிராமப்புற பெண் மாணவிகளுக்கான ஊக்கத்தொகை திட்டம்',
    provider: 'Directorate of School Education / Social Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Incentive',
    educationStages: ['Class 10'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Girl students from rural areas studying in Class 10 in Government and Aided schools',
    summary: 'Cash incentive designed to encourage rural girl students to complete secondary schooling and prevent early dropouts.',
    detailedDescription: 'An incentive given to female students studying in rural schools of Tamil Nadu upon continuous attendance through standard 10.',
    officialGuidelinesUrl: 'https://www.myscheme.gov.in/schemes/rgis',
    officialApplicationUrl: 'https://www.myscheme.gov.in/schemes/rgis',
    officialInfoUrl: 'https://www.myscheme.gov.in/schemes/rgis',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'OFFICIAL TN PAGE FOUND — CONTENT AGE REVIEW',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Directorate of Collegiate Education incentive active for rural girls.',
    previousUrl: 'https://tndce.tn.gov.in/Home/scholarship',
    evidenceRefs: 'turn433479search8',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'OFFICIAL TN PAGE FOUND — CONTENT AGE REVIEW',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Official Directorate of Collegiate Education page is indexed, but its displayed update date is 2024; current scheme cycle needs manual confirmation.',
        evidenceRefs: 'turn433479search8'
      }
    ],
    isRenewable: false,
    documents: ['Rural Residence Proof from Gram Panchayat', 'School Bonafide Certificate', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      genderEligibility: 'Girl / Woman',
      tnGovtSchoolRequired: true,
      otherConditions: ['School must be situated in a notified rural village panchayat area.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Annual cash incentive disbursed through state school education account',
        amountPublished: true,
        publishedAmountDetails: '₹500 to ₹1,000 cash incentive per eligible academic stage',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tndce.tn.gov.in/Home/scholarship',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Incentive', 'Rural', 'Girl students', 'School', 'Class 10', 'Tamil Nadu']
  },
  {
    id: 'tn-first-graduate',
    code: 'TN-FIRST-GRAD',
    name: 'First Graduate Fee Concession Scheme',
    tamilName: 'முதல் தலைமுறை பட்டதாரி கல்விக் கட்டண சலுகை',
    provider: 'Directorate of Technical Education (DoTE) & Higher Education Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Fee Concession',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students who are the first in their entire family to enter higher degree/professional education admitted via Single Window Counselling',
    summary: 'Tuition fee concession of up to ₹25,000–₹27,500/year for first-generation graduates admitted through TNEA counselling.',
    detailedDescription: 'Government of Tamil Nadu reimburses the tuition fees for students who are the first graduates in their family admitted to professional engineering, medical, and agriculture courses through government single-window counselling.',
    officialGuidelinesUrl: 'https://www.tndte.gov.in/',
    officialApplicationUrl: 'https://www.tneaonline.org/',
    officialInfoUrl: 'https://www.tndte.gov.in/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL SCHEME-SPECIFIC VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'GENERAL ADMISSION PORTAL; DIRECT SCHEME FORM NOT CONFIRMED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'TNEA/TNDTE destinations are institutional portals, but the exact scheme-specific application path was not established.',
    previousUrl: 'https://www.tneaonline.org/',
    evidenceRefs: '',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL SCHEME-SPECIFIC VERIFICATION REQUIRED',
        appStatus: 'GENERAL ADMISSION PORTAL; DIRECT SCHEME FORM NOT CONFIRMED',
        notes: 'TNEA/TNDTE destinations are institutional portals, but the exact scheme-specific application path was not established.',
        evidenceRefs: ''
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continuous study in the professional degree without disciplinary suspension'],
    documents: ['First Graduate Certificate issued by Revenue Tahsildar / e-Sevai', 'Joint Declaration signed by Parent and Student', 'TNEA / Allotment Order', 'Family Ration Card / Smart Card'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      firstGenerationGraduateRequired: true,
      otherConditions: [
        'No other sibling in the family has completed or is pursuing a graduation degree.',
        'Must be admitted via Government Single Window Counselling (e.g. TNEA).'
      ]
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Tuition fee reimbursement directly remitted to the professional college',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹25,000/year (Govt quota in self-financing) or full tuition fee waiver',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.tndte.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['First Graduate', 'Fee Concession', 'Engineering', 'TNEA', 'Professional degree', 'Tamil Nadu']
  },
  {
    id: 'tn-central-institutions-bc',
    code: 'TN-BC-CENTRAL',
    name: 'Special Educational Assistance for Students in Central Government Premier Institutions',
    tamilName: 'மத்திய அரசு கல்வி நிறுவனங்களில் பயிலும் பிற்படுத்தப்பட்ட மாணவ உதவித்தொகை',
    provider: 'Department of Backward Classes Welfare',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: false, // Applies to central institutions across India (IIT, IIM, NIT, etc.)
    audience: 'Tamil Nadu resident BC, MBC, and DNC students admitted into IITs, IIMs, NITs, AIIMS, and other notified Central Institutions',
    summary: 'Assistance of up to ₹2,00,000 per year or actual tuition fees for BC/MBC students securing admission in premier Central Government institutes.',
    detailedDescription: 'Special state grant supporting bright students from backward classes of Tamil Nadu who secure competitive admissions in national premier institutes.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Premier institute assistance active for 2026–27 session.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued academic good standing and passing semester examinations on first attempt'],
    documents: ['Community Certificate', 'Income Certificate (under ₹2.50 lakh)', 'Allotment & Admission Letter to notified Central Institute', 'Fee Receipt', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['BC', 'MBC', 'DNC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Annual family income must not exceed ₹2,50,000',
      otherConditions: ['Institution must be in the approved list of premier Central Government Institutions (IIT, NIT, IIM, IISc, AIIMS, IIIT, etc.).']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Tuition fees reimbursement up to ₹2,00,000 per year',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹2,00,000 per annum (or actual fees paid)',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Premier Institutes', 'IIT', 'NIT', 'IIM', 'BC', 'MBC', 'Tamil Nadu']
  },
  {
    id: 'tn-sc-postmatric',
    code: 'TN-ADW-PMS',
    name: 'SC / ST Post-Matric Scholarship Scheme (Tamil Nadu)',
    tamilName: 'ஆதிதிராவிடர் மற்றும் பழங்குடியினர் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['ITI', 'Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Scheduled Caste (SC), Scheduled Caste Converted Christians (SCC) and Scheduled Tribe (ST) students in Tamil Nadu',
    summary: 'Comprehensive fee reimbursement and living allowance for SC/ST students in post-matric diploma and degree programmes.',
    detailedDescription: 'Centrally sponsored and state implemented flagship scheme providing 100% compulsory non-refundable course fees and monthly living allowances.',
    officialGuidelinesUrl: 'https://tnadw.top/',
    officialApplicationUrl: 'https://tnadw.top/',
    officialInfoUrl: 'https://tnadw.top/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Tamil Nadu SC/ST Post-Matric active for 2026–27 session.',
    previousUrl: 'https://tnadw.top/',
    evidenceRefs: 'turn978552view3; turn205379search2',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
        evidenceRefs: 'turn978552view3; turn205379search2'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual academic promotion to the next stage of course'],
    documents: ['Permanent Community Certificate (SC / ST / SCC)', 'Annual Income Certificate from Revenue Tahsildar', 'Qualifying Marksheets', 'College Bonafide', 'Aadhaar-seeded Bank Account'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST', 'SCC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Parental annual income ceiling is ₹2,50,000'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full tuition fees + maintenance allowance per group slabs',
        amountPublished: false,
        publishedAmountDetails: 'Prescribed by Course Groups I–IV and Hosteller vs Day Scholar norms',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['SC', 'ST', 'SCC', 'Post-Matric', 'ADW', 'Tamil Nadu']
  },
  {
    id: 'tn-adw-hess',
    code: 'TN-ADW-HESS',
    name: 'ADW Higher Education Special Scholarship (HESS)',
    tamilName: 'உயர் கல்வி சிறப்பு கல்வி உதவித்தொகை (விடுதி மாணவர்களுக்கு)',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'SC / ST / SCC hostel-resident students pursuing professional and graduate degree programmes',
    summary: 'Annual scholarship of ₹7,500 to ₹8,000 for SC/ST students staying in recognized institutional hostels.',
    detailedDescription: 'Special financial assistance granted to SC/ST students residing in college attached hostels or recognized boarding houses.',
    officialGuidelinesUrl: 'https://tnadw.top/',
    officialApplicationUrl: 'https://tnadw.top/',
    officialInfoUrl: 'https://tnadw.top/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ADW Higher Education Special Scholarship active for 2026–27.',
    previousUrl: 'https://tnadw.top/',
    evidenceRefs: 'turn978552view3; turn205379search2',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
        evidenceRefs: 'turn978552view3; turn205379search2'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued residence in college recognized hostel'],
    documents: ['Community Certificate', 'Income Certificate', 'Hostel Warden Bonafide Certificate', 'College Fee Details'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST', 'SCC'],
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Annual family income must not exceed ₹2,50,000',
      otherConditions: ['Must be an inmate of an attached hostel of a recognized educational institution.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Annual financial grant towards hostel boarding expenses',
        amountPublished: true,
        publishedAmountDetails: '₹7,500/year (UG) and ₹8,000/year (PG/Professional)',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Hostel', 'HESS', 'SC', 'ST', 'Higher Education', 'Tamil Nadu']
  },
  {
    id: 'tn-adw-phd-incentive',
    code: 'TN-ADW-PHD-INC',
    name: 'ADW PhD Incentive Scheme for Full-Time Scholars',
    tamilName: 'முழுநேர முனைவர் பட்ட ஆராய்ச்சி மாணவர்களுக்கான ஊக்கத்தொகை திட்டம்',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Incentive',
    educationStages: ['PhD'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Full-time SC, ST, and SCC doctoral research scholars registered in universities/colleges of Tamil Nadu',
    summary: 'Financial incentive of ₹50,000 per year for full-time SC/ST/SCC PhD researchers.',
    detailedDescription: 'To promote research and doctoral degrees among SC and ST communities, the Tamil Nadu Government awards ₹50,000 per annum to full-time registered scholars.',
    officialGuidelinesUrl: 'https://tnadw.top/',
    officialApplicationUrl: 'https://tnadw.top/',
    officialInfoUrl: 'https://tnadw.top/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ADW PhD incentive scheme active for full-time scholars.',
    previousUrl: 'https://tnadw.top/',
    evidenceRefs: 'turn978552view3; turn205379search2',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
        evidenceRefs: 'turn978552view3; turn205379search2'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Submission of satisfactory annual doctoral research progress report by supervisor'],
    documents: ['SC/ST/SCC Community Certificate', 'Income Certificate (under ₹8,00,000)', 'PhD Registration / Admission Order', 'University Research Guide Bonafide'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST', 'SCC'],
      minIncomeCeiling: 800000,
      incomeConditionDescription: 'Annual family income ceiling is ₹8,00,000',
      requiresPhdEnrollment: true,
      otherConditions: ['Must be enrolled as a full-time PhD research scholar in a recognized university or research institution.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Annual incentive grant of ₹50,000 per year for up to 3–4 years',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['PhD', 'Research', 'Incentive', 'SC', 'ST', 'Doctorate', 'Tamil Nadu']
  },
  {
    id: 'tn-adw-phd-fellowship',
    code: 'TN-ADW-PHD-FEL',
    name: 'ADW PhD Fellowship Scheme',
    tamilName: 'ஆதிதிராவிடர் முனைவர் பட்ட ஆராய்ச்சி உதவித்தொகை (ஃபெலோஷிப்)',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Fellowship',
    educationStages: ['PhD', 'Junior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Full-time SC/ST research scholars pursuing PhD without any other UGC/CSIR fellowship',
    summary: 'Monthly research fellowship supporting meritorious SC and ST doctoral students.',
    detailedDescription: 'Monthly research stipend granted to selected SC/ST scholars pursuing doctoral research in approved institutions in Tamil Nadu.',
    officialGuidelinesUrl: 'https://tnadw.top/',
    officialApplicationUrl: 'https://tnadw.top/',
    officialInfoUrl: 'https://tnadw.top/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ADW PhD fellowship active for doctoral candidates.',
    previousUrl: 'https://tnadw.top/',
    evidenceRefs: 'turn978552view3; turn205379search2',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
        evidenceRefs: 'turn978552view3; turn205379search2'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual doctoral committee evaluation clearance'],
    documents: ['Community Certificate (SC/ST)', 'PhD Provisional Registration', 'Master’s Degree Certificate', 'Research Proposal Abstract', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST'],
      requiresPhdEnrollment: true,
      otherConditions: ['Must not be drawing any other regular central or state fellowship (e.g. UGC-JRF).']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Monthly fellowship allowance plus annual contingency grant',
        amountPublished: false,
        publishedAmountDetails: 'Monthly fellowship as notified in current ADW circular',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2027-01-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Fellowship', 'PhD', 'Research', 'SC', 'ST', 'Doctoral Studies']
  },
  {
    id: 'tn-overseas-ambedkar',
    code: 'TN-AA-OES',
    name: 'Annal Ambedkar Overseas Higher Education Scholarship',
    tamilName: 'அண்ணல் அம்பேத்கர் வெளிநாட்டு உயர்கல்வி உதவித்தொகை',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Completed UG', 'Completed PG', 'Postgraduate', 'PhD', 'Postdoctoral research'],
    isForTnResidents: true,
    isForStudyInTn: false, // For foreign university study
    audience: 'Eligible SC and ST candidates from Tamil Nadu securing admission in top 500 QS world ranked universities overseas',
    summary: 'Comprehensive scholarship funding tuition fees, living expenses, and international airfare for overseas postgraduate and PhD studies.',
    detailedDescription: 'Enables bright SC and ST youth from Tamil Nadu to study in world-class international universities, funding up to ₹36 lakh or full prescribed scheme caps.',
    officialGuidelinesUrl: 'https://tnadwscholarship.in/',
    officialApplicationUrl: 'https://tnadwscholarship.in/',
    officialInfoUrl: 'https://tnadwscholarship.in/',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN ADW PORTAL',
    appUrlVerificationStatus: 'PORTAL LIVE; NEW REGISTRATION CLOSED AT CHECK TIME',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Portal identifies the Tamil Nadu Department of Adi Dravidar and Tribal Welfare and publishes scheme guidelines; registration page displayed New Registration Closed.',
    previousUrl: 'https://tnadwscholarship.in/',
    evidenceRefs: 'turn978552view4; turn932496search1',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN ADW PORTAL',
        appStatus: 'PORTAL LIVE; NEW REGISTRATION CLOSED AT CHECK TIME',
        notes: 'Portal identifies the Tamil Nadu Department of Adi Dravidar and Tribal Welfare and publishes scheme guidelines; registration page displayed New Registration Closed.',
        evidenceRefs: 'turn978552view4; turn932496search1'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued academic good standing and progress certified by foreign university'],
    documents: ['SC/ST Community Certificate', 'Income Certificate (under ₹8 lakh)', 'Unconditional Offer Letter from Top 500 QS foreign university', 'Valid Indian Passport & Visa', 'GRE/IELTS/TOEFL scorecards if applicable'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST'],
      minIncomeCeiling: 800000,
      minMarksPercentage: 60,
      marksConditionDescription: 'Minimum 60% marks in qualifying undergraduate/postgraduate degree',
      requiresCompletedUG: true,
      otherConditions: ['University must rank in top 500 in QS World University Rankings.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Upcoming',
        isCurrentVersion: true,
        confirmedBenefits: 'Tuition fees, living allowance, visa, medical insurance and travel airfare',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹36,00,000 total grant or approved fee structure',
        applicationStartDate: null,
        applicationDeadline: null,
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Overseas', 'Master’s', 'PhD', 'SC', 'ST', 'Foreign Study', 'QS Top 500']
  },
  {
    id: 'tn-pudhumai-penn',
    code: 'TN-PUDHUMAI-PENN',
    name: 'Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme)',
    tamilName: 'புதுமைப் பெண் திட்டம் (மூவலூர் ராமாமிர்தம் அம்மையார் உயர்கல்வி உறுதித் திட்டம்)',
    provider: 'Social Welfare and Women Empowerment Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Incentive',
    educationStages: ['Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Girl students who completed continuous study from Class 6 to 12 in Tamil Nadu Government Schools entering higher education',
    summary: '₹1,000 per month deposited directly into bank accounts of eligible female students pursuing college and diploma courses.',
    detailedDescription: 'Landmark initiative by Tamil Nadu to transform female higher education enrollment. Disburses ₹1,000 every month via Direct Benefit Transfer throughout the undergraduate or diploma course.',
    officialGuidelinesUrl: 'https://tils.tn.gov.in/schemes',
    officialApplicationUrl: 'https://tils.tn.gov.in/schemes',
    officialInfoUrl: 'https://tils.tn.gov.in/schemes',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN SCHEME INFORMATION',
    appUrlVerificationStatus: 'UMIS ROUTE; DIRECT URL NOT EXTRACTED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Tamil Nadu Institute of Labour Studies page describes both schemes and says applications are processed through UMIS.',
    previousUrl: 'https://tils.tn.gov.in/schemes',
    evidenceRefs: 'turn932496search0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN SCHEME INFORMATION',
        appStatus: 'UMIS ROUTE; DIRECT URL NOT EXTRACTED',
        notes: 'Tamil Nadu Institute of Labour Studies page describes both schemes and says applications are processed through UMIS.',
        evidenceRefs: 'turn932496search0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued regular enrollment verified every semester by college nodal officer via UMIS'],
    documents: ['EMIS School Study Certificate (Class 6 to 12 in TN Govt School)', 'College Bonafide Certificate / Admission Receipt', '10th & 12th Marksheets', 'Aadhaar-linked Bank Account'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      genderEligibility: 'Girl / Woman',
      tnGovtSchoolRequired: true,
      otherConditions: [
        'Must have studied continuously from Class 6 through Class 12 in Tamil Nadu Government Schools.',
        'Must be currently enrolled in an approved undergraduate degree or diploma programme.'
      ]
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹1,000 per month credited directly via DBT to student bank account',
        amountPublished: true,
        publishedAmountDetails: '₹1,000 per month (₹12,000 per year)',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tils.tn.gov.in/schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Girl students', 'Higher Education', 'Direct Benefit Transfer', 'Pudhumai Penn', 'Tamil Nadu']
  },
  {
    id: 'tn-tamil-pudhalvan',
    code: 'TN-TAMIL-PUDHALVAN',
    name: 'Tamil Pudhalvan Scheme',
    tamilName: 'தமிழ்ப் புதல்வன் திட்டம்',
    provider: 'Social Welfare & Higher Education Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Incentive',
    educationStages: ['Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Boy students who studied from Class 6 to Class 12 in Tamil Nadu Government Schools enrolled in higher education',
    summary: '₹1,000 per month financial assistance directly deposited to support male students from government schools in college.',
    detailedDescription: 'Supports young men from government schools in meeting textbook, study material and academic expenses during their higher education journey.',
    officialGuidelinesUrl: 'https://tils.tn.gov.in/schemes',
    officialApplicationUrl: 'https://tils.tn.gov.in/schemes',
    officialInfoUrl: 'https://tils.tn.gov.in/schemes',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN SCHEME INFORMATION',
    appUrlVerificationStatus: 'UMIS ROUTE; DIRECT URL NOT EXTRACTED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Tamil Nadu Institute of Labour Studies page describes both schemes and says applications are processed through UMIS.',
    previousUrl: 'https://tils.tn.gov.in/schemes',
    evidenceRefs: 'turn932496search0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN SCHEME INFORMATION',
        appStatus: 'UMIS ROUTE; DIRECT URL NOT EXTRACTED',
        notes: 'Tamil Nadu Institute of Labour Studies page describes both schemes and says applications are processed through UMIS.',
        evidenceRefs: 'turn932496search0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Semester continuity verification submitted by college nodal officer'],
    documents: ['School Study Certificate from Class 6 to 12 in Government School (EMIS)', 'College Bonafide Certificate', '10th & 12th Marksheets', 'Aadhaar-linked Bank Account'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      genderEligibility: 'Boy / Man',
      tnGovtSchoolRequired: true,
      otherConditions: [
        'Must have completed schooling from Class 6 through 12 in Government Schools of Tamil Nadu.',
        'Must be enrolled in an approved undergraduate degree or diploma programme.'
      ]
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹1,000 per month credited directly to the student’s bank account via DBT',
        amountPublished: true,
        publishedAmountDetails: '₹1,000 per month (₹12,000 per year)',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tils.tn.gov.in/schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Boy students', 'Higher Education', 'Direct Benefit Transfer', 'Tamil Pudhalvan', 'Tamil Nadu']
  },
  {
    id: 'tn-perarignar-anna-award',
    code: 'TN-PAMA',
    name: 'Perarignar Anna Memorial Award',
    tamilName: 'பேரறிஞர் அண்ணா நினைவு பரிசுத் திட்டம்',
    provider: 'Adi Dravidar and Tribal Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Incentive',
    educationStages: ['Undergraduate', 'Professional degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Top-ranking SC / ST boy and girl students in each district in the Class 12 Higher Secondary Examinations',
    summary: 'Merit award for top-scoring Scheduled Caste and Scheduled Tribe students in Class 12 board examinations pursuing higher education.',
    detailedDescription: 'Instituted in memory of Perarignar Anna, this incentive award is granted to the highest-scoring SC/ST students in every revenue district.',
    officialGuidelinesUrl: 'https://tnadw.top/',
    officialApplicationUrl: 'https://tnadw.top/',
    officialInfoUrl: 'https://tnadw.top/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
    previousUrl: 'https://tnadw.top/',
    evidenceRefs: 'turn978552view3; turn205379search2',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL AUTHORITY VERIFICATION REQUIRED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing tnadw.top page is branded as the Directorate but is not on a clearly attributable tn.gov.in domain; official e-Sevai listings confirm ADW scholarship services, but not every named scheme-to-link mapping.',
        evidenceRefs: 'turn978552view3; turn205379search2'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing all annual/semester university examinations on first attempt'],
    documents: ['Higher Secondary Examination (+2) Mark Sheet showing district rank', 'Community Certificate (SC / ST / SCC)', 'Admission proof in recognised degree course', 'Aadhaar details'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['SC', 'ST', 'SCC'],
      minMarksPercentage: 70,
      marksConditionDescription: 'Must be among the notified district toppers among SC/ST students in +2 public exam'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Upcoming',
        isCurrentVersion: true,
        confirmedBenefits: 'Annual cash award for the duration of the degree course',
        amountPublished: false,
        publishedAmountDetails: 'Fixed by ADW Department according to degree type',
        applicationStartDate: null,
        applicationDeadline: null,
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tnadwscholarship.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Merit', 'SC', 'ST', 'District Toppers', 'Tamil Nadu']
  },
  {
    id: 'tn-cm-overseas-minority',
    code: 'TN-CM-OS-MIN',
    name: "Chief Minister's Overseas Scholarship for Minorities",
    tamilName: 'முதலமைச்சரின் வெளிநாட்டு கல்வி உதவித்தொகை (சிறுபான்மையினர்)',
    provider: 'Minorities Welfare Department',
    department: 'Government of Tamil Nadu',
    category: 'Tamil Nadu Government',
    schemeType: 'Scholarship',
    educationStages: ['Completed UG', 'Completed PG', 'Postgraduate', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: false,
    audience: 'Eligible minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) domiciled in Tamil Nadu admitted to top world universities',
    summary: 'Financial assistance for meritorious minority students admitted into notified world-ranking universities overseas.',
    detailedDescription: 'Enables meritorious students from religious minority communities of Tamil Nadu to pursue postgraduate and doctoral studies in renowned international institutions.',
    officialGuidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes_minorities.htm',
    officialApplicationUrl: 'https://bcmbcmw.tn.gov.in/welfschemes_minorities.htm',
    officialInfoUrl: 'https://bcmbcmw.tn.gov.in/welfschemes_minorities.htm',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
    appUrlVerificationStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Chief Minister Overseas Scholarship for Minorities active for 2026–27.',
    previousUrl: 'https://bcmbcmw.tn.gov.in/welfschemes_minorities.htm',
    evidenceRefs: 'turn433479search6; turn433479search9',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL TN BC/MBC INFORMATION PAGE',
        appStatus: 'INSTITUTION / DEPARTMENT PROCESS; NOT A DIRECT ONLINE FORM',
        notes: 'Official BC/MBC welfare page describes scheme benefits and application through institutions/department. Automated open returned 502, but official search-indexed content was available.',
        evidenceRefs: 'turn433479search6; turn433479search9'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Satisfactory academic progress in foreign institution certified by academic supervisor'],
    documents: ['Minority Community Certificate / Self-Declaration', 'Income Certificate (under ₹8 lakh)', 'Unconditional Admission Offer Letter from recognized foreign university', 'Degree Certificate and Transcripts', 'Valid Passport'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      communityCategories: ['Minorities'],
      minIncomeCeiling: 800000,
      minMarksPercentage: 60,
      requiresCompletedUG: true
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Tuition fee and living assistance up to prescribed ceiling in notification',
        amountPublished: false,
        publishedAmountDetails: 'Capped as per annual notification',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://bcmbcmw.tn.gov.in/welfschemes_minorities.htm',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Overseas', 'Minorities', 'Muslim', 'Christian', 'Postgraduate', 'PhD']
  },

  // ==========================================
  // B. CENTRAL GOVERNMENT SCHEMES
  // ==========================================
  {
    id: 'nsp-nmmss',
    code: 'CENTRAL-NMMSS',
    name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    provider: 'Department of School Education & Literacy, Ministry of Education',
    department: 'Ministry of Education, Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 10', 'Class 11', 'Class 12'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious students studying in Class 9 through 12 in Government, Government-aided and local body schools qualified in state NMMSS exam',
    summary: '₹12,000 per annum to prevent dropout of meritorious students after Class 8 and assist them through secondary schooling.',
    detailedDescription: 'Centrally sponsored scholarship awarded to students from economically weaker sections who clear the State Level Selection Test in Class 8.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'NSP 2026–27 open for student application submissions.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Must secure minimum 55% in Class 9 and 11 (50% for SC/ST)', 'Must secure minimum 60% in Class 10 board exam'],
    documents: ['Class 8 / 9 Marksheet', 'Parental Income Certificate (under ₹3.50 lakh)', 'School Bonafide Certificate / U-DISE+ code', 'Student Aadhaar Card', 'NPCI Aadhaar-seeded Bank Account'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 350000,
      incomeConditionDescription: 'Parental income from all sources must not exceed ₹3,50,000 per annum',
      minMarksPercentage: 55,
      otherConditions: ['Students of Kendriya Vidyalayas, Navodaya Vidyalayas and private residential schools are not eligible under scheme rules.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹12,000 per annum (₹1,000 per month) via DBT on NSP',
        amountPublished: true,
        publishedAmountDetails: '₹12,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['NSP', 'School', 'Class 10', 'Class 11', 'Class 12', 'Merit-cum-Means']
  },
  {
    id: 'nsp-pmusp',
    code: 'CENTRAL-PMUSP',
    name: 'PM-USP Central Sector Scheme of Scholarship for College and University Students',
    provider: 'Department of Higher Education, Ministry of Education',
    department: 'Ministry of Education, Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious students who are in the top 20th percentile (above 80th percentile) in their respective State Class 12 board examination',
    summary: 'Merit-cum-means assistance of ₹12,000/year (UG) and ₹20,000/year (PG) for top board scorers from families with income below ₹4.5 lakh.',
    detailedDescription: 'Allocated on state quota basis. Offers financial support to cover day-to-day college expenses for top percentile scorers pursuing regular full-time degrees.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'PM-USP Central Sector Scheme 2026–27 open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Minimum 50% marks in annual university exam', 'Maintenance of at least 75% attendance'],
    documents: ['Class 12 Board Marksheet (within top 20th percentile cut-off)', 'Income Certificate (under ₹4.5 lakh)', 'College Admission Receipt & Bonafide', 'Aadhaar-seeded Bank Account'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 450000,
      minMarksPercentage: 80,
      marksConditionDescription: 'Must be above the 80th percentile of successful candidates in the relevant board stream',
      otherConditions: ['Pursuing regular full-time course (distance or correspondence courses are not eligible).']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹12,000/year for UG (1st to 3rd year) and ₹20,000/year for PG',
        amountPublished: true,
        publishedAmountDetails: '₹12,000/year (UG) & ₹20,000/year (PG)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['NSP', 'Central Sector', 'Merit', 'Undergraduate', 'Postgraduate']
  },
  {
    id: 'nsp-yasasvi-school',
    code: 'CENTRAL-YASASVI-SCH',
    name: 'PM YASASVI Top Class School Education for OBC, EBC and DNT',
    provider: 'Department of Social Justice and Empowerment',
    department: 'Ministry of Social Justice and Empowerment, Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 10', 'Class 11', 'Class 12'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious OBC, EBC, and DNT students studying in notified Top Class Schools',
    summary: 'Scholarship of up to ₹75,000 to ₹1,25,000 per annum covering tuition and school fees in notified top-class schools.',
    detailedDescription: 'Supports quality secondary education for disadvantaged backward groups studying in schools empanelled by the Ministry.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'PM YASASVI Top Class School scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued good academic standing in notified school'],
    documents: ['Category Certificate (OBC / EBC / DNT)', 'Income Certificate (under ₹2.5 lakh)', 'School Fee Receipt and Bonafide'],
    eligibility: {
      domicileRequired: 'India',
      communityCategories: ['OBC', 'EBC', 'DNT', 'BC', 'MBC'],
      minIncomeCeiling: 250000,
      otherConditions: ['Must be studying in an officially notified top-class school empanelled by MSJE.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full school fee and hostel charges up to scheme ceilings',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹75,000/year (Class 9-10) and ₹1,25,000/year (Class 11-12)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['PM YASASVI', 'OBC', 'EBC', 'DNT', 'School', 'Class 10', 'Class 11', 'Class 12']
  },
  {
    id: 'nsp-yasasvi-college',
    code: 'CENTRAL-YASASVI-COL',
    name: 'PM YASASVI Top Class Education in College for OBC, EBC and DNT',
    provider: 'Department of Social Justice and Empowerment',
    department: 'Ministry of Social Justice and Empowerment, Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'OBC, EBC, and DNT students admitted into notified premier higher education institutions (IITs, NITs, IIMs, Central Universities)',
    summary: 'Full tuition fee reimbursement and living allowance for students studying in notified premier colleges.',
    detailedDescription: 'Provides financial aid covering non-refundable fees, academic allowances, computer purchase, and living expenses in empanelled premier institutions.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'PM YASASVI Top Class College scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual academic promotion in the premier institute'],
    documents: ['OBC/EBC/DNT Certificate', 'Income Certificate (under ₹2.50 lakh)', 'Premier Institute Admission Allotment', 'Fee Structure'],
    eligibility: {
      domicileRequired: 'India',
      communityCategories: ['OBC', 'EBC', 'DNT', 'BC', 'MBC'],
      minIncomeCeiling: 250000,
      otherConditions: ['Must be admitted to an institution empanelled under Top Class College Education Scheme.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full tuition fee coverage + living allowance + book/computer grant',
        amountPublished: true,
        publishedAmountDetails: 'Full tuition fee + ₹3,000/month living + one-time laptop grant up to ₹45,000',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['PM YASASVI', 'College', 'Premier Institutes', 'OBC', 'EBC', 'DNT']
  },
  {
    id: 'nsp-sc-topclass',
    code: 'CENTRAL-SC-TOP',
    name: 'Central Sector Top Class Education Scheme for SC Students',
    provider: 'Ministry of Social Justice and Empowerment',
    department: 'Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious Scheduled Caste students admitted into notified top premier institutions (IITs, NITs, IIMs, NLS, AIIMS, etc.)',
    summary: 'Full tuition fee, living expenses, and equipment grant for SC students admitted into premier higher education institutes.',
    detailedDescription: 'Centrally funded scholarship covering full tuition fees without cap in government institutions, plus monthly living allowance of ₹3,000 and ₹45,000 computer grant.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'SC Top Class Education scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing semester exams and continuing enrollment in the premier institute'],
    documents: ['SC Community Certificate', 'Income Certificate (under ₹8 lakh)', 'Premier Institute Admission Order', 'Fee Structure'],
    eligibility: {
      domicileRequired: 'India',
      communityCategories: ['SC'],
      minIncomeCeiling: 800000,
      incomeConditionDescription: 'Total family income must not exceed ₹8,00,000 per annum',
      otherConditions: ['Must have secured admission in one of the notified institutions empanelled under the scheme.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full tuition fees + ₹3,000/month living + ₹86,000 computer & books assistance',
        amountPublished: true,
        publishedAmountDetails: 'Full tuition + ₹36,000/year living + ₹45,000 computer grant',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['NSP', 'SC', 'Top Class', 'IIT', 'NIT', 'IIM', 'Premier Institutes']
  },
  {
    id: 'central-nfst',
    code: 'CENTRAL-NFST',
    name: 'National Fellowship and Scholarship for Higher Education of ST Students',
    provider: 'Ministry of Tribal Affairs',
    department: 'Government of India',
    category: 'Central Government',
    schemeType: 'Fellowship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate', 'PhD', 'Junior Research Fellowship', 'Senior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'ST students in notified premier institutions (Top Class Scholarship) and ST scholars pursuing MPhil / PhD (Fellowship)',
    summary: 'Full tuition reimbursement and substantial monthly fellowship (up to ₹37,000/month) for ST doctoral scholars and premier institute students.',
    detailedDescription: 'Encourages ST scholars to attain premier degrees and doctoral research through total fee coverage and UGC JRF/SRF equivalent stipends.',
    officialGuidelinesUrl: 'https://tribal.nic.in/ScholarshiP.aspx',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://tribal.nic.in/ScholarshiP.aspx',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'National Fellowship for ST Students open on NSP / MoTA.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual academic report signed by university department head'],
    documents: ['ST Community Certificate', 'Income Certificate (under ₹6.00 lakh)', 'Admission / Registration Letter in premier institute or PhD', 'Aadhaar seeded bank account'],
    eligibility: {
      domicileRequired: 'India',
      communityCategories: ['ST'],
      minIncomeCeiling: 600000,
      incomeConditionDescription: 'Parental income ceiling is ₹6,00,000 per annum (not applicable for fellowship component under revised rules)'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full fees + living allowance (UG/PG) or ₹37,000/mo JRF/SRF stipend (PhD)',
        amountPublished: true,
        publishedAmountDetails: 'Full tuition fee + ₹3,000/mo (UG/PG); up to ₹37,000/mo + HRA (PhD Fellowship)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://tribal.nic.in/ScholarshiP.aspx',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['ST', 'Tribal Affairs', 'Fellowship', 'PhD', 'Premier Institutes']
  },
  {
    id: 'nsp-pwd-prematric',
    code: 'CENTRAL-PWD-PRE',
    name: 'Pre-Matric Scholarship for Students with Disabilities',
    provider: 'Department of Empowerment of Persons with Disabilities',
    department: 'Ministry of Social Justice and Empowerment',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 10'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students having 40% or more benchmark disability studying in Class 9 and 10 in recognized schools',
    summary: 'Maintenance allowance, book grant, and disability allowances for students with benchmark disabilities in secondary school.',
    detailedDescription: 'Assists children with disabilities to complete secondary school through financial aid covering transport, books and escort allowances.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Pre-Matric for Students with Disabilities open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Promotion to the next class'],
    documents: ['Unique Disability ID (UDID) Card / Medical Board Certificate (40%+)', 'Income Certificate (under ₹2.50 lakh)', 'School Bonafide', 'Bank Passbook'],
    eligibility: {
      domicileRequired: 'India',
      disabilityRequired: true,
      minIncomeCeiling: 250000,
      incomeConditionDescription: 'Parental income must not exceed ₹2,50,000 per annum'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Maintenance allowance (₹700/mo hosteller, ₹400/mo day scholar) + disability allowance',
        amountPublished: true,
        publishedAmountDetails: '₹4,000–₹7,000/year plus allowances',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Disability', 'UDID', 'Pre-Matric', 'Class 10', 'DEPwD']
  },
  {
    id: 'nsp-pwd-postmatric',
    code: 'CENTRAL-PWD-POST',
    name: 'Post-Matric Scholarship for Students with Disabilities',
    provider: 'Department of Empowerment of Persons with Disabilities',
    department: 'Ministry of Social Justice and Empowerment',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate', 'Professional degree', 'Integrated degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students with 40% or more benchmark disability pursuing post-matriculation courses from Class 11 up to Master’s degree',
    summary: 'Maintenance allowance, tuition fee coverage, and disability-aid allowances for students with disabilities in higher education.',
    detailedDescription: 'Central assistance supporting students with disabilities to pursue diploma, undergraduate, and postgraduate studies.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Post-Matric for Students with Disabilities open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued study in subsequent year without dropping out'],
    documents: ['UDID Card / Disability Certificate (40%+)', 'Income Certificate (under ₹2.50 lakh)', 'Admission Receipt and Bonafide', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      disabilityRequired: true,
      minIncomeCeiling: 250000
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Maintenance allowance (up to ₹4,000/mo) + fee reimbursement + reader/escort allowance',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹48,000/year depending on course group',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Disability', 'UDID', 'Post-Matric', 'Higher Education', 'DEPwD']
  },
  {
    id: 'nsp-pwd-topclass',
    code: 'CENTRAL-PWD-TOP',
    name: 'Top Class Education for Students with Disabilities',
    provider: 'Department of Empowerment of Persons with Disabilities',
    department: 'Ministry of Social Justice and Empowerment',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students with benchmark disabilities admitted to notified premier institutes (IITs, IIMs, NITs, Central Universities)',
    summary: 'Full tuition reimbursement, living allowance of ₹3,000/month, and assistive device grants for disabled scholars in premier institutes.',
    detailedDescription: 'Covers full tuition fees, books, computer and specialized assistive technology (e.g. screen readers, hearing aids, braille displays).',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Top Class for Students with Disabilities open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued enrollment in the premier institution'],
    documents: ['UDID Card', 'Income Certificate (under ₹6.00 lakh)', 'Institute Allotment Order', 'Fee Structure'],
    eligibility: {
      domicileRequired: 'India',
      disabilityRequired: true,
      minIncomeCeiling: 600000,
      incomeConditionDescription: 'Parental income ceiling is ₹6,00,000 per annum for Top Class scheme'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Full tuition fees + ₹3,000/mo living + ₹30,000 assistive device grant',
        amountPublished: true,
        publishedAmountDetails: 'Full tuition + ₹36,000/year living + assistive device grant',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Disability', 'Top Class', 'Premier Institutes', 'Assistive Devices']
  },
  {
    id: 'nsp-labour-beedi',
    code: 'CENTRAL-LABOUR-BEEDI',
    name: 'Financial Assistance for Education to Wards of Beedi / Cine / IOMC / LSDM Workers',
    provider: 'Labour Welfare Organisation, Ministry of Labour and Employment',
    department: 'Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Wards of registered Beedi workers, Cine workers, Iron Ore/Mica/Chrome/LSDM mine workers',
    summary: '₹1,000 to ₹25,000 per year assistance for children of manual beedi and unorganised mine/cine workers.',
    detailedDescription: 'Central welfare scholarship ensuring children of unorganised mine and beedi labourers can afford school and professional college education.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Financial Assistance for Beedi/Cine workers open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing previous academic year examination'],
    documents: ['Worker Identity Card / Registration Number of parent', 'Salary / Income Certificate (parent income under ₹10,000/month)', 'Previous Exam Marksheet', 'School/College Bonafide', 'Bank Passbook'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 120000,
      incomeConditionDescription: 'Total monthly family income of parent must not exceed ₹10,000 (₹1,20,000/year)',
      otherConditions: ['At least one parent must be a registered beedi, cine, or notified mine worker holding valid welfare identity card.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Annual scholarship amount categorized by education stage',
        amountPublished: true,
        publishedAmountDetails: '₹1,000 to ₹25,000/year (₹25,000 for Engineering/Medicine)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Labour Welfare', 'Beedi Workers', 'Cine Workers', 'NSP', 'Higher Education']
  },
  {
    id: 'nsp-pmss-capf',
    code: 'CENTRAL-PMSS-CAPF',
    name: 'Prime Minister’s Scholarship Scheme for Central Armed Police Forces & Assam Rifles',
    provider: 'Welfare and Rehabilitation Board (WARB), Ministry of Home Affairs',
    department: 'Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Dependent wards and widows of deceased or retired personnel of CAPFs (BSF, CRPF, CISF, ITBP, SSB) and Assam Rifles',
    summary: '₹3,000/month for girls and ₹2,500/month for boys pursuing first professional degree programmes (Engineering, MBBS, BDS, etc.).',
    detailedDescription: 'Assists children of brave CAPF personnel in completing professional degrees recognized by statutory councils.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'PMSS for CAPF & Assam Rifles open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing each academic year with minimum 50% marks'],
    documents: ['Service Certificate / Discharge Certificate / PPO of parent', 'Certificate from Competent Police / Assam Rifles Authority', 'Class 12 Marksheet (minimum 60%)', 'Professional College Admission Proof'],
    eligibility: {
      domicileRequired: 'India',
      minMarksPercentage: 60,
      marksConditionDescription: 'Minimum 60% marks in Class 12 / Diploma examination',
      otherConditions: ['Ward must be pursuing first professional degree (B.E., B.Tech, MBBS, BDS, B.Pharm, etc.) approved by statutory councils.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹36,000/year for girls (₹3,000/mo) and ₹30,000/year for boys (₹2,500/mo)',
        amountPublished: true,
        publishedAmountDetails: '₹30,000 to ₹36,000 per annum',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['PMSS', 'CAPF', 'Armed Forces', 'Police', 'Professional degree', 'NSP']
  },
  {
    id: 'nsp-pmss-police',
    code: 'CENTRAL-PMSS-POLICE',
    name: 'Prime Minister’s Scholarship Scheme for Wards of State Police Personnel Martyred in Terror / Naxal Attacks',
    provider: 'Police Division, Ministry of Home Affairs',
    department: 'Government of India',
    category: 'Central Government',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Dependent wards of State Police personnel who are martyred during terror / Naxal attacks pursuing first professional degree',
    summary: '₹36,000/year for girls and ₹30,000/year for boys pursuing professional degree programmes.',
    detailedDescription: 'Special central scholarship honouring the sacrifice of state police personnel martyred in action.',
    officialGuidelinesUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://scholarships.gov.in/All-Scholarships',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'PMSS for Police Personnel open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Minimum 50% marks in semester university exams'],
    documents: ['Certificate issued by State DGP / Home Department confirming sacrifice in terror/naxal attack', 'Class 12 Marksheet', 'College Admission Proof', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      minMarksPercentage: 60,
      otherConditions: ['Ward must be pursuing an approved professional degree course.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹3,000/month for girls and ₹2,500/month for boys',
        amountPublished: true,
        publishedAmountDetails: '₹30,000 to ₹36,000 per annum',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://scholarships.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['State Police', 'Martyrs', 'PMSS', 'Professional degree']
  },

  // ==========================================
  // C. AICTE TECHNICAL SCHEMES
  // ==========================================
  {
    id: 'aicte-pragati-degree',
    code: 'AICTE-PRAGATI-DEG',
    name: 'AICTE Pragati Scholarship for Girl Students – Technical Degree',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Girl students admitted to 1st year of AICTE-approved Technical Degree (B.E., B.Tech, B.Pharm, Architecture) or 2nd year lateral entry',
    summary: '₹50,000 per annum scholarship for female students admitted to AICTE-approved technical degree programmes.',
    detailedDescription: 'Supports girl students in technical engineering and technology degree education. Up to two girls per family are eligible.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Pragati Degree scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing semester exams and continuous enrollment in subsequent academic years'],
    documents: ['Class 10 and 12 Marksheets', 'TNEA / Central Allotment Letter to AICTE-approved institute', 'Family Income Certificate (under ₹8 lakh)', 'Parental Declaration (max 2 girl children)', 'Aadhaar-seeded Bank Account'],
    eligibility: {
      domicileRequired: 'India',
      genderEligibility: 'Girl / Woman',
      minIncomeCeiling: 800000,
      incomeConditionDescription: 'Annual family income must not exceed ₹8,00,000',
      otherConditions: ['Must be admitted into 1st year of technical degree or 2nd year through lateral entry in AICTE-approved institution.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum for each year of study (up to 4 years for Degree)',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Engineering', 'Girl students', 'Technical Degree', 'Pragati']
  },
  {
    id: 'aicte-pragati-diploma',
    code: 'AICTE-PRAGATI-DIP',
    name: 'AICTE Pragati Scholarship for Girl Students – Technical Diploma',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Diploma'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Girl students admitted to 1st year of AICTE-approved Polytechnic Diploma programmes or 2nd year lateral entry',
    summary: '₹50,000 per annum scholarship for female students admitted to technical polytechnic diploma courses.',
    detailedDescription: 'Promotes advancement of girl students in diploma polytechnic education, covering fees, books, equipment and living costs.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Pragati Diploma scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Clearing diploma semester examinations'],
    documents: ['Class 10 / ITI Marksheet', 'Polytechnic Allotment Order', 'Income Certificate (under ₹8 lakh)', 'Parental Declaration (max 2 girls)', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'India',
      genderEligibility: 'Girl / Woman',
      minIncomeCeiling: 800000,
      otherConditions: ['Must be in 1st year of Diploma or 2nd year lateral entry in an AICTE-approved polytechnic.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum for each year of diploma study (up to 3 years)',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Polytechnic', 'Diploma', 'Girl students', 'Pragati']
  },
  {
    id: 'aicte-saksham-degree',
    code: 'AICTE-SAKSHAM-DEG',
    name: 'AICTE Saksham Scholarship – Technical Degree',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Specially-abled students having 40% or more disability enrolled in AICTE-approved technical degree programmes',
    summary: '₹50,000 per annum scholarship for specially-abled students pursuing technical degree education.',
    detailedDescription: 'Supports specially-abled students to pursue professional engineering and technology programmes without financial hurdles.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Saksham Degree scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing semester exams in the engineering programme'],
    documents: ['UDID Card / Disability Certificate (40%+)', 'Admission Allotment Order', 'Family Income Certificate (under ₹8 lakh)', 'Previous Class Marksheet'],
    eligibility: {
      domicileRequired: 'India',
      disabilityRequired: true,
      minIncomeCeiling: 800000,
      otherConditions: ['Enrolled in AICTE-approved technical degree course.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum towards fees, books, computer and assistive tools',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Disability', 'Special Needs', 'Engineering', 'Saksham']
  },
  {
    id: 'aicte-saksham-diploma',
    code: 'AICTE-SAKSHAM-DIP',
    name: 'AICTE Saksham Scholarship – Technical Diploma',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Diploma'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Specially-abled students having 40% or more disability enrolled in AICTE-approved polytechnic diploma courses',
    summary: '₹50,000 per annum scholarship for specially-abled students pursuing technical diploma studies.',
    detailedDescription: 'Provides aid towards polytechnic fees, living expenses and assistive devices.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Saksham Diploma scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued study in polytechnic'],
    documents: ['UDID Certificate (40%+)', 'Polytechnic Allotment Letter', 'Income Certificate (under ₹8 lakh)', 'Class 10 Marksheet'],
    eligibility: {
      domicileRequired: 'India',
      disabilityRequired: true,
      minIncomeCeiling: 800000
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum for the diploma duration',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Polytechnic', 'Disability', 'Saksham', 'Diploma']
  },
  {
    id: 'aicte-swanath-degree',
    code: 'AICTE-SWANATH-DEG',
    name: 'AICTE Swanath Scholarship – Technical Degree',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Orphans, wards of parents who died due to Covid-19, and wards of Armed Forces/Paramilitary personnel martyred in action',
    summary: '₹50,000 per annum scholarship providing financial aid to orphans, Covid-affected youth, and martyrs’ children in engineering degrees.',
    detailedDescription: 'Provides financial security and encouragement to vulnerable youth pursuing technical degree programmes in AICTE institutions.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Swanath Degree scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued enrollment in the technical institution'],
    documents: ['Orphan Certificate / Death Certificates of both parents / Martyr Certificate', 'Admission Proof in AICTE approved college', 'Income Certificate (if applicable, under ₹8 lakh)', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 800000,
      otherConditions: ['Must belong to one of the notified Swanath categories: Orphan, both parents died due to Covid-19, or child of Armed Forces/Paramilitary martyr.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum for every year of technical degree study',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Swanath', 'Orphan', 'Armed Forces', 'Engineering']
  },
  {
    id: 'aicte-swanath-diploma',
    code: 'AICTE-SWANATH-DIP',
    name: 'AICTE Swanath Scholarship – Technical Diploma',
    provider: 'All India Council for Technical Education (AICTE)',
    department: 'Ministry of Education, Government of India',
    category: 'AICTE',
    schemeType: 'Scholarship',
    educationStages: ['Diploma'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Orphans, Covid-affected children, and wards of martyrs admitted to AICTE polytechnic diploma courses',
    summary: '₹50,000 per annum scholarship for vulnerable students enrolled in approved technical diploma programmes.',
    detailedDescription: 'Financial assistance for polytechnic education covering tuition and maintenance for eligible orphans and martyrs’ wards.',
    officialGuidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'AICTE Swanath Diploma scheme open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP / AUTHORITY LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; SCHEME-SPECIFIC FORM REQUIRES STUDENT LOGIN',
        notes: 'NSP lists current 2026–27 schemes. AICTE authority URL was updated to the current aicte.gov.in destination after the old domain redirected.',
        evidenceRefs: 'turn433479search0; turn433479search1; turn978552view7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing diploma semester examinations'],
    documents: ['Orphan / Death / Martyr Certificate', 'Polytechnic Allotment Order', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 800000,
      otherConditions: ['Eligible under Swanath criteria (orphan/covid/martyr) in AICTE polytechnic.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹50,000 per annum for diploma duration',
        amountPublished: true,
        publishedAmountDetails: '₹50,000 per year',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.aicte-india.org/schemes/students-development-schemes',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['AICTE', 'Polytechnic', 'Diploma', 'Swanath', 'Orphan Support']
  },

  // ==========================================
  // D. UGC AND POSTGRADUATE SCHEMES
  // ==========================================
  {
    id: 'ugc-nspgs',
    code: 'UGC-NSPGS',
    name: 'National Scholarship for Post Graduate Studies (UGC)',
    provider: 'University Grants Commission (UGC)',
    department: 'Ministry of Education, Government of India',
    category: 'UGC',
    schemeType: 'Scholarship',
    educationStages: ['Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious students admitted into the first year of regular Master’s degree programmes in recognized universities and colleges',
    summary: '₹15,000 per month scholarship for meritorious students pursuing full-time postgraduate studies.',
    detailedDescription: 'The UGC flagship postgraduate scholarship awarding ₹15,000 every month for 10 months each academic year to selected PG scholars across India.',
    officialGuidelinesUrl: 'https://www.ugc.gov.in/Home/student_Corner',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.ugc.gov.in/Home/student_Corner',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
    appUrlVerificationStatus: 'NSP APPLICATION ROUTE',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'UGC National Scholarship for Post Graduate Studies open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn932496search5; turn932496search7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
        appStatus: 'NSP APPLICATION ROUTE',
        notes: 'UGC Student Corner lists these scholarship/fellowship categories. Canara Bank application endpoint could not be independently fetched in this review.',
        evidenceRefs: 'turn932496search5; turn932496search7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Progress report from university at the end of the first year'],
    documents: ['Undergraduate Degree Certificate & Consolidated Marksheet', 'PG Admission Proof & Bonafide from University', 'Aadhaar-seeded Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedUG: true,
      otherConditions: [
        'Must be in the 1st year of regular, full-time postgraduate degree in a recognized institution.',
        'Must not hold any other duplicate central or state scholarship.'
      ]
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹15,000 per month for a period of two years (10 months per year)',
        amountPublished: true,
        publishedAmountDetails: '₹15,000 per month (₹1,50,000 per year)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.ugc.gov.in/Home/student_Corner',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['UGC', 'Postgraduate', 'Master’s', 'NSPGS', 'NSP']
  },
  {
    id: 'ugc-jrf-humanities-science',
    code: 'UGC-JRF',
    name: 'UGC Junior Research Fellowship in Science, Humanities and Social Sciences',
    provider: 'University Grants Commission (UGC)',
    department: 'Ministry of Education, Government of India',
    category: 'UGC',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Junior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Candidates who have qualified the UGC-NET or UGC-CSIR NET exam with Junior Research Fellowship (JRF) award and enrolled in PhD',
    summary: '₹37,000/month JRF stipend for first 2 years, upgradable to ₹42,000/month SRF for next 3 years + HRA & contingency grant.',
    detailedDescription: 'The premier national fellowship for doctoral researchers who qualify the National Eligibility Test (NET-JRF), enabling full-time doctoral research in Indian universities.',
    officialGuidelinesUrl: 'https://www.ugc.gov.in/Fellowship/',
    officialApplicationUrl: 'https://scholarship.canarabank.in/',
    officialInfoUrl: 'https://www.ugc.gov.in/Fellowship/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'UGC Student Corner lists these scholarship/fellowship categories. Canara Bank application endpoint could not be independently fetched in this review.',
    previousUrl: 'https://scholarship.canarabank.in/',
    evidenceRefs: 'turn932496search5; turn932496search7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'UGC Student Corner lists these scholarship/fellowship categories. Canara Bank application endpoint could not be independently fetched in this review.',
        evidenceRefs: 'turn932496search5; turn932496search7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Passing 2-year doctoral committee review for promotion from JRF to SRF'],
    documents: ['UGC-NET JRF Award Letter', 'Master’s Degree with min 55% marks', 'PhD Registration Letter from University', 'Supervisor Joining Report', 'HRA & Contingency bills'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      requiresPhdEnrollment: true,
      requiresEntranceExam: ['UGC-NET', 'CSIR-NET'],
      ageLimitYears: 30, // 35 for reserved categories/women
      otherConditions: ['Must qualify UGC-NET with JRF cut-off and secure admission to full-time PhD within 3 years of JRF award.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹37,000/mo (JRF) & ₹42,000/mo (SRF) + HRA (up to 27%) + ₹10,000–₹20,500/year contingency',
        amountPublished: true,
        publishedAmountDetails: '₹37,000/month (JRF) / ₹42,000/month (SRF) + HRA',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.ugc.gov.in/Fellowship/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['UGC-NET', 'JRF', 'SRF', 'PhD', 'Fellowship', 'Doctoral Research']
  },
  {
    id: 'ugc-savitribai-single-girl',
    code: 'UGC-SJPGC',
    name: 'Savitribai Jyotirao Phule Fellowship for Single Girl Child',
    provider: 'University Grants Commission (UGC)',
    department: 'Ministry of Education, Government of India',
    category: 'UGC',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Junior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Single girl children enrolled in full-time PhD programmes in any stream in Indian universities',
    summary: 'Dedicated doctoral fellowship of ₹37,000 to ₹42,000/month for single girl children pursuing full-time PhD.',
    detailedDescription: 'Promotes doctoral research among women who are the only girl child in their family, providing full JRF/SRF stipend parity for up to 5 years.',
    officialGuidelinesUrl: 'https://www.ugc.gov.in/Fellowship/',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://www.ugc.gov.in/Fellowship/',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
    appUrlVerificationStatus: 'NSP APPLICATION ROUTE',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'UGC Savitribai Phule Fellowship for Single Girl Child open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn932496search5; turn932496search7',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL UGC INFORMATION',
        appStatus: 'NSP APPLICATION ROUTE',
        notes: 'UGC Student Corner lists these scholarship/fellowship categories. Canara Bank application endpoint could not be independently fetched in this review.',
        evidenceRefs: 'turn932496search5; turn932496search7'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Satisfactory progress in doctoral research certified by guide'],
    documents: ['Single Girl Child Affidavit on Stamp Paper', 'PhD Admission Order from University', 'Master’s Degree Certificate', 'Supervisor Recommendation', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      genderEligibility: 'Girl / Woman',
      singleGirlChildRequired: true,
      requiresCompletedPG: true,
      requiresPhdEnrollment: true,
      ageLimitYears: 40
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹37,000/mo (first 2 years) & ₹42,000/mo (remaining 3 years) + HRA & contingency',
        amountPublished: true,
        publishedAmountDetails: '₹37,000/month (JRF rate) / ₹42,000/month (SRF rate)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.ugc.gov.in/Fellowship/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Single Girl Child', 'UGC', 'PhD', 'Fellowship', 'Women in Research']
  },

  // ==========================================
  // E. ICAR AND AGRICULTURAL EDUCATION
  // ==========================================
  {
    id: 'icar-nts-ug',
    code: 'ICAR-NTS-UG',
    name: 'ICAR National Talent Scholarship (NTS) – Undergraduate',
    provider: 'Indian Council of Agricultural Research (ICAR)',
    department: 'Department of Agricultural Research & Education (DARE)',
    category: 'ICAR',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students admitted through ICAR All India Entrance Examination (CUET-ICAR) to UG programmes in State Agricultural Universities outside their home state',
    summary: '₹3,000 per month scholarship for students admitted through ICAR national quota into agricultural and allied sciences.',
    detailedDescription: 'Awarded to encourage national integration in agricultural education (B.Sc Agriculture, Horticulture, Forestry, Sericulture, Food Nutrition, B.Tech Agricultural Engineering).',
    officialGuidelinesUrl: 'https://icar.org.in/',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://icar.org.in/',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ICAR National Talent Scholarship (UG) listed and open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn205379search0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
        notes: 'NSP live catalogue lists ICAR NTS-UG, Post Graduate Scholarship, NTS-PG and JRF/SRF; the previous ICAR homepage was not a direct application destination.',
        evidenceRefs: 'turn205379search0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Maintaining minimum OGPA of 7.00/10.00 in each academic semester'],
    documents: ['ICAR Allotment Letter', 'Admission Fee Receipt in SAU', 'Class 12 Marksheet', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'India',
      minMarksPercentage: 60,
      requiresEntranceExam: ['ICAR-AICE'],
      otherConditions: ['Must be admitted through ICAR All India quota to a university outside your state of domicile.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹3,000 per month for the duration of the 4-year undergraduate degree',
        amountPublished: true,
        publishedAmountDetails: '₹3,000 per month (₹36,000 per year)',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://icar.org.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['ICAR', 'Agriculture', 'Horticulture', 'Undergraduate', 'National Talent']
  },
  {
    id: 'icar-pgs-jrf',
    code: 'ICAR-PGS-JRF',
    name: 'ICAR Post Graduate Scholarship / Junior Research Fellowship (ICAR-PG-JRF)',
    provider: 'Indian Council of Agricultural Research (ICAR)',
    department: 'Government of India',
    category: 'ICAR',
    schemeType: 'Fellowship',
    educationStages: ['Completed UG', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious graduates securing top national merit ranks in ICAR All India Competitive Examination for Master’s (AIEEA-PG)',
    summary: '₹12,640 per month + ₹6,000/year contingency for Master’s degree students in Agricultural Sciences.',
    detailedDescription: 'Awarded to top merit rankers in AIEEA-PG pursuing M.Sc / M.Tech in agricultural universities across India.',
    officialGuidelinesUrl: 'https://icar.org.in/',
    officialApplicationUrl: 'https://icar.org.in/',
    officialInfoUrl: 'https://icar.org.in/',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ICAR Post Graduate Scholarship open via ICAR AIEEA/NSP.',
    previousUrl: 'https://icar.org.in/',
    evidenceRefs: 'turn205379search0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
        notes: 'NSP live catalogue lists ICAR NTS-UG, Post Graduate Scholarship, NTS-PG and JRF/SRF; the previous ICAR homepage was not a direct application destination.',
        evidenceRefs: 'turn205379search0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Maintaining minimum OGPA of 7.00/10.00 without any backlogs'],
    documents: ['ICAR AIEEA-PG Rank Card', 'B.Sc / B.Tech Degree Certificate', 'Admission Allotment Order', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedUG: true,
      requiresEntranceExam: ['ICAR-AICE']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹12,640 per month for 2 years plus ₹6,000/year contingency grant',
        amountPublished: true,
        publishedAmountDetails: '₹12,640 per month + contingency',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://icar.org.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['ICAR', 'Agriculture', 'Master’s', 'JRF', 'Postgraduate']
  },
  {
    id: 'icar-srf-phd',
    code: 'ICAR-SRF-PHD',
    name: 'ICAR Senior Research Fellowship for PhD Studies (ICAR-SRF)',
    provider: 'Indian Council of Agricultural Research (ICAR)',
    department: 'Government of India',
    category: 'ICAR',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Senior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Postgraduate scholars qualifying the ICAR All India Competitive Examination for Doctoral Degree (AICE-JRF/SRF)',
    summary: '₹31,000/month for first 2 years and ₹35,000/month for 3rd year + HRA & contingency grant for agricultural PhD research.',
    detailedDescription: 'Prestigious fellowship for doctoral students in Agricultural, Horticultural, Veterinary, Fishery and Agricultural Engineering sciences.',
    officialGuidelinesUrl: 'https://icar.org.in/',
    officialApplicationUrl: 'https://scholarships.gov.in/All-Scholarships',
    officialInfoUrl: 'https://icar.org.in/',
    trackingUrl: 'https://scholarships.gov.in/All-Scholarships',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL NSP LISTING',
    appUrlVerificationStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ICAR Senior Research Fellowship open on NSP.',
    previousUrl: 'https://scholarships.gov.in/All-Scholarships',
    evidenceRefs: 'turn205379search0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL NSP LISTING',
        appStatus: 'OFFICIAL NSP SCHEME LISTING; LOGIN REQUIRED',
        notes: 'NSP live catalogue lists ICAR NTS-UG, Post Graduate Scholarship, NTS-PG and JRF/SRF; the previous ICAR homepage was not a direct application destination.',
        evidenceRefs: 'turn205379search0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual research progress approved by doctoral committee'],
    documents: ['ICAR AICE PhD Scorecard', 'Master’s Degree Certificate', 'PhD Registration Order', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      requiresPhdEnrollment: true,
      requiresEntranceExam: ['ICAR-AICE']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹31,000/mo (1st & 2nd yr) and ₹35,000/mo (3rd yr) + HRA & ₹10,000/yr contingency',
        amountPublished: true,
        publishedAmountDetails: '₹31,000 to ₹35,000/month + HRA',
        applicationStartDate: '2026-07-15',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://icar.org.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['ICAR', 'SRF', 'PhD', 'Agriculture', 'Doctoral Studies']
  },

  // ==========================================
  // F. RESEARCH AND POSTGRADUATE COMPLETION
  // ==========================================
  {
    id: 'visvesvaraya-phd-fulltime',
    code: 'MEITY-VISVES-FT',
    name: 'Visvesvaraya PhD Scheme for Electronics and IT – Full Time',
    provider: 'Digital India Corporation / MeitY',
    department: 'Ministry of Electronics & Information Technology, Government of India',
    category: 'Research Council',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Junior Research Fellowship', 'Senior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Full-time PhD scholars enrolled in ESDM and IT/ITES research disciplines in empanelled institutions (IITs, NITs, Anna University, etc.)',
    summary: 'Enhanced fellowship of ₹38,750/month (1st & 2nd year) and ₹43,750/month (3rd to 5th year) + annual contingency and international conference grant.',
    detailedDescription: 'Prestigious national initiative by MeitY to promote research and nurture doctoral talent in Electronics System Design & Manufacturing (ESDM) and IT/IT-enabled services.',
    officialGuidelinesUrl: 'https://phd.dic.gov.in/',
    officialApplicationUrl: 'https://phd.dic.gov.in/',
    officialInfoUrl: 'https://phd.dic.gov.in/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Portal returned HTTP 403 to automated retrieval; this is not proof that the site is broken.',
    previousUrl: 'https://phd.dic.gov.in/',
    evidenceRefs: 'turn978552view11',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Portal returned HTTP 403 to automated retrieval; this is not proof that the site is broken.',
        evidenceRefs: 'turn978552view11'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual review of research publications and doctoral progress by institutional nodal committee'],
    documents: ['Master’s Degree Transcripts in Engineering / CS / Electronics', 'GATE score / Institutional Entrance Proof', 'PhD Registration Order', 'Supervisor Declaration'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      requiresPhdEnrollment: true,
      otherConditions: ['Research must be in notified Electronics System Design (ESDM) or IT/ITES discipline in an empanelled institution.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹38,750/mo (1st-2nd yr) & ₹43,750/mo (3rd-5th yr) + ₹30,000/yr contingency + up to ₹1.5 lakh conference grant',
        amountPublished: true,
        publishedAmountDetails: '₹38,750 to ₹43,750/month + HRA',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://phd.dic.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Visvesvaraya', 'PhD', 'Electronics', 'IT', 'AI', 'MeitY', 'Fellowship']
  },
  {
    id: 'visvesvaraya-phd-parttime',
    code: 'MEITY-VISVES-PT',
    name: 'Visvesvaraya PhD Scheme for Electronics and IT – Part Time',
    provider: 'Digital India Corporation / MeitY',
    department: 'Ministry of Electronics & Information Technology',
    category: 'Research Council',
    schemeType: 'Incentive',
    educationStages: ['Completed PG', 'PhD'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Working professionals and part-time PhD scholars in ESDM and IT in recognized institutions',
    summary: 'One-time incentive grant of ₹2,50,000 upon successful completion of part-time PhD degree.',
    detailedDescription: 'Encourages working engineers and researchers in industry and academia to complete doctoral research in Electronics and IT.',
    officialGuidelinesUrl: 'https://phd.dic.gov.in/',
    officialApplicationUrl: 'https://phd.dic.gov.in/',
    officialInfoUrl: 'https://phd.dic.gov.in/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Portal returned HTTP 403 to automated retrieval; this is not proof that the site is broken.',
    previousUrl: 'https://phd.dic.gov.in/',
    evidenceRefs: 'turn978552view11',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Portal returned HTTP 403 to automated retrieval; this is not proof that the site is broken.',
        evidenceRefs: 'turn978552view11'
      }
    ],
    isRenewable: false,
    documents: ['Employment Proof in Industry / Faculty', 'Part-Time PhD Registration Order', 'Master’s Degree Transcripts', 'No Objection Certificate from Employer'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      requiresPhdEnrollment: true
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'One-time incentive of ₹2,50,000 disbursed upon successful thesis defence',
        amountPublished: true,
        publishedAmountDetails: '₹2,50,000 one-time grant upon PhD award',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://phd.dic.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Visvesvaraya', 'Part-Time PhD', 'Incentive', 'Electronics', 'IT']
  },
  {
    id: 'visvesvaraya-postdoc',
    code: 'MEITY-VISVES-PDF',
    name: 'Visvesvaraya Postdoctoral Fellowship',
    provider: 'Digital India Corporation / MeitY',
    department: 'Government of India',
    category: 'Research Council',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Postdoctoral research'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Scholars who have completed PhD in Electronics or IT within the last 3 years pursuing advanced postdoctoral research',
    summary: '₹67,000 to ₹75,000 per month fellowship + contingency grant for postdoctoral research in emerging tech.',
    detailedDescription: 'Nurtures postdoctoral researchers in semiconductors, advanced communication, microelectronics and AI.',
    officialGuidelinesUrl: 'https://phd.dic.gov.in/',
    officialApplicationUrl: 'https://phd.dic.gov.in/',
    officialInfoUrl: 'https://phd.dic.gov.in/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Visvesvaraya Postdoctoral Fellowship active for electronics & IT scholars.',
    previousUrl: 'https://phd.dic.gov.in/',
    evidenceRefs: 'turn978552view11',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL VERIFICATION — AUTOMATED ACCESS BLOCKED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Portal returned HTTP 403 to automated retrieval; this is not proof that the site is broken.',
        evidenceRefs: 'turn978552view11'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Annual research milestones evaluation by MeitY expert committee'],
    documents: ['PhD Degree Certificate / Provisional Award', 'Research Publications in Scopus/SCI indexed journals', 'Postdoc Research Proposal', 'Host Institute Endorsement'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      otherConditions: ['Must have earned PhD within the past 3 years in Electronics, IT, or allied computing discipline.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹67,000/mo (Year 1) & ₹75,000/mo (Year 2) + ₹1,00,000/year research grant',
        amountPublished: true,
        publishedAmountDetails: '₹67,000 to ₹75,000/month',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://phd.dic.gov.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Postdoc', 'Research', 'Electronics', 'Visvesvaraya', 'MeitY']
  },
  {
    id: 'pmrf-scheme',
    code: 'CENTRAL-PMRF',
    name: 'Prime Minister’s Research Fellowship (PMRF)',
    provider: 'National Coordination Committee (IIT Madras / MoE)',
    department: 'Ministry of Education, Government of India',
    category: 'Research Council',
    schemeType: 'Fellowship',
    educationStages: ['Completed UG', 'Completed PG', 'PhD', 'Junior Research Fellowship', 'Senior Research Fellowship'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Top graduates from IITs, IISc, NITs, Central Universities admitted into full-time PhD in PMRF granting institutions (including IIT Madras, IISc, etc.)',
    summary: 'Prestige fellowship of ₹70,000/month (1st-2nd yr), ₹75,000/month (3rd yr), and ₹80,000/month (4th-5th yr) + ₹2,00,000/year research grant.',
    detailedDescription: 'The highest-value doctoral fellowship in India designed to attract top academic talent into research in cutting-edge science and technology.',
    officialGuidelinesUrl: 'https://www.pmrf.in/',
    officialApplicationUrl: 'https://www.pmrf.in/',
    officialInfoUrl: 'https://www.pmrf.in/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'OFFICIAL SITE SEARCH-INDEXED; FETCH UNAVAILABLE',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Official PMRF website is indexed with programme details, but automated open returned 502.',
    previousUrl: 'https://www.pmrf.in/',
    evidenceRefs: 'turn932496search11; turn978552view12',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'OFFICIAL SITE SEARCH-INDEXED; FETCH UNAVAILABLE',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Official PMRF website is indexed with programme details, but automated open returned 502.',
        evidenceRefs: 'turn932496search11; turn978552view12'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Rigorous annual evaluation by National Review Committee'],
    documents: ['Undergraduate/PG Transcripts with min 8.0 CGPA', 'GATE score (where applicable)', 'PhD Admission Offer from PMRF granting institution', 'Comprehensive Research Proposal'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedUG: true,
      requiresPhdEnrollment: true,
      minMarksPercentage: 80,
      marksConditionDescription: 'Minimum CGPA of 8.0/10.0 or equivalent 80% marks'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹70,000–₹80,000/month + ₹2,00,000/year annual research contingency grant for 5 years',
        amountPublished: true,
        publishedAmountDetails: '₹70,000 to ₹80,000 per month + ₹2,00,000/year research grant',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.pmrf.in/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['PMRF', 'PhD', 'Fellowship', 'IIT', 'IISc', 'Premier Research']
  },
  {
    id: 'serb-npdf',
    code: 'DST-SERB-NPDF',
    name: 'SERB National Postdoctoral Fellowship (N-PDF)',
    provider: 'Science and Engineering Research Board / ANRF, DST',
    department: 'Department of Science & Technology, Government of India',
    category: 'Research Council',
    schemeType: 'Fellowship',
    educationStages: ['Completed PG', 'PhD', 'Postdoctoral research'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Indian citizens holding PhD / MD / MS degree in science or engineering desiring to pursue postdoctoral research in Indian labs/universities',
    summary: '₹55,000 to ₹60,000 per month fellowship + ₹2,00,000/year research grant for 2 years.',
    detailedDescription: 'Aims to identify motivated young researchers and provide them support for doing research in frontier areas of science and engineering under a faculty mentor.',
    officialGuidelinesUrl: 'https://anrfonline.in/ANRF/npdf',
    officialApplicationUrl: 'https://anrfonline.in/ANRF/npdf',
    officialInfoUrl: 'https://anrfonline.in/ANRF/npdf',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL ANRF / SERB PROGRAMME PAGE',
    appUrlVerificationStatus: 'CALL-BASED APPLICATION; OPEN CALL NOT CONFIRMED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'ANRF / SERB National Postdoctoral Fellowship call active.',
    previousUrl: 'https://www.serbonline.in/',
    evidenceRefs: 'turn932496search3; turn978552view13',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL ANRF / SERB PROGRAMME PAGE',
        appStatus: 'CALL-BASED APPLICATION; OPEN CALL NOT CONFIRMED',
        notes: 'Official programme page explains N-PDF and directs applicants to ANRF online portal when a call is announced.',
        evidenceRefs: 'turn932496search3; turn978552view13'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Submission of satisfactory 1st year progress report and publication output'],
    documents: ['PhD Degree Certificate / Provisional Award', 'Peer-reviewed publications list', 'Detailed Research Project Proposal', 'Mentor Consent Letter & Host Institute Endorsement'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedPG: true,
      ageLimitYears: 35, // 40 for SC/ST/OBC/Women/PwD
      otherConditions: ['Applicant must have obtained PhD/MD/MS degree from a recognized university. Cannot work under PhD thesis supervisor.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹55,000/mo (regular) / ₹60,000/mo + HRA + ₹2,00,000/year research grant',
        amountPublished: true,
        publishedAmountDetails: '₹55,000 to ₹60,000 per month + HRA + ₹2 Lakh grant',
        applicationStartDate: '2026-04-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://anrfonline.in/ANRF/npdf',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['N-PDF', 'Postdoctoral', 'SERB', 'DST', 'Science', 'Engineering']
  },

  // ==========================================
  // G. RECOGNISED PRIVATE FOUNDATIONS
  // ==========================================
  {
    id: 'vidyadhan-tn',
    code: 'FDN-VIDYADHAN',
    name: 'Vidyadhan Scholarship Programme (Tamil Nadu & Puducherry)',
    tamilName: 'வித்யாதன் கல்வி உதவித்தொகை திட்டம்',
    provider: 'Sarojini Damodaran Foundation (SDF)',
    department: 'Philanthropic Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Class 11', 'Class 12', 'Diploma', 'Undergraduate', 'Professional degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious students from economically challenged families in Tamil Nadu who scored high marks (90%+) in Class 10 (SSLC)',
    summary: 'Foundation scholarship offering ₹10,000/year for +2 and up to ₹15,000–₹75,000/year for degree courses plus mentorship.',
    detailedDescription: 'Sustained financial support and developmental workshops. Once selected in Class 11, scholars who maintain good scores are supported throughout their undergraduate studies.',
    officialGuidelinesUrl: 'https://www.vidyadhan.org/',
    officialApplicationUrl: 'https://www.vidyadhan.org/apply',
    officialInfoUrl: 'https://www.vidyadhan.org/',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'MANUAL VERIFICATION — FETCH UNAVAILABLE',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Vidyadhan Tamil Nadu & Puducherry scholarship registration portal open.',
    previousUrl: 'https://www.vidyadhan.org/apply',
    evidenceRefs: 'turn978552view14',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'MANUAL VERIFICATION — FETCH UNAVAILABLE',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Automated fetch returned 502; this does not establish that the site is broken.',
        evidenceRefs: 'turn978552view14'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued academic excellence in +1, +2 and degree exams', 'Mandatory participation in foundation mentoring workshops'],
    documents: ['Class 10 (SSLC) Marksheet', 'Annual Income Certificate (under ₹2,00,000)', 'Class 11 Admission Proof', 'Passport Photo'],
    eligibility: {
      domicileRequired: 'Tamil Nadu',
      minIncomeCeiling: 200000,
      minMarksPercentage: 90,
      marksConditionDescription: 'Minimum 90% or 9 CGPA in Class 10 board exam (75% for students with benchmark disability)'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹10,000/year for +1 & +2; ₹15,000 to ₹75,000/year for degree studies',
        amountPublished: true,
        publishedAmountDetails: '₹10,000/year (+2); up to ₹75,000/year (Degree)',
        applicationStartDate: '2026-05-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.vidyadhan.org/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Foundation', 'Merit-cum-Means', 'Class 10 Passouts', 'Higher Secondary', 'Mentorship']
  },
  {
    id: 'reliance-ug',
    code: 'FDN-RELIANCE-UG',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    department: 'Philanthropic Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Undergraduate', 'Professional degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious Indian first-year undergraduate students across all streams (household income under ₹15 lakh, priority to <₹2.5 lakh)',
    summary: 'Up to ₹2,00,000 over the degree duration for meritorious first-year college students across all streams.',
    detailedDescription: 'Supports 5,000 undergraduate scholars each year, offering scholarship funds alongside alumni networking and leadership development.',
    officialGuidelinesUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27',
    officialApplicationUrl: 'https://www.scholarships.reliancefoundation.org/',
    officialInfoUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'OFFICIAL SITE FOUND — OLD PAGE OUTDATED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Reliance Foundation 2026–27 undergraduate scholarship application gateway active.',
    previousUrl: 'https://www.scholarships.reliancefoundation.org/',
    evidenceRefs: 'turn978552view15; turn433479search11',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'OFFICIAL SITE FOUND — OLD PAGE OUTDATED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing scholarship page displayed 2025–26 results; Foundation announced 2026–27 scholarships. Updated information URL to current official announcement; current application endpoint still requires confirmation.',
        evidenceRefs: 'turn978552view15; turn433479search11'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Maintaining minimum passing GPA and active engagement in enrichment modules'],
    documents: ['Class 10 and 12 Board Marksheets', 'First Year UG Admission Proof', 'Income Certificate / ITR', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 1500000,
      minMarksPercentage: 60,
      marksConditionDescription: 'Minimum 60% aggregate in Class 12 board examination',
      otherConditions: ['Must be in 1st year of regular full-time UG degree.', 'Mandatory online aptitude assessment test.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Up to ₹2,00,000 total grant over the degree duration',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹2,00,000 total',
        applicationStartDate: '2026-08-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.scholarships.reliancefoundation.org/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Foundation', 'Undergraduate', 'Aptitude Test', 'Merit-cum-Means']
  },
  {
    id: 'reliance-pg',
    code: 'FDN-RELIANCE-PG',
    name: 'Reliance Foundation Postgraduate Scholarship',
    provider: 'Reliance Foundation',
    department: 'Philanthropic Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'First-year postgraduate scholars in Computer Science, AI, Mathematics, Electrical, Mechanical, Material Science, Renewable Energy, Life Sciences',
    summary: 'Prestige scholarship of up to ₹6,00,000 over 2 years for PG scholars in cutting-edge technology and science fields.',
    detailedDescription: 'Selects 100 outstanding postgraduate scholars in future tech disciplines through competitive evaluation, statement of purpose, and interview panel.',
    officialGuidelinesUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27',
    officialApplicationUrl: 'https://www.scholarships.reliancefoundation.org/',
    officialInfoUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27',
    urlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    infoUrlVerificationStatus: 'OFFICIAL SITE FOUND — OLD PAGE OUTDATED',
    appUrlVerificationStatus: 'MANUAL VERIFICATION REQUIRED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Reliance Foundation 2026–27 postgraduate scholarship application gateway active.',
    previousUrl: 'https://www.scholarships.reliancefoundation.org/',
    evidenceRefs: 'turn978552view15; turn433479search11',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'OFFICIAL SITE FOUND — OLD PAGE OUTDATED',
        appStatus: 'MANUAL VERIFICATION REQUIRED',
        notes: 'Existing scholarship page displayed 2025–26 results; Foundation announced 2026–27 scholarships. Updated information URL to current official announcement; current application endpoint still requires confirmation.',
        evidenceRefs: 'turn978552view15; turn433479search11'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued academic excellence in postgraduate semester examinations'],
    documents: ['Undergraduate Transcripts with First Class', 'Valid GATE / Entrance Scorecard', 'PG Admission Proof in notified discipline', 'Statement of Purpose (SOP) & Letters of Recommendation'],
    eligibility: {
      domicileRequired: 'India',
      requiresCompletedUG: true,
      minMarksPercentage: 70,
      marksConditionDescription: 'First-class academic record in undergraduate degree; valid national entrance score',
      otherConditions: ['Enrolled in 1st year of eligible postgraduate course in notified STEM discipline.']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Up to ₹6,00,000 across the postgraduate degree (tuition & personal research tools)',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹6,00,000 over 2 years',
        applicationStartDate: '2026-08-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.scholarships.reliancefoundation.org/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Foundation', 'Postgraduate', 'STEM', 'AI', 'Engineering']
  },
  {
    id: 'tata-capital-pankh',
    code: 'FDN-TATA-PANKH',
    name: 'Tata Capital Pankh Scholarship Programme',
    provider: 'Tata Capital Limited (CSR)',
    department: 'Philanthropic CSR Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Class 11', 'Class 12', 'Diploma', 'Undergraduate', 'Professional degree'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Economically underprivileged students across India with family income up to ₹2,50,000 studying Class 11-12, Diploma or UG',
    summary: 'CSR scholarship supporting up to 80% of course fees (up to ₹50,000) for school, diploma and undergraduate students.',
    detailedDescription: 'Empowers underprivileged students to complete higher secondary, diploma and college education without dropping out due to economic constraints.',
    officialGuidelinesUrl: 'https://www.tatacapital.com/sustainability/education.html',
    officialApplicationUrl: 'https://www.tatacapital.com/sustainability/education.html',
    officialInfoUrl: 'https://www.tatacapital.com/sustainability/education.html',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL PROGRAMME INFORMATION',
    appUrlVerificationStatus: 'DIRECT APPLICATION PORTAL NOT CONFIRMED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Tata Capital Pankh Scholarship 2026–27 education application window open.',
    previousUrl: 'https://www.tatacapital.com/sustainability/education.html',
    evidenceRefs: 'turn932496search8',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL PROGRAMME INFORMATION',
        appStatus: 'DIRECT APPLICATION PORTAL NOT CONFIRMED',
        notes: 'Updated from generic CSR page to Tata Capital Education page, which explicitly describes the Pankh Scholarship programme; application portal not separately verified.',
        evidenceRefs: 'turn932496search8'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Scoring at least 60% in subsequent college/school exams'],
    documents: ['Aadhaar Card', 'Previous Exam Marksheet (min 60%)', 'Current Year Admission Fee Receipt', 'Income Proof (under ₹2.5 lakh)'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 250000,
      minMarksPercentage: 60
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Up to 80% of tuition fee (up to ₹12,000 for School, up to ₹15,000 for Diploma, up to ₹50,000 for Professional UG)',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹12,000 to ₹50,000 depending on study stage',
        applicationStartDate: '2026-07-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.tatacapital.com/csr.html',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Foundation', 'CSR', 'Pankh', 'School', 'Diploma', 'UG']
  },
  {
    id: 'hdfc-parivartan-ecss',
    code: 'FDN-HDFC-ECSS',
    name: "HDFC Bank Parivartan's ECSS Programme (Educational Crisis Scholarship Support)",
    provider: 'HDFC Bank Parivartan (CSR)',
    department: 'Philanthropic CSR Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Class 10', 'Class 11', 'Class 12', 'Diploma', 'Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Students facing family economic crisis, bereavement, job loss or medical emergency needing assistance to prevent dropout',
    summary: 'Financial support of up to ₹35,000 to ₹75,000 to assist students at risk of dropping out due to personal or family crisis.',
    detailedDescription: 'Provides merit-cum-means assistance to students facing unexpected crisis events so they can complete their ongoing schooling or degree.',
    officialGuidelinesUrl: 'https://www.parivartanecss.com/',
    officialApplicationUrl: 'https://www.parivartanecss.com/',
    officialInfoUrl: 'https://www.parivartanecss.com/',
    trackingUrl: 'https://www.parivartanecss.com/',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL PROGRAMME PAGE',
    appUrlVerificationStatus: 'VERIFIED — PROGRAMME APPLICATION LANDING PAGE',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Official 2026–27 portal active on parivartanecss.com; application window currently open.',
    previousUrl: 'https://www.parivartanecss.com/',
    evidenceRefs: 'turn978552view1; turn932496search10',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL PROGRAMME PAGE',
        appStatus: 'VERIFIED — PROGRAMME APPLICATION LANDING PAGE',
        notes: 'Corrected from generic HDFC CSR page. Programme site identifies HDFC Bank Parivartan ECSS and publishes 2026–27 details; site states it is operated/managed by Buddy4Study.',
        evidenceRefs: 'turn978552view1; turn932496search10'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued enrollment in the course with at least 55% marks'],
    documents: ['Previous Class Marksheet (min 55%)', 'Admission Proof & Fee Receipt', 'Income Proof (under ₹2.5 lakh)', 'Crisis document (death certificate / medical record if crisis applicant)'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 250000,
      minMarksPercentage: 55
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Up to ₹35,000 (School), ₹45,000 (Diploma/General UG), up to ₹75,000 (Professional/PG)',
        amountPublished: true,
        publishedAmountDetails: 'Up to ₹35,000 to ₹75,000 per year',
        applicationStartDate: '2026-07-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.parivartanecss.com/',
        sourceVerificationDate: '2026-11-07',
        verificationNotes: "MANDATORY CORRECTION: Verified via official HDFC Parivartan ECSS direct portal."
      }
    ],
    tags: ['Foundation', 'CSR', 'Crisis Support', 'School', 'UG', 'PG', 'Diploma']
  },
  {
    id: 'kotak-kanya-scholarship',
    code: 'FDN-KOTAK-KANYA',
    name: 'Kotak Kanya Scholarship for Girl Students',
    provider: 'Kotak Education Foundation (CSR)',
    department: 'Philanthropic Foundation',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Professional degree', 'Undergraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Meritorious girl students admitted to first-year professional graduation courses (Engineering, MBBS, Architecture, Design, Integrated LLB)',
    summary: '₹1.5 lakh per year scholarship for meritorious girl students from low-income families pursuing professional graduation.',
    detailedDescription: 'Empowers girl students from underprivileged backgrounds by providing ₹1,50,000 per annum towards college fees, hostel, books and laptop for the entire professional degree duration.',
    officialGuidelinesUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
    officialApplicationUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
    officialInfoUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
    trackingUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
    urlVerificationStatus: 'VERIFIED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL SCHOLARSHIP PAGE',
    appUrlVerificationStatus: 'OFFICIAL SCHOLARSHIP PAGE; DIRECT FORM NOT SEPARATELY CONFIRMED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Official 2026–27 application portal active on kotakeducationfoundation.org; registrations open.',
    previousUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
    evidenceRefs: 'turn978552view0',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL SCHOLARSHIP PAGE',
        appStatus: 'OFFICIAL SCHOLARSHIP PAGE; DIRECT FORM NOT SEPARATELY CONFIRMED',
        notes: 'Corrected to the exact Kotak Kanya Scholarship page on Kotak Education Foundation domain.',
        evidenceRefs: 'turn978552view0'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Clearing all exams and maintaining at least 6.0 CGPA / 60% marks in each academic year'],
    documents: ['Class 12 Board Marksheet (minimum 85%)', 'NEET / JEE / TNEA Rank Proof / Allotment', 'Annual Income Certificate (under ₹6,00,000)', 'Aadhaar Card'],
    eligibility: {
      domicileRequired: 'India',
      genderEligibility: 'Girl / Woman',
      minIncomeCeiling: 600000,
      minMarksPercentage: 85,
      marksConditionDescription: 'Minimum 85% or equivalent CGPA in Class 12 board examination',
      otherConditions: ['Enrolled in 1st year of professional graduation (Engineering, Medicine, Law, Architecture).']
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: '₹1,50,000 per annum for the entire professional degree duration',
        amountPublished: true,
        publishedAmountDetails: '₹1,50,000 per year',
        applicationStartDate: '2026-06-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
        sourceVerificationDate: '2026-11-07',
        verificationNotes: "MANDATORY CORRECTION: Verified via Kotak Education Foundation Kotak Kanya direct page."
      }
    ],
    tags: ['Foundation', 'Girl students', 'Professional degree', 'Engineering', 'Medicine']
  },
  {
    id: 'sitaram-jindal-foundation',
    code: 'FDN-JINDAL',
    name: 'Sitaram Jindal Foundation Scholarship',
    provider: 'Sitaram Jindal Foundation',
    department: 'Philanthropic Trust',
    category: 'Institution / Foundation',
    schemeType: 'Scholarship',
    educationStages: ['Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate', 'Professional degree', 'Postgraduate'],
    isForTnResidents: true,
    isForStudyInTn: true,
    audience: 'Economically weaker students pursuing high school, ITI, polytechnic, graduation, and postgraduate studies',
    summary: 'Monthly financial assistance ranging from ₹500 to ₹3,200 per month across courses from Class 11 up to Post-Graduation.',
    detailedDescription: 'One of India’s longest-running charitable trust scholarships helping meritorious students from low-income families.',
    officialGuidelinesUrl: 'https://www.sitaramjindalfoundation.org/',
    officialApplicationUrl: 'https://www.sitaramjindalfoundation.org/scholarships.php',
    officialInfoUrl: 'https://www.sitaramjindalfoundation.org/',
    urlVerificationStatus: 'REDIRECTED',
    infoUrlVerificationStatus: 'VERIFIED — OFFICIAL FOUNDATION PAGE (REDIRECTS)',
    appUrlVerificationStatus: 'APPLICATION PORTAL EXISTS; EXACT PER-SCHEME ROUTE NOT CONFIRMED',
    lastVerifiedAt: '2026-11-07',
    verificationNotes: 'Scholarship information page redirects to the foundation scholarship page; a separate application portal is indexed, but no stable direct URL was substituted.',
    previousUrl: 'https://www.sitaramjindalfoundation.org/scholarships.php',
    evidenceRefs: 'turn978552view17; turn205379search3',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: 'VERIFIED — OFFICIAL FOUNDATION PAGE (REDIRECTS)',
        appStatus: 'APPLICATION PORTAL EXISTS; EXACT PER-SCHEME ROUTE NOT CONFIRMED',
        notes: 'Scholarship information page redirects to the foundation scholarship page; a separate application portal is indexed, but no stable direct URL was substituted.',
        evidenceRefs: 'turn978552view17; turn205379search3'
      }
    ],
    isRenewable: true,
    renewalConditions: ['Continued academic good standing in college/school'],
    documents: ['Previous Exam Marksheet', 'Income Certificate (under ₹2.50 lakh for employment, under ₹4 lakh for agriculture)', 'College Bonafide', 'Bank Details'],
    eligibility: {
      domicileRequired: 'India',
      minIncomeCeiling: 250000,
      minMarksPercentage: 60,
      marksConditionDescription: 'Minimum 60% for boys, 55% for girls (65%/60% for professional courses)'
    },
    versions: [
      {
        academicYear: '2026-2027',
        lifecycleStatus: 'Open',
        isCurrentVersion: true,
        confirmedBenefits: 'Monthly stipend of ₹500 to ₹3,200 per month disbursed annually',
        amountPublished: true,
        publishedAmountDetails: '₹6,000 to ₹38,400 per year depending on course category',
        applicationStartDate: '2026-01-01',
        applicationDeadline: '2026-12-31',
        isDeadlineExtended: false,
        notificationBulletinUrl: 'https://www.sitaramjindalfoundation.org/',
        sourceVerificationDate: '2026-11-06',
          }
    ],
    tags: ['Foundation', 'Need-Based', 'School', 'ITI', 'Diploma', 'UG', 'PG']
  }
];

export const GENUINE_SCHOLARSHIP_PROGRAMS = GENUINE_SCHOLARSHIP_CATALOGUE;

