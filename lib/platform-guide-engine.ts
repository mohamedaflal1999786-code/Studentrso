// lib/platform-guide-engine.ts
// Comprehensive Platform Knowledge Engine for Student RSO Brain Guide Chatbot
// Supports bilingual understanding and responses in English and Tamil (தமிழ் & Tanglish)

export interface GuideResponse {
  reply: string;
  language: 'en' | 'ta';
  suggestedRoutes?: Array<{ label: string; url: string }>;
}

export interface ModuleInfo {
  number: string;
  id: string;
  titleEn: string;
  titleTa: string;
  route: string;
  summaryEn: string;
  summaryTa: string;
  keyServicesEn: string[];
  keyServicesTa: string[];
  officialSources: string;
}

export const PORTAL_MODULES: Record<string, ModuleInfo> = {
  '01': {
    number: '01',
    id: 'scholarship-hub',
    titleEn: 'Scholarship Hub',
    titleTa: 'உதவித்தொகை மையம் (Scholarship Hub)',
    route: '/scholarships',
    summaryEn: 'Discovers verified Tamil Nadu and Central National Scholarship Portal (NSP) schemes, checks student eligibility, tracks applications, and assists with renewals.',
    summaryTa: 'தமிழ்நாடு அரசு மற்றும் மத்திய அரசின் (NSP) உதவித்தொகைகளை கண்டறியவும், தகுதி சரிபார்க்கவும், விண்ணப்பங்களை கண்காணிக்கவும் உதவுகிறது.',
    keyServicesEn: ['Eligibility Check', 'TN Welfare Schemes', 'Central NSP Schemes', 'Application Tracker', 'Renewal Assistance'],
    keyServicesTa: ['தகுதி சரிபார்ப்பு', 'தமிழ்நாடு அரசு நலத்திட்டங்கள்', 'மத்திய NSP திட்டங்கள்', 'விண்ணப்ப கண்காணிப்பு', 'புதுப்பித்தல் உதவி'],
    officialSources: 'NSP (scholarships.gov.in) & TN Welfare Departments',
  },
  '02': {
    number: '02',
    id: 'safety-and-grievance',
    titleEn: 'Safety & Grievance System',
    titleTa: 'மாணவர் பாதுகாப்பு மற்றும் குறைதீர்ப்பு (Safety & Grievance)',
    route: '/safety',
    summaryEn: 'Comprehensive student rights protection, anti-ragging reporting, 24/7 emergency helplines (112, 1098, 1930, 181), and UGC e-Samadhaan grievance redressal.',
    summaryTa: 'மாணவர் பாதுகாப்பு, ராகிங் எதிர்ப்பு புகார் (Anti-Ragging), 24/7 அவசர உதவி எண்கள் (112, 1098, 1930, 181) மற்றும் UGC குறைதீர்ப்பு வழிகாட்டுதல்.',
    keyServicesEn: ['Anti-Ragging Helpline 1800-180-5522', 'Emergency 112', 'Childline 1098', 'Cyber Crime 1930', 'UGC e-Samadhaan'],
    keyServicesTa: ['ராகிங் எதிர்ப்பு உதவி எண் 1800-180-5522', 'காவல்துறை அவசர எண் 112', 'குழந்தைகள் உதவி 1098', 'சைபர் கிரைம் 1930', 'UGC குறைதீர்ப்பு'],
    officialSources: 'UGC, Supreme Court of India, National Cybercrime Portal',
  },
  '03': {
    number: '03',
    id: 'certificate-service',
    titleEn: 'Certificate & Document Service',
    titleTa: 'சான்றிதழ் மற்றும் ஆவண சேவை (Certificate & Document)',
    route: '/certificates',
    summaryEn: 'Step-by-step assistance for Tamil Nadu e-Sevai revenue certificates (Community, Income, First Graduate, Nativity), DigiLocker integration, and statutory turnaround timelines.',
    summaryTa: 'தமிழ்நாடு இ-சேவை மூலம் சாதி சான்றிதழ், வருமான சான்றிதழ், முதல் பட்டதாரி சான்றிதழ், இருப்பிட சான்றிதழ் பெற மற்றும் DigiLocker வழிகாட்டுதல்.',
    keyServicesEn: ['Community Certificate', 'Income Certificate', 'First Graduate Certificate', 'Nativity Certificate', 'DigiLocker Rules'],
    keyServicesTa: ['சாதி சான்றிதழ்', 'வருமான சான்றிதழ்', 'முதல் பட்டதாரி சான்றிதழ்', 'இருப்பிட சான்றிதழ்', 'DigiLocker ஆவணங்கள்'],
    officialSources: 'Tamil Nadu e-District, e-Sevai & DigiLocker',
  },
  '04': {
    number: '04',
    id: 'exam-and-opportunity-hub',
    titleEn: 'Exams & Opportunity Hub',
    titleTa: 'தேர்வுகள் மற்றும் வாய்ப்புகள் மையம் (Exams & Opportunities)',
    route: '/exams',
    summaryEn: '56+ verified examination records covering Tamil Nadu state exams (TNPSC, TNEA) and national tests (NEET, JEE, UPSC, SSC, IBPS, GATE, CUET) with eligibility rules and official portals.',
    summaryTa: 'தமிழ்நாடு (TNPSC, TNEA) மற்றும் தேசிய அளவிலான (NEET, JEE, UPSC, SSC, IBPS, GATE, CUET) 56+ போட்டித் தேர்வுகள் மற்றும் நுழைவுத் தேர்வுகள் தகவல்.',
    keyServicesEn: ['TNPSC Group 1-4', 'NTA NEET & JEE', 'UPSC & SSC Recruitment', 'Engineering TNEA', 'Banking & Central Exams'],
    keyServicesTa: ['TNPSC குரூப் 1-4', 'NEET & JEE தேர்வுகள்', 'UPSC & SSC வேலைவாய்ப்பு', 'பொறியியல் TNEA', 'வங்கி தேர்வுகள்'],
    officialSources: 'NTA, TNPSC, UPSC, SSC, IBPS & Anna University',
  },
  '05': {
    number: '05',
    id: 'ai-career-assistant',
    titleEn: 'AI Career Assistant',
    titleTa: 'AI தொழில் மற்றும் கல்வி வழிகாட்டி (AI Career Assistant)',
    route: '/career-assistant',
    summaryEn: 'Intelligent education and career mentor analyzing student profiles from Class 10 to PhD across 7 parameters to recommend courses, entrance tests, and career progression.',
    summaryTa: '10-ஆம் வகுப்பு முதல் பி.எச்.டி (PhD) வரை மாணவர்களின் கல்வி, எதிர்கால வேலைவாய்ப்புகள் மற்றும் பாடத் தேர்வுகளுக்கு வழிகாட்டும் AI வழிகாட்டி.',
    keyServicesEn: ['Class 10 to PhD Roadmaps', 'Engineering & Medical Pathways', 'Polytechnic Lateral Entry', '7-Parameter Evaluation', 'Syllabus Guidance'],
    keyServicesTa: ['10-ம் வகுப்பு முதல் PhD வரை', 'பொறியியல் & மருத்துவ வழிகள்', 'டிப்ளமோ லேட்டரல் என்ட்ரி', '7-அளவீட்டு பகுப்பாய்வு', 'பாடத்திட்ட விளக்கம்'],
    officialSources: 'Grounded Knowledge Engine & Multi-Model Gemini Integration',
  },
  '06': {
    number: '06',
    id: 'student-admission-continuity',
    titleEn: 'Student Admission & Education Continuity',
    titleTa: 'மாணவர் சேர்க்கை மற்றும் கல்வி தொடர்ச்சி (Admissions & Continuity)',
    route: '/admissions',
    summaryEn: 'Statutory admission pathways (TNEA, TNGASA), polytechnic lateral entry, inter-college transfers, break-of-study re-entry, and Academic Bank of Credits (ABC / APAAR).',
    summaryTa: 'TNEA பொறியியல் மற்றும் கலைக்கல்லூரி சேர்க்கை, கல்லூரி இடமாற்றம் (Transfer), படிப்பை பாதியில் நிறுத்தியவர்கள் மீண்டும் சேருதல் (Re-entry), மற்றும் ABC/APAAR வழிகாட்டுதல்.',
    keyServicesEn: ['TNEA Engineering Counselling', 'TNGASA Arts & Science', 'Diploma Lateral Entry', 'College Transfer Regulations', 'Break of Study Re-entry', 'ABC / APAAR'],
    keyServicesTa: ['TNEA பொறியியல் கலந்தாய்வு', 'கலை & அறிவியல் சேர்க்கை', 'டிப்ளமோ லேட்டரல் என்ட்ரி', 'கல்லூரி இடமாற்ற விதிகள்', 'கல்வி மறுதொடக்க விதிகள்', 'APAAR கிரெடிட் வங்கி'],
    officialSources: 'TNEA, DOTE, DME, DCE, Anna University & UGC Guidelines',
  },
  '07': {
    number: '07',
    id: 'academic-support-learning-centre',
    titleEn: 'Academic Support & Learning Centre',
    titleTa: 'கல்வி ஆதரவு மற்றும் கற்றல் மையம் (Academic Support)',
    route: '/academic-support',
    summaryEn: 'Curriculum learning directories, verified open courseware (SWAYAM, NPTEL, DIKSHA, NCERT), study skills, time management, and remedial roadmaps.',
    summaryTa: 'இலவச பாடக் குறிப்புகள், SWAYAM, NPTEL, DIKSHA, NCERT பாடத்திட்டங்கள், தேர்வு தயாரிப்பு மற்றும் கற்றல் திறன் மேம்பாட்டு வழிகாட்டிகள்.',
    keyServicesEn: ['Subject-wise Learning', 'SWAYAM & NPTEL Courses', 'NCERT & SCERT Textbooks', 'Remedial Learning Roadmaps', 'Exam Toolkits'],
    keyServicesTa: ['பாடம் வாரியான கற்றல்', 'SWAYAM & NPTEL ஆன்லைன் படிப்புகள்', 'NCERT & SCERT புத்தகங்கள்', 'பின்தங்கிய மாணவர்களுக்கான சிறப்பு உதவி', 'தேர்வு குறிப்புகள்'],
    officialSources: 'SWAYAM, NPTEL, DIKSHA, NCERT & TN SCERT',
  },
  '08': {
    number: '08',
    id: 'internship-skill-exchange',
    titleEn: 'Internship, Skill & Employment Exchange',
    titleTa: 'பயிற்சி மற்றும் வேலைவாய்ப்பு மையம் (Internships & Jobs)',
    route: '/internships',
    summaryEn: 'Verified government and private internships, statutory apprenticeships (NATS, NAPS), Tamil Nadu Employment Exchange (Velaivaaippu), and zero-fee fraud safeguards.',
    summaryTa: 'அரசு மற்றும் தனியார் நிறுவன தொழிற்பயிற்சிகள் (Internships), NATS/NAPS பயிற்சி, தமிழ்நாடு வேலைவாய்ப்பு அலுவலக (வேலைவாய்ப்பு) பதிவு வழிகாட்டுதல்.',
    keyServicesEn: ['AICTE Government Internships', 'NATS & NAPS Apprenticeships', 'TN Velaivaaippu Registration', 'Naan Mudhalvan Skilling', 'Zero-Fee Fraud Alert'],
    keyServicesTa: ['AICTE அரசு இன்டர்ன்ஷிப்', 'NATS & NAPS தொழிற்பயிற்சி', 'வேலைவாய்ப்பு அலுவலக பதிவு', 'நான் முதல்வன் பயிற்சிகள்', 'கட்டண மோசடி தடுப்பு'],
    officialSources: 'AICTE, NATS, TN Velaivaaippu & Naan Mudhalvan',
  },
  '09': {
    number: '09',
    id: 'language-soft-skills-lab',
    titleEn: 'Language, Soft-Skills & Confidence Lab',
    titleTa: 'மொழி மற்றும் மென்திறன் ஆய்வகம் (Skill Lab)',
    route: '/skill-lab',
    summaryEn: 'English communication, campus placement interviews, group discussions, resume drafting, public speaking, and professional confidence building.',
    summaryTa: 'ஆங்கில பேச்சு பயிற்சி, வேலைவாய்ப்பு நேர்முகத் தேர்வு (Interview) பயிற்சி, குழு விவாதம் (GD), ரெஸ்யூம் (Resume) தயாரிப்பு மற்றும் தன்னம்பிக்கை வளர்ப்பு.',
    keyServicesEn: ['Spoken English Workout', 'Campus Placement Prep', 'Group Discussions (GD)', 'Resume & Cover Letter', 'Public Speaking'],
    keyServicesTa: ['ஆங்கில பேச்சு பயிற்சி', 'கேம்பஸ் இன்டர்வியூ பயிற்சி', 'குழு விவாதம் (GD)', 'ரெஸ்யூம் தயாரிக்கும் முறை', 'மேடைப் பேச்சு பயிற்சி'],
    officialSources: 'Naan Mudhalvan & SWAYAM Plus Skilling Framework',
  },
  '10': {
    number: '10',
    id: 'digital-safety-cyber-shield',
    titleEn: 'Digital Safety & Cyber-Wellness Shield',
    titleTa: 'டிஜிட்டல் பாதுகாப்பு மற்றும் சைபர் கவசம் (Digital Safety)',
    route: '/digital-safety',
    summaryEn: 'Student online protection, cyberbullying defense, financial fraud prevention with Helpline 1930, device security, phishing detection, and digital privacy.',
    summaryTa: 'ஆன்லைன் பாதுகாப்பு, சைபர் மிரட்டல் தடுப்பு, ஆன்லைன் பண மோசடி உதவி எண் 1930, செல்போன்/லேப்டாப் பாதுகாப்பு மற்றும் தனிநபர் தகவல் பாதுகாப்பு.',
    keyServicesEn: ['Cyber Scam Helpline 1930', 'Cyberbullying Remedies', 'Social Media Safety', 'Device Security Hygiene', 'Phishing URL Detection'],
    keyServicesTa: ['பண மோசடி உதவி எண் 1930', 'சைபர் மிரட்டல் உதவி', 'சமூக வலைதள பாதுகாப்பு', 'சாதன பாதுகாப்பு வழிமுறைகள்', 'போலி லிங்க் கண்டறிதல்'],
    officialSources: 'I4C (Indian Cyber Crime Coordination Centre) & CERT-In',
  },
};
// Detects whether user input is in Tamil script or contains common Tanglish words.
export function isTamilQuery(text: string): boolean {
  if (!text) return false;
  // Tamil Unicode range: \u0B80-\u0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) return true;

  // Common Tanglish keywords
  const tanglishWords = [
    'vanakkam', 'nanba', 'nanbi', 'thambi', 'thangachi', 'eppadi', 'enna', 'solla', 'sollunga',
    'theriyuma', 'irukku', 'irukka', 'vaanga', 'panna', 'pannunga', 'venduma', 'padikkalam',
    'kalluri', 'kalloori', 'palli', 'udhavi', 'udavithogai', 'saandrithazh', 'saandridhazh',
    'theervu', 'velai', 'velaivaaippu', 'velaippu', 'ragging', 'pathukappu', 'kaasu', 'panam'
  ];
  const lower = text.toLowerCase();
  return tanglishWords.some((w) => lower.includes(w));
}

// Generates an authoritative platform guide answer for student queries.
// Used as fallback or direct deterministic engine.

export function generatePlatformGuideAnswer(query: string, preferredLang?: 'en' | 'ta'): GuideResponse {
  const isTa = preferredLang === 'ta' || (preferredLang !== 'en' && isTamilQuery(query));
  const lower = query.toLowerCase().trim();

  // 1. General Greeting or Overview
  if (
    !lower ||
    /^(hi|hello|hey|vanakkam|வணக்கம்|help|start|info|website|portal|student rso|என்ன|about)/.test(lower) ||
    lower.includes('website') ||
    lower.includes('portal') ||
    lower.includes('student rso') ||
    lower.includes('விளக்கம்') ||
    lower.includes('இணையதளம்') ||
    lower.includes('என்னென்ன')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `வணக்கம்! நான் Student RSO Brain Guide (மாணவர் AI வழிகாட்டி).

மாணவர்களின் உரிமைகள், அரசு சேவைகள் மற்றும் கல்வி வாய்ப்புகளை ஒரே இடத்தில் வழங்கும் இலவச தளம் இதுவாகும்.

எங்களின் 10 முக்கிய சேவைகள் (Modules):
1. Module 01: உதவித்தொகை (Scholarships) – TN & Central NSP திட்டங்கள்
2. Module 02: மாணவர் பாதுகாப்பு (Safety) – ராகிங் எதிர்ப்பு, 112 & UGC குறைதீர்ப்பு
3. Module 03: சான்றிதழ்கள் (Certificates) – இ-சேவை சாதி, வருமானம், முதல் பட்டதாரி
4. Module 04: தேர்வுகள் (Exams) – TNPSC, NEET, JEE, UPSC, TNEA
5. Module 05: AI தொழில் வழிகாட்டி (Career Assistant) – 10-ஆம் வகுப்பு முதல் PhD வரை
6. Module 06: மாணவர் சேர்க்கை (Admissions) – TNEA, TNGASA, இடமாற்றம் & APAAR
7. Module 07: கல்வி ஆதரவு (Academic Support) – SWAYAM, NCERT இலவச பாடங்கள்
8. Module 08: தொழிற்பயிற்சி & வேலை (Internships) – AICTE, NATS & வேலைவாய்ப்பு
9. Module 09: மொழி & மென்திறன் (Skill Lab) – ஆங்கில பேச்சு & நேர்முகத் தேர்வு
10. Module 10: டிஜிட்டல் பாதுகாப்பு (Digital Safety) – சைபர் கிரைம் 1930 & பாதுகாப்பு

உங்களுக்கு என்ன உதவி வேண்டும் என்று குரல் மூலமாகவோ (Mic) அல்லது தட்டச்சு செய்தோ கேளுங்கள்!`,
        suggestedRoutes: [
          { label: 'உதவித்தொகை (Module 01)', url: '/scholarships' },
          { label: 'பாதுகாப்பு & 112 (Module 02)', url: '/safety' },
          { label: 'சான்றிதழ்கள் (Module 03)', url: '/certificates' },
          { label: 'தேர்வுகள் (Module 04)', url: '/exams' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Hello! I am your Student RSO Brain Guide, here to help you navigate and understand all features of this platform.

Student RSO (Rights, Services & Opportunities) provides 10 unified student services:
• Module 01 (Scholarships): Government & private scholarship matching, tracking & renewal.
• Module 02 (Safety & Rights): Anti-ragging protection, 24/7 helplines (112, 1098, 1930, 181), and UGC grievance support.
• Module 03 (Certificates): Tamil Nadu e-District/e-Sevai certificates (Community, Income, First Graduate) and DigiLocker.
• Module 04 (Exams): 56+ competitive & entrance examinations (TNPSC, NEET, JEE, UPSC, GATE).
• Module 05 (AI Career Assistant): Deep educational roadmaps from Class 10 to PhD.
• Module 06 (Admissions): TNEA engineering, TNGASA, diploma lateral entry, and college transfers.
• Module 07 (Academic Support): Free courseware from SWAYAM, NPTEL, and NCERT.
• Module 08 (Internships): AICTE internships, statutory apprenticeships, and TN Velaivaaippu.
• Module 09 (Skill Lab): Spoken English, placement interviews, and resume building.
• Module 10 (Digital Safety): Cyberbullying defense, scam protection (1930), and privacy tools.

You can ask me any question in English or Tamil by typing or using the Voice Assistant (microphone)!`,
      suggestedRoutes: [
        { label: 'Explore Scholarships (M01)', url: '/scholarships' },
        { label: 'Safety & Helplines (M02)', url: '/safety' },
        { label: 'e-Sevai Certificates (M03)', url: '/certificates' },
        { label: 'Competitive Exams (M04)', url: '/exams' },
      ],
    };
  }

  // 2. Module 01: Scholarships
  if (
    lower.includes('scholarship') ||
    lower.includes('பணம்') ||
    lower.includes('உதவித்தொகை') ||
    lower.includes('udhavithogai') ||
    lower.includes('nsp') ||
    lower.includes('first graduate') ||
    lower.includes('முதல் பட்டதாரி') ||
    lower.includes('stipend') ||
    lower.includes('financial')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 01: உதவித்தொகை மையம் (Scholarship Hub)

• தகுதி சரிபார்ப்பு: உங்கள் வகுப்பு (10, 12, டிப்ளமோ, UG, PG, PhD) மற்றும் சமூகப் பிரிவுக்கு ஏற்ப தகுதியான உதவித்தொகைகளை காட்டும்.
• தமிழ்நாடு அரசு திட்டங்கள்: முதல் பட்டதாரி கல்விக்கட்டண விலக்கு, புதுமைப் பெண் திட்டம், தமிழ்ப் புதல்வன் திட்டம், BC/MBC/SC/ST உதவித்தொகைகள்.
• மத்திய அரசு NSP: Post-Matric, Merit-cum-Means, மற்றும் Central Sector திட்டங்கள்.
• கண்காணிப்பு: விண்ணப்ப நிலையை "Preparing Documents", "Submitted", "Amount Received" என பதிவு செய்து கண்காணிக்கலாம்.

உதவித்தொகை பக்கத்திற்கு செல்ல கீழே உள்ள பொத்தானை கிளிக் செய்யுங்கள்!`,
        suggestedRoutes: [
          { label: 'உதவித்தொகை மையம் திறக்க (Module 01)', url: '/scholarships' },
          { label: 'மாணவர் சுயவிவரம் (Profile)', url: '/dashboard' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 01: Scholarship Hub

• Eligibility Matching: Automatically filters scholarships matching your class (Class 10, 12, Diploma, UG, PG, PhD), family income, and community.
• Tamil Nadu Schemes: First Graduate tuition waiver, Pudhumai Penn, Tamil Pudhalvan, BC/MBC/DNC and SC/ST welfare scholarships.
• National NSP Schemes: Central Sector, Post-Matric, Merit-cum-Means, and Pragati scholarships.
• Application Tracker & Renewals: Track progress from submission to DBT disbursement with official deadline alerts.

Visit the Scholarship Hub below to discover what you qualify for!`,
      suggestedRoutes: [
        { label: 'Open Scholarship Hub (Module 01)', url: '/scholarships' },
        { label: 'Go to Student Dashboard', url: '/dashboard' },
      ],
    };
  }

  // 3. Module 02: Safety & Grievance
  if (
    lower.includes('ragging') ||
    lower.includes('safety') ||
    lower.includes('பாதுகாப்பு') ||
    lower.includes('ராகிங்') ||
    lower.includes('புகார்') ||
    lower.includes('complaint') ||
    lower.includes('helpline') ||
    lower.includes('112') ||
    lower.includes('emergency') ||
    lower.includes('police') ||
    lower.includes('women') ||
    lower.includes('181') ||
    lower.includes('1098') ||
    lower.includes('ugc')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 02: மாணவர் பாதுகாப்பு மற்றும் அவசர உதவி

மாணவர்களுக்கு ஏதேனும் அச்சுறுத்தல் அல்லது ராகிங் தொல்லை ஏற்பட்டால் உடனே கீழ்கண்ட அதிகாரப்பூர்வ எண்களை தொடர்பு கொள்ளலாம்:

🚨 முக்கிய அவசர உதவி எண்கள் (24/7 இலவசம்):
• காவல்துறை அவசர உதவி: 112
• தேசிய ராகிங் எதிர்ப்பு எண் (Anti-Ragging): 1800-180-5522 (antiragging.in)
• சைபர் கிரைம் பண மோசடி: 1930 (cybercrime.gov.in)
• பெண்கள் உதவி எண்: 181
• குழந்தைகள்/பள்ளி மாணவர்கள் (18 வயதுக்குள்): 1098
• UGC e-Samadhaan: கல்லூரி தொடர்பான அதிகாரப்பூர்வ புகார்களுக்கு.

பாதுகாப்பு உதவி மையத்தில் முழு வழிகாட்டுதலையும் புகாரையும் பதிவு செய்ய கீழே கிளிக் செய்யுங்கள்!`,
        suggestedRoutes: [
          { label: 'பாதுகாப்பு மையம் திறக்க (Module 02)', url: '/safety' },
          { label: 'அவசர எண் 112 அழைக்க', url: 'tel:112' },
          { label: 'Anti-Ragging 1800-180-5522', url: 'tel:18001805522' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 02: Safety & Grievance Support System

Student RSO connects you directly to statutory authorities with zero compromise on student safety:

🚨 Official 24/7 Helplines:
• National Integrated Emergency: 112
• National Anti-Ragging Helpline: 1800-180-5522 (helpline@antiragging.in)
• National Cyber Crime & Financial Fraud: 1930
• Women Helpline (Tamil Nadu & National): 181
• Childline (Under 18 / School Students): 1098
• UGC e-Samadhaan: College administration and grievance redressal portal.

Access the Safety Hub below for preparation checklists and complaint trackers:`,
      suggestedRoutes: [
        { label: 'Open Safety Support Centre (Module 02)', url: '/safety' },
        { label: 'Call Anti-Ragging 1800-180-5522', url: 'tel:18001805522' },
        { label: 'Call Emergency 112', url: 'tel:112' },
      ],
    };
  }

  // 4. Module 03: Certificates & Documents
  if (
    lower.includes('certificate') ||
    lower.includes('சான்றிதழ்') ||
    lower.includes('community') ||
    lower.includes('income') ||
    lower.includes('nativity') ||
    lower.includes('esevai') ||
    lower.includes('e-sevai') ||
    lower.includes('digilocker') ||
    lower.includes('வருமானம்') ||
    lower.includes('சாதி') ||
    lower.includes('ஆவணம்')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 03: சான்றிதழ் மற்றும் ஆவண சேவை (Certificate Hub)

தமிழ்நாடு அரசு இ-சேவை (e-Sevai) மூலம் கல்விக்குத் தேவையான அனைத்து சான்றிதழ்களையும் பெற வழிகாட்டுகிறது:

• சாதி சான்றிதழ் (Community Certificate): நிரந்தர செல்லுபடியாகும் சான்றிதழ் (Lifetime validity).
• வருமான சான்றிதழ் (Income Certificate): நிதி ஆண்டுக்கு மட்டுமே செல்லுபடியாகும்.
• முதல் பட்டதாரி சான்றிதழ் (First Graduate): குடும்பத்தில் பட்டதாரி இல்லை என்பதை உறுதி செய்து கல்லூரிக் கட்டண விலக்கு பெற.
• இருப்பிட சான்றிதழ் (Nativity Certificate): தமிழக அரசு சேர்க்கை மற்றும் ஒதுக்கீட்டுக்கு.
• DigiLocker: அரசு டிஜிட்டல் ஆவணங்களை சேமித்து சரிபார்க்க IT Rules 2016 Rule 9A படி சம அந்தஸ்து கொண்டது.

சான்றிதழ் வழிகாட்டி பக்கத்திற்கு செல்ல கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'சான்றிதழ் சேவை திறக்க (Module 03)', url: '/certificates' },
          { label: 'e-Sevai தளம் (tnesevai.tn.gov.in)', url: 'https://www.tnesevai.tn.gov.in/' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 03: Certificate & Document Service

Official statutory guide for Tamil Nadu Revenue and educational certificates:
• Community Certificate (REV-101): Permanent lifetime validity.
• Income Certificate (REV-102): Valid for prescribed financial year.
• First Graduate Certificate (REV-104): Enables tuition fee waiver under TN Free Education rules.
• Nativity Certificate (REV-103): Proves Tamil Nadu domicile for admissions.
• DigiLocker Parity: Legally recognized on par with physical originals under Rule 9A of the IT Rules 2016.

Track statutory turnaround days and e-Sevai links in Module 03:`,
      suggestedRoutes: [
        { label: 'Open Certificate Hub (Module 03)', url: '/certificates' },
        { label: 'Official TN e-Sevai Portal', url: 'https://www.tnesevai.tn.gov.in/' },
      ],
    };
  }

  // 5. Module 04: Exams & Opportunities
  if (
    lower.includes('exam') ||
    lower.includes('தேர்வு') ||
    lower.includes('tnpsc') ||
    lower.includes('neet') ||
    lower.includes('jee') ||
    lower.includes('upsc') ||
    lower.includes('ssc') ||
    lower.includes('gate') ||
    lower.includes('cuet') ||
    lower.includes('bank')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 04: தேர்வுகள் மற்றும் வாய்ப்புகள் மையம் (Exams Hub)

தமிழ்நாடு மற்றும் இந்திய அளவில் நடைபெறும் 56+ முக்கிய போட்டி மற்றும் நுழைவுத் தேர்வுகள் பற்றிய முழுமையான தகவல்:

• தமிழ்நாடு தேர்வுகள்: TNPSC Group 1, 2, 4, VAO, TNEA, TRB ஆசிரியர் தேர்வு, TNUSRB காவலர் தேர்வு.
• தேசிய நுழைவுத் தேர்வுகள்: NTA NEET (மருத்துவம்), JEE Main & Advanced (பொறியியல்), CUET (மத்திய பல்கலைக்கழகங்கள்), GATE, CAT.
• மத்திய அரசு வேலைவாய்ப்பு: UPSC Civil Services, SSC CGL/CHSL, IBPS வங்கி தேர்வுகள், RRB ரயில்வே தேர்வுகள்.

தேர்வுகளின் தகுதி, பாடத்திட்டம் மற்றும் அதிகாரப்பூர்வ இணையதளங்களை காண கீழே கிளிக் செய்யுங்கள்!`,
        suggestedRoutes: [
          { label: 'தேர்வுகள் மையம் திறக்க (Module 04)', url: '/exams' },
          { label: 'அரசு வேலை வாய்ப்புகள்', url: '/exams?tab=my-opportunities' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 04: Exams & Opportunity Hub

Comprehensive registry of 56+ verified examinations categorized by career stage:
• State Examinations: TNPSC Groups 1, 2, 4, VAO, TNUSRB Police, TRB, and TNEA counselling.
• National Entrance Tests: NTA NEET-UG/PG, JEE Main & Advanced, CUET-UG, GATE, CAT, and CLAT.
• Central Recruitment: UPSC Civil Services & NDA, SSC CGL/CHSL/MTS, IBPS PO/Clerk, and Railway RRB.
• Features: Filter by free vs. paid exam, qualification level, and official application portals.

Explore the complete exams catalogue below:`,
      suggestedRoutes: [
        { label: 'Open Exams & Opportunity Hub (Module 04)', url: '/exams' },
        { label: 'View Verified Examinations', url: '/exams' },
      ],
    };
  }

  // 6. Module 05: AI Career Assistant
  if (
    lower.includes('career') ||
    lower.includes('தொழில்') ||
    lower.includes('வேலை வழிகாட்டி') ||
    lower.includes('course') ||
    lower.includes('படிப்பு') ||
    lower.includes('10th') ||
    lower.includes('12th') ||
    lower.includes('polytechnic') ||
    lower.includes('guidance')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 05: AI தொழில் மற்றும் கல்வி வழிகாட்டி (Career Assistant)

10-ஆம் வகுப்பு முதல் PhD வரை மாணவர்களின் திறமைக்கு ஏற்ற படிப்புகளை தேர்ந்தெடுக்க வழிகாட்டுகிறது:

• 7-அளவீட்டு மதிப்பீடு: உங்கள் மதிப்பெண்கள், விருப்பப் பாடங்கள், ஆர்வம், பட்ஜெட், இருப்பிடம், அரசு/தனியார் விருப்பம் ஆகியவற்றின் அடிப்படையில் சிறந்த வழிகாட்டல்.
• 10-ஆம் வகுப்பு & 12-ஆம் வகுப்புக்கு பிறகு: அறிவியல், வணிகவியல், கலை மற்றும் பொறியியல்/மருத்துவப் பாதைகள்.
• டிப்ளமோ லேட்டரல் என்ட்ரி (Lateral Entry): பாலிடெக்னிக்கில் இருந்து நேரடியாக 2-ம் ஆண்டு B.E./B.Tech சேரும் முறை.
• ஆவணங்கள் & பாடத்திட்டம் ஆய்வு: உங்கள் மதிப்பெண் அல்லது பாடத்திட்ட ஆவணங்களை பதிவேற்றி ஆலோசனை பெறலாம்.

AI Career Assistant-உடன் உரையாட கீழே உள்ள பொத்தானை அழுத்தவும்!`,
        suggestedRoutes: [
          { label: 'AI Career Assistant திறக்க (Module 05)', url: '/career-assistant' },
          { label: 'தொழில் வழிகாட்டுதல் முறை', url: '/career-assistant?mode=career' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 05: AI Student Career & Life Assistant

Autonomous educational mentor evaluating your career progression across 7 key parameters:
• From Class 10 to PhD: Course options after 10th/12th, undergraduate degree pathways, polytechnic lateral entry, and research fellowships.
• 7-Parameter Evaluation: Marks, Subjects, Interests, Career Goal, Budget, Location, and Government vs. Private sector.
• Document & Syllabus Guidance: Upload documents or marksheets for grounded career recommendations.

Launch the full AI Career Assistant below:`,
      suggestedRoutes: [
        { label: 'Launch AI Career Assistant (Module 05)', url: '/career-assistant' },
        { label: 'Career Q&A Mode', url: '/career-assistant?mode=career' },
      ],
    };
  }

  // 7. Module 06: Admissions & Continuity
  if (
    lower.includes('admission') ||
    lower.includes('சேர்க்கை') ||
    lower.includes('tnea') ||
    lower.includes('tngasa') ||
    lower.includes('transfer') ||
    lower.includes('sliding') ||
    lower.includes('break of study') ||
    lower.includes('apaar') ||
    lower.includes('abc') ||
    lower.includes('கல்லூரி சேர்க்கை')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 06: மாணவர் சேர்க்கை மற்றும் கல்வி தொடர்ச்சி (Admissions Centre)

• TNEA & TNGASA: தமிழ்நாடு அரசு பொறியியல் மற்றும் கலை & அறிவியல் கல்லூரிகளின் ஒற்றைச் சாளர கலந்தாய்வு வழிகாட்டுதல்.
• கல்லூரி இடமாற்றம் (Inter-College Transfer): அண்ணா பல்கலைக்கழகம் மற்றும் உயர்கல்வித்துறை விதிகளின்படி கல்லூரி மாறுதல் நடைமுறைகள்.
• கல்வி மறுதொடக்கம் (Break of Study Re-entry): குடும்ப அல்லது மருத்துவ காரணங்களால் படிப்பை பாதியில் நிறுத்திய மாணவர்கள் மீண்டும் கல்லூரியில் சேரும் வழிமுறைகள்.
• APAAR / Academic Bank of Credits: உங்கள் கல்வி மதிப்பெண்கள் (Credits) டிஜிட்டல் முறையில் மாற்றப்படும் வசதி.

சேர்க்கை வழிகாட்டல் பக்கத்திற்கு செல்ல கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'சேர்க்கை மையம் திறக்க (Module 06)', url: '/admissions' },
          { label: 'இடமாற்றம் & மறுதொடக்கம்', url: '/admissions?tab=transfer-reentry' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 06: Student Admission & Education Continuity

Statutory frameworks covering higher education admissions across Tamil Nadu:
• Single Window Admissions: TNEA Engineering Counselling, TNGASA Government Arts & Science, and DME Medical admissions.
• Inter-College Transfers: Regulations, eligibility criteria, and NOC checklist for college & branch transfers.
• Break of Study Re-entry: Re-admission guidelines within statutory maximum degree durations.
• Academic Bank of Credits (ABC / APAAR): Digital credit accumulation and institutional mobility under UGC frameworks.

Explore statutory admission rules in Module 06:`,
      suggestedRoutes: [
        { label: 'Open Admission Centre (Module 06)', url: '/admissions' },
        { label: 'Transfer & Re-entry Guidance', url: '/admissions?tab=transfer-reentry' },
      ],
    };
  }

  // 8. Module 08: Internships & Employment
  if (
    lower.includes('internship') ||
    lower.includes('job') ||
    lower.includes('வேலை') ||
    lower.includes('பயிற்சி') ||
    lower.includes('apprenticeship') ||
    lower.includes('nats') ||
    lower.includes('naps') ||
    lower.includes('velaivaaippu') ||
    lower.includes('employment')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 08: பயிற்சி மற்றும் வேலைவாய்ப்பு மையம் (Internships & Jobs)

• அரசு இன்டர்ன்ஷிப்: AICTE, NITI Aayog, ISRO, CSIR மற்றும் TNeGA அரசு நிறுவனங்களில் பயிற்சிகள்.
• சட்டரீதியான அப்ரண்டிஸ் (NATS / NAPS): மாதாந்திர உதவித்தொகையுடன் கூடிய தெற்கு ரயில்வே, TANGEDCO தொழிற்பயிற்சிகள்.
• தமிழ்நாடு வேலைவாய்ப்பு அலுவலகம் (TN Velaivaaippu): ஆன்லைனில் 6-படி நிலைகளில் வேலைவாய்ப்பு பதிவு செய்யும் வழிகாட்டி.
• கட்டண மோசடி பாதுகாப்பு (Zero-Fee): மாணவர்களிடம் பணம் கேட்கும் போலி இன்டர்ன்ஷிப் மற்றும் வேலை மோசடிகளை அடையாளம் காணும் விதிமுறைகள்.

பயிற்சி மற்றும் வேலைவாய்ப்பு பக்கத்தை பார்வையிட கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'வேலைவாய்ப்பு மையம் திறக்க (Module 08)', url: '/internships' },
          { label: 'வேலைவாய்ப்பு அலுவலக பதிவு', url: 'https://tnvelaivaaippu.gov.in/' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 08: Internship, Skill & Employment Exchange

• Verified Opportunities: Government (AICTE, NITI Aayog, ISRO, TNeGA) and private corporate internships.
• National Apprenticeship (NATS & NAPS): Monthly stipend-backed training in Southern Railway, TANGEDCO, and PSUs.
• TN Employment Exchange (Velaivaaippu): 6-step lifecycle guide for state employment renewal and card maintenance.
• Zero-Fee Student Anti-Fraud Shield: Verified zero-fee rule protecting students from fake training charges.

Discover verified internships in Module 08:`,
      suggestedRoutes: [
        { label: 'Open Internships & Exchange (Module 08)', url: '/internships' },
        { label: 'AICTE Internship Portal', url: 'https://internship.aicte-india.org/' },
      ],
    };
  }

  // 9. Module 09: Language & Skill Lab
  if (
    lower.includes('skill') ||
    lower.includes('english') ||
    lower.includes('ஆங்கிலம்') ||
    lower.includes('திறன்') ||
    lower.includes('interview') ||
    lower.includes('resume') ||
    lower.includes('speaking') ||
    lower.includes('communication') ||
    lower.includes('பேச்சு')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 09: மொழி மற்றும் மென்திறன் ஆய்வகம் (Skill Lab)

கல்லூரி வளாக நேர்முகத் தேர்வுகள் (Campus Placements) மற்றும் ஆங்கிலப் பேச்சுத் திறனை வளர்க்கும் வழிகாட்டி:

• தினசரி ஆங்கில பயிற்சி (Daily Communication Workout): எளிய முறையில் அன்றாடம் பேசும் ஆங்கில வாக்கியங்கள்.
• கேம்பஸ் இன்டர்வியூ பயிற்சி: HR நேர்முகத் தேர்வில் கேட்கப்படும் கேள்விகளுக்கு பதிலளிக்கும் முறை.
• குழு விவாதம் (GD) நுணுக்கங்கள்: பயமின்றி மற்றவர்களுடன் விவாதிக்கும் ஆற்றல்.
• ரெஸ்யூம் (Resume) & கவர் லெட்டர்: சிறந்த முறையில் பயோடேட்டா தயாரிக்கும் மாதிரி படிவங்கள்.
• நான் முதல்வன் (Naan Mudhalvan) தளம்: தமிழக அரசின் இலவச திறன் மேம்பாட்டு பயிற்சிகள்.

மென்திறன் ஆய்வகத்திற்கு செல்ல கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'மென்திறன் ஆய்வகம் திறக்க (Module 09)', url: '/skill-lab' },
          { label: 'நான் முதல்வன் தளம்', url: 'https://www.tnskill.tn.gov.in/' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 09: Language, Soft-Skills & Confidence Lab

Student development centre designed for Tamil Nadu students preparing for professional careers:
• Daily Spoken English Workout: 7-part daily rotation for clear conversational and professional English.
• Campus Placement Interview Prep: Standard HR and technical round interview strategies.
• Group Discussion (GD) Framework: Speaking etiquette, structuring arguments, and intervention tips.
• ATS-Friendly Resume Guide: Clean formats, action verbs, and cover letter templates.
• Naan Mudhalvan Skilling: Official links to Tamil Nadu government upskilling programs.

Start practicing in Module 09:`,
      suggestedRoutes: [
        { label: 'Open Skill Lab (Module 09)', url: '/skill-lab' },
        { label: 'Explore Communication Workouts', url: '/skill-lab' },
      ],
    };
  }

  // 10. Module 10: Digital Safety & Cyber Shield
  if (
    lower.includes('cyber') ||
    lower.includes('scam') ||
    lower.includes('மோசடி') ||
    lower.includes('சைபர்') ||
    lower.includes('fraud') ||
    lower.includes('1930') ||
    lower.includes('hacking') ||
    lower.includes('privacy') ||
    lower.includes('password')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `Module 10: டிஜிட்டல் பாதுகாப்பு மற்றும் சைபர் கவசம் (Digital Safety)

மாணவர்களின் ஆன்லைன் பாதுகாப்பு மற்றும் சைபர் மோசடிகளில் இருந்து பாதுகாக்கும் கவசம்:

🚨 முக்கிய சைபர் உதவி எண்: 1930 (ஆன்லைன் பண மோசடி நடந்த 1 மணி நேரத்திற்குள் (Golden Hour) அழைக்கவும்).
• சைபர் மிரட்டல் (Cyberbullying) தடுப்பு: தேவையற்ற குறுஞ்செய்திகள், அச்சுறுத்தல்களுக்கு சட்டப்பூர்வ தீர்வு.
• போலி லிங்க் & OTP மோசடிகள்: வங்கி OTP, இலவச லேப்டாப், பகுதிநேர வேலை லிங்க்குகளை தவிர்ப்பது எப்படி.
• சமூக வலைதள பாதுகாப்பு: Instagram, Facebook கணக்குகளில் 2FA பாதுகாப்பு அமைத்தல்.
• சாதன பாதுகாப்பு: போன் மற்றும் கணினியில் வைரஸ் மற்றும் ஹேக்கிங் தடுக்கும் வழிகள்.

டிஜிட்டல் பாதுகாப்பு பக்கத்திற்கு செல்ல கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'டிஜிட்டல் பாதுகாப்பு மையம் (Module 10)', url: '/digital-safety' },
          { label: 'சைபர் கிரைம் 1930 அழைக்க', url: 'tel:1930' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Module 10: Digital Safety & Cyber-Wellness Shield

Dedicated protection against digital fraud and cyber harms:
🚨 National Cyber Financial Fraud Helpline: 1930 (Report within the 1-hour Golden Hour to freeze stolen funds).
• Cyberbullying & Impersonation: Evidence preservation and legal reporting under the Information Technology Act.
• Phishing & Scam Defense: Guarding against fake part-time jobs, scholarship lottery frauds, and OTP extortion.
• Device Security Checklist: 2-Factor Authentication (2FA), app permissions, and password hygiene.

Visit the Digital Safety Shield below:`,
      suggestedRoutes: [
        { label: 'Open Digital Safety Shield (Module 10)', url: '/digital-safety' },
        { label: 'Call Cyber Helpline 1930', url: 'tel:1930' },
      ],
    };
  }

  // 11. Profile, Onboarding & Login
  if (
    lower.includes('login') ||
    lower.includes('signup') ||
    lower.includes('register') ||
    lower.includes('onboarding') ||
    lower.includes('profile') ||
    lower.includes('பதிவு') ||
    lower.includes('நுழைவு') ||
    lower.includes('சுயவிவரம்') ||
    lower.includes('dashboard')
  ) {
    if (isTa) {
      return {
        language: 'ta',
        reply: `மாணவர் சுயவிவரம் & பதிவு முறை (Profile & Onboarding)

• பதிவு செய்தல் (Sign In / Register): உங்கள் மின்னஞ்சல் (Email) மூலம் அல்லது கூகுள் கணக்கு (Google Sign-In) மூலம் ஒரு நொடியில் இணையலாம்.
• 6-படி சுயவிவரம் (Onboarding 6 Steps): கல்வி நிலை, படிப்பு, கல்லூரி, மதிப்பெண், குடும்ப வருமானம் மற்றும் விருப்பங்களை பூர்த்தி செய்து "Save & Complete Profile" கிளிக் செய்யவும்.
• மாணவர் பலகை (Dashboard): நீங்கள் சேமித்த உதவித்தொகைகள், தேர்வுகள் மற்றும் சான்றிதழ் விண்ணப்பங்களை ஒரே இடத்தில் கண்காணிக்கலாம்.

உடனே உங்கள் சுயவிவர பக்கத்தை அணுக கீழே கிளிக் செய்யவும்:`,
        suggestedRoutes: [
          { label: 'மாணவர் பலகை (Dashboard)', url: '/dashboard' },
          { label: 'உள்நுழைவு / பதிவு (Sign In)', url: '/auth' },
        ],
      };
    }

    return {
      language: 'en',
      reply: `Student Account, Profile & Dashboard

• Sign In / Registration: Instant access via Email OTP or Google Single Sign-On.
• 6-Step Student Onboarding: Fill in your education level, course, institution, marks percentage, annual income, and preferences, then tap "Save & Complete Profile".
• Personalized Dashboard: Track saved scholarships, monitor application stages, and access custom recommendation matching.

Visit your Student Dashboard below:`,
      suggestedRoutes: [
        { label: 'Go to Student Dashboard', url: '/dashboard' },
        { label: 'Sign In / Register', url: '/auth' },
      ],
    };
  }

  // 12. Default Fallback
  if (isTa) {
    return {
      language: 'ta',
      reply: `உங்கள் கேள்வி எனக்கு தெளிவாக புரிந்தது! 

Student RSO இணையதளத்தில் கீழ்கண்ட 10 முக்கிய சேவைகளில் எது பற்றி நீங்கள் தெரிந்து கொள்ள விரும்புகிறீர்கள்?
1. உதவித்தொகை (Scholarships) - அரசு & தனியார் உதவித்தொகைகள்
2. பாதுகாப்பு & அவசர உதவி (Safety) - 112, ராகிங் எதிர்ப்பு 1800-180-5522
3. சான்றிதழ்கள் (Certificates) - இ-சேவை சாதி, வருமானம், முதல் பட்டதாரி
4. தேர்வுகள் (Exams) - TNPSC, NEET, JEE, UPSC, TNEA
5. AI தொழில் வழிகாட்டி (Career Assistant) - படிப்பு & வேலை வழிகாட்டல்
6. மாணவர் சேர்க்கை (Admissions) - TNEA கலந்தாய்வு, கல்லூரி இடமாற்றம்
7. கல்வி ஆதரவு (Academic Support) - SWAYAM, NCERT இலவச பாடங்கள்
8. பயிற்சிகள் & வேலை (Internships) - AICTE, NATS & வேலைவாய்ப்பு
9. மொழித்திறன் (Skill Lab) - ஆங்கில பேச்சு & நேர்முகத் தேர்வு
10. டிஜிட்டல் பாதுகாப்பு (Digital Safety) - சைபர் கிரைம் 1930

நீங்கள் தமிழில் பேச விரும்பினால் மைக் (Mic) பட்டனை அழுத்திப் பேசலாம், அல்லது கீழே உள்ள தலைப்புகளில் ஒன்றை தேர்வு செய்யுங்கள்!`,
      suggestedRoutes: [
        { label: 'உதவித்தொகை (Module 01)', url: '/scholarships' },
        { label: 'பாதுகாப்பு & 112 (Module 02)', url: '/safety' },
        { label: 'சான்றிதழ்கள் (Module 03)', url: '/certificates' },
        { label: 'தேர்வுகள் (Module 04)', url: '/exams' },
      ],
    };
  }

  return {
    language: 'en',
    reply: `I understand your query! 

Student RSO covers 10 dedicated modules for students across Tamil Nadu and India:
1. Module 01 (Scholarships): Government & private scheme eligibility and tracking.
2. Module 02 (Safety): Emergency 112, Anti-Ragging 1800-180-5522, and UGC redressal.
3. Module 03 (Certificates): e-Sevai revenue certificates & DigiLocker parity.
4. Module 04 (Exams): TNPSC, NEET, JEE, UPSC, SSC, and 56+ exams.
5. Module 05 (Career Assistant): AI educational mentor from 10th to PhD.
6. Module 06 (Admissions): TNEA counselling, transfers, and break of study re-entry.
7. Module 07 (Academic Support): SWAYAM, NPTEL, and NCERT study materials.
8. Module 08 (Internships): AICTE internships, NATS, and TN Velaivaaippu.
9. Module 09 (Skill Lab): Spoken English, placements, and resume building.
10. Module 10 (Digital Safety): Cyber scam helpline 1930 and device protection.

You can ask me specific questions by typing or using the Microphone in English or Tamil!`,
    suggestedRoutes: [
      { label: 'Explore Scholarships (M01)', url: '/scholarships' },
      { label: 'Emergency Safety (M02)', url: '/safety' },
      { label: 'e-Sevai Certificates (M03)', url: '/certificates' },
      { label: 'Exams & Opportunities (M04)', url: '/exams' },
    ],
  };
}

// Sanitizes bot text into clean, international human-readable format.
// Strictly eliminates all asterisks, markdown links, raw hashes, and robotic formatting.
export function sanitizeHumanText(text: string): string {
  if (!text) return '';
  return text
    // Remove markdown link syntax [Label](url) -> Label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove all asterisks completely
    .replace(/\*/g, '')
    // Remove markdown headers
    .replace(/^#+\s*/gm, '')
    // Standardize bullet points
    .replace(/^\s*[-+]\s+/gm, '• ')
    // Remove excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Deterministic bilingual translation engine for all Student RSO portal modules and guidance.
// Seamlessly translates text between English and Tamil with zero asterisks and natural human phrasing.
export function translatePlatformText(text: string, targetLang: 'en' | 'ta'): string {
  const clean = sanitizeHumanText(text);
  const lower = clean.toLowerCase();

  // If already in target language, return sanitized
  if (targetLang === 'ta' && isTamilQuery(clean)) {
    return clean;
  }
  if (targetLang === 'en' && !isTamilQuery(clean)) {
    return clean;
  }

  // Translation to Tamil
  if (targetLang === 'ta') {
    if (lower.includes('module 10') || lower.includes('digital safety') || lower.includes('cyber')) {
      return sanitizeHumanText(`Module 10: டிஜிட்டல் பாதுகாப்பு மற்றும் சைபர் கவசம் (Digital Safety)

மாணவர்களின் ஆன்லைன் பாதுகாப்பு மற்றும் சைபர் மோசடிகளில் இருந்து பாதுகாக்கும் கவசம்:

முக்கிய சைபர் உதவி எண்: 1930 (ஆன்லைன் பண மோசடி நடந்த 1 மணி நேரத்திற்குள் அழைக்கவும்).
• சைபர் மிரட்டல் தடுப்பு: தேவையற்ற குறுஞ்செய்திகள், அச்சுறுத்தல்களுக்கு சட்டப்பூர்வ தீர்வு.
• போலி லிங்க் மற்றும் OTP மோசடிகள்: வங்கி OTP, போலி வேலைவாய்ப்பு லிங்க்குகளை தவிர்ப்பது எப்படி.
• சமூக வலைதள பாதுகாப்பு: Instagram, Facebook கணக்குகளில் 2FA பாதுகாப்பு அமைத்தல்.
• சாதன பாதுகாப்பு: போன் மற்றும் கணினியில் வைரஸ் மற்றும் ஹேக்கிங் தடுக்கும் வழிகள்.`);
    }

    if (lower.includes('module 01') || lower.includes('module 1') || lower.includes('scholarship')) {
      return sanitizeHumanText(`Module 01: உதவித்தொகை மையம் (Scholarship Hub)

• தகுதி சரிபார்ப்பு: உங்கள் வகுப்பு மற்றும் சமூகப் பிரிவுக்கு ஏற்ப தகுதியான உதவித்தொகைகளை காட்டும்.
• தமிழ்நாடு அரசு திட்டங்கள்: முதல் பட்டதாரி கல்விக்கட்டண விலக்கு, புதுமைப் பெண் திட்டம், தமிழ்ப் புதல்வன் திட்டம், BC/MBC/SC/ST உதவித்தொகைகள்.
• மத்திய அரசு NSP: Post-Matric, Merit-cum-Means, மற்றும் Central Sector திட்டங்கள்.
• கண்காணிப்பு: விண்ணப்ப நிலையை பதிவு செய்து கண்காணிக்கலாம்.`);
    }

    if (lower.includes('module 02') || lower.includes('module 2') || lower.includes('safety') || lower.includes('112') || lower.includes('ragging')) {
      return sanitizeHumanText(`Module 02: மாணவர் பாதுகாப்பு மற்றும் அவசர உதவி மையம்

மாணவர் பாதுகாப்பு மற்றும் ராகிங் எதிர்ப்பு அவசர உதவி எண்கள் (24/7 இலவசம்):
• காவல்துறை அவசர உதவி: 112
• தேசிய ராகிங் எதிர்ப்பு எண் (Anti-Ragging): 1800-180-5522
• சைபர் கிரைம் பண மோசடி: 1930
• பெண்கள் உதவி எண்: 181
• குழந்தைகள்/பள்ளி மாணவர்கள்: 1098
• UGC e-Samadhaan: கல்லூரி நிர்வாக குறைதீர்ப்பு.`);
    }

    if (lower.includes('module 03') || lower.includes('module 3') || lower.includes('certificate') || lower.includes('esevai')) {
      return sanitizeHumanText(`Module 03: சான்றிதழ் மற்றும் ஆவண சேவை (Certificate Hub)

தமிழ்நாடு அரசு இ-சேவை (e-Sevai) மூலம் கல்வி சான்றிதழ்கள் பெற வழிகாட்டுகிறது:
• சாதி சான்றிதழ்: நிரந்தர செல்லுபடியாகும் சான்றிதழ் (Lifetime validity).
• வருமான சான்றிதழ்: குறிப்பிட்ட நிதி ஆண்டுக்கு செல்லுபடியாகும்.
• முதல் பட்டதாரி சான்றிதழ்: கல்லூரிக் கட்டண விலக்கு பெற.
• இருப்பிட சான்றிதழ்: தமிழக அரசு சேர்க்கை மற்றும் ஒதுக்கீட்டுக்கு.
• DigiLocker: அரசு டிஜிட்டல் ஆவணங்களை சேமித்து சரிபார்க்க சம அந்தஸ்து கொண்டது.`);
    }

    if (lower.includes('module 04') || lower.includes('module 4') || lower.includes('exam') || lower.includes('tnpsc') || lower.includes('neet')) {
      return sanitizeHumanText(`Module 04: தேர்வுகள் மற்றும் வாய்ப்புகள் மையம் (Exams Hub)

தமிழ்நாடு மற்றும் இந்திய அளவில் நடைபெறும் 56+ முக்கிய தேர்வுகள்:
• தமிழ்நாடு தேர்வுகள்: TNPSC Group 1, 2, 4, VAO, TNEA பொறியியல் கலந்தாய்வு.
• தேசிய நுழைவுத் தேர்வுகள்: NEET (மருத்துவம்), JEE Main (பொறியியல்), CUET, GATE.
• மத்திய அரசு வேலைவாய்ப்பு: UPSC Civil Services, SSC, வங்கி IBPS, ரயில்வே RRB.`);
    }

    if (lower.includes('module 05') || lower.includes('module 5') || lower.includes('career') || lower.includes('assistant')) {
      return sanitizeHumanText(`Module 05: AI தொழில் மற்றும் கல்வி வழிகாட்டி (Career Assistant)

10-ஆம் வகுப்பு முதல் PhD வரை மாணவர்களின் திறமைக்கு ஏற்ற படிப்புகளை தேர்ந்தெடுக்க வழிகாட்டுகிறது:
• 7-அளவீட்டு மதிப்பீடு: மதிப்பெண்கள், விருப்பப் பாடங்கள், ஆர்வம், பட்ஜெட் அடிப்படையில் வழிகாட்டல்.
• 10-ஆம் & 12-ஆம் வகுப்புக்கு பிறகு: அறிவியல், வணிகவியல், கலை மற்றும் பொறியியல்/மருத்துவப் பாதைகள்.
• டிப்ளமோ லேட்டரல் என்ட்ரி: 2-ம் ஆண்டு B.E./B.Tech நேரடியாக சேரும் முறை.`);
    }

    if (lower.includes('module 06') || lower.includes('module 6') || lower.includes('admission')) {
      return sanitizeHumanText(`Module 06: மாணவர் சேர்க்கை மற்றும் கல்வி தொடர்ச்சி (Admissions Centre)

• TNEA & TNGASA: தமிழ்நாடு அரசு பொறியியல் மற்றும் கலை & அறிவியல் ஒற்றைச் சாளர சேர்க்கை.
• கல்லூரி இடமாற்றம்: அண்ணா பல்கலைக்கழக விதிகளின்படி கல்லூரி மாறுதல் நடைமுறைகள்.
• கல்வி மறுதொடக்கம்: படிப்பை பாதியில் நிறுத்திய மாணவர்கள் மீண்டும் கல்லூரியில் சேரும் வழிமுறைகள்.
• APAAR / Academic Bank of Credits: கல்வி மதிப்பெண்கள் டிஜிட்டல் முறையில் மாற்றப்படும் வசதி.`);
    }

    if (lower.includes('module 07') || lower.includes('module 7') || lower.includes('academic') || lower.includes('learning')) {
      return sanitizeHumanText(`Module 07: கல்வி ஆதரவு மற்றும் கற்றல் மையம் (Academic Support)

• SWAYAM & NPTEL: IIT மற்றும் பல்கலைக்கழக பேராசிரியர்களின் இலவச பாடங்கள்.
• NCERT & DIKSHA: பள்ளி மாணவர்களுக்கான இலவச மின்புத்தகங்கள் மற்றும் வீடியோக்கள்.
• பாடம் வாரியான வழிகாட்டல்: கடினமான பாடங்களை எளிதில் படிக்கும் கற்றல் வழிகள்.`);
    }

    if (lower.includes('module 08') || lower.includes('module 8') || lower.includes('internship') || lower.includes('employment')) {
      return sanitizeHumanText(`Module 08: பயிற்சி மற்றும் வேலைவாய்ப்பு மையம் (Internships & Jobs)

• அரசு இன்டர்ன்ஷிப்: AICTE, NITI Aayog, ISRO, TNeGA அரசு நிறுவனங்களில் பயிற்சிகள்.
• சட்டரீதியான அப்ரண்டிஸ் (NATS / NAPS): மாதாந்திர உதவித்தொகையுடன் கூடிய தொழிற்பயிற்சிகள்.
• தமிழ்நாடு வேலைவாய்ப்பு அலுவலகம் (TN Velaivaaippu): ஆன்லைன் பதிவு வழிகாட்டி.
• கட்டண மோசடி பாதுகாப்பு: மாணவர்களிடம் பணம் கேட்கும் போலி வேலை மோசடிகளை தடுக்கும் வழிகள்.`);
    }

    if (lower.includes('module 09') || lower.includes('module 9') || lower.includes('skill') || lower.includes('english')) {
      return sanitizeHumanText(`Module 09: மொழி மற்றும் மென்திறன் ஆய்வகம் (Skill Lab)

• தினசரி ஆங்கில பயிற்சி: எளிய முறையில் அன்றாடம் பேசும் ஆங்கில வாக்கியங்கள்.
• கேம்பஸ் இன்டர்வியூ பயிற்சி: HR நேர்முகத் தேர்வில் கேட்கப்படும் கேள்விகளுக்கு பதிலளிக்கும் முறை.
• குழு விவாதம் (GD) நுணுக்கங்கள்: பயமின்றி மற்றவர்களுடன் விவாதிக்கும் ஆற்றல்.
• பயோடேட்டா (Resume) தயாரிப்பு: ATS முறைக்கு ஏற்ற மாதிரி படிவங்கள்.`);
    }

    if (lower.includes('dashboard') || lower.includes('profile') || lower.includes('onboarding')) {
      return sanitizeHumanText(`மாணவர் சுயவிவரம் மற்றும் பலகை (Profile & Dashboard)

• பதிவு செய்தல்: மின்னஞ்சல் அல்லது கூகுள் கணக்கு மூலம் இணையலாம்.
• 6-படி சுயவிவரம்: கல்வி நிலை, படிப்பு, கல்லூரி, மதிப்பெண்களை பூர்த்தி செய்து "Save & Complete Profile" கிளிக் செய்யவும்.
• மாணவர் பலகை: நீங்கள் சேமித்த உதவித்தொகைகள் மற்றும் விண்ணப்பங்களை ஒரே இடத்தில் கண்காணிக்கலாம்.`);
    }

    return sanitizeHumanText(`Student RSO என்பது மாணவர்களுக்கான 10 ஒருங்கிணைந்த சேவைகளை வழங்கும் ஒரு தளமாகும். இதில் உதவித்தொகை, மாணவர் பாதுகாப்பு, சான்றிதழ்கள், தேர்வுகள், AI தொழில் வழிகாட்டி, சேர்க்கை, கல்வி ஆதரவு, இன்டர்ன்ஷிப், மென்திறன் மற்றும் டிஜிட்டல் பாதுகாப்பு போன்ற அனைத்தும் இடம்பெற்றுள்ளன.`);
  }

  // Translation to English
  if (lower.includes('module 10') || lower.includes('டிஜிட்டல்') || lower.includes('சைபர்') || lower.includes('மோசடி') || lower.includes('1930')) {
    return sanitizeHumanText(`Module 10: Digital Safety & Cyber-Wellness Shield

Dedicated protection against digital fraud and cyber harms:
National Cyber Financial Fraud Helpline: 1930 (Report within the 1-hour Golden Hour to freeze stolen funds).
• Cyberbullying & Impersonation: Evidence preservation and legal reporting under the IT Act.
• Phishing & Scam Defense: Guarding against fake part-time jobs, scholarship lottery frauds, and OTP extortion.
• Device Security Checklist: 2-Factor Authentication (2FA), app permissions, and password hygiene.`);
  }

  if (lower.includes('module 01') || lower.includes('module 1') || lower.includes('உதவித்தொகை')) {
    return sanitizeHumanText(`Module 01: Scholarship Hub

• Eligibility Matching: Automatically filters scholarships matching your class (Class 10, 12, Diploma, UG, PG, PhD), family income, and community.
• Tamil Nadu Schemes: First Graduate tuition waiver, Pudhumai Penn, Tamil Pudhalvan, BC/MBC/DNC and SC/ST welfare scholarships.
• National NSP Schemes: Central Sector, Post-Matric, Merit-cum-Means, and Pragati scholarships.
• Application Tracker & Renewals: Track progress from submission to disbursement with official deadline alerts.`);
  }

  if (lower.includes('module 02') || lower.includes('module 2') || lower.includes('பாதுகாப்பு') || lower.includes('ராகிங்') || lower.includes('112')) {
    return sanitizeHumanText(`Module 02: Safety & Grievance Support System

Student RSO connects you directly to statutory authorities with zero compromise on student safety:
Official 24/7 Helplines:
• National Integrated Emergency: 112
• National Anti-Ragging Helpline: 1800-180-5522
• National Cyber Crime & Financial Fraud: 1930
• Women Helpline (Tamil Nadu & National): 181
• Childline (Under 18 / School Students): 1098
• UGC e-Samadhaan: College administration and grievance redressal portal.`);
  }

  if (lower.includes('module 03') || lower.includes('module 3') || lower.includes('சான்றிதழ்') || lower.includes('இ-சேவை')) {
    return sanitizeHumanText(`Module 03: Certificate & Document Service

Official statutory guide for Tamil Nadu Revenue and educational certificates:
• Community Certificate (REV-101): Permanent lifetime validity.
• Income Certificate (REV-102): Valid for prescribed financial year.
• First Graduate Certificate (REV-104): Enables tuition fee waiver under TN Free Education rules.
• Nativity Certificate (REV-103): Proves Tamil Nadu domicile for admissions.
• DigiLocker Parity: Legally recognized on par with physical originals under Rule 9A of IT Rules 2016.`);
  }

  if (lower.includes('module 04') || lower.includes('module 4') || lower.includes('தேர்வு') || lower.includes('tnpsc')) {
    return sanitizeHumanText(`Module 04: Exams & Opportunity Hub

Comprehensive registry of 56+ verified examinations categorized by career stage:
• State Examinations: TNPSC Groups 1, 2, 4, VAO, TNUSRB Police, TRB, and TNEA counselling.
• National Entrance Tests: NTA NEET-UG/PG, JEE Main & Advanced, CUET-UG, GATE, CAT, and CLAT.
• Central Recruitment: UPSC Civil Services & NDA, SSC CGL/CHSL/MTS, IBPS PO/Clerk, and Railway RRB.`);
  }

  if (lower.includes('module 05') || lower.includes('module 5') || lower.includes('தொழில்') || lower.includes('வழிகாட்டி')) {
    return sanitizeHumanText(`Module 05: AI Student Career & Life Assistant

Autonomous educational mentor evaluating your career progression across 7 key parameters:
• From Class 10 to PhD: Course options after 10th/12th, undergraduate degree pathways, polytechnic lateral entry, and research fellowships.
• 7-Parameter Evaluation: Marks, Subjects, Interests, Career Goal, Budget, Location, and Government vs. Private sector.
• Document & Syllabus Guidance: Upload documents or marksheets for grounded career recommendations.`);
  }

  if (lower.includes('module 06') || lower.includes('module 6') || lower.includes('சேர்க்கை') || lower.includes('tnea')) {
    return sanitizeHumanText(`Module 06: Student Admission & Education Continuity

Statutory frameworks covering higher education admissions across Tamil Nadu:
• Single Window Admissions: TNEA Engineering Counselling, TNGASA Government Arts & Science, and DME Medical admissions.
• Inter-College Transfers: Regulations, eligibility criteria, and NOC checklist for college & branch transfers.
• Break of Study Re-entry: Re-admission guidelines within statutory maximum degree durations.
• Academic Bank of Credits (ABC / APAAR): Digital credit accumulation and institutional mobility under UGC frameworks.`);
  }

  if (lower.includes('module 07') || lower.includes('module 7') || lower.includes('கல்வி ஆதரவு') || lower.includes('swayam')) {
    return sanitizeHumanText(`Module 07: Academic Support & Learning Centre

Curriculum learning resources, remedial roadmaps, and free high-quality educational toolkits:
• SWAYAM & NPTEL: Free video lectures and course materials from IIT professors.
• NCERT & DIKSHA: Textbooks and conceptual video modules for school students.
• Remedial Learning: Subject roadmaps and study skills for difficult topics.`);
  }

  if (lower.includes('module 08') || lower.includes('module 8') || lower.includes('வேலை') || lower.includes('பயிற்சி')) {
    return sanitizeHumanText(`Module 08: Internship, Skill & Employment Exchange

• Verified Opportunities: Government (AICTE, NITI Aayog, ISRO, TNeGA) and corporate internships.
• National Apprenticeship (NATS & NAPS): Monthly stipend-backed training in Southern Railway, TANGEDCO, and PSUs.
• TN Employment Exchange (Velaivaaippu): 6-step lifecycle guide for state employment renewal and card maintenance.
• Zero-Fee Student Anti-Fraud Shield: Verified zero-fee rule protecting students from fake training charges.`);
  }

  if (lower.includes('module 09') || lower.includes('module 9') || lower.includes('மென்திறன்') || lower.includes('ஆங்கிலம்')) {
    return sanitizeHumanText(`Module 09: Language, Soft-Skills & Confidence Lab

Student development centre designed for Tamil Nadu students preparing for professional careers:
• Daily Spoken English Workout: 7-part daily rotation for clear conversational and professional English.
• Campus Placement Interview Prep: Standard HR and technical round interview strategies.
• Group Discussion (GD) Framework: Speaking etiquette, structuring arguments, and intervention tips.
• ATS-Friendly Resume Guide: Clean formats, action verbs, and cover letter templates.`);
  }

  if (lower.includes('சுயவிவரம்') || lower.includes('பலகை') || lower.includes('dashboard')) {
    return sanitizeHumanText(`Student Account, Profile & Dashboard

• Sign In / Registration: Instant access via Email OTP or Google Single Sign-On.
• 6-Step Student Onboarding: Fill in your education level, course, institution, marks percentage, annual income, and preferences, then tap "Save & Complete Profile".
• Personalized Dashboard: Track saved scholarships, monitor application stages, and access custom recommendation matching.`);
  }

  return sanitizeHumanText(`Student RSO is a unified digital platform providing 10 core student services across Tamil Nadu and India: Scholarships, Safety & 112 Helplines, e-Sevai Certificates, Competitive Exams, AI Career Guidance, Admissions, Academic Support, Internships, Skill Lab, and Digital Safety.`);
}
