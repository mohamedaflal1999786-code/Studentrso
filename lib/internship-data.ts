// lib/internship-data.ts
// Comprehensive Data Layer for Module 08: Internship, Skill & Employment Exchange
// Student RSO – Rights, Services & Opportunities

export type OpportunityCategory =
  | 'government-internship'
  | 'private-internship'
  | 'apprenticeship'
  | 'skill-development'
  | 'government-job'
  | 'private-job';

export type OpportunityClassification = 'Government' | 'Private' | 'Public Sector (PSU)' | 'Statutory Autonomous';

export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';

export type VerificationStatus =
  | 'Official Source Verified'
  | 'Employer Source Verified'
  | 'Third-Party Listing - Verification Required'
  | 'Application Closed'
  | 'Unverified - Not Recommended';

export type ApplicationStage =
  | 'Saved'
  | 'Applied'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Closed';

export interface OpportunityListing {
  id: string;
  title: string;
  organisation: string;
  organisationType: OpportunityClassification;
  category: OpportunityCategory;
  departmentOrDomain: string;
  qualification: string[];
  eligibleCourses: string[];
  targetCohorts: string[];
  requiredSkills: string[];
  location: string;
  state: string;
  district?: string;
  workMode: WorkMode;
  duration: string;
  isPaid: boolean;
  stipendOrSalary: string;
  applicationOpenDate: string;
  applicationClosingDate: string;
  isClosed?: boolean;
  requiredDocuments: string[];
  selectionProcedure: string;
  applicationInstructions: string[];
  officialNotificationUrl: string;
  officialApplicationUrl: string;
  officialPortalDomain: string;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  description: string;
  whatHappensAfter: string;
  contactOrHelpline?: string;
}

export interface OfficialPortalDirectoryEntry {
  id: string;
  name: string;
  category: string;
  scope: 'Tamil Nadu' | 'National' | 'Central';
  officialUrl: string;
  domain: string;
  description: string;
  operationalStatus: 'Online & Verified' | 'Advisory Notice' | 'Maintenance Scheduled';
  primaryServices: string[];
  nodalAuthority: string;
  helpline?: string;
}

export interface TNEmploymentExchangeGuide {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
}

export interface SkillProgram {
  id: string;
  name: string;
  trainingProvider: string;
  initiative: 'Naan Mudhalvan' | 'Skill India Digital' | 'NSDC' | 'TNSDC' | 'ICT Academy';
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  feeStatus: '100% Free' | 'Government Subsidised' | 'Fee Applicable';
  feeAmount?: string;
  targetQualification: string;
  certificationOffered: string;
  curriculumHighlights: string[];
  officialApplicationUrl: string;
  lastVerifiedDate: string;
}

export interface SavedApplicationRecord {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organisation: string;
  category: OpportunityCategory;
  stage: ApplicationStage;
  appliedDate?: string;
  deadline: string;
  interviewDate?: string;
  referenceNumber?: string;
  notes?: string;
  officialPortalUrl: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 1. MASTER VERIFIED OPPORTUNITIES CATALOGUE
// ---------------------------------------------------------------------------
export const VERIFIED_OPPORTUNITIES: OpportunityListing[] = [
  // GOVERNMENT INTERNSHIPS
  {
    id: 'opp-gov-001',
    title: 'AICTE Smart Internships Programme 2026',
    organisation: 'All India Council for Technical Education (AICTE)',
    organisationType: 'Government',
    category: 'government-internship',
    departmentOrDomain: 'Engineering & Technology',
    qualification: ['Diploma', 'Undergraduate (B.E./B.Tech)', 'Postgraduate (M.E./M.Tech/MCA)'],
    eligibleCourses: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil'],
    targetCohorts: ['Diploma and Polytechnic', 'Undergraduate (UG)', 'Final-year Students'],
    requiredSkills: ['Problem Solving', 'Basic Programming or Core Engineering', 'Documentation'],
    location: 'Chennai / Coimbatore / Remote',
    state: 'Tamil Nadu',
    workMode: 'Hybrid',
    duration: '2 to 6 Months',
    isPaid: true,
    stipendOrSalary: 'INR 10,000 - 15,000 per month (as per ministry norms)',
    applicationOpenDate: '2026-01-15',
    applicationClosingDate: '2027-05-31',
    isClosed: false,
    requiredDocuments: [
      'College Bonafide Certificate / No Objection Certificate (NOC)',
      'Semester Marksheets or Diploma Certificate',
      'Student ID Card',
      'Aadhaar Card copy',
      'Resume / Curriculum Vitae',
    ],
    selectionProcedure: 'Application screening based on academic record, followed by technical evaluation and institutional recommendation.',
    applicationInstructions: [
      'Register on the official AICTE Internship Portal with your institutional email or mobile number.',
      'Complete student profile with academic qualification and university roll number.',
      'Upload approved Bonafide Certificate / NOC signed by College Principal or Head of Department.',
      'Search for AICTE-approved Tamil Nadu internship opportunities and submit application directly.',
      'Monitor application status on student dashboard.',
    ],
    officialNotificationUrl: 'https://internship.aicte-india.org/',
    officialApplicationUrl: 'https://internship.aicte-india.org/',
    officialPortalDomain: 'aicte-india.org',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-10',
    description: 'National digital internship platform hosted by AICTE providing verified industry and government internships for engineering and polytechnic students.',
    whatHappensAfter: 'Award of AICTE Official Internship Completion Certificate, academic credit transfer under UGC/AICTE framework (up to 4-8 credits as per university norms).',
    contactOrHelpline: 'AICTE Helpline: 011-29581000 | internship@aicte-india.org',
  },
  {
    id: 'opp-gov-002',
    title: 'NITI Aayog Official Internship Scheme',
    organisation: 'NITI Aayog (National Institution for Transforming India)',
    organisationType: 'Government',
    category: 'government-internship',
    departmentOrDomain: 'Public Policy, Economics, Governance & Data Analytics',
    qualification: ['Undergraduate (Final Year)', 'Postgraduate', 'PhD and Research'],
    eligibleCourses: ['Economics', 'Public Administration', 'Law', 'Commerce', 'Engineering', 'Statistics'],
    targetCohorts: ['Undergraduate (UG)', 'Postgraduate (PG)', 'PhD and Research'],
    requiredSkills: ['Policy Research', 'Data Analysis', 'Report Writing', 'Secondary Research'],
    location: 'New Delhi / Remote Research Window',
    state: 'National',
    workMode: 'Hybrid',
    duration: '6 Weeks to 6 Months',
    isPaid: false,
    stipendOrSalary: 'Unpaid (Honorary Government Internship with official policy citation)',
    applicationOpenDate: '2026-01-01',
    applicationClosingDate: '2026-12-31',
    isClosed: false,
    requiredDocuments: [
      'College Bonafide & NOC issued strictly in NITI Aayog prescribed Annexure format',
      'Undergraduate / Postgraduate Consolidated Marksheet (Minimum 70% aggregate)',
      'Government Photo ID (Aadhaar / Voter ID)',
      'Statement of Purpose (SOP) on policy domain interest (500 words)',
    ],
    selectionProcedure: 'Strict merit-based screening of academic grades (minimum 70% or equivalent CGPA) and evaluation of policy domain statement.',
    applicationInstructions: [
      'Applications open online between the 1st and 10th of every calendar month on NITI Aayog portal.',
      'Fill online application form and upload Annexure-C Bonafide form signed by Head of Institution.',
      'Select preferred policy vertical (e.g., Education, Healthcare, Agriculture, Industry, Data Analytics).',
      'Shortlisted applicants receive an official email confirmation with designated mentor assignment.',
    ],
    officialNotificationUrl: 'https://www.niti.gov.in/internship',
    officialApplicationUrl: 'https://www.niti.gov.in/internship',
    officialPortalDomain: 'niti.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-01',
    description: 'Prestigious national policy internship giving undergraduate, postgraduate and doctoral students first-hand exposure to government policy formation, sector evaluation and monitoring.',
    whatHappensAfter: 'Official NITI Aayog Experience Certificate signed by Adviser/Joint Secretary; high-value credential for UPSC, civil services, policy research and multilateral agencies.',
    contactOrHelpline: 'internship-niti@gov.in',
  },
  {
    id: 'opp-gov-003',
    title: 'ISRO Student Internship & Project Trainee Programme',
    organisation: 'Indian Space Research Organisation (ISRO) - VSSC / IPRC Mahendragiri',
    organisationType: 'Government',
    category: 'government-internship',
    departmentOrDomain: 'Space Sciences, Propulsion, Aerospace & Satellite Engineering',
    qualification: ['Undergraduate (B.E./B.Tech 3rd/4th Year)', 'Postgraduate (M.E./M.Tech/M.Sc)', 'PhD and Research'],
    eligibleCourses: ['Aerospace', 'Mechanical', 'Electronics & Communication', 'Computer Science', 'Physics', 'Mathematics'],
    targetCohorts: ['Undergraduate (UG)', 'Postgraduate (PG)', 'PhD and Research'],
    requiredSkills: ['Fluid Mechanics / Thermodynamics', 'Embedded Systems / Signal Processing', 'Mathematical Modeling'],
    location: 'Mahendragiri (Tirunelveli District, Tamil Nadu) / Bengaluru / Thiruvananthapuram',
    state: 'Tamil Nadu',
    district: 'Tirunelveli',
    workMode: 'On-site',
    duration: '45 Days to 6 Months',
    isPaid: false,
    stipendOrSalary: 'Unpaid (Government Research Lab Access & Supercomputing facilities provided)',
    applicationOpenDate: '2026-02-01',
    applicationClosingDate: '2027-06-30',
    isClosed: false,
    requiredDocuments: [
      'Official Institutional Recommendation letter from Dean / Principal',
      'All semester grade sheets with minimum 65% aggregate or 6.84 CGPA',
      'Aadhaar verification document',
      'Detailed resume with academic project abstract',
    ],
    selectionProcedure: 'Institutional merit ranking, security clearance, and faculty recommendation matching available scientist project capacity.',
    applicationInstructions: [
      'Visit ISRO Centre website (e.g., IPRC Mahendragiri or VSSC).',
      'Download standard Project Trainee / Internship requisition form.',
      'Get form endorsed by University Principal with college seal.',
      'Submit online or dispatch hard copy with marksheets to the Human Resource Development Division (HRDD).',
      'Wait for official clearance call letter.',
    ],
    officialNotificationUrl: 'https://www.isro.gov.in/',
    officialApplicationUrl: 'https://www.iprc.gov.in/',
    officialPortalDomain: 'isro.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-03-25',
    description: 'Premier space engineering research training for meritorious Tamil Nadu and Indian students at ISRO Propulsion Complex (IPRC) Mahendragiri and associated centres.',
    whatHappensAfter: 'Formal ISRO Project Training Certificate, publication support for cutting-edge space engineering research projects.',
    contactOrHelpline: 'hrdd@iprc.gov.in',
  },
  {
    id: 'opp-gov-004',
    title: 'CSIR-CECRI Summer Research Internship',
    organisation: 'CSIR - Central Electrochemical Research Institute (CECRI)',
    organisationType: 'Government',
    category: 'government-internship',
    departmentOrDomain: 'Electrochemistry, Battery Tech, Materials Science & Renewable Energy',
    qualification: ['B.Sc / M.Sc (Chemistry / Physics)', 'B.E. / B.Tech (Chemical / Materials / ECE)', 'PhD and Research'],
    eligibleCourses: ['Chemistry', 'Chemical Engineering', 'Materials Science', 'Nanotechnology', 'Physics'],
    targetCohorts: ['Undergraduate (UG)', 'Postgraduate (PG)', 'PhD and Research'],
    requiredSkills: ['Laboratory Protocols', 'Analytical Chemistry', 'Materials Characterization'],
    location: 'Karaikudi (Sivaganga District, Tamil Nadu)',
    state: 'Tamil Nadu',
    district: 'Sivaganga',
    workMode: 'On-site',
    duration: '6 to 8 Weeks',
    isPaid: true,
    stipendOrSalary: 'INR 5,000 per month (Summer Fellowship candidates)',
    applicationOpenDate: '2026-02-15',
    applicationClosingDate: '2027-04-30',
    isClosed: false,
    requiredDocuments: [
      'Recommendation letter from Head of Department',
      'Consolidated academic marksheet (minimum 60%)',
      'Community Certificate (for statutory relaxation categories)',
      'Brief 1-page Research Interest Synopsis',
    ],
    selectionProcedure: 'Academic merit index and relevance of research synopsis to CSIR electrochemical divisions.',
    applicationInstructions: [
      'Access CSIR-CECRI Karaikudi official training portal.',
      'Register student profile and submit research interest statement.',
      'Upload endorsement from current college/university.',
      'Selected fellows receive project assignment with designated Chief Scientist.',
    ],
    officialNotificationUrl: 'https://www.cecri.res.in/',
    officialApplicationUrl: 'https://www.cecri.res.in/',
    officialPortalDomain: 'cecri.res.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-05',
    description: 'Premier national laboratory internship in electrochemical science, lithium-ion battery storage, corrosion engineering and hydrogen fuel cells in Karaikudi, Tamil Nadu.',
    whatHappensAfter: 'CSIR National Laboratory Certification, pathway to Junior Research Fellowship (JRF) and project scientist appointments.',
    contactOrHelpline: 'training@cecri.res.in',
  },
  {
    id: 'opp-gov-005',
    title: 'Tamil Nadu e-Governance Agency (TNeGA) Student Trainee Internship',
    organisation: 'Tamil Nadu e-Governance Agency (Information Technology Department, GoTN)',
    organisationType: 'Government',
    category: 'government-internship',
    departmentOrDomain: 'Digital Public Infrastructure, Cloud, GIS & e-District Portals',
    qualification: ['Diploma (Computer Engg / IT)', 'Undergraduate (B.E./B.Tech/BCA/B.Sc CS)', 'Postgraduate (MCA/M.Sc IT)'],
    eligibleCourses: ['Computer Science', 'Information Technology', 'Software Engineering', 'Data Science'],
    targetCohorts: ['Diploma and Polytechnic', 'Undergraduate (UG)', 'Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['Web Technologies (React/Next.js/Node)', 'SQL Databases', 'RESTful APIs', 'Basic Cloud Systems'],
    location: 'Chennai (PT Lee Chengalvaraya Naicker Building)',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'On-site',
    duration: '3 to 6 Months',
    isPaid: true,
    stipendOrSalary: 'INR 12,000 per month (State Government Trainee Stipend)',
    applicationOpenDate: '2026-01-10',
    applicationClosingDate: '2027-05-15',
    isClosed: false,
    requiredDocuments: [
      'Degree / Diploma Marksheet with minimum 65%',
      'Bonafide Certificate from College or Degree Certificate for Freshers',
      'Government ID (Aadhaar)',
      'GitHub / Portfolio link demonstrating software work',
    ],
    selectionProcedure: 'Technical screening of code portfolio followed by practical coding assessment and virtual interview.',
    applicationInstructions: [
      'Submit resume and technical portfolio via official TNeGA careers portal.',
      'Provide College Registration Number and Academic Institution details.',
      'Complete online technical skills questionnaire.',
      'Shortlisted candidates attend interview at TNeGA Chennai headquarters.',
    ],
    officialNotificationUrl: 'https://tnega.tn.gov.in/',
    officialApplicationUrl: 'https://tnega.tn.gov.in/',
    officialPortalDomain: 'tnega.tn.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-12',
    description: 'State government IT internship assisting in the development and maintenance of Tamil Nadu digital public services including e-Sevai, e-District and Uzhavan applications.',
    whatHappensAfter: 'Government of Tamil Nadu Official Internship Credential, direct project exposure to high-scale citizen governance software.',
    contactOrHelpline: 'tnega.support@tn.gov.in',
  },

  // PRIVATE COMPANY INTERNSHIPS
  {
    id: 'opp-pvt-001',
    title: 'Zoho Software Development Internship',
    organisation: 'Zoho Corporation',
    organisationType: 'Private',
    category: 'private-internship',
    departmentOrDomain: 'Cloud Applications, SaaS Software & Core Engineering',
    qualification: ['Diploma in Computer Technology', 'Undergraduate (Any Degree / B.E. / B.Tech / B.Sc)', 'Postgraduate (MCA / M.Sc)'],
    eligibleCourses: ['Computer Science', 'Information Technology', 'Electronics', 'Mathematics', 'Physics', 'Any Analytical Stream'],
    targetCohorts: ['Diploma and Polytechnic', 'Undergraduate (UG)', 'Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['C / C++ / Java / Python', 'Data Structures & Algorithms', 'Analytical Thinking', 'Problem Solving'],
    location: 'Chennai / Tenkasi / Salem / Madurai / Coimbatore',
    state: 'Tamil Nadu',
    workMode: 'On-site',
    duration: '6 Months (Full-Time Internship)',
    isPaid: true,
    stipendOrSalary: 'INR 15,000 - 20,000 per month',
    applicationOpenDate: '2026-01-01',
    applicationClosingDate: '2026-12-31',
    isClosed: false,
    requiredDocuments: [
      'Resume with projects and programming languages known',
      'College ID Card or Highest Qualification Certificate',
      'Government Photo ID',
    ],
    selectionProcedure: 'Zoho Written Test (C Aptitude, General Aptitude, Basic Programming), Advanced Programming Round, Technical Interview, and HR evaluation.',
    applicationInstructions: [
      'Register on Zoho official careers page (zoho.com/careers).',
      'Select Internship Opportunities for Software Developers.',
      'Choose preferred test location (Chennai, Tenkasi, or Virtual).',
      'Attend the designated written examination session.',
      'Zero fee required: Zoho never charges any application or placement fee.',
    ],
    officialNotificationUrl: 'https://www.zoho.com/careers/',
    officialApplicationUrl: 'https://www.zoho.com/careers/',
    officialPortalDomain: 'zoho.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-04-14',
    description: 'Premier Tamil Nadu product software engineering internship focusing on scalable cloud SaaS architecture. High conversion rate to full-time Software Engineer positions.',
    whatHappensAfter: 'Successful completion regularly results in full-time employment offer as Member Technical Staff (MTS) with starting packages of 6-8.5 LPA.',
  },
  {
    id: 'opp-pvt-002',
    title: 'TCS CBO / Engineering Graduate Trainee Internship',
    organisation: 'Tata Consultancy Services (TCS)',
    organisationType: 'Private',
    category: 'private-internship',
    departmentOrDomain: 'Enterprise Systems, Cloud Solutions & Business Operations',
    qualification: ['B.E. / B.Tech', 'B.Sc / BCA', 'B.Com / BBA (Operations track)'],
    eligibleCourses: ['All Engineering Branches', 'Computer Applications', 'Commerce', 'Science'],
    targetCohorts: ['Undergraduate (UG)', 'Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['Foundational Programming or Business Communication', 'SQL Basics', 'Cognitive Ability'],
    location: 'Chennai (Siruseri / Sholinganallur) / Coimbatore',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'Hybrid',
    duration: '3 to 6 Months',
    isPaid: true,
    stipendOrSalary: 'INR 18,000 per month',
    applicationOpenDate: '2026-01-20',
    applicationClosingDate: '2027-05-30',
    isClosed: false,
    requiredDocuments: [
      'TCS NextStep Registration CT/DT Reference Number',
      'Academic Marksheets from Class 10 to Final Semester',
      'Resume',
      'College Bonafide for college students',
    ],
    selectionProcedure: 'TCS National Qualifier Test (NQT) score followed by Technical and Managerial interview rounds.',
    applicationInstructions: [
      'Register on TCS NextStep portal (nextstep.tcs.com).',
      'Create profile and generate CT/DT Number.',
      'Apply to Internship drive under IT or Business Operations category.',
      'Clear official online proctored TCS NQT test.',
    ],
    officialNotificationUrl: 'https://www.tcs.com/careers',
    officialApplicationUrl: 'https://www.tcs.com/careers',
    officialPortalDomain: 'tcs.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-04-08',
    description: 'Structured enterprise IT internship exposing students to multinational enterprise application architecture, testing and business process automation.',
    whatHappensAfter: 'Direct pre-placement offer (PPO) for TCS Ninja or TCS Digital engineering bands.',
  },
  {
    id: 'opp-pvt-003',
    title: 'Ashok Leyland Mechanical & Automotive Engineering Internship',
    organisation: 'Ashok Leyland Limited',
    organisationType: 'Private',
    category: 'private-internship',
    departmentOrDomain: 'Automotive Design, Electric Commercial Vehicles & Manufacturing',
    qualification: ['Diploma (Mechanical/Automobile/EEE)', 'B.E./B.Tech (Mechanical/Automobile/Production/EEE)'],
    eligibleCourses: ['Mechanical Engineering', 'Automobile Engineering', 'Electrical & Electronics', 'Mechatronics'],
    targetCohorts: ['Diploma and Polytechnic', 'Undergraduate (UG)', 'Final-year Students'],
    requiredSkills: ['CAD / SolidWorks / CATIA', 'IC Engines / EV Powertrains', 'Shop Floor Basics'],
    location: 'Hosur (Krishnagiri District) / Ennore (Chennai)',
    state: 'Tamil Nadu',
    district: 'Krishnagiri',
    workMode: 'On-site',
    duration: '3 to 6 Months',
    isPaid: true,
    stipendOrSalary: 'INR 12,000 - 16,000 per month',
    applicationOpenDate: '2026-02-01',
    applicationClosingDate: '2027-06-15',
    isClosed: false,
    requiredDocuments: [
      'College NOC explicitly specifying plant safety compliance',
      'Semester marksheets with minimum 60% marks',
      'Resume with academic mechanical project details',
      'Safety shoes and standard manufacturing PPE declaration',
    ],
    selectionProcedure: 'Academic profile review followed by plant engineering assessment and safety orientation.',
    applicationInstructions: [
      'Submit student profile on Ashok Leyland Career Portal.',
      'Select Manufacturing Plant Location (Hosur Plant 1/2 or Ennore).',
      'Attach College Principal Recommendation letter.',
      'Attend technical interview at designated manufacturing unit.',
    ],
    officialNotificationUrl: 'https://www.ashokleyland.com/careers',
    officialApplicationUrl: 'https://www.ashokleyland.com/careers',
    officialPortalDomain: 'ashokleyland.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-03-30',
    description: 'Premier automotive manufacturing and EV R&D internship in Tamil Nadu heavy vehicle manufacturing hubs in Hosur and Chennai.',
    whatHappensAfter: 'Industrial Experience Certificate recognized across the automotive sector, consideration for Graduate Engineer Trainee (GET) drives.',
  },
  {
    id: 'opp-pvt-004',
    title: 'Apollo Hospitals Clinical & Healthcare Administration Trainee',
    organisation: 'Apollo Hospitals Enterprise Limited',
    organisationType: 'Private',
    category: 'private-internship',
    departmentOrDomain: 'Healthcare Administration, Hospital Operations & Clinical Records',
    qualification: ['B.Sc Nursing', 'B.Pharm / M.Pharm', 'B.Sc Allied Health Sciences', 'BBA / MBA Healthcare'],
    eligibleCourses: ['Hospital Administration', 'Pharmacy', 'Nursing', 'Biochemistry', 'Biotechnology', 'Management'],
    targetCohorts: ['Undergraduate (UG)', 'Postgraduate (PG)', 'Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['Patient Care Protocols', 'Medical Documentation', 'Hospital Information Systems (HIS)'],
    location: 'Chennai (Greams Road) / Madurai / Tiruchirappalli',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'On-site',
    duration: '6 Months',
    isPaid: true,
    stipendOrSalary: 'INR 10,000 - 14,000 per month',
    applicationOpenDate: '2026-01-15',
    applicationClosingDate: '2027-07-31',
    isClosed: false,
    requiredDocuments: [
      'Degree / Course Bonafide Certificate',
      'Medical Council / Pharmacy Council registration (for qualified graduates)',
      'Immunization & Health Clearance records',
      'Government ID',
    ],
    selectionProcedure: 'Credentials verification, aptitude test in hospital management, and personal panel interview.',
    applicationInstructions: [
      'Apply through Apollo Careers Hospital Trainee portal.',
      'Submit academic transcripts and internship training request from college.',
      'Attend written clinical/administrative round.',
    ],
    officialNotificationUrl: 'https://www.apollohospitals.com/careers/',
    officialApplicationUrl: 'https://www.apollohospitals.com/careers/',
    officialPortalDomain: 'apollohospitals.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-04-02',
    description: 'Comprehensive hospital operations and clinical services training at premier tertiary care hospital chain in Tamil Nadu.',
    whatHappensAfter: 'Hospital Operations Experience Certificate, preference in Apollo Hospital regular healthcare administrator vacancies.',
  },

  // APPRENTICESHIPS (NATS & NAPS)
  {
    id: 'opp-app-001',
    title: 'NATS Graduate & Technician Engineering Apprenticeship 2026',
    organisation: 'Southern Railway (Government of India / NATS)',
    organisationType: 'Public Sector (PSU)',
    category: 'apprenticeship',
    departmentOrDomain: 'Mechanical, Electrical, Signal & Civil Engineering Maintenance',
    qualification: ['Diploma in Engineering (Technician Apprentice)', 'B.E. / B.Tech (Graduate Apprentice)'],
    eligibleCourses: ['Mechanical', 'Electrical & Electronics', 'Civil', 'Electronics & Communication', 'Computer Science'],
    targetCohorts: ['Diploma and Polytechnic', 'Fresh Graduates'],
    requiredSkills: ['Industrial Machinery', 'Electrical Traction', 'Statutory Safety Codes', 'Maintenance Logging'],
    location: 'Chennai / Tiruchirappalli / Madurai / Salem / Perambur Workshops',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'On-site',
    duration: '1 Year (Statutory Apprenticeship Contract under Apprentices Act 1961)',
    isPaid: true,
    stipendOrSalary: 'Graduate: INR 9,000/month | Diploma Technician: INR 8,000/month (Statutory NATS rates)',
    applicationOpenDate: '2026-02-01',
    applicationClosingDate: '2027-05-15',
    isClosed: false,
    requiredDocuments: [
      'NATS Student Portal 16-Digit Enrolment ID Number',
      'Engineering Degree or Diploma Provisional Certificate',
      'Consolidated Marksheet (minimum 55%)',
      'Community Certificate (SC/ST/OBC/MBC/EWS for age & reservation benefits)',
      'Medical Fitness Certificate from Government Civil Surgeon',
    ],
    selectionProcedure: 'Strictly based on percentage of marks in Diploma or Engineering Degree; no written test or interview as per Apprentices Act norms.',
    applicationInstructions: [
      'Register first on National Apprenticeship Training Scheme (NATS 2.0) portal (nats.education.gov.in).',
      'Complete KYC with Aadhaar and bank account seeded with Aadhaar.',
      'Obtain approved NATS 16-digit Enrolment ID.',
      'Log into NATS student dashboard, search for Southern Railway establishment notification.',
      'Click "Apply" before the statutory deadline.',
    ],
    officialNotificationUrl: 'https://nats.education.gov.in/',
    officialApplicationUrl: 'https://nats.education.gov.in/',
    officialPortalDomain: 'nats.education.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-10',
    description: 'Statutory 1-year central government apprenticeship for fresh engineering graduates and diploma holders under the Ministry of Education NATS framework.',
    whatHappensAfter: 'Certificate of Proficiency awarded by Government of India. Qualifies candidates for central government technical jobs requiring 1-year mandatory apprenticeship experience.',
    contactOrHelpline: 'nats@boat-srp.com | 044-22542234 (Board of Apprenticeship Training, Southern Region, Chennai)',
  },
  {
    id: 'opp-app-002',
    title: 'TANGEDCO / TANTRANSCO Trade & Technical Apprenticeship',
    organisation: 'Tamil Nadu Generation and Distribution Corporation (TANGEDCO)',
    organisationType: 'Government',
    category: 'apprenticeship',
    departmentOrDomain: 'Power Distribution, Substation Maintenance & Thermal Power Stations',
    qualification: ['ITI (Electrician/Wireman/Fitter)', 'Diploma in Electrical & Electronics (EEE)', 'B.E. (EEE/ECE)'],
    eligibleCourses: ['Electrical Engineering', 'Electrician Trade', 'Wireman Trade', 'Mechanical Engineering'],
    targetCohorts: ['Class 10 (SSLC)', 'Diploma and Polytechnic', 'Fresh Graduates'],
    requiredSkills: ['Substation Operations', 'High Voltage Safety', 'Transformer Maintenance', 'Circuit Diagnosis'],
    location: 'All 38 Districts of Tamil Nadu (Circle Head Offices)',
    state: 'Tamil Nadu',
    workMode: 'On-site',
    duration: '1 Year',
    isPaid: true,
    stipendOrSalary: 'ITI Trade: INR 7,700/mo | Diploma: INR 8,000/mo | Graduate: INR 9,000/mo',
    applicationOpenDate: '2026-01-10',
    applicationClosingDate: '2027-06-30',
    isClosed: false,
    requiredDocuments: [
      'NATS / NAPS Portal Registration Confirmation',
      'ITI / Diploma / Degree Certificate & Consolidated Marksheet',
      'Community Certificate issued by TN Revenue Department',
      'Tamil Nadu Nativity Certificate',
    ],
    selectionProcedure: 'Merit list generated from marks obtained in basic technical qualification, adhering to Tamil Nadu 69% reservation rule.',
    applicationInstructions: [
      'For ITI candidates: Register on NAPS portal (apprenticeshipindia.gov.in).',
      'For Diploma/Degree: Register on NATS portal (nats.education.gov.in).',
      'Search for TANGEDCO establishment in your home district circle.',
      'Submit online application and track circle document verification dates.',
    ],
    officialNotificationUrl: 'https://www.tangedco.org/en/tangedco/',
    officialApplicationUrl: 'https://nats.education.gov.in/',
    officialPortalDomain: 'tangedco.org',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-06',
    description: 'State government statutory technical apprenticeship giving intensive practical exposure to Tamil Nadu power generation, distribution networks and substations.',
    whatHappensAfter: 'Government of India National Apprenticeship Certificate; statutory advantage in state electricity board direct recruitment assessments.',
  },

  // SKILL DEVELOPMENT PROGRAMMES
  {
    id: 'opp-skl-001',
    title: 'Naan Mudhalvan Advanced Industry Skilling Initiatives',
    organisation: 'Tamil Nadu Skill Development Corporation (TNSDC), Government of Tamil Nadu',
    organisationType: 'Government',
    category: 'skill-development',
    departmentOrDomain: 'Emerging Technologies, FinTech, Robotics, AI & Smart Manufacturing',
    qualification: ['Class 12', 'Diploma', 'Undergraduate (Arts, Science, Engineering)', 'Postgraduate'],
    eligibleCourses: ['All Higher Education Streams in Tamil Nadu Colleges'],
    targetCohorts: ['Class 11 and 12 (HSC)', 'Diploma and Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)', 'Final-year Students'],
    requiredSkills: ['Open to beginners; curriculum progresses from fundamentals to advanced industry projects'],
    location: 'College Campus Labs / Online Learning Platform across Tamil Nadu',
    state: 'Tamil Nadu',
    workMode: 'Hybrid',
    duration: '40 to 120 Hours (Integrated with College Curriculum)',
    isPaid: false,
    stipendOrSalary: '100% Free (Fully funded by Government of Tamil Nadu)',
    applicationOpenDate: '2026-01-01',
    applicationClosingDate: '2026-12-31',
    isClosed: false,
    requiredDocuments: [
      'Tamil Nadu College Student Roll Number / University Register Number',
      'Aadhaar Number',
      'College Bonafide verification through Naan Mudhalvan institutional login',
    ],
    selectionProcedure: 'Direct enrollment for all eligible students enrolled in government, government-aided and affiliated colleges across Tamil Nadu.',
    applicationInstructions: [
      'Access Naan Mudhalvan portal (naanmudhalvan.tn.gov.in) using your college student credentials.',
      'Select your domain track (e.g., Cloud Computing, EV Technology, Big Data, Blockchain, Medical Coding).',
      'Complete weekly modules, hands-on lab sessions and capstone evaluation.',
      'Appear for the joint industry certification assessment.',
    ],
    officialNotificationUrl: 'https://www.tnskill.tn.gov.in/',
    officialApplicationUrl: 'https://www.tnskill.tn.gov.in/',
    officialPortalDomain: 'tnskill.tn.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-12',
    description: 'Flagship Tamil Nadu youth empowerment scheme providing world-class industry certifications in partnership with global technology leaders (IBM, Microsoft, Google, Dassault, Infosys).',
    whatHappensAfter: 'Joint Industry Certification co-branded with Government of Tamil Nadu, priority access to Naan Mudhalvan mega placement job fairs.',
    contactOrHelpline: 'Toll-Free Helpline: 1800-425-6226 | support@naanmudhalvan.tn.gov.in',
  },
  {
    id: 'opp-skl-002',
    title: 'Skill India Digital Free FutureSkills Prime Certifications',
    organisation: 'National Skill Development Corporation (NSDC) & MeitY',
    organisationType: 'Government',
    category: 'skill-development',
    departmentOrDomain: 'AI, Cybersecurity, Cloud, Big Data & Internet of Things (IoT)',
    qualification: ['Class 10 (SSLC)', 'Class 12', 'Diploma', 'Any Graduate', 'Working Youth'],
    eligibleCourses: ['Open to all streams'],
    targetCohorts: ['Class 10 (SSLC)', 'Class 11 and 12 (HSC)', 'Diploma and Polytechnic', 'Undergraduate (UG)', 'Unemployed Youth'],
    requiredSkills: ['Basic Computer Literacy and English Comprehension'],
    location: '100% Online Self-Paced Learning',
    state: 'National',
    workMode: 'Remote',
    duration: '20 to 60 Hours',
    isPaid: false,
    stipendOrSalary: '100% Free (Government of India subsidized digital skilling initiative)',
    applicationOpenDate: '2026-01-01',
    applicationClosingDate: '2026-12-31',
    isClosed: false,
    requiredDocuments: [
      'Aadhaar-based e-KYC on Skill India Digital Portal',
      'Mobile number linked with Aadhaar for OTP verification',
    ],
    selectionProcedure: 'Immediate online enrollment with progress-based automated module assessments.',
    applicationInstructions: [
      'Visit official Skill India Digital portal (skillindiadigital.gov.in).',
      'Sign in using your mobile number and Aadhaar OTP.',
      'Browse "FutureSkills Prime" catalogue and select course.',
      'Watch video lessons, complete quizzes and download Government of India verified e-Certificate.',
    ],
    officialNotificationUrl: 'https://www.skillindiadigital.gov.in/',
    officialApplicationUrl: 'https://www.skillindiadigital.gov.in/',
    officialPortalDomain: 'skillindiadigital.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-09',
    description: 'National digital skilling portal offering verified government certifications in AI, cloud computing, cybersecurity and office automation.',
    whatHappensAfter: 'DigiLocker-compatible National Skill Qualification Framework (NSQF) aligned certification; linked to National Career Service (NCS) employer directory.',
  },

  // GOVERNMENT RECRUITMENT & JOBS
  {
    id: 'opp-rec-001',
    title: 'TNPSC Combined Civil Services Examination (Group 4 & VAO)',
    organisation: 'Tamil Nadu Public Service Commission (TNPSC)',
    organisationType: 'Government',
    category: 'government-job',
    departmentOrDomain: 'Revenue Administration, Ministerial Services & Village Administration',
    qualification: ['Class 10 (SSLC pass minimum qualifying mark)'],
    eligibleCourses: ['SSLC / 10th Standard or any higher degree'],
    targetCohorts: ['Class 10 (SSLC)', 'Diploma and Polytechnic', 'Fresh Graduates', 'Unemployed Youth'],
    requiredSkills: ['General Studies', 'Aptitude & Mental Ability', 'Tamil Language & Literature (General Tamil)'],
    location: 'All 38 Districts of Tamil Nadu (State Government Offices)',
    state: 'Tamil Nadu',
    workMode: 'On-site',
    duration: 'Permanent State Government Service',
    isPaid: true,
    stipendOrSalary: 'Level 8 / Level 10 Pay Matrix: INR 19,500 - 62,000 + DA & HRA',
    applicationOpenDate: '2026-01-30',
    applicationClosingDate: '2027-04-30',
    isClosed: false,
    requiredDocuments: [
      'TNPSC One Time Registration (OTR) Profile & Login',
      'Class 10 SSLC Marksheet (with proof of Tamil as a subject)',
      'Community Certificate issued by Tahsildar / Revenue Authority',
      'PSTM Certificate (Persons Studied in Tamil Medium) if claiming 20% quota',
      'Differently Abled / Destitute Widow / Ex-Servicemen Certificate where applicable',
    ],
    selectionProcedure: 'Single-stage Objective Written Examination (300 Marks: 100 Tamil Eligibility + 75 General Studies + 25 Aptitude), followed by Certificate Verification and Counselling.',
    applicationInstructions: [
      'Log into TNPSC official portal (tnpsc.gov.in).',
      'Verify that your One Time Registration (OTR) is active and Aadhaar-linked.',
      'Click on Notification for Combined Civil Services Examination (Group 4).',
      'Submit application form, verify post preferences (VAO, Junior Assistant, Typist, Bill Collector).',
      'Pay fee online (INR 100, fee exempt for SC/ST/differently abled as per rules).',
    ],
    officialNotificationUrl: 'https://www.tnpsc.gov.in/',
    officialApplicationUrl: 'https://www.tnpsc.gov.in/',
    officialPortalDomain: 'tnpsc.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-14',
    description: 'State government competitive recruitment for thousands of administrative posts in Tamil Nadu Government departments with minimum Class 10 qualification.',
    whatHappensAfter: 'Permanent Tamil Nadu State Government employment with pension benefits under New Pension Scheme, promotion ladder to Deputy Tahsildar and Block Development Officer.',
    contactOrHelpline: 'Toll Free: 1800-419-0958 | helpdesk@tnpscexams.in',
  },
  {
    id: 'opp-rec-002',
    title: 'TNUSRB Sub-Inspector of Police (Taluk, AR & TSP) Recruitment',
    organisation: 'Tamil Nadu Uniformed Services Recruitment Board (TNUSRB)',
    organisationType: 'Government',
    category: 'government-job',
    departmentOrDomain: 'Police Administration & Law Enforcement',
    qualification: ['Bachelor Degree in any discipline from a recognized university'],
    eligibleCourses: ['B.A.', 'B.Sc', 'B.Com', 'B.E./B.Tech', 'BBA', 'Any UGC-recognized degree'],
    targetCohorts: ['Undergraduate (UG)', 'Fresh Graduates', 'Unemployed Youth'],
    requiredSkills: ['Physical Endurance & Fitness', 'General Knowledge & Science', 'Psychology & Logical Reasoning'],
    location: 'Across Police Ranges in Tamil Nadu',
    state: 'Tamil Nadu',
    workMode: 'On-site',
    duration: 'Permanent State Police Service',
    isPaid: true,
    stipendOrSalary: 'Pay Scale: INR 36,900 - 1,16,600 (Level 13 Pay Matrix)',
    applicationOpenDate: '2026-03-01',
    applicationClosingDate: '2027-06-01',
    isClosed: false,
    requiredDocuments: [
      'Degree Certificate and Consolidated Marksheet',
      'Class 10 Certificate (proof of date of birth and Tamil language study)',
      'Community Certificate',
      'PSTM Certificate (for candidates claiming Tamil medium quota)',
      'Physical Measurement Self-Declaration',
    ],
    selectionProcedure: 'Written Examination (Part I Tamil Language Eligibility + Part II Main Exam), Physical Measurement Test (PMT), Endurance Test (ET), Physical Efficiency Test (PET), Viva-Voce (Interview) and Medical Examination.',
    applicationInstructions: [
      'Register on official TNUSRB portal (tnusrb.tn.gov.in).',
      'Fill candidate bio-data, educational qualifications and height/chest measurements.',
      'Upload photograph and digital signature as per specifications.',
      'Pay examination fee online.',
      'Download hall ticket when published for district examination centre.',
    ],
    officialNotificationUrl: 'https://tnusrb.tn.gov.in/',
    officialApplicationUrl: 'https://tnusrb.tn.gov.in/',
    officialPortalDomain: 'tnusrb.tn.gov.in',
    verificationStatus: 'Official Source Verified',
    lastVerifiedDate: '2026-04-11',
    description: 'State police service recruitment for Sub-Inspector posts across Taluk, Armed Reserve and Tamil Nadu Special Police battalions.',
    whatHappensAfter: '1-Year comprehensive police training at Tamil Nadu Police Academy (TNPA), Oorapakkam, Chennai, followed by Sub-Inspector posting.',
    contactOrHelpline: 'TNUSRB Helpline: 044-28413658',
  },

  // PRIVATE COMPANY JOBS
  {
    id: 'opp-pjob-001',
    title: 'Freshworks Associate Software Engineer (Fresher)',
    organisation: 'Freshworks Inc.',
    organisationType: 'Private',
    category: 'private-job',
    departmentOrDomain: 'Software Engineering & SaaS Customer Experience',
    qualification: ['B.E. / B.Tech / MCA (Graduating or Recent Fresh Graduates)'],
    eligibleCourses: ['Computer Science', 'Information Technology', 'Software Engineering', 'ECE', 'EEE'],
    targetCohorts: ['Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['JavaScript / TypeScript', 'Ruby on Rails / Python / Java', 'Web Architecture', 'Git Basics'],
    location: 'Chennai (Kandanchavadi, OMR)',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'Hybrid',
    duration: 'Full-Time Permanent Employment',
    isPaid: true,
    stipendOrSalary: 'INR 7,00,000 - 10,00,000 per annum (Disclosed base + benefits)',
    applicationOpenDate: '2026-02-15',
    applicationClosingDate: '2027-05-30',
    isClosed: false,
    requiredDocuments: [
      'Resume detailing coding projects and hackathon participation',
      'GitHub / Live Project URLs',
      'Degree Consolidated Marksheet (Minimum 65% aggregate)',
    ],
    selectionProcedure: 'Online coding assessment (HackerRank), technical system design round, code review interview, and culture fit conversation.',
    applicationInstructions: [
      'Visit Freshworks Careers website (freshworks.com/company/careers).',
      'Search for "Associate Software Engineer - Freshers" Chennai opening.',
      'Submit direct application without agents or third-party brokers.',
      'Complete online assessment link delivered via official freshworks.com email.',
    ],
    officialNotificationUrl: 'https://www.freshworks.com/company/careers/',
    officialApplicationUrl: 'https://www.freshworks.com/company/careers/',
    officialPortalDomain: 'freshworks.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-04-07',
    description: 'High-growth cloud SaaS software engineering fresher role in Chennai building customer service and CRM platforms serving global enterprises.',
    whatHappensAfter: 'Full-time engineering role with equity options, mentor allocation and international technology career path.',
  },
  {
    id: 'opp-pjob-002',
    title: 'L&T Construction Graduate Engineer Trainee (GET)',
    organisation: 'Larsen & Toubro (L&T) Construction',
    organisationType: 'Private',
    category: 'private-job',
    departmentOrDomain: 'Civil Infrastructure, Heavy Civil & Transportation Projects',
    qualification: ['B.E. / B.Tech (Civil / Mechanical / Electrical) with minimum 65% marks'],
    eligibleCourses: ['Civil Engineering', 'Structural Engineering', 'Mechanical', 'Electrical'],
    targetCohorts: ['Final-year Students', 'Fresh Graduates'],
    requiredSkills: ['AutoCAD / Revit', 'Site Engineering Fundamentals', 'Quantity Surveying', 'Project Planning'],
    location: 'Chennai (Manapakkam Headquarters) / Project Sites across Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Chennai',
    workMode: 'On-site',
    duration: '1-Year Trainee Period followed by Confirmation as Senior Executive',
    isPaid: true,
    stipendOrSalary: 'INR 5,50,000 - 6,50,000 per annum',
    applicationOpenDate: '2026-01-25',
    applicationClosingDate: '2027-06-30',
    isClosed: false,
    requiredDocuments: [
      'B.E./B.Tech 8-Semester Marksheets without active backlogs',
      'Class 10 & 12 Certificates',
      'Institutional Placement Clearance or Direct Application Bio-Data',
    ],
    selectionProcedure: 'L&T Build India Scholarship / National Graduate Engineer Test, Technical Interview, and Medical Fitness examination.',
    applicationInstructions: [
      'Access L&T Careers portal (lntecc.com or larsentoubro.com/careers).',
      'Register under Engineering Graduate Trainee portal.',
      'Complete online technical & psychometric assessment.',
      'Shortlisted engineers attend technical panel at L&T Manapakkam campus.',
    ],
    officialNotificationUrl: 'https://www.larsentoubro.com/corporate/careers/',
    officialApplicationUrl: 'https://www.larsentoubro.com/corporate/careers/',
    officialPortalDomain: 'larsentoubro.com',
    verificationStatus: 'Employer Source Verified',
    lastVerifiedDate: '2026-04-03',
    description: 'Premier civil and infrastructure engineering trainee opportunity on landmark metro, highway and smart city projects in Tamil Nadu.',
    whatHappensAfter: 'Confirmation as Executive Engineer at L&T Construction with accelerated corporate leadership opportunities.',
  },
];

// ---------------------------------------------------------------------------
// 2. OFFICIAL SOURCE & PORTAL DIRECTORY
// ---------------------------------------------------------------------------
export const OFFICIAL_PORTALS_DIRECTORY: OfficialPortalDirectoryEntry[] = [
  {
    id: 'portal-aicte',
    name: 'AICTE Internship Enterprise Portal',
    category: 'Government Internships',
    scope: 'National',
    officialUrl: 'https://internship.aicte-india.org/',
    domain: 'aicte-india.org',
    description: 'Official digital platform connecting technical, polytechnic and engineering students with verified central, state and corporate internships.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Ministry Internships', 'Corporate Internships', 'Credit Transfer Tracking', 'Smart City Internships'],
    nodalAuthority: 'All India Council for Technical Education, Ministry of Education, Govt of India',
    helpline: '011-29581000',
  },
  {
    id: 'portal-nats',
    name: 'National Apprenticeship Training Scheme (NATS 2.0)',
    category: 'Apprenticeships',
    scope: 'National',
    officialUrl: 'https://nats.education.gov.in/',
    domain: 'nats.education.gov.in',
    description: 'National portal for 1-year statutory apprenticeships for engineering graduates and diploma holders under the Apprentices Act 1961.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Graduate Apprenticeships', 'Diploma Technician Apprenticeships', 'Direct Benefit Transfer (DBT) Stipend', 'Proficiency Certificates'],
    nodalAuthority: 'Board of Apprenticeship Training (BOAT), Department of Higher Education, Govt of India',
    helpline: '044-22542234 (Southern Region, Taramani, Chennai)',
  },
  {
    id: 'portal-naps',
    name: 'National Apprenticeship Promotion Scheme (NAPS)',
    category: 'Apprenticeships',
    scope: 'National',
    officialUrl: 'https://www.apprenticeshipindia.gov.in/',
    domain: 'apprenticeshipindia.gov.in',
    description: 'National trade and non-engineering apprenticeship portal catering to ITI holders, Class 10/12 pass outs and general degree students.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Trade Apprenticeships', 'Designated Trades', 'Optional Trades', 'Apprenticeship Contracts'],
    nodalAuthority: 'Ministry of Skill Development and Entrepreneurship (MSDE), Govt of India',
  },
  {
    id: 'portal-tn-velaivaaippu',
    name: 'Tamil Nadu Department of Employment & Training (TN Velaivaaippu)',
    category: 'Employment Exchange',
    scope: 'Tamil Nadu',
    officialUrl: 'https://tnvelaivaaippu.gov.in/',
    domain: 'tnvelaivaaippu.gov.in',
    description: 'Official government portal for employment exchange registration, seniority seniority tracking, educational qualification upgrades and unemployment assistance.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Online Candidate Registration', 'Seniority Maintenance', 'Qualification Updation', 'Registration Renewal', 'District Employment Offices'],
    nodalAuthority: 'Directorate of Employment and Training, Labour Welfare and Skill Development Department, Govt of Tamil Nadu',
    helpline: '044-22500135 / 044-22500136',
  },
  {
    id: 'portal-ncs',
    name: 'National Career Service (NCS) Portal',
    category: 'Employment Exchange',
    scope: 'National',
    officialUrl: 'https://www.ncs.gov.in/',
    domain: 'ncs.gov.in',
    description: 'Ministry of Labour & Employment mission providing a unified national platform for jobseekers, employers, career counselling and job fairs.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Jobseeker NCS ID Card', 'Aadhaar Profile Seed', 'Model Career Centres', 'Mega Job Fairs', 'Career Counselling'],
    nodalAuthority: 'Ministry of Labour and Employment, Government of India',
    helpline: 'Toll-Free Helpline: 1800-425-1514',
  },
  {
    id: 'portal-naan-mudhalvan',
    name: 'Naan Mudhalvan Skilling Portal',
    category: 'Skill Development',
    scope: 'Tamil Nadu',
    officialUrl: 'https://www.tnskill.tn.gov.in/',
    domain: 'tnskill.tn.gov.in',
    description: 'Government of Tamil Nadu flagship skill initiative bridging the industry-academia gap through in-demand technology, engineering, language and competitive exam training.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Curriculum-Integrated Skilling', 'Industry Certifications', 'Placement Fairs', 'Higher Education Guidance'],
    nodalAuthority: 'Tamil Nadu Skill Development Corporation (TNSDC), Government of Tamil Nadu',
    helpline: '1800-425-6226',
  },
  {
    id: 'portal-skill-india',
    name: 'Skill India Digital Hub',
    category: 'Skill Development',
    scope: 'National',
    officialUrl: 'https://www.skillindiadigital.gov.in/',
    domain: 'skillindiadigital.gov.in',
    description: 'Unified digital platform for all skilling schemes, ITI admissions, PMKVY courses, sector skill councils and digital credentials.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['NSQF Certifications', 'FutureSkills Prime', 'PMKVY Schemes', 'Apprenticeship Discovery'],
    nodalAuthority: 'National Skill Development Corporation (NSDC), Govt of India',
  },
  {
    id: 'portal-tnpsc',
    name: 'Tamil Nadu Public Service Commission (TNPSC)',
    category: 'Government Jobs',
    scope: 'Tamil Nadu',
    officialUrl: 'https://www.tnpsc.gov.in/',
    domain: 'tnpsc.gov.in',
    description: 'Constitutional body responsible for conducting recruitment examinations for Tamil Nadu State Government civil, technical and judicial services.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Group 1 to Group 8 Examinations', 'One Time Registration', 'Online Applications', 'Results & Answer Keys'],
    nodalAuthority: 'Tamil Nadu Public Service Commission, Chennai',
    helpline: '1800-419-0958',
  },
  {
    id: 'portal-isro',
    name: 'ISRO Research & Internship Portal',
    category: 'Government Internships',
    scope: 'National',
    officialUrl: 'https://www.isro.gov.in/',
    domain: 'isro.gov.in',
    description: 'Official portal for space research project trainee opportunities, student fellowships and academic research collaborations.',
    operationalStatus: 'Online & Verified',
    primaryServices: ['Project Trainee Admissions', 'Summer Fellowships', 'RESPOND Space Science Grants'],
    nodalAuthority: 'Department of Space, Government of India',
  },
];

// ---------------------------------------------------------------------------
// 3. TAMIL NADU EMPLOYMENT EXCHANGE COMPREHENSIVE GUIDE
// ---------------------------------------------------------------------------
export const TN_VELAIVAAIPPU_GUIDE: TNEmploymentExchangeGuide[] = [
  {
    id: 'step-01',
    stepNumber: 1,
    title: 'New Online Candidate Registration',
    description: 'Students who have completed Class 10 (SSLC) can register online immediately after publication of board exam marks.',
    details: [
      'Visit official TN Velaivaaippu portal: tnvelaivaaippu.gov.in.',
      'Click on "Job Seeker" -> "New User Registration".',
      'Accept terms & conditions and agree to the declaration.',
      'Enter personal details matching your educational marksheets exactly.',
      'Select your native Tamil Nadu district and local District Employment Office (DEO).',
    ],
    requiredDocuments: [
      'SSLC Marksheet with registration number and year of passing',
      'Transfer Certificate (TC)',
      'Community Certificate (OBC/MBC/BC/SC/ST/EWS)',
      'Aadhaar Card and Mobile Number',
      'Recent Passport-Size Photograph',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
  {
    id: 'step-02',
    stepNumber: 2,
    title: 'Entering Educational Qualifications',
    description: 'Input all academic certificates sequentially starting from SSLC to maintain seniority calculation.',
    details: [
      'Step 1: Enter SSLC details (Board: State Board / CBSE, Marks, Medium of Instruction, Subject details).',
      'Step 2: Enter HSC (Class 12) if completed, specifying science, commerce or arts group.',
      'Step 3: Enter Diploma / ITI trade or Undergraduate degree certificate with university register number.',
      'Crucial: Verify medium of instruction (Tamil or English) to secure PSTM quota benefits.',
    ],
    requiredDocuments: [
      'Original Marksheets of all completed courses',
      'Provisional or Degree Certificate for College Graduates',
      'PSTM Certificate (Persons Studied in Tamil Medium) if applicable',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
  {
    id: 'step-03',
    stepNumber: 3,
    title: 'Generating Registration ID & Acknowledgement Card',
    description: 'Receive your unique Employment Registration Number and statutory seniority priority date.',
    details: [
      'Once submitted, the system generates an official Employment Registration Number.',
      'Format example: W/YYYY/DISTRICT_CODE/RUNNING_NUMBER.',
      'Print your Temporary Identity Card / Acknowledgement Slip.',
      'The registration date established becomes your official government seniority timestamp.',
    ],
    requiredDocuments: [
      'Printed Acknowledgment Slip (Form X-10)',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
  {
    id: 'step-04',
    stepNumber: 4,
    title: 'Updating Additional Educational Qualifications',
    description: 'Whenever you pass a higher examination (e.g. Diploma, B.E., M.Sc, Ph.D), update your profile immediately.',
    details: [
      'Log into tnvelaivaaippu.gov.in with your User ID and Password.',
      'Click "Modify Details" -> "Add Additional Qualification".',
      'Enter new degree details within the statutory grace period to preserve your original base seniority.',
      'Upload scanned copy of provisional or degree certificate.',
      'Print the updated endorsement card.',
    ],
    requiredDocuments: [
      'New Degree / Diploma Provisional Certificate',
      'Consolidated Marksheet',
      'Existing Employment Exchange Card',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
  {
    id: 'step-05',
    stepNumber: 5,
    title: 'Registration Renewal & Grace Period Regulations',
    description: 'Tamil Nadu employment registration must be renewed every 3 years to maintain uninterrupted seniority.',
    details: [
      'Every registration is valid for 3 calendar years from the date of registration or last renewal.',
      'Renewal month is printed clearly on your Registration Card.',
      'Online renewal is completely free and instant on tnvelaivaaippu.gov.in.',
      'Statutory Grace Period: Tamil Nadu government provides a 3-month grace period after the due month.',
      'Special Lapsed Registration Concessions: Government periodically issues G.O. orders permitting revival of lapsed cards.',
    ],
    requiredDocuments: [
      'Employment Registration Number & Date of Birth',
      'Access to registered mobile number for OTP',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
  {
    id: 'step-06',
    stepNumber: 6,
    title: 'Unemployment Assistance Scheme (UAS) Eligibility',
    description: 'Tamil Nadu government provides monthly financial assistance to registered unemployed youth meeting tenure criteria.',
    details: [
      'Eligibility: Minimum 5 continuous years on the live employment register for Class 10 and 12 pass-outs.',
      'Minimum 1 continuous year for differently-abled candidates.',
      'Monthly Assistance Rates: SSLC Pass: INR 200/mo; HSC Pass: INR 300/mo; Graduates: INR 600/mo.',
      'Differently-abled: SSLC: INR 600/mo; HSC: INR 750/mo; Graduates: INR 1,000/mo.',
      'Annual parental income must be within government prescribed limits (INR 72,000 per annum).',
    ],
    requiredDocuments: [
      'Live Employment Exchange Card with required waiting period',
      'Income Certificate issued by Tahsildar',
      'Nationalized Bank Account Passbook (single account in student name)',
      'Non-Employment Self-Declaration attested by Notary / Gazetted Officer',
    ],
    officialPortalUrl: 'https://tnvelaivaaippu.gov.in/',
  },
];

// ---------------------------------------------------------------------------
// 4. SKILL PROGRAMMES CATALOGUE (NAAN MUDHALVAN & NATIONAL)
// ---------------------------------------------------------------------------
export const VERIFIED_SKILL_PROGRAMS: SkillProgram[] = [
  {
    id: 'skl-001',
    name: 'Generative AI & Enterprise Cloud Computing Track',
    trainingProvider: 'Naan Mudhalvan in partnership with Microsoft & IBM',
    initiative: 'Naan Mudhalvan',
    duration: '60 Hours (8 Weeks)',
    mode: 'Hybrid',
    feeStatus: '100% Free',
    targetQualification: 'Undergraduate (B.Sc / BCA / B.E. / B.Tech / MCA)',
    certificationOffered: 'Joint Government of Tamil Nadu & Microsoft Industry Certificate',
    curriculumHighlights: [
      'Cloud Architecture Fundamentals (Azure & IBM Cloud)',
      'Generative AI APIs, Prompt Engineering & Model Fine-Tuning',
      'Enterprise Data Security and Compliance',
      'Live Capstone Project hosted on GitHub',
    ],
    officialApplicationUrl: 'https://www.tnskill.tn.gov.in/',
    lastVerifiedDate: '2026-04-12',
  },
  {
    id: 'skl-002',
    name: 'Electric Vehicle (EV) Powertrain & Battery Systems Design',
    trainingProvider: 'TNSDC & Automotive Skills Development Council (ASDC)',
    initiative: 'Naan Mudhalvan',
    duration: '80 Hours',
    mode: 'Offline',
    feeStatus: '100% Free',
    targetQualification: 'Diploma & Degree in Mechanical, EEE, Automobile Engineering',
    certificationOffered: 'ASDC National Skill Qualification Framework (NSQF Level 5) Certification',
    curriculumHighlights: [
      'Lithium-Ion Battery Chemistry & Thermal Management',
      'Electric Motor Control Systems & Regenerative Braking',
      'Battery Management Systems (BMS) Architecture',
      'Plant safety protocols for High-Voltage EV Testing',
    ],
    officialApplicationUrl: 'https://www.tnskill.tn.gov.in/',
    lastVerifiedDate: '2026-04-08',
  },
  {
    id: 'skl-003',
    name: 'Cybersecurity Analyst & Digital Forensics Professional',
    trainingProvider: 'Skill India Digital & FutureSkills Prime (MeitY)',
    initiative: 'Skill India Digital',
    duration: '120 Hours (Self-Paced Online)',
    mode: 'Online',
    feeStatus: '100% Free',
    targetQualification: 'Class 12 / Diploma / Any Undergraduate Student',
    certificationOffered: 'Government of India FutureSkills Prime Gold Certificate',
    curriculumHighlights: [
      'Network Security, Firewalls & Intrusion Detection Systems',
      'Ethical Hacking & Vulnerability Assessment (VAPT)',
      'Security Operations Centre (SOC) Tier-1 Analysis',
      'Indian IT Act 2000 and Digital Data Protection statutory compliance',
    ],
    officialApplicationUrl: 'https://www.skillindiadigital.gov.in/',
    lastVerifiedDate: '2026-04-10',
  },
  {
    id: 'skl-004',
    name: 'Medical Coding & Health Information Management',
    trainingProvider: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    initiative: 'Naan Mudhalvan',
    duration: '90 Hours',
    mode: 'Hybrid',
    feeStatus: '100% Free',
    targetQualification: 'Graduates in Life Sciences, Biotechnology, Zoology, Nursing, B.Pharm',
    certificationOffered: 'AAPC / AHIMA Aligned Medical Coding Industry Credential',
    curriculumHighlights: [
      'Human Anatomy, Physiology & Medical Terminology',
      'ICD-10-CM, CPT and HCPCS Coding Systems',
      'US Healthcare Billing & HIPAA Compliance Protocols',
      'Live Hospital Discharge Summary Coding Practicals',
    ],
    officialApplicationUrl: 'https://www.tnskill.tn.gov.in/',
    lastVerifiedDate: '2026-04-05',
  },
  {
    id: 'skl-005',
    name: 'Financial Accounting, GST & Corporate Taxation Certification',
    trainingProvider: 'TNSDC & Institute of Cost Accountants of India (ICMAI)',
    initiative: 'Naan Mudhalvan',
    duration: '50 Hours',
    mode: 'Hybrid',
    feeStatus: '100% Free',
    targetQualification: 'B.Com, BBA, Corporate Secretaryship, Economics Students',
    certificationOffered: 'State Government Certified Corporate Tax Practitioner',
    curriculumHighlights: [
      'TallyPrime & Zoho Books Enterprise Accounting',
      'GST Filing (GSTR-1, GSTR-3B) & E-Invoicing Systems',
      'TDS / TCS Calculation & Return Filing Protocols',
      'Corporate Balance Sheet Preparation & Auditing Basics',
    ],
    officialApplicationUrl: 'https://www.tnskill.tn.gov.in/',
    lastVerifiedDate: '2026-04-02',
  },
];

// ---------------------------------------------------------------------------
// 5. ANTI-FRAUD & SAFE JOB SEARCH WARNING SYSTEM
// ---------------------------------------------------------------------------
export const ANTI_FRAUD_GUIDELINES = [
  {
    ruleNumber: 1,
    title: 'Never Pay for Internships or Government Recruitments',
    description: 'Legitimate employers and all Government of India / Government of Tamil Nadu organisations NEVER ask candidates to pay for job offers, training deposits, laptop fees or interview scheduling.',
    actionAdvice: 'If any agency demands money for guaranteed placement, immediately report it to National Cyber Crime Reporting Portal (cybercrime.gov.in or Helpline 1930).',
  },
  {
    ruleNumber: 2,
    title: 'Verify Official Domains (Look for .gov.in or .ac.in)',
    description: 'Government portals always end with .gov.in, .nic.in, or .ac.in. Fraudsters often create spoof domains like tnpsc-portal.com or aicte-careers.org.',
    actionAdvice: 'Only submit personal documents on verified government domains. Check our Official Portals Directory for genuine addresses.',
  },
  {
    ruleNumber: 3,
    title: 'Beware of Unsolicited WhatsApp & Telegram Offers',
    description: 'Scammers frequently send fake job offers promising 30,000/day for liking videos or doing remote part-time reviews. These are financial cyber frauds.',
    actionAdvice: 'Do not share bank account details, UPI PIN or OTP. Block and report the sender.',
  },
  {
    ruleNumber: 4,
    title: 'No Direct Cash Stipends via Third Parties',
    description: 'In NATS and NAPS apprenticeships, government stipends are transferred strictly through Direct Benefit Transfer (DBT) into your Aadhaar-seeded bank account.',
    actionAdvice: 'No intermediary agent can influence your apprenticeship stipend or selection.',
  },
];

// ---------------------------------------------------------------------------
// 6. NATURAL LANGUAGE QUERY PARSER & SEARCH ENGINE HELPER
// ---------------------------------------------------------------------------
export interface SearchFilterParams {
  query?: string;
  category?: OpportunityCategory | 'all';
  qualification?: string;
  targetCohort?: string;
  isPaid?: boolean | 'all';
  workMode?: WorkMode | 'all';
  location?: string;
  classification?: OpportunityClassification | 'all';
}

export function filterOpportunities(
  opportunities: OpportunityListing[],
  params: SearchFilterParams
): OpportunityListing[] {
  return opportunities.filter((item) => {
    // 1. Category Filter
    if (params.category && params.category !== 'all' && item.category !== params.category) {
      return false;
    }

    // 2. Paid / Unpaid Filter
    if (params.isPaid !== undefined && params.isPaid !== 'all') {
      if (item.isPaid !== params.isPaid) {
        return false;
      }
    }

    // 3. Work Mode Filter
    if (params.workMode && params.workMode !== 'all' && item.workMode !== params.workMode) {
      return false;
    }

    // 4. Classification Filter (Govt / Private / PSU)
    if (params.classification && params.classification !== 'all' && item.organisationType !== params.classification) {
      return false;
    }

    // 5. Qualification / Cohort Filter
    if (params.qualification && params.qualification.trim() !== '') {
      const q = params.qualification.toLowerCase();
      const matchQual = item.qualification.some((qual) => qual.toLowerCase().includes(q));
      const matchCourse = item.eligibleCourses.some((c) => c.toLowerCase().includes(q));
      const matchCohort = item.targetCohorts.some((tc) => tc.toLowerCase().includes(q));
      if (!matchQual && !matchCourse && !matchCohort) {
        return false;
      }
    }

    // 6. Free text query matching across title, organisation, skills, location
    if (params.query && params.query.trim() !== '') {
      const normalizedQuery = params.query.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ');
      const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

      const corpus = [
        item.title,
        item.organisation,
        item.departmentOrDomain,
        item.location,
        item.state,
        item.district || '',
        ...item.qualification,
        ...item.eligibleCourses,
        ...item.requiredSkills,
        ...item.targetCohorts,
        item.description,
      ]
        .join(' ')
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ');

      // Check for natural language intent: "paid"
      if (tokens.includes('paid') && !item.isPaid) return false;

      const stopwords = new Set([
        'i',
        'am',
        'studying',
        'in',
        'for',
        'the',
        'find',
        'me',
        'a',
        'an',
        'suitable',
        'internship',
        'internships',
        'job',
        'jobs',
        'program',
        'programmes',
        'opportunity',
        'opportunities',
        'paid',
        'unpaid',
        'free',
      ]);

      const significantTokens = tokens.filter((t) => !stopwords.has(t));

      if (significantTokens.length > 0) {
        const matchesAll = significantTokens.every((token) => corpus.includes(token));
        if (!matchesAll) {
          return false;
        }
      }
    }

    return true;
  });
}
