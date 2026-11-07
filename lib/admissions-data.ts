// lib/admissions-data.ts
// =============================================================================
// STUDENT RSO 2.0 – MODULE 06: STUDENT ADMISSION & EDUCATION CONTINUITY CENTRE
// Tamil Nadu Priority | Class 10 to Postgraduate & Research
// 100% Verified Statutory Data | Strict English-Only Copy | Zero Fabrication
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
  | 'All Stages';

export type AdmissionCategory =
  | 'school'
  | 'polytechnic-iti'
  | 'ug-professional'
  | 'ug-arts-science'
  | 'pg-admissions'
  | 'phd-research'
  | 'govt-portal'
  | 'national-portal'
  | 'private-admissions'
  | 'transfer'
  | 'branch-change'
  | 're-entry'
  | 'dropout-recovery'
  | 'credit-mobility';

export type ApplicationStatus =
  | 'Not Started'
  | 'Preparing Documents'
  | 'Application Started'
  | 'Submitted'
  | 'Awaiting Verification'
  | 'Eligible'
  | 'Counselling Pending'
  | 'Allotment Received'
  | 'Admission Confirmed'
  | 'Not Selected'
  | 'Withdrawn'
  | 'Closed';

export interface AdmissionPathway {
  id: string;
  title: string;
  authority: string;
  level: EducationStage;
  category: AdmissionCategory;
  description: string;
  targetStudents: string;
  eligibility: string;
  subjectRequirements: string;
  selectionMode: 'Merit-Based Counselling' | 'Entrance-Based Single Window' | 'Institutional Merit' | 'Direct Statutory Entry';
  entranceRequired?: string;
  portalName: string;
  portalUrl: string;
  applicationPeriod: string;
  applicationFee: string;
  steps: string[];
  counsellingProcess: string[];
  requiredDocuments: string[];
  allotmentNextSteps: string[];
  importantWarnings: string[];
  helpline: string;
  lastVerifiedDate: string;
}

export interface OfficialPortalRecord {
  id: string;
  name: string;
  code: string;
  governingBody: string;
  tier: 'Tamil Nadu State' | 'Central / National';
  scope: string;
  officialUrl: string;
  verifiedDomain: string;
  coverageCourses: string[];
  typicalCycle: string;
  helplinePhone: string;
  helplineEmail: string;
  guidelinesPdfUrl: string;
}

export interface TransferRegulation {
  id: string;
  title: string;
  authority: string;
  governingNorm: string;
  scope: 'Engineering (Anna Univ)' | 'Arts & Science (DCE)' | 'Polytechnic (DOTE)' | 'Medical / Paramedical';
  eligibilityConditions: string[];
  mandatoryPrerequisites: string[];
  disqualifications: string[];
  procedureSteps: string[];
  requiredNocAndCertificates: string[];
  statutoryWarning: string;
}

export interface ReEntryProtocol {
  id: string;
  title: string;
  situation: string;
  authority: string;
  maximumDurationRule: string;
  creditValidity: string;
  prerequisites: string[];
  stepByStepProtocol: string[];
  requiredDocumentation: string[];
  financialAndConcessionContinuity: string;
  counselorContactNotice: string;
}

export interface CreditMobilityGuide {
  id: string;
  frameworkName?: string;
  title: string;
  authority: string;
  portalUrl: string;
  coreConcepts: { title: string; description: string }[];
  acceptanceRules: string[];
  stepByStepTransfer: string[];
  statutoryLimitations: string[];
}

export interface RequiredDocumentItem {
  id: string;
  name: string;
  purpose: string;
  issuingAuthority: string;
  applicableStages: EducationStage[];
  formatRequired: 'Original + Attested Copies' | 'Digitally Signed e-Sanad / DigiLocker' | 'Self-Attested Photocopy';
  replacementProcedureIfMissing: string;
  relatedModule03Link?: string;
}

export interface AdmissionDeadlineItem {
  id: string;
  title: string;
  authority: string;
  level: EducationStage;
  academicYear: string;
  status: 'Open' | 'Upcoming' | 'Closing Soon' | 'Schedule Awaited';
  startDate: string;
  closingDate: string;
  counsellingDate: string;
  portalUrl: string;
  officialNoticeUrl: string;
  lastVerified: string;
}

// =============================================================================
// 1. ADMISSION PATHWAYS & PROCEDURES (CLASS 10 TO POSTGRADUATE)
// =============================================================================

export const ADMISSION_PATHWAYS: AdmissionPathway[] = [
  // --- A. CLASS 10 PATHWAYS ---
  {
    id: 'tn-hsc-class11',
    title: 'Class 11 Higher Secondary School Admission (HSC)',
    authority: 'Directorate of School Education, Government of Tamil Nadu',
    level: 'Class 10',
    category: 'school',
    description:
      'Official admission pathway into Class 11 across Government, Government-Aided, and Recognized Matriculation Higher Secondary Schools in Tamil Nadu.',
    targetStudents: 'Students who have passed Class 10 (SSLC / CBSE / ICSE) examinations.',
    eligibility: 'Pass in Class 10 Board Examination with qualifying marks in core subjects.',
    subjectRequirements:
      'Science Stream (PCM/PCB): Minimum 60% in Maths & Science recommended. Commerce Stream: English & Social Science/Maths. Arts/Humanities: Open to all successful Class 10 students.',
    selectionMode: 'Institutional Merit',
    portalName: 'Tamil Nadu School Education EMIS Portal',
    portalUrl: 'https://emis.tnschools.gov.in/',
    applicationPeriod: 'May to June (Immediately following SSLC results)',
    applicationFee: 'Free in Government Schools; Standard nominal fee in Aided schools.',
    steps: [
      'Obtain application form from the preferred Higher Secondary School or via the district single-window school desk.',
      'Select stream preference: Group 1 (Physics, Chemistry, Maths, Biology), Group 2 (Computer Science, Maths, Physics, Chemistry), Group 3 (Commerce, Accountancy, Economics, Business Maths / Computer Applications), or Group 4 (Arts & Humanities).',
      'Submit Class 10 marksheet / provisional certificate, Transfer Certificate (TC), and Community Certificate.',
      'School verifies student registration via the Educational Management Information System (EMIS).',
      'Admission confirmation and allotment of school admission number.',
    ],
    counsellingProcess: [
      'School-level subject allotment based on marks secured in Class 10 Mathematics and Science.',
      'Tamil Nadu Government 7.5% preferential reservation applies to students continuing in government institutions.',
    ],
    requiredDocuments: [
      'Class 10 Provisional Marksheet / Original Certificate',
      'Transfer Certificate (TC) issued by previous school',
      'Conduct Certificate',
      'Community Certificate (BC / BCM / MBC / SC / ST)',
      'Aadhaar Card Copy',
      'EMIS Student Identification Number',
      'Passport size photographs (4 copies)',
    ],
    allotmentNextSteps: [
      'Collect official fee receipt and school handbook.',
      'Confirm textbooks distribution under the Tamil Nadu Free Textbook Scheme.',
      'Ensure EMIS student profile is updated with the new school code.',
    ],
    importantWarnings: [
      'Beware of unauthorized private schools claiming fake board affiliations.',
      'Never surrender your original Class 10 certificate permanently; schools must return originals after EMIS verification.',
    ],
    helpline: 'Toll-free Education Helpline: 14417',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-polytechnic-diploma',
    title: '3-Year Polytechnic Diploma Centralised Admission',
    authority: 'Directorate of Technical Education (DOTE), Tamil Nadu',
    level: 'Class 10',
    category: 'polytechnic-iti',
    description:
      'Centralised polytechnic admissions across 54 Government Polytechnic Colleges, 3 Special Institutions, and affiliated polytechnics across Tamil Nadu.',
    targetStudents: 'Class 10 passed students seeking direct engineering technician qualifications.',
    eligibility: 'Pass in 10th Standard (SSLC) of Tamil Nadu Board or equivalent examination with Science and Mathematics.',
    subjectRequirements: 'Mathematics and Science studied at Class 10 level.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'Tamil Nadu Polytechnic Admissions Portal',
    portalUrl: 'https://dte.tn.gov.in/',
    applicationPeriod: 'May to June annually',
    applicationFee: 'Rs. 150 for General/OBC; Exempted for SC/ST candidates.',
    steps: [
      'Register online at the official DOTE polytechnic admission portal.',
      'Upload 10th marksheet, Transfer Certificate, and Community Certificate.',
      'Normalized Class 10 total marks determine the state-wide merit rank.',
      'Participate in online choice filling of preferred polytechnic institutions and branches (Civil, Mech, EEE, ECE, CSE, Automobile, Mechatronics).',
      'Download seat allotment order and report to the allotted Government / Aided polytechnic.',
    ],
    counsellingProcess: [
      'Conducted in multiple rounds categorized by community reservation brackets.',
      'Direct qualification for Lateral Entry B.E./B.Tech upon diploma completion.',
    ],
    requiredDocuments: [
      'Class 10 SSLC Marksheet',
      'Transfer Certificate (TC)',
      'Community Certificate',
      'Nativity Certificate (if school study was outside Tamil Nadu)',
      'Special Reservation Certificate (Differently Abled, Sports, Ex-Servicemen)',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Report within the date stipulated on the allotment letter.',
      'Submit tuition fees (nominal statutory fee for government polytechnics).',
      'Receive official DOTE registration number for semester examinations.',
    ],
    importantWarnings: [
      'Check AICTE approval of private polytechnic institutions before confirming admission.',
      'Diploma holders are eligible for direct 2nd-year B.E./B.Tech lateral entry.',
    ],
    helpline: 'DOTE Helpline: 044-22350525 / 044-22351018',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-iti-craftsmen',
    title: 'ITI Craftsmen Training Scheme (CTS) Admissions',
    authority: 'Department of Employment and Training (DET), Government of Tamil Nadu',
    level: 'Class 10',
    category: 'polytechnic-iti',
    description:
      'Centralised admission to 102 Government ITIs and over 400 private industrial training institutes across technical trades in Tamil Nadu.',
    targetStudents: 'Class 10 or Class 8 passed candidates seeking vocational trade skills.',
    eligibility: 'Pass in 10th SSLC for Engineering trades (Electrician, Fitter, Machinist, COPA, Welder). Pass in 8th for non-engineering trades.',
    subjectRequirements: 'Mathematics and Science preferred for 2-year engineering trades.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'Tamil Nadu DET ITI Admission Portal',
    portalUrl: 'https://skilltraining.tn.gov.in/',
    applicationPeriod: 'May to July annually',
    applicationFee: 'Rs. 50 (Exempted for Women, SC, and ST candidates).',
    steps: [
      'Register online on the DET Skill Training portal.',
      'Fill personal and academic details and upload certificates.',
      'Merit list generated based on normalized Class 10 marks.',
      'Attend online or district-level counselling session to choose trade and ITI campus.',
      'Verification of documents and admission confirmation.',
    ],
    counsellingProcess: [
      'Seat allocation strictly follows communal reservation rules.',
      'Stipend of Rs. 750/month and free bus pass provided to Government ITI students.',
    ],
    requiredDocuments: [
      'Class 10 Marksheet / Pass Certificate',
      'Transfer Certificate',
      'Community Certificate',
      'Aadhaar Card',
      'Bank Account Passbook Copy (for government monthly stipend credit)',
    ],
    allotmentNextSteps: [
      'Report to the allotted ITI with original certificates.',
      'Enroll in the National Council for Vocational Education and Training (NCVET) database.',
      'Apply for free bicycle and laptop schemes where eligible.',
    ],
    importantWarnings: [
      'Verify NCVET accreditation of private ITIs before taking admission.',
      'Completing a 2-year ITI allows lateral entry into 2nd-year polytechnic diploma.',
    ],
    helpline: 'DET ITI Desk: 044-22501002 / 22501006',
    lastVerifiedDate: '2026-11-01',
  },

  // --- B. CLASS 12 TO HIGHER EDUCATION PATHWAYS ---
  {
    id: 'tn-tnea-engineering',
    title: 'Tamil Nadu Engineering Admissions (TNEA) – B.E. / B.Tech',
    authority: 'Directorate of Technical Education (DOTE) & Anna University, Tamil Nadu',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Single-window counselling for admission to government seats in Anna University departments (CEG, MIT, ACTech, SAP), constituent colleges, government engineering colleges, and affiliated self-financing engineering colleges.',
    targetStudents: 'Class 12 (HSC Academic / Vocational) passed students.',
    eligibility:
      'General / OC: Minimum 45% aggregate in Physics, Chemistry & Maths. BC, BCM, MBC/DNC, SC, ST: Minimum 40% aggregate.',
    subjectRequirements: 'Mathematics, Physics, and Chemistry compulsory in Class 12.',
    selectionMode: 'Merit-Based Counselling',
    entranceRequired: 'No entrance exam. Pure 200-mark cut-off based on Class 12 board marks.',
    portalName: 'Tamil Nadu Engineering Admissions (TNEA) Portal',
    portalUrl: 'https://www.tneaonline.org/',
    applicationPeriod: 'May to June (Starts immediately after HSC results)',
    applicationFee: 'Rs. 500 for General/OBC; Rs. 250 for SC/SCA/ST candidates.',
    steps: [
      'Online user registration at tneaonline.org.',
      'Fill in personal, academic, and reservation details.',
      'Online payment of registration fee.',
      'Upload scanned copies of required certificates.',
      'Certificate verification carried out online via TNEA Facilitation Centres (TFC).',
      'Assignment of 10-digit random number to resolve tie-breakers.',
      'Publication of Statewide General and Category Rank Lists.',
      'Online multi-round counselling: Choice filling of colleges and branches in order of preference.',
      'Tentative seat allotment and student confirmation (Accept & Join / Accept & Upward / Decline).',
      'Download Final Provisional Seat Allotment Order and report to the allotted college.',
    ],
    counsellingProcess: [
      'Special Reservation Counselling: Differently Abled, Sports, Ex-Servicemen, and 7.5% Government School Quota.',
      'General Counselling: Conducted in 3 to 4 sequential cut-off rounds (Round 1: 200-180 cut-off; Round 2: 180-160, etc.).',
      '7.5% Government School Quota provides 100% free tuition, hostel, and examination fee coverage.',
    ],
    requiredDocuments: [
      'Class 10 SSLC Marksheet',
      'Class 11 Marksheet',
      'Class 12 HSC Marksheet',
      'Transfer Certificate (TC)',
      'Community Certificate (Permanent card / digitally signed certificate)',
      'Nativity Certificate (if applicable)',
      'First Graduate Certificate & Joint Declaration (if claiming First Graduate fee waiver)',
      'Income Certificate (for post-matric scholarship eligibility)',
      'Special Reservation Certificate (if applicable)',
      'Aadhaar Card copy',
    ],
    allotmentNextSteps: [
      'Download and print the official Provisional Allotment Order.',
      'Report to the allotted engineering college within the prescribed deadline (usually 5 to 7 working days).',
      'Submit original certificates for institutional verification and finalize enrollment.',
    ],
    importantWarnings: [
      'Failure to report within the prescribed deadline results in automatic cancellation of the seat.',
      'Never pay capitation fees or deal with intermediaries. All government seats are allotted exclusively via tneaonline.org.',
    ],
    helpline: 'TNEA Toll-free Help Desk: 044-22351014 / 22351015 / support@tneaonline.org',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-tngasa-arts-science',
    title: 'Tamil Nadu Government Arts and Science Colleges Admissions (TNGASA)',
    authority: 'Directorate of Collegiate Education (DCE), Government of Tamil Nadu',
    level: 'Class 12',
    category: 'ug-arts-science',
    description:
      'Centralised single-window online admission portal for undergraduate BA, BSc, BCom, BBA, and BCA courses across 164+ Government Arts and Science Colleges in Tamil Nadu.',
    targetStudents: 'Class 12 passed students seeking affordable, quality collegiate education.',
    eligibility: 'Pass in Tamil Nadu Higher Secondary Examination (+2) or equivalent board.',
    subjectRequirements:
      'Course-specific: B.Com requires Commerce/Accountancy; B.Sc Maths requires Mathematics; B.Sc Computer Science requires Maths/Computer Science; B.A. courses open to all streams.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'Tamil Nadu Government Arts & Science Admission Portal (TNGASA / DCE)',
    portalUrl: 'https://tndce.tn.gov.in/',
    applicationPeriod: 'May to June annually',
    applicationFee: 'Rs. 48 for General/OBC (includes Rs. 2 registration fee); Rs. 2 for SC/ST.',
    steps: [
      'Register on the official portal at tngasa.in.',
      'Fill in applicant personal and academic information.',
      'Select preferred Government Arts and Science colleges and desired degree courses (unlimited choices allowed).',
      'Pay application fee online or via Admission Facilitation Centres (AFC).',
      'Upload certificates and submit application.',
      'College-wise and course-wise merit rank lists published based on normalized HSC marks.',
      'Attend single-window counselling session (online or in-person at allotted college).',
      'Confirm seat and submit nominal statutory college fees.',
    ],
    counsellingProcess: [
      'Rank calculated out of 400 marks (excluding Language papers) for core courses; out of 100 for language majors.',
      'Special reservation for sports, differently abled, ex-servicemen, and Pudhumai Penn / Tamil Pudhalvan beneficiaries.',
    ],
    requiredDocuments: [
      'Class 12 (+2) Marksheet',
      'Class 10 Marksheet',
      'Transfer Certificate (TC)',
      'Community Certificate',
      'First Graduate Certificate (if applicable)',
      'Income Certificate',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Report to the allotted Government Arts & Science College on the scheduled date.',
      'Pay nominal government tuition fee (often under Rs. 1,500/year for government colleges).',
      'Apply for Tamil Nadu Government Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme (Rs. 1,000/month for girls) or Tamil Pudhalvan Scheme (Rs. 1,000/month for boys).',
    ],
    importantWarnings: [
      'Ensure college choices are ordered carefully; students can apply to multiple government colleges across districts in a single application.',
      'No donation or capitation fees permitted in Government institutions.',
    ],
    helpline: 'TNGASA Support: 044-24344844 / 044-24360980 / tngasa2026@gmail.com',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-medical-selection',
    title: 'Tamil Nadu MBBS / BDS Single Window Counselling',
    authority: 'Selection Committee, Directorate of Medical Education (DME), Tamil Nadu',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Official centralized counselling for Government Quota and Management Quota seats in 38 Government Medical Colleges, Government Dental College, and self-financing medical colleges.',
    targetStudents: 'Class 12 passed students who qualified in NEET UG.',
    eligibility: 'Pass in 12th HSC with 50% in Physics, Chemistry, Biology (40% for reserved) and qualified NEET UG percentile.',
    subjectRequirements: 'Physics, Chemistry, and Biology/Biotechnology mandatory.',
    selectionMode: 'Entrance-Based Single Window',
    entranceRequired: 'NEET UG (National Eligibility cum Entrance Test) conducted by NTA.',
    portalName: 'Tamil Nadu Medical Selection Portal',
    portalUrl: 'https://tnmedicalselection.net/',
    applicationPeriod: 'June to July (Post NEET UG result announcement)',
    applicationFee: 'Rs. 500 for Government Quota; Rs. 1,000 for Management Quota.',
    steps: [
      'Register online at tnmedicalselection.net with NEET Roll Number and application details.',
      'Upload certificates including NEET scorecard, HSC marksheets, Nativity, and Community certificates.',
      'Verification of native status and certificates at designated nodal medical colleges.',
      'State Merit Rank List published incorporating communal reservations.',
      'Round 1 Online Choice Filling of medical/dental colleges in order of preference.',
      'Seat allotment based strictly on State NEET Rank and category.',
      'Download provisional allotment order, pay tuition fee online, and report to the allotted medical college.',
    ],
    counsellingProcess: [
      'Special 7.5% preferential horizontal reservation for Tamil Nadu government school students with complete fee exemption.',
      'Multi-round counselling: Round 1, Round 2, Mop-Up Round, and Stray Vacancy Round.',
    ],
    requiredDocuments: [
      'NEET UG Scorecard & Admit Card',
      'HSC Class 12 Marksheet',
      'SSLC Class 10 Marksheet',
      'Transfer Certificate',
      'Nativity Certificate of Tamil Nadu',
      'Community Certificate',
      'Bonafide Certificate from Class 6 to 12 (mandatory for 7.5% government school quota)',
      'Parent Community and Identity documents for nativity assurance',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Complete physical verification and medical fitness examination at the allotted institution.',
      'Submit prescribed bond and certificates in original.',
      'Obtain official student ID and register with The Tamil Nadu Dr. M.G.R. Medical University.',
    ],
    importantWarnings: [
      'Seat blocking is strictly illegal under Supreme Court directions and incurs heavy monetary penalties.',
      'Always verify that the college has active National Medical Commission (NMC) recognition.',
    ],
    helpline: 'DME Selection Desk: 044-28361674 / 044-29862045',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-paramedical-degree',
    title: 'Tamil Nadu Paramedical & Allied Health Sciences Admissions',
    authority: 'Selection Committee, Directorate of Medical Education (DME), Tamil Nadu',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Single-window counselling for B.Pharm, B.Sc Nursing, BPT (Physiotherapy), BASLP, and 14+ Allied Health Science degree courses across Government Medical Colleges and self-financing institutions.',
    targetStudents: 'Class 12 Science stream passed students.',
    eligibility: 'Pass in +2 with Physics, Chemistry, Biology and English with minimum 45% (40% for SC/ST).',
    subjectRequirements: 'Physics, Chemistry, and Biology/Botany/Zoology compulsory.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'Tamil Nadu Medical Selection (Paramedical)',
    portalUrl: 'https://tnmedicalselection.net/',
    applicationPeriod: 'June to July annually',
    applicationFee: 'Rs. 400 for General/OBC; Exempted for SC/ST candidates.',
    steps: [
      'Apply online on tnmedicalselection.net for Paramedical Degree courses.',
      'Fill marks in Physics, Chemistry, Biology normalized to a cut-off out of 200.',
      'Upload required educational, community, and nativity certificates.',
      'Merit list published based on normalized Class 12 Science cut-off.',
      'Participate in online choice filling of colleges and courses.',
      'Provisional allotment order issued based on merit and reservation.',
      'Report to the allotted government or self-financing college.',
    ],
    counsellingProcess: [
      'Cut-off Formula: Biology (100) + Physics/2 (50) + Chemistry/2 (50) = 200 Marks.',
      '7.5% Government School preferential reservation applies.',
    ],
    requiredDocuments: [
      'Class 12 Marksheet',
      'Class 10 Marksheet',
      'Transfer Certificate',
      'Community Certificate',
      'Nativity Certificate',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Report within the designated period with original certificates.',
      'Register with Tamil Nadu Dr. M.G.R. Medical University and State Nursing / Pharmacy Council.',
    ],
    importantWarnings: [
      'Verify that Nursing colleges have Tamil Nadu Nurses and Midwives Council (TNNMC) and Indian Nursing Council (INC) approvals.',
    ],
    helpline: 'DME Paramedical Helpline: 044-28361674',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-tnau-agriculture',
    title: 'Tamil Nadu Agricultural University (TNAU) UG Admissions',
    authority: 'Tamil Nadu Agricultural University (TNAU), Coimbatore',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Centralised single-window admissions for B.Sc (Hons) Agriculture, B.Sc (Hons) Horticulture, B.Tech Agricultural Engineering, B.Tech Biotechnology, and allied agricultural degrees across 14 constituent and 28 affiliated colleges.',
    targetStudents: 'Class 12 Science stream graduates.',
    eligibility: 'Pass in +2 with minimum 55% marks in PCM/PCB (45% for BC/MBC, pass for SC/ST).',
    subjectRequirements: 'Mathematics and Biology, or PCB with vocational agriculture.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'TNAU Online Admissions Portal',
    portalUrl: 'https://tnau.ac.in/admissions/',
    applicationPeriod: 'May to June annually',
    applicationFee: 'Rs. 600 for General/OBC; Rs. 300 for SC/ST.',
    steps: [
      'Register on the official TNAU admissions portal.',
      'Enter qualifying +2 marks and academic credentials.',
      'Upload mandatory certificates and submit online fee.',
      'TNAU publishes rank list based on cut-off out of 200 marks.',
      'Online counselling rounds and campus-course choice filling.',
      'Allotment letter issued and reporting to designated agricultural campus.',
    ],
    counsellingProcess: [
      '7.5% Government School Reservation applies with full scholarship.',
      'Vocational stream quota reserved for agricultural vocational students.',
    ],
    requiredDocuments: [
      'Class 12 Marksheet',
      'Class 10 Marksheet',
      'Transfer Certificate',
      'Community Certificate',
      'First Graduate Certificate (if applicable)',
      'Nativity Certificate',
    ],
    allotmentNextSteps: [
      'Physical reporting at TNAU Coimbatore or allotted constituent college.',
      'Submission of original certificates and payment of semester fees.',
    ],
    importantWarnings: [
      'Ensure ICAR accreditation status of affiliated private agricultural colleges before finalizing admission.',
    ],
    helpline: 'TNAU Dean Office: 0422-6611210 / 0422-6611345 / ugadmissions@tnau.ac.in',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-tanuvas-veterinary',
    title: 'Tamil Nadu Veterinary and Animal Sciences University (TANUVAS) Admissions',
    authority: 'TANUVAS, Chennai',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Single-window counselling for 5.5-year B.V.Sc & A.H. (Veterinary Science) and 4-year B.Tech Food Technology / Poultry Technology / Dairy Technology courses.',
    targetStudents: 'Class 12 Science passed candidates.',
    eligibility: 'B.V.Sc requires minimum 60% in PCB (50% for SC/ST). B.Tech requires PCM.',
    subjectRequirements: 'Biology, Physics, and Chemistry for B.V.Sc & A.H.; Mathematics for B.Tech.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'TANUVAS Admissions Portal',
    portalUrl: 'https://tanuvas.ac.in/',
    applicationPeriod: 'June to July annually',
    applicationFee: 'Rs. 700 for General; Rs. 350 for SC/ST.',
    steps: [
      'Apply online on tanuvas.ac.in.',
      'Fill Class 12 marks in Physics, Chemistry, and Biology/Maths.',
      'Upload certificates and pay application fee.',
      'Rank list published by TANUVAS selection committee.',
      'Single-window in-person/online counselling at TANUVAS Chennai.',
      'Allotment to veterinary colleges (Madras, Namakkal, Tirunelveli, Orathanadu, Thalaivasal, Udumalpet, Veerapandi).',
    ],
    counsellingProcess: [
      'Strict merit rank based on Biology (100) + Physics (50) + Chemistry (50) = 200 marks.',
      '7.5% preferential reservation for Tamil Nadu government school students.',
    ],
    requiredDocuments: [
      'Class 12 Marksheet',
      'Class 10 Marksheet',
      'Transfer Certificate',
      'Community Certificate',
      'Nativity Certificate',
      'Bonafide Certificate (for 7.5% quota)',
    ],
    allotmentNextSteps: [
      'Report to allotted veterinary college campus.',
      'Register with the Veterinary Council of India (VCI) student records.',
    ],
    importantWarnings: [
      'Veterinary science has mandatory rural livestock internship rotations in the 5th year.',
    ],
    helpline: 'TANUVAS Admission Cell: 044-25551586 / 044-25551587',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'tn-law-admissions-tndalu',
    title: 'Tamil Nadu 5-Year & 3-Year Law Admissions (TNDALU)',
    authority: 'The Tamil Nadu Dr. Ambedkar Law University (TNDALU), Chennai',
    level: 'Class 12',
    category: 'ug-professional',
    description:
      'Centralized admissions for 5-Year Integrated Honours Law (BA LL.B., BBA LL.B., B.Com LL.B., BCA LL.B.) at School of Excellence in Law (SOEL) and 5-Year Integrated Law across 14 Government Law Colleges in Tamil Nadu.',
    targetStudents: 'Class 12 passed students for 5-Year Law; Graduates for 3-Year LL.B.',
    eligibility: '5-Year Law: Minimum 45% in HSC (40% for SC/ST). SOEL Honours requires minimum 70% in HSC.',
    subjectRequirements: 'Open to any Class 12 stream (Science, Commerce, or Arts).',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'TNDALU Official Admission Portal',
    portalUrl: 'https://tndalu.ac.in/',
    applicationPeriod: 'May to June annually',
    applicationFee: 'Rs. 500 for General; Rs. 250 for SC/ST.',
    steps: [
      'Register on tndalu.ac.in and choose Honours (SOEL) or Government Law Colleges.',
      'Enter qualifying examination marks and upload documents.',
      'Merit cut-off list published based on normalized HSC percentage.',
      'Participate in single-window online counselling.',
      'Seat allotment and admission confirmation.',
    ],
    counsellingProcess: [
      'Rank derived from aggregate marks of Class 12 subjects excluding languages.',
      'Communal reservation strictly implemented.',
    ],
    requiredDocuments: [
      'HSC (+2) Marksheet',
      'SSLC Marksheet',
      'Transfer Certificate',
      'Community Certificate',
      'Nativity Certificate',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Report to allotted Government Law College or SOEL campus.',
      'Enrolment with the Bar Council of Tamil Nadu upon degree completion.',
    ],
    importantWarnings: [
      'Verify Bar Council of India (BCI) approval before joining private law colleges.',
    ],
    helpline: 'TNDALU Admissions Helpline: 044-24641212 / 24641919',
    lastVerifiedDate: '2026-11-01',
  },

  // --- C. DIPLOMA TO HIGHER EDUCATION (LATERAL ENTRY) ---
  {
    id: 'tn-lateral-entry-engineering',
    title: 'Direct 2nd-Year B.E. / B.Tech Lateral Entry Admissions',
    authority: 'Directorate of Technical Education (DOTE) via ACGCET Karaikudi, Tamil Nadu',
    level: 'Diploma / Polytechnic',
    category: 'polytechnic-iti',
    description:
      'Statutory single-window lateral entry counselling admitting polytechnic diploma and B.Sc graduates directly into the 3rd Semester (2nd Year) of B.E./B.Tech engineering programs across Tamil Nadu.',
    targetStudents: 'Polytechnic Diploma holders and B.Sc Mathematics graduates.',
    eligibility:
      'Pass in AICTE-approved 3-year Diploma in Engineering/Technology with minimum 45% marks (40% for BC, BCM, MBC/DNC, SC, ST).',
    subjectRequirements: 'Diploma in relevant or allied branch of Engineering or B.Sc with Mathematics in +2.',
    selectionMode: 'Merit-Based Counselling',
    portalName: 'Tamil Nadu Lateral Entry Single Window Portal',
    portalUrl: 'https://dte.tn.gov.in/',
    applicationPeriod: 'May to June annually',
    applicationFee: 'Rs. 300 for General/OBC; Rs. 150 for SC/ST.',
    steps: [
      'Register online at the official DOTE Lateral Entry portal.',
      'Submit marks of Semesters 5 & 6 (or cumulative aggregate of all semesters).',
      'Upload Diploma Certificate, marksheets, Transfer Certificate, and Community Certificate.',
      'Merit rank list published based on pre-final and final year diploma percentage.',
      'Participate in online choice filling of engineering colleges (Anna University CEG, MIT, GCT Coimbatore, Government & Aided colleges, and self-financing institutions).',
      'Download provisional allotment order and join directly in the 3rd semester.',
    ],
    counsellingProcess: [
      'Statutory 10% supernumerary quota of sanctioned intake in all engineering colleges is reserved exclusively for lateral entry students.',
      'Additional lapsed seats from first year are added to the lateral entry pool.',
    ],
    requiredDocuments: [
      'Diploma Marksheets (Semesters 1 through 6)',
      'Provisional Diploma Certificate / Final Diploma Certificate',
      'Class 10 SSLC Marksheet',
      'Transfer Certificate (TC)',
      'Community Certificate',
      'Nativity Certificate (if diploma was completed outside TN)',
      'First Graduate Certificate (if applicable)',
    ],
    allotmentNextSteps: [
      'Report to the allotted engineering college with original documents.',
      'Undergo bridge course in Mathematics and English as prescribed by Anna University.',
    ],
    importantWarnings: [
      'Distance education diplomas are NOT recognized for lateral entry B.E. admission.',
    ],
    helpline: 'ACGCET Lateral Entry Office: 04565-224528 / 224535',
    lastVerifiedDate: '2026-11-01',
  },

  // --- D. UNDERGRADUATE TO POSTGRADUATE ---
  {
    id: 'tn-tancet-postgraduate',
    title: 'Tamil Nadu Common Entrance Test (TANCET / CEETA-PG) – MBA, MCA, M.E., M.Tech',
    authority: 'Anna University, Chennai on behalf of the Government of Tamil Nadu',
    level: 'Undergraduate',
    category: 'pg-admissions',
    description:
      'State-level single window entrance and counselling for admission to MBA, MCA, and M.E./M.Tech/M.Arch programmes in university departments, government, government-aided, and self-financing colleges in Tamil Nadu.',
    targetStudents: 'Graduates with recognized Bachelor\'s degrees (B.Com, BBA, BCA, B.Sc, B.E., B.Tech).',
    eligibility: 'Recognized 3-year or 4-year degree with at least 50% marks (45% for reserved communities).',
    subjectRequirements:
      'MCA requires Mathematics at +2 or degree level. M.E./M.Tech requires relevant B.E./B.Tech degree or equivalent.',
    selectionMode: 'Entrance-Based Single Window',
    entranceRequired: 'TANCET (for MBA/MCA) or CEETA-PG (for M.E./M.Tech/M.Arch).',
    portalName: 'TANCET / CEETA-PG Anna University Official Portal',
    portalUrl: 'https://www.annauniv.edu/',
    applicationPeriod: 'January to February for exam; June to July for counselling',
    applicationFee: 'Rs. 1,000 for General; Rs. 500 for SC/ST.',
    steps: [
      'Register online on tancet.annauniv.edu and download admit card.',
      'Appear for TANCET (MBA/MCA) or CEETA-PG (M.E./M.Tech).',
      'Obtain TANCET/CEETA-PG scorecard and normalization rank.',
      'Register for TANCA Centralised Online Counselling.',
      'Fill college and branch choices in order of preference.',
      'Seat allotment based on state merit rank and community reservation.',
      'Download allotment order and join postgraduate institution.',
    ],
    counsellingProcess: [
      'Counselling conducted centrally by Government College of Technology (GCT), Coimbatore.',
      'GATE qualified candidates receive stipend and preference in M.E./M.Tech counselling.',
    ],
    requiredDocuments: [
      'TANCET / CEETA-PG Scorecard and Hall Ticket',
      'Class 10 and 12 Marksheets',
      'Degree Marksheets (all semesters) and Provisional / Degree Certificate',
      'Transfer Certificate',
      'Community Certificate',
      'Nativity Certificate (if applicable)',
    ],
    allotmentNextSteps: [
      'Report to the allotted university department or engineering college.',
      'Complete postgraduate registration with Anna University Controller of Examinations.',
    ],
    importantWarnings: [
      'Degrees obtained through unapproved off-campus study centers are not eligible for TANCET admissions.',
    ],
    helpline: 'TANCET Office Anna University: 044-22358289 / 044-22358314',
    lastVerifiedDate: '2026-11-01',
  },

  // --- E. POSTGRADUATE TO RESEARCH (PHD) ---
  {
    id: 'tn-phd-research-admissions',
    title: 'Doctor of Philosophy (Ph.D.) Research Admissions',
    authority: 'University Grants Commission (UGC) & State Universities (Anna Univ, Univ of Madras, Bharathiar, MKU)',
    level: 'Postgraduate',
    category: 'phd-research',
    description:
      'Statutory doctoral research admissions governed by UGC Regulations 2022 across recognized central, state, and private university research centers in Tamil Nadu.',
    targetStudents: 'Postgraduate degree holders seeking doctoral research and academic professorship.',
    eligibility:
      'Master\'s degree with at least 55% marks in aggregate (50% for SC, ST, OBC non-creamy layer, and Differently Abled). Alternatively, a 4-year undergraduate degree with 75% marks.',
    subjectRequirements: 'Master\'s in the relevant or interdisciplinary field of research.',
    selectionMode: 'Entrance-Based Single Window',
    entranceRequired: 'UGC NET, CSIR NET, GATE, or University Ph.D. Entrance Examination.',
    portalName: 'Centre for Research – Anna University / University Portals',
    portalUrl: 'https://cfr.annauniv.edu/',
    applicationPeriod: 'Biannual cycles: January Session (notified Oct/Nov) and July Session (notified April/May)',
    applicationFee: 'Rs. 1,000 to Rs. 1,500 depending on university.',
    steps: [
      'Identify research problem and draft structured Research Proposal (5-8 pages).',
      'Obtain consent from an approved, recognized Research Supervisor (Guide) having vacancy.',
      'Apply online on the university\'s Centre for Research portal.',
      'Appear for Written Entrance Test (50% Research Methodology, 50% Subject Specific). Candidates with UGC NET/JRF/GATE are exempted from written test.',
      'Defend research proposal before the Departmental Research Committee (DRC).',
      'Provisional registration order issued; complete mandatory course work (minimum 8-12 credits).',
    ],
    counsellingProcess: [
      'Candidates with UGC-JRF / CSIR-JRF receive monthly stipend of Rs. 37,000 + HRA for initial 2 years and Rs. 42,000 + HRA for subsequent years.',
    ],
    requiredDocuments: [
      'Postgraduate Degree Certificate and Consolidated Marksheet',
      'Undergraduate Degree Certificate and Marksheets',
      'UGC NET / CSIR NET / GATE Certificate (if applicable)',
      'Detailed Research Proposal (Title, Abstract, Objectives, Literature Review, Methodology)',
      'Supervisor Acceptance Letter and Vacancy Certificate',
      'No Objection Certificate (NOC) from employer (for part-time research scholars)',
      'Community Certificate',
    ],
    allotmentNextSteps: [
      'Form Doctoral Committee (DC) within 3 weeks of provisional registration.',
      'Register for coursework subjects and complete ethics module (Research & Publication Ethics).',
    ],
    importantWarnings: [
      'Ph.D. through distance education is strictly PROHIBITED and illegal under UGC Regulations.',
      'Never pay unapproved private publishers; all research papers must be published in UGC-CARE / Scopus / Web of Science indexed journals.',
    ],
    helpline: 'Anna University Centre for Research: 044-22357360 / 22357354',
    lastVerifiedDate: '2026-11-01',
  },

  // --- F. NATIONAL LEVEL ADMISSIONS ---
  {
    id: 'national-josaa-counselling',
    title: 'Joint Seat Allocation Authority (JoSAA / CSAB) – IITs, NITs, IIITs & GFTIs',
    authority: 'Ministry of Education, Government of India & JoSAA',
    level: 'Class 12',
    category: 'national-portal',
    description:
      'Centralized single-window counselling for admission to 23 IITs, 32 NITs (including NIT Trichy), 26 IIITs, and 38 Government Funded Technical Institutes across India.',
    targetStudents: 'JEE Main (for NITs/IIITs) and JEE Advanced (for IITs) qualified candidates.',
    eligibility: '75% aggregate in Class 12 (65% for SC/ST) or top 20 percentile in state board.',
    subjectRequirements: 'Physics, Mathematics, and one of Chemistry/Biology/Biotechnology.',
    selectionMode: 'Entrance-Based Single Window',
    entranceRequired: 'JEE Main / JEE Advanced.',
    portalName: 'Joint Seat Allocation Authority (JoSAA)',
    portalUrl: 'https://josaa.nic.in/',
    applicationPeriod: 'June to July annually (Post JEE Advanced results)',
    applicationFee: 'Free registration; Seat acceptance fee Rs. 35,000 (Rs. 17,500 for SC/ST).',
    steps: [
      'Register on josaa.nic.in using JEE Main credentials.',
      'Fill and lock preferred choices of institutes and branches (over 500 combinations possible).',
      'Multi-round seat allotment (6 rounds).',
      'Seat Acceptance: Choose Freeze, Float, or Slide.',
      'Pay Seat Acceptance Fee online and upload documents for online verification.',
      'Download Provisional Seat Allotment Letter and complete physical reporting.',
    ],
    counsellingProcess: [
      'Home State Quota applies for 50% of NIT seats (including NIT Tiruchirappalli for Tamil Nadu students).',
      'CSAB Special Rounds conducted for vacant seats in NITs and IIITs following JoSAA completion.',
    ],
    requiredDocuments: [
      'Class 12 Marksheet',
      'Class 10 Marksheet',
      'JEE Main / Advanced Admit Card and Scorecard',
      'State of Eligibility Proof (Class 12 School Location)',
      'Category Certificate (OBC-NCL / EWS issued after April 1 of admission year / SC / ST)',
      'Medical Fitness Certificate (Annexure 7)',
      'Aadhaar Card',
    ],
    allotmentNextSteps: [
      'Complete online document query resolution within 24 hours of notice.',
      'Report physically to the allotted NIT, IIT, or IIIT on the date specified in the allotment order.',
    ],
    importantWarnings: [
      'OBC-NCL and EWS certificates must strictly follow the central format and date validity rules.',
    ],
    helpline: 'JoSAA Help Desk: 044-22578000 / josaa@iitkgp.ac.in',
    lastVerifiedDate: '2026-11-01',
  },
  {
    id: 'national-cuet-admissions',
    title: 'Central University UG & PG Admissions (CUET)',
    authority: 'National Testing Agency (NTA) & University Grants Commission (UGC)',
    level: 'Class 12',
    category: 'national-portal',
    description:
      'Common University Entrance Test admissions to 45 Central Universities (including Central University of Tamil Nadu – CUTN, Tiruvarur) and state universities.',
    targetStudents: 'Class 12 graduates for UG; Degree holders for PG.',
    eligibility: 'Pass in Class 12 or Bachelor\'s with minimum 50% marks.',
    subjectRequirements: 'Domain-specific subjects matching university program requirements.',
    selectionMode: 'Entrance-Based Single Window',
    entranceRequired: 'CUET UG / CUET PG conducted by NTA.',
    portalName: 'CUET National Testing Agency Official Portal',
    portalUrl: 'https://cuet.nta.nic.in/',
    applicationPeriod: 'February to April for exam; July to August for university counselling',
    applicationFee: 'Rs. 750 for up to 3 subjects; Rs. 400 for SC/ST.',
    steps: [
      'Appear for CUET and receive NTA NTA scorecard with percentile scores.',
      'Register separately on individual central university admission portals (e.g. cutn.ac.in).',
      'Submit CUET application number and choose desired programs.',
      'University publishes merit rank list based on CUET normalized scores.',
      'Online seat allocation and document verification.',
      'Pay admission fees to confirm enrollment.',
    ],
    counsellingProcess: [
      'Each central university conducts independent counselling based on CUET scores.',
    ],
    requiredDocuments: [
      'CUET Scorecard',
      'Class 10 & 12 Marksheets',
      'Transfer and Migration Certificates',
      'Central Category Certificate (if applicable)',
    ],
    allotmentNextSteps: [
      'Download admission letter and report to university department.',
      'Enrol in hostel accommodation where applicable.',
    ],
    importantWarnings: [
      'Taking CUET alone is not sufficient; students MUST register on the respective university admission portals.',
    ],
    helpline: 'CUET Support: 011-40759000 / cuet-ug@nta.ac.in',
    lastVerifiedDate: '2026-11-01',
  },
];

// =============================================================================
// 2. OFFICIAL STATUTORY ADMISSION PORTALS DIRECTORY
// =============================================================================

export const OFFICIAL_PORTALS_DIRECTORY: OfficialPortalRecord[] = [
  {
    id: 'portal-tnea',
    name: 'Tamil Nadu Engineering Admissions (TNEA)',
    code: 'TNEA-DOTE',
    governingBody: 'Directorate of Technical Education (DOTE) & Anna University',
    tier: 'Tamil Nadu State',
    scope: 'B.E. / B.Tech Admissions in Government and Affiliated Engineering Colleges',
    officialUrl: 'https://www.tneaonline.org/',
    verifiedDomain: 'tneaonline.org',
    coverageCourses: ['B.E. Computer Science', 'B.Tech IT', 'B.E. Mechanical', 'B.E. ECE', 'B.E. Civil', 'B.Tech AI & Data Science'],
    typicalCycle: 'May to August annually',
    helplinePhone: '044-22351014 / 044-22351015',
    helplineEmail: 'support@tneaonline.org',
    guidelinesPdfUrl: 'https://www.tneaonline.org/guidelines.pdf',
  },
  {
    id: 'portal-tngasa',
    name: 'Tamil Nadu Government Arts & Science Admissions (TNGASA)',
    code: 'TNGASA-DCE',
    governingBody: 'Directorate of Collegiate Education (DCE), Government of Tamil Nadu',
    tier: 'Tamil Nadu State',
    scope: 'B.A., B.Sc., B.Com., B.B.A., B.C.A. in 164+ Government Arts & Science Colleges',
    officialUrl: 'https://tndce.tn.gov.in/',
    verifiedDomain: 'tndce.tn.gov.in',
    coverageCourses: ['B.Com General', 'B.Sc Computer Science', 'B.A. English', 'B.Sc Mathematics', 'B.B.A.'],
    typicalCycle: 'May to July annually',
    helplinePhone: '044-24344844 / 044-24360980',
    helplineEmail: 'tngasa2026@gmail.com',
    guidelinesPdfUrl: 'https://tndce.tn.gov.in/',
  },
  {
    id: 'portal-tn-medical',
    name: 'Tamil Nadu Medical Selection Committee',
    code: 'DME-SELECTION',
    governingBody: 'Directorate of Medical Education (DME), Tamil Nadu',
    tier: 'Tamil Nadu State',
    scope: 'MBBS, BDS, B.Pharm, B.Sc Nursing, BPT, Allied Health Sciences',
    officialUrl: 'https://tnmedicalselection.net/',
    verifiedDomain: 'tnmedicalselection.net',
    coverageCourses: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'BPT Physiotherapy', 'B.Sc Radiography'],
    typicalCycle: 'June to September annually',
    helplinePhone: '044-28361674 / 044-29862045',
    helplineEmail: 'medicalselection@tn.gov.in',
    guidelinesPdfUrl: 'https://tnmedicalselection.net/',
  },
  {
    id: 'portal-tnau',
    name: 'Tamil Nadu Agricultural University UG Admissions',
    code: 'TNAU-UG',
    governingBody: 'TNAU Coimbatore & Department of Agriculture, Tamil Nadu',
    tier: 'Tamil Nadu State',
    scope: 'B.Sc (Hons) Agriculture, B.Sc (Hons) Horticulture, B.Tech Agricultural Engineering',
    officialUrl: 'https://tnau.ac.in/admissions/',
    verifiedDomain: 'tnau.ac.in',
    coverageCourses: ['B.Sc (Hons) Agriculture', 'B.Sc (Hons) Horticulture', 'B.Tech Food Technology', 'B.Tech Biotechnology'],
    typicalCycle: 'May to August annually',
    helplinePhone: '0422-6611210 / 0422-6611345',
    helplineEmail: 'ugadmissions@tnau.ac.in',
    guidelinesPdfUrl: 'https://tnau.ucanapply.com/',
  },
  {
    id: 'portal-tanuvas',
    name: 'TANUVAS Veterinary Admissions',
    code: 'TANUVAS-VET',
    governingBody: 'Tamil Nadu Veterinary and Animal Sciences University',
    tier: 'Tamil Nadu State',
    scope: 'B.V.Sc & A.H. (Veterinary Science), B.Tech Food/Poultry/Dairy Technology',
    officialUrl: 'https://tanuvas.ac.in/',
    verifiedDomain: 'tanuvas.ac.in',
    coverageCourses: ['B.V.Sc & A.H.', 'B.Tech Food Technology', 'B.Tech Dairy Technology'],
    typicalCycle: 'June to August annually',
    helplinePhone: '044-25551586 / 044-25551587',
    helplineEmail: 'admissions@tanuvas.org.in',
    guidelinesPdfUrl: 'https://tanuvas.ac.in/admission.php',
  },
  {
    id: 'portal-dote-polytechnic',
    name: 'Tamil Nadu Directorate of Technical Education (Polytechnic & Lateral Entry)',
    code: 'DOTE-TN',
    governingBody: 'Directorate of Technical Education (DOTE), Tamil Nadu',
    tier: 'Tamil Nadu State',
    scope: '3-Year Polytechnic Diploma & Direct 2nd-Year Lateral Entry B.E./B.Tech',
    officialUrl: 'https://dte.tn.gov.in/',
    verifiedDomain: 'dte.tn.gov.in',
    coverageCourses: ['Polytechnic Diploma (All Branches)', 'Lateral Entry B.E./B.Tech'],
    typicalCycle: 'May to July annually',
    helplinePhone: '044-22350525 / 044-22351018',
    helplineEmail: 'dotehelpdesk@tn.gov.in',
    guidelinesPdfUrl: 'https://dte.tn.gov.in/notifications',
  },
  {
    id: 'portal-josaa',
    name: 'Joint Seat Allocation Authority (JoSAA)',
    code: 'JOSAA-CENTRAL',
    governingBody: 'Ministry of Education, Government of India',
    tier: 'Central / National',
    scope: 'All IITs, NITs, IIITs, and Government Funded Technical Institutes (GFTIs)',
    officialUrl: 'https://josaa.nic.in/',
    verifiedDomain: 'josaa.nic.in',
    coverageCourses: ['B.Tech (All Branches)', 'B.Arch', 'Dual Degree B.Tech+M.Tech'],
    typicalCycle: 'June to July annually',
    helplinePhone: '044-22578000',
    helplineEmail: 'josaa@iitkgp.ac.in',
    guidelinesPdfUrl: 'https://josaa.nic.in/',
  },
  {
    id: 'portal-mcc',
    name: 'Medical Counselling Committee (MCC)',
    code: 'MCC-DGHS',
    governingBody: 'Directorate General of Health Services (DGHS), MoHFW',
    tier: 'Central / National',
    scope: '15% All India Quota MBBS/BDS, AIIMS, JIPMER, Central Universities, Deemed Universities',
    officialUrl: 'https://mcc.nic.in/',
    verifiedDomain: 'mcc.nic.in',
    coverageCourses: ['MBBS', 'BDS', 'B.Sc Nursing (Central Institutes)'],
    typicalCycle: 'July to October annually',
    helplinePhone: '1800-102-7637 / 0120-4073500',
    helplineEmail: 'mcc@nic.in',
    guidelinesPdfUrl: 'https://mcc.nic.in/ug-counselling/',
  },
  {
    id: 'portal-abc',
    name: 'Academic Bank of Credits (ABC) & APAAR',
    code: 'ABC-UGC',
    governingBody: 'National e-Governance Division (NeGD) & UGC, Ministry of Education',
    tier: 'Central / National',
    scope: 'Statutory credit accumulation, credit transfer, and APAAR academic mobility records',
    officialUrl: 'https://www.abc.gov.in/',
    verifiedDomain: 'abc.gov.in',
    coverageCourses: ['All Undergraduate, Postgraduate, and Diploma programs'],
    typicalCycle: 'Continuous year-round operational portal',
    helplinePhone: '011-23236351',
    helplineEmail: 'abc.support@gov.in',
    guidelinesPdfUrl: 'https://www.abc.gov.in/',
  },
];

// =============================================================================
// 3. INTER-COLLEGE TRANSFER REGULATIONS & STATUTORY RULES
// =============================================================================

export const TRANSFER_REGULATIONS: TransferRegulation[] = [
  {
    id: 'transfer-anna-univ',
    title: 'Anna University Inter-College Transfer Regulations (B.E. / B.Tech)',
    authority: 'Centre for Student Affairs, Anna University, Chennai',
    governingNorm: 'Anna University Statutes – Clause 4.2 Inter-Institutional Mobility',
    scope: 'Engineering (Anna Univ)',
    eligibilityConditions: [
      'Transfer permitted strictly at the beginning of the 3rd Semester (2nd Year) or 5th Semester (3rd Year).',
      'No transfers permitted in the 1st Year (1st & 2nd semesters) or Final Year (7th & 8th semesters).',
      'Student must have cleared all subjects (zero standing arrears) at the time of application in standard cases.',
      'Course and curriculum syllabus must be fully compatible between sending and receiving colleges.',
      'Sanctioned intake limit of the receiving department must not be exceeded; transfer requires verified vacant seats.',
    ],
    mandatoryPrerequisites: [
      'Genuine grounds for transfer: Family relocation, certified severe medical condition, change of guardian, or institutional closure.',
      'No Objection Certificate (NOC) signed by the Principal/Dean of the relieving college.',
      'No Objection Certificate (NOC) signed by the Principal/Dean of the admitting college confirming vacancy.',
      'Formal approval and Transfer Order issued by the Registrar / Director (Student Affairs), Anna University.',
      'Transfer fee remitted to Anna University (statutory fee of Rs. 3,000 to Rs. 5,000).',
    ],
    disqualifications: [
      'Students admitted under the 7.5% Government School preferential quota cannot transfer to self-financing colleges unless approved under exceptional government orders.',
      'Transfers from unapproved / autonomous unaligned institutions to university departments are restricted.',
      'Transfer for frivolous reasons without authentic documentary evidence will be rejected.',
    ],
    procedureSteps: [
      '1. Verify seat vacancy in the target engineering college for your exact branch and semester.',
      '2. Obtain NOC from your current college Principal after clearing all dues and laboratory liabilities.',
      '3. Obtain provisional acceptance NOC from the target college Principal specifying the vacant seat.',
      '4. Submit combined application form with original marksheets and affidavits to Anna University Centre for Student Affairs.',
      '5. University Scrutiny Committee evaluates eligibility and issues formal Transfer Order.',
      '6. Surrender relieving college TC and report to new college to complete enrollment.',
    ],
    requiredNocAndCertificates: [
      'NOC from Relieving College (stipulating no dues and attendance clearance)',
      'NOC from Receiving College (certifying seat vacancy within sanctioned intake)',
      'Semester Marksheets / Internet copy verified by Principal',
      'Original Transfer Certificate (TC) upon university order issuance',
      'Documentary proof of reason (medical certificate by Civil Surgeon / transfer order of parent / address proof)',
      'Anna University Transfer Fee Demand Draft / Online Receipt',
    ],
    statutoryWarning:
      'Transfer is not an automatic right. Any private college asking for capitation fees or unauthorized transfer payments is violating Anna University regulations.',
  },
  {
    id: 'transfer-dce-arts-science',
    title: 'Tamil Nadu Government Arts & Science Inter-College Transfer Rules',
    authority: 'Directorate of Collegiate Education (DCE), Chennai',
    governingNorm: 'Tamil Nadu Educational Rules (TNER) & DCE Circulars',
    scope: 'Arts & Science (DCE)',
    eligibilityConditions: [
      'Permitted at the beginning of the 2nd Year (3rd Semester) or 3rd Year (5th Semester).',
      'Both colleges must be affiliated to the same university, or inter-university equivalence must be obtained.',
      'Transfer depends strictly on vacancy in the relevant language and major subject combination.',
    ],
    mandatoryPrerequisites: [
      'Valid reason such as marriage of female student, parent retirement/relocation, or certified medical illness.',
      'Consent of both college principals.',
      'Approval of Regional Joint Director (RJD) of Collegiate Education or University Registrar.',
    ],
    disqualifications: [
      'Transfers cannot be effected during the middle of an academic semester.',
      'Shift 1 (Day) to Shift 2 (Evening) transfer requires separate institutional permission.',
    ],
    procedureSteps: [
      '1. Submit transfer petition to current college Principal stating reasons with supporting proof.',
      '2. Principal verifies attendance, conduct, and marks, and issues Relieving NOC.',
      '3. Target college Principal signs Acceptance NOC indicating vacancy.',
      '4. Forward dossier to the Regional Joint Director of Collegiate Education for statutory endorsement.',
      '5. Pay prescribed nominal transfer fee and register in the new college.',
    ],
    requiredNocAndCertificates: [
      'Transfer Certificate (TC)',
      'Conduct Certificate',
      'Attendance Certificate from relieving college',
      'Marksheets of completed semesters',
      'RJD / University Transfer Order',
    ],
    statutoryWarning:
      'Students transferring between colleges retain their internal assessment marks; ensure your continuous assessment records are officially transferred by the Controller of Examinations.',
  },
  {
    id: 'transfer-dote-polytechnic',
    title: 'Directorate of Technical Education (DOTE) Polytechnic Transfer Norms',
    authority: 'Directorate of Technical Education (DOTE), Tamil Nadu',
    governingNorm: 'DOTE Polytechnic Examination Regulations – Section IX',
    scope: 'Polytechnic (DOTE)',
    eligibilityConditions: [
      'Permitted only at the commencement of the 3rd Semester (2nd Year) or 5th Semester (3rd Year).',
      'Must have written all lower semester board examinations.',
      'Vacant seat must exist under the approved branch intake.',
    ],
    mandatoryPrerequisites: [
      'Prior written permission of the Chairman, Board of Technical Examination (DOTE).',
      'Mutual NOCs from the Principals of both polytechnic institutions.',
    ],
    disqualifications: [
      'No transfers permitted between regular polytechnics and sandwich / part-time diploma programs without special approval.',
    ],
    procedureSteps: [
      '1. Apply through the current polytechnic before the annual DOTE transfer cut-off date (usually July 15).',
      '2. Principal forwards application with conduct and attendance records to DOTE.',
      '3. DOTE issues official Transfer Order specifying new student registration code.',
      '4. Relieving polytechnic issues TC and academic transcript; student joins new polytechnic.',
    ],
    requiredNocAndCertificates: [
      'DOTE Sanction Order',
      'Polytechnic Transfer Certificate',
      'Marksheets of 1st and 2nd Semesters',
      'No Dues Certificate',
    ],
    statutoryWarning:
      'Beware of unauthorized agents claiming to arrange polytechnic transfers; all valid transfers must bear the official digital signature of the DOTE Directorate.',
  },
];

// =============================================================================
// 4. BREAK OF STUDY, RE-ENTRY & DROPOUT RECOVERY PROTOCOLS
// =============================================================================

export const REENTRY_PROTOCOLS: ReEntryProtocol[] = [
  {
    id: 'reentry-anna-univ',
    title: 'Anna University Break of Study & Re-admission Procedure',
    situation: 'Students who discontinued their B.E./B.Tech/M.E./MCA studies due to medical, financial, or personal emergencies.',
    authority: 'Centre for Academic Courses & Office of the Controller of Examinations, Anna University',
    maximumDurationRule:
      'Maximum allowable duration to complete B.E./B.Tech is 7 years (14 semesters) for regular students, and 6 years (12 semesters) for lateral entry students, as per UGC/Anna University norms.',
    creditValidity:
      'Credits earned prior to the break remain valid provided the curriculum/regulation has not lapsed. If regulation changes, credit equivalence mapping is carried out.',
    prerequisites: [
      'Break of study must not exceed 2 consecutive semesters (1 academic year) under ordinary permissions, or 4 semesters under special medical condonation.',
      'Prior permission for Break of Study obtained from the Registrar, or ex-post facto condonation requested with valid medical/statutory proofs.',
      'Clearance of all financial dues and disciplinary clearance from the institution.',
    ],
    stepByStepProtocol: [
      'Step 1: Check your total elapsed duration from year of original admission against the maximum permissible 7-year ceiling.',
      'Step 2: Collect original admission orders, student registration number, and marksheet copies of completed semesters.',
      'Step 3: If break was on medical grounds, secure Medical Fitness Certificate and treatment summary from a certified Government Civil Surgeon.',
      'Step 4: Submit formal application for Re-admission / Re-joining to the college Principal at least 45 days before the start of the semester.',
      'Step 5: College forwards the dossier with recommendation to the Director (Academic Courses), Anna University.',
      'Step 6: Anna University issues Syndicate/Academic approval order detailing semester of re-admission and any bridge subjects required.',
      'Step 7: Pay re-admission fee, register for the semester, and resume classes.',
    ],
    requiredDocumentation: [
      'Original Break of Study Sanction Order (if applied beforehand)',
      'Medical Certificate and Discharge Summary (for medical break of study)',
      'Affidavit explaining reasons for discontinuation (for financial/family reasons)',
      'Marksheets of all cleared semesters and arrear examination history',
      'Copy of College ID Card and Allotment Order',
      'Re-admission fee receipt',
    ],
    financialAndConcessionContinuity:
      'Students under First Graduate or Government School 7.5% fee concession retain eligibility upon formal university condonation.',
    counselorContactNotice:
      'If you are discontinuing due to acute mental stress or financial crisis, reach out to the College Grievance Cell or National Tele-MANAS Helpline (14416) for free support.',
  },
  {
    id: 'reentry-arts-science',
    title: 'Arts & Science University Re-admission & Education Continuity',
    situation: 'Students discontinued from BA, BSc, BCom, BBA courses in Madras, Madurai Kamaraj, Bharathiar, Bharathidasan, or Manonmaniam Sundaranar Universities.',
    authority: 'Registrar & Syndicate, Respective State University',
    maximumDurationRule:
      'Maximum course duration is N + 2 years (5 years for a 3-year undergraduate degree; 4 years for a 2-year postgraduate degree).',
    creditValidity:
      'Semester credits remain intact under CBCS (Choice Based Credit System); equivalence committee resolves syllabus revisions.',
    prerequisites: [
      'Student must not have been rusticated for malpractice or disciplinary offenses.',
      'Written application submitted prior to the commencement of the corresponding odd or even semester.',
    ],
    stepByStepProtocol: [
      'Step 1: Verify that your elapsed study gap is within the N + 2 year statutory limit.',
      'Step 2: Approach the Head of the Department (HOD) and Principal of the college where you originally studied.',
      'Step 3: Complete university Re-admission Form with reasons for discontinuation.',
      'Step 4: College forwards application to the University Academic Branch.',
      'Step 5: University issues re-admission sanction order permitting re-enrollment in the same semester of discontinuance.',
      'Step 6: Pay prescribed university re-enrollment and semester tuition fees.',
    ],
    requiredDocumentation: [
      'Discontinuation Certificate / Relieving letter',
      'All semester marks statements',
      'Medical or emergency justification documents',
      'Valid photo ID and Aadhaar card',
    ],
    financialAndConcessionContinuity:
      'Post-Matric Scholarship can be renewed upon submission of university re-admission order and revised academic continuity certificate.',
    counselorContactNotice:
      'Never abandon education due to fee arrear notices; Tamil Nadu Government scholarship offices can intervene to resolve fee blocks.',
  },
  {
    id: 'dropout-recovery-tnou',
    title: 'Dropout Prevention & Flexible Re-entry via Open & Distance Learning (TNOU / IDE)',
    situation: 'Students who exceeded maximum permissible regular college duration or cannot attend physical classes due to employment or family commitments.',
    authority: 'Tamil Nadu Open University (TNOU) & Institute of Distance Education (IDE), University of Madras',
    maximumDurationRule:
      'Flexible extended durations under UGC-DEB (Distance Education Bureau) guidelines; credits earned in regular colleges can be mapped.',
    creditValidity:
      'Credit transfer accepted from UGC-recognized universities under UGC Credit Recognition Regulations.',
    prerequisites: [
      'Previous enrollment in a recognized university with partial semester marksheets.',
      'Application for credit exemption / lateral admission into corresponding year.',
    ],
    stepByStepProtocol: [
      'Step 1: Collect Consolidated Transcript or marksheets of all passed subjects from your previous college.',
      'Step 2: Apply for Lateral Entry / Credit Exemption admission at Tamil Nadu Open University (tnou.ac.in).',
      'Step 3: Equivalence committee reviews passed subjects and exempts completed courses.',
      'Step 4: Register for remaining course papers through distance or weekend hybrid classes.',
      'Step 5: Appear for term-end examinations and graduate with a statutory degree recognized for all government recruitment (UGC-DEB).',
    ],
    requiredDocumentation: [
      'Transfer Certificate / Migration Certificate from previous institution',
      'Certified Marksheets of passed semesters',
      'Class 10 and 12 certificates',
      'Aadhaar card copy',
    ],
    financialAndConcessionContinuity:
      'TNOU provides fee concession for women, differently abled candidates, and prison inmates.',
    counselorContactNotice:
      'A distance degree from a UGC-DEB approved university is 100% equivalent to regular degrees for TNPSC, UPSC, and Banking exams under Central Government Gazette.',
  },
];

// =============================================================================
// 5. CREDIT TRANSFER & ACADEMIC MOBILITY (ABC / APAAR)
// =============================================================================

export const CREDIT_MOBILITY_GUIDES: CreditMobilityGuide[] = [
  {
    id: 'credit-abc-framework',
    title: 'Academic Bank of Credits (ABC) & APAAR Mobility Framework',
    authority: 'University Grants Commission (UGC) & Ministry of Education, Govt of India',
    portalUrl: 'https://www.abc.gov.in/',
    coreConcepts: [
      {
        title: 'What is an Academic Credit?',
        description:
          'A credit is a standardized unit measuring learning workload. 1 credit corresponds to 15 hours of classroom teaching or 30 hours of laboratory / practical work per semester.',
      },
      {
        title: 'What is the Academic Bank of Credits (ABC)?',
        description:
          'A digital repository that stores academic credits earned by a student across accredited universities, enabling seamless inter-institutional credit transfer.',
      },
      {
        title: 'What is APAAR (One Nation One Student ID)?',
        description:
          'Automated Permanent Academic Account Registry – a 12-digit lifelong digital identity for students in India linked to DigiLocker and ABC accounts.',
      },
      {
        title: 'Multiple Entry and Multiple Exit (MEME)',
        description:
          'Statutory provision under NEP enabling students to exit after 1 year with Certificate, 2 years with Diploma, 3 years with Bachelor\'s, and 4 years with Honours/Research, and re-enter within permissible time.',
      },
    ],
    acceptanceRules: [
      'Both the sending and receiving institutions must be registered on the ABC portal (abc.gov.in).',
      'The receiving university\'s Academic Council determines the percentage of external credits accepted (ordinarily up to 40% to 50% of total degree credits).',
      'Credits earned through SWAYAM / NPTEL MOOC courses are statutorily recognized up to 40% of total semester credits under UGC regulations.',
      'Core subject requirements of the receiving university must be fulfilled before awarding the final degree.',
    ],
    stepByStepTransfer: [
      '1. Create and verify your 12-digit APAAR / ABC ID on abc.gov.in or via DigiLocker.',
      '2. Provide your ABC ID to your current college during examination registration so credits are digitally deposited.',
      '3. When moving to a new university, submit your ABC account transcript during the admission credit transfer evaluation.',
      '4. The receiving university\'s equivalence committee verifies credits on the ABC portal and maps them against the target syllabus.',
      '5. Verified credits are transferred and exempted, allowing you to register only for remaining balance credits.',
    ],
    statutoryLimitations: [
      'Credit transfer does NOT grant automatic admission; admission is subject to seat vacancy and university eligibility.',
      'Professional courses regulated by statutory councils (Medical/NMC, Dental/DCI, Pharmacy/PCI, Architecture/CoA) have specialized council-specific transfer caps.',
    ],
  },
];

// =============================================================================
// 6. REQUIRED ADMISSION DOCUMENTS DIRECTORY
// =============================================================================

export const REQUIRED_DOCUMENTS_DIRECTORY: RequiredDocumentItem[] = [
  {
    id: 'doc-tc',
    name: 'Transfer Certificate (TC)',
    purpose: 'Certifies that the student has been officially relieved from the previous educational institution without disciplinary liability.',
    issuingAuthority: 'Head of the Institution / School Principal / College Dean',
    applicableStages: ['Class 10', 'Class 11', 'Class 12', 'Diploma / Polytechnic', 'Undergraduate', 'Postgraduate'],
    formatRequired: 'Original + Attested Copies',
    replacementProcedureIfMissing:
      'File an official requisition with the previous institution. If lost, apply with a non-traceable certificate from local police and an affidavit before a notary.',
    relatedModule03Link: '/certificates',
  },
  {
    id: 'doc-community-cert',
    name: 'Permanent Community Certificate',
    purpose: 'Verifies eligibility for constitutional communal reservations (BC, BCM, MBC/DNC, SC, ST) in seat allocation and fee concessions.',
    issuingAuthority: 'Zonal Deputy Tahsildar / Tahsildar / Revenue Divisional Officer (RDO for ST)',
    applicableStages: ['All Stages'],
    formatRequired: 'Digitally Signed e-Sanad / DigiLocker',
    replacementProcedureIfMissing:
      'Apply online via Tamil Nadu e-Sevai / e-District portal (REV-101 Community Certificate). Lifetime statutory validity; never expires.',
    relatedModule03Link: '/certificates?tab=finder',
  },
  {
    id: 'doc-nativity-cert',
    name: 'Nativity Certificate of Tamil Nadu',
    purpose: 'Mandatory for candidates who completed part of their schooling outside Tamil Nadu but claim local domicile and state reservation quotas.',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar (Revenue Department)',
    applicableStages: ['Class 12', 'Diploma / Polytechnic', 'Undergraduate', 'Postgraduate'],
    formatRequired: 'Digitally Signed e-Sanad / DigiLocker',
    replacementProcedureIfMissing:
      'Apply online on e-Sevai portal with parent domicile, land tax receipt, or 5-year school bonafide certificates.',
    relatedModule03Link: '/certificates?tab=finder',
  },
  {
    id: 'doc-first-graduate',
    name: 'First Graduate Certificate (No Graduate in Family)',
    purpose: 'Qualifies eligible undergraduate students for complete tuition fee exemption in Tamil Nadu Government and Counselling quota engineering/medical seats.',
    issuingAuthority: 'Tahsildar (Revenue Department, Tamil Nadu)',
    applicableStages: ['Class 12', 'Diploma / Polytechnic', 'Undergraduate'],
    formatRequired: 'Digitally Signed e-Sanad / DigiLocker',
    replacementProcedureIfMissing:
      'Apply on e-Sevai portal with family ration card, parents educational declarations, and co-applicant signatures. Valid for lifetime of degree.',
    relatedModule03Link: '/certificates',
  },
  {
    id: 'doc-income-cert',
    name: 'Income Certificate',
    purpose: 'Required for Post-Matric Scholarships, Central Sector Schemes, and tuition fee waivers (family annual income thresholds e.g. < Rs. 2.5 Lakhs).',
    issuingAuthority: 'Zonal Deputy Tahsildar (Revenue Department)',
    applicableStages: ['All Stages'],
    formatRequired: 'Digitally Signed e-Sanad / DigiLocker',
    replacementProcedureIfMissing:
      'Apply online via e-Sevai with payslip, employer certificate, or agricultural income self-declaration. Statutory validity is 1 year from issuance.',
    relatedModule03Link: '/certificates?tab=finder',
  },
  {
    id: 'doc-bonafide-govt-school',
    name: '7.5% Government School Study Bonafide Certificate',
    purpose: 'Mandatory proof for availing 7.5% preferential horizontal reservation with 100% free education in Engineering, Medical, Agriculture, and Veterinary seats.',
    issuingAuthority: 'Chief Educational Officer (CEO) / District Educational Officer (DEO) & School Headmasters',
    applicableStages: ['Class 12'],
    formatRequired: 'Original + Attested Copies',
    replacementProcedureIfMissing:
      'Collect study proof for Classes 6 through 12 from respective Government school Headmasters and get consolidated certification from the Chief Educational Officer.',
  },
  {
    id: 'doc-migration-cert',
    name: 'Migration Certificate',
    purpose: 'Required when transitioning from another state board or university to a Tamil Nadu university, or vice versa.',
    issuingAuthority: 'Board of Education (CBSE, CISCE) or University Registrar',
    applicableStages: ['Class 12', 'Undergraduate', 'Postgraduate', 'Research / PhD'],
    formatRequired: 'Original + Attested Copies',
    replacementProcedureIfMissing:
      'Apply directly via CBSE DigiLocker / Pariksha Sangam, or through parent university examination branch online portal.',
  },
  {
    id: 'doc-apaar-abc',
    name: 'APAAR / Academic Bank of Credits (ABC) Record Card',
    purpose: 'Digital identifier linking all academic marks, credits, and verification records across national databases.',
    issuingAuthority: 'Ministry of Education & DigiLocker',
    applicableStages: ['All Stages'],
    formatRequired: 'Digitally Signed e-Sanad / DigiLocker',
    replacementProcedureIfMissing:
      'Generate instantly for free on abc.gov.in or digilocker.gov.in using Aadhaar authentication.',
  },
];

// =============================================================================
// 7. ADMISSION DEADLINES & SCHEDULES CALENDAR
// =============================================================================

export const ADMISSION_DEADLINES_CALENDAR: AdmissionDeadlineItem[] = [
  {
    id: 'dl-tnea-2026',
    title: 'TNEA Engineering Admissions 2026-27',
    authority: 'DOTE Tamil Nadu',
    level: 'Class 12',
    academicYear: '2026-27',
    status: 'Open',
    startDate: '2026-05-06',
    closingDate: '2026-06-08',
    counsellingDate: '2026-07-01 to 2026-08-15',
    portalUrl: 'https://www.tneaonline.org/',
    officialNoticeUrl: 'https://www.tneaonline.org/notifications',
    lastVerified: '2026-11-01',
  },
  {
    id: 'dl-tngasa-2026',
    title: 'TNGASA Government Arts & Science Admissions 2026-27',
    authority: 'DCE Tamil Nadu',
    level: 'Class 12',
    academicYear: '2026-27',
    status: 'Closing Soon',
    startDate: '2026-05-10',
    closingDate: '2026-06-15',
    counsellingDate: '2026-06-25 to 2026-07-20',
    portalUrl: 'https://tndce.tn.gov.in/',
    officialNoticeUrl: 'https://tndce.tn.gov.in/',
    lastVerified: '2026-11-01',
  },
  {
    id: 'dl-lateral-entry-2026',
    title: 'Direct 2nd-Year Engineering Lateral Entry Counselling',
    authority: 'DOTE / ACGCET Karaikudi',
    level: 'Diploma / Polytechnic',
    academicYear: '2026-27',
    status: 'Upcoming',
    startDate: '2026-05-20',
    closingDate: '2026-06-25',
    counsellingDate: '2026-07-10 to 2026-07-30',
    portalUrl: 'https://dte.tn.gov.in/',
    officialNoticeUrl: 'https://dte.tn.gov.in/lateral-entry',
    lastVerified: '2026-11-01',
  },
  {
    id: 'dl-tn-medical-2026',
    title: 'Tamil Nadu MBBS/BDS State Quota Counselling 2026',
    authority: 'DME Selection Committee',
    level: 'Class 12',
    academicYear: '2026-27',
    status: 'Schedule Awaited',
    startDate: 'Not officially announced',
    closingDate: 'Not officially announced',
    counsellingDate: 'Following NEET UG All-India Schedule',
    portalUrl: 'https://tnmedicalselection.net/',
    officialNoticeUrl: 'https://tnmedicalselection.net/',
    lastVerified: '2026-11-01',
  },
  {
    id: 'dl-josaa-2026',
    title: 'JoSAA IIT/NIT National Joint Seat Allocation 2026',
    authority: 'Ministry of Education / JoSAA',
    level: 'Class 12',
    academicYear: '2026-27',
    status: 'Upcoming',
    startDate: '2026-06-10',
    closingDate: '2026-06-20',
    counsellingDate: '2026-06-22 to 2026-07-28',
    portalUrl: 'https://josaa.nic.in/',
    officialNoticeUrl: 'https://josaa.nic.in/schedule',
    lastVerified: '2026-11-01',
  },
  {
    id: 'dl-polytechnic-2026',
    title: 'Tamil Nadu Polytechnic Diploma Centralised Admissions',
    authority: 'DOTE Tamil Nadu',
    level: 'Class 10',
    academicYear: '2026-27',
    status: 'Open',
    startDate: '2026-05-15',
    closingDate: '2026-06-20',
    counsellingDate: '2026-06-28 to 2026-07-15',
    portalUrl: 'https://dte.tn.gov.in/',
    officialNoticeUrl: 'https://dte.tn.gov.in/diploma-admission',
    lastVerified: '2026-11-01',
  },
];

// Helper functions for search & filtering
export function getPathwaysByStage(stage: EducationStage): AdmissionPathway[] {
  if (stage === 'All Stages') return ADMISSION_PATHWAYS;
  return ADMISSION_PATHWAYS.filter((p) => p.level === stage);
}

export function getPathwayById(id: string): AdmissionPathway | undefined {
  return ADMISSION_PATHWAYS.find((p) => p.id === id);
}

export function searchPathways(query: string, level?: EducationStage): AdmissionPathway[] {
  const q = query.toLowerCase().trim();
  let list = level && level !== 'All Stages' ? getPathwaysByStage(level) : ADMISSION_PATHWAYS;

  if (!q) return list;

  return list.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.authority.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.targetStudents.toLowerCase().includes(q) ||
      p.eligibility.toLowerCase().includes(q) ||
      p.portalName.toLowerCase().includes(q)
  );
}
