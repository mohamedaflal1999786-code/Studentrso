// lib/platform-search-index.ts
// Central indexed registry for Universal Platform Search bar & shortcuts across all 10 modules

export interface SearchEntry {
  id: string;
  title: string;
  category: 'Module' | 'Scholarship' | 'Safety & Helpline' | 'Certificate' | 'Exam' | 'Admissions' | 'Internship' | 'Academic' | 'Skill Lab' | 'Digital Safety' | 'Student Portal';
  badge: string;
  description: string;
  url: string;
  keywords: string[];
}

export const PLATFORM_SEARCH_INDEX: SearchEntry[] = [
  // 10 Core Modules
  {
    id: 'm01',
    title: 'Module 01: Scholarship Hub',
    category: 'Module',
    badge: 'Module 01',
    description: 'Tamil Nadu & Central NSP scholarships, eligibility matching, tracking & renewals',
    url: '/scholarships',
    keywords: ['scholarship', 'scholarships', 'nsp', 'udhavithogai', 'உதவித்தொகை', 'பணம்', 'first graduate', 'pudhumai penn', 'tamil pudhalvan', 'post matric', 'merit', 'financial aid', 'fee waiver'],
  },
  {
    id: 'm02',
    title: 'Module 02: Safety & Grievance System',
    category: 'Module',
    badge: 'Module 02',
    description: 'Anti-ragging statutory reporting, emergency helplines (112, 1098, 181), and UGC redressal',
    url: '/safety',
    keywords: ['safety', 'ragging', 'anti-ragging', 'helpline', '112', '1098', '181', 'ugc', 'e-samadhaan', 'complaint', 'police', 'பாதுகாப்பு', 'ராகிங்', 'புகார்'],
  },
  {
    id: 'm03',
    title: 'Module 03: Certificate & Document Service',
    category: 'Module',
    badge: 'Module 03',
    description: 'Tamil Nadu e-Sevai revenue certificates (Community, Income, First Graduate) and DigiLocker',
    url: '/certificates',
    keywords: ['certificate', 'certificates', 'esevai', 'e-sevai', 'community', 'income', 'first graduate', 'nativity', 'digilocker', 'சான்றிதழ்', 'சாதி', 'வருமானம்'],
  },
  {
    id: 'm04',
    title: 'Module 04: Exams & Opportunity Hub',
    category: 'Module',
    badge: 'Module 04',
    description: '56+ competitive & entrance examinations: TNPSC, NEET, JEE, UPSC, SSC, IBPS, GATE',
    url: '/exams',
    keywords: ['exam', 'exams', 'tnpsc', 'neet', 'jee', 'upsc', 'ssc', 'ibps', 'gate', 'cuet', 'tnea', 'competitive exam', 'தேர்வு', 'போட்டித் தேர்வு'],
  },
  {
    id: 'm05',
    title: 'Module 05: AI Career Assistant',
    category: 'Module',
    badge: 'Module 05',
    description: 'Autonomous career & education mentor evaluating Class 10 to PhD across 7 parameters',
    url: '/career-assistant',
    keywords: ['career', 'career assistant', 'guidance', 'after 10th', 'after 12th', 'polytechnic', 'lateral entry', 'phd', 'course', 'degree', 'தொழில் வழிகாட்டி', 'படிப்பு'],
  },
  {
    id: 'm06',
    title: 'Module 06: Student Admission & Continuity',
    category: 'Module',
    badge: 'Module 06',
    description: 'TNEA engineering counselling, TNGASA, college transfers, break of study re-entry & APAAR',
    url: '/admissions',
    keywords: ['admission', 'admissions', 'tnea', 'tngasa', 'college transfer', 'break of study', 're-entry', 'apaar', 'abc', 'counselling', 'சேர்க்கை', 'கல்லூரி'],
  },
  {
    id: 'm07',
    title: 'Module 07: Academic Support & Learning Centre',
    category: 'Module',
    badge: 'Module 07',
    description: 'SWAYAM, NPTEL free IIT lectures, NCERT textbooks, DIKSHA and remedial roadmaps',
    url: '/academic-support',
    keywords: ['academic support', 'swayam', 'nptel', 'ncert', 'diksha', 'free courses', 'remedial learning', 'study materials', 'கல்வி ஆதரவு', 'பாடங்கள்'],
  },
  {
    id: 'm08',
    title: 'Module 08: Internship & Employment Exchange',
    category: 'Module',
    badge: 'Module 08',
    description: 'Tamil Nadu Velaivaaippu employment seniority, AICTE verified internships & skill stipends',
    url: '/internships',
    keywords: ['internship', 'internships', 'job', 'jobs', 'velaivaaippu', 'employment exchange', 'seniority', 'aicte', 'training', 'வேலைவாய்ப்பு', 'பயிற்சி'],
  },
  {
    id: 'm09',
    title: 'Module 09: Student Skill Lab',
    category: 'Module',
    badge: 'Module 09',
    description: 'Skill India Digital, Naan Mudhalvan free high-demand tech courses, AI/ML & certifications',
    url: '/skill-lab',
    keywords: ['skill lab', 'skills', 'skill india', 'naan mudhalvan', 'coding', 'web dev', 'ai', 'courses', 'திறன் மேம்பாடு', 'நான் முதல்வன்'],
  },
  {
    id: 'm10',
    title: 'Module 10: Digital Safety & Cyber Defence',
    category: 'Module',
    badge: 'Module 10',
    description: 'Cyber fraud helpline 1930, golden hour protocol, WhatsApp scam defense & privacy safety',
    url: '/digital-safety',
    keywords: ['digital safety', 'cyber fraud', '1930', 'cyber crime', 'scam', 'whatsapp scam', 'financial fraud', 'போலி', 'இணைய பாதுகாப்பு'],
  },

  // 24/7 National Emergency & State Helplines
  {
    id: 'h-112',
    title: '112 National Unified Emergency Helpline',
    category: 'Safety & Helpline',
    badge: 'Helpline 112',
    description: 'All-India 24/7 unified emergency response for police, fire, ambulance & rapid crisis intervention',
    url: '/safety',
    keywords: ['112', 'emergency', 'police', 'ambulance', 'fire', 'crisis', 'அவசர உதவி'],
  },
  {
    id: 'h-anti-ragging',
    title: 'National Anti-Ragging Helpline (1800-180-5522)',
    category: 'Safety & Helpline',
    badge: 'Anti-Ragging',
    description: 'Toll-free 24/7 UGC helpline with automated FIR initiation and zero-tolerance statutory protection',
    url: '/safety',
    keywords: ['1800-180-5522', 'anti ragging helpline', 'ragging complaint', 'ugc helpline', 'affidavit', 'ராகிங் உதவி'],
  },
  {
    id: 'h-1930',
    title: 'National Cyber Crime Helpline (1930)',
    category: 'Safety & Helpline',
    badge: 'Helpline 1930',
    description: 'Citizen Financial Cyber Fraud Reporting System for instant freezing of stolen bank funds',
    url: '/digital-safety',
    keywords: ['1930', 'cyber helpline', 'bank fraud', 'otp scam', 'freeze money', 'cybercrime.gov.in'],
  },
  {
    id: 'h-181',
    title: 'Women Helpline (181) & Internal Complaints Committee',
    category: 'Safety & Helpline',
    badge: 'Helpline 181',
    description: '24/7 dedicated confidential support, counselling, and legal aid for female students and staff',
    url: '/safety',
    keywords: ['181', 'women helpline', 'posh act', 'icc', 'harassment', 'பெண்கள் உதவி'],
  },
  {
    id: 'h-1098',
    title: 'Childline & Minor Student Protection (1098)',
    category: 'Safety & Helpline',
    badge: 'Helpline 1098',
    description: '24/7 national helpline protecting school students and minor college learners under POCSO',
    url: '/safety',
    keywords: ['1098', 'childline', 'school safety', 'minor protection', 'pocso', 'குழந்தைகள் உதவி'],
  },

  // Tamil Nadu e-Sevai Revenue Certificates
  {
    id: 'c-community',
    title: 'Community Certificate (REV-101)',
    category: 'Certificate',
    badge: 'e-Sevai',
    description: 'Permanent caste & community certificate for BC, MBC, DNC, SC, and ST scholarship reservation',
    url: '/certificates',
    keywords: ['community certificate', 'caste certificate', 'rev-101', 'sc', 'st', 'bc', 'mbc', 'dnc', 'obc', 'சாதி சான்றிதழ்'],
  },
  {
    id: 'c-income',
    title: 'Income Certificate (REV-102)',
    category: 'Certificate',
    badge: 'e-Sevai',
    description: 'Annual family income certificate required for scholarship eligibility verification',
    url: '/certificates',
    keywords: ['income certificate', 'rev-102', 'annual income', 'income slab', 'tnesevai', 'வருமான சான்றிதழ்'],
  },
  {
    id: 'c-nativity',
    title: 'Nativity Certificate (REV-103)',
    category: 'Certificate',
    badge: 'e-Sevai',
    description: 'Proof of Tamil Nadu domicile required for state quota college admissions',
    url: '/certificates',
    keywords: ['nativity certificate', 'domicile', 'rev-103', 'residence proof', 'tn domicile', 'இருப்பிட சான்றிதழ்'],
  },
  {
    id: 'c-digilocker',
    title: 'DigiLocker Integration & Legal Parity (Rule 9A)',
    category: 'Certificate',
    badge: 'DigiLocker',
    description: 'How to legally store and verify 10th/12th marksheets and Aadhaar on DigiLocker',
    url: '/certificates',
    keywords: ['digilocker', 'marksheet', 'aadhaar', 'digital locker', 'rule 9a', 'it act', 'ஆவணம்'],
  },

  // Specific High-Demand Scholarships
  {
    id: 's-pudhumai-penn',
    title: 'Pudhumai Penn & Tamil Pudhalvan Schemes (Rs. 1,000/month)',
    category: 'Scholarship',
    badge: 'TN Govt',
    description: 'Monthly direct bank transfer for students who studied in Tamil Nadu government schools (Class 6-12)',
    url: '/scholarships',
    keywords: ['pudhumai penn', 'tamil pudhalvan', 'moovalur ramamirtham', '1000 rupees', 'govt school scholarship', 'புதுமைப் பெண்', 'தமிழ்ப் புதல்வன்'],
  },
  {
    id: 's-nsp',
    title: 'National Scholarship Portal (NSP Central Schemes)',
    category: 'Scholarship',
    badge: 'Central NSP',
    description: 'Post-Matric, Central Sector, Merit-cum-Means, and Pragati scholarships for colleges and polytechnics',
    url: '/scholarships',
    keywords: ['nsp', 'national scholarship portal', 'central sector', 'post matric', 'merit cum means', 'pragati', 'aicte scholarship'],
  },

  // High-Demand Exams
  {
    id: 'e-tnpsc',
    title: 'TNPSC Group 1, 2, 4 & VAO Recruitment Exams',
    category: 'Exam',
    badge: 'TNPSC',
    description: 'Official syllabus, eligibility criteria, and annual planner for Tamil Nadu state government posts',
    url: '/exams',
    keywords: ['tnpsc', 'group 4', 'group 2', 'group 1', 'vao', 'village administrative officer', 'tnpsc annual planner'],
  },
  {
    id: 'e-neet-jee',
    title: 'NEET & JEE National Entrance Examinations',
    category: 'Exam',
    badge: 'NTA Entrance',
    description: 'Complete eligibility, application deadlines, and counselling information for MBBS and B.Tech',
    url: '/exams',
    keywords: ['neet', 'jee', 'jee main', 'jee advanced', 'nta', 'mbbs entrance', 'engineering entrance', 'iit'],
  },

  // High-Demand Admissions
  {
    id: 'a-tnea',
    title: 'TNEA Engineering Single-Window Admissions',
    category: 'Admissions',
    badge: 'TNEA',
    description: 'Anna University and affiliated engineering college counselling, cutoff calculators and choice filling',
    url: '/admissions',
    keywords: ['tnea', 'engineering counselling', 'anna university', 'b.e admission', 'cutoff', 'choice filling', 'பொறியியல் சேர்க்கை'],
  },
  {
    id: 'a-transfer',
    title: 'College & Branch Transfer Regulations',
    category: 'Admissions',
    badge: 'Transfer Rules',
    description: 'Anna University and statutory higher education norms for inter-college transfers and branch sliding',
    url: '/admissions?tab=transfer-reentry',
    keywords: ['college transfer', 'branch transfer', 'sliding', 'anna university transfer', 'noc', 'கல்லூரி மாற்றம்'],
  },

  // Internships & Jobs
  {
    id: 'i-velaivaaippu',
    title: 'TN Employment Exchange (Velaivaaippu) Registration',
    category: 'Internship',
    badge: 'Velaivaaippu',
    description: '6-step guide to registering and renewing your Tamil Nadu government employment seniority card',
    url: '/internships',
    keywords: ['velaivaaippu', 'employment exchange', 'employment registration', 'seniority card', 'வேலைவாய்ப்பு அலுவலகம்'],
  },
  {
    id: 'i-aicte',
    title: 'AICTE Verified Government & Corporate Internships',
    category: 'Internship',
    badge: 'Zero-Fee',
    description: 'Stipend-backed internships from ISRO, NITI Aayog, and corporate partners with zero training charges',
    url: '/internships',
    keywords: ['aicte internship', 'isro internship', 'stipend internship', 'summer training', 'zero fee internship'],
  },

  // Student Account & Dashboard
  {
    id: 'u-dashboard',
    title: 'Personalized Student Dashboard & Opportunity Tracker',
    category: 'Student Portal',
    badge: 'Dashboard',
    description: 'Track your bookmarked scholarships, monitor submitted applications, and view personalized matches',
    url: '/dashboard',
    keywords: ['dashboard', 'my opportunities', 'tracker', 'bookmarks', 'profile', 'application status', 'பலகை'],
  },
  {
    id: 'u-onboarding',
    title: 'Complete 6-Step Student Profile (Save & Complete Profile)',
    category: 'Student Portal',
    badge: 'Profile',
    description: 'Fill in your education level, family income, and preferences to unlock automatic scheme matching',
    url: '/dashboard',
    keywords: ['onboarding', 'profile update', 'save & complete profile', 'education level', 'marks', 'income'],
  },
];

export const POPULAR_SHORTCUTS = [
  { label: 'Scholarships (M01)', url: '/scholarships', badge: 'M01' },
  { label: 'Safety & 112 (M02)', url: '/safety', badge: 'M02' },
  { label: 'e-Sevai (M03)', url: '/certificates', badge: 'M03' },
  { label: 'Exams Hub (M04)', url: '/exams', badge: 'M04' },
  { label: 'AI Career Mentor (M05)', url: '/career-assistant', badge: 'M05' },
  { label: 'Admissions & Transfers (M06)', url: '/admissions', badge: 'M06' },
  { label: 'Internships & Jobs (M08)', url: '/internships', badge: 'M08' },
  { label: 'Emergency 112', url: '/safety', badge: 'Emergency' },
  { label: 'Cyber Fraud 1930', url: '/digital-safety', badge: 'Helpline' },
];
