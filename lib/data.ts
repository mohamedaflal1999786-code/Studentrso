export interface ServiceLink {
  label: string;
  url: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface ServiceFeature {
  label: string;
  description?: string;
}

export interface ServiceData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badge: string;
  icon: string;
  officialSource: string;
  features: string[];
  links: ServiceLink[];
  extraContent?: ServiceFeature[];
  route?: string;
  isFullyImplemented?: boolean;
}

export interface OpportunityData {
  id: string;
  name: string;
  fullName: string;
  url: string;
  icon: string;
  category: string;
}

export interface CareerParam {
  number: string;
  name: string;
}

export interface JourneyCohort {
  id: string;
  level: string;
  title: string;
  description: string;
  icon: string;
  label: string;
}

export interface TrustSource {
  id: string;
  category: string;
  title: string;
  description: string;
  source: string;
  verified: boolean;
}

export interface VerificationRow {
  subject: string;
  authority: string;
  status: 'verified' | 'due' | 'expired';
  lastVerified: string;
  url: string;
  urlLabel: string;
}

export const services: ServiceData[] = [
  {
    id: 'scholarship-hub',
    number: '01',
    title: 'Scholarship Hub',
    subtitle: 'Find what you qualify for.',
    description:
      'Scholarship discovery, financial assistance, eligibility matching and application tracking across Tamil Nadu and national welfare schemes.',
    category: 'Financial Assistance',
    badge: 'MODULE 01 • FULLY FUNCTIONAL',
    icon: 'school',
    officialSource: 'Tamil Nadu Welfare & Central NSP',
    route: '/scholarships',
    isFullyImplemented: true,
    features: ['Eligibility Check', 'TN Government Schemes', 'Central NSP Schemes', 'Application Tracker', 'Renewal Assistance'],
    links: [
      { label: 'Open Scholarship Hub', url: '/scholarships', icon: 'open_in_new', variant: 'primary' },
      { label: 'Official NSP Portal', url: 'https://scholarships.gov.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'safety-and-grievance',
    number: '02',
    title: 'Safety & Grievance System',
    subtitle: 'Your rights. Your safety. Your voice.',
    description:
      'Student rights, protection, official complaint authorities, anti-ragging reporting, emergency helplines and grievance redressal guidance.',
    category: 'Student Safety & Rights',
    badge: 'MODULE 02 • FULLY FUNCTIONAL',
    icon: 'shield',
    officialSource: 'UGC, Supreme Court & TN Grievance Portals',
    route: '/safety',
    isFullyImplemented: true,
    features: ['Anti-Ragging Support', 'Emergency 112 Help', 'UGC e-Samadhaan', 'Authority Finder', 'Reference Tracker'],
    links: [
      { label: 'Open Safety Support Centre', url: '/safety', icon: 'open_in_new', variant: 'primary' },
      { label: 'National Anti-Ragging Portal', url: 'https://www.antiragging.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'certificate-service',
    number: '03',
    title: 'Certificate & Document Service',
    subtitle: 'Official certificates, digital documents & verification.',
    description:
      'Apply, access, download and manage important educational and government certificates in one place.',
    category: 'Digital Certificates',
    badge: 'MODULE 03 • FULLY FUNCTIONAL',
    icon: 'verified_user',
    officialSource: 'Tamil Nadu e-District / e-Sevai & DigiLocker',
    route: '/certificates',
    isFullyImplemented: true,
    features: ['Community Certificate', 'Income Certificate', 'First Graduate Certificate', 'Nativity Certificate', 'Document Readiness Checker', 'DigiLocker Centre'],
    extraContent: [
      { label: '01. Application', description: 'Direct e-Sevai & e-District route' },
      { label: '02. Tracking', description: 'Application token & SMS query' },
      { label: '03. Turnaround', description: 'Statutory delivery timelines' },
      { label: '04. Access', description: 'Digitally signed e-Sanad download' },
      { label: '05. Verify', description: 'Barcode & QR authenticity check' },
    ],
    links: [
      { label: 'Open Document Service', url: '/certificates', icon: 'open_in_new', variant: 'primary' },
      { label: 'Find My Certificate', url: '/certificates?tab=finder', icon: 'search', variant: 'secondary' },
      { label: 'Apply / Track on e-Sevai', url: 'http://www.tnesevai.tn.gov.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'exam-and-opportunity-hub',
    number: '04',
    title: 'Exams & Opportunity Hub',
    subtitle: 'Government, national, entrance & competitive examination discovery.',
    description:
      'Discover government and private examinations, national entrance tests, competitive recruitments, scholarship exams and career opportunities for Tamil Nadu students.',
    category: 'Examinations & Opportunities',
    badge: 'MODULE 04 • EXAMS HUB',
    icon: 'assignment',
    officialSource: 'NTA, TNPSC, UPSC, SSC, IBPS, Anna University, UGC & DOTE',
    route: '/exams',
    isFullyImplemented: true,
    features: ['National & State Entrance Exams', 'TNPSC & Central Civil Recruitment', 'Scholarship & Talent Assessments', 'Exam to Opportunity Mapping', 'Free & Paid Exam Discovery'],
    links: [
      { label: 'Explore Examinations', url: '/exams', icon: 'assignment', variant: 'primary' },
      { label: 'Find My Exam Opportunities', url: '/exams?tab=my-opportunities', icon: 'search', variant: 'secondary' },
    ],
  },
  {
    id: 'ai-career-assistant',
    number: '05',
    title: 'AI Career Assistant',
    subtitle: 'Make your next education decision clearer.',
    description:
      'Autonomous educational mentor and career guidance engine from Class 10 to PhD & Research: course selection, entrance exams, syllabus explanations, and verified statutory opportunities.',
    category: 'Career Guidance',
    badge: 'MODULE 05 • FULLY FUNCTIONAL',
    icon: 'psychology',
    officialSource: 'OpenAI, Anthropic, Gemini & Grounded Knowledge Engine',
    route: '/career-assistant',
    isFullyImplemented: true,
    features: ['Class 10 to PhD Roadmaps', 'TNEA & National Entrances', 'Polytechnic Lateral Entry', 'Document & Syllabus Analysis', '7-Parameter Evaluation'],
    links: [
      { label: 'Launch AI Career Assistant', url: '/career-assistant', icon: 'psychology', variant: 'primary' },
      { label: 'Career Q&A Mode', url: '/career-assistant?mode=career', icon: 'search', variant: 'secondary' },
    ],
  },
  {
    id: 'student-admission-continuity',
    number: '06',
    title: 'Student Admission & Education Continuity',
    subtitle: 'Admission guidance, transfers & re-entry.',
    description:
      'Official admission pathways, single-window counselling, inter-college transfers, branch sliding, break-of-study re-entry, and academic credit mobility across Tamil Nadu and India.',
    category: 'Admissions & Continuity',
    badge: 'MODULE 06 • FULLY FUNCTIONAL',
    icon: 'how_to_reg',
    officialSource: 'TNEA, DOTE, DME, DCE, Anna University & UGC Guidelines',
    route: '/admissions',
    isFullyImplemented: true,
    features: ['TNEA & TNGASA Admissions', 'Polytechnic Lateral Entry', 'Inter-College Transfers', 'Break of Study Re-entry', 'Academic Bank of Credits'],
    links: [
      { label: 'Open Admission Centre', url: '/admissions', icon: 'how_to_reg', variant: 'primary' },
      { label: 'Transfer & Re-entry', url: '/admissions?tab=transfer-reentry', icon: 'sync_alt', variant: 'secondary' },
    ],
  },
  {
    id: 'academic-support-learning-centre',
    number: '07',
    title: 'Academic Support & Learning Centre',
    subtitle: 'Learning resources, tutoring & remedial learning.',
    description:
      'Curriculum learning resources, verified open courseware, subject-wise academic support, study skills, and remedial learning roadmaps for students from Class 10 to PhD.',
    category: 'Academic Learning',
    badge: 'MODULE 07 • FULLY FUNCTIONAL',
    icon: 'menu_book',
    officialSource: 'SWAYAM, NPTEL, DIKSHA, NCERT & TN SCERT',
    route: '/academic-support',
    isFullyImplemented: true,
    features: ['Subject-wise Learning', 'Verified Free Resources', 'Remedial Learning', 'Study Skills & Time Management', 'Exam Preparation Toolkits', 'Digital & Language Skills'],
    links: [
      { label: 'Open Academic Support Centre', url: '/academic-support', icon: 'menu_book', variant: 'primary' },
      { label: 'Free Learning Resources', url: '/academic-support?tab=free-resources', icon: 'school', variant: 'secondary' },
      { label: 'SWAYAM Portal', url: 'https://swayam.gov.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'internship-skill-exchange',
    number: '08',
    title: 'Internship, Skill & Employment Exchange',
    subtitle: 'Apprenticeships, skills & industry exposure.',
    description:
      'Discover verified internships, apprenticeships, industry training, skill-development programmes and employment opportunities from government organisations and private companies.',
    category: 'Skills & Employment',
    badge: 'MODULE 08 • FULLY FUNCTIONAL',
    icon: 'work_outline',
    officialSource: 'AICTE, NATS, TN Velaivaaippu & Naan Mudhalvan',
    route: '/internships',
    isFullyImplemented: true,
    features: ['Government & Corporate Internships', 'NATS & NAPS Apprenticeships', 'TN Velaivaaippu Employment Exchange', 'Naan Mudhalvan Skilling', 'Zero-Fee Fraud Protection'],
    links: [
      { label: 'Open Module', url: '/internships', icon: 'work_outline', variant: 'primary' },
      { label: 'AICTE Internship Portal', url: 'https://internship.aicte-india.org/', icon: 'open_in_new', variant: 'outline' },
      { label: 'TN Velaivaaippu Exchange', url: 'https://tnvelaivaaippu.gov.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'language-soft-skills-lab',
    number: '09',
    title: 'Language, Soft-Skills & Confidence Lab',
    subtitle: 'Communication, presentation & interview prep.',
    description:
      'A comprehensive student development centre for English communication, professional behaviour, interpersonal skills, interview readiness, presentation techniques and personal confidence building.',
    category: 'Soft-Skills & Confidence',
    badge: 'MODULE 09 • SKILL LAB',
    icon: 'record_voice_over',
    officialSource: 'Naan Mudhalvan & SWAYAM Plus Skilling Framework',
    route: '/skill-lab',
    isFullyImplemented: true,
    features: ['Professional English Speaking', 'Campus Placement Interview Prep', 'Group Discussion Practice', 'Resume & Cover Letter Guide', 'Public Speaking Practice'],
    links: [
      { label: 'Open Skill Lab', url: '/skill-lab', icon: 'open_in_new', variant: 'primary' },
      { label: 'Naan Mudhalvan Upskilling Portal', url: 'https://www.tnskill.tn.gov.in/', icon: 'open_in_new', variant: 'outline' },
    ],
  },
  {
    id: 'digital-safety-cyber-shield',
    number: '10',
    title: 'Digital Safety & Cyber-Wellness Shield',
    subtitle: 'Online safety, cyberbullying & digital privacy.',
    description:
      'Online safety education, cyberbullying safeguards, financial fraud prevention (Helpline 1930), digital privacy self-assessment and device hygiene.',
    category: 'Cyber-Wellness',
    badge: 'MODULE 10 • DIGITAL SHIELD',
    icon: 'gshield',
    officialSource: 'I4C (Indian Cyber Crime Coordination Centre) & CERT-In',
    route: '/digital-safety',
    isFullyImplemented: true,
    features: [
      'Cyberbullying Safeguards',
      'Social Media Impersonation Guide',
      'Financial Scam Alert (1930)',
      'Device Security Best Practices',
      'Digital Footprint Hygiene',
      'Phishing & Fake Link Detection',
    ],
    links: [
      { label: 'Open Digital Shield', url: '/digital-safety', icon: 'open_in_new', variant: 'primary' },
      { label: 'Report Financial Fraud: Call 1930', url: 'tel:1930', icon: 'call', variant: 'outline' },
      { label: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/home', icon: 'open_in_new', variant: 'outline' },
    ],
  },
];

export const opportunities: OpportunityData[] = [
  { id: 'tnpsc', name: 'TNPSC Portal', fullName: 'Tamil Nadu Public Service Commission', url: 'https://www.tnpsc.gov.in/', icon: 'assignment', category: 'State PSC' },
  { id: 'upsc', name: 'UPSC Official', fullName: 'Union Public Service Commission', url: 'https://www.upsc.gov.in/', icon: 'account_balance', category: 'Central PSC' },
  { id: 'ssc', name: 'SSC Official', fullName: 'Staff Selection Commission', url: 'https://ssc.gov.in/', icon: 'badge', category: 'Central Recruitment' },
  { id: 'ibps', name: 'Banking (IBPS)', fullName: 'Institute of Banking Personnel', url: 'https://www.ibps.in/', icon: 'account_balance_wallet', category: 'Banking' },
  { id: 'nta', name: 'Entrance Exams (NTA)', fullName: 'National Testing Agency', url: 'https://www.nta.ac.in/', icon: 'school', category: 'Entrance Exams' },
  { id: 'ncs', name: 'Career Services (NCS)', fullName: 'Ministry of Labour & Employment', url: 'https://www.ncs.gov.in/', icon: 'work', category: 'Career Services' },
];

export const careerParams: CareerParam[] = [
  { number: '01', name: 'Marks' },
  { number: '02', name: 'Subjects' },
  { number: '03', name: 'Interests' },
  { number: '04', name: 'Career' },
  { number: '05', name: 'Budget' },
  { number: '06', name: 'Location' },
  { number: '07', name: 'Gov / Pvt' },
];

export const journeyCohorts: JourneyCohort[] = [
  { id: 'class-10-pathway', level: 'LEVEL 01', title: 'CLASS 10', description: 'Explore education pathways, early merit scholarships and foundational career opportunity profiles.', icon: 'looks_one', label: 'Secondary Pathway' },
  { id: 'class-11-12-pathway', level: 'LEVEL 02', title: 'CLASS 11–12', description: 'Explore state and central scholarships, national entrance examinations and higher education options.', icon: 'looks_two', label: 'Senior Secondary' },
  { id: 'undergraduate-pathway', level: 'LEVEL 03', title: 'UNDERGRADUATE', description: 'Find scholarships, public civil examinations, research internships, official certificates and skill councils.', icon: 'looks_3', label: 'Degree Cycle' },
  { id: 'postgraduate-pathway', level: 'LEVEL 04', title: 'POSTGRADUATE', description: 'Explore research grants, doctoral fellowships, statutory examinations, documentation verification and career portals.', icon: 'looks_4', label: 'Research & Advanced' },
];

export const trustSources: TrustSource[] = [
  { id: 'trust-scholarships', category: 'FINANCIAL AID', title: 'Scholarships', description: 'Discover scholarship opportunities through official national, state and institutional sources, with eligibility information and direct application routes.', source: 'scholarships.gov.in', verified: true },
  { id: 'trust-examinations', category: 'PUBLIC COMPETITION', title: 'Examinations', description: 'Find official examination information from recognised authorities, including UPSC, TNPSC, SSC, IBPS, NTA and Railway Recruitment Boards.', source: 'upsc.gov.in • tnpsc.gov.in', verified: true },
  { id: 'trust-career', category: 'GUIDANCE', title: 'Career & Employment', description: 'Explore official career and employment services, including opportunities and guidance provided through the National Career Service.', source: 'ncs.gov.in', verified: true },
  { id: 'trust-certificates', category: 'DIGITAL CERTIFICATE SERVICES', title: 'Certificates', description: 'Access official digital certificate services through authorised e-Sevai and e-District platforms for applications, records and verification.', source: 'tnesevai.tn.gov.in', verified: true },
  { id: 'trust-safety', category: 'REPORT-ROUTE-TRACK', title: 'Safety & Grievance Redress', description: 'National Anti-Ragging Helpline, University Grants Commission (UGC) monitoring cells, and regional statutory education ombudsman offices.', source: 'antiragging.in • Helpline: 1800-180-5522', verified: true },
];

export const verificationRows: VerificationRow[] = [
  { subject: 'National Scholarship Portal', authority: 'Ministry of Electronics & IT', status: 'verified', lastVerified: '14 Oct 2026', url: 'https://scholarships.gov.in', urlLabel: 'scholarships.gov.in' },
  { subject: 'Anti-Ragging Regulatory Cell', authority: 'University Grants Commission (UGC)', status: 'verified', lastVerified: '08 Nov 2026', url: 'https://www.antiragging.in', urlLabel: 'antiragging.in' },
  { subject: 'Tamil Nadu e-Sevai Service', authority: 'TNeGA / Revenue Administration', status: 'verified', lastVerified: '22 Oct 2026', url: 'http://www.tnesevai.tn.gov.in/', urlLabel: 'tnesevai.tn.gov.in' },
];

export const howItWorksSteps = [
  { number: '01', title: 'DISCOVER', icon: 'search', description: 'Find the service, grant, or opportunity you need through categorized public inventories.', label: 'Initial intake' },
  { number: '02', title: 'CHECK', icon: 'fact_check', description: 'Review eligibility parameters, required documentation, and official statutory guidelines.', label: 'Prerequisite audit' },
  { number: '03', title: 'CONNECT', icon: 'open_in_new', description: 'Go directly to the relevant official statutory portal without passing personal data to commercial proxies.', label: 'Direct routing' },
  { number: '04', title: 'TRACK', icon: 'sync_alt', description: 'Follow supported processes and state application cycles where tracking is available.', label: 'Application lifecycle' },
  { number: '05', title: 'VERIFY', icon: 'verified', description: 'Check source authenticity, last audit timestamp, and gazette validation status.', label: 'Provenance assurance' },
  { number: '06', title: 'PLAN', icon: 'event_available', description: 'Keep upcoming statutory deadlines and career milestones synchronized in your central register.', label: 'Forward trajectory' },
];

export const coreValues = [
  { icon: 'explore', label: '01 / DISCOVER', description: 'Find relevant opportunities and essential services.' },
  { icon: 'open_in_new', label: '02 / APPLY', description: 'Reach the appropriate official statutory source.' },
  { icon: 'campaign', label: '03 / REPORT', description: 'Access protected grievance & anti-ragging pathways.' },
  { icon: 'timeline', label: '04 / TRACK', description: 'Follow supported applications and certificates.' },
  { icon: 'verified', label: '05 / VERIFY', description: 'See auditable sources and verification metadata.' },
  { icon: 'calendar_month', label: '06 / PLAN', description: 'Organise future education and timeline decisions.' },
];

export const problemCards = [
  { label: '01 / ELIGIBILITY', title: 'Complex Eligibility Requirements', description: 'Scholarships, examinations and courses often have different eligibility requirements, making it difficult for students to know what they qualify for.', icon: 'rule', footer: 'Unclear eligibility criteria' },
  { label: '02 / DEADLINES', title: 'Scattered Deadlines', description: 'Important dates can be spread across official portals, notices and institutional announcements, making them easy to miss.', icon: 'schedule', footer: 'Missed application dates' },
  { label: '03 / RIGHTS & COMPLAINTS', title: 'Unclear Support Pathways', description: 'Students may not know where to turn when they face safety concerns, unfair treatment or other issues requiring formal support.', icon: 'lock', footer: 'Unclear reporting channels' },
  { label: '04 / TRUST', title: 'Unverified Information', description: 'Information from unofficial websites, social media and informal sources can be outdated, incomplete or difficult to verify.', icon: 'warning', footer: 'Unchecked circulars' },
  { label: '05 / VISIBILITY', title: 'Limited Application Visibility', description: 'Students may have difficulty knowing where an application, certificate request or reported concern stands after it has been submitted.', icon: 'visibility_off', footer: 'Limited status visibility' },
  { label: '06 / GUIDANCE', title: 'Unclear Education Pathways', description: 'Students may struggle to understand which courses, institutions and career pathways best match their interests, academic background, budget and goals.', icon: 'explore_off', footer: 'Limited personalised guidance' },
];
