// lib/exams-data.ts
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
  minimumMarks?: string | null;
  ageCriteria: string;
  ageMin?: number | null;
  ageMax?: number | null;
  reservationSummary: string;
  examinationMode: string;
  examFormatDescription: string;
  feeType: FeeClassification;
  feeGeneralInr: number;
  feeReservedInr: number;
  feeDescription: string;
  hasFeeConcession: boolean;
  feeConcessionDetails?: string | null;
  hasScholarship: boolean;
  scholarshipDetails?: string | null;
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
  previousPapersUrl?: string | null;
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

export const EXAMINATIONS_DATABASE: ExamRecord[] = [
  {
    "id": "tnpsc-group-1",
    "title": "Tamil Nadu Public Service Commission Combined Civil Services Examination - I (TNPSC Group 1)",
    "shortCode": "TNPSC Group 1",
    "conductingAuthority": "Tamil Nadu Public Service Commission (TNPSC)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Social Work",
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Management"
    ],
    "purpose": "Premier statutory recruitment examination to select top-tier gazetted civil administrators, police chiefs, and commercial tax commissioners for the Government of Tamil Nadu.",
    "whoCanApply": "Any graduate degree holder from a UGC-recognised university who is a citizen of India and meets the age and Tamil language criteria.",
    "minimumQualification": "Any Bachelor's Degree (B.A., B.Sc., B.Com., B.E., B.Tech., etc.) from a UGC-recognized university.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "General Studies",
      "Aptitude and Mental Ability",
      "Tamil Eligibility"
    ],
    "minimumMarks": "Pass in recognized Bachelor degree",
    "ageCriteria": "21 to 39 years as of 1st July of notification year for BC, BCM, MBC, SC, ST; 21 to 34 years for General candidates.",
    "ageMin": 21,
    "ageMax": 39,
    "reservationSummary": "69% Tamil Nadu communal reservation policy applies + 20% horizontal reservation for Persons Studied in Tamil Medium (PSTM) + 4% PwD quota.",
    "examinationMode": "Pen-and-Paper (OMR Preliminary + Descriptive Mains)",
    "examFormatDescription": "Stage 1: Preliminary Exam (Single Paper OMR, 200 Questions, 300 Marks, 3 Hours). Stage 2: Main Written Exam (Paper I Tamil Eligibility 100 Marks qualifying + Papers II, III, IV Descriptive General Studies 750 Marks). Stage 3: Oral Test / Interview (100 Marks). Total Selection Score: 850 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "Preliminary Examination Fee: \u20b9100 (One-Time Registration \u20b9150 valid for 5 years). 100% Fee Exemption for SC, ST, Differently Abled, and Destitute Widows.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "SC/ST candidates have full exemption. BC/MBC candidates receive 3 free chances.",
    "hasScholarship": true,
    "scholarshipDetails": "Candidates clearing Prelims receive \u20b925,000 preparation stipend from Tamil Nadu Backward Classes / Adi Dravidar Welfare departments.",
    "applicationProcedure": [
      "1. Complete One-Time Registration (OTR) on tnpsc.gov.in with Aadhaar verification.",
      "2. Submit online application for Group I Services notification.",
      "3. Upload educational certificates, community certificate, and PSTM certificate if applicable.",
      "4. Pay examination fee online or verify exemption status.",
      "5. Download hall ticket 10 days before Preliminary examination."
    ],
    "requiredDocuments": [
      "SSLC 10th Marksheet (Proof of Date of Birth and Tamil study)",
      "HSC 12th Marksheet",
      "Degree Provisional or Convocation Certificate",
      "Permanent Community Certificate issued by TN Revenue Department",
      "PSTM Certificate from Class 1 to Degree (if claiming 20% Tamil Medium quota)",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "March 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "June 2026",
      "examinationDate": "July 2026",
      "resultDeclaration": "September 2026",
      "counsellingOrInterview": "November 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tnpsc.gov.in/",
    "officialNotificationUrl": "https://www.tnpsc.gov.in/",
    "officialApplicationPortalUrl": "https://apply.tnpscexams.in/",
    "officialSyllabusUrl": "https://www.tnpsc.gov.in/English/syllabus.html",
    "previousPapersUrl": "https://www.tnpsc.gov.in/English/previousquestionpapers.aspx",
    "opportunityProvided": {
      "summary": "Direct appointment to the highest executive state government positions with promotion opportunities to IAS / IPS cadres under government quotas.",
      "degreesOrPosts": [
        "Deputy Collector (Tamil Nadu Civil Service - direct feeder to IAS)",
        "Deputy Superintendent of Police (DSP Category I - direct feeder to IPS)",
        "Assistant Commissioner of Commercial Taxes",
        "Deputy Registrar of Co-operative Societies",
        "Assistant Director of Rural Development",
        "District Employment Officer",
        "District Officer (Fire and Rescue Services)"
      ],
      "salaryOrStipend": "Pay Level 22 (\u20b956,100 \u2013 \u20b92,05,700) + DA + HRA + Official Vehicle + Government Accommodation",
      "careerAdvancement": "Confirmed promotion to Indian Administrative Service (IAS) and Indian Police Service (IPS) after statutory state tenure.",
      "counsellingProcess": "Merit rank based on Mains (750) + Interview (100) followed by in-person counseling at TNPSC Office, Chennai.",
      "statutoryQuotaBenefit": "20% horizontal reservation for students who completed schooling and degree in Tamil medium (PSTM)."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Deputy Collector",
        "Deputy Superintendent of Police (DSP)",
        "Assistant Commissioner (Commercial Taxes)",
        "Assistant Director of Rural Development"
      ],
      "participatingBodies": "Tamil Nadu State Civil Services, Revenue Dept, Home Dept",
      "selectionStepsAfterExam": [
        "1. Preliminary Screening OMR Test.",
        "2. Mains Written Examination (4 Papers).",
        "3. Oral Interview / Viva-Voce (100 Marks).",
        "4. Service Allocation Counselling at TNPSC Chennai."
      ],
      "expectedOutcome": "Permanent Class I Gazetted state civil service appointment with lifelong pension and administrative authority.",
      "statutoryQuotaBenefit": "20% PSTM Tamil medium reservation and 69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Prelims: General Science, Current Events, Geography of India & TN, History & Culture of India & TN, Indian Polity, Indian Economy, Indian National Movement, History, Culture, Heritage and Socio-Political Movements in TN (Unit 8), Development Administration in TN (Unit 9), Aptitude & Mental Ability.",
        "Mains Paper I: Mandatory Tamil Eligibility (SSLC Standard).",
        "Mains Paper II, III, IV: Modern History, Social Issues, General Science, Indian Polity, Role of Science & Tech, Tamil Society & Heritage, Geography, Environment, Indian Economy."
      ],
      "recommendedFocus": [
        "Tamil Nadu Samacheer Kalvi 6th to 12th standard textbooks",
        "Unit 8 & Unit 9 state administration topics",
        "Daily editorial analysis of The Hindu / Dinamani"
      ],
      "markingScheme": "Prelims: 200 Questions, 300 Marks (1.5 marks per question). Mains: 750 Marks (3 Papers \u00d7 250 Marks). Interview: 100 Marks. Total: 850 Marks.",
      "negativeMarking": "No negative marking in TNPSC Prelims",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNPSC Statutory Annual Recruitment Calendar"
  },
  {
    "id": "tnpsc-group-2",
    "title": "Tamil Nadu Public Service Commission Combined Civil Services Examination - II (Interview Posts) (TNPSC Group 2)",
    "shortCode": "TNPSC Group 2",
    "conductingAuthority": "Tamil Nadu Public Service Commission (TNPSC)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Arts",
      "Commerce",
      "Science",
      "Law",
      "Social Work",
      "Management"
    ],
    "purpose": "Recruitment to executive subordinate gazetted posts in the Registration, Revenue, Labour, and Municipal Administration departments of Tamil Nadu.",
    "whoCanApply": "Graduates holding any Bachelor's degree from a recognized university.",
    "minimumQualification": "Any Bachelor's Degree. Specific posts require Law, Commerce, or Social Science degrees.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "General Studies",
      "Aptitude",
      "Mandatory Tamil Eligibility"
    ],
    "minimumMarks": "Pass in recognized Bachelor degree",
    "ageCriteria": "18 to 34 years for OC; 18 to 39 years for BC, BCM, MBC, SC, ST.",
    "ageMin": 18,
    "ageMax": 39,
    "reservationSummary": "69% communal reservation + 20% PSTM + 4% PwD quota.",
    "examinationMode": "Pen-and-Paper (OMR Preliminary + Mains Written + Interview)",
    "examFormatDescription": "Prelims (OMR 200 Questions, 300 Marks, 3 Hours). Mains Written (Paper I Qualifying Tamil 100 Marks; Paper II General Studies Descriptive 300 Marks). Interview: 40 Marks. Total 340 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "Preliminary Fee: \u20b9100. Mains Fee: \u20b9150. Fee concession available for SC/ST/Differently Abled.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Full exemption for SC/ST and Destitute Widows.",
    "hasScholarship": false,
    "applicationProcedure": [
      "1. Register on TNPSC portal with OTR.",
      "2. Submit Group 2 / 2A combined online application.",
      "3. Select preference for Interview posts.",
      "4. Pay examination fee online.",
      "5. Appear for Preliminary examination."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet",
      "Community Certificate",
      "PSTM Certificate"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "September 2026",
      "examinationDate": "October 2026",
      "resultDeclaration": "December 2026",
      "counsellingOrInterview": "February 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tnpsc.gov.in/",
    "officialNotificationUrl": "https://www.tnpsc.gov.in/",
    "officialApplicationPortalUrl": "https://apply.tnpscexams.in/",
    "officialSyllabusUrl": "https://www.tnpsc.gov.in/English/syllabus.html",
    "opportunityProvided": {
      "summary": "Subordinate executive officers with direct field authority, registration powers, and municipal administration responsibilities.",
      "degreesOrPosts": [
        "Sub-Registrar Grade II (Registration Department)",
        "Municipal Commissioner Grade II",
        "Deputy Commercial Tax Officer (DCTO)",
        "Probation Officer (Prisons / Social Defence)",
        "Junior Employment Officer",
        "Special Assistant in Vigilance & Anti-Corruption"
      ],
      "salaryOrStipend": "Pay Level 16 (\u20b936,900 \u2013 \u20b91,16,600) + DA + HRA",
      "careerAdvancement": "Promotion to District Registrar, Commercial Tax Officer, and Joint Commissioner.",
      "counsellingProcess": "Combined merit list based on Mains (300) + Interview (40) counseling in Chennai.",
      "statutoryQuotaBenefit": "20% PSTM horizontal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Sub-Registrar",
        "Municipal Commissioner",
        "Deputy Commercial Tax Officer"
      ],
      "participatingBodies": "Tamil Nadu Registration, Municipal, and Commercial Taxes Departments",
      "selectionStepsAfterExam": [
        "1. Prelims OMR.",
        "2. Mains Descriptive.",
        "3. Oral Interview (40 Marks).",
        "4. Post Allotment."
      ],
      "expectedOutcome": "Executive state government service with permanent tenure and gazetted authority.",
      "statutoryQuotaBenefit": "20% PSTM quota and 69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "General Studies, Aptitude, Tamil Society & Administration."
      ],
      "recommendedFocus": [
        "Samacheer Kalvi books",
        "Descriptive writing in Tamil/English for Mains"
      ],
      "markingScheme": "Prelims: 300 Marks. Mains: 300 Marks. Interview: 40 Marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNPSC Official Annual Planner"
  },
  {
    "id": "tnpsc-group-2a",
    "title": "Tamil Nadu Public Service Commission Combined Civil Services Examination - IIA (Non-Interview Posts) (TNPSC Group 2A)",
    "shortCode": "TNPSC Group 2A",
    "conductingAuthority": "Tamil Nadu Public Service Commission (TNPSC)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Management"
    ],
    "purpose": "Recruitment to non-interview ministerial and secretariat executive assistant cadres in Tamil Nadu Government Departments.",
    "whoCanApply": "Any graduate degree holder.",
    "minimumQualification": "Any Bachelor's Degree from a recognized university.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "General Studies",
      "Aptitude",
      "Mandatory Tamil Eligibility"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "18 to 34 years for General; 18 to 39 years for Reserved categories.",
    "ageMin": 18,
    "ageMax": 39,
    "reservationSummary": "69% communal reservation + 20% PSTM quota.",
    "examinationMode": "Pen-and-Paper (OMR Preliminary + Mains Written Examination)",
    "examFormatDescription": "Prelims (OMR 200 Questions, 300 Marks). Mains (Paper I Qualifying Tamil 100 Marks; Paper II Descriptive General Studies 300 Marks). Selection strictly on Mains marks (No Interview).",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "Prelims Fee: \u20b9100. Mains Fee: \u20b9150. Exemption for SC/ST.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "SC/ST candidates exempted.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply via combined Group 2/2A notification on tnpsc.gov.in."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet",
      "Community Certificate",
      "PSTM Certificate"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "September 2026",
      "examinationDate": "October 2026",
      "resultDeclaration": "January 2027",
      "counsellingOrInterview": "March 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tnpsc.gov.in/",
    "officialNotificationUrl": "https://www.tnpsc.gov.in/",
    "officialApplicationPortalUrl": "https://apply.tnpscexams.in/",
    "officialSyllabusUrl": "https://www.tnpsc.gov.in/English/syllabus.html",
    "opportunityProvided": {
      "summary": "Direct secretariat administrative and senior departmental assistant appointments in Chennai and district collectorates.",
      "degreesOrPosts": [
        "Assistant in Tamil Nadu Secretariat Service",
        "Assistant in TNPSC Secretariat",
        "Assistant in Commercial Taxes Department",
        "Planning Junior Assistant",
        "Auditor in State Audit Department",
        "Assistant Section Officer (ASO) in Finance & Law"
      ],
      "salaryOrStipend": "Pay Level 10 (\u20b920,600 \u2013 \u20b975,900) to Level 16 (\u20b936,900 \u2013 \u20b91,16,600)",
      "careerAdvancement": "Promotion to Section Officer (SO), Under Secretary, and Deputy Secretary in the Secretariat.",
      "counsellingProcess": "Merit rank based exclusively on Mains descriptive marks.",
      "statutoryQuotaBenefit": "20% PSTM horizontal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Section Officer",
        "Secretariat Assistant",
        "Senior Revenue Auditor"
      ],
      "participatingBodies": "Tamil Nadu Secretariat, Finance Dept, Revenue Administration",
      "selectionStepsAfterExam": [
        "1. Prelims.",
        "2. Mains Descriptive.",
        "3. Department Allocation Counselling."
      ],
      "expectedOutcome": "Permanent administrative officer career in Tamil Nadu Secretariat and district collectorates.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "General Studies, Tamil Administration, State Schemes."
      ],
      "recommendedFocus": [
        "Descriptive answers writing",
        "Samacheer Kalvi textbooks"
      ],
      "markingScheme": "Mains: 300 Marks. Selection based entirely on Mains.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNPSC Official Annual Planner"
  },
  {
    "id": "tnpsc-group-4-10th",
    "title": "Tamil Nadu Public Service Commission Combined Civil Services Examination - IV (TNPSC Group 4 & VAO)",
    "shortCode": "TNPSC Group 4",
    "conductingAuthority": "Tamil Nadu Public Service Commission (TNPSC)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10",
      "Class 11",
      "Class 12",
      "Diploma / Polytechnic",
      "ITI",
      "Undergraduate",
      "Postgraduate"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Polytechnic",
      "ITI",
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Other Recognised Courses"
    ],
    "purpose": "Mass public service recruitment examination providing direct entry-level permanent government appointments across all Tamil Nadu villages and government taluk offices.",
    "whoCanApply": "Candidates who have passed SSLC (Class 10) or higher qualification with Tamil as a subject.",
    "minimumQualification": "Must have passed S.S.L.C. Public Examination (Class 10) or its equivalent with eligibility for admission to Higher Secondary courses.",
    "eligibleStreams": [
      "Any educational stream after Class 10"
    ],
    "requiredSubjects": [
      "Tamil Eligibility & Scoring (100 Questions)",
      "General Studies (75 Questions)",
      "Aptitude & Mental Ability (25 Questions)"
    ],
    "minimumMarks": "Pass in Class 10 (35% marks in each subject)",
    "ageCriteria": "21 to 37 years for VAO (42 years for BC/MBC/SC/ST); 18 to 32 years for Junior Assistant/Typist (37 years for BC/MBC/SC/ST). No maximum age limit for candidates with higher qualifications (HSC/Degree).",
    "ageMin": 18,
    "ageMax": 42,
    "reservationSummary": "69% communal reservation + 20% PSTM (Persons Studied in Tamil Medium) + 5% Destitute Widow + 4% Differently Abled + 5% Ex-Servicemen quota.",
    "examinationMode": "Pen-and-Paper (OMR - Single Stage Examination)",
    "examFormatDescription": "Single paper consisting of 200 Questions (300 Marks, 3 Hours duration). Part A: Tamil Eligibility-cum-Scoring Test (100 Questions - 150 Marks, minimum 40% qualifying required). Part B: General Studies (75 Questions - 112.5 Marks) + Aptitude & Mental Ability (25 Questions - 37.5 Marks). No interview.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "Examination Fee: \u20b9100. 100% Free for SC, ST, Differently Abled, Destitute Widows. 3 free chances for BC/MBC.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Full fee waiver for SC/ST and Destitute Widows.",
    "hasScholarship": false,
    "applicationProcedure": [
      "1. Complete One-Time Registration (OTR) on apply.tnpscexams.in with Aadhaar authentication.",
      "2. Fill Group 4 application form with SSLC marksheet details.",
      "3. Upload community certificate, SSLC marksheet, and PSTM certificate.",
      "4. Pay \u20b9100 online fee or select fee exemption.",
      "5. Download hall ticket 1 week before the exam date."
    ],
    "requiredDocuments": [
      "SSLC 10th Marksheet (mandatory)",
      "Permanent Community Certificate",
      "PSTM Certificate (Classes 1 to 10 in Tamil medium for 20% reservation)",
      "Typewriting / Shorthand Certificate (if applying for Typist / Steno-Typist posts)"
    ],
    "importantDates": {
      "applicationOpening": "January 2026",
      "applicationDeadline": "February 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "June 2026",
      "resultDeclaration": "October 2026",
      "counsellingOrInterview": "December 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tnpsc.gov.in/",
    "officialNotificationUrl": "https://www.tnpsc.gov.in/",
    "officialApplicationPortalUrl": "https://apply.tnpscexams.in/",
    "officialSyllabusUrl": "https://www.tnpsc.gov.in/English/syllabus.html",
    "previousPapersUrl": "https://www.tnpsc.gov.in/English/previousquestionpapers.aspx",
    "opportunityProvided": {
      "summary": "Direct lifetime permanent Tamil Nadu government employment with pension benefits, job security, and statutory promotions to Deputy Tahsildar and Tahsildar cadres.",
      "degreesOrPosts": [
        "Village Administrative Officer (VAO) - Administrative Head of Revenue Village",
        "Junior Assistant (Non-Security & Security)",
        "Bill Collector Grade I",
        "Typist (Government Departments & Courts)",
        "Steno-Typist Grade III",
        "Junior Assistant in Forest Department / Highways / Commercial Taxes"
      ],
      "salaryOrStipend": "Pay Level 8 (\u20b919,500 \u2013 \u20b971,900) + DA + HRA + Medical Allowance (Starting gross approx \u20b928,000/month)",
      "careerAdvancement": "VAO promotes to Assistant, Revenue Inspector (RI), Deputy Tahsildar, and Tahsildar with executive magisterial powers.",
      "counsellingProcess": "Single-window departmental allocation counseling in TNPSC Office Chennai strictly based on OMR merit rank.",
      "statutoryQuotaBenefit": "20% horizontal reservation for students who studied Class 1 to 10 in Tamil Medium (PSTM)."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Village Administrative Officer (VAO)",
        "Junior Assistant",
        "Typist",
        "Bill Collector"
      ],
      "participatingBodies": "Revenue Administration, Rural Development, Treasuries, Judicial Courts, Registration Department",
      "selectionStepsAfterExam": [
        "1. Single Written Examination (200 Questions, 300 Marks).",
        "2. Publication of State-wide and Communal Rank List.",
        "3. Certificate Verification at District Headquarters.",
        "4. In-person Department and District Allocation Counselling."
      ],
      "expectedOutcome": "Permanent Tamil Nadu Government job appointment at village or taluk level.",
      "statutoryQuotaBenefit": "20% PSTM Tamil medium reservation and 69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Part A Tamil (100 Qs): Tamil Literature (Thirukkural, Silappathikaram, Manimekalai), Tamil Grammar (sandhi, ilakkanam, valiyurutthal), Tamil Scholars and Contributions (Bharathiyar, Bharathidasan, Thiru Vi Ka).",
        "Part B General Studies (75 Qs): Class 6 to 10 Samacheer Kalvi Science, History, Geography, Indian Constitution, Economy, Current Affairs.",
        "Part B Aptitude (25 Qs): Simplification, Percentage, HCF & LCM, Ratio, Simple & Compound Interest, Area, Volume, Time & Work, Logical Reasoning."
      ],
      "recommendedFocus": [
        "Tamil Nadu State Board Samacheer Kalvi 6th to 10th standard Tamil textbooks (highest weightage: 100 questions)",
        "Thirukkural and Tamil literature history",
        "Class 10 standard mental ability and aptitude arithmetic"
      ],
      "markingScheme": "200 Questions \u00d7 1.5 Marks = 300 Total Marks. Minimum qualifying mark in Tamil is 60 Marks (40%). Selection ranking considers all 300 marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNPSC Official Annual Calendar"
  },
  {
    "id": "tnpsc-cts",
    "title": "Tamil Nadu Public Service Commission Combined Technical Services Examination (TNPSC CTS)",
    "shortCode": "TNPSC CTS",
    "conductingAuthority": "Tamil Nadu Public Service Commission (TNPSC)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Diploma / Polytechnic",
      "Undergraduate",
      "Postgraduate"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Engineering",
      "Polytechnic",
      "Architecture",
      "Science"
    ],
    "purpose": "Consolidated state technical recruitment examination for engineers, geologists, and technical officers across Tamil Nadu Government Engineering Departments.",
    "whoCanApply": "Diploma or Engineering Degree holders in Civil, Mechanical, Electrical, Electronics, or Computer Engineering.",
    "minimumQualification": "Diploma or B.E. / B.Tech in relevant engineering discipline from a recognized board/university.",
    "eligibleStreams": [
      "Engineering & Technical Branches"
    ],
    "requiredSubjects": [
      "Engineering Domain Subject (Paper I)",
      "Tamil Eligibility & General Studies (Paper II)"
    ],
    "minimumMarks": "Pass in Engineering Degree / Diploma",
    "ageCriteria": "18 to 34 years for General; 18 to 39 years for Reserved categories (No upper limit for state service).",
    "ageMin": 18,
    "ageMax": 39,
    "reservationSummary": "69% communal reservation + 20% PSTM quota.",
    "examinationMode": "Computer Based Test (CBT) or OMR",
    "examFormatDescription": "Paper I: Domain Engineering (200 Questions, 300 Marks, 3 Hours). Paper II: Tamil Eligibility (100 Q, 150 M) + General Studies & Aptitude (100 Q, 150 M). Total 600 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 200,
    "feeReservedInr": 0,
    "feeDescription": "Examination Fee: \u20b9200. Free for SC/ST.",
    "hasFeeConcession": true,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online through TNPSC portal for CTS notification."
    ],
    "requiredDocuments": [
      "Engineering Degree / Diploma Certificate",
      "Community Certificate",
      "PSTM Certificate"
    ],
    "importantDates": {
      "applicationOpening": "August 2026",
      "applicationDeadline": "September 2026",
      "admitCardRelease": "November 2026",
      "examinationDate": "December 2026",
      "resultDeclaration": "February 2027",
      "counsellingOrInterview": "April 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tnpsc.gov.in/",
    "officialNotificationUrl": "https://www.tnpsc.gov.in/",
    "officialApplicationPortalUrl": "https://apply.tnpscexams.in/",
    "officialSyllabusUrl": "https://www.tnpsc.gov.in/English/syllabus.html",
    "opportunityProvided": {
      "summary": "Direct appointment as Assistant Engineer and Junior Technical Officer in State Engineering Departments.",
      "degreesOrPosts": [
        "Assistant Engineer (Civil) - PWD, Highways, Water Resources Department",
        "Assistant Engineer (Mechanical / Electrical) - TANGEDCO / TWAD Board",
        "Motor Vehicle Inspector Grade II (Transport Department)",
        "Junior Electrical Inspector",
        "Assistant Director of Industrial Safety & Health"
      ],
      "salaryOrStipend": "Pay Level 16 (\u20b936,900 \u2013 \u20b91,16,600) to Level 20 (\u20b956,100 \u2013 \u20b91,77,500)",
      "careerAdvancement": "Promotion to Executive Engineer (EE), Superintending Engineer (SE), and Chief Engineer.",
      "counsellingProcess": "Counseling at TNPSC Office Chennai based on combined CBT merit rank.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Engineer (Civil/Mech/EEE)",
        "Motor Vehicle Inspector"
      ],
      "participatingBodies": "Public Works Department (PWD), Highways, Transport, TWAD Board",
      "selectionStepsAfterExam": [
        "1. Domain CBT.",
        "2. Certificate Verification.",
        "3. Department Allocation Counselling."
      ],
      "expectedOutcome": "Permanent Government Engineer appointment with official authority.",
      "statutoryQuotaBenefit": "20% PSTM and 69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Core Engineering Branch Syllabus (GATE / Degree standard) + TN General Studies."
      ],
      "recommendedFocus": [
        "Structural Analysis, Surveying, Fluid Mechanics for Civil",
        "Machines & Power Systems for Electrical"
      ],
      "markingScheme": "Paper I: 300 Marks. Paper II: 300 Marks. Total: 600 Marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNPSC Statutory Planner"
  },
  {
    "id": "tnusrb-si",
    "title": "Tamil Nadu Uniformed Services Recruitment Board Sub-Inspector Examination (TNUSRB SI)",
    "shortCode": "TNUSRB SI",
    "conductingAuthority": "Tamil Nadu Uniformed Services Recruitment Board (TNUSRB)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Social Work",
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Other Recognised Courses"
    ],
    "purpose": "State-level recruitment of executive law enforcement officers across Taluk, Armed Reserve (AR), and Tamil Nadu Special Police (TSP) battalions.",
    "whoCanApply": "Graduates holding any Bachelor's degree with Tamil language qualification and required physical measurements.",
    "minimumQualification": "Any Bachelor's Degree from a university recognized by UGC. Must have studied Tamil as a subject in SSLC.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Tamil Language Eligibility",
      "General Knowledge",
      "Logical & Numerical Analysis"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "20 to 30 years for General; 20 to 32 years for BC/MBC; 20 to 35 years for SC/ST; 20 to 37 years for Destitute Widows.",
    "ageMin": 20,
    "ageMax": 37,
    "reservationSummary": "69% communal reservation + 20% PSTM + 20% Police Departmental Quota + 10% Sports Quota.",
    "examinationMode": "Pen-and-Paper (OMR) followed by Physical Tests (PMT / ET / PET)",
    "examFormatDescription": "Part I: Tamil Eligibility (100 Questions, 100 Marks, 40% qualifying). Part II: Main Written (140 Questions, 70 Marks). Physical Tests: PMT/ET qualifying, PET (15 Marks). Viva-Voce: 10 Marks. Total 100 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 500,
    "feeReservedInr": 500,
    "feeDescription": "Application Fee: \u20b9500 for all candidates paying online via TNUSRB portal.",
    "hasFeeConcession": false,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online at tnusrb.tn.gov.in with photo, signature, degree marksheet, and community certificate."
    ],
    "requiredDocuments": [
      "Degree Marksheet",
      "10th Marksheet",
      "Community Certificate",
      "PSTM Certificate",
      "Sports / NCC / NSS Certificates"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "August 2026",
      "examinationDate": "September 2026",
      "resultDeclaration": "November 2026",
      "counsellingOrInterview": "January 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tnusrb.tn.gov.in/",
    "officialNotificationUrl": "https://tnusrb.tn.gov.in/",
    "officialApplicationPortalUrl": "https://tnusrb.tn.gov.in/",
    "officialSyllabusUrl": "https://tnusrb.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Direct executive police officer appointment with armed authority, government quarters, and promotion pathway to Deputy Superintendent of Police (DSP).",
      "degreesOrPosts": [
        "Sub-Inspector of Police (Taluk) - Station House Officer",
        "Sub-Inspector of Police (Armed Reserve - AR)",
        "Sub-Inspector of Police (Tamil Nadu Special Police - TSP)"
      ],
      "salaryOrStipend": "Pay Level 13 (\u20b936,900 \u2013 \u20b91,16,600) + Uniform Allowance + Risk Allowance",
      "careerAdvancement": "Promotions to Inspector of Police, Deputy Superintendent of Police (DSP), and Additional SP.",
      "counsellingProcess": "Merit list based on Written (70) + PET (15) + Viva (10) + Special Marks (5).",
      "statutoryQuotaBenefit": "20% horizontal reservation for Tamil Medium (PSTM)."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Sub-Inspector of Police (Taluk / AR / TSP)"
      ],
      "participatingBodies": "Tamil Nadu Police Department, Home Department",
      "selectionStepsAfterExam": [
        "1. Written Exam.",
        "2. Physical Measurement & Endurance Run.",
        "3. Physical Efficiency Test.",
        "4. Viva-Voce Interview."
      ],
      "expectedOutcome": "Permanent Law Enforcement Officer career with official executive powers.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "General Science, History of India & TN, Indian Polity, Current Affairs, Logical Analysis, Numerical Reasoning."
      ],
      "recommendedFocus": [
        "Samacheer Kalvi GK",
        "Daily running conditioning (1500m / 400m) and rope climbing"
      ],
      "markingScheme": "Written: 70 Marks (140 questions of 0.5 mark). PET: 15 Marks. Viva: 10 Marks. Special: 5 Marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNUSRB Statutory Portal"
  },
  {
    "id": "tnusrb-constable",
    "title": "Tamil Nadu Uniformed Services Recruitment Board Police Constable Examination (TNUSRB PC)",
    "shortCode": "TNUSRB Constable",
    "conductingAuthority": "Tamil Nadu Uniformed Services Recruitment Board (TNUSRB)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10",
      "Class 11",
      "Class 12",
      "Diploma / Polytechnic",
      "ITI",
      "Undergraduate"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Polytechnic",
      "ITI",
      "Other Recognised Courses"
    ],
    "purpose": "Mass uniformed recruitment for Police Constables, Jail Warders, and Firemen across Tamil Nadu.",
    "whoCanApply": "Candidates who have passed Class 10 (SSLC) with Tamil language eligibility and physical endurance.",
    "minimumQualification": "Must have passed S.S.L.C. (Class 10) Public Examination.",
    "eligibleStreams": [
      "Pass in Class 10"
    ],
    "requiredSubjects": [
      "Tamil Eligibility",
      "General Knowledge",
      "Psychology / Mental Ability"
    ],
    "minimumMarks": "Pass in Class 10",
    "ageCriteria": "18 to 26 years for OC; 18 to 28 years for BC/MBC; 18 to 31 years for SC/ST; 18 to 37 years for Destitute Widows.",
    "ageMin": 18,
    "ageMax": 37,
    "reservationSummary": "69% communal reservation + 20% PSTM + 10% Sports Quota.",
    "examinationMode": "Pen-and-Paper (OMR) + Physical Efficiency Tests",
    "examFormatDescription": "Part I: Tamil Eligibility (80 Q, 80 M, qualifying 40%). Part II: Main Written (70 Q, 70 M - GK 45 M, Psychology 25 M). Physical Tests: 24 Marks. Special Marks: 5 Marks. Total 99 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 250,
    "feeReservedInr": 250,
    "feeDescription": "Application Fee: \u20b9250 online payment.",
    "hasFeeConcession": false,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on tnusrb.tn.gov.in during active registration window."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "Community Certificate",
      "PSTM Certificate",
      "NCC / NSS / Sports Certificate"
    ],
    "importantDates": {
      "applicationOpening": "August 2026",
      "applicationDeadline": "September 2026",
      "admitCardRelease": "November 2026",
      "examinationDate": "December 2026",
      "resultDeclaration": "February 2027",
      "counsellingOrInterview": "April 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tnusrb.tn.gov.in/",
    "officialNotificationUrl": "https://tnusrb.tn.gov.in/",
    "officialApplicationPortalUrl": "https://tnusrb.tn.gov.in/",
    "officialSyllabusUrl": "https://tnusrb.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Direct entry into law enforcement, fire rescue services, and prison administration with permanent job security and uniform pride.",
      "degreesOrPosts": [
        "Grade II Police Constable (Armed Reserve - AR)",
        "Grade II Police Constable (Tamil Nadu Special Police - TSP)",
        "Grade II Jail Warder (Tamil Nadu Prison Department)",
        "Fireman (Tamil Nadu Fire and Rescue Services)"
      ],
      "salaryOrStipend": "Pay Level 6 (\u20b918,200 \u2013 \u20b957,900) + Uniform Allowance + Ration Allowance",
      "careerAdvancement": "Promotions to Head Constable, Special Sub-Inspector (SSI), and Sub-Inspector.",
      "counsellingProcess": "Counseling based on combined Written (70) + PET (24) score.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Police Constable Grade II",
        "Jail Warder",
        "Fireman"
      ],
      "participatingBodies": "Tamil Nadu Police, Fire & Rescue Services, Prison Department",
      "selectionStepsAfterExam": [
        "1. Written Exam.",
        "2. Physical Test.",
        "3. Certificate Verification."
      ],
      "expectedOutcome": "Permanent uniformed state government appointment.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Samacheer Kalvi 6th to 10th standard Science, Social Science, Maths, Psychology."
      ],
      "recommendedFocus": [
        "Psychology section (25 Marks)",
        "Regular physical training"
      ],
      "markingScheme": "70 Questions = 70 Marks. Physical Tests = 24 Marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 80
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNUSRB Official Registry"
  },
  {
    "id": "trb-pg-assistant",
    "title": "Teachers Recruitment Board Direct Recruitment of Post Graduate Assistants (TRB PG Assistant)",
    "shortCode": "TRB PG Assistant",
    "conductingAuthority": "Teachers Recruitment Board (TRB), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level",
      "pg-research"
    ],
    "courseDisciplines": [
      "Education and Teaching",
      "Arts",
      "Science",
      "Commerce"
    ],
    "purpose": "Direct recruitment of postgraduate school teachers for Classes 11 and 12 in Tamil Nadu Higher Secondary Schools.",
    "whoCanApply": "Candidates with a Master's degree in relevant subject and B.Ed. degree.",
    "minimumQualification": "Post Graduate Degree in the relevant subject with at least 50% marks (45% for SC/ST) and Bachelor of Education (B.Ed.).",
    "eligibleStreams": [
      "Master degree in Tamil, English, Maths, Physics, Chemistry, Botany, Zoology, Commerce, Economics, History, Computer Science"
    ],
    "requiredSubjects": [
      "Domain Subject (110 Marks)",
      "Educational Methodology (30 Marks)",
      "General Knowledge (10 Marks)"
    ],
    "minimumMarks": "50% in PG Degree + B.Ed.",
    "ageCriteria": "Up to 50 years (55 years for SC/ST/BC/MBC).",
    "ageMin": 21,
    "ageMax": 55,
    "reservationSummary": "69% communal reservation + 20% PSTM + 4% PwD.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single paper of 150 Multiple Choice Questions (150 Marks, 3 Hours duration). Domain Subject: 110 Marks; Educational Methodology: 30 Marks; General Knowledge: 10 Marks. Followed by Certificate Verification.",
    "feeType": "Paid Application",
    "feeGeneralInr": 500,
    "feeReservedInr": 250,
    "feeDescription": "\u20b9500 for General/BC/MBC; \u20b9250 for SC/SCA/ST and Differently Abled.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for SC/ST/PwD.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on trb.tn.gov.in with PG degree, B.Ed. marksheet, and community certificate."
    ],
    "requiredDocuments": [
      "PG Degree Certificate",
      "B.Ed. Degree",
      "Community Certificate",
      "PSTM Certificate"
    ],
    "importantDates": {
      "applicationOpening": "July 2026",
      "applicationDeadline": "August 2026",
      "admitCardRelease": "October 2026",
      "examinationDate": "November 2026",
      "resultDeclaration": "January 2027",
      "counsellingOrInterview": "March 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://trb.tn.gov.in/",
    "officialNotificationUrl": "https://trb.tn.gov.in/",
    "officialApplicationPortalUrl": "https://trb.tn.gov.in/",
    "officialSyllabusUrl": "https://trb.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Permanent faculty appointment in government higher secondary schools shaping the future of Class 11 and 12 students across Tamil Nadu.",
      "degreesOrPosts": [
        "Post Graduate Assistant (Tamil, English, Mathematics, Physics, Chemistry, Biology, Commerce, Economics, History, Computer Science)",
        "Physical Director Grade I",
        "Computer Instructor Grade I"
      ],
      "salaryOrStipend": "Pay Level 18 (\u20b936,900 \u2013 \u20b91,16,600) + DA + HRA (Starting gross approx \u20b952,000/month)",
      "careerAdvancement": "Promotion to Higher Secondary School Headmaster (HM) and District Educational Officer (DEO).",
      "counsellingProcess": "Single-window district allocation counselling based on CBT marks.",
      "statutoryQuotaBenefit": "20% PSTM reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Post Graduate Assistant Teacher in Govt Schools"
      ],
      "participatingBodies": "Tamil Nadu School Education Department",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (150 Marks).",
        "2. Certificate Verification.",
        "3. School Posting Counselling."
      ],
      "expectedOutcome": "Permanent Government Teacher career with long-term tenure and summer vacations.",
      "statutoryQuotaBenefit": "20% PSTM quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "UGC PG standard domain syllabus + Educational Psychology & Pedagogy."
      ],
      "recommendedFocus": [
        "Core postgraduate syllabus concepts",
        "Educational psychology theorists (Piaget, Vygotsky, Bloom)"
      ],
      "markingScheme": "150 Questions = 150 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TRB Official Portal"
  },
  {
    "id": "tntet-exam",
    "title": "Tamil Nadu Teacher Eligibility Test (TNTET)",
    "shortCode": "TNTET",
    "conductingAuthority": "Teachers Recruitment Board (TRB), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Diploma / Polytechnic",
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Education and Teaching"
    ],
    "purpose": "Mandatory statutory eligibility examination under RTE Act 2009 for appointment as Primary (Classes 1-5) and Upper Primary (Classes 6-8) Teachers in Tamil Nadu schools.",
    "whoCanApply": "Candidates with D.El.Ed. (for Paper I) or Bachelor's Degree with B.Ed. (for Paper II).",
    "minimumQualification": "Paper I: Passed Higher Secondary (10+2) with at least 50% marks and 2-year Diploma in Elementary Education (D.El.Ed.). Paper II: Graduate with at least 50% marks and Bachelor in Education (B.Ed.).",
    "eligibleStreams": [
      "Education / Teaching Degrees"
    ],
    "requiredSubjects": [
      "Child Development and Pedagogy",
      "Language I (Tamil)",
      "Language II (English)",
      "Mathematics",
      "Environmental Studies / Science / Social Science"
    ],
    "minimumMarks": "60% (90 marks out of 150) for General; 55% (82.5 marks out of 150) for BC, MBC, SC, ST.",
    "ageCriteria": "Minimum 18 years. No upper age limit for TNTET eligibility.",
    "ageMin": 18,
    "ageMax": null,
    "reservationSummary": "Concessional qualifying marks (55% instead of 60%) for BC, MBC, SC, ST.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "150 Multiple Choice Questions (150 Marks, 3 Hours duration). No negative marking. Qualifying in nature with lifetime validity.",
    "feeType": "Paid Application",
    "feeGeneralInr": 500,
    "feeReservedInr": 250,
    "feeDescription": "\u20b9500 for General/BC/MBC; \u20b9250 for SC/ST and Differently Abled.",
    "hasFeeConcession": true,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on trb.tn.gov.in for Paper I, Paper II, or both."
    ],
    "requiredDocuments": [
      "D.El.Ed. / B.Ed. Marksheets",
      "Community Certificate",
      "10th Marksheet"
    ],
    "importantDates": {
      "applicationOpening": "March 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "July 2026",
      "examinationDate": "August 2026",
      "resultDeclaration": "October 2026",
      "counsellingOrInterview": "Certificate issuance upon passing",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://trb.tn.gov.in/",
    "officialNotificationUrl": "https://trb.tn.gov.in/",
    "officialApplicationPortalUrl": "https://trb.tn.gov.in/",
    "officialSyllabusUrl": "https://trb.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Mandatory lifetime statutory qualification unlocking eligibility for Secondary Grade Teacher (SGT) and Graduate Teacher (BT Assistant) recruitments in government, aided, and private schools.",
      "degreesOrPosts": [
        "Secondary Grade Teacher (Classes 1 to 5)",
        "Graduate Teacher / B.T. Assistant (Classes 6 to 8 in Tamil, English, Maths, Science, Social Science)"
      ],
      "salaryOrStipend": "Pay Level 10 (\u20b920,600 \u2013 \u20b975,900) for SGT; Level 16 (\u20b936,900 \u2013 \u20b91,16,600) for Graduate Teacher",
      "careerAdvancement": "Promotion to Middle School Headmaster and High School Headmaster.",
      "counsellingProcess": "Direct recruitment exams and counselling conducted by TRB for TNTET qualified candidates.",
      "statutoryQuotaBenefit": "Reservation relaxations apply in qualifying cut-offs."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Primary & Middle School Teacher in Tamil Nadu"
      ],
      "participatingBodies": "Department of Elementary Education, Samagra Shiksha",
      "selectionStepsAfterExam": [
        "1. Qualify TNTET.",
        "2. Appear for TRB Teacher Competitive Recruitment Exam.",
        "3. Certificate Verification."
      ],
      "expectedOutcome": "Mandatory lifetime teaching credential enabling permanent government school employment.",
      "statutoryQuotaBenefit": "55% qualifying score for reserved categories."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Child Pedagogy, Samacheer Kalvi 1st to 8th (Paper I) / 6th to 10th (Paper II) curricula."
      ],
      "recommendedFocus": [
        "Child Development theories",
        "Class 6 to 10 Mathematics and Science"
      ],
      "markingScheme": "150 Questions = 150 Marks. Pass: 90 marks (82 marks for reserved).",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TRB Statutory Portal"
  },
  {
    "id": "tn-set",
    "title": "Tamil Nadu State Eligibility Test for Assistant Professor (TN-SET)",
    "shortCode": "TN-SET",
    "conductingAuthority": "Manonmaniam Sundaranar University (Nodal Agency for Tamil Nadu Government)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Postgraduate",
      "Research / PhD",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level",
      "pg-research"
    ],
    "courseDisciplines": [
      "Research and PhD",
      "Education and Teaching",
      "Arts",
      "Science",
      "Commerce",
      "Management"
    ],
    "purpose": "State-level statutory eligibility test certifying candidates for Assistant Professor appointment across all Tamil Nadu universities and colleges.",
    "whoCanApply": "Candidates who have secured at least 55% marks in Master's degree (50% for reserved categories). Final year PG students are also eligible.",
    "minimumQualification": "Master's Degree with minimum 55% marks (50% for BC, BCM, MBC, SC, ST, PwD) from a UGC-recognized university.",
    "eligibleStreams": [
      "Postgraduate degrees across 43 academic subjects"
    ],
    "requiredSubjects": [
      "Paper I: Teaching & Research Aptitude",
      "Paper II: Core PG Subject"
    ],
    "minimumMarks": "55% in Master's Degree (50% for reserved)",
    "ageCriteria": "No upper age limit for TN-SET Assistant Professor eligibility.",
    "ageMin": 21,
    "ageMax": null,
    "reservationSummary": "69% Tamil Nadu communal reservation applied in qualifying slot distribution.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single session of 3 Hours (180 Minutes). Paper I: General Teaching & Research Aptitude (50 Questions, 100 Marks, 1 Hour). Paper II: Domain Subject (100 Questions, 200 Marks, 2 Hours). No negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 2500,
    "feeReservedInr": 800,
    "feeDescription": "\u20b92,500 for General; \u20b92,000 for BC/BCM/MBC; \u20b9800 for SC/ST/PwD/Third Gender.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Reduced fee for SC/ST/PwD.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on msutnset.com with PG marksheets, photo, and signature."
    ],
    "requiredDocuments": [
      "Postgraduate Degree Certificate",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "April 2026",
      "applicationDeadline": "May 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "June 2026",
      "resultDeclaration": "July 2026",
      "counsellingOrInterview": "Direct certificate issuance",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://trb1.ucanapply.com/apply_now",
    "officialNotificationUrl": "https://trb1.ucanapply.com/apply_now",
    "officialApplicationPortalUrl": "https://trb1.ucanapply.com/apply_now",
    "officialSyllabusUrl": "https://trb1.ucanapply.com/apply_now",
    "opportunityProvided": {
      "summary": "Mandatory lifetime statutory eligibility to be appointed as Assistant Professor across all 14 State Universities and 600+ Arts, Science & Engineering colleges in Tamil Nadu.",
      "degreesOrPosts": [
        "Assistant Professor in Tamil Nadu Government Arts & Science Colleges",
        "Assistant Professor in Government-Aided Colleges",
        "Assistant Professor in University Constituent Departments",
        "Exemption from University Ph.D. Entrance Examination (Direct Interview entry)"
      ],
      "salaryOrStipend": "UGC Academic Pay Level 10 (\u20b957,700 \u2013 \u20b91,82,400) + DA + HRA (Starting gross approx \u20b975,000/month)",
      "careerAdvancement": "Promotion to Associate Professor (Level 13A) and Professor (Level 14).",
      "counsellingProcess": "Direct application to TRB Assistant Professor recruitments and university interviews.",
      "statutoryQuotaBenefit": "69% communal reservation applied in qualifying slots."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Professor in Tamil Nadu Higher Education"
      ],
      "participatingBodies": "Teachers Recruitment Board (TRB), 14 Tamil Nadu Public Universities",
      "selectionStepsAfterExam": [
        "1. Qualify TN-SET.",
        "2. Receive Lifetime Certificate.",
        "3. Apply to TRB Assistant Professor recruitments."
      ],
      "expectedOutcome": "Lifetime statutory eligibility for college professorship.",
      "statutoryQuotaBenefit": "69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Paper I: Research Aptitude, ICT, Higher Education. Paper II: Master level domain curriculum."
      ],
      "recommendedFocus": [
        "Paper I high-scoring sections (Teaching Aptitude, Comprehension)",
        "Deep domain knowledge"
      ],
      "markingScheme": "150 Questions = 300 Marks. 2 marks per question.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "MSU Nodal Agency Registry"
  },
  {
    "id": "tn-mrb-recruitment",
    "title": "Medical Services Recruitment Board Assistant Surgeon & Healthcare Recruitment (TN MRB)",
    "shortCode": "TN MRB",
    "conductingAuthority": "Medical Services Recruitment Board (MRB), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Medical",
      "Dental",
      "Pharmacy",
      "Nursing",
      "Allied Health Sciences"
    ],
    "purpose": "Direct statutory recruitment of medical doctors, nurses, and pharmacists into Tamil Nadu Public Health and Medical Services.",
    "whoCanApply": "Holders of MBBS, BDS, B.Pharm, D.Pharm, or B.Sc Nursing registered with Tamil Nadu Medical / Nursing / Pharmacy Councils.",
    "minimumQualification": "MBBS Degree for Assistant Surgeon; B.Sc Nursing / GNM for Staff Nurse; B.Pharm / D.Pharm for Pharmacist.",
    "eligibleStreams": [
      "Medical, Dental, Nursing, and Pharmacy degrees"
    ],
    "requiredSubjects": [
      "Medical Science / Nursing Curriculum / Pharmacy Curriculum + Mandatory Tamil Eligibility"
    ],
    "minimumMarks": "Pass in relevant professional medical degree",
    "ageCriteria": "18 to 37 years for General; up to 42 years for SC/ST/BC/MBC.",
    "ageMin": 18,
    "ageMax": 42,
    "reservationSummary": "69% communal reservation + special incentive marks for COVID-19 pandemic service.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Paper I: Tamil Eligibility Test (50 Questions, 50 Marks, 1 Hour - Qualifying 40%). Paper II: Medical / Technical Subject (100 Questions, 100 Marks, 2 Hours). Total 100 Marks considered for merit selection. No interview.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 500,
    "feeDescription": "\u20b91,000 for General/BC/MBC; \u20b9500 for SC/ST and Differently Abled.",
    "hasFeeConcession": true,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on mrb.tn.gov.in with medical council registration details."
    ],
    "requiredDocuments": [
      "MBBS/Nursing/Pharmacy Degree",
      "Tamil Nadu Council Registration Certificate",
      "Community Certificate",
      "Internship Certificate"
    ],
    "importantDates": {
      "applicationOpening": "September 2026",
      "applicationDeadline": "October 2026",
      "admitCardRelease": "December 2026",
      "examinationDate": "January 2027",
      "resultDeclaration": "March 2027",
      "counsellingOrInterview": "May 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://mrb.tn.gov.in/",
    "officialNotificationUrl": "https://mrb.tn.gov.in/",
    "officialApplicationPortalUrl": "https://mrb.tn.gov.in/",
    "officialSyllabusUrl": "https://mrb.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Permanent appointment as Medical Officer / Assistant Surgeon in Primary Health Centres (PHCs), Government Taluk Hospitals, and Medical College Hospitals.",
      "degreesOrPosts": [
        "Assistant Surgeon (General / Specialty) in Tamil Nadu Medical Service",
        "Staff Nurse in Government Medical Institutions",
        "Pharmacist in Tamil Nadu Medical Subordinate Service",
        "Therapeutic Assistant / Physiotherapist"
      ],
      "salaryOrStipend": "Pay Level 22 (\u20b956,100 \u2013 \u20b92,05,700) for Assistant Surgeon; Level 10 (\u20b920,600 \u2013 \u20b975,900) for Pharmacist/Nurse",
      "careerAdvancement": "Promotion to Civil Surgeon, Senior Civil Surgeon, and Director of Public Health (DPH).",
      "counsellingProcess": "Single window counseling at MRB Chennai based on CBT merit score.",
      "statutoryQuotaBenefit": "Incentive service marks for serving in rural/tribal PHCs."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Surgeon (Doctor)",
        "Staff Nurse",
        "Government Pharmacist"
      ],
      "participatingBodies": "Tamil Nadu Health and Family Welfare Department",
      "selectionStepsAfterExam": [
        "1. Computer Based Test.",
        "2. Certificate Verification.",
        "3. Hospital Posting Counselling."
      ],
      "expectedOutcome": "Permanent government hospital medical career with gazetted status.",
      "statutoryQuotaBenefit": "69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NMC MBBS standard curriculum: Medicine, Surgery, Obstetrics & Gynaecology, Paediatrics, Community Medicine."
      ],
      "recommendedFocus": [
        "High-yield clinical medicine and preventive healthcare",
        "Tamil eligibility grammar"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "MRB Official Registry"
  },
  {
    "id": "tangedco-ae",
    "title": "TANGEDCO Assistant Engineer Direct Recruitment Examination",
    "shortCode": "TANGEDCO AE",
    "conductingAuthority": "Tamil Nadu Generation and Distribution Corporation (TANGEDCO / TNEB)",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Engineering"
    ],
    "purpose": "Statutory engineering officer recruitment for thermal, hydro power plants, sub-stations, and state electricity distribution circles.",
    "whoCanApply": "Engineering graduates in Electrical & Electronics (EEE), Civil, Mechanical, or Computer Science.",
    "minimumQualification": "Bachelor Degree in Engineering (B.E. / B.Tech.) in relevant branch from AICTE-approved institution.",
    "eligibleStreams": [
      "B.E./B.Tech in EEE, ECE, Civil, Mechanical, CSE/IT"
    ],
    "requiredSubjects": [
      "Engineering Mathematics (Part I)",
      "Basic Engineering & Sciences (Part II)",
      "Core Discipline Engineering (Part III)"
    ],
    "minimumMarks": "Pass in B.E. / B.Tech.",
    "ageCriteria": "18 to 32 years for General; 18 to 37 years for BC/MBC; 18 to 39 years for SC/ST.",
    "ageMin": 18,
    "ageMax": 39,
    "reservationSummary": "69% communal reservation + 20% PSTM quota.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single paper consisting of 100 Questions (100 Marks, 2 Hours). Part I: Engineering Mathematics (20 Q, 20 M). Part II: Basic Engineering & Sciences (20 Q, 20 M). Part III: Core Engineering (60 Q, 60 M). 1/3 negative marking applies.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 500,
    "feeDescription": "\u20b91,000 for OC/BC/MBC; \u20b9500 for SC/ST and Differently Abled.",
    "hasFeeConcession": true,
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on tangedco.gov.in during recruitment cycle."
    ],
    "requiredDocuments": [
      "B.E./B.Tech Degree Certificate",
      "Community Certificate",
      "PSTM Certificate"
    ],
    "importantDates": {
      "applicationOpening": "October 2026",
      "applicationDeadline": "November 2026",
      "admitCardRelease": "January 2027",
      "examinationDate": "February 2027",
      "resultDeclaration": "April 2027",
      "counsellingOrInterview": "June 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tangedco.org/en/tangedco/",
    "officialNotificationUrl": "https://www.tangedco.org/en/tangedco/",
    "officialApplicationPortalUrl": "https://www.tnebltd.gov.in/",
    "officialSyllabusUrl": "https://www.tangedco.org/en/tangedco/",
    "opportunityProvided": {
      "summary": "Direct appointment as Assistant Engineer in Tamil Nadu Power Generation and Transmission sectors with gazetted executive engineering powers.",
      "degreesOrPosts": [
        "Assistant Engineer (Electrical) - Sub-Stations, Grid Operation, Distribution",
        "Assistant Engineer (Mechanical) - Thermal & Gas Turbine Power Stations",
        "Assistant Engineer (Civil) - Hydro Electric Projects, Dam Safety, Substation Construction"
      ],
      "salaryOrStipend": "Pay Level 16 (\u20b939,800 \u2013 \u20b91,26,500) + DA + HRA (Starting gross approx \u20b956,000/month)",
      "careerAdvancement": "Promotion to Assistant Executive Engineer (AEE), Executive Engineer (EE), and Superintending Engineer (SE).",
      "counsellingProcess": "Merit rank based on CBT score followed by certificate verification and zone allocation.",
      "statutoryQuotaBenefit": "20% PSTM horizontal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Engineer in TANGEDCO / TANTRANSCO"
      ],
      "participatingBodies": "Tamil Nadu Electricity Board (TNEB)",
      "selectionStepsAfterExam": [
        "1. Online CBT Examination.",
        "2. Certificate Verification.",
        "3. Appointment Order."
      ],
      "expectedOutcome": "Permanent State Public Sector Engineering Officer appointment.",
      "statutoryQuotaBenefit": "20% PSTM and 69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Part I: Engineering Maths. Part II: Physics, Chemistry, Basic Electrical/Mechanical. Part III: Core Engineering Branch."
      ],
      "recommendedFocus": [
        "GATE level fundamental concepts",
        "Electrical machines, power systems, control systems for EEE"
      ],
      "markingScheme": "100 Questions = 100 Marks. 1/3 mark deducted for wrong answers.",
      "negativeMarking": "1/3 negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TANGEDCO Recruitment Cell"
  },
  {
    "id": "nmms-tamilnadu",
    "title": "National Means-cum-Merit Scholarship Scheme Examination (NMMS)",
    "shortCode": "NMMS TN",
    "conductingAuthority": "Directorate of Government Examinations (DGE), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Other Recognised Courses"
    ],
    "purpose": "State-administered national scholarship exam to award continuous 4-year financial support to meritorious rural and economically disadvantaged students from Class 9 to 12.",
    "whoCanApply": "Class 8 students studying in Tamil Nadu Government, Government-Aided, or Local Body schools with family income below \u20b93.5 Lakh.",
    "minimumQualification": "Class 8 students with at least 55% marks in Class 7 (50% for SC/ST).",
    "eligibleStreams": [
      "School Education (Classes 8 to 12)"
    ],
    "requiredSubjects": [
      "Mental Ability Test (MAT)",
      "Scholastic Aptitude Test (SAT)"
    ],
    "minimumMarks": "55% in Class 7 (50% for SC/ST)",
    "ageCriteria": "Enrolled in Class 8.",
    "ageMin": 12,
    "ageMax": 15,
    "reservationSummary": "Statutory communal reservation applied within the Tamil Nadu state quota.",
    "examinationMode": "Pen-and-Paper (OMR)",
    "examFormatDescription": "Part I: Mental Ability Test (MAT - 90 Questions, 90 Minutes). Part II: Scholastic Aptitude Test (SAT - 90 Questions in Science, Social Science, Maths, 90 Minutes). Total 180 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 50,
    "feeReservedInr": 50,
    "feeDescription": "Nominal examination fee of \u20b950 collected through the school headmaster.",
    "hasFeeConcession": false,
    "hasScholarship": true,
    "scholarshipDetails": "\u20b912,000 per year (\u20b91,000/month) for 4 consecutive years from Class 9 to Class 12 paid directly to bank account via DBT.",
    "applicationProcedure": [
      "Apply through School Headmaster via DGE portal."
    ],
    "requiredDocuments": [
      "Class 7 Marksheet",
      "Income Certificate (< \u20b93.5 LPA)",
      "Community Certificate",
      "Student Aadhaar & Bank Passbook"
    ],
    "importantDates": {
      "applicationOpening": "November 2025",
      "applicationDeadline": "December 2025",
      "admitCardRelease": "January 2026",
      "examinationDate": "February 2026",
      "resultDeclaration": "April 2026",
      "counsellingOrInterview": "Direct Bank Transfer on NSP Portal",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2025-2026"
    },
    "officialWebsiteUrl": "https://dge.tn.gov.in/",
    "officialNotificationUrl": "https://dge.tn.gov.in/",
    "officialApplicationPortalUrl": "https://scholarships.gov.in/",
    "officialSyllabusUrl": "https://dge.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Guaranteed 4-year financial scholarship of \u20b948,000 ensuring school retention and higher secondary education completion.",
      "degreesOrPosts": [
        "Annual Scholarship of \u20b912,000 per year for Classes 9, 10, 11, and 12"
      ],
      "salaryOrStipend": "\u20b91,000 per month (\u20b912,000/year) DBT grant",
      "careerAdvancement": "Eliminates financial dropout pressures; enables admission to top government higher secondary schools.",
      "counsellingProcess": "Merit list published by DGE; registration on National Scholarship Portal (NSP).",
      "statutoryQuotaBenefit": "State reservation quota applied."
    },
    "linkedOpportunities": {
      "opportunityType": "Scholarship / Cash Award",
      "targetProgrammesOrPosts": [
        "\u20b912,000/year Scholarship for Classes 9-12"
      ],
      "participatingBodies": "Ministry of Education & Tamil Nadu School Education Dept",
      "selectionStepsAfterExam": [
        "1. Written Exam.",
        "2. Merit Rank List.",
        "3. NSP DBT Activation."
      ],
      "expectedOutcome": "Continuous 4-year schooling financial stipend.",
      "statutoryQuotaBenefit": "Communal quota within state allocation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "MAT: Analogy, series, patterns. SAT: Class 7 and 8 Science, Social Science, Maths Samacheer Kalvi."
      ],
      "recommendedFocus": [
        "Samacheer Kalvi Class 7 & 8 textbooks",
        "Previous NMMS papers"
      ],
      "markingScheme": "180 Questions = 180 Marks. Minimum 40% qualifying (32% for SC/ST).",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DGE Tamil Nadu"
  },
  {
    "id": "trusts-exam",
    "title": "Tamil Nadu Rural Students Talent Search Examination (TRUSTS)",
    "shortCode": "TRUSTS",
    "conductingAuthority": "Directorate of Government Examinations (DGE), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Other Recognised Courses"
    ],
    "purpose": "State government talent search scholarship exam exclusively for rural students studying in Tamil Nadu government and aided high schools.",
    "whoCanApply": "Class 9 students studying in schools located in rural village panchayats with parental income below \u20b91 Lakh.",
    "minimumQualification": "Class 9 students with at least 50% marks in Class 8.",
    "eligibleStreams": [
      "Rural School Education"
    ],
    "requiredSubjects": [
      "Science, Mathematics, Social Science (Class 9 Samacheer Kalvi)"
    ],
    "minimumMarks": "50% in Class 8",
    "ageCriteria": "Enrolled in Class 9 in rural school.",
    "ageMin": 13,
    "ageMax": 16,
    "reservationSummary": "50 boys and 50 girls selected per revenue district (comprising BC, MBC, SC, ST quotas).",
    "examinationMode": "Pen-and-Paper (OMR)",
    "examFormatDescription": "Single paper consisting of 100 Multiple Choice Questions (100 Marks, 2 Hours). Science: 35 Marks; Mathematics: 25 Marks; Social Science: 40 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 10,
    "feeReservedInr": 10,
    "feeDescription": "Nominal application fee of \u20b910 collected by school headmaster.",
    "hasFeeConcession": false,
    "hasScholarship": true,
    "scholarshipDetails": "\u20b91,000 per year for 4 consecutive years from Class 9 to Class 12.",
    "applicationProcedure": [
      "Apply through Rural School Headmaster via DGE portal."
    ],
    "requiredDocuments": [
      "Income Certificate (< \u20b91 LPA)",
      "Rural School Study Certificate",
      "Community Certificate"
    ],
    "importantDates": {
      "applicationOpening": "August 2025",
      "applicationDeadline": "September 2025",
      "admitCardRelease": "October 2025",
      "examinationDate": "November 2025",
      "resultDeclaration": "January 2026",
      "counsellingOrInterview": "Direct bank transfer by District Educational Officer",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2025-2026"
    },
    "officialWebsiteUrl": "https://dge.tn.gov.in/",
    "officialNotificationUrl": "https://dge.tn.gov.in/",
    "officialApplicationPortalUrl": "https://dge.tn.gov.in/",
    "officialSyllabusUrl": "https://dge.tn.gov.in/",
    "opportunityProvided": {
      "summary": "State-recognized talent honor and 4-year financial scholarship exclusively for rural village school students across all 38 districts.",
      "degreesOrPosts": [
        "Annual State Talent Scholarship for Classes 9 to 12"
      ],
      "salaryOrStipend": "\u20b91,000 per year direct grant",
      "careerAdvancement": "Certificate of Merit awarded by Director of Government Examinations; high prestige in rural communities.",
      "counsellingProcess": "District-wise rank list selection (50 boys + 50 girls per district).",
      "statutoryQuotaBenefit": "Exclusively for rural panchayat school students."
    },
    "linkedOpportunities": {
      "opportunityType": "Scholarship / Cash Award",
      "targetProgrammesOrPosts": [
        "TRUSTS Scholarship (Class 9-12)"
      ],
      "participatingBodies": "DGE Tamil Nadu & School Education Dept",
      "selectionStepsAfterExam": [
        "1. OMR Test.",
        "2. District Selection List.",
        "3. Annual Grant Disbursal."
      ],
      "expectedOutcome": "State talent certification and 4-year scholarship.",
      "statutoryQuotaBenefit": "50% gender reservation (50 boys / 50 girls per district)."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 9 Samacheer Kalvi Science, Mathematics, and Social Science."
      ],
      "recommendedFocus": [
        "Science and Social Science textbook back questions",
        "Simple arithmetic"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DGE Tamil Nadu"
  },
  {
    "id": "dote-polytechnic",
    "title": "Directorate of Technical Education Polytechnic Diploma Admission Single Window",
    "shortCode": "DOTE Polytechnic",
    "conductingAuthority": "Directorate of Technical Education (DOTE), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10",
      "Class 11",
      "Class 12",
      "ITI"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Polytechnic",
      "Engineering"
    ],
    "purpose": "State-wide single window admission to 3-year engineering polytechnic diploma courses in 54 Government, 34 Aided, and 450+ Private Polytechnic Colleges.",
    "whoCanApply": "Class 10 pass students for 1st Year Diploma; Class 12 Vocational / Maths / ITI pass for 2nd Year Lateral Entry.",
    "minimumQualification": "Must have passed 10th Standard (SSLC) with Mathematics and Science.",
    "eligibleStreams": [
      "Pass in Class 10 or Class 12 / ITI for Lateral Entry"
    ],
    "requiredSubjects": [
      "Mathematics, Science in Class 10"
    ],
    "minimumMarks": "Pass in Class 10",
    "ageCriteria": "No upper age limit for polytechnic diploma admission.",
    "ageMin": 14,
    "ageMax": null,
    "reservationSummary": "69% communal reservation + special categories (differently abled, sports, ex-servicemen).",
    "examinationMode": "Merit-Based Single Window System (No separate entrance test)",
    "examFormatDescription": "Centralized single-window counselling based on normalized Class 10 Board examination marks (calculated out of 500).",
    "feeType": "Paid Application",
    "feeGeneralInr": 150,
    "feeReservedInr": 0,
    "feeDescription": "Application Fee: \u20b9150 for General/BC/MBC; 100% Free for SC/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "Government Polytechnic annual tuition fee is only \u20b92,162/year. Post-Matric Scholarship covers 100% fees for eligible students.",
    "applicationProcedure": [
      "Apply online on dte.tn.gov.in or polyadmission.in with Class 10 marksheet."
    ],
    "requiredDocuments": [
      "SSLC 10th Marksheet",
      "Community Certificate",
      "Transfer Certificate (TC)"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "Not applicable (Rank List in June 2026)",
      "examinationDate": "Online Single Window Counselling: June - July 2026",
      "resultDeclaration": "Seat Allotment published July 2026",
      "counsellingOrInterview": "Direct college admission reporting",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://dte.tn.gov.in/",
    "officialNotificationUrl": "https://dte.tn.gov.in/",
    "officialApplicationPortalUrl": "https://www.polyadmission.in/",
    "officialSyllabusUrl": "https://dte.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Hands-on 3-year technical diploma engineering education leading directly to industrial technician jobs or lateral entry admission into 2nd year B.E. / B.Tech.",
      "degreesOrPosts": [
        "Diploma in Mechanical Engineering",
        "Diploma in Electrical and Electronics Engineering (EEE)",
        "Diploma in Civil Engineering",
        "Diploma in Computer Engineering / Artificial Intelligence",
        "Diploma in Automobile / Mechatronics Engineering"
      ],
      "salaryOrStipend": "Technician roles: \u20b918,000 \u2013 \u20b932,000/month; Direct 2nd year B.E./B.Tech lateral entry eligibility.",
      "careerAdvancement": "Direct eligibility for B.E. Lateral Entry via TNEA counselling and SSC JE / RRB JE central government jobs.",
      "counsellingProcess": "Online single-window choice filling on polyadmission.in based on Class 10 marks.",
      "statutoryQuotaBenefit": "69% communal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "Diploma in Engineering (54 Govt & 34 Aided Colleges)"
      ],
      "participatingBodies": "Directorate of Technical Education (DOTE) Tamil Nadu",
      "selectionStepsAfterExam": [
        "1. Submit Class 10 Marks.",
        "2. Rank List Publication.",
        "3. Online College Choice Filling.",
        "4. Seat Allotment."
      ],
      "expectedOutcome": "Technical Diploma qualification opening engineering jobs and B.E. lateral entry.",
      "statutoryQuotaBenefit": "69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 10 State Board Mathematics, Science, and English."
      ],
      "recommendedFocus": [
        "Maximizing Class 10 total marks out of 500"
      ],
      "markingScheme": "Merit rank computed out of 500 marks based on Class 10 Board exam results.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DOTE Official Registry"
  },
  {
    "id": "tn-iti-selection",
    "title": "Directorate of Employment and Training ITI Craftsmen Training Scheme Admission",
    "shortCode": "TN ITI",
    "conductingAuthority": "Directorate of Employment and Training (DET), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 10",
      "ITI"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "ITI",
      "Polytechnic"
    ],
    "purpose": "State-level single window admission for trade certificates in 102 Government ITIs and 350+ Private Industrial Training Institutes.",
    "whoCanApply": "Candidates who have passed Class 8 (for specific trades) or Class 10 (SSLC).",
    "minimumQualification": "Must have passed Class 10 (SSLC) or Class 8 for non-engineering trades.",
    "eligibleStreams": [
      "Pass in Class 8 or Class 10"
    ],
    "requiredSubjects": [
      "General Schooling"
    ],
    "minimumMarks": "Pass in Class 10",
    "ageCriteria": "14 to 40 years as of 1st August (No upper age limit for women).",
    "ageMin": 14,
    "ageMax": 40,
    "reservationSummary": "69% communal reservation + 33.3% reservation for women candidates.",
    "examinationMode": "Merit-Based Single Window System",
    "examFormatDescription": "Selection based on normalized Class 10 examination marks with monthly government stipend.",
    "feeType": "Free Application",
    "feeGeneralInr": 0,
    "feeReservedInr": 0,
    "feeDescription": "100% Free Application on skilltraining.tn.gov.in. Free uniform, free bicycle, free bus pass, and \u20b9750/month stipend provided by Tamil Nadu Government.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "\u20b9750 per month government financial stipend + free laptop + free textbooks + free safety shoes.",
    "applicationProcedure": [
      "Apply online on skilltraining.tn.gov.in."
    ],
    "requiredDocuments": [
      "SSLC 10th Marksheet",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Single Window Counselling: July 2026",
      "resultDeclaration": "Seat Allotment in July 2026",
      "counsellingOrInterview": "Direct ITI Admission",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://skilltraining.tn.gov.in/",
    "officialNotificationUrl": "https://skilltraining.tn.gov.in/",
    "officialApplicationPortalUrl": "https://skilltraining.tn.gov.in/",
    "officialSyllabusUrl": "https://skilltraining.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Recognized National Trade Certificate (NTC) certified by NCVT Government of India, unlocking direct jobs in manufacturing, automotive, and railway workshops.",
      "degreesOrPosts": [
        "Electrician Trade (2 Years)",
        "Fitter Trade (2 Years)",
        "Machinist & Turner Trades",
        "Mechanic Motor Vehicle (MMV)",
        "Welder Trade (1 Year)",
        "Computer Operator & Programming Assistant (COPA)"
      ],
      "salaryOrStipend": "\u20b915,000 \u2013 \u20b928,000/month starting salary in industrial plants (Hyundai, TVS, Saint-Gobain, L&T, ICF Chennai).",
      "careerAdvancement": "Direct eligibility for Railway Technician, Electricity Board Wireman, and lateral entry into 2nd year Diploma.",
      "counsellingProcess": "Merit counselling on skilltraining.tn.gov.in.",
      "statutoryQuotaBenefit": "33.3% seats reserved for women."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "National Trade Certificate (NTC) in 102 Govt ITIs"
      ],
      "participatingBodies": "Directorate of Employment and Training (DET) & NCVT",
      "selectionStepsAfterExam": [
        "1. Submit 10th Marks.",
        "2. Merit Rank List.",
        "3. Trade & ITI Choice Allotment."
      ],
      "expectedOutcome": "NCVT National Trade Certificate with 100% campus placement support.",
      "statutoryQuotaBenefit": "69% communal quota + free government benefits."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Basic Mathematics, Science, and Workshop Calculation."
      ],
      "recommendedFocus": [
        "Class 10 science and arithmetic"
      ],
      "markingScheme": "Merit score computed from Class 10 marks.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DET Tamil Nadu Portal"
  },
  {
    "id": "tnea-merit",
    "title": "Tamil Nadu Engineering Admissions Single Window Counselling (TNEA)",
    "shortCode": "TNEA",
    "conductingAuthority": "Directorate of Technical Education (DOTE) / Anna University Chennai",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12",
      "Diploma / Polytechnic"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Engineering"
    ],
    "purpose": "State-wide single window counselling for admission to B.E. / B.Tech. degree programmes in 500+ Anna University constituent, government, aided, and autonomous engineering colleges.",
    "whoCanApply": "Higher Secondary (10+2) students with Mathematics, Physics, and Chemistry.",
    "minimumQualification": "Passed 10+2 examination with Physics, Chemistry, and Mathematics. Minimum aggregate marks: 45% for General, 40% for BC, BCM, MBC, SC, SCA, ST.",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Mathematics (100 Marks)",
      "Physics (50 Marks)",
      "Chemistry (50 Marks)"
    ],
    "minimumMarks": "45% for OC; 40% for BC/BCM/MBC/SC/ST",
    "ageCriteria": "No upper age limit for TNEA.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "69% communal reservation + 7.5% preferential horizontal reservation for Tamil Nadu Government school students + Special reservation for Sports, Ex-servicemen, and Differently Abled.",
    "examinationMode": "Merit-Based Single Window System (No entrance exam - Cutoff out of 200)",
    "examFormatDescription": "Centralized online counselling calculated using normalized Class 12 Board exam marks out of 200: Maths (100) + Physics (50) + Chemistry (50).",
    "feeType": "Paid Application",
    "feeGeneralInr": 500,
    "feeReservedInr": 250,
    "feeDescription": "\u20b9500 for OC/BC/BCM/MBC; \u20b9250 for SC/SCA/ST candidates.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "7.5% Government School Quota students receive 100% full tuition fee, hostel fee, and examination fee waiver paid directly by TN Government. First Graduate concession gives \u20b925,000/year waiver.",
    "applicationProcedure": [
      "1. Register online on tneaonline.org with Class 12 registration number and marks.",
      "2. Upload documents for certificate verification at online TFC centres.",
      "3. Download TNEA General Rank and Category Rank.",
      "4. Participate in round-wise choice filling based on cutoff rank.",
      "5. Receive provisional seat allotment and confirm seat."
    ],
    "requiredDocuments": [
      "HSC 12th Marksheet",
      "SSLC 10th Marksheet",
      "Permanent Community Certificate",
      "Transfer Certificate (TC)",
      "Bonafide Certificate (Proof of Class 6 to 12 study in TN Govt school for 7.5% quota)",
      "First Graduate Certificate (if claiming \u20b925,000 concession)"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "Not applicable (Random Number & Rank in June 2026)",
      "examinationDate": "Online Counselling: July - August 2026",
      "resultDeclaration": "Round-wise seat allotment published July - August 2026",
      "counsellingOrInterview": "Direct college admission reporting",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tneaonline.org/",
    "officialNotificationUrl": "https://www.tneaonline.org/",
    "officialApplicationPortalUrl": "https://www.tneaonline.org/",
    "officialSyllabusUrl": "https://www.tneaonline.org/",
    "opportunityProvided": {
      "summary": "Direct admission into top engineering colleges across Tamil Nadu including College of Engineering Guindy (CEG), MIT Chromepet, ACTech, PSG Tech, CIT, and Thiagarajar College of Engineering.",
      "degreesOrPosts": [
        "B.E. Computer Science and Engineering (CSE)",
        "B.Tech. Artificial Intelligence and Data Science (AI & DS)",
        "B.E. Electronics and Communication Engineering (ECE)",
        "B.E. Mechanical Engineering / Electrical and Electronics",
        "B.Tech. Information Technology / Biotechnology / Chemical"
      ],
      "salaryOrStipend": "Engineering graduate starting campus packages: \u20b94.5 LPA to \u20b944 LPA (Top IT, product, and core companies).",
      "careerAdvancement": "Direct pathway to global software engineering careers, PSU recruitments through GATE, and international Master's studies.",
      "counsellingProcess": "Four-round online counselling on tneaonline.org strictly based on normalized 200 cutoff score.",
      "statutoryQuotaBenefit": "7.5% seats reserved for Tamil Nadu Government school students with 100% full fee waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.E. / B.Tech. in 500+ Engineering Colleges statewide"
      ],
      "participatingBodies": "Anna University Chennai and Directorate of Technical Education (DOTE)",
      "selectionStepsAfterExam": [
        "1. Online Application with Class 12 PCM marks.",
        "2. Rank list calculation (Cut-off out of 200).",
        "3. Four rounds of online choice filling.",
        "4. Provisional seat allotment and admission."
      ],
      "expectedOutcome": "Admission to government or top autonomous engineering degree programs.",
      "statutoryQuotaBenefit": "7.5% Govt School Quota with 100% fee waiver and 69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Tamil Nadu State Board Higher Secondary Class 12 Mathematics, Physics, and Chemistry."
      ],
      "recommendedFocus": [
        "Scoring maximum marks in Class 12 Board examinations (Maths: 100, Physics: 50, Chemistry: 50)"
      ],
      "markingScheme": "Engineering Cutoff = Mathematics + (Physics / 2) + (Chemistry / 2) = Out of 200.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DOTE TNEA Official Portal"
  },
  {
    "id": "tn-paramedical-selection",
    "title": "Tamil Nadu Paramedical Degree & Diploma Admissions Single Window (DME)",
    "shortCode": "TN Paramedical",
    "conductingAuthority": "Selection Committee, Directorate of Medical Education (DME), Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Pharmacy",
      "Nursing",
      "Allied Health Sciences"
    ],
    "purpose": "State single window counselling for professional paramedical, pharmacy, and nursing degree courses in 36 Government Medical Colleges and self-financing institutions.",
    "whoCanApply": "Class 12 Science stream students with Biology / Botany & Zoology, Physics, and Chemistry.",
    "minimumQualification": "Passed Class 12 with Physics, Chemistry, Biology / Botany & Zoology. Minimum 45% aggregate (40% for BC/MBC/SC/ST).",
    "eligibleStreams": [
      "Class 12 Science (PCB)"
    ],
    "requiredSubjects": [
      "Biology, Physics, Chemistry in Class 12"
    ],
    "minimumMarks": "45% for General; 40% for Reserved",
    "ageCriteria": "Minimum 17 years as of 31st December.",
    "ageMin": 17,
    "ageMax": null,
    "reservationSummary": "69% communal reservation + 7.5% horizontal reservation for TN Government school students.",
    "examinationMode": "Merit-Based Single Window System (No entrance test - Cutoff out of 200)",
    "examFormatDescription": "Online centralized single-window counselling computed from Class 12 normalized marks in Biology (100) + Physics (50) + Chemistry (50) = 200 Cutoff score.",
    "feeType": "Paid Application",
    "feeGeneralInr": 500,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9500 for OC/BC/MBC; 100% Free for SC/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "Government College annual tuition fee is only \u20b93,000 \u2013 \u20b95,000/year. 7.5% Govt School Quota candidates receive 100% full fee waiver.",
    "applicationProcedure": [
      "Apply online on tnmedicalselection.net."
    ],
    "requiredDocuments": [
      "Class 12 Marksheet",
      "Community Certificate",
      "Nativity Certificate",
      "7.5% Bonafide Certificate"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Online Counselling: August 2026",
      "resultDeclaration": "Seat Allotment published August 2026",
      "counsellingOrInterview": "Direct Medical College admission",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tnmedicalselection.net/",
    "officialNotificationUrl": "https://tnmedicalselection.net/",
    "officialApplicationPortalUrl": "https://tnmedicalselection.net/",
    "officialSyllabusUrl": "https://tnmedicalselection.net/",
    "opportunityProvided": {
      "summary": "Direct admission into professional healthcare degrees in premier government medical institutions (Madras Medical College, Stanley, Kilpauk, Madurai, Coimbatore).",
      "degreesOrPosts": [
        "B.Pharm (Bachelor of Pharmacy - 4 Years)",
        "B.Sc Nursing (4 Years)",
        "BPT (Bachelor of Physiotherapy - 4.5 Years)",
        "BOT (Bachelor of Occupational Therapy - 4.5 Years)",
        "B.Sc Medical Laboratory Technology (MLT)",
        "B.Sc Radiography & Imaging Technology / Cardiac Technology"
      ],
      "salaryOrStipend": "Clinical positions: \u20b925,000 \u2013 \u20b955,000/month; High domestic and international demand in UK, Gulf, and Europe.",
      "careerAdvancement": "Eligibility for Chief Pharmacist, Senior Physiotherapist, and Hospital Administrative cadres.",
      "counsellingProcess": "Single-window online counselling on tnmedicalselection.net.",
      "statutoryQuotaBenefit": "7.5% Government school quota with complete fee waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Pharm, B.Sc Nursing, BPT across 36 Govt Medical Colleges"
      ],
      "participatingBodies": "Directorate of Medical Education (DME) Selection Committee",
      "selectionStepsAfterExam": [
        "1. Submit Class 12 PCB marks.",
        "2. Cutoff Rank List.",
        "3. Online Counselling Choice Filling.",
        "4. Allotment."
      ],
      "expectedOutcome": "Professional healthcare degree admission at subsidized government rates.",
      "statutoryQuotaBenefit": "7.5% Govt School Quota with 100% fee waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 12 Higher Secondary Biology (Botany/Zoology), Physics, and Chemistry."
      ],
      "recommendedFocus": [
        "Maximizing Class 12 Biology and Physics/Chemistry marks"
      ],
      "markingScheme": "Cutoff calculated out of 200 = Biology (100) + Physics (50) + Chemistry (50).",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "DME Selection Committee"
  },
  {
    "id": "tngasa-merit",
    "title": "Tamil Nadu Government Arts and Science Colleges Admissions (TNGASA)",
    "shortCode": "TNGASA",
    "conductingAuthority": "Directorate of Collegiate Education (DCE), Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Arts",
      "Science",
      "Commerce",
      "Management",
      "Computer Applications",
      "Social Work"
    ],
    "purpose": "State single window admission to undergraduate arts, science, commerce, and computer application degrees in 164 Government Arts and Science Colleges across Tamil Nadu.",
    "whoCanApply": "Class 12 pass students across Arts, Science, Commerce, and Vocational streams.",
    "minimumQualification": "Must have passed Higher Secondary (10+2) examination.",
    "eligibleStreams": [
      "Any Class 12 Stream (Science, Commerce, Arts)"
    ],
    "requiredSubjects": [
      "Relevant 4 core subjects in Class 12 (out of 400 marks)"
    ],
    "minimumMarks": "Pass in Class 12",
    "ageCriteria": "No upper age limit for undergraduate admissions.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "69% communal reservation + special categories.",
    "examinationMode": "Merit-Based Single Window System (No entrance test)",
    "examFormatDescription": "Centralized online single-window counselling based on Class 12 marks in core 4 subjects (out of 400).",
    "feeType": "Paid Application",
    "feeGeneralInr": 50,
    "feeReservedInr": 2,
    "feeDescription": "Application Fee: \u20b950 for General/BC/MBC; \u20b92 registration fee for SC/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "Government College annual tuition fee is only \u20b91,500 \u2013 \u20b92,500/year. Pudhumai Penn scheme gives \u20b91,000/month to female students; Tamil Pudhalvan scheme gives \u20b91,000/month to male students.",
    "applicationProcedure": [
      "Apply online on tngasa.in selecting preferred colleges and degree courses."
    ],
    "requiredDocuments": [
      "12th Marksheet",
      "10th Marksheet",
      "Community Certificate",
      "TC"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Single Window Counselling: June - July 2026",
      "resultDeclaration": "Seat Allotment in July 2026",
      "counsellingOrInterview": "Direct College Admission",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tndce.tn.gov.in/",
    "officialNotificationUrl": "https://tndce.tn.gov.in/",
    "officialApplicationPortalUrl": "https://tndce.tn.gov.in/",
    "officialSyllabusUrl": "https://tndce.tn.gov.in/",
    "opportunityProvided": {
      "summary": "Affordable higher education in 164 Government Arts & Science Colleges with government financial support of \u20b91,000/month for every student.",
      "degreesOrPosts": [
        "B.Com. (General, Corporate Secretaryship, Accounting & Finance)",
        "B.Sc. (Computer Science, Mathematics, Physics, Chemistry, Data Science)",
        "B.C.A. (Bachelor of Computer Applications)",
        "B.B.A. (Bachelor of Business Administration)",
        "B.A. (Tamil, English, Economics, History, Political Science)"
      ],
      "salaryOrStipend": "\u20b91,000/month student incentive via Pudhumai Penn / Tamil Pudhalvan DBT schemes.",
      "careerAdvancement": "Foundation for TNPSC Group 1/2/4, banking examinations, and university Master's degrees.",
      "counsellingProcess": "Merit rank list and choice filling on tngasa.in.",
      "statutoryQuotaBenefit": "69% communal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.A., B.Sc., B.Com., BCA in 164 Govt Arts & Science Colleges"
      ],
      "participatingBodies": "Directorate of Collegiate Education (DCE) Tamil Nadu",
      "selectionStepsAfterExam": [
        "1. Online Application.",
        "2. Merit Rank List.",
        "3. College Allotment."
      ],
      "expectedOutcome": "Subsidized undergraduate degree admission.",
      "statutoryQuotaBenefit": "69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Higher Secondary Class 12 Board exam subjects."
      ],
      "recommendedFocus": [
        "Scoring maximum marks in core 4 subjects (out of 400)"
      ],
      "markingScheme": "Merit computed out of 400 marks from core subjects.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNGASA Official Portal"
  },
  {
    "id": "tnau-admission",
    "title": "Tamil Nadu Agricultural University Undergraduate Admission Single Window (TNAU Counselling)",
    "shortCode": "TNAU Single Window",
    "conductingAuthority": "Tamil Nadu Agricultural University (TNAU), Coimbatore",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Agriculture",
      "Engineering",
      "Science"
    ],
    "purpose": "State single window counselling for premier ICAR-accredited agricultural, horticultural, forestry, and agricultural engineering degree programmes.",
    "whoCanApply": "Higher Secondary (10+2) students with Physics, Chemistry, Biology / Mathematics / Agricultural Science.",
    "minimumQualification": "Passed Class 12 with Physics, Chemistry, Biology/Mathematics. Minimum 55% marks (pass for SC/ST).",
    "eligibleStreams": [
      "Class 12 Science (PCB / PCM / Agri)"
    ],
    "requiredSubjects": [
      "Physics, Chemistry, Biology / Mathematics / Agricultural Practices"
    ],
    "minimumMarks": "55% for General/BC/MBC; Pass for SC/ST",
    "ageCriteria": "Maximum 21 years as of 1st July (No age limit for SC/ST).",
    "ageMin": 16,
    "ageMax": 21,
    "reservationSummary": "69% communal reservation + 7.5% preferential quota for Tamil Nadu Government school students + Special reservations.",
    "examinationMode": "Merit-Based Single Window System (No entrance test)",
    "examFormatDescription": "Single-window online counselling based on normalized Class 12 marks in Physics, Chemistry, and Biology/Maths (Cutoff score out of 200).",
    "feeType": "Paid Application",
    "feeGeneralInr": 600,
    "feeReservedInr": 300,
    "feeDescription": "\u20b9600 for OC/BC/MBC; \u20b9300 for SC/SCA/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "7.5% Government School Quota students receive 100% full tuition, hostel, and exam fee waiver paid by TN Government.",
    "applicationProcedure": [
      "Apply online on tnagfi.ucanapply.com."
    ],
    "requiredDocuments": [
      "12th Marksheet",
      "Community Certificate",
      "7.5% Bonafide Certificate",
      "Nativity Certificate"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Online Single Window Counselling: July 2026",
      "resultDeclaration": "Seat Allotment published July 2026",
      "counsellingOrInterview": "Verification at TNAU Coimbatore",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tnau.ac.in/admissions/",
    "officialNotificationUrl": "https://tnau.ac.in/admissions/",
    "officialApplicationPortalUrl": "https://tnau.ucanapply.com/",
    "officialSyllabusUrl": "https://tnau.ac.in/admissions/",
    "opportunityProvided": {
      "summary": "Admission to premier ICAR-accredited agricultural degree programmes directly unlocking eligibility for Agricultural Officer (AO) recruitment by TNPSC and banking Agricultural Field Officer (AFO) posts.",
      "degreesOrPosts": [
        "B.Sc. (Hons.) Agriculture (14 Constituent & 28 Affiliated Colleges)",
        "B.Sc. (Hons.) Horticulture",
        "B.Sc. (Hons.) Forestry",
        "B.Sc. (Hons.) Sericulture",
        "B.Tech. Agricultural Engineering",
        "B.Tech. Food Technology & Biotechnology"
      ],
      "salaryOrStipend": "Starting salary as Agricultural Officer / AFO: \u20b945,000 \u2013 \u20b985,000/month.",
      "careerAdvancement": "Direct recruitment route to Assistant Director of Agriculture, ICAR Scientist, and agribusiness managers.",
      "counsellingProcess": "Online choice filling and seat allotment conducted by TNAU Coimbatore.",
      "statutoryQuotaBenefit": "7.5% Government school quota with 100% fee waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Sc. (Hons) Agriculture in 14 TNAU Constituent Colleges"
      ],
      "participatingBodies": "Tamil Nadu Agricultural University (TNAU) Coimbatore",
      "selectionStepsAfterExam": [
        "1. Submit Class 12 Marks.",
        "2. Cut-off Rank List.",
        "3. Online Counselling Choice Filling.",
        "4. Verification."
      ],
      "expectedOutcome": "ICAR-accredited agricultural degree admission.",
      "statutoryQuotaBenefit": "7.5% Govt School Quota with 100% fee waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 12 Higher Secondary Biology, Physics, Chemistry, and Mathematics."
      ],
      "recommendedFocus": [
        "Class 12 core science marks"
      ],
      "markingScheme": "Cutoff calculated out of 200 marks from Class 12 Board exam.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNAU Official Registry"
  },
  {
    "id": "tanuvas-bvsc",
    "title": "Tamil Nadu Veterinary and Animal Sciences University Admission (TANUVAS Single Window)",
    "shortCode": "TANUVAS BVSc",
    "conductingAuthority": "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS), Chennai",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Veterinary Science",
      "Medical"
    ],
    "purpose": "State single window admission to professional veterinary surgeon degree programmes (B.V.Sc & A.H.) across Madras Veterinary College and constituent veterinary colleges.",
    "whoCanApply": "Class 12 Science stream students with Physics, Chemistry, and Biology / Botany & Zoology.",
    "minimumQualification": "Passed Class 12 with Physics, Chemistry, and Biology. Minimum 60% aggregate (55% for BC/MBC, pass for SC/ST).",
    "eligibleStreams": [
      "Class 12 Science (PCB)"
    ],
    "requiredSubjects": [
      "Biology, Physics, Chemistry in Class 12"
    ],
    "minimumMarks": "60% for General; 55% for BC/MBC; Pass for SC/ST",
    "ageCriteria": "17 to 21 years as of 31st December (No upper age limit for SC/ST).",
    "ageMin": 17,
    "ageMax": 21,
    "reservationSummary": "69% communal reservation + 7.5% Tamil Nadu Government school students quota + 15% VCI All India Quota.",
    "examinationMode": "Merit-Based Single Window System (No entrance test)",
    "examFormatDescription": "Single-window admission counselling based on normalized Class 12 marks in Physics, Chemistry, and Biology (Cutoff calculated out of 200 marks).",
    "feeType": "Paid Application",
    "feeGeneralInr": 700,
    "feeReservedInr": 350,
    "feeDescription": "\u20b9700 for OC/BC/MBC; \u20b9350 for SC/SCA/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "7.5% Government school quota students receive 100% full tuition, hostel, and exam fee waiver.",
    "applicationProcedure": [
      "Apply online on adm.tanuvas.ac.in."
    ],
    "requiredDocuments": [
      "12th Marksheet",
      "Community Certificate",
      "7.5% Bonafide Certificate",
      "Nativity Certificate"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Single Window Counselling: August 2026",
      "resultDeclaration": "Seat Allotment published August 2026",
      "counsellingOrInterview": "In-person verification at Madras Veterinary College, Vepery, Chennai",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tanuvas.ac.in/",
    "officialNotificationUrl": "https://tanuvas.ac.in/",
    "officialApplicationPortalUrl": "https://adm.tanuvas.ac.in/",
    "officialSyllabusUrl": "https://tanuvas.ac.in/",
    "opportunityProvided": {
      "summary": "Direct admission to prestigious veterinary surgical and animal husbandry degrees, directly qualifying graduates as Veterinary Assistant Surgeons (VAS) in TN Animal Husbandry Dept.",
      "degreesOrPosts": [
        "B.V.Sc. & A.H. (Bachelor of Veterinary Science & Animal Husbandry - 5.5 Years with Internship)",
        "B.Tech. Food Technology (4 Years - Koduvalli)",
        "B.Tech. Poultry Technology (4 Years - Hosur)",
        "B.Tech. Dairy Technology (4 Years - Chettinad)"
      ],
      "salaryOrStipend": "Veterinary Assistant Surgeon starting salary: Level 22 (\u20b956,100 \u2013 \u20b92,05,700/month).",
      "careerAdvancement": "Promotions to Assistant Director of Animal Husbandry, Clinical Veterinary Specialist, and Wildlife Veterinarian.",
      "counsellingProcess": "Single window counseling at Madras Veterinary College Chennai.",
      "statutoryQuotaBenefit": "7.5% Government school quota with 100% fee waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.V.Sc. & A.H. at Madras Veterinary College, Namakkal, Tirunelveli, Theni"
      ],
      "participatingBodies": "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS)",
      "selectionStepsAfterExam": [
        "1. Submit Class 12 Marks.",
        "2. Cut-off Rank List.",
        "3. Single Window Counselling.",
        "4. Admission."
      ],
      "expectedOutcome": "Veterinary Surgeon degree admission with gazetted appointment prospects.",
      "statutoryQuotaBenefit": "7.5% Govt School Quota with 100% fee waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 12 Higher Secondary Biology (Botany & Zoology), Physics, and Chemistry."
      ],
      "recommendedFocus": [
        "Maximizing Class 12 Biology and Physics/Chemistry marks"
      ],
      "markingScheme": "Cutoff calculated out of 200 marks from Class 12 Board exam.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TANUVAS Official Registry"
  },
  {
    "id": "tndalu-law",
    "title": "Tamil Nadu Dr. Ambedkar Law University 5-Year Honours Law Admission (TNDALU SOEL)",
    "shortCode": "TNDALU Law",
    "conductingAuthority": "The Tamil Nadu Dr. Ambedkar Law University (TNDALU), Chennai",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "state-level"
    ],
    "courseDisciplines": [
      "Law"
    ],
    "purpose": "State single window counselling for premier 5-year integrated Honours law degrees in School of Excellence in Law (SOEL) and 14 Affiliated Government Law Colleges.",
    "whoCanApply": "Higher Secondary (10+2) pass students across any stream (Science, Commerce, Arts).",
    "minimumQualification": "Passed Class 12 with at least 70% marks for SOEL (60% for SC/ST); 45% for Affiliated Govt Law Colleges (40% for SC/ST).",
    "eligibleStreams": [
      "Any Class 12 Stream"
    ],
    "requiredSubjects": [
      "Class 12 4 core subjects"
    ],
    "minimumMarks": "70% for SOEL Honours; 45% for Affiliated Law Colleges",
    "ageCriteria": "No upper age limit per Bar Council of India guidelines.",
    "ageMin": 17,
    "ageMax": null,
    "reservationSummary": "69% communal reservation + 4% PwD + 7.5% Govt school students reservation.",
    "examinationMode": "Merit-Based Single Window System (No separate entrance test)",
    "examFormatDescription": "Single-window online counselling based on normalized Class 12 marks in core 4 subjects (computed out of 100 percentage score).",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 500,
    "feeDescription": "\u20b91,000 for General; \u20b9500 for SC/ST.",
    "hasFeeConcession": true,
    "hasScholarship": true,
    "scholarshipDetails": "Government Law Colleges annual tuition fee is nominal (\u20b91,500 \u2013 \u20b93,000/year).",
    "applicationProcedure": [
      "Apply online on tndalu.ac.in."
    ],
    "requiredDocuments": [
      "12th Marksheet",
      "Community Certificate",
      "Transfer Certificate"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "Not applicable",
      "examinationDate": "Online Single Window Counselling: August 2026",
      "resultDeclaration": "Seat Allotment published August 2026",
      "counsellingOrInterview": "Direct admission reporting",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://tndalu.ac.in/",
    "officialNotificationUrl": "https://tndalu.ac.in/",
    "officialApplicationPortalUrl": "https://tndalu.ac.in/",
    "officialSyllabusUrl": "https://tndalu.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to recognized 5-year integrated law degrees qualifying graduates to enrol as Advocates with the Bar Council of Tamil Nadu & Puducherry and appear for Civil Judge recruitment.",
      "degreesOrPosts": [
        "B.A. LL.B. (Hons.) - School of Excellence in Law (SOEL) Chennai",
        "B.B.A. LL.B. (Hons.) - SOEL",
        "B.Com. LL.B. (Hons.) - SOEL",
        "B.C.A. LL.B. (Hons.) - SOEL",
        "B.A. LL.B. in 14 Affiliated Government Law Colleges (Madurai, Trichy, Coimbatore, Tirunelveli, Chengalpattu)"
      ],
      "salaryOrStipend": "Civil Judge starting salary: \u20b977,840 \u2013 \u20b91,36,520/month; Corporate legal counsel: \u20b96 \u2013 \u20b918 LPA.",
      "careerAdvancement": "Direct eligibility for Civil Judge (Junior Division) exam by TNPSC, Public Prosecutor posts, and Supreme Court practice.",
      "counsellingProcess": "Single-window online counselling on tndalu.ac.in.",
      "statutoryQuotaBenefit": "69% communal reservation + 7.5% Govt school quota."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "5-Year Integrated Honours Law at SOEL Chennai & 14 Govt Law Colleges"
      ],
      "participatingBodies": "Tamil Nadu Dr. Ambedkar Law University (TNDALU)",
      "selectionStepsAfterExam": [
        "1. Submit Class 12 Marks.",
        "2. Cut-off Rank List.",
        "3. Online Counselling Choice Filling.",
        "4. Admission."
      ],
      "expectedOutcome": "Bar Council accredited Professional Law Degree admission.",
      "statutoryQuotaBenefit": "69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 12 Higher Secondary curricula."
      ],
      "recommendedFocus": [
        "Maximizing Class 12 aggregate marks"
      ],
      "markingScheme": "Merit percentage computed from Class 12 Board exam core subjects.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TNDALU Official Registry"
  },
  {
    "id": "upsc-cse",
    "title": "Union Public Service Commission Civil Services Examination (UPSC CSE)",
    "shortCode": "UPSC CSE",
    "conductingAuthority": "Union Public Service Commission (UPSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Social Work",
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Law",
      "Management"
    ],
    "purpose": "India's highest constitutional competitive examination selecting administrative leaders for Indian Administrative Service, Indian Foreign Service, and Indian Police Service.",
    "whoCanApply": "Any citizen of India holding a Bachelor's degree from a recognized university.",
    "minimumQualification": "Bachelor's Degree in any discipline from a recognized university.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Prelims: General Studies Paper I & CSAT Paper II; Mains: 9 Descriptive Papers"
    ],
    "minimumMarks": "Pass in recognized Bachelor degree",
    "ageCriteria": "21 to 32 years for General; 21 to 35 years for OBC; 21 to 37 years for SC/ST.",
    "ageMin": 21,
    "ageMax": 37,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC (27%), EWS (10%), and PwBD (4%).",
    "examinationMode": "Pen-and-Paper (OMR Prelims + Descriptive Mains + Personality Test)",
    "examFormatDescription": "Stage 1: Civil Services Preliminary Examination (2 Objective Papers, 400 Marks). Stage 2: Civil Services Main Written Examination (9 Descriptive Papers, 1750 Marks). Stage 3: Personality Test / Interview (275 Marks). Total Selection Score: 2025 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. 100% Free for all Female candidates and SC/ST/PwBD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST/PwD are 100% exempted from fee.",
    "hasScholarship": true,
    "scholarshipDetails": "Tamil Nadu All India Civil Services Coaching Centre (AICSCC) in Chennai provides free residential training, food, and \u20b925,000 monthly preparation stipend for TN Prelims-cleared students.",
    "applicationProcedure": [
      "Apply online on upsc.gov.in with One-Time Registration (OTR)."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet (Proof of DOB)",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "February 2026",
      "applicationDeadline": "March 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "May 2026 (Prelims) / September 2026 (Mains)",
      "resultDeclaration": "April 2027",
      "counsellingOrInterview": "January - March 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://upsc.gov.in/",
    "officialNotificationUrl": "https://upsc.gov.in/",
    "officialApplicationPortalUrl": "https://upsconline.nic.in/",
    "officialSyllabusUrl": "https://upsc.gov.in/",
    "previousPapersUrl": "https://upsc.gov.in/examinations/previous-question-papers",
    "opportunityProvided": {
      "summary": "Direct appointment to the premier All-India civil services leading the administrative machinery of districts, central ministries, and embassies worldwide.",
      "degreesOrPosts": [
        "Indian Administrative Service (IAS) - District Collector / Union Secretary",
        "Indian Foreign Service (IFS) - Ambassador / Diplomat",
        "Indian Police Service (IPS) - Superintendent of Police / Director General",
        "Indian Revenue Service (IRS - Income Tax & Customs)",
        "Indian Audit and Accounts Service (IA&AS)",
        "Indian Railway Management Service (IRMS)"
      ],
      "salaryOrStipend": "Pay Level 10 (\u20b956,100) at entry rising to Cabinet Secretary Level 18 (\u20b92,50,000) + Official Residence + Security + Lifetime Pension",
      "careerAdvancement": "Chief Secretary of State, Secretary to Government of India, Cabinet Secretary.",
      "counsellingProcess": "Cadre and service allocation conducted by DoPT Government of India based on rank and preferences.",
      "statutoryQuotaBenefit": "Central OBC, SC, ST, EWS statutory quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "IAS, IFS, IPS, IRS (24 All-India Services)"
      ],
      "participatingBodies": "Department of Personnel and Training (DoPT), Government of India",
      "selectionStepsAfterExam": [
        "1. Prelims OMR.",
        "2. Mains 9 Papers.",
        "3. Personality Test (275 M).",
        "4. Service Allocation."
      ],
      "expectedOutcome": "Highest civil administrative career in India.",
      "statutoryQuotaBenefit": "Central statutory quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Prelims GS: History, Polity, Geography, Economy, Science, Current Affairs. CSAT: Comprehension, Reasoning, Basic Numeracy. Mains: Essay, 4 GS Papers, 2 Optional Papers, 2 Qualifying Languages."
      ],
      "recommendedFocus": [
        "NCERT Class 6 to 12 textbooks",
        "The Hindu daily editorial analysis",
        "Standard reference books (Laxmikanth Polity, Spectrum History)"
      ],
      "markingScheme": "Prelims: 400 Marks (CSAT 33% qualifying). Mains: 1750 Marks. Interview: 275 Marks. Total: 2025 Marks.",
      "negativeMarking": "1/3rd negative marking in Prelims",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "UPSC Statutory Portal"
  },
  {
    "id": "upsc-nda",
    "title": "Union Public Service Commission National Defence Academy & Naval Academy Examination (UPSC NDA)",
    "shortCode": "UPSC NDA",
    "conductingAuthority": "Union Public Service Commission (UPSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Aviation",
      "Maritime Studies",
      "Engineering",
      "Other Recognised Courses"
    ],
    "purpose": "National military officer entrance examination selecting young Class 12 candidates for commission as officers in the Indian Army, Indian Navy, and Indian Air Force.",
    "whoCanApply": "Unmarried male and female candidates who have passed or are appearing in Class 12.",
    "minimumQualification": "Class 12 pass (Any stream for Army Wing; Physics, Chemistry, and Mathematics mandatory for Air Force and Naval Wings).",
    "eligibleStreams": [
      "Class 12 (Any stream for Army; PCM for Air Force & Navy)"
    ],
    "requiredSubjects": [
      "Mathematics (300 Marks)",
      "General Ability Test - English & GK (600 Marks)"
    ],
    "minimumMarks": "Pass in Class 12",
    "ageCriteria": "16.5 to 19.5 years as of entry date.",
    "ageMin": 16,
    "ageMax": 19,
    "reservationSummary": "Armed Forces merit-based commission with reservation for service wards as per Ministry of Defence norms.",
    "examinationMode": "Pen-and-Paper (OMR) followed by 5-Day SSB Interview",
    "examFormatDescription": "Written Exam: Paper I Mathematics (120 Questions, 300 Marks, 2.5 Hours); Paper II General Ability Test (150 Questions, 600 Marks - English 200 M, GK 400 M, 2.5 Hours). Total Written: 900 Marks. Followed by 5-Day SSB Interview (900 Marks). Total: 1800 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. Free for all Female candidates and SC/ST candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Female and SC/ST candidates 100% exempted.",
    "hasScholarship": true,
    "scholarshipDetails": "Cadets receive full free education, free boarding, uniform, and a monthly stipend of \u20b956,100 during training.",
    "applicationProcedure": [
      "Apply online on upsconline.nic.in during active NDA notification window (conducted twice a year: NDA I & NDA II)."
    ],
    "requiredDocuments": [
      "10th Marksheet (Proof of DOB)",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December (NDA I) / May (NDA II)",
      "applicationDeadline": "January / June",
      "admitCardRelease": "3 weeks before exam",
      "examinationDate": "April (NDA I) / September (NDA II)",
      "resultDeclaration": "June / November",
      "counsellingOrInterview": "SSB Interviews across military selection boards",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://upsc.gov.in/",
    "officialNotificationUrl": "https://upsc.gov.in/",
    "officialApplicationPortalUrl": "https://upsconline.nic.in/",
    "officialSyllabusUrl": "https://upsc.gov.in/",
    "opportunityProvided": {
      "summary": "Permanent commission as a Gazetted Military Officer in Indian Armed Forces with 3-year fully sponsored B.A. / B.Sc. / B.Tech. degree from JNU New Delhi.",
      "degreesOrPosts": [
        "Lieutenant - Indian Army",
        "Sub-Lieutenant - Indian Navy",
        "Flying Officer - Indian Air Force (Fighter Pilot, Transport, Helicopter)",
        "JNU B.Tech. / B.Sc. / B.A. Degree awarded with zero educational debt"
      ],
      "salaryOrStipend": "Stipend of \u20b956,100/month during cadet training; Starting pay as Lieutenant: Pay Level 10 (\u20b956,100 \u2013 \u20b91,77,500) + Military Service Pay (MSP \u20b915,500) + Free Housing + Canteen & Military Hospital benefits.",
      "careerAdvancement": "Promotions to Captain, Major, Colonel, Brigadier, Major General, and Chief of Staff.",
      "counsellingProcess": "Merit list based on Written (900) + SSB Interview (900) + Medical fitness.",
      "statutoryQuotaBenefit": "Armed Forces merit-based selection."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Commissioned Officer in Army, Navy, Air Force"
      ],
      "participatingBodies": "Ministry of Defence, Integrated Headquarters of Armed Forces",
      "selectionStepsAfterExam": [
        "1. Written Exam (900 M).",
        "2. 5-Day SSB Interview (900 M).",
        "3. Military Medical Board."
      ],
      "expectedOutcome": "Permanent Gazetted Officer in Indian Armed Forces.",
      "statutoryQuotaBenefit": "National defense merit."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Maths: Trigonometry, Calculus, Vectors, Statistics. GAT: English Grammar, Physics, Chemistry, General Science, History, Geography, Current Events."
      ],
      "recommendedFocus": [
        "NCERT Class 11 & 12 Mathematics",
        "English vocabulary and sentence structure",
        "Physical fitness for SSB obstacle course"
      ],
      "markingScheme": "Maths: 300 Marks (0.83 negative marks). GAT: 600 Marks (1.33 negative marks).",
      "negativeMarking": "1/3rd negative marking per wrong answer",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "UPSC Statutory Portal"
  },
  {
    "id": "upsc-cds",
    "title": "Union Public Service Commission Combined Defence Services Examination (UPSC CDS)",
    "shortCode": "UPSC CDS",
    "conductingAuthority": "Union Public Service Commission (UPSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Aviation",
      "Maritime Studies",
      "Engineering",
      "Arts",
      "Science",
      "Commerce",
      "Law"
    ],
    "purpose": "Graduate military entrance examination for commission into Indian Military Academy (IMA), Officers Training Academy (OTA Chennai), Indian Naval Academy, and Air Force Academy.",
    "whoCanApply": "Graduate degree holders (B.E., B.Tech, B.Sc., B.A., B.Com., etc.) meeting age and medical criteria.",
    "minimumQualification": "Degree from a recognized university (Engineering degree mandatory for Naval Academy; Physics and Maths at 10+2 or Engineering degree for Air Force Academy).",
    "eligibleStreams": [
      "Any Graduate Stream (OTA / IMA); Engineering/Science (INA / AFA)"
    ],
    "requiredSubjects": [
      "English (100 Marks)",
      "General Knowledge (100 Marks)",
      "Elementary Mathematics (100 Marks - exempted for OTA)"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "19 to 24 years for IMA/INA/AFA; 19 to 25 years for Officers Training Academy (OTA Chennai).",
    "ageMin": 19,
    "ageMax": 25,
    "reservationSummary": "Armed Forces merit-based commission.",
    "examinationMode": "Pen-and-Paper (OMR) followed by SSB Interview",
    "examFormatDescription": "For IMA, INA, AFA: 3 Papers (English 100 M, GK 100 M, Maths 100 M - Total 300 Marks, 6 Hours). For OTA Chennai: 2 Papers (English 100 M, GK 100 M - Total 200 Marks, 4 Hours - Maths exempted). SSB Interview: 300 Marks (200 for OTA).",
    "feeType": "Paid Application",
    "feeGeneralInr": 200,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9200 for General/OBC male candidates. Free for all Female candidates and SC/ST candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST are 100% exempted from fee.",
    "hasScholarship": true,
    "scholarshipDetails": "Cadets receive \u20b956,100/month training stipend.",
    "applicationProcedure": [
      "Apply online on upsconline.nic.in (conducted twice yearly: CDS I & CDS II)."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet (Proof of DOB)",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December (CDS I) / May (CDS II)",
      "applicationDeadline": "January / June",
      "admitCardRelease": "3 weeks before exam",
      "examinationDate": "April (CDS I) / September (CDS II)",
      "resultDeclaration": "June / November",
      "counsellingOrInterview": "SSB Interview at Service Selection Boards",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://upsc.gov.in/",
    "officialNotificationUrl": "https://upsc.gov.in/",
    "officialApplicationPortalUrl": "https://upsconline.nic.in/",
    "officialSyllabusUrl": "https://upsc.gov.in/",
    "opportunityProvided": {
      "summary": "Commission as Lieutenant in Indian Army (including prestigious training at Officers Training Academy OTA Chennai), Indian Navy, or Indian Air Force.",
      "degreesOrPosts": [
        "Lieutenant - Indian Army (Regular Commission via IMA Dehradun)",
        "Lieutenant - Officers Training Academy (OTA Chennai Short Service Commission for Men & Women)",
        "Sub-Lieutenant - Indian Naval Academy (Ezhimala)",
        "Flying Officer - Air Force Academy (Hyderabad)"
      ],
      "salaryOrStipend": "Pay Level 10 (\u20b956,100 \u2013 \u20b91,77,500) + MSP \u20b915,500 + Dearness Allowance + Free Housing + Canteen & Medical Facilities",
      "careerAdvancement": "Commanding Officer of Battalions, Brigadier, Major General, and Chief of Army Staff.",
      "counsellingProcess": "Merit list based on Written Score + SSB Interview + Medical fitness.",
      "statutoryQuotaBenefit": "Equal opportunity commission for male and female graduates."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Commissioned Officer in Armed Forces"
      ],
      "participatingBodies": "Ministry of Defence",
      "selectionStepsAfterExam": [
        "1. Written Exam.",
        "2. 5-Day SSB Interview.",
        "3. Medical Board.",
        "4. Training at OTA Chennai / IMA."
      ],
      "expectedOutcome": "Permanent/Short Service Commissioned Military Officer.",
      "statutoryQuotaBenefit": "Defence merit."
    },
    "preparation": {
      "syllabusRoadmap": [
        "English: Reading comprehension, idioms, spotting errors. GK: Indian history, geography, constitution, current affairs. Maths: Arithmetic, algebra, geometry, mensuration."
      ],
      "recommendedFocus": [
        "Daily current affairs and defence developments",
        "Class 10 level arithmetic speed"
      ],
      "markingScheme": "100 Marks per paper. 1/3rd negative marking per wrong answer.",
      "negativeMarking": "1/3rd negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "UPSC Statutory Portal"
  },
  {
    "id": "upsc-capf",
    "title": "Union Public Service Commission Central Armed Police Forces Assistant Commandants Examination (UPSC CAPF AC)",
    "shortCode": "UPSC CAPF",
    "conductingAuthority": "Union Public Service Commission (UPSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Social Work",
      "Arts",
      "Science",
      "Commerce",
      "Engineering",
      "Law"
    ],
    "purpose": "Direct gazetted officer recruitment for paramilitary forces protecting national borders, VIP security, and internal security operations.",
    "whoCanApply": "Graduate degree holders meeting physical and medical standards.",
    "minimumQualification": "Bachelor's Degree in any discipline from a recognized university.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Paper I: General Ability & Intelligence (250 Marks)",
      "Paper II: General Studies, Essay & Comprehension (200 Marks)"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "20 to 25 years as of 1st August (relaxations: OBC 28 years, SC/ST 30 years).",
    "ageMin": 20,
    "ageMax": 30,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC (27%), EWS (10%).",
    "examinationMode": "Pen-and-Paper (Objective Paper I + Descriptive Paper II) + Physical Efficiency Tests + Interview",
    "examFormatDescription": "Paper I: General Ability & Intelligence (125 Objective Questions, 250 Marks, 2 Hours). Paper II: General Studies, Essay, and Comprehension (Descriptive, 200 Marks, 3 Hours). Followed by Physical Efficiency Test (PET), Medical Standards, and Personality Test / Interview (150 Marks). Total Selection: 600 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 200,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9200 for General/OBC male candidates. Free for all Female candidates and SC/ST candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Female and SC/ST candidates 100% exempted.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on upsconline.nic.in during active April-May registration window."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet (Proof of DOB)",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "April 2026",
      "applicationDeadline": "May 2026",
      "admitCardRelease": "July 2026",
      "examinationDate": "August 2026",
      "resultDeclaration": "October 2026",
      "counsellingOrInterview": "February - April 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://upsc.gov.in/",
    "officialNotificationUrl": "https://upsc.gov.in/",
    "officialApplicationPortalUrl": "https://upsconline.nic.in/",
    "officialSyllabusUrl": "https://upsc.gov.in/",
    "opportunityProvided": {
      "summary": "Direct Class I Gazetted Executive Command of armed paramilitary company battalions protecting international borders, vital national installations, and counter-insurgency operations.",
      "degreesOrPosts": [
        "Assistant Commandant (Border Security Force - BSF)",
        "Assistant Commandant (Central Reserve Police Force - CRPF)",
        "Assistant Commandant (Central Industrial Security Force - CISF - Airport & Port Security)",
        "Assistant Commandant (Indo-Tibetan Border Police - ITBP)",
        "Assistant Commandant (Sashastra Seema Bal - SSB)"
      ],
      "salaryOrStipend": "Pay Level 10 (\u20b956,100 \u2013 \u20b91,77,500) + DA + HRA + Special Risk Allowance (Starting gross approx \u20b985,000/month)",
      "careerAdvancement": "Promotions to Deputy Commandant, Second-in-Command, Commandant, and Inspector General (IG).",
      "counsellingProcess": "Merit list based on Written (450) + Interview (150) followed by force allocation.",
      "statutoryQuotaBenefit": "Central OBC, SC, ST, EWS reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Assistant Commandant in BSF, CRPF, CISF, ITBP, SSB"
      ],
      "participatingBodies": "Ministry of Home Affairs (MHA), Government of India",
      "selectionStepsAfterExam": [
        "1. Written Exam (450 M).",
        "2. Physical Efficiency Test (PET).",
        "3. Medical Examination.",
        "4. Interview (150 M)."
      ],
      "expectedOutcome": "Class I Gazetted Armed Police Service Officer.",
      "statutoryQuotaBenefit": "Central statutory quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Paper I: History, Polity, Geography, General Science, Current Events, Reasoning. Paper II: Essay writing (English/Hindi), Precis writing, Comprehension, Report writing."
      ],
      "recommendedFocus": [
        "Analytical essay writing on security and economic issues",
        "Physical endurance training (100m, 800m run, long jump, shot put)"
      ],
      "markingScheme": "Paper I: 250 Marks (1/3rd negative marks). Paper II: 200 Marks. Interview: 150 Marks.",
      "negativeMarking": "1/3rd negative marking in Paper I",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "UPSC Statutory Portal"
  },
  {
    "id": "ssc-cgl",
    "title": "Staff Selection Commission Combined Graduate Level Examination (SSC CGL)",
    "shortCode": "SSC CGL",
    "conductingAuthority": "Staff Selection Commission (SSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Commerce",
      "Arts",
      "Science",
      "Engineering",
      "Management",
      "Computer Applications"
    ],
    "purpose": "Premier central government recruitment examination selecting Group B and Group C officers for Central Ministries, CBI, Enforcement Directorate, Income Tax, and Customs.",
    "whoCanApply": "Graduate degree holders in any stream from a recognized university.",
    "minimumQualification": "Bachelor's Degree in any discipline from a recognized university.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Reasoning, General Awareness, Quantitative Aptitude, English Comprehension, Computer Knowledge"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "18 to 30 years for most posts; 18 to 32 years for JSO; relaxations: OBC 3 yrs, SC/ST 5 yrs.",
    "ageMin": 18,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, ESM, and PwD.",
    "examinationMode": "Computer Based Test (CBT - Tier I & Tier II)",
    "examFormatDescription": "Tier I (CBT): 100 Questions, 200 Marks, 60 Minutes (Qualifying in nature). Tier II (CBT): Session I (2 Hours 15 Mins) - Mathematical Abilities (30 Q, 90 M), Reasoning (30 Q, 90 M), English (45 Q, 135 M), General Awareness (25 Q, 75 M), Computer Knowledge (20 Q, 60 M - Qualifying). Session II: Data Entry Speed Test (DEST qualifying). Final Merit based on Tier II Paper I (390 Marks).",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. 100% Free for all Female candidates and SC/ST/PwD/Ex-Servicemen.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST are 100% exempted from fee.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on ssc.gov.in with One-Time Registration (OTR)."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet (Proof of DOB)",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "June 2026",
      "applicationDeadline": "July 2026",
      "admitCardRelease": "August 2026",
      "examinationDate": "September 2026 (Tier I) / December 2026 (Tier II)",
      "resultDeclaration": "February 2027",
      "counsellingOrInterview": "Direct appointment via post allocation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://ssc.gov.in/",
    "officialNotificationUrl": "https://ssc.gov.in/",
    "officialApplicationPortalUrl": "https://ssc.gov.in/",
    "officialSyllabusUrl": "https://ssc.gov.in/",
    "opportunityProvided": {
      "summary": "Direct executive and investigative appointments in Central Government Ministries, investigative agencies, and tax administrations with high job security.",
      "degreesOrPosts": [
        "Assistant Section Officer (ASO) - Central Secretariat Service (CSS / MEA / IB / Railway)",
        "Inspector of Income Tax (CBDT)",
        "Inspector (Central Excise / Preventive Officer / Examiner - CBIC)",
        "Assistant Enforcement Officer (Enforcement Directorate - ED)",
        "Sub-Inspector (Central Bureau of Investigation - CBI)",
        "Inspector (Narcotics / National Investigation Agency - NIA)",
        "Auditor & Accountant (CAG / CGA)"
      ],
      "salaryOrStipend": "Pay Level 7 (\u20b944,900 \u2013 \u20b91,42,400) for Inspectors/ASO; Pay Level 8 (\u20b947,600 \u2013 \u20b91,51,100) for Assistant Audit Officer; Starting gross approx \u20b965,000 \u2013 \u20b980,000/month",
      "careerAdvancement": "Promotions to Under Secretary, Deputy Commissioner of Income Tax, and Joint Director.",
      "counsellingProcess": "Merit rank and department allocation conducted by SSC strictly based on Tier II 390 marks.",
      "statutoryQuotaBenefit": "Central statutory quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Inspector in Income Tax, Central Excise, CBI, MEA, ED"
      ],
      "participatingBodies": "Ministries of Finance, Home Affairs, External Affairs, Defence, Personnel",
      "selectionStepsAfterExam": [
        "1. Tier I CBT.",
        "2. Tier II CBT (390 Marks).",
        "3. DEST Typing Test.",
        "4. Post Allocation."
      ],
      "expectedOutcome": "Permanent Central Government Group B/C Officer.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Quantitative Aptitude (Arithmetic & Advanced Maths), Reasoning, English Grammar & Vocab, General Awareness (Current Affairs, Science, History, Polity), Computer Literacy."
      ],
      "recommendedFocus": [
        "Speed in quantitative calculations",
        "Previous 5 years SSC CGL Tier II papers",
        "Daily typing speed practice (27 WPM)"
      ],
      "markingScheme": "Tier II: 390 Marks (3 marks per question). 1 mark negative marking for each incorrect answer.",
      "negativeMarking": "1 mark negative marking in Tier II Paper I",
      "durationMinutes": 135
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SSC Statutory Portal"
  },
  {
    "id": "ssc-chsl",
    "title": "Staff Selection Commission Combined Higher Secondary Level Examination (SSC CHSL 10+2)",
    "shortCode": "SSC CHSL",
    "conductingAuthority": "Staff Selection Commission (SSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Class 12",
      "Diploma / Polytechnic",
      "Undergraduate"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Arts",
      "Commerce",
      "Science",
      "Computer Applications",
      "Other Recognised Courses"
    ],
    "purpose": "National central recruitment for Class 12 passed students for ministerial clerical, administrative assistant, and data entry roles across Government of India ministries.",
    "whoCanApply": "Candidates who have passed Class 12 (Higher Secondary) from a recognized board.",
    "minimumQualification": "Must have passed 12th Standard (10+2) or equivalent examination from a recognized Board.",
    "eligibleStreams": [
      "Any Class 12 Stream (Science, Commerce, Arts)"
    ],
    "requiredSubjects": [
      "English Language, General Intelligence, Quantitative Aptitude, General Awareness"
    ],
    "minimumMarks": "Pass in Class 12",
    "ageCriteria": "18 to 27 years as of 1st August (relaxations: OBC 3 yrs, SC/ST 5 yrs, PwD 10 yrs).",
    "ageMin": 18,
    "ageMax": 32,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, ESM, and PwD.",
    "examinationMode": "Computer Based Test (CBT - Tier I & Tier II)",
    "examFormatDescription": "Tier I (CBT): 100 Questions, 200 Marks, 60 Minutes (Qualifying). Tier II (CBT): Session I (2 Hours 15 Mins) - Maths (30 Q), Reasoning (30 Q), English (40 Q), GA (20 Q), Computer (15 Q). Session II: Skill Test / Typing Test (35 wpm English or 30 wpm Hindi).",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. 100% Free for all Female candidates and SC/ST/PwD/Ex-Servicemen.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST are 100% exempted from fee.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on ssc.gov.in with OTR."
    ],
    "requiredDocuments": [
      "12th Marksheet",
      "10th Marksheet (Proof of DOB)",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "April 2026",
      "applicationDeadline": "May 2026",
      "admitCardRelease": "June 2026",
      "examinationDate": "July 2026 (Tier I) / October 2026 (Tier II)",
      "resultDeclaration": "December 2026",
      "counsellingOrInterview": "Direct appointment via post allocation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://ssc.gov.in/",
    "officialNotificationUrl": "https://ssc.gov.in/",
    "officialApplicationPortalUrl": "https://ssc.gov.in/",
    "officialSyllabusUrl": "https://ssc.gov.in/",
    "opportunityProvided": {
      "summary": "Permanent Central Government employment directly after Class 12 in Central Ministries, Armed Forces Headquarters, and judicial tribunals.",
      "degreesOrPosts": [
        "Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA)",
        "Data Entry Operator (DEO) in Comptroller and Auditor General (CAG) / Consumer Affairs",
        "Data Entry Operator Grade A in Central Ministries"
      ],
      "salaryOrStipend": "Pay Level 2 (\u20b919,900 \u2013 \u20b963,200) for LDC; Pay Level 4 (\u20b925,500 \u2013 \u20b981,100) for DEO; Starting gross approx \u20b932,000 \u2013 \u20b942,000/month",
      "careerAdvancement": "Promotion to Senior Secretariat Assistant (SSA), Assistant Section Officer (ASO), and Section Officer.",
      "counsellingProcess": "Merit rank based on Tier II written score + typing test qualification.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "LDC, JSA, DEO in Central Ministries"
      ],
      "participatingBodies": "Ministries of Defence, Home Affairs, External Affairs, Finance, CAG",
      "selectionStepsAfterExam": [
        "1. Tier I CBT.",
        "2. Tier II CBT.",
        "3. Typing Speed Test.",
        "4. Post Allocation."
      ],
      "expectedOutcome": "Permanent Central Government job with promotional avenues.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Basic Arithmetic, English Grammar, General Intelligence, Current Affairs, Basic Computer Concepts."
      ],
      "recommendedFocus": [
        "English vocabulary and grammar rules",
        "Typing practice (target 35 WPM on computer keyboard)"
      ],
      "markingScheme": "Tier II: 360 Marks (3 marks per question). 1 mark negative marking for wrong answers.",
      "negativeMarking": "1 mark negative marking in Tier II",
      "durationMinutes": 135
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SSC Statutory Portal"
  },
  {
    "id": "ssc-mts-10th",
    "title": "Staff Selection Commission Multi-Tasking Staff & Havaldar Examination (SSC MTS)",
    "shortCode": "SSC MTS",
    "conductingAuthority": "Staff Selection Commission (SSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Class 10",
      "Class 11",
      "Class 12",
      "Diploma / Polytechnic",
      "ITI",
      "Undergraduate"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Other Recognised Courses",
      "Polytechnic",
      "ITI"
    ],
    "purpose": "All-India central government recruitment for Class 10 passed candidates into general administrative multi-tasking staff and customs/excise havaldars.",
    "whoCanApply": "Candidates who have passed Matriculation (Class 10) Examination from a recognized Board.",
    "minimumQualification": "Must have passed Matriculation (Class 10) Examination or equivalent from a recognized Board.",
    "eligibleStreams": [
      "Pass in Class 10"
    ],
    "requiredSubjects": [
      "Numerical & Mathematical Ability, Reasoning Ability, General Awareness, English Language"
    ],
    "minimumMarks": "Pass in Class 10",
    "ageCriteria": "18 to 25 years (and 18 to 27 years for specific posts) as of 1st August; relaxations: OBC 3 yrs, SC/ST 5 yrs.",
    "ageMin": 18,
    "ageMax": 32,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, ESM, and PwD.",
    "examinationMode": "Computer Based Test (CBT) in Regional Languages including Tamil",
    "examFormatDescription": "Single CBT in two sessions. Session I: Numerical & Mathematical Ability (20 Q, 60 M) + Reasoning Ability (20 Q, 60 M) - 45 Mins (Qualifying, NO negative marking). Session II: General Awareness (25 Q, 75 M) + English Language (25 Q, 75 M) - 45 Mins (Negative marking applies). Final Merit based entirely on Session II (150 Marks). Physical Test (PST/PET) only for Havaldar posts.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. 100% Free for all Female candidates and SC/ST/PwD/Ex-Servicemen.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST are 100% exempted from fee.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on ssc.gov.in in Tamil or English medium."
    ],
    "requiredDocuments": [
      "10th Marksheet (Proof of DOB)",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "May 2026",
      "applicationDeadline": "June 2026",
      "admitCardRelease": "August 2026",
      "examinationDate": "September - October 2026",
      "resultDeclaration": "December 2026",
      "counsellingOrInterview": "Direct department allocation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://ssc.gov.in/",
    "officialNotificationUrl": "https://ssc.gov.in/",
    "officialApplicationPortalUrl": "https://ssc.gov.in/",
    "officialSyllabusUrl": "https://ssc.gov.in/",
    "opportunityProvided": {
      "summary": "Permanent Central Government job with lifetime pension, central government healthcare (CGHS), and departmental promotional exams to Assistant cadres.",
      "degreesOrPosts": [
        "Multi-Tasking Staff (General Central Service Group C Non-Gazetted in Income Tax, Central Excise, Post Offices, Ministries)",
        "Havaldar in Central Board of Indirect Taxes and Customs (CBIC - GST & Customs)",
        "Havaldar in Central Bureau of Narcotics (CBN)"
      ],
      "salaryOrStipend": "Pay Level 1 (\u20b918,000 \u2013 \u20b956,900) + DA + HRA (Starting gross approx \u20b928,000 \u2013 \u20b934,000/month)",
      "careerAdvancement": "Eligible for internal departmental examination promotion to Lower Division Clerk (LDC) and Tax Assistant.",
      "counsellingProcess": "Merit rank based strictly on Session II (150 Marks) score.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "MTS & Havaldar in Central Ministries and CBIC"
      ],
      "participatingBodies": "Ministries and Departments of the Government of India",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (Session I & II).",
        "2. Physical Test (Havaldar only).",
        "3. Document Verification."
      ],
      "expectedOutcome": "Permanent Central Government job appointment.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Basic Arithmetic, Reasoning, General Awareness (Samacheer/NCERT standard), Basic English Comprehension."
      ],
      "recommendedFocus": [
        "Session II General Awareness and English (Merit is 100% based on this 150 marks)",
        "Exam can be written in Tamil medium"
      ],
      "markingScheme": "Session II: 50 Questions = 150 Marks. 1 mark negative marking for each incorrect answer.",
      "negativeMarking": "1 mark negative marking in Session II only",
      "durationMinutes": 90
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SSC Statutory Portal"
  },
  {
    "id": "ssc-je",
    "title": "Staff Selection Commission Junior Engineer Examination (SSC JE)",
    "shortCode": "SSC JE",
    "conductingAuthority": "Staff Selection Commission (SSC)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Diploma / Polytechnic",
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Engineering",
      "Polytechnic"
    ],
    "purpose": "National recruitment of Junior Engineers across premier central engineering organizations including CPWD, Military Engineer Services (MES), and Border Roads Organisation (BRO).",
    "whoCanApply": "Diploma or Degree holders in Civil, Mechanical, or Electrical Engineering.",
    "minimumQualification": "Diploma or Degree in Civil, Mechanical, or Electrical Engineering from a recognized institute or university.",
    "eligibleStreams": [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering"
    ],
    "requiredSubjects": [
      "General Intelligence & Reasoning",
      "General Awareness",
      "Domain Engineering Subject (Civil / Mech / Electrical)"
    ],
    "minimumMarks": "Pass in Diploma or Degree in Engineering",
    "ageCriteria": "18 to 30 years (up to 32 years for CPWD); relaxations: OBC 3 yrs, SC/ST 5 yrs.",
    "ageMin": 18,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, and PwD.",
    "examinationMode": "Computer Based Test (CBT - Paper I & Paper II)",
    "examFormatDescription": "Paper I (CBT): 200 Questions, 200 Marks, 2 Hours (Reasoning 50 M, GA 50 M, General Engineering 100 M). Paper II (CBT): 100 Questions, 300 Marks, 2 Hours (Advanced Technical Domain). Total: 500 Marks.",
    "feeType": "Paid Application",
    "feeGeneralInr": 100,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9100 for General/OBC male candidates. Free for all Female candidates and SC/ST/PwD/Ex-Servicemen.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "All female candidates and SC/ST are 100% exempted from fee.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on ssc.gov.in."
    ],
    "requiredDocuments": [
      "Engineering Diploma / Degree Certificate",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "March 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "June 2026 (Paper I) / August 2026 (Paper II)",
      "resultDeclaration": "October 2026",
      "counsellingOrInterview": "Direct cadre allocation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://ssc.gov.in/",
    "officialNotificationUrl": "https://ssc.gov.in/",
    "officialApplicationPortalUrl": "https://ssc.gov.in/",
    "officialSyllabusUrl": "https://ssc.gov.in/",
    "opportunityProvided": {
      "summary": "Direct central government engineering officer employment with housing quarters, medical benefits, and promotion pathway to Assistant Executive Engineer.",
      "degreesOrPosts": [
        "Junior Engineer (Civil) - CPWD, MES, Border Roads Organisation (BRO), Central Water Commission (CWC)",
        "Junior Engineer (Electrical) - CPWD, MES, Military Engineer Services",
        "Junior Engineer (Mechanical) - MES, Farakka Barrage, DGQA"
      ],
      "salaryOrStipend": "Pay Level 6 (\u20b935,400 \u2013 \u20b91,12,400) + DA + HRA (Starting gross approx \u20b952,000 \u2013 \u20b962,000/month)",
      "careerAdvancement": "Promotion to Assistant Executive Engineer (AEE), Executive Engineer (EE), and Superintending Engineer.",
      "counsellingProcess": "Merit rank based on combined Paper I (200) + Paper II (300) = 500 Marks.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Junior Engineer in CPWD, MES, BRO, CWC"
      ],
      "participatingBodies": "Central Public Works Department, Ministry of Defence, Ministry of Jal Shakti",
      "selectionStepsAfterExam": [
        "1. Paper I CBT.",
        "2. Paper II Technical CBT.",
        "3. Document Verification."
      ],
      "expectedOutcome": "Permanent Central Government Engineering Officer.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Core Diploma/Degree branch technical subjects + Reasoning and General Awareness."
      ],
      "recommendedFocus": [
        "Building Materials, Surveying, RCC for Civil",
        "Thermodynamics and Machine Design for Mech",
        "Electrical machines and circuit laws for Electrical"
      ],
      "markingScheme": "Paper I: 200 Marks (0.25 negative marks). Paper II: 300 Marks (1 mark negative marks for 3-mark questions).",
      "negativeMarking": "0.25 mark in Paper I; 1 mark in Paper II",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SSC Statutory Portal"
  },
  {
    "id": "ibps-po",
    "title": "Institute of Banking Personnel Selection Probationary Officers Examination (IBPS PO / MT)",
    "shortCode": "IBPS PO",
    "conductingAuthority": "Institute of Banking Personnel Selection (IBPS)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Commerce",
      "Management",
      "Arts",
      "Science",
      "Engineering",
      "Computer Applications"
    ],
    "purpose": "All-India common recruitment for Assistant Managers and Probationary Officers across 11 nationalized Public Sector Banks (including Indian Bank, Indian Overseas Bank, Canara Bank, PNB, Bank of Baroda).",
    "whoCanApply": "Any graduate degree holder from a recognized university.",
    "minimumQualification": "A Degree (Graduation) in any discipline from a University recognized by the Govt. Of India.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Reasoning & Computer Aptitude, General/Economy/Banking Awareness, English Language, Data Analysis & Interpretation"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "20 to 30 years as of 1st August; relaxations: OBC 3 yrs, SC/ST 5 yrs, PwD 10 yrs.",
    "ageMin": 20,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, and PwBD.",
    "examinationMode": "Computer Based Test (CBT - Prelims & Mains) + In-Person Interview",
    "examFormatDescription": "Prelims (CBT): 100 Questions, 100 Marks, 60 Minutes (English 30 M, Quantitative 35 M, Reasoning 35 M - sectional timing). Mains (CBT): 155 Questions, 200 Marks, 3 Hours + Descriptive English (2 Questions, 25 Marks, 30 Mins). Followed by Common Interview (100 Marks). Weightage: 80% Mains + 20% Interview.",
    "feeType": "Paid Application",
    "feeGeneralInr": 850,
    "feeReservedInr": 175,
    "feeDescription": "\u20b9850 for General/EWS/OBC; \u20b9175 for SC/ST/PwBD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Concession for SC/ST/PwD.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on ibps.in selecting bank preferences."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "August 2026",
      "applicationDeadline": "August 2026",
      "admitCardRelease": "September 2026",
      "examinationDate": "October 2026 (Prelims) / November 2026 (Mains)",
      "resultDeclaration": "January 2027",
      "counsellingOrInterview": "January - February 2027 (Allotment on April 1st)",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.ibps.in/",
    "officialNotificationUrl": "https://www.ibps.in/",
    "officialApplicationPortalUrl": "https://www.ibps.in/",
    "officialSyllabusUrl": "https://www.ibps.in/",
    "opportunityProvided": {
      "summary": "Direct appointment as Scale I Bank Officer / Assistant Manager with rapid promotions to Branch Manager, Chief Manager, and General Manager.",
      "degreesOrPosts": [
        "Probationary Officer / Management Trainee (Scale I) in Indian Bank (HQ Chennai)",
        "Probationary Officer in Indian Overseas Bank (IOB - HQ Chennai)",
        "Probationary Officer in Canara Bank, Bank of Baroda, PNB, Union Bank of India",
        "Specialist Officer (IT / Agricultural Field Officer / Law) through allied IBPS SO"
      ],
      "salaryOrStipend": "Starting Basic Pay \u20b948,480/month (Scale I); Total starting gross approx \u20b968,000 \u2013 \u20b978,000/month + Leased Accommodation + Bank Concessional Loans + Medical Aid",
      "careerAdvancement": "Fast-track promotions: Scale II (Manager), Scale III (Senior Manager), Scale IV (Chief Manager), Scale V (Assistant General Manager).",
      "counsellingProcess": "Centralized provisional allotment conducted by IBPS on 1st April based on combined 80:20 score.",
      "statutoryQuotaBenefit": "Central bank reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Probationary Officer / Assistant Manager in 11 Public Sector Banks"
      ],
      "participatingBodies": "11 Nationalized Banks across India",
      "selectionStepsAfterExam": [
        "1. Preliminary CBT.",
        "2. Mains CBT + Descriptive.",
        "3. Bank Interview (100 M).",
        "4. Bank Allotment."
      ],
      "expectedOutcome": "Permanent Public Sector Bank Officer.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Data Interpretation, High-Level Puzzles, Financial & Banking Awareness, English Reading Comprehension, Essay & Letter Writing."
      ],
      "recommendedFocus": [
        "Speed calculation techniques for DI",
        "Financial awareness and RBI policy repo rates",
        "Solving sectional mock tests within 20 minutes"
      ],
      "markingScheme": "0.25 mark negative marking for each incorrect answer.",
      "negativeMarking": "0.25 negative marking per wrong answer",
      "durationMinutes": 210
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "IBPS Statutory Portal"
  },
  {
    "id": "sbi-po",
    "title": "State Bank of India Probationary Officers Examination (SBI PO)",
    "shortCode": "SBI PO",
    "conductingAuthority": "State Bank of India (SBI)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Commerce",
      "Management",
      "Arts",
      "Science",
      "Engineering"
    ],
    "purpose": "Premier banking recruitment examination selecting future leadership cadres for India's largest Fortune 500 public sector bank.",
    "whoCanApply": "Graduates in any discipline. Final year students are also eligible to apply provisionally.",
    "minimumQualification": "Graduation in any discipline from a recognized University.",
    "eligibleStreams": [
      "Any Graduate Stream"
    ],
    "requiredSubjects": [
      "Reasoning, Data Analysis, General Economy/Banking, English Language"
    ],
    "minimumMarks": "Pass in Bachelor degree",
    "ageCriteria": "21 to 30 years as of 1st April; relaxations: OBC 3 yrs, SC/ST 5 yrs.",
    "ageMin": 21,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC, EWS, and PwBD.",
    "examinationMode": "Computer Based Test (CBT) + Psychometric Test + Group Discussion & Interview",
    "examFormatDescription": "Phase I (Prelims CBT): 100 Q, 100 M, 1 Hour. Phase II (Mains CBT): 155 Q, 200 M, 3 Hours + Descriptive English (2 Q, 50 M, 30 Mins). Phase III: Psychometric Test + Group Exercise (20 M) & Personal Interview (30 M) - Total 50 Marks. Final Merit normalized to 100 Marks (Mains 75% + Group Exercise/Interview 25%).",
    "feeType": "Paid Application",
    "feeGeneralInr": 750,
    "feeReservedInr": 0,
    "feeDescription": "\u20b9750 for General/EWS/OBC; 100% Free for SC/ST/PwBD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "SC/ST/PwD candidates completely exempted.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on sbi.co.in/careers."
    ],
    "requiredDocuments": [
      "Degree Certificate",
      "10th Marksheet",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "September 2026",
      "applicationDeadline": "October 2026",
      "admitCardRelease": "October 2026",
      "examinationDate": "November 2026 (Prelims) / December 2026 (Mains)",
      "resultDeclaration": "March 2027",
      "counsellingOrInterview": "January - February 2027",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://sbi.co.in/careers",
    "officialNotificationUrl": "https://sbi.co.in/careers",
    "officialApplicationPortalUrl": "https://sbi.co.in/careers",
    "officialSyllabusUrl": "https://sbi.co.in/careers",
    "opportunityProvided": {
      "summary": "Fast-track leadership recruitment into State Bank of India with industry-leading executive perks, foreign postings, and rapid ascent to Chairman / Managing Director.",
      "degreesOrPosts": [
        "Probationary Officer (Scale I) in State Bank of India",
        "Eligibility for foreign posting in SBI overseas branches (London, New York, Singapore, Dubai)"
      ],
      "salaryOrStipend": "Starting Basic Pay \u20b941,960 with 4 advance increments; Total starting gross approx \u20b982,000 \u2013 \u20b995,000/month + Leased accommodation up to \u20b935,000/month + Free Medical & Travel allowances",
      "careerAdvancement": "Top SBI POs reach Scale IV (Chief Manager) within 7-8 years; highest corporate mobility.",
      "counsellingProcess": "Final selection list published on sbi.co.in based on normalized 75:25 score.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Probationary Officer in State Bank of India"
      ],
      "participatingBodies": "State Bank of India (Fortune 500 Enterprise)",
      "selectionStepsAfterExam": [
        "1. Prelims.",
        "2. Mains + Descriptive.",
        "3. Psychometric Test.",
        "4. Group Exercise & Interview."
      ],
      "expectedOutcome": "Permanent Officer in India's largest bank.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Advanced Data Analysis, Caselet DI, Critical Reasoning, Banking Economy, Descriptive Letter & Essay Writing."
      ],
      "recommendedFocus": [
        "Complex analytical reasoning",
        "High-scoring descriptive English writing",
        "SBI specific banking schemes"
      ],
      "markingScheme": "Phase II: 250 Marks. Phase III: 50 Marks. 1/4th negative marking in objective sections.",
      "negativeMarking": "1/4th negative marking",
      "durationMinutes": 210
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SBI Central Recruitment Board"
  },
  {
    "id": "jee-main",
    "title": "Joint Entrance Examination (Main) (JEE Main)",
    "shortCode": "JEE Main",
    "conductingAuthority": "National Testing Agency (NTA)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Architecture"
    ],
    "purpose": "National single-window engineering entrance test for admission to 31 NITs, 25 IIITs, and 28 CFTIs across India, and statutory qualifier for JEE Advanced.",
    "whoCanApply": "Candidates who have passed Class 12 in the current year or preceding two years with Physics, Chemistry, and Mathematics.",
    "minimumQualification": "Passed Class 12 examination with Physics, Chemistry, and Mathematics. 75% marks in Class 12 (65% for SC/ST) required for NIT/IIIT/CFTI admission.",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    "minimumMarks": "75% aggregate in Class 12 (65% for SC/ST) or top 20 percentile in Board",
    "ageCriteria": "No age limit for candidates writing JEE Main.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC-NCL (27%), GEN-EWS (10%), and PwD (5%). 50% Home State Quota applies at NIT Trichy.",
    "examinationMode": "Computer Based Test (CBT - Paper 1 for B.Tech)",
    "examFormatDescription": "Paper 1 (B.E./B.Tech CBT): 90 Questions (attempt 75), 300 Marks, 3 Hours. Mathematics (25 Q, 100 M), Physics (25 Q, 100 M), Chemistry (25 Q, 100 M). Each subject has Section A (20 MCQs) and Section B (10 Numerical questions, attempt 5). Negative marking of -1 applies to both sections.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 500,
    "feeDescription": "\u20b91,000 for General/OBC male candidates; \u20b9800 for Female candidates; \u20b9500 for SC/ST/PwD/Third Gender per session.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for SC/ST/PwD and female candidates.",
    "hasScholarship": true,
    "scholarshipDetails": "Central Sector Scholarship on NSP covers 100% tuition for SC/ST students in NITs. Full tuition fee waiver for students with family income < \u20b91 LPA in NITs.",
    "applicationProcedure": [
      "Apply online on jeemain.nta.nic.in in Session 1 (Nov-Dec) or Session 2 (Feb-March)."
    ],
    "requiredDocuments": [
      "10th Marksheet (Proof of DOB)",
      "12th Marksheet / Admit Card",
      "Category Certificate (OBC-NCL / EWS / SC / ST)",
      "PwD Certificate if applicable",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "November (Session 1) / February (Session 2)",
      "applicationDeadline": "December (Session 1) / March (Session 2)",
      "admitCardRelease": "3 days before examination",
      "examinationDate": "January (Session 1) & April (Session 2)",
      "resultDeclaration": "February (Session 1) & April (Final AIR Rank List)",
      "counsellingOrInterview": "JoSAA Counselling starts in June annually",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://jeemain.nta.nic.in/",
    "officialNotificationUrl": "https://jeemain.nta.nic.in/",
    "officialApplicationPortalUrl": "https://jeemain.nta.nic.in/",
    "officialSyllabusUrl": "https://jeemain.nta.nic.in/",
    "previousPapersUrl": "https://nta.ac.in/Downloads",
    "opportunityProvided": {
      "summary": "Admission to premier National Institutes of Technology (including NIT Tiruchirappalli ranked #1 NIT in India), IIITs, and qualifier for the top 2,50,000 candidates to appear for JEE Advanced for IIT admissions.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science, AI, ECE, Mechanical, Civil at National Institute of Technology Tiruchirappalli (NIT Trichy - 50% Home State Quota for TN students)",
        "B.Tech. / Dual Degree in 31 NITs across India",
        "B.Tech. in Indian Institute of Information Technology (IIIT Design Kancheepuram, IIIT Trichy)",
        "B.Tech. in 28 Centrally Funded Technical Institutes (CFTIs)",
        "Statutory qualification to register and write JEE Advanced 2026"
      ],
      "salaryOrStipend": "NIT Trichy average engineering campus package: \u20b915.7 LPA; Highest domestic offer: \u20b952.8 LPA (Microsoft, Google, Oracle, Texas Instruments).",
      "careerAdvancement": "Premier global technology careers, direct campus recruitment, and qualification for elite research labs.",
      "counsellingProcess": "Joint Seat Allocation Authority (JoSAA) and CSAB centralized online multi-round counselling based on All India Rank (AIR).",
      "statutoryQuotaBenefit": "50% Home State seats reserved exclusively for Tamil Nadu domicile students at NIT Trichy."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech at NIT Trichy, IIIT Kancheepuram, and 31 NITs nationwide"
      ],
      "participatingBodies": "JoSAA, CSAB, National Testing Agency (NTA)",
      "selectionStepsAfterExam": [
        "1. Session 1 & 2 CBT Examination.",
        "2. All India Rank (AIR) calculation based on best NTA percentile score.",
        "3. Top 2,50,000 qualify for JEE Advanced.",
        "4. JoSAA centralized multi-round seat allotment for NITs/IIITs."
      ],
      "expectedOutcome": "Admission to Institute of National Importance (NIT/IIIT) with premier campus placements.",
      "statutoryQuotaBenefit": "50% TN Home State Quota at NIT Trichy + Central OBC, SC, ST, EWS quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 11 & 12 NCERT Mathematics (Calculus, Coordinate, Algebra), Physics (Mechanics, Electrodynamics, Modern Physics), Chemistry (Organic, Inorganic, Physical)."
      ],
      "recommendedFocus": [
        "NCERT Chemistry line-by-line",
        "Physics conceptual problem solving (HC Verma)",
        "Previous 5 years NTA online question papers"
      ],
      "markingScheme": "4 Marks for correct answer, 1 Mark deducted for incorrect answer. Total 300 Marks.",
      "negativeMarking": "-1 mark negative marking for wrong answer",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "NTA Statutory Information Bulletin"
  },
  {
    "id": "jee-advanced",
    "title": "Joint Entrance Examination (Advanced) (JEE Advanced)",
    "shortCode": "JEE Advanced",
    "conductingAuthority": "Indian Institutes of Technology (IITs) on rotational basis under JAB",
    "authorityType": "Public University",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Science",
      "Architecture"
    ],
    "purpose": "India's most rigorous engineering entrance examination conducted exclusively for admission to Bachelor of Technology programmes across all 23 Indian Institutes of Technology (IITs).",
    "whoCanApply": "Candidates ranked within the top 2,50,000 successful candidates in JEE Main Paper 1.",
    "minimumQualification": "Must have qualified JEE Main and passed Class 12 with Physics, Chemistry, and Mathematics. Minimum 75% aggregate marks in Class 12 (65% for SC/ST) or top 20 percentile in Board.",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Physics",
      "Chemistry",
      "Mathematics"
    ],
    "minimumMarks": "75% aggregate in Class 12 (65% for SC/ST)",
    "ageCriteria": "Candidates should have been born on or after October 1, 2001 (5-year relaxation for SC/ST/PwD). Maximum 2 attempts in consecutive years.",
    "ageMin": 16,
    "ageMax": 25,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC-NCL (27%), GEN-EWS (10%), PwD (5%). Female Supernumerary Quota (minimum 20% female enrollment).",
    "examinationMode": "Computer Based Test (CBT - Mandatory 2 Papers)",
    "examFormatDescription": "Two compulsory papers on the same day: Paper 1 (3 Hours, 9:00 AM - 12:00 PM) and Paper 2 (3 Hours, 2:30 PM - 5:30 PM). Both papers test Physics, Chemistry, and Mathematics with multiple formats: Single Choice, Multiple Choice (partial marking), Numerical Value, and Matching Lists.",
    "feeType": "Paid Application",
    "feeGeneralInr": 3200,
    "feeReservedInr": 1600,
    "feeDescription": "\u20b93,200 for General/OBC male candidates; \u20b91,600 for all Female candidates and SC/ST/PwD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for female candidates and SC/ST/PwD.",
    "hasScholarship": true,
    "scholarshipDetails": "IITs provide 100% full tuition fee waiver for SC, ST, PwD, and economically backward students with family income < \u20b91 LPA. 2/3rd tuition waiver for income between \u20b91L \u2013 \u20b95L.",
    "applicationProcedure": [
      "Eligible top 2,50,000 candidates register online on jeeadv.ac.in after JEE Main results."
    ],
    "requiredDocuments": [
      "JEE Main Admit Card & Scorecard",
      "Class 10 Certificate",
      "Class 12 Marksheet",
      "Category Certificate"
    ],
    "importantDates": {
      "applicationOpening": "April 2026",
      "applicationDeadline": "May 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "June 2026",
      "counsellingOrInterview": "JoSAA multi-round counselling in June - July",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://jeeadv.ac.in/",
    "officialNotificationUrl": "https://jeeadv.ac.in/",
    "officialApplicationPortalUrl": "https://jeeadv.ac.in/",
    "officialSyllabusUrl": "https://jeeadv.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to all 23 Indian Institutes of Technology including IIT Madras (Consistently ranked #1 Overall Educational Institution in India by NIRF), IIT Bombay, IIT Delhi, and IIT Kharagpur.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science, Electrical, Mechanical, Aerospace, Chemical at IIT Madras (Chennai)",
        "B.Tech. / Dual Degree B.Tech.+M.Tech. across 23 IITs nationwide",
        "BS in Data Science & Artificial Intelligence / Physics / Mathematics",
        "B.Arch. through Architecture Aptitude Test (AAT) after qualifying JEE Advanced"
      ],
      "salaryOrStipend": "IIT Madras average B.Tech campus salary: \u20b921.48 LPA; Top international packages: \u20b91.2 Cr \u2013 \u20b92.1 Cr (Jane Street, Rubrik, Apple, Google, Qualcomm).",
      "careerAdvancement": "Global technological leadership, direct admission to world's top PhD programs (MIT, Stanford), and deep-tech entrepreneurship.",
      "counsellingProcess": "Joint Seat Allocation Authority (JoSAA) online counselling strictly based on Common Rank List (CRL) and Category Rank.",
      "statutoryQuotaBenefit": "Female supernumerary seats ensuring at least 20% female student enrollment in every IIT branch."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech / Dual Degree at IIT Madras and all 23 IITs"
      ],
      "participatingBodies": "Joint Admission Board (JAB) and 23 Indian Institutes of Technology",
      "selectionStepsAfterExam": [
        "1. Paper 1 & Paper 2 CBT examination.",
        "2. Subject-wise and aggregate qualifying marks cutoff publication.",
        "3. Common Rank List (CRL) and Category Rank List release.",
        "4. JoSAA centralized multi-round seat allotment."
      ],
      "expectedOutcome": "Admission to premier Indian Institute of Technology (IIT) with highest global standing.",
      "statutoryQuotaBenefit": "20% Female supernumerary quota and central statutory quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Deep conceptual Physics (Rotational Dynamics, Wave Optics, Electromagnetism), Advanced Mathematics (Complex Numbers, Calculus, Probability), Physical & Organic Chemistry reaction mechanisms."
      ],
      "recommendedFocus": [
        "Solving multi-concept questions",
        "Past 10 years JEE Advanced papers",
        "Partial marking strategy"
      ],
      "markingScheme": "Variable marking pattern with negative marking on wrong MCQs and partial marks for partially correct options.",
      "negativeMarking": "Negative marking applies on single/multi-correct questions",
      "durationMinutes": 360
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "IIT Joint Admission Board"
  },
  {
    "id": "neet-ug",
    "title": "National Eligibility cum Entrance Test (Undergraduate) (NEET UG)",
    "shortCode": "NEET UG",
    "conductingAuthority": "National Testing Agency (NTA)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Medical",
      "Dental"
    ],
    "purpose": "India's sole statutory national medical entrance examination for admission to undergraduate MBBS, BDS, BAMS, BHMS, BUMS, and BSMS (Siddha) courses across all government and private medical institutions.",
    "whoCanApply": "Candidates who have passed or are appearing in Class 12 with Physics, Chemistry, Biology/Biotechnology, and English.",
    "minimumQualification": "Passed Class 12 with Physics, Chemistry, Biology/Biotechnology, and English. Minimum 50% aggregate marks in PCB (40% for SC/ST/OBC-NCL, 45% for PwD).",
    "eligibleStreams": [
      "Class 12 Science (PCB)"
    ],
    "requiredSubjects": [
      "Physics",
      "Chemistry",
      "Biology (Botany & Zoology)"
    ],
    "minimumMarks": "50% aggregate in PCB for General; 40% for SC/ST/OBC",
    "ageCriteria": "Must have completed 17 years of age at the time of admission or on or before 31st December of admission year. No upper age limit per Supreme Court directive.",
    "ageMin": 17,
    "ageMax": null,
    "reservationSummary": "In All India Quota (15%): SC 15%, ST 7.5%, OBC-NCL 27%, EWS 10%, PwD 5%. In Tamil Nadu State Quota (85%): 69% communal reservation + 7.5% preferential reservation for Tamil Nadu Government school students.",
    "examinationMode": "Pen-and-Paper (OMR on Ballpoint Pen)",
    "examFormatDescription": "Single paper consisting of 200 Questions (attempt 180 Questions), 720 Total Marks, 3 Hours 20 Minutes (200 Minutes). Physics (Section A 35 Q, Section B 15 Q attempt 10 = 180 M); Chemistry (Section A 35 Q, Section B 15 Q attempt 10 = 180 M); Botany (35+10 Q = 180 M); Zoology (35+10 Q = 180 M). Correct: +4, Incorrect: -1.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1700,
    "feeReservedInr": 1000,
    "feeDescription": "\u20b91,700 for General; \u20b91,600 for General-EWS / OBC-NCL; \u20b91,000 for SC/ST/PwBD/Third Gender.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Reduced fee for reserved categories.",
    "hasScholarship": true,
    "scholarshipDetails": "7.5% Tamil Nadu Government school quota students receive 100% full tuition, hostel, and book fee waiver paid by Tamil Nadu State Government across both Government and Private Medical Colleges.",
    "applicationProcedure": [
      "Apply online on neet.nta.nic.in with Class 10/12 details, photo, postcard photo, and left/right thumb impressions."
    ],
    "requiredDocuments": [
      "Class 10 Certificate",
      "Class 12 Marksheet / Admit Card",
      "Category Certificate",
      "Bonafide Certificate (Classes 6-12 in TN Govt School for 7.5% quota)",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "February 2026",
      "applicationDeadline": "March 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "June 2026",
      "counsellingOrInterview": "July - September 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://neet.nta.nic.in/",
    "officialNotificationUrl": "https://neet.nta.nic.in/",
    "officialApplicationPortalUrl": "https://neet.nta.nic.in/",
    "officialSyllabusUrl": "https://neet.nta.nic.in/",
    "previousPapersUrl": "https://nta.ac.in/Downloads",
    "opportunityProvided": {
      "summary": "Sole gateway for admission to undergraduate medical and dental programs in 36 Government Medical Colleges in Tamil Nadu, AIIMS New Delhi, JIPMER Puducherry, and all recognized private and deemed medical universities.",
      "degreesOrPosts": [
        "MBBS (Bachelor of Medicine and Bachelor of Surgery - 5.5 Years with Compulsory Rotatory Internship)",
        "BDS (Bachelor of Dental Surgery - 5 Years in Government Dental College Chennai & private institutions)",
        "BSMS (Bachelor of Siddha Medicine and Surgery - Government Siddha Medical Colleges Palayamkottai & Chennai)",
        "BAMS (Ayurveda) / BHMS (Homeopathy) / BUMS (Unani)",
        "B.Sc. Nursing admissions in JIPMER Puducherry, BHU, and Military Nursing Services (MNS)"
      ],
      "salaryOrStipend": "Stipend of \u20b925,000/month during CRRI internship; Starting salary as Medical Officer / Assistant Surgeon: \u20b956,100 \u2013 \u20b91,12,400/month.",
      "careerAdvancement": "Direct pathway to clinical specialist practice, postgraduate medical residency (MD/MS via NEET PG / INI-CET), and medical services recruitment.",
      "counsellingProcess": "15% All India Quota counselled by Medical Counselling Committee (MCC); 85% State Quota counselled by Selection Committee DME Tamil Nadu on tnmedicalselection.net.",
      "statutoryQuotaBenefit": "7.5% of all government and private medical college seats reserved for Tamil Nadu Government school students with 100% government fee sponsorship."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "MBBS, BDS, BSMS Siddha across Tamil Nadu and AIIMS/JIPMER"
      ],
      "participatingBodies": "National Medical Commission (NMC), Dental Council of India, MCC, Selection Committee DME Tamil Nadu",
      "selectionStepsAfterExam": [
        "1. Pen-and-Paper OMR Examination.",
        "2. All India Rank (AIR) and 50th percentile qualifying score publication.",
        "3. MCC 15% All India Quota & Deemed University online counselling.",
        "4. DME Tamil Nadu 85% State Quota online counselling on tnmedicalselection.net."
      ],
      "expectedOutcome": "Admission to statutory medical doctor (MBBS) degree program.",
      "statutoryQuotaBenefit": "7.5% TN Govt School Quota with 100% full fee waiver and 69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NCERT Class 11 & 12 Biology (Diversity, Cell Biology, Genetics, Human Physiology, Ecology), Physics (Mechanics, Optics, Modern Physics), Chemistry (Organic Mechanisms, Equilibrium, Periodic Properties)."
      ],
      "recommendedFocus": [
        "Line-by-line mastery of NCERT Biology textbooks (delivers 340+ marks out of 360)",
        "Regular OMR bubbling practice",
        "Speed-solving numerical problems in Physics"
      ],
      "markingScheme": "180 Questions \u00d7 4 Marks = 720 Total Marks. 1 Mark deducted for each incorrect answer.",
      "negativeMarking": "-1 mark negative marking for wrong answers",
      "durationMinutes": 200
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "NTA Statutory Information Bulletin"
  },
  {
    "id": "cuet-ug",
    "title": "Common University Entrance Test (Undergraduate) (CUET UG)",
    "shortCode": "CUET UG",
    "conductingAuthority": "National Testing Agency (NTA)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Arts",
      "Science",
      "Commerce",
      "Management",
      "Computer Applications",
      "Agriculture",
      "Law",
      "Journalism and Media",
      "Social Work"
    ],
    "purpose": "National single-window entrance examination for admission into undergraduate degree programmes across all Central Universities (including Central University of Tamil Nadu, Delhi University, JNU, BHU) and participating state universities.",
    "whoCanApply": "Candidates who have passed Class 12 or equivalent in any stream with no age limit.",
    "minimumQualification": "Must have passed Class 12 (10+2) examination or appearing in Class 12 from a recognized board.",
    "eligibleStreams": [
      "Any Class 12 Stream (Science, Commerce, Arts)"
    ],
    "requiredSubjects": [
      "Candidate selects from: Section IA/IB Languages, Section II Domain Subjects (27 choices), Section III General Test"
    ],
    "minimumMarks": "Pass in Class 12 (Specific percentage depends on target university)",
    "ageCriteria": "No age limit for candidates appearing in CUET UG.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC-NCL (27%), EWS (10%), PwD (5%) applied by each participating university.",
    "examinationMode": "Hybrid (Pen-and-Paper OMR / Computer Based Test)",
    "examFormatDescription": "Modular examination: Section IA & IB (Languages - 40 Q attempt out of 50, 200 Marks, 45 Mins); Section II (Domain Subjects based on Class 12 NCERT - 40 Q attempt out of 50, 200 Marks, 45/60 Mins); Section III (General Test - 50 Q attempt out of 60, 250 Marks, 60 Mins). Correct: +5, Incorrect: -1.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 800,
    "feeDescription": "\u20b91,000 for General (up to 3 subjects); \u20b9900 for OBC-NCL/EWS; \u20b9800 for SC/ST/PwBD/Third Gender. Additional fee applies per extra subject.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Concessional rates for reserved categories.",
    "hasScholarship": true,
    "scholarshipDetails": "Central Sector Scholarship, Post-Matric Scholarship, and university merit-cum-means waivers applicable in central universities.",
    "applicationProcedure": [
      "Apply online on exams.nta.ac.in/CUET-UG selecting universities and subject combinations."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Admit Card",
      "Category Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "February 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "May 2026",
      "examinationDate": "May - June 2026",
      "resultDeclaration": "July 2026",
      "counsellingOrInterview": "Individual university admission portals in July - August",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://cuet.nta.nic.in/",
    "officialNotificationUrl": "https://cuet.nta.nic.in/",
    "officialApplicationPortalUrl": "https://cuet.nta.nic.in/",
    "officialSyllabusUrl": "https://cuet.nta.nic.in/",
    "opportunityProvided": {
      "summary": "Admission to premier Central Universities with low tuition fees, world-class libraries, and national student diversity.",
      "degreesOrPosts": [
        "B.A., B.Sc., B.Com. at Central University of Tamil Nadu (CUTN, Thiruvarur)",
        "Integrated M.Sc. / B.Sc. programmes in CUTN Thiruvarur",
        "B.A. (Hons), B.Com. (Hons), B.Sc. (Hons) at Delhi University (SRCC, St. Stephen's, Hindu, Lady Shri Ram)",
        "B.A. Foreign Languages at Jawaharlal Nehru University (JNU New Delhi)",
        "B.Sc. (Hons) Agriculture via ICAR AIQ quota participating through CUET UG",
        "5-Year Integrated B.A. LL.B. at Central Universities"
      ],
      "salaryOrStipend": "Graduate campus placements in top central universities: \u20b96 LPA to \u20b928 LPA (McKinsey, BCG, Bain, Big 4, Tech firms).",
      "careerAdvancement": "Premier preparation ground for civil services (UPSC), national research, and global scholarships (Rhodes, Chevening).",
      "counsellingProcess": "Normalized NTA percentile scorecards used by each university on their independent counselling portals (e.g. CSAS for DU, Samarth portal for CUTN).",
      "statutoryQuotaBenefit": "Central statutory reservation quotas across all central universities."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.A., B.Sc., B.Com., Integrated PG in 45+ Central Universities"
      ],
      "participatingBodies": "University Grants Commission (UGC), National Testing Agency (NTA), Central Universities",
      "selectionStepsAfterExam": [
        "1. Hybrid OMR / CBT Examination.",
        "2. NTA Scorecard and Percentile publication.",
        "3. Register on target university admission portals (e.g. CUTN Samarth).",
        "4. Merit list release and seat allotment."
      ],
      "expectedOutcome": "Admission to premier Central University degree program.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Section I: Reading comprehension, literary vocabulary. Section II Domain: Entire Class 12 NCERT syllabus only. Section III: GK, Current Affairs, Mental Ability, Numerical Reasoning."
      ],
      "recommendedFocus": [
        "NCERT Class 12 textbooks strictly for domain subjects",
        "General Test numerical aptitude and current affairs"
      ],
      "markingScheme": "+5 Marks for correct answer, -1 Mark for incorrect answer.",
      "negativeMarking": "-1 mark negative marking per wrong answer",
      "durationMinutes": 45
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "NTA Statutory Information Bulletin"
  },
  {
    "id": "gate-pg",
    "title": "Graduate Aptitude Test in Engineering (GATE)",
    "shortCode": "GATE",
    "conductingAuthority": "Indian Institute of Science (IISc) & 7 IITs on rotational basis",
    "authorityType": "Public University",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "national-entrance",
      "pg-research"
    ],
    "courseDisciplines": [
      "Engineering",
      "Science",
      "Architecture",
      "Research and PhD"
    ],
    "purpose": "National benchmark postgraduate engineering examination for M.Tech/PhD admissions in IITs, IISc, NITs and direct recruitment of Executive Engineers into Maharatna & Navratna PSUs.",
    "whoCanApply": "Candidates who have completed or are in the 3rd year or higher of any undergraduate degree in Engineering, Technology, Architecture, Science, Commerce, or Arts.",
    "minimumQualification": "B.E. / B.Tech. / B.Arch. / M.Sc. or pre-final / final year students in relevant disciplines.",
    "eligibleStreams": [
      "Engineering, Architecture, and Science graduates"
    ],
    "requiredSubjects": [
      "General Aptitude (15 Marks)",
      "Engineering Mathematics (13 Marks)",
      "Core Subject Discipline (72 Marks)"
    ],
    "minimumMarks": "Pass in qualifying degree",
    "ageCriteria": "No age limit for GATE.",
    "ageMin": 20,
    "ageMax": null,
    "reservationSummary": "Central government statutory reservations: SC, ST, OBC-NCL, EWS, and PwD in admissions and PSU recruitments.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single paper consisting of 65 Questions, 100 Marks, 3 Hours. Multiple Choice Questions (MCQ - negative marking applies), Multiple Select Questions (MSQ - no negative marking), and Numerical Answer Type (NAT - no negative marking). Virtual calculator provided on screen. Scorecard valid for 3 years.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1800,
    "feeReservedInr": 900,
    "feeDescription": "\u20b91,800 for General/OBC male candidates; \u20b9900 for Female candidates and SC/ST/PwD candidates per paper.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for female candidates and SC/ST/PwD.",
    "hasScholarship": true,
    "scholarshipDetails": "All GATE-qualified students admitted to M.Tech receive government AICTE / MHRD monthly stipend of \u20b912,400 per month for 24 months. Direct PhD admits receive \u20b937,000/month JRF.",
    "applicationProcedure": [
      "Apply online on the official GATE organizing institute portal (GOAPS)."
    ],
    "requiredDocuments": [
      "Degree Certificate / Pre-final Year Bonafide",
      "Photo & Signature",
      "Category Certificate"
    ],
    "importantDates": {
      "applicationOpening": "August 2025",
      "applicationDeadline": "October 2025",
      "admitCardRelease": "January 2026",
      "examinationDate": "February 2026",
      "resultDeclaration": "March 2026",
      "counsellingOrInterview": "COAP / CCMT Counselling & PSU Interviews in April - June",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://gate2026.iitg.ac.in/",
    "officialNotificationUrl": "https://gate2026.iitg.ac.in/",
    "officialApplicationPortalUrl": "https://gate2026.iitg.ac.in/",
    "officialSyllabusUrl": "https://gate2026.iitg.ac.in/",
    "previousPapersUrl": "https://gate2026.iitg.ac.in/",
    "opportunityProvided": {
      "summary": "Dual gateway for direct recruitment as Executive Engineer in Maharatna PSUs (\u20b915 \u2013 \u20b924 LPA) and master's admissions into Indian Institute of Science (IISc Bangalore) and IITs with \u20b912,400/month stipend.",
      "degreesOrPosts": [
        "Executive Engineer Trainee in ONGC, IOCL, BHEL, NTPC, PowerGrid, GAIL, HPCL, BPCL, BARC, ISRO",
        "M.Tech / M.S. in IIT Madras, IIT Bombay, IISc Bangalore, NIT Trichy with monthly \u20b912,400 government fellowship",
        "Direct Ph.D. in Engineering with monthly \u20b937,000 \u2013 \u20b942,000 JRF fellowship",
        "Cabinet Secretariat Government of India direct recruitment as Senior Field Officer (Technical)"
      ],
      "salaryOrStipend": "PSU Starting CTC: \u20b914.5 LPA to \u20b924.0 LPA (Executive Level E-2 / E-3) + Company Quarters + Performance Incentives.",
      "careerAdvancement": "Chief Engineer, General Manager, and Director in Public Sector Undertakings; Chief Technology Officer in industry.",
      "counsellingProcess": "Common Offer Acceptance Portal (COAP) for IITs; Centralized Counselling for M.Tech (CCMT) for NITs; Separate PSU application portals.",
      "statutoryQuotaBenefit": "Central reservation quotas in IIT M.Tech seats and PSU job vacancies."
    },
    "linkedOpportunities": {
      "opportunityType": "Government Employment",
      "targetProgrammesOrPosts": [
        "Executive Engineer in Maharatna PSUs & M.Tech in IITs/IISc"
      ],
      "participatingBodies": "IISc, 7 IITs, ONGC, IOCL, NTPC, BHEL, PowerGrid, BARC",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (100 Marks).",
        "2. Scorecard & All India Rank (AIR) publication.",
        "3. COAP / CCMT registration for Master's admission.",
        "4. Direct PSU shortlisting & interviews based on GATE score."
      ],
      "expectedOutcome": "Permanent PSU Executive Officer career or IIT Master's Degree.",
      "statutoryQuotaBenefit": "Central reservation quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "General Aptitude (15 M), Engineering Mathematics (13 M), Branch Technical Core (72 M)."
      ],
      "recommendedFocus": [
        "Mastering Engineering Mathematics and General Aptitude (28 guaranteed marks)",
        "Solving past 15 years GATE questions",
        "Virtual calculator numerical accuracy"
      ],
      "markingScheme": "1-mark questions (1/3 negative mark); 2-mark questions (2/3 negative mark). NAT and MSQ questions have NO negative marking.",
      "negativeMarking": "Negative marking applies on MCQs only",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "GATE Organizing Institute Portal"
  },
  {
    "id": "ugc-net-jrf",
    "title": "University Grants Commission National Eligibility Test & Junior Research Fellowship (UGC NET)",
    "shortCode": "UGC NET",
    "conductingAuthority": "National Testing Agency (NTA)",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Postgraduate",
      "Research / PhD",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "national-entrance",
      "pg-research"
    ],
    "courseDisciplines": [
      "Research and PhD",
      "Education and Teaching",
      "Arts",
      "Commerce",
      "Management",
      "Social Work",
      "Law",
      "Computer Applications",
      "Journalism and Media"
    ],
    "purpose": "National examination certifying eligibility for Assistant Professor and awarding Junior Research Fellowships (JRF) in Humanities, Social Sciences, Commerce, Management, and Languages.",
    "whoCanApply": "Candidates who have secured at least 55% marks in Master's Degree (50% for reserved categories). Final year PG students are also eligible.",
    "minimumQualification": "Master's Degree or equivalent with minimum 55% marks (50% for OBC-NCL, SC, ST, PwD).",
    "eligibleStreams": [
      "Postgraduate degree across 83 Humanities, Social Sciences, Commerce, Computer Science subjects"
    ],
    "requiredSubjects": [
      "Paper I: Teaching & Research Aptitude (100 Marks)",
      "Paper II: Domain Subject (200 Marks)"
    ],
    "minimumMarks": "55% in Master's Degree (50% for reserved)",
    "ageCriteria": "For JRF: Maximum 30 years as of 1st day of month of exam (5-year relaxation for SC/ST/OBC/Women). For Assistant Professor: NO upper age limit.",
    "ageMin": 21,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC-NCL (27%), EWS (10%), PwD (5%).",
    "examinationMode": "Computer Based Test (CBT - Single 3-Hour Session)",
    "examFormatDescription": "Single paper consisting of 150 Objective Questions (300 Marks, 3 Hours, No break). Paper I: General Teaching and Research Aptitude (50 Questions, 100 Marks). Paper II: Domain Subject (100 Questions, 200 Marks). Both papers have 2 marks per question. NO negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1150,
    "feeReservedInr": 325,
    "feeDescription": "\u20b91,150 for General; \u20b9600 for OBC-NCL/EWS; \u20b9325 for SC/ST/PwD/Third Gender.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Concession for reserved categories.",
    "hasScholarship": true,
    "scholarshipDetails": "Junior Research Fellowship (JRF) awardees receive \u20b937,000 per month for the first 2 years, escalating to Senior Research Fellowship (SRF) of \u20b942,000 per month for the next 3 years + HRA.",
    "applicationProcedure": [
      "Apply online on ugcnet.nta.ac.in (conducted twice yearly: June and December cycles)."
    ],
    "requiredDocuments": [
      "Master's Degree Certificate / Marksheet",
      "Category Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "April (June Cycle) / September (Dec Cycle)",
      "applicationDeadline": "May / October",
      "admitCardRelease": "1 week before exam",
      "examinationDate": "June / December",
      "resultDeclaration": "July / January",
      "counsellingOrInterview": "Direct University Ph.D. and Assistant Professor interviews",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://ugcnet.nta.nic.in/",
    "officialNotificationUrl": "https://ugcnet.nta.nic.in/",
    "officialApplicationPortalUrl": "https://ugcnet.nta.nic.in/",
    "officialSyllabusUrl": "https://www.ugcnetonline.in/syllabus-new.php",
    "previousPapersUrl": "https://ugcnet.nta.nic.in/",
    "opportunityProvided": {
      "summary": "Direct eligibility for Assistant Professor appointment in all Indian universities and prestigious Junior Research Fellowship (\u20b937,000/month) funding 5 full years of doctoral research.",
      "degreesOrPosts": [
        "National Eligibility for Assistant Professor in all Central, State, and Deemed Universities across India",
        "Junior Research Fellowship (JRF): \u20b937,000/month + HRA for 5 years (Total fellowship value: over \u20b925 Lakhs)",
        "Direct admission to Ph.D. programs without university entrance tests (Exemption from entrance)",
        "Direct eligibility for Teachers Recruitment Board (TRB) Tamil Nadu Assistant Professor recruitments"
      ],
      "salaryOrStipend": "JRF Stipend: \u20b937,000/month; Assistant Professor UGC Pay Level 10: \u20b957,700 \u2013 \u20b91,82,400/month.",
      "careerAdvancement": "Permanent academic tenure, Associate Professor, University Dean, and Vice-Chancellor.",
      "counsellingProcess": "Direct application with UGC NET scorecard to university recruitment boards and doctoral research committees.",
      "statutoryQuotaBenefit": "Central reservation quotas in fellowship awards and university faculties."
    },
    "linkedOpportunities": {
      "opportunityType": "Research Fellowship",
      "targetProgrammesOrPosts": [
        "UGC Junior Research Fellowship (\u20b937,000/mo) & Assistant Professorship"
      ],
      "participatingBodies": "University Grants Commission (UGC) and all recognized universities nationwide",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (300 Marks).",
        "2. Top 6% qualify for Assistant Professor; Top 1% qualify for JRF.",
        "3. Issue of E-Certificate and JRF Award Letter.",
        "4. Ph.D. registration and DBT fellowship activation."
      ],
      "expectedOutcome": "Fully funded doctoral research fellowship and statutory professorship license.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Paper I: Teaching Aptitude, Research Methodology, Reading Comprehension, Communication, Mathematical Reasoning, Logical Reasoning, Data Interpretation, ICT, Higher Education System. Paper II: Master level domain curriculum."
      ],
      "recommendedFocus": [
        "Scoring 75+ marks in Paper I (high-leverage scoring differentiator)",
        "Solving past 10 UGC NET papers",
        "Conceptual clarity in core Master's syllabus"
      ],
      "markingScheme": "150 Questions = 300 Marks. 2 Marks per question. No negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "UGC Statutory Portal"
  },
  {
    "id": "csir-ugc-net",
    "title": "Joint CSIR-UGC National Eligibility Test & Junior Research Fellowship in Sciences (CSIR NET)",
    "shortCode": "CSIR NET",
    "conductingAuthority": "National Testing Agency (NTA) on behalf of Council of Scientific and Industrial Research",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Postgraduate",
      "Research / PhD",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "national-entrance",
      "pg-research"
    ],
    "courseDisciplines": [
      "Research and PhD",
      "Science",
      "Education and Teaching"
    ],
    "purpose": "National examination determining eligibility for Junior Research Fellowship (JRF) and Assistant Professorship in physical, chemical, mathematical, and life sciences.",
    "whoCanApply": "M.Sc. or equivalent degree holders with minimum 55% marks (50% for reserved categories). B.Tech/B.Pharm/MBBS holders are also eligible for JRF.",
    "minimumQualification": "M.Sc. or equivalent degree / Integrated BS-MS / BE / B.Tech / B.Pharma with minimum 55% marks (50% for SC/ST/PwD).",
    "eligibleStreams": [
      "Chemical Sciences, Earth Sciences, Life Sciences, Mathematical Sciences, Physical Sciences"
    ],
    "requiredSubjects": [
      "Part A: General Science & Aptitude",
      "Part B: Subject MCQs",
      "Part C: Higher Order Scientific Problems"
    ],
    "minimumMarks": "55% in Master's degree (50% for reserved)",
    "ageCriteria": "For JRF: Maximum 30 years as of 1st day of month of exam (5-year relaxation for SC/ST/PwD/Women). For Lectureship: NO upper age limit.",
    "ageMin": 21,
    "ageMax": 35,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), OBC-NCL (27%), EWS (10%), PwD (5%).",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single paper consisting of Part A (General Science & Aptitude - 20 Q attempt 15 = 30 M), Part B (Subject concepts - 35-50 Q attempt 25-35 = 70 M), Part C (Higher-order scientific analytical questions - 60-75 Q attempt 20-25 = 100 M). Total 200 Marks. 25% negative marking applies.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1150,
    "feeReservedInr": 325,
    "feeDescription": "\u20b91,150 for General; \u20b9600 for OBC-NCL/EWS; \u20b9325 for SC/ST/PwD/Third Gender.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Concession for reserved categories.",
    "hasScholarship": true,
    "scholarshipDetails": "CSIR Junior Research Fellowship: \u20b937,000 per month for first 2 years, escalating to Senior Research Fellowship (SRF) \u20b942,000 per month + HRA + \u20b920,000 annual contingency.",
    "applicationProcedure": [
      "Apply online on csirnet.nta.ac.in."
    ],
    "requiredDocuments": [
      "M.Sc. Marksheet / Degree Certificate",
      "Category Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "March (June cycle) / September (Dec cycle)",
      "applicationDeadline": "April / October",
      "admitCardRelease": "1 week before exam",
      "examinationDate": "June / December",
      "resultDeclaration": "July / January",
      "counsellingOrInterview": "Direct PhD admission interviews by CSIR labs and universities",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://csirnet.nta.nic.in/",
    "officialNotificationUrl": "https://csirnet.nta.nic.in/",
    "officialApplicationPortalUrl": "https://csirnet.nta.nic.in/",
    "officialSyllabusUrl": "https://csirhrdg.res.in/",
    "opportunityProvided": {
      "summary": "Prestigious national scientific research fellowship funding full-time doctoral studies in CSIR national laboratories (CLRI Chennai, CECRI Karaikudi, CCMB, NCL), IISc Bangalore, and IIT Madras.",
      "degreesOrPosts": [
        "CSIR Junior Research Fellowship (\u20b937,000/month + HRA for 5 years)",
        "Direct PhD admission at CSIR Labs: Central Leather Research Institute (CLRI Chennai), CECRI Karaikudi",
        "National Eligibility for Assistant Professor in Science disciplines across Indian universities"
      ],
      "salaryOrStipend": "JRF Stipend: \u20b937,000/month + HRA; Assistant Professor Pay Level 10: \u20b957,700 \u2013 \u20b91,82,400/month.",
      "careerAdvancement": "Senior Scientist in CSIR National Labs, University Professor, and international post-doctoral research fellow.",
      "counsellingProcess": "Direct application to CSIR institutes and universities with CSIR JRF rank card.",
      "statutoryQuotaBenefit": "Central reservation quotas in fellowship distribution."
    },
    "linkedOpportunities": {
      "opportunityType": "Research Fellowship",
      "targetProgrammesOrPosts": [
        "CSIR JRF (\u20b937,000/mo) in 37 CSIR National Laboratories & IITs"
      ],
      "participatingBodies": "Council of Scientific and Industrial Research (CSIR) and 37 National Laboratories",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (200 Marks).",
        "2. CSIR JRF & Lectureship Rank List publication.",
        "3. Application to CSIR institutes (e.g. CLRI Adyar, CECRI Karaikudi).",
        "4. Ph.D. registration and DBT stipend activation."
      ],
      "expectedOutcome": "Prestigious scientific research fellowship funding doctoral research.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Part A: General Science, research design, graphical analysis. Part B & C: In-depth Master-level syllabus in chosen science domain (Chemical, Physical, Life, Mathematical, Earth)."
      ],
      "recommendedFocus": [
        "Part C higher-order analytical problems (highest score weighting: 100 marks)",
        "Standard scientific reference textbooks",
        "Past 5 years CSIR NET question papers"
      ],
      "markingScheme": "Total 200 Marks. 25% negative marking applies for wrong answers in Parts A, B, and C.",
      "negativeMarking": "25% negative marking for incorrect answers",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "CSIR HRDG Statutory Portal"
  },
  {
    "id": "cat-iim",
    "title": "Common Admission Test for Indian Institutes of Management (CAT)",
    "shortCode": "CAT",
    "conductingAuthority": "Indian Institutes of Management (IIMs) on rotational basis",
    "authorityType": "Public University",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Management",
      "Commerce",
      "Arts",
      "Science",
      "Engineering"
    ],
    "purpose": "India's premier computer-based management entrance test for admission to Master of Business Administration (MBA / PGDM) programs across all 21 IIMs (including IIM Tiruchirappalli) and top business schools.",
    "whoCanApply": "Bachelor's degree holders with at least 50% marks (45% for SC/ST/PwD). Final year students are eligible.",
    "minimumQualification": "Bachelor's Degree in any discipline with minimum 50% marks (45% for SC/ST/PwD).",
    "eligibleStreams": [
      "Any Graduate Stream (Engineering, Commerce, Science, Arts, Medicine)"
    ],
    "requiredSubjects": [
      "Verbal Ability & Reading Comprehension (VARC)",
      "Data Interpretation & Logical Reasoning (DILR)",
      "Quantitative Ability (QA)"
    ],
    "minimumMarks": "50% in Bachelor's degree (45% for SC/ST/PwD)",
    "ageCriteria": "No age limit for CAT.",
    "ageMin": 19,
    "ageMax": null,
    "reservationSummary": "Central government statutory reservations: SC (15%), ST (7.5%), NC-OBC (27%), EWS (10%), and PwD (5%) across all 21 IIMs.",
    "examinationMode": "Computer Based Test (CBT - 3 Shifts on Single Day)",
    "examFormatDescription": "Single paper consisting of 66 Questions, 198 Marks, 2 Hours (120 Minutes). Section 1: VARC (24 Q, 40 Mins); Section 2: DILR (20 Q, 40 Mins); Section 3: QA (22 Q, 40 Mins). Strict sectional time limit of 40 minutes per section. Correct: +3, Incorrect: -1 (MCQs). Non-MCQ TITA questions have NO negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 2500,
    "feeReservedInr": 1250,
    "feeDescription": "\u20b92,500 for General/EWS/NC-OBC; \u20b91,250 for SC/ST/PwD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for SC/ST/PwD.",
    "hasScholarship": true,
    "scholarshipDetails": "IIMs provide Need-Based Financial Assistance (NBFA) covering up to 100% tuition fees for students with family income < \u20b96 LPA. Government Central Sector Scholarship covers full fees for SC/ST.",
    "applicationProcedure": [
      "Apply online on iimcat.ac.in during August - September registration."
    ],
    "requiredDocuments": [
      "Graduation Marksheet / Pre-final Bonafide",
      "10th & 12th Marksheets",
      "Category Certificate",
      "Work Experience Certificates if applicable"
    ],
    "importantDates": {
      "applicationOpening": "August 2026",
      "applicationDeadline": "September 2026",
      "admitCardRelease": "October 2026",
      "examinationDate": "November 2026",
      "resultDeclaration": "December 2026",
      "counsellingOrInterview": "WAT & Personal Interview rounds from January - April",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://iimcat.ac.in/",
    "officialNotificationUrl": "https://iimcat.ac.in/",
    "officialApplicationPortalUrl": "https://iimcat.ac.in/",
    "officialSyllabusUrl": "https://iimcat.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to India's top 21 Indian Institutes of Management including IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and IIM Tiruchirappalli (Trichy), and FMS Delhi.",
      "degreesOrPosts": [
        "MBA / Post Graduate Programme in Management (PGPM) at IIM Tiruchirappalli (Tamil Nadu)",
        "MBA at IIM Ahmedabad, IIM Bangalore, IIM Calcutta (Top 3 IIMs)",
        "MBA in Faculty of Management Studies (FMS Delhi - Low fee \u20b92 Lakhs, Average package \u20b934 LPA)",
        "Executive MBA & Fellow Programme in Management (PhD)"
      ],
      "salaryOrStipend": "IIM Ahmedabad average campus placement: \u20b934.3 LPA; IIM Trichy average placement: \u20b920.55 LPA; Highest international packages: \u20b91.15 Crore (Investment Banking, Consulting, Tech).",
      "careerAdvancement": "Direct entry into tier-1 management consulting (McKinsey, BCG, Bain), investment banking (Goldman Sachs, Morgan Stanley), and product management leadership.",
      "counsellingProcess": "Shortlisting based on CAT percentile + Academic record followed by Written Ability Test (WAT) and Personal Interview (PI).",
      "statutoryQuotaBenefit": "Central statutory reservations in all 21 IIMs."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "MBA / PGDM in 21 IIMs (including IIM Trichy) & FMS Delhi"
      ],
      "participatingBodies": "Indian Institutes of Management (IIMs) & premier B-Schools",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (66 Questions).",
        "2. Scorecard & Percentile release in December.",
        "3. IIM Shortlisting for WAT & Personal Interview.",
        "4. Final Admission Offer based on composite score."
      ],
      "expectedOutcome": "Admission to premier Indian Institute of Management (IIM) with top corporate leadership trajectory.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "VARC: High-density reading comprehension passages, summary, para-jumbles. DILR: Complex arrangements, matrix puzzles, games & tournaments. QA: Arithmetic, Algebra, Geometry, Numbers."
      ],
      "recommendedFocus": [
        "Daily reading of Aeon Essays, The Guardian, and The Economist",
        "Solving 30+ full-length computer mock tests with 40-minute sectional discipline",
        "Arithmetic and algebra problem mastery"
      ],
      "markingScheme": "66 Questions \u00d7 3 Marks = 198 Marks. 1 Mark deducted for wrong MCQ answers.",
      "negativeMarking": "-1 mark negative marking on MCQs only",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "IIM CAT Convener Portal"
  },
  {
    "id": "clat-ug",
    "title": "Common Law Admission Test (Undergraduate) (CLAT UG)",
    "shortCode": "CLAT UG",
    "conductingAuthority": "Consortium of National Law Universities (NLUs)",
    "authorityType": "Public University",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Law",
      "Arts",
      "Commerce",
      "Social Work"
    ],
    "purpose": "National single-window entrance examination for admission into 5-year integrated undergraduate law degree programmes across 24 National Law Universities.",
    "whoCanApply": "Candidates who have passed or are appearing in Class 12 with at least 45% marks (40% for SC/ST).",
    "minimumQualification": "Passed 10+2 or equivalent examination with minimum 45% marks (40% for SC/ST candidates).",
    "eligibleStreams": [
      "Any Class 12 Stream (Science, Commerce, Arts, Humanities)"
    ],
    "requiredSubjects": [
      "English Language, Current Affairs & GK, Legal Reasoning, Logical Reasoning, Quantitative Techniques"
    ],
    "minimumMarks": "45% for General/OBC; 40% for SC/ST",
    "ageCriteria": "No upper age limit for appearing in CLAT UG.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "Statutory reservations for SC, ST, OBC, EWS, and PwD as per each NLU's state enactment. Tamil Nadu National Law University (TNNLU Trichy) offers state domicile reservation for TN students.",
    "examinationMode": "Pen-and-Paper (OMR on Ballpoint Pen)",
    "examFormatDescription": "Single paper consisting of 120 Comprehension-based Multiple Choice Questions (120 Marks, 2 Hours). English Language (24 Q, 20%); Current Affairs & GK (28 Q, 25%); Legal Reasoning (32 Q, 25%); Logical Reasoning (24 Q, 20%); Quantitative Techniques (12 Q, 10%). Correct: +1, Incorrect: -0.25.",
    "feeType": "Paid Application",
    "feeGeneralInr": 4000,
    "feeReservedInr": 3500,
    "feeDescription": "\u20b94,000 for General/OBC; \u20b93,500 for SC/ST/BPL/PwD candidates.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Reduced fee for reserved categories.",
    "hasScholarship": true,
    "scholarshipDetails": "Central Sector Scholarship, Post-Matric Scholarship, and NLU institutional fee waivers for economically weaker students.",
    "applicationProcedure": [
      "Apply online on consortiumofnlus.ac.in during July - October."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Admit Card",
      "Community Certificate",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "July 2025",
      "applicationDeadline": "October 2025",
      "admitCardRelease": "November 2025",
      "examinationDate": "December 2025",
      "resultDeclaration": "December 2025",
      "counsellingOrInterview": "Centralized NLU counselling in January - May 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://consortiumofnlus.ac.in/",
    "officialNotificationUrl": "https://consortiumofnlus.ac.in/",
    "officialApplicationPortalUrl": "https://consortiumofnlus.ac.in/",
    "officialSyllabusUrl": "https://consortiumofnlus.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to India's premier National Law Universities including NLSIU Bengaluru (Ranked #1 Law School in India), NALSAR Hyderabad, and Tamil Nadu National Law University (TNNLU, Tiruchirappalli).",
      "degreesOrPosts": [
        "B.A. LL.B. (Hons.) / B.Com. LL.B. (Hons.) at Tamil Nadu National Law University (TNNLU Tiruchirappalli)",
        "B.A. LL.B. (Hons.) at National Law School of India University (NLSIU Bengaluru)",
        "B.A. LL.B. (Hons.) at NALSAR Hyderabad, WBNUJS Kolkata, NLU Jodhpur",
        "5-Year Integrated Law across 24 National Law Universities nationwide"
      ],
      "salaryOrStipend": "Top tier law firm campus recruitment (Shardul Amarchand Mangaldas, Cyril Amarchand, AZB & Partners, Trilegal, Khaitan & Co): \u20b916 LPA to \u20b922 LPA starting packages.",
      "careerAdvancement": "Direct clerkships in Supreme Court of India, judicial service examinations (Civil Judge), and international corporate law practice.",
      "counsellingProcess": "Centralized multi-round online counselling conducted by the Consortium of NLUs based on All India Rank.",
      "statutoryQuotaBenefit": "State domicile reservation seats for Tamil Nadu students at TNNLU Tiruchirappalli."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "5-Year Integrated B.A. LL.B. in 24 National Law Universities"
      ],
      "participatingBodies": "Consortium of National Law Universities & Bar Council of India",
      "selectionStepsAfterExam": [
        "1. Pen-and-Paper OMR Examination (120 Marks).",
        "2. All India Rank (AIR) and Category Rank List publication.",
        "3. Centralized online seat allotment rounds.",
        "4. Admission and Document Verification at allocated NLU."
      ],
      "expectedOutcome": "Admission to premier National Law University (NLU) degree.",
      "statutoryQuotaBenefit": "TN State Domicile reservation at TNNLU Trichy + statutory communal quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Passage-based reading: Legal principles, Indian Constitutional law, Criminal Law, Contracts, Current Affairs, Critical Reasoning, Class 10 basic arithmetic."
      ],
      "recommendedFocus": [
        "Reading speed and passage comprehension (entire paper is passage-based)",
        "Daily editorial reading of The Hindu / Indian Express",
        "Practicing 40+ full mock tests in 120 minutes"
      ],
      "markingScheme": "120 Questions = 120 Marks. 1 Mark for correct, 0.25 Mark deducted for incorrect answer.",
      "negativeMarking": "-0.25 mark negative marking for wrong answer",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Consortium of NLUs Statutory Portal"
  },
  {
    "id": "nata-architecture",
    "title": "National Aptitude Test in Architecture (NATA)",
    "shortCode": "NATA",
    "conductingAuthority": "Council of Architecture (COA), New Delhi",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "National Entrance",
    "targetStages": [
      "Class 12",
      "Diploma / Polytechnic"
    ],
    "categories": [
      "govt-exams",
      "national-entrance"
    ],
    "courseDisciplines": [
      "Architecture",
      "Design"
    ],
    "purpose": "National statutory aptitude test mandatory for admission to the 5-year Bachelor of Architecture (B.Arch.) degree course in all recognized government, aided, and private architecture institutions across India.",
    "whoCanApply": "Passed 10+2 scheme with Physics, Chemistry and Mathematics as mandatory subjects OR 10+3 Diploma with Mathematics.",
    "minimumQualification": "Passed Class 12 with Physics, Chemistry, and Mathematics (PCM) OR passed 10+3 Diploma with Mathematics. Valid NATA score is statutory prerequisite for B.Arch admission.",
    "eligibleStreams": [
      "Class 12 PCM / 10+3 Diploma with Maths"
    ],
    "requiredSubjects": [
      "Drawing and Visual Composition",
      "Mathematics",
      "Aptitude & Architectural Awareness"
    ],
    "minimumMarks": "Pass in Class 12 PCM / 10+3 Diploma",
    "ageCriteria": "No age limit for appearing in NATA.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "Applied during state single-window counseling (e.g. 69% reservation in TNEA B.Arch).",
    "examinationMode": "Hybrid (Part A: Drawing on paper + Part B: CBT online)",
    "examFormatDescription": "Single examination in two parts (Total 200 Marks, 3 Hours). Part A: Drawing and Composition Test (Offline on paper - 80 Marks, 90 Mins). Part B: Computer Based Test covering Visual Reasoning, Logical Aptitude, Architectural Awareness (120 Marks, 90 Mins). Scorecard valid for 2 academic years.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1750,
    "feeReservedInr": 1250,
    "feeDescription": "\u20b91,750 for Single attempt (General/OBC); \u20b91,250 for SC/ST. Reduced combo fee for multiple attempts.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Concession for SC/ST.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Apply online on nata.in for weekend test slots (offered multiple times between April and July)."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "March 2026",
      "applicationDeadline": "June 2026 (rolling phases)",
      "admitCardRelease": "Available for slot booking",
      "examinationDate": "Multiple weekend phases from April to July 2026",
      "resultDeclaration": "Scorecard valid for 2 academic years",
      "counsellingOrInterview": "TNEA Architecture Counselling in July \u2013 August",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.nata.in/",
    "officialNotificationUrl": "https://www.nata.in/",
    "officialApplicationPortalUrl": "https://www.nata.in/",
    "officialSyllabusUrl": "https://www.nata.in/",
    "opportunityProvided": {
      "summary": "Mandatory statutory eligibility for admission to the 5-year Bachelor of Architecture (B.Arch.) degree across all government and private architecture schools in Tamil Nadu and India.",
      "degreesOrPosts": [
        "B.Arch. at School of Architecture and Planning (SAP Anna University Chennai)",
        "B.Arch. in 50+ Architecture Colleges in Tamil Nadu (TNEA Single Window B.Arch counselling)",
        "B.Arch. across CEPT University Ahmedabad, Sir JJ College of Architecture Mumbai, and national institutes"
      ],
      "salaryOrStipend": "Architectural designer starting salary: \u20b94.5 LPA \u2013 \u20b912 LPA; Registered Architect under Council of Architecture (COA) with lifetime license to practice and design building blueprints.",
      "careerAdvancement": "Chief Architect, Urban Planner, Heritage Conservationist, and licensed architectural consultant.",
      "counsellingProcess": "Conducted by TNEA Architecture Counselling based on 50% Board exam marks + 50% NATA score out of 400 cutoff.",
      "statutoryQuotaBenefit": "69% communal reservation in Tamil Nadu single-window B.Arch counseling."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Arch. in SAP Anna University and all COA-approved institutions"
      ],
      "participatingBodies": "Council of Architecture (COA) & Anna University",
      "selectionStepsAfterExam": [
        "1. Drawing and CBT Aptitude Examination.",
        "2. NATA Scorecard publication (Valid for 2 years).",
        "3. Register for TNEA B.Arch Single Window Counselling.",
        "4. Merit cutoff calculation (50% 12th + 50% NATA) and seat allotment."
      ],
      "expectedOutcome": "Admission to professional Council of Architecture recognized B.Arch degree.",
      "statutoryQuotaBenefit": "69% communal reservation."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Part A: Freehand sketching, 2D/3D composition, perspective drawing, light & shadow. Part B: Visual reasoning, architectural terminology, famous monuments, basic physics and maths."
      ],
      "recommendedFocus": [
        "Daily 1-point and 2-point perspective sketching",
        "Visual memory and architectural heritage recognition"
      ],
      "markingScheme": "Part A (Drawing): 80 Marks. Part B (CBT): 120 Marks. Total: 200 Marks. Minimum 70 marks required to qualify.",
      "negativeMarking": "No negative marking in Part B",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "COA Statutory Portal"
  },
  {
    "id": "kree-kalasalingam",
    "title": "Kalasalingam Academy of Research and Education Entrance Examination (KREE)",
    "shortCode": "KREE",
    "conductingAuthority": "Kalasalingam Academy of Research and Education (Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12",
      "Diploma / Polytechnic"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Agriculture",
      "Architecture"
    ],
    "purpose": "Institution entrance test for admission to B.Tech, B.Arch, and B.Sc Agriculture programmes at Kalasalingam University, Krishnankoil, Virudhunagar district.",
    "whoCanApply": "Candidates who have passed Class 12 with Physics, Chemistry, and Mathematics/Biology.",
    "minimumQualification": "Passed Class 12 with minimum 50% aggregate in PCM / PCB.",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Mathematics / Biology",
      "Physics",
      "Chemistry"
    ],
    "minimumMarks": "50% in PCM/PCB",
    "ageCriteria": "Candidates born on or after 1st July 2004.",
    "ageMin": 17,
    "ageMax": 23,
    "reservationSummary": "Kalasalingam Special Scholarship: 100% full fee waiver for top 10 KREE rankers; 50% waiver for state rank holders and JEE Main 90+ percentile students.",
    "examinationMode": "Online Computer Based Examination",
    "examFormatDescription": "100 Multiple Choice Questions (100 Marks, 2 Hours). Maths/Bio: 50 Q; Physics: 25 Q; Chemistry: 25 Q. No negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 600,
    "feeReservedInr": 600,
    "feeDescription": "Application Fee: \u20b9600 online payment.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Scholarship for top scorers.",
    "hasScholarship": true,
    "scholarshipDetails": "Up to 100% tuition waiver for rankers; special concessions for southern Tamil Nadu rural school students.",
    "applicationProcedure": [
      "Apply online on kalasalingam.ac.in."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December 2025",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Direct counseling and scholarship allocation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://kalasalingam.ac.in/",
    "officialNotificationUrl": "https://kalasalingam.ac.in/",
    "officialApplicationPortalUrl": "https://kalasalingam.ac.in/",
    "officialSyllabusUrl": "https://kalasalingam.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to prominent deemed university in southern Tamil Nadu (Ranked #36 NIRF University) with ABET-accredited engineering programs and ICAR-accredited agriculture degrees.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science and Engineering",
        "B.Sc. (Hons) Agriculture (ICAR Accredited)",
        "B.Tech. in Biotechnology / Robotics & Automation",
        "B.Arch. (via NATA)"
      ],
      "salaryOrStipend": "Average campus package: \u20b95.2 LPA; Highest offer: \u20b950 LPA (Amazon, TCS, Tech Mahindra).",
      "careerAdvancement": "Core engineering and agribusiness corporate placements.",
      "counsellingProcess": "Merit rank counseling on university admissions portal.",
      "statutoryQuotaBenefit": "Merit scholarships for southern Tamil Nadu students."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech & B.Sc Agriculture at Kalasalingam University"
      ],
      "participatingBodies": "Kalasalingam Academy of Research and Education",
      "selectionStepsAfterExam": [
        "1. Online CBT.",
        "2. Merit Rank List.",
        "3. Scholarship Allocation."
      ],
      "expectedOutcome": "Accredited engineering and agriculture degree admission.",
      "statutoryQuotaBenefit": "Institutional merit waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 11 & 12 Physics, Chemistry, Mathematics/Biology."
      ],
      "recommendedFocus": [
        "Basic conceptual formulas and numericals"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Kalasalingam Admissions Office"
  },
  {
    "id": "hitseee-hindustan",
    "title": "Hindustan Institute of Technology and Science Engineering Entrance Examination (HITSEEE)",
    "shortCode": "HITSEEE",
    "conductingAuthority": "Hindustan Institute of Technology and Science (HITS Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Aviation",
      "Architecture"
    ],
    "purpose": "Entrance examination for admission to aeronautical, aerospace, computing, and automobile engineering programmes at HITS, Padur, Chennai.",
    "whoCanApply": "Class 12 pass students with minimum 50% in Physics, Chemistry, and Mathematics.",
    "minimumQualification": "Passed Class 12 with minimum 50% aggregate in PCM.",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Physics",
      "Chemistry",
      "Mathematics"
    ],
    "minimumMarks": "50% in PCM",
    "ageCriteria": "Candidates born on or after 1st July 2004.",
    "ageMin": 17,
    "ageMax": 23,
    "reservationSummary": "Dr. K.C.G. Verghese Merit Scholarship: 100% full tuition waiver for top 25 HITSEEE rankers.",
    "examinationMode": "Online Computer Based Examination",
    "examFormatDescription": "120 Multiple Choice Questions (120 Marks, 2 Hours). Physics: 40 Q; Chemistry: 40 Q; Mathematics: 40 Q. No negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1200,
    "feeReservedInr": 1200,
    "feeDescription": "Application Fee: \u20b91,200 online payment.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Merit scholarships for top rankers.",
    "hasScholarship": true,
    "scholarshipDetails": "100% tuition waiver for ranks 1-25; 75% waiver for ranks 26-50; 50% waiver for ranks 51-100.",
    "applicationProcedure": [
      "Apply online on hindustanuniv.ac.in."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December 2025",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Online counselling in June 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://hindustanuniv.ac.in/",
    "officialNotificationUrl": "https://hindustanuniv.ac.in/",
    "officialApplicationPortalUrl": "https://hindustanuniv.ac.in/",
    "officialSyllabusUrl": "https://hindustanuniv.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to premier aeronautical and aerospace engineering programs with flight simulator training and airline placements.",
      "degreesOrPosts": [
        "B.Tech. Aeronautical Engineering / Aerospace Engineering",
        "B.Tech. Computer Science and Engineering (AI & ML)",
        "B.Tech. Automobile Engineering / Electric Vehicle Technology"
      ],
      "salaryOrStipend": "Average campus package: \u20b95.5 LPA; Highest offer: \u20b940 LPA (Airbus, Boeing, HAL, Infosys).",
      "careerAdvancement": "Aircraft maintenance, aviation technical design, and global aerospace engineering.",
      "counsellingProcess": "Counseling based on HITSEEE rank.",
      "statutoryQuotaBenefit": "Merit scholarship waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech at Hindustan University Chennai"
      ],
      "participatingBodies": "Hindustan Institute of Technology and Science",
      "selectionStepsAfterExam": [
        "1. Online CBT.",
        "2. Rank List.",
        "3. Branch Allotment."
      ],
      "expectedOutcome": "Admission to specialized aeronautical and engineering degrees.",
      "statutoryQuotaBenefit": "Institutional merit waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 11 & 12 Physics, Chemistry, and Mathematics."
      ],
      "recommendedFocus": [
        "Physics mechanics and mathematics vectors/calculus"
      ],
      "markingScheme": "120 Questions = 120 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Hindustan Admissions Directorate"
  },
  {
    "id": "vee-vels",
    "title": "Vels University Entrance Examination (VEE)",
    "shortCode": "VEE",
    "conductingAuthority": "Vels Institute of Science, Technology & Advanced Studies (VISTAS Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12",
      "Undergraduate"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Pharmacy",
      "Maritime Studies",
      "Law",
      "Management"
    ],
    "purpose": "Institution entrance test for admission to B.Tech, B.Pharm, Maritime Studies (DG Shipping approved), Law, and MBA programmes at Vels University, Pallavaram, Chennai.",
    "whoCanApply": "Candidates who have passed Class 12 with relevant subjects for UG; Degree holders for MBA/Law.",
    "minimumQualification": "Passed Class 12 with 50% in PCM / PCB for engineering/pharmacy; Degree for MBA.",
    "eligibleStreams": [
      "Science, Commerce, or Arts depending on programme"
    ],
    "requiredSubjects": [
      "Programme specific: Physics, Chemistry, Maths/Biology or General Aptitude"
    ],
    "minimumMarks": "50% in qualifying examination",
    "ageCriteria": "Candidates born on or after 1st July 2004.",
    "ageMin": 17,
    "ageMax": 25,
    "reservationSummary": "Dr. Ishari K. Ganesh Scholarship: 100% full fee waiver for top 100 rankers.",
    "examinationMode": "Online Computer Based Examination",
    "examFormatDescription": "100 Multiple Choice Questions (100 Marks, 90 Minutes). No negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 1000,
    "feeDescription": "Application Fee: \u20b91,000 online payment.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Scholarship for top rankers.",
    "hasScholarship": true,
    "scholarshipDetails": "Vels Merit Scholarship: 10% to 100% tuition fee waiver based on VEE score and Class 12 marks.",
    "applicationProcedure": [
      "Apply online on velsuniv.ac.in."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "January 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Direct admission counselling in June 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://vistas.ac.in/",
    "officialNotificationUrl": "https://vistas.ac.in/",
    "officialApplicationPortalUrl": "https://vistas.ac.in/",
    "officialSyllabusUrl": "https://vistas.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to diverse professional programs including DG Shipping-approved Marine Engineering, B.Pharm, and 5-Year Integrated Law in Chennai.",
      "degreesOrPosts": [
        "B.Tech. Marine Engineering (DG Shipping approved with ship training)",
        "B.Pharm. (Pharmacy Council of India approved)",
        "B.Tech. in Computer Science / Artificial Intelligence",
        "B.A. LL.B. (Hons) / B.B.A. LL.B. (Hons) / MBA"
      ],
      "salaryOrStipend": "Marine engineering campus packages: $1,200 \u2013 $2,500/month aboard international merchant ships; IT packages: \u20b94.5 LPA \u2013 \u20b912 LPA.",
      "careerAdvancement": "Merchant Navy Deck Officer, Marine Chief Engineer, and Pharmaceutical Production Manager.",
      "counsellingProcess": "Counseling based on VEE rank and interview for maritime programs.",
      "statutoryQuotaBenefit": "Institutional scholarship quotas."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "Marine Engineering, B.Pharm, Law, MBA at Vels University"
      ],
      "participatingBodies": "Vels Institute of Science, Technology & Advanced Studies",
      "selectionStepsAfterExam": [
        "1. Online CBT.",
        "2. Medical Fitness (for Marine).",
        "3. Seat Allotment."
      ],
      "expectedOutcome": "Admission to professional degree programmes with campus placement.",
      "statutoryQuotaBenefit": "Institutional merit waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Basic Mathematics, Physics, Chemistry, and Aptitude."
      ],
      "recommendedFocus": [
        "Basic conceptual clarity in science subjects"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 90
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Vels University Admissions"
  },
  {
    "id": "kee-karunya",
    "title": "Karunya Entrance Examination (KEE)",
    "shortCode": "KEE",
    "conductingAuthority": "Karunya Institute of Technology and Sciences (Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Agriculture"
    ],
    "purpose": "Institution entrance test for admission to B.Tech, B.Sc Agriculture, and Biotechnology programmes at Karunya University, Coimbatore.",
    "whoCanApply": "Class 12 students with at least 50% aggregate marks in PCM / PCB.",
    "minimumQualification": "Passed Class 12 with minimum 50% aggregate in PCM / PCB.",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Mathematics / Biology (40 Q)",
      "Physics (20 Q)",
      "Chemistry (20 Q)",
      "General Aptitude (10 Q)",
      "Christian Values / Ethics (10 Q)"
    ],
    "minimumMarks": "50% in PCM/PCB",
    "ageCriteria": "Candidates born on or after 1st July 2004.",
    "ageMin": 17,
    "ageMax": 23,
    "reservationSummary": "Karunya Institutional Scholarships: \u20b940,000 to \u20b91,20,000 per year fee waiver based on Class 12 Board exam percentage and KEE score.",
    "examinationMode": "Online Computer Based Examination",
    "examFormatDescription": "100 Multiple Choice Questions (100 Marks, 2 Hours). Mathematics/Biology: 40 Q; Physics: 20 Q; Chemistry: 20 Q; Aptitude: 10 Q; General Ethics: 10 Q. No negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 1000,
    "feeDescription": "Application Fee: \u20b91,000 payable online.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Scholarship based on Board marks.",
    "hasScholarship": true,
    "scholarshipDetails": "\u20b91,20,000/year waiver for students with 95%+ in Class 12; \u20b960,000/year waiver for 90%+ in Class 12.",
    "applicationProcedure": [
      "Apply online on karunya.edu."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December 2025",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Online counselling and scholarship confirmation",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.karunya.edu/",
    "officialNotificationUrl": "https://www.karunya.edu/",
    "officialApplicationPortalUrl": "https://www.karunya.edu/admissions",
    "officialSyllabusUrl": "https://www.karunya.edu/",
    "opportunityProvided": {
      "summary": "Admission to Karunya University Coimbatore (Ranked #101 in NIRF Engineering) known for water research, biomedical engineering, and agriculture.",
      "degreesOrPosts": [
        "B.Tech. Computer Science and Engineering",
        "B.Sc. (Hons) Agriculture",
        "B.Tech. Biomedical Engineering / Biotechnology",
        "B.Tech. Robotics and Artificial Intelligence"
      ],
      "salaryOrStipend": "Average campus package: \u20b95.2 LPA; Highest offer: \u20b942 LPA (Amazon, Infosys, Cognizant, Siemens).",
      "careerAdvancement": "Biotechnology research, healthcare instrumentation, and global Christian institution exchange programs.",
      "counsellingProcess": "Online branch allotment and scholarship confirmation based on KEE rank.",
      "statutoryQuotaBenefit": "Institutional merit and minority scholarships."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech & B.Sc Agriculture at Karunya Coimbatore"
      ],
      "participatingBodies": "Karunya Institute of Technology and Sciences",
      "selectionStepsAfterExam": [
        "1. Online CBT.",
        "2. Merit Rank List.",
        "3. Scholarship Confirmation."
      ],
      "expectedOutcome": "Admission to recognized private university with campus placement.",
      "statutoryQuotaBenefit": "Institutional merit fee waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 11 & 12 Physics, Chemistry, Mathematics/Biology, and Basic Aptitude."
      ],
      "recommendedFocus": [
        "Mathematics and general aptitude"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Karunya Admissions Directorate"
  },
  {
    "id": "snucee-chennai",
    "title": "Shiv Nadar University Chennai Entrance Examination (SNUCEE)",
    "shortCode": "SNUCEE",
    "conductingAuthority": "Shiv Nadar University Chennai (State Private University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Commerce",
      "Arts",
      "Science"
    ],
    "purpose": "Entrance examination and personal interview for admission into high-calibre B.Tech, B.Com, and B.Sc Economics programmes at Shiv Nadar University, OMR, Kalavakkam, Chennai.",
    "whoCanApply": "Class 12 students with at least 75% aggregate marks in PCM (or relevant subjects for Commerce/Economics).",
    "minimumQualification": "Passed Class 12 with minimum 75% aggregate marks.",
    "eligibleStreams": [
      "Class 12 Science (PCM) for B.Tech; Commerce/Any for B.Com/Economics"
    ],
    "requiredSubjects": [
      "Mathematics, Physics, Chemistry for Engineering; Aptitude & Data Analysis for Commerce"
    ],
    "minimumMarks": "75% in Class 12",
    "ageCriteria": "Candidates born on or after 1st July 2004.",
    "ageMin": 17,
    "ageMax": 22,
    "reservationSummary": "Shiv Nadar Foundation Merit Scholarship: 100% full tuition, hostel, and mess fee waiver for top rankers and students with family income < \u20b93 LPA.",
    "examinationMode": "Computer Based Test (CBT) followed by Personal Interview",
    "examFormatDescription": "Two-stage selection: Stage 1: SNUCEE Computer Based Test (90 Minutes - Aptitude 45 Mins + Domain Subject 45 Mins). Stage 2: Personal Interview with faculty panel. No negative marking in CBT.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1500,
    "feeReservedInr": 1500,
    "feeDescription": "Application Fee: \u20b91,500 payable online.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Foundation scholarship for high scorers.",
    "hasScholarship": true,
    "scholarshipDetails": "Shiv Nadar Foundation covers up to 100% tuition and living expenses for meritorious students from rural and underprivileged backgrounds.",
    "applicationProcedure": [
      "Apply online on snuchennai.edu.in."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December 2025",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking before test",
      "examinationDate": "Multiple weekend phases: April - May 2026",
      "resultDeclaration": "Within 2 weeks of interview",
      "counsellingOrInterview": "Online / In-person Faculty Interview",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.snuchennai.edu.in/",
    "officialNotificationUrl": "https://www.snuchennai.edu.in/",
    "officialApplicationPortalUrl": "https://www.snuchennai.edu.in/admissions/",
    "officialSyllabusUrl": "https://www.snuchennai.edu.in/",
    "opportunityProvided": {
      "summary": "Elite higher education backed by HCL founder Shiv Nadar with Ivy-League curriculum, small class sizes, high faculty-student ratio, and tier-1 product firm hiring.",
      "degreesOrPosts": [
        "B.Tech. in Artificial Intelligence and Data Science",
        "B.Tech. in Computer Science and Engineering (Cyber Security / IoT)",
        "B.Com. (Professional Accounting with US CPA / ACCA integration)",
        "B.Sc. (Economics - Data Science aligned)"
      ],
      "salaryOrStipend": "Average campus package: \u20b912.8 LPA; Highest domestic offer: \u20b964 LPA (HCLTech, Goldman Sachs, Amazon, Microsoft, PayPal).",
      "careerAdvancement": "Direct recruitment into international fintech, global quantitative hedge funds, and top US Master's admissions.",
      "counsellingProcess": "Admission offer based on combined SNUCEE score + Personal Interview.",
      "statutoryQuotaBenefit": "Foundation full fee waivers."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech & B.Com at Shiv Nadar University Chennai"
      ],
      "participatingBodies": "Shiv Nadar Foundation & HCL Technologies",
      "selectionStepsAfterExam": [
        "1. SNUCEE CBT.",
        "2. Faculty Personal Interview.",
        "3. Admission Offer."
      ],
      "expectedOutcome": "Admission to elite private university with high corporate backing.",
      "statutoryQuotaBenefit": "Shiv Nadar Foundation scholarship."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Analytical Aptitude, Class 12 Advanced Physics and Mathematics concepts."
      ],
      "recommendedFocus": [
        "Conceptual clarity in mathematics",
        "Confidence and communication for faculty interview"
      ],
      "markingScheme": "90 Minutes CBT + Interview evaluation. No negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 90
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SNU Chennai Admissions Portal"
  },
  {
    "id": "amet-cet",
    "title": "Academy of Maritime Education and Training Common Entrance Test (AMET CET)",
    "shortCode": "AMET CET",
    "conductingAuthority": "AMET Deemed to be University, Kanathur, Chennai",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12",
      "Diploma / Polytechnic",
      "Undergraduate"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Maritime Studies",
      "Engineering"
    ],
    "purpose": "Entrance examination and DG Shipping medical screening for admission into Marine Engineering, Nautical Science, and Naval Architecture programmes at India's first dedicated maritime university.",
    "whoCanApply": "Class 12 pass students with Physics, Chemistry, and Mathematics with minimum 60% aggregate and 50% in English, meeting DG Shipping medical eyesight standards.",
    "minimumQualification": "Passed Class 12 with minimum 60% in PCM and 50% in English. Strict 6/6 eyesight with no color blindness for Nautical Science.",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Physics",
      "Chemistry",
      "Mathematics",
      "English"
    ],
    "minimumMarks": "60% aggregate in PCM and 50% in English",
    "ageCriteria": "17 to 25 years as of entry date (per DG Shipping rules).",
    "ageMin": 17,
    "ageMax": 25,
    "reservationSummary": "Institutional maritime scholarships for female cadets and wards of seafarers.",
    "examinationMode": "Online Computer Based Examination + DG Shipping Medical Test",
    "examFormatDescription": "100 Multiple Choice Questions (100 Marks, 90 Minutes). Physics (25 Q), Chemistry (25 Q), Mathematics (25 Q), English & General Aptitude (25 Q). Followed by DG Shipping approved medical doctor physical check-up.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 1000,
    "feeDescription": "Application Fee: \u20b91,000 payable online.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Scholarship for female cadets (to promote women in maritime).",
    "hasScholarship": true,
    "scholarshipDetails": "Shree Janakiraman Scholarship: Up to 50% tuition waiver for meritorious cadets and 75% fee waiver for female marine engineering cadets.",
    "applicationProcedure": [
      "Apply online on ametuniv.ac.in."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet",
      "Passport (mandatory for maritime)",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "January 2026",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "DG Shipping Medical checkup and counseling in June 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.ametuniv.ac.in/",
    "officialNotificationUrl": "https://www.ametuniv.ac.in/",
    "officialApplicationPortalUrl": "https://www.ametuniv.ac.in/admissions.html",
    "officialSyllabusUrl": "https://www.ametuniv.ac.in/",
    "opportunityProvided": {
      "summary": "Directorate General of Shipping (DG Shipping, Govt of India) approved maritime education directly leading to international merchant navy careers as Ship Captain or Chief Marine Engineer with tax-free foreign currency earnings.",
      "degreesOrPosts": [
        "B.E. Marine Engineering (4 Years - Residential with ship simulator training)",
        "B.Sc. Nautical Science (3 Years - Cadet training for ship navigation)",
        "B.E. Naval Architecture and Offshore Engineering",
        "Diploma in Nautical Science (DNS - Leading to 2nd Mate Foreign Going)"
      ],
      "salaryOrStipend": "Cadet ship stipend: $500 \u2013 $800/month; 3rd Officer / 4th Engineer salary: $2,500 \u2013 $4,500/month; Chief Engineer / Captain: $10,000 \u2013 $15,000/month (100% Tax-Free under NRI status).",
      "careerAdvancement": "Global Merchant Navy Captain, Marine Superintendent, Port Pilot, and Offshore Oil Rig Manager.",
      "counsellingProcess": "AMET CET rank + DG Shipping Medical Examination certificate.",
      "statutoryQuotaBenefit": "Institutional female cadet scholarship."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.E. Marine Engineering & B.Sc Nautical Science at AMET Chennai"
      ],
      "participatingBodies": "Directorate General of Shipping (DG Shipping) & AMET University",
      "selectionStepsAfterExam": [
        "1. Online CBT.",
        "2. DG Shipping Approved Medical Fitness.",
        "3. Cadet Sponsorship / Admission."
      ],
      "expectedOutcome": "International Merchant Navy license and career.",
      "statutoryQuotaBenefit": "Maritime industry sponsorship."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Class 11 & 12 Physics, Chemistry, Mathematics, and English."
      ],
      "recommendedFocus": [
        "Physics mechanics and optics",
        "Fluent English communication for ship bridge interviews",
        "6/6 eyesight test"
      ],
      "markingScheme": "100 Questions = 100 Marks. No negative marks.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 90
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "AMET Admissions Directorate"
  },
  {
    "id": "tancet-mba-mca",
    "title": "Tamil Nadu Common Entrance Test for MBA and MCA (TANCET)",
    "shortCode": "TANCET",
    "conductingAuthority": "Anna University, Chennai on behalf of Government of Tamil Nadu",
    "authorityType": "Tamil Nadu State Government",
    "isGovernment": true,
    "levelClassification": "State-Level",
    "targetStages": [
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "state-level",
      "pg-research"
    ],
    "courseDisciplines": [
      "Management",
      "Computer Applications",
      "Commerce",
      "Arts",
      "Science",
      "Engineering"
    ],
    "purpose": "State single window entrance examination for admission into Master of Business Administration (MBA) and Master of Computer Applications (MCA) degree programmes in Anna University departments, government, aided, and self-financing colleges in Tamil Nadu.",
    "whoCanApply": "Candidates who hold any recognized Bachelor's degree of minimum 3 years duration with at least 50% marks (45% for reserved categories).",
    "minimumQualification": "Bachelor's Degree with minimum 50% marks (45% for BC, BCM, MBC, SC, SCA, ST). For MCA: Mathematics at 10+2 or Graduation level mandatory.",
    "eligibleStreams": [
      "Any Graduate Stream (Commerce, Arts, Science, Engineering, Computer Science)"
    ],
    "requiredSubjects": [
      "For MBA: Business Analysis, Reading Comprehension, Quantitative Aptitude, Data Sufficiency, English Grammar. For MCA: Quantitative Ability, Analytical Reasoning, Logical Reasoning, Basic Computer Knowledge."
    ],
    "minimumMarks": "50% in Bachelor's degree (45% for reserved)",
    "ageCriteria": "No age limit for TANCET.",
    "ageMin": 20,
    "ageMax": null,
    "reservationSummary": "69% Tamil Nadu communal reservation applied in university and government college seat allocation.",
    "examinationMode": "Pen-and-Paper (OMR on Ballpoint Pen)",
    "examFormatDescription": "Single paper consisting of 100 Multiple Choice Questions (100 Marks, 2 Hours). Part I: Data Analysis (20 Q); Part II: Reading Comprehension (20 Q); Part III: Quantitative Aptitude (20 Q); Part IV: Data Sufficiency (20 Q); Part V: English Grammar (20 Q). 1/3rd negative marking applies. Separate paper for MCA.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 500,
    "feeDescription": "\u20b91,000 for General/BC/MBC; \u20b9500 for SC/SCA/ST candidates belonging to Tamil Nadu.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "50% concession for SC/ST.",
    "hasScholarship": true,
    "scholarshipDetails": "Government College MBA tuition fee is subsidized (\u20b915,000 \u2013 \u20b930,000 per year at Department of Management Studies DOMS Anna University). Post-Matric scholarships cover 100% fees for eligible students.",
    "applicationProcedure": [
      "Apply online on tancet.annauniv.edu during January - February."
    ],
    "requiredDocuments": [
      "Degree Marksheets / Provisional",
      "10th & 12th Marksheets",
      "Community Certificate",
      "Nativity Certificate"
    ],
    "importantDates": {
      "applicationOpening": "January 2026",
      "applicationDeadline": "February 2026",
      "admitCardRelease": "March 2026",
      "examinationDate": "March 2026",
      "resultDeclaration": "April 2026",
      "counsellingOrInterview": "Single Window Online Counselling in July - August 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.annauniv.edu/",
    "officialNotificationUrl": "https://www.annauniv.edu/",
    "officialApplicationPortalUrl": "https://www.annauniv.edu/",
    "officialSyllabusUrl": "https://www.annauniv.edu/",
    "opportunityProvided": {
      "summary": "Admission to Department of Management Studies (DOMS Anna University Chennai), PSG Institute of Management Coimbatore, and top government/aided business schools at highly subsidized tuition fees with top corporate placements.",
      "degreesOrPosts": [
        "MBA at Department of Management Studies (DOMS Anna University Chennai - Low fee \u20b930,000/year)",
        "MBA at PSG College of Technology / PSG Institute of Management (Coimbatore)",
        "MBA in University of Madras / Madurai Kamaraj University / Bharathiar University",
        "MCA in College of Engineering Guindy (CEG Anna University) and government colleges"
      ],
      "salaryOrStipend": "DOMS Anna University MBA average campus package: \u20b98.5 LPA; Highest package: \u20b918 LPA (TCS, Infosys, Zoho, Ford, HDFC Bank, Federal Bank).",
      "careerAdvancement": "Business development manager, financial analyst, human resource consultant, and IT systems architect.",
      "counsellingProcess": "Single window online counselling conducted by Directorate of Technical Education based on TANCET normalized mark.",
      "statutoryQuotaBenefit": "69% Tamil Nadu communal reservation."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "MBA & MCA in DOMS Anna University, PSG, and colleges statewide"
      ],
      "participatingBodies": "Anna University Chennai & Directorate of Technical Education (DOTE)",
      "selectionStepsAfterExam": [
        "1. Pen-and-Paper OMR Examination.",
        "2. Scorecard & Normalised Percentile release.",
        "3. Single Window Online Counselling Registration.",
        "4. Seat Allotment."
      ],
      "expectedOutcome": "Admission to subsidized, accredited MBA/MCA degree.",
      "statutoryQuotaBenefit": "69% communal quota."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Quantitative Aptitude (Arithmetic, Algebra, Geometry), Data Interpretation, Reading Comprehension, Business Decision Making, Error Correction."
      ],
      "recommendedFocus": [
        "Solving previous 10 years TANCET papers",
        "Data sufficiency and business analysis passages",
        "Time management (100 questions in 120 minutes)"
      ],
      "markingScheme": "100 Questions = 100 Marks. 1 Mark for correct, 1/3rd Mark deducted for wrong answer.",
      "negativeMarking": "1/3rd negative marking per wrong answer",
      "durationMinutes": 120
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Anna University TANCET Secretariat"
  },
  {
    "id": "viteee",
    "title": "Vellore Institute of Technology Engineering Entrance Examination (VITEEE)",
    "shortCode": "VITEEE",
    "conductingAuthority": "Vellore Institute of Technology (VIT Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering"
    ],
    "purpose": "Institutional computer-based entrance examination for admission to B.Tech. degree programmes across VIT Vellore, VIT Chennai, VIT AP, and VIT Bhopal campuses.",
    "whoCanApply": "Candidates who have secured an aggregate of 60% in Physics, Chemistry, and Mathematics/Biology in Class 12 (50% for SC/ST, Jammu & Kashmir, and North Eastern states).",
    "minimumQualification": "Passed Class 12 with minimum 60% aggregate in PCM / PCB (50% for SC/ST).",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Mathematics / Biology (40 Q)",
      "Physics (35 Q)",
      "Chemistry (35 Q)",
      "Aptitude (10 Q)",
      "English (5 Q)"
    ],
    "minimumMarks": "60% aggregate in PCM/PCB (50% for SC/ST)",
    "ageCriteria": "Candidates born on or after 1st July 2004 are eligible.",
    "ageMin": 17,
    "ageMax": 22,
    "reservationSummary": "STARS Scheme: 100% full fee waiver including free hostel and food for rural Tamil Nadu Government Higher Secondary School district toppers. Concessional fee brackets (Category 1 to Category 5) based on VITEEE rank.",
    "examinationMode": "Computer Based Test (CBT)",
    "examFormatDescription": "Single paper consisting of 125 Multiple Choice Questions (125 Marks, 2 Hours 30 Minutes). Maths/Biology: 40 Questions; Physics: 35 Questions; Chemistry: 35 Questions; Aptitude: 10 Questions; English: 5 Questions. NO negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1350,
    "feeReservedInr": 1350,
    "feeDescription": "Application Fee: \u20b91,350 for all candidates paying online via net banking / credit / debit / UPI.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "STARS Scheme provides 100% fee waiver for rural government school toppers.",
    "hasScholarship": true,
    "scholarshipDetails": "GV School Development Programme (GVSDP): 100% tuition fee waiver for central/state board toppers; 75% waiver for VITEEE ranks 1-50; 50% waiver for ranks 51-100; 25% waiver for ranks 101-500. STARS scheme covers 100% tuition, hostel, and mess fees for rural TN school toppers.",
    "applicationProcedure": [
      "Apply online on viteee.vit.ac.in with Class 12 details and select examination city slots."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card",
      "Community Certificate if claiming relaxation"
    ],
    "importantDates": {
      "applicationOpening": "November 2025",
      "applicationDeadline": "March 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "April 2026 (Multiple day sessions)",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Phase-wise online counselling in May - June 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://vit.ac.in/",
    "officialNotificationUrl": "https://viteee.vit.ac.in/",
    "officialApplicationPortalUrl": "https://viteee.vit.ac.in/",
    "officialSyllabusUrl": "https://viteee.vit.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to one of India's premier autonomous private technological institutions (VIT Vellore ranked #11 Engineering Institute in India by NIRF) with extensive global campus placements.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science and Engineering (CSE)",
        "B.Tech. in CSE with specializations in AI & ML, Data Science, Cyber Security, Cloud Computing",
        "B.Tech. in Electronics and Communication Engineering (ECE)",
        "B.Tech. in Mechanical, Electrical, Biotechnology, Chemical Engineering across Vellore and Chennai campuses"
      ],
      "salaryOrStipend": "VIT Super Dream Offers average CTC: \u20b915.8 LPA; Highest domestic offer: \u20b91.02 Crore; 900+ visiting corporate recruiters (Microsoft, Amazon, Adobe, PayPal, Cisco).",
      "careerAdvancement": "Direct campus recruitment in Fortune 500 tech firms, international credit transfer programs (SAP), and overseas Master's admissions.",
      "counsellingProcess": "Phase-wise online counselling based strictly on VITEEE rank; candidates choose campus and tuition fee category (Category 1 has lowest tuition fee of approx \u20b91.98 LPA; Category 5 reaches \u20b94.93 LPA).",
      "statutoryQuotaBenefit": "STARS Scheme for rural Tamil Nadu government school district toppers covering 100% full tuition, hostel, and mess fees."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech at VIT Vellore and VIT Chennai campuses"
      ],
      "participatingBodies": "Vellore Institute of Technology (VIT University)",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (125 Questions).",
        "2. Rank Generation.",
        "3. Multi-phase online choice filling by rank brackets.",
        "4. Campus and Branch Allotment."
      ],
      "expectedOutcome": "Admission to premier Institute of Eminence private university with top-tier corporate campus hiring.",
      "statutoryQuotaBenefit": "STARS rural TN government school topper full fee waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NCERT Class 11 & 12 Physics, Chemistry, and Mathematics/Biology curricula + Aptitude (data interpretation, syllogism) + English grammar."
      ],
      "recommendedFocus": [
        "Speed answering (125 questions in 150 minutes with no negative marking)",
        "Class 11 & 12 NCERT science concepts",
        "Solving online sample mock tests on VIT portal"
      ],
      "markingScheme": "125 Questions = 125 Marks. 1 Mark per correct answer. NO negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "VIT Admissions Directorate"
  },
  {
    "id": "srmjeee",
    "title": "SRM Joint Engineering Entrance Examination (SRMJEEE)",
    "shortCode": "SRMJEEE",
    "conductingAuthority": "SRM Institute of Science and Technology (SRMIST)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering"
    ],
    "purpose": "Online proctored entrance examination for admission into B.Tech. programmes across SRMIST Kattankulathur (Main Campus, Chennai), Ramapuram, Vadapalani, Tiruchirappalli, Delhi-NCR, and Andhra Pradesh campuses.",
    "whoCanApply": "Passed 10+2 scheme with Physics, Chemistry, and Mathematics/Biology with minimum 50% aggregate marks.",
    "minimumQualification": "Passed Class 12 with minimum 50% aggregate in PCM / PCB.",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Mathematics / Biology (40 Q)",
      "Physics (35 Q)",
      "Chemistry (35 Q)",
      "English (5 Q)",
      "Aptitude (10 Q)"
    ],
    "minimumMarks": "50% aggregate in PCM/PCB",
    "ageCriteria": "Should have attained 16 years of age on 31st July of admission year.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "SRM Founder's Scholarship: 100% tuition, hostel, and mess fee waiver for top 100 SRMJEEE rankers, state board toppers, and national sports achievers.",
    "examinationMode": "Remote Proctored Online Examination (RPOM)",
    "examFormatDescription": "Single paper consisting of 125 Multiple Choice Questions (125 Marks, 2 Hours 30 Minutes). Mathematics / Biology: 40 Q; Physics: 35 Q; Chemistry: 35 Q; English: 5 Q; Aptitude: 10 Q. Conducted in multiple phases (Phase 1, Phase 2, Phase 3). NO negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1200,
    "feeReservedInr": 1200,
    "feeDescription": "Application Fee: \u20b91,200 per phase payable online.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Founder's scholarship for top rankers.",
    "hasScholarship": true,
    "scholarshipDetails": "Founder's Scholarship: 100% full fee waiver for ranks 1-100; SRM Merit Scholarship: 75% waiver for ranks 101-500; 50% waiver for ranks 501-1000.",
    "applicationProcedure": [
      "Apply online on srmist.edu.in for Phase 1, Phase 2, or Phase 3."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "November 2025",
      "applicationDeadline": "April (Phase 1) / June (Phase 2)",
      "admitCardRelease": "Available for slot booking",
      "examinationDate": "April (Phase 1) & June (Phase 2)",
      "resultDeclaration": "Within 10 days after each phase",
      "counsellingOrInterview": "Phase-wise online choice filling",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.srmist.edu.in/",
    "officialNotificationUrl": "https://www.srmist.edu.in/",
    "officialApplicationPortalUrl": "https://applications.srmist.edu.in/",
    "officialSyllabusUrl": "https://www.srmist.edu.in/",
    "opportunityProvided": {
      "summary": "Admission to SRM Institute of Science and Technology, Kattankulathur Chennai with over 1,000 recruiters visiting campus annually.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science and Engineering (CSE)",
        "B.Tech. in CSE with Cloud, AI, Big Data, Cyber Security, Gaming Technology",
        "B.Tech. in Electronics and Communication Engineering",
        "B.Tech. in Aerospace, Mechanical, Civil, Biomedical Engineering"
      ],
      "salaryOrStipend": "SRMIST average engineering package: \u20b97.58 LPA; Highest domestic offer: \u20b957 LPA (Google, Amazon, Microsoft, Barclay's).",
      "careerAdvancement": "Semester Abroad Programmes (SAP) with MIT, Harvard, UC Berkeley; robust alumni network in global IT and automotive hubs.",
      "counsellingProcess": "Online multi-phase counselling based on SRMJEEE rank for campus and branch selection.",
      "statutoryQuotaBenefit": "Founder's scholarship for top 100 rankers with 100% fee waiver."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech at SRMIST Kattankulathur Chennai Campus"
      ],
      "participatingBodies": "SRM Institute of Science and Technology",
      "selectionStepsAfterExam": [
        "1. Remote Proctored Online Examination.",
        "2. Scorecard & Rank List release.",
        "3. Online Seat Choice Filling.",
        "4. Provisional Allotment."
      ],
      "expectedOutcome": "Admission to leading private university with extensive campus hiring.",
      "statutoryQuotaBenefit": "Founder's merit scholarship."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NCERT/State Board Class 11 & 12 Physics, Chemistry, Mathematics/Biology, and Basic Aptitude."
      ],
      "recommendedFocus": [
        "Speed and accuracy",
        "Basic quantitative aptitude and number series",
        "NCERT formulas"
      ],
      "markingScheme": "125 Questions = 125 Marks. 1 Mark per correct answer. NO negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "SRMIST Admissions Office"
  },
  {
    "id": "saeee-sathyabama",
    "title": "Sathyabama All India Online Entrance Examination (SAEEE)",
    "shortCode": "SAEEE",
    "conductingAuthority": "Sathyabama Institute of Science and Technology (Deemed University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Architecture"
    ],
    "purpose": "Institution-conducted online entrance examination for admission into B.E., B.Tech., and B.Arch. programmes at Sathyabama Institute of Science and Technology, Jeppiaar Nagar, Chennai.",
    "whoCanApply": "Candidates who have passed 10+2 with Physics, Chemistry, and Mathematics/Biology with minimum 45% marks.",
    "minimumQualification": "Passed Class 12 with minimum 45% aggregate in PCM / PCB.",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Mathematics / Biology (60 Q)",
      "Physics (30 Q)",
      "Chemistry (30 Q)"
    ],
    "minimumMarks": "45% aggregate in PCM/PCB",
    "ageCriteria": "Candidates born on or after 1st January 2004 are eligible.",
    "ageMin": 17,
    "ageMax": 23,
    "reservationSummary": "Dr. Jeppiaar Remidio Scholarship: 100% full tuition fee waiver for top 50 rankers in SAEEE.",
    "examinationMode": "Online Computer Based Examination",
    "examFormatDescription": "Single paper consisting of 120 Multiple Choice Questions (120 Marks, 2 Hours 30 Minutes). Mathematics/Biology: 60 Q; Physics: 30 Q; Chemistry: 30 Q. NO negative marking.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1000,
    "feeReservedInr": 1000,
    "feeDescription": "Application Fee: \u20b91,000 payable online via net banking / UPI.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Scholarship for top rankers.",
    "hasScholarship": true,
    "scholarshipDetails": "100% tuition fee waiver for top 50 rankers; 50% tuition waiver for ranks 51-100.",
    "applicationProcedure": [
      "Apply online on sathyabama.ac.in during November - April."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "December 2025",
      "applicationDeadline": "April 2026",
      "admitCardRelease": "Slot booking in April 2026",
      "examinationDate": "April - May 2026",
      "resultDeclaration": "May 2026",
      "counsellingOrInterview": "Online counselling in May - June 2026",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.sathyabama.ac.in/",
    "officialNotificationUrl": "https://www.sathyabama.ac.in/",
    "officialApplicationPortalUrl": "https://www.sathyabama.ac.in/",
    "officialSyllabusUrl": "https://www.sathyabama.ac.in/",
    "opportunityProvided": {
      "summary": "Admission to Sathyabama Deemed University, Chennai (Ranked #51 in NIRF Engineering) known for space research, defense contracts, and campus placements.",
      "degreesOrPosts": [
        "B.E. Computer Science and Engineering",
        "B.Tech. Artificial Intelligence and Machine Learning",
        "B.E. Electronics and Communication Engineering",
        "B.E. Aeronautical Engineering / Mechanical Engineering",
        "B.Arch. (via NATA score and SAEEE counselling)"
      ],
      "salaryOrStipend": "Sathyabama average engineering campus package: \u20b95.5 LPA; Highest offer: \u20b953 LPA (Cognizant, TCS, Wipro, Capgemini, Amazon).",
      "careerAdvancement": "Direct placement into IT consulting, aerospace technology (Sathyasath satellite development project), and automotive research.",
      "counsellingProcess": "Online branch allotment based on SAEEE entrance exam merit rank.",
      "statutoryQuotaBenefit": "Institutional merit scholarships for high rankers."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.E. / B.Tech at Sathyabama Chennai"
      ],
      "participatingBodies": "Sathyabama Institute of Science and Technology",
      "selectionStepsAfterExam": [
        "1. Online Computer Based Test.",
        "2. Merit Rank List publication.",
        "3. Online branch selection counselling.",
        "4. Admission confirmation."
      ],
      "expectedOutcome": "Admission to accredited engineering university degree.",
      "statutoryQuotaBenefit": "Institutional merit waiver."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Tamil Nadu State Board & CBSE Class 11 & 12 Mathematics, Physics, and Chemistry."
      ],
      "recommendedFocus": [
        "Mathematics problem solving",
        "Basic physics formulas and chemical reactions"
      ],
      "markingScheme": "120 Questions = 120 Marks. No negative marking.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Sathyabama University Admissions"
  },
  {
    "id": "aeee-amrita",
    "title": "Amrita Entrance Examination - Engineering (AEEE)",
    "shortCode": "AEEE",
    "conductingAuthority": "Amrita Vishwa Vidyapeetham (Deemed to be University)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering"
    ],
    "purpose": "Institutional engineering entrance examination for admission into B.Tech. programmes across Amrita Vishwa Vidyapeetham campuses (Coimbatore, Chennai, Amritapuri, Bengaluru, Amaravati).",
    "whoCanApply": "Passed 10+2 with minimum 60% aggregate in Physics, Chemistry, and Mathematics, and not less than 55% in each subject.",
    "minimumQualification": "Passed Class 12 with minimum 60% aggregate in PCM (minimum 55% in each subject).",
    "eligibleStreams": [
      "Class 12 Science (PCM)"
    ],
    "requiredSubjects": [
      "Mathematics (40 Q)",
      "Physics (30 Q)",
      "Chemistry (25 Q)",
      "English (5 Q)"
    ],
    "minimumMarks": "60% aggregate in PCM with 55% in each individual subject",
    "ageCriteria": "Candidates born on or after 1st July 2004 are eligible.",
    "ageMin": 17,
    "ageMax": 22,
    "reservationSummary": "Amrita Chancellor Scholarship: Up to 100% tuition fee waiver for top AEEE and JEE Main rankers. 70% of seats filled through AEEE; 30% through JEE Main.",
    "examinationMode": "Computer Based Test (CBT - Phase 1 & Phase 2)",
    "examFormatDescription": "Single paper consisting of 100 Multiple Choice Questions (300 Marks, 2 Hours 30 Minutes). Mathematics: 40 Q (120 M); Physics: 30 Q (90 M); Chemistry: 25 Q (75 M); English: 5 Q (15 M). Correct: +3, Incorrect: -1.",
    "feeType": "Paid Application",
    "feeGeneralInr": 1200,
    "feeReservedInr": 1200,
    "feeDescription": "Application Fee: \u20b91,200 for AEEE alone; \u20b9500 for candidates applying via JEE Main score alone; \u20b91,200 for both.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Chancellor scholarship for top rankers.",
    "hasScholarship": true,
    "scholarshipDetails": "Chancellor's Scholarship: 100% fee waiver for top rankers; Dean's Scholarship: 75% fee waiver; Merit scholarships (50% and 25%) covering 300+ students across campuses.",
    "applicationProcedure": [
      "Apply online on amrita.edu/admissions/btech."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "November 2025",
      "applicationDeadline": "January (Phase 1) / April (Phase 2)",
      "admitCardRelease": "Slot booking before each phase",
      "examinationDate": "January (Phase 1) & May (Phase 2)",
      "resultDeclaration": "Within 2 weeks of each phase",
      "counsellingOrInterview": "Amrita Centralized Academic B.Tech Counselling (AOAP)",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.amrita.edu/",
    "officialNotificationUrl": "https://www.amrita.edu/admissions/btech",
    "officialApplicationPortalUrl": "https://aoap.amrita.edu/",
    "officialSyllabusUrl": "https://www.amrita.edu/",
    "opportunityProvided": {
      "summary": "Admission to Amrita Vishwa Vidyapeetham (Ranked #7 Overall University in India by NIRF) with prominent campuses at Ettimadai Coimbatore and Vengal Chennai.",
      "degreesOrPosts": [
        "B.Tech. in Computer Science and Engineering (Coimbatore & Chennai)",
        "B.Tech. in Artificial Intelligence & Data Science",
        "B.Tech. in Cyber Security / Automation & Robotics",
        "B.Tech. in Electrical & Computer Engineering / Aerospace"
      ],
      "salaryOrStipend": "Amrita average B.Tech campus package: \u20b99.2 LPA; Highest domestic package: \u20b975 LPA (Cisco, Microsoft, Bosch, Google, Intel).",
      "careerAdvancement": "Direct dual degree opportunities with international partner universities (KTH Sweden, Vrije Univ Amsterdam) and top-tier PhD programs.",
      "counsellingProcess": "Amrita Online Admission Portal (AOAP) centralized rank-based counseling across campuses.",
      "statutoryQuotaBenefit": "Chancellor's merit fee concessions for top 100 rankers."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.Tech at Amrita Coimbatore and Chennai campuses"
      ],
      "participatingBodies": "Amrita Vishwa Vidyapeetham",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (Phase 1 & 2).",
        "2. Best score rank calculation.",
        "3. AOAP online campus choice filling.",
        "4. Seat Allocation."
      ],
      "expectedOutcome": "Admission to top 10 NIRF ranked university with high research credibility.",
      "statutoryQuotaBenefit": "Institutional scholarship quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NCERT Class 11 & 12 Mathematics (Calculus, Vectors), Physics (Mechanics, Electricity), Chemistry."
      ],
      "recommendedFocus": [
        "JEE Main standard conceptual questions",
        "Mathematics problem solving speed"
      ],
      "markingScheme": "100 Questions \u00d7 3 Marks = 300 Marks. 1 Mark deducted for wrong answers.",
      "negativeMarking": "-1 mark negative marking for wrong answer",
      "durationMinutes": 150
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Amrita Admissions Directorate"
  },
  {
    "id": "bitsat",
    "title": "Birla Institute of Technology and Science Admission Test (BITSAT)",
    "shortCode": "BITSAT",
    "conductingAuthority": "Birla Institute of Technology and Science (BITS Pilani)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Class 12"
    ],
    "categories": [
      "private-exams",
      "private-univ-entrance"
    ],
    "courseDisciplines": [
      "Engineering",
      "Pharmacy",
      "Science"
    ],
    "purpose": "India's highest benchmark private engineering entrance examination for admission into integrated first-degree B.E., B.Pharm., and M.Sc. programmes at BITS Pilani, BITS Goa, and BITS Hyderabad campuses.",
    "whoCanApply": "Candidates who have passed Class 12 with Physics, Chemistry, and Mathematics (or Biology for B.Pharm) with minimum 75% aggregate in PCM/PCB, and at least 60% in each subject.",
    "minimumQualification": "Passed Class 12 with minimum 75% aggregate in PCM (PCB for B.Pharm) with at least 60% in Physics, Chemistry, and Maths individually.",
    "eligibleStreams": [
      "Class 12 Science (PCM / PCB)"
    ],
    "requiredSubjects": [
      "Physics (30 Q)",
      "Chemistry (30 Q)",
      "English Proficiency (10 Q)",
      "Logical Reasoning (20 Q)",
      "Mathematics / Biology (40 Q)"
    ],
    "minimumMarks": "75% aggregate in PCM with 60% in each individual subject in Class 12",
    "ageCriteria": "Candidates must have passed Class 12 in the current year or preceding year.",
    "ageMin": 16,
    "ageMax": null,
    "reservationSummary": "No caste or reservation quotas (100% pure merit-based admission). Direct admission given to First Rank holders (Board Toppers) of all Central and State Boards in India.",
    "examinationMode": "Computer Based Test (CBT - Session 1 & Session 2)",
    "examFormatDescription": "Single paper consisting of 130 Multiple Choice Questions (390 Marks, 3 Hours). Physics (30 Q, 90 M); Chemistry (30 Q, 90 M); English (10 Q, 30 M); Logical Reasoning (20 Q, 60 M); Mathematics/Biology (40 Q, 120 M). If candidate answers all 130 questions within 3 hours, 12 Bonus Questions (36 Marks) are unlocked. Correct: +3, Incorrect: -1.",
    "feeType": "Paid Application",
    "feeGeneralInr": 3400,
    "feeReservedInr": 2900,
    "feeDescription": "Single Session: \u20b93,400 for male candidates; \u20b92,900 for female candidates. Both Sessions: \u20b95,400 for male; \u20b94,400 for female.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Reduced fee for female candidates.",
    "hasScholarship": true,
    "scholarshipDetails": "BITS Merit-cum-Means (MCN) Scholarship: Up to 100% tuition fee waiver for students with family income < \u20b915 Lakhs per annum (covers over 30% of entire student body).",
    "applicationProcedure": [
      "Apply online on bitsadmission.com for Session 1, Session 2, or both sessions."
    ],
    "requiredDocuments": [
      "10th Marksheet",
      "12th Marksheet / Hall Ticket",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "January 2026",
      "applicationDeadline": "April (Session 1) / June (Session 2)",
      "admitCardRelease": "Slot booking before each session",
      "examinationDate": "May (Session 1) & June (Session 2)",
      "resultDeclaration": "Scorecard generated immediately after exam; Iteration rounds in July",
      "counsellingOrInterview": "BITS Online Iteration Counseling based on score out of 390",
      "isDeadlineActive": false,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.bits-pilani.ac.in/",
    "officialNotificationUrl": "https://www.bitsadmission.com/",
    "officialApplicationPortalUrl": "https://www.bitsadmission.com/",
    "officialSyllabusUrl": "https://www.bitsadmission.com/",
    "opportunityProvided": {
      "summary": "Admission to BITS Pilani (Institution of Eminence), BITS Goa, and BITS Hyderabad, renowned for zero attendance policy, high startup incubation, and campus placements matching top IITs.",
      "degreesOrPosts": [
        "B.E. Computer Science at BITS Pilani, Goa, and Hyderabad",
        "B.E. Electrical & Electronics / Electronics & Instrumentation",
        "B.E. Mechanical / Chemical / Civil Engineering",
        "B.Pharm. (Bachelor of Pharmacy at Pilani & Hyderabad)",
        "M.Sc. Dual Degree Programmes (M.Sc. Physics/Maths/Economics + B.E. Computer Science)"
      ],
      "salaryOrStipend": "BITS Pilani average campus package: \u20b920.74 LPA; CS branch average: \u20b930.37 LPA; Highest international offer: \u20b91.33 Crore (Google, Apple, Microsoft, DE Shaw, Uber).",
      "careerAdvancement": "Premier global technology leadership, elite Silicon Valley hiring, and high founder density (Swiggy, Postman, BigBasket founded by BITS alumni).",
      "counsellingProcess": "Centralized online iteration rounds based on normalized 390 score without interviews.",
      "statutoryQuotaBenefit": "Direct admission with 100% scholarship for State Board toppers (TN State Board rank 1)."
    },
    "linkedOpportunities": {
      "opportunityType": "Degree Admission",
      "targetProgrammesOrPosts": [
        "B.E. / Dual Degree at BITS Pilani, Goa, Hyderabad"
      ],
      "participatingBodies": "Birla Institute of Technology and Science (BITS Pilani)",
      "selectionStepsAfterExam": [
        "1. Computer Based Test (130 Questions + 12 Bonus).",
        "2. Instant scorecard generation.",
        "3. Iteration rounds for campus and branch allotment.",
        "4. Campus admission reporting."
      ],
      "expectedOutcome": "Admission to premier Institute of Eminence private university on par with top IITs.",
      "statutoryQuotaBenefit": "State Board First Rank Holder guaranteed direct admission."
    },
    "preparation": {
      "syllabusRoadmap": [
        "NCERT Class 11 & 12 Physics, Chemistry, Mathematics, English Proficiency, and Logical Reasoning."
      ],
      "recommendedFocus": [
        "Speed and accuracy (130 questions in 180 minutes)",
        "English and Logical Reasoning (30 questions = 90 marks guaranteed advantage)",
        "Unlocking the 12 bonus questions"
      ],
      "markingScheme": "130 Questions \u00d7 3 Marks = 390 Total Marks. 1 Mark deducted for wrong answers.",
      "negativeMarking": "-1 mark negative marking for wrong answer",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "BITS Admissions Central Directorate"
  },
  {
    "id": "tcs-nqt",
    "title": "TCS National Qualifier Test (TCS NQT)",
    "shortCode": "TCS NQT",
    "conductingAuthority": "Tata Consultancy Services (TCS iON)",
    "authorityType": "Private University / Consortium",
    "isGovernment": false,
    "levelClassification": "Private University / Institutional",
    "targetStages": [
      "Diploma / Polytechnic",
      "Undergraduate",
      "Postgraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "private-exams"
    ],
    "courseDisciplines": [
      "Computer Applications",
      "Engineering",
      "Commerce",
      "Science",
      "Management"
    ],
    "purpose": "Standardized multi-corporate employability assessment test certifying aptitude and technical skills, recognized by TCS and 2,000+ corporate employers for entry-level hiring.",
    "whoCanApply": "Pre-final and final year students or graduates of any undergraduate, postgraduate, or diploma course.",
    "minimumQualification": "Undergraduate, Postgraduate, or Diploma students in final year or graduates with up to 2 years experience.",
    "eligibleStreams": [
      "Any Degree (B.E., B.Tech., B.Sc., B.Com., B.C.A., M.C.A., M.Sc., M.B.A., Diploma)"
    ],
    "requiredSubjects": [
      "Cognitive Skills (Numerical, Verbal, Reasoning Ability)",
      "IT Programming / Coding (Optional Domain)"
    ],
    "minimumMarks": "60% or 6.0 CGPA throughout academics (10th, 12th, and Degree)",
    "ageCriteria": "18 to 28 years.",
    "ageMin": 18,
    "ageMax": 28,
    "reservationSummary": "Merit-based corporate recruitment without government reservations.",
    "examinationMode": "Online Assessment (at Home with AI Proctoring or in TCS iON Test Centres)",
    "examFormatDescription": "Cognitive Skills Test (120 Mins - Numerical Ability, Verbal Ability, Reasoning Ability). Advanced IT Test (60 Mins - Advanced Coding in C/C++/Java/Python). Standardized NQT scorecard valid for 2 full years.",
    "feeType": "Paid Application",
    "feeGeneralInr": 999,
    "feeReservedInr": 999,
    "feeDescription": "\u20b9999 for Cognitive Skills; \u20b91,899 for Cognitive + IT Programming. 100% Free when conducted as on-campus or national off-campus hiring drive by TCS.",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Free during TCS National Hiring Drives for college students.",
    "hasScholarship": false,
    "applicationProcedure": [
      "Register online on tcsion.com and book available test slots."
    ],
    "requiredDocuments": [
      "College ID / Degree Marksheets",
      "Government Photo ID (Aadhaar / Voter ID)"
    ],
    "importantDates": {
      "applicationOpening": "Quarterly registration open round the year",
      "applicationDeadline": "Rolling quarterly deadlines",
      "admitCardRelease": "Slot confirmation 3 days before test",
      "examinationDate": "Quarterly exam windows (January, April, July, October)",
      "resultDeclaration": "Scorecard generated within 14 days",
      "counsellingOrInterview": "Direct interview calls from TCS and corporate partner companies",
      "isDeadlineActive": true,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://www.tcsion.com/hub/national-qualifier-test/#variant",
    "officialNotificationUrl": "https://www.tcsion.com/hub/national-qualifier-test/#variant",
    "officialApplicationPortalUrl": "https://www.tcsion.com/hub/national-qualifier-test/#variant",
    "officialSyllabusUrl": "https://www.tcsion.com/hub/national-qualifier-test/#variant",
    "opportunityProvided": {
      "summary": "Direct entry-level software engineer and digital specialist hiring into Tata Consultancy Services and direct job application access to 2,000+ corporate employers.",
      "degreesOrPosts": [
        "TCS Ninja Developer (Package: \u20b93.6 LPA for B.E. / \u20b93.36 LPA for B.Sc/BCA)",
        "TCS Digital Specialist Engineer (Package: \u20b97.0 LPA \u2013 \u20b97.5 LPA)",
        "TCS Prime Advanced Software Architect (Package: \u20b99.0 LPA \u2013 \u20b911.5 LPA)",
        "Direct shortlisting by 2,000+ corporate employers across IT, banking, and analytics"
      ],
      "salaryOrStipend": "Entry salaries range from \u20b93.6 LPA (Ninja) to \u20b911.5 LPA (Prime) with rapid appraisal tracks.",
      "careerAdvancement": "Direct corporate IT software engineering career with global client deployments.",
      "counsellingProcess": "Direct interview calls based on NQT score percentile without preliminary screening rounds.",
      "statutoryQuotaBenefit": "Corporate merit hiring."
    },
    "linkedOpportunities": {
      "opportunityType": "Private Trainee / Job",
      "targetProgrammesOrPosts": [
        "Software Engineer in TCS & 2,000+ partner companies"
      ],
      "participatingBodies": "Tata Consultancy Services (TCS) and corporate recruiters",
      "selectionStepsAfterExam": [
        "1. Cognitive & Coding Assessment.",
        "2. Scorecard generation (Valid 2 years).",
        "3. Technical & Managerial Interviews.",
        "4. Job Offer Letter."
      ],
      "expectedOutcome": "Direct corporate IT software engineering employment offer.",
      "statutoryQuotaBenefit": "Corporate merit."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Numerical Ability: Arithmetic, geometry, statistics. Verbal Ability: Vocabulary, sentence completion. Reasoning: Logical deduction, arrangements. Coding: Data structures, algorithms in C/C++/Java/Python."
      ],
      "recommendedFocus": [
        "Hands-on coding practice on arrays, strings, and trees",
        "Time-bound numerical aptitude problem solving"
      ],
      "markingScheme": "Scorecard percentile issued. No negative marking on standard questions.",
      "negativeMarking": "No negative marking",
      "durationMinutes": 180
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "TCS iON Official Portal"
  },
  {
    "id": "nats-apprentice-assessment",
    "title": "National Apprenticeship Training Scheme (NATS 2.0 Assessment)",
    "shortCode": "NATS Assessment",
    "conductingAuthority": "Board of Apprenticeship Training (BOAT SRM/Chennai), Ministry of Education, Govt of India",
    "authorityType": "Central Government / National Agency",
    "isGovernment": true,
    "levelClassification": "Central Government",
    "targetStages": [
      "Diploma / Polytechnic",
      "Undergraduate",
      "Postgraduate Completed"
    ],
    "categories": [
      "govt-exams",
      "central-govt"
    ],
    "courseDisciplines": [
      "Engineering",
      "Polytechnic",
      "Commerce",
      "Science",
      "Arts",
      "Management"
    ],
    "purpose": "Statutory central government apprenticeship scheme providing 1 full year of certified on-the-job industrial training with government-subsidized monthly stipends.",
    "whoCanApply": "Fresh graduates or diploma holders in Engineering, Technology, General Arts, Science, Commerce, and Management within 3 years of passing.",
    "minimumQualification": "Passed Diploma or Graduate Degree (B.E., B.Tech., B.Sc., B.Com., B.A., B.B.A., B.C.A.) from a recognized institution.",
    "eligibleStreams": [
      "Engineering, Science, Commerce, Arts, and Management disciplines"
    ],
    "requiredSubjects": [
      "Core technical and degree subjects"
    ],
    "minimumMarks": "Pass in qualifying Diploma or Degree",
    "ageCriteria": "Minimum 18 years. No upper age limit for fresh graduates.",
    "ageMin": 18,
    "ageMax": null,
    "reservationSummary": "Statutory communal reservations applied in central and state public sector apprenticeship establishments.",
    "examinationMode": "Online Profile Verification & Employer Skill Assessment",
    "examFormatDescription": "Online profile registration, branch merit matching, and employer selection interview / assessment. 1-year statutory apprenticeship training under the Apprentices Act 1961.",
    "feeType": "Free Application",
    "feeGeneralInr": 0,
    "feeReservedInr": 0,
    "feeDescription": "100% Free Registration on National Apprenticeship Training Portal (NATS 2.0).",
    "hasFeeConcession": true,
    "feeConcessionDetails": "Completely free registration for all students.",
    "hasScholarship": true,
    "scholarshipDetails": "Monthly government-subsidized stipend: \u20b99,000 \u2013 \u20b922,000/month for Graduate Apprentices; \u20b98,000 \u2013 \u20b917,000/month for Technician (Diploma) Apprentices paid via Direct Benefit Transfer (DBT).",
    "applicationProcedure": [
      "Create Student Enrollment profile on nats.education.gov.in."
    ],
    "requiredDocuments": [
      "Diploma / Degree Certificate",
      "Community Certificate",
      "Bank Passbook with Aadhaar seeding",
      "Aadhaar Card"
    ],
    "importantDates": {
      "applicationOpening": "Open 365 days a year",
      "applicationDeadline": "Continuous rolling registration",
      "admitCardRelease": "Employer notification via portal",
      "examinationDate": "Monthly apprenticeship job fairs across Tamil Nadu districts",
      "resultDeclaration": "Immediate contract generation",
      "counsellingOrInterview": "Direct contract signing with employer",
      "isDeadlineActive": true,
      "isExpired": false,
      "academicYear": "2026-2027"
    },
    "officialWebsiteUrl": "https://nats.education.gov.in/",
    "officialNotificationUrl": "https://nats.education.gov.in/",
    "officialApplicationPortalUrl": "https://nats.education.gov.in/",
    "officialSyllabusUrl": "https://nats.education.gov.in/",
    "opportunityProvided": {
      "summary": "One full year of statutory certified industrial training with monthly government-backed stipend, leading to permanent absorption in PSUs and leading automotive / engineering giants.",
      "degreesOrPosts": [
        "Graduate Apprentice (Monthly Stipend: \u20b99,000 \u2013 \u20b922,000/month)",
        "Technician (Diploma) Apprentice (Monthly Stipend: \u20b98,000 \u2013 \u20b917,000/month)",
        "Non-Engineering Graduate Apprentice (B.Com, B.Sc, B.A. in banking & financial establishments)",
        "Statutory National Apprenticeship Certificate (NAC) recognized by Government of India"
      ],
      "salaryOrStipend": "Stipend of \u20b99,000 \u2013 \u20b922,000/month direct to bank account via DBT; frequent absorption as permanent junior engineers with \u20b94.5 LPA \u2013 \u20b97 LPA.",
      "careerAdvancement": "Mandatory prerequisite for many central government PSU engineer posts; 1-year certified industrial experience.",
      "counsellingProcess": "Direct contract signing through nats.education.gov.in portal.",
      "statutoryQuotaBenefit": "Statutory reservation applied in public sector establishments."
    },
    "linkedOpportunities": {
      "opportunityType": "Apprenticeship",
      "targetProgrammesOrPosts": [
        "Graduate & Technician Apprenticeship across Tamil Nadu establishments"
      ],
      "participatingBodies": "L&T, TVS Motor, Ashok Leyland, Integral Coach Factory (ICF), BHEL Trichy, NLC India Ltd",
      "selectionStepsAfterExam": [
        "1. Student Enrollment on nats.education.gov.in.",
        "2. Applying to company vacancies.",
        "3. Selection interview at company / job fair.",
        "4. Apprenticeship contract signing and DBT stipend activation."
      ],
      "expectedOutcome": "Certified industrial experience with monthly stipend.",
      "statutoryQuotaBenefit": "Central reservation quotas."
    },
    "preparation": {
      "syllabusRoadmap": [
        "Core technical concepts from diploma or degree branch."
      ],
      "recommendedFocus": [
        "Technical interview preparation",
        "Practical workshop equipment understanding"
      ],
      "markingScheme": "Merit profile matching based on diploma/degree marks percentage.",
      "negativeMarking": "Not applicable",
      "durationMinutes": 0
    },
    "verificationStatus": "Official Authority Confirmed",
    "lastVerified": "2026-11-06",
    "sourceRegistry": "Ministry of Education NATS Portal"
  }
];

// Helper functions
export function getAllExaminations(): ExamRecord[] {
  return EXAMINATIONS_DATABASE;
}

export function getExamById(id: string): ExamRecord | undefined {
  return EXAMINATIONS_DATABASE.find((e) => e.id === id);
}

export function getExamsByCategory(categoryKey: ExamCategoryKey): ExamRecord[] {
  if (categoryKey === 'overview' || categoryKey === 'calendar' || categoryKey === 'eligibility' || categoryKey === 'tracker') {
    return EXAMINATIONS_DATABASE;
  }
  return EXAMINATIONS_DATABASE.filter((e) => e.categories.includes(categoryKey));
}

export function getExamsByStage(stage: EducationStage): ExamRecord[] {
  return EXAMINATIONS_DATABASE.filter((e) => e.targetStages.includes(stage));
}

export function getExamsByDiscipline(discipline: CourseDiscipline): ExamRecord[] {
  return EXAMINATIONS_DATABASE.filter((e) => e.courseDisciplines.includes(discipline));
}

export function getExamsByFeeType(isFreeOnly: boolean): ExamRecord[] {
  if (!isFreeOnly) return EXAMINATIONS_DATABASE;
  return EXAMINATIONS_DATABASE.filter((e) => e.feeType === 'Free Application' || e.feeGeneralInr === 0);
}

export function getExamsStatistics() {
  const total = EXAMINATIONS_DATABASE.length;
  const govtCount = EXAMINATIONS_DATABASE.filter((e) => e.isGovernment).length;
  const privateCount = EXAMINATIONS_DATABASE.filter((e) => !e.isGovernment).length;
  const freeCount = EXAMINATIONS_DATABASE.filter((e) => e.feeType === 'Free Application' || e.feeGeneralInr === 0).length;
  const stateLevelCount = EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'State-Level').length;
  const centralGovtCount = EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'Central Government').length;
  const nationalCount = EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'National Entrance').length;
  const privateUnivCount = EXAMINATIONS_DATABASE.filter((e) => e.levelClassification === 'Private University / Institutional').length;
  const activeDeadlinesCount = EXAMINATIONS_DATABASE.filter((e) => e.importantDates.isDeadlineActive).length;

  return {
    total,
    govtCount,
    privateCount,
    freeCount,
    stateLevelCount,
    centralGovtCount,
    nationalCount,
    privateUnivCount,
    activeDeadlinesCount,
  };
}

export interface OfficialAuthority {
  id: string;
  name: string;
  abbreviation: string;
  category: 'Tamil Nadu Statutory Body' | 'Central Government Agency' | 'National Entrance Board' | 'Public University';
  officialWebsite: string;
  statutoryRole: string;
  associatedExams: string[];
}

export const OFFICIAL_REGULATORS_DIRECTORY: OfficialAuthority[] = [
  {
    id: 'tnpsc-gov',
    name: 'Tamil Nadu Public Service Commission',
    abbreviation: 'TNPSC',
    category: 'Tamil Nadu Statutory Body',
    officialWebsite: 'https://www.tnpsc.gov.in/',
    statutoryRole: 'Constitutional recruiting body for Tamil Nadu State Civil Services, Subordinate Services, and Ministerial Services.',
    associatedExams: ['TNPSC Group 1', 'TNPSC Group 2', 'TNPSC Group 2A', 'TNPSC Group 4', 'TNPSC CTS'],
  },
  {
    id: 'tnusrb-gov',
    name: 'Tamil Nadu Uniformed Services Recruitment Board',
    abbreviation: 'TNUSRB',
    category: 'Tamil Nadu Statutory Body',
    officialWebsite: 'https://tnusrb.tn.gov.in/',
    statutoryRole: 'Recruits Sub-Inspectors and Police Constables for Tamil Nadu Police, Fire and Rescue Services, and Prison Department.',
    associatedExams: ['TNUSRB SI', 'TNUSRB Constable'],
  },
  {
    id: 'trb-tn',
    name: 'Teachers Recruitment Board Tamil Nadu',
    abbreviation: 'TRB TN',
    category: 'Tamil Nadu Statutory Body',
    officialWebsite: 'https://trb.tn.gov.in/',
    statutoryRole: 'Statutory recruiting board for teachers and lecturers in Tamil Nadu Government schools and collegiate education.',
    associatedExams: ['TRB PG Assistant', 'TNTET'],
  },
  {
    id: 'dote-tn',
    name: 'Directorate of Technical Education (DOTE)',
    abbreviation: 'DOTE TN',
    category: 'Tamil Nadu Statutory Body',
    officialWebsite: 'https://dte.tn.gov.in/',
    statutoryRole: 'Administers polytechnic diploma admissions, lateral entry engineering counseling, and technical institute regulation in Tamil Nadu.',
    associatedExams: ['DOTE Polytechnic', 'TNEA'],
  },
  {
    id: 'dme-tn',
    name: 'Selection Committee, Directorate of Medical Education',
    abbreviation: 'DME TN',
    category: 'Tamil Nadu Statutory Body',
    officialWebsite: 'https://tnmedicalselection.net/',
    statutoryRole: 'Administers single window admissions for MBBS, BDS, Paramedical, Pharmacy, and Nursing degree courses in Tamil Nadu.',
    associatedExams: ['NEET UG (State Quota)', 'TN Paramedical'],
  },
  {
    id: 'anna-univ',
    name: 'Anna University, Chennai',
    abbreviation: 'AU',
    category: 'Public University',
    officialWebsite: 'https://www.annauniv.edu/',
    statutoryRole: 'Nodal statutory university for Tamil Nadu Engineering Admissions (TNEA) and postgraduate admissions (TANCET / CEETA-PG).',
    associatedExams: ['TNEA', 'TANCET'],
  },
  {
    id: 'nta-nic',
    name: 'National Testing Agency',
    abbreviation: 'NTA',
    category: 'National Entrance Board',
    officialWebsite: 'https://nta.ac.in/',
    statutoryRole: 'Premier testing organization conducting JEE Main, NEET UG, CUET, UGC NET, CSIR NET, and CMAT.',
    associatedExams: ['JEE Main', 'NEET UG', 'CUET UG', 'UGC NET', 'CSIR NET'],
  },
  {
    id: 'upsc-gov',
    name: 'Union Public Service Commission',
    abbreviation: 'UPSC',
    category: 'Central Government Agency',
    officialWebsite: 'https://upsc.gov.in/',
    statutoryRole: 'Central constitutional recruitment body conducting Civil Services Examination (IAS/IPS/IFS), NDA, CDS, and CAPF.',
    associatedExams: ['UPSC CSE', 'UPSC NDA', 'UPSC CDS', 'UPSC CAPF'],
  },
  {
    id: 'ssc-gov',
    name: 'Staff Selection Commission',
    abbreviation: 'SSC',
    category: 'Central Government Agency',
    officialWebsite: 'https://ssc.gov.in/',
    statutoryRole: 'Recruiting agency for Group B and C posts across Ministries and Departments of the Government of India.',
    associatedExams: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC JE'],
  },
  {
    id: 'ibps-in',
    name: 'Institute of Banking Personnel Selection',
    abbreviation: 'IBPS',
    category: 'Central Government Agency',
    officialWebsite: 'https://www.ibps.in/',
    statutoryRole: 'Statutory testing agency conducting recruitment examinations for 11 Public Sector Banks and Regional Rural Banks.',
    associatedExams: ['IBPS PO', 'IBPS Clerk'],
  },
];
