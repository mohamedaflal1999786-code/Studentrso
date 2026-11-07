// lib/academic-data.ts
// Comprehensive Database for Module 07: Academic Support & Learning Centre
// Genuine Educational Resources, Portals, Subject Catalogs, Difficulties & Solutions

export type EducationStage =
  | 'All Stages'
  | 'Class 10 (SSLC)'
  | 'Class 11 & 12 (HSC)'
  | 'Diploma & Polytechnic'
  | 'Undergraduate (UG)'
  | 'Postgraduate (PG)'
  | 'PhD & Research';

export type ResourceCategory =
  | 'All Categories'
  | 'Free Online Courses'
  | 'Official Textbooks'
  | 'Video Lectures'
  | 'Virtual Laboratories'
  | 'Previous Question Papers'
  | 'Syllabus & Curriculum'
  | 'Remedial Learning'
  | 'Digital Skills'
  | 'Language & Communication'
  | 'Research & Thesis'
  | 'Accessibility & Special Support';

export type CostType = '100% Free' | 'Free with Paid Certification' | 'Government Subsidized';

export interface VerifiedLearningResource {
  id: string;
  title: string;
  organisation: string;
  governingBody: string;
  category: ResourceCategory;
  applicableStages: EducationStage[];
  subjects: string[];
  cost: CostType;
  languages: string[];
  officialUrl: string;
  verifiedDomain: string;
  description: string;
  features: string[];
  lastVerified: string;
  availabilityStatus: 'ACTIVE' | 'VERIFIED' | 'TEMPORARILY_UNAVAILABLE';
}

export interface AcademicDifficultyItem {
  id: string;
  stage: EducationStage;
  topic: string;
  description: string;
  commonCauses: string[];
  practicalSolutions: string[];
  stepByStepGuidance: string[];
  recommendedResources: { title: string; url: string; platform: string; free: boolean }[];
  furtherSupport: string;
}

export interface SubjectDirectoryItem {
  id: string;
  stage: EducationStage;
  stream?: string;
  name: string;
  code?: string;
  description: string;
  learningObjectives: string[];
  syllabusAuthority: string;
  officialSyllabusUrl: string;
  freeCoursePlatforms: { title: string; platform: string; url: string }[];
  textbookResources: { title: string; publisher: string; url: string }[];
  practiceTools: { title: string; description: string; url: string }[];
}

export interface ExamPreparationGuide {
  id: string;
  stage: EducationStage;
  examName: string;
  conductingBody: string;
  frequency: string;
  examPattern: string;
  officialSyllabusSummary: string[];
  studyPlanRoadmap: { phase: string; duration: string; focus: string }[];
  subjectPreparationTips: string[];
  officialPortalUrl: string;
  modelPapersAvailable: boolean;
  modelPapersUrl: string;
  revisionStrategy: string[];
}

export interface StudySkillGuide {
  id: string;
  title: string;
  category: 'Time Management' | 'Memory & Retention' | 'Study Techniques' | 'Writing & Assignments' | 'Exam Strategy';
  summary: string;
  stepByStepProtocol: string[];
  actionableExamples: string[];
  commonMistakesToAvoid: string[];
  recommendedTools: { name: string; url: string; note: string }[];
}

export interface RemedialLearningTrack {
  id: string;
  domain: string;
  targetStage: EducationStage[];
  foundationalConcepts: string[];
  learningRoadmap: { stage: string; topics: string[]; milestone: string }[];
  beginnerCourses: { title: string; platform: string; url: string; free: boolean }[];
  practiceMaterials: { title: string; type: string; url: string }[];
  progressionPathToAdvanced: string;
}

export interface DigitalSkillTrack {
  id: string;
  title: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  relevance: string;
  syllabusModules: string[];
  practicalExercises: string[];
  recommendedFreeCourses: { title: string; platform: string; url: string }[];
  careerRelevance: string;
}

export interface LanguageCommunicationSkill {
  id: string;
  area: string;
  focus: string;
  proficiencyLevel: 'Foundational' | 'Intermediate' | 'Professional';
  learningObjectives: string[];
  dailyPracticeHabits: string[];
  recommendedFreePlatforms: { title: string; platform: string; url: string }[];
  verificationNote: string;
}

export interface AccessibilitySupportItem {
  id: string;
  category: 'Visual Accommodation' | 'Hearing & Speech' | 'Motor & Physical' | 'Learning & Cognitive' | 'Institutional Support';
  title: string;
  statutoryNorm: string;
  accommodationsOffered: string[];
  accessibleSoftwareTools: { name: string; developer: string; url: string; free: boolean }[];
  officialUniversityCells: { university: string; contactEmail: string; portal: string }[];
  statutoryHelpline: string;
}

export interface AssignmentResearchGuide {
  id: string;
  stage: EducationStage;
  title: string;
  type: 'Homework' | 'Science Projects' | 'Laboratory Record' | 'Mini Project' | 'Capstone Final Project' | 'Research Proposal' | 'Dissertation' | 'Thesis & Publication';
  stepByStepWorkflow: string[];
  formattingStandards: string[];
  ethicsAndPlagiarismRules: string[];
  recommendedReferenceManagers: { name: string; url: string; note: string }[];
  officialGuidelinesPdfUrl: string;
}

// ---------------------------------------------------------------------------
// 1. VERIFIED OFFICIAL LEARNING RESOURCES DATABASE
// ---------------------------------------------------------------------------
export const VERIFIED_LEARNING_RESOURCES: VerifiedLearningResource[] = [
  {
    id: 'res-swayam-gov',
    title: 'SWAYAM Central Online Courses Platform',
    organisation: 'Ministry of Education, Government of India',
    governingBody: 'MoE / NPTEL / AICTE / UGC / NCERT',
    category: 'Free Online Courses',
    applicableStages: ['Class 11 & 12 (HSC)', 'Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)', 'PhD & Research'],
    subjects: ['Engineering', 'Science', 'Humanities', 'Management', 'Commerce', 'Mathematics', 'Computer Science'],
    cost: '100% Free',
    languages: ['English', 'Hindi', 'Regional Languages'],
    officialUrl: 'https://swayam.gov.in',
    verifiedDomain: 'swayam.gov.in',
    description: 'National MOOCs platform designed to achieve the three cardinal principles of Education Policy: access, equity and quality. Courses from Class 9 up to post-graduation can be accessed by anyone, anywhere at any time for free.',
    features: [
      'Credit transfer under UGC SWAYAM 40% regulation',
      'Video lectures, downloadable reading material, self-assessment tests',
      'Course mentors from IITs, IIMs and Central Universities',
      'Optional low-cost proctored certificate examination',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-nptel-iitm',
    title: 'NPTEL (National Programme on Technology Enhanced Learning)',
    organisation: 'IIT Madras & Consortium of 7 IITs + IISc Bangalore',
    governingBody: 'Ministry of Education (MoE)',
    category: 'Video Lectures',
    applicableStages: ['Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)', 'PhD & Research'],
    subjects: ['Mechanical', 'Computer Science', 'Electrical', 'Civil', 'Chemical', 'Aerospace', 'Humanities', 'Basic Sciences'],
    cost: '100% Free',
    languages: ['English'],
    officialUrl: 'https://nptel.ac.in',
    verifiedDomain: 'nptel.ac.in',
    description: 'The largest repository of peer-reviewed engineering, basic sciences, and humanities lecture video series and web courses developed by faculty from top IITs and IISc.',
    features: [
      'Over 2,400+ complete semester-length courses',
      'Weekly graded assignments with discussion forum support',
      'Internship opportunities for top performers with course professors',
      'Direct credit transfer recognized by Anna University and AICTE',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-diksha-gov',
    title: 'DIKSHA National Digital Infrastructure for Teachers & Students',
    organisation: 'NCERT & Department of School Education and Literacy',
    governingBody: 'Ministry of Education, Government of India',
    category: 'Official Textbooks',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)'],
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Tamil', 'Physics', 'Chemistry', 'Biology'],
    cost: '100% Free',
    languages: ['English', 'Tamil', 'Hindi', 'All Major Indian Languages'],
    officialUrl: 'https://diksha.gov.in',
    verifiedDomain: 'diksha.gov.in',
    description: 'National portal offering interactive digital learning materials mapped directly to energized QR codes embedded in state and NCERT school textbooks.',
    features: [
      'Interactive simulations, explanatory video animations, worksheets',
      'Full Tamil Nadu Samacheer Kalvi aligned content',
      'Accessible on web and lightweight Android app with offline sync',
      'Zero cost, no advertisements or private subscriptions',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-epathshala-nic',
    title: 'ePathshala Digital Educational Resource Hub',
    organisation: 'Central Institute of Educational Technology (CIET) & NCERT',
    governingBody: 'Ministry of Education, GoI',
    category: 'Official Textbooks',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)'],
    subjects: ['Mathematics', 'Science', 'Social Science', 'Languages', 'Physics', 'Chemistry', 'Commerce'],
    cost: '100% Free',
    languages: ['English', 'Hindi', 'Regional Languages'],
    officialUrl: 'https://epathshala.ncert.gov.in/',
    verifiedDomain: 'epathshala.ncert.gov.in',
    description: 'Joint initiative showcasing educational e-resources including textbooks, audio, video, periodicals, and a variety of other print and non-print materials.',
    features: [
      'Complete digitized school textbooks from Class 1 to 12 in ePub and PDF format',
      'Flipbook readers with highlighting, bookmarking and zoom support',
      'Educational podcasts and spoken tutorials for conceptual clarity',
      'Audiobooks for visually impaired students',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-ndli-iitkgp',
    title: 'National Digital Library of India (NDLI)',
    organisation: 'IIT Kharagpur',
    governingBody: 'Ministry of Education (MoE)',
    category: 'Research & Thesis',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)', 'Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)', 'PhD & Research'],
    subjects: ['All Disciplines', 'Engineering', 'Sciences', 'Humanities', 'Law', 'Medicine', 'Literature'],
    cost: '100% Free',
    languages: ['English', 'Tamil', 'Hindi', '70+ Languages'],
    officialUrl: 'https://ndl.iitkgp.ac.in',
    verifiedDomain: 'ndl.iitkgp.ac.in',
    description: 'A virtual repository of learning resources with a single-window search facility for over 100+ million books, articles, theses, manuscripts, and audio-video lectures.',
    features: [
      'Over 100 million full-text digitized educational contents',
      'Access to Shodhganga Indian ETD repositories and rare manuscripts',
      'Filter by author, subject, source, educational level, and file format',
      'Institutional club membership for college students',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-scert-tnschools',
    title: 'Tamil Nadu SCERT & School Education Portal',
    organisation: 'State Council of Educational Research and Training (SCERT), Tamil Nadu',
    governingBody: 'Department of School Education, Govt. of Tamil Nadu',
    category: 'Syllabus & Curriculum',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)'],
    subjects: ['Tamil', 'English', 'Mathematics', 'Science', 'Social Science', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    cost: '100% Free',
    languages: ['Tamil', 'English'],
    officialUrl: 'https://scert.tnschools.gov.in',
    verifiedDomain: 'scert.tnschools.gov.in',
    description: 'Official repository of Tamil Nadu State Board textbooks, teacher handbooks, model question banks, blue-prints, and remedial learning workbooks.',
    features: [
      'Official Samacheer Kalvi textbooks in Tamil and English medium PDFs',
      'Public examination question banks and solution keys',
      'Bridge course learning modules for academic continuity',
      'Practical examination manual and laboratory guidance',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-vlabs-ac-in',
    title: 'Virtual Labs (V-Labs) Simulation Platform',
    organisation: 'IIT Delhi & 12 Participating National Institutes',
    governingBody: 'National Mission on Education through ICT (NMEICT)',
    category: 'Virtual Laboratories',
    applicableStages: ['Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)'],
    subjects: ['Electronics & Comm', 'Computer Science', 'Mechanical', 'Chemical Engineering', 'Civil Engineering', 'Biotechnology', 'Physical Sciences'],
    cost: '100% Free',
    languages: ['English'],
    officialUrl: 'https://www.vlab.co.in/',
    verifiedDomain: 'vlabs.ac.in',
    description: 'Remote-access to interactive laboratories in various disciplines of Science and Engineering. Enables students to conduct simulated experiments anytime, anywhere.',
    features: [
      'Over 100+ virtual labs containing 1000+ interactive experiments',
      'Self-evaluation pre-tests and post-tests with instant feedback',
      'Ideal for polytechnic and engineering students lacking specialized hardware labs',
      'Complete step-by-step experiment instructions, theory, and circuit simulators',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-spoken-tutorial',
    title: 'Spoken Tutorial Open Source Software Training',
    organisation: 'IIT Bombay',
    governingBody: 'Ministry of Education (MoE)',
    category: 'Digital Skills',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)', 'Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)'],
    subjects: ['Python', 'C/C++', 'Java', 'Linux', 'LibreOffice', 'LaTeX', 'Blender', 'GIMP', 'PHP & MySQL', 'QGIS'],
    cost: '100% Free',
    languages: ['English', 'Tamil', 'Hindi', '22 Indian Languages'],
    officialUrl: 'https://spoken-tutorial.org',
    verifiedDomain: 'spoken-tutorial.org',
    description: 'Award-winning audio-video tutorial series on open-source software, taught in 10-minute self-paced modules in simple vernacular languages.',
    features: [
      'Audio dubbed in clear conversational Tamil and Indian languages',
      'Beginner to advanced tracks in programming, CAD, and desktop tools',
      'Offline downloadable tutorial bundles for computer labs with low internet',
      'Online test certificates valid for academic credits and employment portfolios',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-ncert-nic',
    title: 'NCERT Official Educational Materials Portal',
    organisation: 'National Council of Educational Research and Training (NCERT)',
    governingBody: 'Ministry of Education, GoI',
    category: 'Official Textbooks',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Accountancy', 'Economics', 'History', 'Geography'],
    cost: '100% Free',
    languages: ['English', 'Hindi', 'Urdu'],
    officialUrl: 'https://ncert.nic.in/',
    verifiedDomain: 'ncert.nic.in',
    description: 'Authoritative publisher of national curriculum textbooks, exemplar problems with solutions, teacher manuals, and learning outcome assessments.',
    features: [
      'NCERT Exemplar Problems for JEE and NEET foundational mastery',
      'Laboratory manuals with step-by-step safety and experiment procedures',
      'Syllabus documents outlining national learning outcomes',
      'Free unrestricted PDF chapter downloads',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-ugc-learning',
    title: 'UGC e-Content & Open Educational Resources Directory',
    organisation: 'University Grants Commission (UGC) & INFLIBNET Centre',
    governingBody: 'Ministry of Education, GoI',
    category: 'Free Online Courses',
    applicableStages: ['Undergraduate (UG)', 'Postgraduate (PG)', 'PhD & Research'],
    subjects: ['Arts', 'Social Sciences', 'Pure Sciences', 'Commerce', 'Law', 'Library Science'],
    cost: '100% Free',
    languages: ['English', 'Hindi'],
    officialUrl: 'https://ugceresources.in/',
    verifiedDomain: 'ugceresources.in',
    description: 'Consolidated university-level learning resources portal including e-PG Pathshala, SWAYAM PRABHA DTH educational channels, and Shodhganga research archives.',
    features: [
      'e-PG Pathshala: High quality, curriculum-based interactive e-content in 70+ PG subjects',
      'VIDWAN: Premier database of scientists and researchers in India',
      'Shodhgangotri: Repository of approved Indian research synopses and proposals',
      'CEC (Consortium for Educational Communication) video lecture archive',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-aicte-resources',
    title: 'AICTE ELIS Portal (Enhancement in Learning with Improvement in Skills)',
    organisation: 'All India Council for Technical Education (AICTE)',
    governingBody: 'Ministry of Education, GoI',
    category: 'Digital Skills',
    applicableStages: ['Diploma & Polytechnic', 'Undergraduate (UG)', 'Postgraduate (PG)'],
    subjects: ['Artificial Intelligence', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Soft Skills'],
    cost: '100% Free',
    languages: ['English', 'Hindi'],
    officialUrl: 'https://free.aicte-india.org/',
    verifiedDomain: 'free.aicte-india.org',
    description: 'Curated repository of free e-learning software, courses, and technical toolkits aggregated from leading global EdTech and academic partners for Indian students.',
    features: [
      'Free access to industry-grade technical learning software modules',
      'Mapped to AICTE Model Curriculum for polytechnics and engineering colleges',
      'NEAT (National Educational Alliance for Technology) verified courses',
      'No fees or charges for verified college students',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
  {
    id: 'res-tnschools-kalvi',
    title: 'Kalvi Tholaikkaatchi (TN Educational Television Archive)',
    organisation: 'State Educational Technology Cell, Department of School Education, TN',
    governingBody: 'Government of Tamil Nadu',
    category: 'Video Lectures',
    applicableStages: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)'],
    subjects: ['Mathematics', 'Science', 'Social Science', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Computer Science'],
    cost: '100% Free',
    languages: ['Tamil', 'English'],
    officialUrl: 'https://tnschools.gov.in',
    verifiedDomain: 'tnschools.gov.in',
    description: 'Archived broadcast educational lessons taught by master resource persons of Tamil Nadu School Education Department, covering every chapter of the syllabus.',
    features: [
      'Complete chapter-wise video explanations mapped to Samacheer Kalvi textbooks',
      'Bilingual explanations with visual aids, real-life examples and animations',
      'Special public examination preparation sessions and problem-solving clinics',
      'Unrestricted streaming on official government web portals',
    ],
    lastVerified: '2026-11-01',
    availabilityStatus: 'VERIFIED',
  },
];

// ---------------------------------------------------------------------------
// 2. ACADEMIC DIFFICULTIES & STEP-BY-STEP SOLUTIONS
// ---------------------------------------------------------------------------
export const ACADEMIC_DIFFICULTIES: AcademicDifficultyItem[] = [
  // School Students
  {
    id: 'diff-school-maths',
    stage: 'Class 10 (SSLC)',
    topic: 'Difficulty Understanding Mathematics & Problem Solving',
    description: 'Students struggle with algebraic abstractions, geometry proofs, coordinate geometry, and trigonometry formulas, often resulting in math anxiety and poor scores.',
    commonCauses: [
      'Gaps in foundational arithmetic and fractional operations from middle school',
      'Attempting to memorize mathematical problem steps without conceptual visualization',
      'Lack of daily structured problem-solving practice',
      'Fear of making errors leading to complete avoidance of homework',
    ],
    practicalSolutions: [
      'Return to prerequisite concepts: Spend 20 minutes daily reviewing prime factorization, fractions, and quadratic roots before attempting Class 10 problems.',
      'Maintain a Dedicated Formula & Theorem Pocket Notebook: Write definitions, geometric diagrams, and formula derivations in your own words.',
      'Apply the "Three-Pass Problem Method": Read the problem once for understanding, list Given vs To Find, draw a sketch, and then apply relevant formula.',
      'Practice 5 problems daily rather than 50 problems right before examinations.',
    ],
    stepByStepGuidance: [
      'Step 1: Download NCERT / TN SCERT Mathematics Class 10 Chapter 1 & 2 solutions from ePathshala or DIKSHA.',
      'Step 2: Watch visual concept animations on DIKSHA QR code links for Geometry theorems.',
      'Step 3: Solve all worked-out textbook examples first before attempting exercise problems.',
      'Step 4: Solve past 5 years Board Examination 2-mark and 5-mark questions under timed conditions.',
      'Step 5: Verify mistakes using official model answer keys to spot algebraic calculation slips.',
    ],
    recommendedResources: [
      { title: 'DIKSHA Class 10 Mathematics Interactive Modules', url: 'https://diksha.gov.in', platform: 'DIKSHA (NCERT)', free: true },
      { title: 'NCERT Exemplar Problems in Mathematics Class X', url: 'https://ncert.nic.in/', platform: 'NCERT', free: true },
      { title: 'TN SCERT Mathematics Textbooks & Solution Keys', url: 'https://scert.tnschools.gov.in', platform: 'TN SCERT', free: true },
    ],
    furtherSupport: 'Speak to your school mathematics subject teacher during remedial tutorial periods or request peer-study sessions with classmates.',
  },
  {
    id: 'diff-school-science',
    stage: 'Class 10 (SSLC)',
    topic: 'Difficulty Understanding Science Concepts & Diagram Drawing',
    description: 'Difficulty distinguishing between abstract physics formulas (electricity, light), chemical balancing equations, and biological organ diagrams.',
    commonCauses: [
      'Passive reading of science textbooks like a storybook without writing down definitions',
      'Inability to visualize unseen phenomena such as electric circuits or ray optics',
      'Losing marks in board examinations due to unlabelled or messy biological diagrams',
    ],
    practicalSolutions: [
      'Convert text into visual flowcharts: Summarize photosynthesis, reflex action, and extraction of metals into clean sequential block diagrams.',
      'Daily 15-Minute Diagram Practice: Draw neat, fully labelled biological diagrams (Human Brain, Nephron, Flower Structure) using pencil and ruler.',
      'Equation Balancing Drills: Dedicate one weekend hour to balancing 20 chemical equations step-by-step using atom tally tables.',
    ],
    stepByStepGuidance: [
      'Step 1: Read the chapter summary at the end of each NCERT / SCERT chapter first.',
      'Step 2: Watch Virtual Labs (vlabs.ac.in) simulations to observe ray optics and circuit resistance in real time.',
      'Step 3: Create two columns on your paper: Law/Principle on the left, Mathematical expression + SI Units on the right.',
      'Step 4: Solve end-of-chapter exercise questions in writing, strictly adhering to the word limits.',
    ],
    recommendedResources: [
      { title: 'Virtual Labs Science Simulations for High School', url: 'https://www.vlab.co.in/', platform: 'Virtual Labs', free: true },
      { title: 'Kalvi Tholaikkaatchi Video Science Class Archive', url: 'https://tnschools.gov.in', platform: 'TN Schools', free: true },
    ],
    furtherSupport: 'Utilize your school science laboratory hours to actually touch equipment like ammeters, lenses, and chemical reagents.',
  },
  {
    id: 'diff-hsc-pcmb',
    stage: 'Class 11 & 12 (HSC)',
    topic: 'Managing Dual Preparation: Board Syllabus vs Entrance Exams (JEE/NEET)',
    description: 'Higher secondary science students often feel crushed between subjective descriptive board answers and objective multi-concept speed-based entrance tests.',
    commonCauses: [
      'Treating board study and entrance prep as two completely disconnected worlds',
      'Ignoring NCERT / State Board textbook theory to solve coaching test series prematurely',
      'Severe sleep deprivation and unorganized study hours leading to burnout',
    ],
    practicalSolutions: [
      'Unified Concept Approach: Read the NCERT/State Board chapter thoroughly first; build clear theoretical understanding before attempting MCQs.',
      '60-40 Weekly Time Partition: Monday to Thursday dedicate 60% time to board subjective writing and derivation practice; Friday to Sunday dedicate 60% time to timed MCQ solving.',
      'Formula & Reaction Sheet: Keep a handwritten wall chart of Organic Reaction Mechanisms and Physics derivations.',
    ],
    stepByStepGuidance: [
      'Step 1: Master textbook derivations by writing them out completely without looking at the book.',
      'Step 2: Solve past 10 years Board question papers for 5-mark and 3-mark derivation structure.',
      'Step 3: Solve NTA official mock tests available on nta.ac.in/quiz for exam endurance.',
      'Step 4: Analyze every incorrect mock answer in an Error Log Notebook: classify into Conceptual error, Calculation error, or Rushing error.',
    ],
    recommendedResources: [
      { title: 'SWAYAM Class 11-12 Physics & Chemistry MOOCs', url: 'https://swayam.gov.in', platform: 'SWAYAM', free: true },
      { title: 'National Digital Library of India Higher Secondary Collection', url: 'https://ndl.iitkgp.ac.in', platform: 'NDLI', free: true },
    ],
    furtherSupport: 'Consult your higher secondary school principal or counsellor regarding balanced study scheduling.',
  },
  // Diploma & Polytechnic
  {
    id: 'diff-diploma-eng-maths',
    stage: 'Diploma & Polytechnic',
    topic: 'Engineering Mathematics (M-I & M-II) and Backlog Clearance',
    description: 'Polytechnic students frequently face backlogs in first-year Engineering Mathematics (Matrices, Differential Calculus, Integration), blocking diploma completion and lateral entry.',
    commonCauses: [
      'Entering polytechnic directly from Class 10 without higher secondary calculus background',
      'DOTE examination questions requiring rigorous multi-step algebraic manipulation',
      'Inability to remember trigonometric identities needed for integration substitutions',
    ],
    practicalSolutions: [
      'Build a 1-page Trigonometry Identity Sheet: Master sin(A+B), cos2x, double-angle formulas first, as 80% of calculus problems depend on them.',
      'Focus on High-Weightage Chapters First: Matrices (Eigenvalues, Cayley-Hamilton Theorem) and Analytical Geometry guarantee significant pass marks.',
      'Work Through 5 Previous DOTE Board Papers: Polytechnic mathematics questions follow consistent pattern templates.',
    ],
    stepByStepGuidance: [
      'Step 1: Download the official DOTE L-Scheme / N-Scheme Engineering Mathematics syllabus from dte.tn.gov.in.',
      'Step 2: Watch NPTEL or Spoken Tutorial video modules on Basic Calculus and Matrix Algebra.',
      'Step 3: Solve 3 questions from each unit every single evening with step-by-step written verification.',
      'Step 4: Attend college remedial or backlog revision coaching organized before semester examinations.',
    ],
    recommendedResources: [
      { title: 'NPTEL Basic Engineering Mathematics Video Lectures', url: 'https://nptel.ac.in', platform: 'NPTEL (IITs)', free: true },
      { title: 'DOTE Official Syllabus & Question Bank Portal', url: 'https://dte.tn.gov.in', platform: 'DOTE Tamil Nadu', free: true },
    ],
    furtherSupport: 'Approach your Polytechnic Mathematics Department Head to request special backlog tutorial classes.',
  },
  {
    id: 'diff-diploma-technical-drawing',
    stage: 'Diploma & Polytechnic',
    topic: 'Engineering Graphics & Technical Drawing Difficulties',
    description: 'Students struggle with spatial visualization of 3D objects, orthographic projections, isometric views, and section of solids.',
    commonCauses: [
      'Lack of 3D spatial reasoning experience from school schooling',
      'Incorrect use of mini-drafters, compasses, and pencil grading (H, 2H, HB)',
      'Time pressure in 3-hour drawing board examinations',
    ],
    practicalSolutions: [
      'Use Physical Cardboard or Foam Models: Create actual geometric cubes, cones, and prisms to physically rotate and view Front, Top, and Side projections.',
      'Master First-Angle vs Third-Angle Projections: Understand quadrant conventions thoroughly.',
      'Pencil Sharpness & Cleanliness Discipline: Use 2H for construction lines, H for dimension lines, and HB for final visible object outlines.',
    ],
    stepByStepGuidance: [
      'Step 1: Watch NPTEL Engineering Drawing 3D animated visualizer videos.',
      'Step 2: Practice projecting simple blocks before moving to complex intersecting cylinders.',
      'Step 3: Time yourself: Allocate 45 minutes for Orthographic, 40 minutes for Isometric, and 30 minutes for Sectional Views.',
    ],
    recommendedResources: [
      { title: 'NPTEL Engineering Graphics & Drawing Lecture Series', url: 'https://nptel.ac.in', platform: 'NPTEL', free: true },
      { title: 'Virtual Labs Mechanical Machine Drawing Simulators', url: 'https://www.vlab.co.in/', platform: 'Virtual Labs', free: true },
    ],
    furtherSupport: 'Spend extra hours in your college drawing hall utilizing drafting tables with guidance from lab instructors.',
  },
  // Undergraduate Students
  {
    id: 'diff-ug-backlogs',
    stage: 'Undergraduate (UG)',
    topic: 'University Semester Backlog Preparation & Systematic Clearance',
    description: 'Carrying standing academic arrears (backlogs) causes severe anxiety, risks university maximum duration limits, and disqualifies students from campus recruitment drives.',
    commonCauses: [
      'Overconfidence before university examinations leading to last-minute cramming',
      'Skipping internal continuous assessment (CIA) tests, losing easy internal marks',
      'Poor examination presentation: disorganized answers, missing circuit diagrams, or lack of structured headings',
    ],
    practicalSolutions: [
      'Backlog Audit & Triage: List every arrear subject by semester, marks needed, and prerequisite connections. Clear earlier semester fundamental papers first.',
      'The "Rule of 5 Question Papers": Collect the last 5 semester university question papers from Anna University / State University COE archives; 70% of concepts reoccur.',
      'Answer Sheet Formatting Architecture: Structure long answers with Introduction, Circuit/Block Diagram, Principle of Operation, Derivation/Code, Advantages & Disadvantages, and Applications.',
    ],
    stepByStepGuidance: [
      'Step 1: Obtain the official university syllabus regulation document (e.g., Anna Univ R2021 / R2017).',
      'Step 2: Identify the 3 easiest units in the subject syllabus and master them to 100% completion first.',
      'Step 3: Prepare 10-page concise formula and diagram summary sheets for rapid morning revision.',
      'Step 4: Register formally for supplementary/arrear examinations within the announced COE deadline.',
    ],
    recommendedResources: [
      { title: 'NPTEL Semester Course Lectures for Engineering Arrears', url: 'https://nptel.ac.in', platform: 'NPTEL', free: true },
      { title: 'National Digital Library of India University Subject Archives', url: 'https://ndl.iitkgp.ac.in', platform: 'NDLI', free: true },
    ],
    furtherSupport: 'Contact your faculty academic advisor (class tutor) to plan manageable exam registration loads per semester.',
  },
  {
    id: 'diff-ug-project-work',
    stage: 'Undergraduate (UG)',
    topic: 'Final-Year Capstone Project & Technical Documentation',
    description: 'Students struggle to identify viable project problem statements, implement working prototypes, and compile formal IEEE-compliant project reports.',
    commonCauses: [
      'Choosing overly ambitious research topics without available laboratory hardware or data',
      'Waiting until the final semester month to start coding or circuit fabrication',
      'Copying unverified online projects resulting in plagiarism penalties during viva voce',
    ],
    practicalSolutions: [
      'Pick Local, Real-World Problem Statements: Address agricultural monitoring, energy efficiency, waste sorting, or college automation.',
      'Agile Milestone Breakdown: Week 1-4 Literature survey; Week 5-8 System Architecture & Module 1; Week 9-12 Prototype & Testing; Week 13-16 Report Compilation & Viva rehearsal.',
      'Maintain an Engineering Logbook: Date every test run, circuit schematic revision, and bug resolution with faculty guide signatures.',
    ],
    stepByStepGuidance: [
      'Step 1: Search NDLI or IEEE open repositories for existing literature in your domain.',
      'Step 2: Define Scope, Hardware/Software Requirements, and System Architecture block diagrams.',
      'Step 3: Format the project documentation according to your university formal guidelines (Times New Roman, 1.5 spacing, Harvard/IEEE citations).',
      'Step 4: Run a plagiarism pre-check through your university approved software cell.',
    ],
    recommendedResources: [
      { title: 'AICTE Recommended Open Source Technical Toolkits', url: 'https://free.aicte-india.org/', platform: 'AICTE ELIS', free: true },
      { title: 'Spoken Tutorial Open Source Implementation Modules', url: 'https://spoken-tutorial.org', platform: 'IIT Bombay', free: true },
    ],
    furtherSupport: 'Schedule weekly progress review meetings with your designated faculty internal project guide.',
  },
  // Postgraduate & Research Scholars
  {
    id: 'diff-pg-literature-review',
    stage: 'Postgraduate (PG)',
    topic: 'Conducting Systematic Literature Reviews & Research Gap Discovery',
    description: 'PG students and doctoral scholars struggle to synthesize hundreds of papers into a coherent thematic literature review that highlights a genuine research novelty gap.',
    commonCauses: [
      'Reading papers sequentially without structured thematic categorization',
      'Summarizing individual papers one by one like book reports rather than critically synthesizing trends',
      'Relying on predatory or non-peer-reviewed journals found on random search engines',
    ],
    practicalSolutions: [
      'Literature Synthesis Matrix: Create a spreadsheet with columns: Author & Year, Problem Studied, Methodology/Algorithm, Dataset Used, Key Results, Limitations / Research Gap.',
      'Use Open Reference Managers: Organize your library with Zotero or Mendeley for automatic citation formatting and PDF annotation sync.',
      'Search Peer-Reviewed Academic Repositories: Restrict searches to Scopus, Web of Science, Google Scholar, PubMed, and Shodhganga.',
    ],
    stepByStepGuidance: [
      'Step 1: Access Shodhganga (shodhganga.inflibnet.ac.in) to examine recently accepted Ph.D. dissertations in your exact topic from Indian universities.',
      'Step 2: Read 5 seminal review papers published in top Q1/Q2 journals to understand research trajectory over the past decade.',
      'Step 3: Formulate a clear Problem Statement and identify 3 measurable research questions.',
      'Step 4: Write the Literature Review organized by themes and methodologies, not by chronological author names.',
    ],
    recommendedResources: [
      { title: 'Shodhganga National Repository of Indian ETDs', url: 'https://shodhganga.inflibnet.ac.in', platform: 'INFLIBNET / UGC', free: true },
      { title: 'UGC e-PG Pathshala Research Methodology Modules', url: 'https://epgp.inflibnet.ac.in', platform: 'UGC', free: true },
      { title: 'NPTEL Course on Introduction to Research Methodology', url: 'https://nptel.ac.in', platform: 'NPTEL (IIT Madras)', free: true },
    ],
    furtherSupport: 'Participate in research scholar colloquiums organized by your university Departmental Research Committee (DRC).',
  },
  {
    id: 'diff-pg-thesis-formatting',
    stage: 'PhD & Research',
    topic: 'Doctoral Thesis Formatting, Plagiarism Ceilings (UGC Norms) & Submission',
    description: 'Research scholars face delays during final thesis submission due to improper bibliography styling, formatting mismatches, and exceeding UGC similarity index limits.',
    commonCauses: [
      'Unintentional plagiarism caused by copying background text without proper paraphrasing and quotation',
      'Using manual word processing formatting that breaks table numbers, equation alignment, and figure captions',
      'Unfamiliarity with UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations 2018',
    ],
    practicalSolutions: [
      'Master LaTeX for Thesis Typesetting: Use standardized university LaTeX thesis templates for automatic bibliography, chapter cross-referencing, and mathematical typography.',
      'Understand UGC Plagiarism Levels: Level 0 (similarities up to 10% - no penalty); Level 1 (10% to 40% - revise and resubmit within 6 months); Level 2 (40% to 60% - debarred from submission for 1 year); Level 3 (above 60% - cancellation of registration).',
      'Paraphrase and Cite Original Sources: Always express concepts in your own academic prose and cite the primary source immediately.',
    ],
    stepByStepGuidance: [
      'Step 1: Adopt your university official thesis template from the Centre for Research (CFR).',
      'Step 2: Run institutional Turnitin / Urkund similarity check through your university library official supervisor account.',
      'Step 3: Exclude generic phrases, mathematical formulas, and the bibliography from the similarity filter as permitted under UGC norms.',
      'Step 4: Prepare the mandatory Synopsis, publication reprints, and Supervisor Plagiarism Compliance Certificate before final defense submission.',
    ],
    recommendedResources: [
      { title: 'UGC Academic Integrity & Plagiarism Regulations 2018', url: 'https://ugc.gov.in', platform: 'UGC Official', free: true },
      { title: 'Spoken Tutorial Complete LaTeX Typesetting Modules', url: 'https://spoken-tutorial.org', platform: 'IIT Bombay', free: true },
    ],
    furtherSupport: 'Consult your university Chief Librarian or Dean of Research regarding institutional similarity clearance protocols.',
  },
];

// ---------------------------------------------------------------------------
// 3. SUBJECT-WISE LEARNING DIRECTORY
// ---------------------------------------------------------------------------
export const SUBJECT_DIRECTORY: SubjectDirectoryItem[] = [
  // Class 10
  {
    id: 'subj-10-maths',
    stage: 'Class 10 (SSLC)',
    name: 'Mathematics',
    code: 'SSLC-MATH',
    description: 'Covers Relations and Functions, Numbers and Sequences, Algebra, Geometry, Coordinate Geometry, Trigonometry, Mensuration, and Statistics & Probability.',
    learningObjectives: [
      'Master quadratic equations, matrices, and linear equations in two variables',
      'Understand Thales theorem, angle bisector theorem, and Pythagoras theorem proofs',
      'Calculate surface areas and volumes of combined 3D solids (frustums, cones, spheres)',
      'Calculate mean, variance, standard deviation and compound probability',
    ],
    syllabusAuthority: 'Tamil Nadu State Board & CBSE',
    officialSyllabusUrl: 'https://scert.tnschools.gov.in',
    freeCoursePlatforms: [
      { title: 'DIKSHA Class 10 Mathematics QR Modules', platform: 'DIKSHA', url: 'https://diksha.gov.in' },
      { title: 'Kalvi Tholaikkaatchi Chapter Video Sessions', platform: 'TN Schools', url: 'https://tnschools.gov.in' },
    ],
    textbookResources: [
      { title: 'TN Samacheer Kalvi Class 10 Mathematics', publisher: 'TN Textbook Corporation', url: 'https://scert.tnschools.gov.in' },
      { title: 'NCERT Class 10 Mathematics Textbook', publisher: 'NCERT', url: 'https://ncert.nic.in/' },
    ],
    practiceTools: [
      { title: 'NCERT Exemplar Class 10 Math Problems', description: 'Advanced conceptual problems with solution methodologies', url: 'https://ncert.nic.in/' },
    ],
  },
  {
    id: 'subj-10-science',
    stage: 'Class 10 (SSLC)',
    name: 'Science',
    code: 'SSLC-SCI',
    description: 'Comprehensive curriculum spanning Physics (Laws of Motion, Optics, Thermal, Electricity), Chemistry (Solutions, Chemical Reactions, Carbon Compounds), and Biology (Plant Anatomy, Genetics, Ecology).',
    learningObjectives: [
      'Understand Newton laws of motion, gravitation, and optics refraction through lenses',
      'Learn chemical bonding, pH scale, metallurgy, and modern periodic table',
      'Explore cell division, human nervous system, genetics (Mendelian ratios), and environment',
    ],
    syllabusAuthority: 'TN SCERT & NCERT',
    officialSyllabusUrl: 'https://scert.tnschools.gov.in',
    freeCoursePlatforms: [
      { title: 'DIKSHA Science Interactive Labs & Experiments', platform: 'DIKSHA', url: 'https://diksha.gov.in' },
      { title: 'Virtual Labs Physical & Chemical Science Simulator', platform: 'Virtual Labs', url: 'https://www.vlab.co.in/' },
    ],
    textbookResources: [
      { title: 'TN Samacheer Kalvi Class 10 Science (English & Tamil)', publisher: 'TN Textbook Corp', url: 'https://scert.tnschools.gov.in' },
      { title: 'NCERT Science Class X Book', publisher: 'NCERT', url: 'https://ncert.nic.in/' },
    ],
    practiceTools: [
      { title: 'SCERT Model Question Paper with Scoring Key', description: 'Official blueprint and answer breakdown', url: 'https://scert.tnschools.gov.in' },
    ],
  },
  // Class 11-12
  {
    id: 'subj-12-physics',
    stage: 'Class 11 & 12 (HSC)',
    stream: 'Science Stream',
    name: 'Physics',
    code: 'HSC-PHY',
    description: 'Core higher secondary physics including Electrostatics, Current Electricity, Magnetism, Electromagnetic Induction, Wave Optics, Dual Nature of Radiation, and Semiconductor Electronics.',
    learningObjectives: [
      'Derive electric field due to dipole, Biot-Savart law, Ampere circuital law',
      'Analyze AC circuits with LCR combinations and resonance conditions',
      'Understand wave theory of light, Young double slit interference, and diffraction',
      'Master p-n junction diodes, transistors, logic gates, and communications systems',
    ],
    syllabusAuthority: 'Tamil Nadu SCERT & CBSE/NCERT',
    officialSyllabusUrl: 'https://scert.tnschools.gov.in',
    freeCoursePlatforms: [
      { title: 'SWAYAM Higher Secondary Physics Course', platform: 'SWAYAM (NCERT)', url: 'https://swayam.gov.in' },
      { title: 'ePathshala Video Lecture Demonstration Series', platform: 'CIET / NCERT', url: 'https://epathshala.ncert.gov.in/' },
    ],
    textbookResources: [
      { title: 'Class 12 Physics Volume 1 & 2 (Tamil & English)', publisher: 'TN Textbook Corp', url: 'https://scert.tnschools.gov.in' },
      { title: 'NCERT Class XII Physics Part I & II', publisher: 'NCERT', url: 'https://ncert.nic.in/' },
    ],
    practiceTools: [
      { title: 'Virtual Labs Physics Simulation Platform', description: 'Ohm Law, Meter Bridge, Potentiometer simulations', url: 'https://www.vlab.co.in/' },
    ],
  },
  {
    id: 'subj-12-chemistry',
    stage: 'Class 11 & 12 (HSC)',
    stream: 'Science Stream',
    name: 'Chemistry',
    code: 'HSC-CHE',
    description: 'Physical Chemistry (Electrochemistry, Kinetics, Solid State), Inorganic (Coordination Compounds, p-block, d and f-block), and Organic (Haloalkanes, Alcohols, Carbonyls, Biomolecules).',
    learningObjectives: [
      'Calculate Nernst equation cell potentials, Arrhenius activation energies, and rate laws',
      'Understand crystal field theory and IUPAC nomenclature of coordination compounds',
      'Master named organic reactions (Aldol, Cannizzaro, Reimer-Tiemann, Kolbe) and mechanisms',
    ],
    syllabusAuthority: 'TN SCERT & NCERT',
    officialSyllabusUrl: 'https://scert.tnschools.gov.in',
    freeCoursePlatforms: [
      { title: 'SWAYAM Class 12 Chemistry by NCERT Faculty', platform: 'SWAYAM', url: 'https://swayam.gov.in' },
      { title: 'DIKSHA Chemistry Reaction Mechanisms', platform: 'DIKSHA', url: 'https://diksha.gov.in' },
    ],
    textbookResources: [
      { title: 'Class 12 Chemistry Vol 1 & 2', publisher: 'TN SCERT', url: 'https://scert.tnschools.gov.in' },
    ],
    practiceTools: [
      { title: 'NCERT Exemplar Class 12 Chemistry', description: 'Challenging organic synthesis and numerical problems', url: 'https://ncert.nic.in/' },
    ],
  },
  {
    id: 'subj-12-commerce',
    stage: 'Class 11 & 12 (HSC)',
    stream: 'Commerce Stream',
    name: 'Accountancy & Commerce',
    code: 'HSC-ACC',
    description: 'Partnership Accounts (Admission, Retirement, Dissolution), Company Accounts (Share Capital, Debentures), Financial Statement Analysis, Financial Markets, and Consumer Protection.',
    learningObjectives: [
      'Prepare Revaluation Accounts, Capital Accounts and Balance Sheets of reconstructed firms',
      'Journalize forfeiture and reissue of equity shares and redemption of debentures',
      'Perform Cash Flow Statement analysis and Ratio Analysis according to accounting standards',
    ],
    syllabusAuthority: 'TN SCERT & CBSE',
    officialSyllabusUrl: 'https://scert.tnschools.gov.in',
    freeCoursePlatforms: [
      { title: 'SWAYAM Class 12 Accountancy Interactive Series', platform: 'SWAYAM', url: 'https://swayam.gov.in' },
    ],
    textbookResources: [
      { title: 'TN State Board Class 12 Accountancy & Commerce', publisher: 'TN Textbook Corp', url: 'https://scert.tnschools.gov.in' },
    ],
    practiceTools: [
      { title: 'Model Balance Sheet Solved Practice Sets', description: 'Complete ledger and journal balance examples', url: 'https://scert.tnschools.gov.in' },
    ],
  },
  // Diploma
  {
    id: 'subj-dip-eng-mech',
    stage: 'Diploma & Polytechnic',
    stream: 'Engineering Diploma',
    name: 'Mechanical Engineering Core (Thermodynamics & Strength of Materials)',
    code: 'DOTE-MECH',
    description: 'Applied thermal engineering, gas laws, steam cycles, stress-strain analysis, shear force and bending moment diagrams, torsion of shafts, and fluid mechanics.',
    learningObjectives: [
      'Apply First and Second Laws of Thermodynamics to open and closed systems',
      'Draw Shear Force (SFD) and Bending Moment Diagrams (BMD) for cantilever and simply supported beams',
      'Calculate stresses in thin cylinders and torsional power transmission through solid and hollow shafts',
    ],
    syllabusAuthority: 'Directorate of Technical Education (DOTE), Tamil Nadu',
    officialSyllabusUrl: 'https://dte.tn.gov.in',
    freeCoursePlatforms: [
      { title: 'NPTEL Basic Thermodynamics Video Lectures', platform: 'NPTEL (IIT Kharagpur)', url: 'https://nptel.ac.in' },
      { title: 'Virtual Labs Strength of Materials & Fluid Mechanics', platform: 'Virtual Labs', url: 'https://www.vlab.co.in/' },
    ],
    textbookResources: [
      { title: 'DOTE E-Learning Mechanical Textbooks & Lab Manuals', publisher: 'DOTE TN', url: 'https://dte.tn.gov.in' },
    ],
    practiceTools: [
      { title: 'Virtual Beam Stress Calculator & Simulation', description: 'Interactive SFD and BMD simulation', url: 'https://www.vlab.co.in/' },
    ],
  },
  // Undergraduate Engineering
  {
    id: 'subj-ug-dsa',
    stage: 'Undergraduate (UG)',
    stream: 'Computer Science & Engineering',
    name: 'Data Structures & Algorithms (DSA)',
    code: 'CS-DSA',
    description: 'Foundational computer science subject: Stacks, Queues, Linked Lists, Binary Search Trees, AVL Trees, Heaps, Graph traversals (BFS/DFS), Shortest Path (Dijkstra), Sorting, and Dynamic Programming.',
    learningObjectives: [
      'Analyze asymptotic time and space complexities using Big-O, Big-Omega, and Big-Theta notation',
      'Implement linear and non-linear data structures in C++ / Java / Python with pointer safety',
      'Solve algorithmic problems using Divide and Conquer, Greedy algorithms, and Dynamic Programming',
    ],
    syllabusAuthority: 'Anna University (R2021) & AICTE Model Curriculum',
    officialSyllabusUrl: 'https://annauniv.edu',
    freeCoursePlatforms: [
      { title: 'NPTEL Data Structures and Algorithms by IIT Madras', platform: 'NPTEL', url: 'https://nptel.ac.in' },
      { title: 'Spoken Tutorial C++ and Advanced Data Structures', platform: 'IIT Bombay', url: 'https://spoken-tutorial.org' },
    ],
    textbookResources: [
      { title: 'Introduction to Algorithms (CLRS Open Notes)', publisher: 'MIT OpenCourseWare / NDLI', url: 'https://ndl.iitkgp.ac.in' },
    ],
    practiceTools: [
      { title: 'Virtual Labs Data Structures Simulation Environment', description: 'Live interactive tree and graph traversal visualizer', url: 'https://www.vlab.co.in/' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. EXAMINATION PREPARATION SUPPORT GUIDES
// ---------------------------------------------------------------------------
export const EXAM_PREPARATION_GUIDES: ExamPreparationGuide[] = [
  {
    id: 'exam-prep-sslc-10',
    stage: 'Class 10 (SSLC)',
    examName: 'Tamil Nadu Class 10 SSLC Public Board Examination',
    conductingBody: 'Directorate of Government Examinations (DGE), Tamil Nadu',
    frequency: 'Annual (March - April)',
    examPattern: '500 Total Marks (5 Subjects x 100 Marks: Tamil, English, Mathematics, Science, Social Science). Minimum 35% pass mark required per subject.',
    officialSyllabusSummary: [
      'Complete Samacheer Kalvi textbook syllabus across all 5 subjects',
      'Science comprises 75 Marks Theory + 25 Marks Practical assessment',
      'Mathematics features 1-mark objective, 2-mark short, 5-mark detailed, and 8-mark geometry/graph questions',
    ],
    studyPlanRoadmap: [
      { phase: 'Phase 1: Syllabus Completion', duration: 'September - December', focus: 'Finish 100% textbook readings, chapter back-exercises, and teacher corrections.' },
      { phase: 'Phase 2: Revision & Unit Tests', duration: 'January', focus: 'Solve school revision tests, memorize formulas, and polish science diagrams.' },
      { phase: 'Phase 3: Model Examinations', duration: 'February', focus: 'Simulate full 3-hour past board papers under strict timed examination hall conditions.' },
      { phase: 'Phase 4: Final Polish', duration: 'March', focus: 'Quick formula review, good sleep, healthy diet, and confidence building.' },
    ],
    subjectPreparationTips: [
      'Mathematics: Practice graph and geometry construction problems daily; they offer guaranteed 16 marks.',
      'Science: Write definitions of laws (Ohm law, Fleming left hand rule) verbatim with correct SI units.',
      'Social Science: Master history timelines and map pointing (India & Tamil Nadu maps guarantee 10 easy marks).',
      'Languages (Tamil & English): Practice letter writing, essay structures, and grammar rules regularly.',
    ],
    officialPortalUrl: 'https://dge.tn.gov.in/',
    modelPapersAvailable: true,
    modelPapersUrl: 'https://scert.tnschools.gov.in',
    revisionStrategy: [
      'Never study new topics on the evening before an examination.',
      'Use the first 15 minutes reading time to choose optional questions calmly.',
      'Allocate time strictly: 1 mark per minute; leave 20 minutes at the end to check question numbers.',
    ],
  },
  {
    id: 'exam-prep-hsc-12',
    stage: 'Class 11 & 12 (HSC)',
    examName: 'Tamil Nadu Class 12 Higher Secondary Certificate (HSC) Board Exam',
    conductingBody: 'Directorate of Government Examinations (DGE), Tamil Nadu',
    frequency: 'Annual (March)',
    examPattern: '600 Total Marks (6 Subjects x 100 Marks). Science subjects carry 70 Marks Theory + 20 Marks Practical + 10 Marks Internal.',
    officialSyllabusSummary: [
      'Full Class 12 SCERT syllabus in chosen group (PCMB, Computer Science, Commerce, Arts)',
      'Crucial cut-off marks calculated for engineering (TNEA /200) and agriculture (TNAU /200)',
    ],
    studyPlanRoadmap: [
      { phase: 'Foundational Mastery', duration: 'June - November', focus: 'Comprehensive chapter conceptual understanding and laboratory practical completion.' },
      { phase: 'Revision Tests 1 & 2', duration: 'December - January', focus: 'Subjective derivation writing and comprehensive numerical solving.' },
      { phase: 'Statewide Model Exams', duration: 'February', focus: 'DGE Statewide model papers and presentation polish.' },
    ],
    subjectPreparationTips: [
      'Physics: Memorize standard 5-mark derivations; write with labelled diagrams and final units.',
      'Chemistry: Categorize Organic mechanisms by reagents; Inorganic reactions by oxidation state trends.',
      'Biology: Label all biological parts with straight parallel ruler lines on the right side.',
      'Commerce/Accountancy: Maintain spotless ledger balance sheets with neat currency formatting.',
    ],
    officialPortalUrl: 'https://dge.tn.gov.in/',
    modelPapersAvailable: true,
    modelPapersUrl: 'https://scert.tnschools.gov.in',
    revisionStrategy: [
      'Review your personal formula diary every morning for 30 minutes.',
      'Solve at least 3 previous board papers per subject with stop-clock timing.',
    ],
  },
  {
    id: 'exam-prep-anna-univ-sem',
    stage: 'Undergraduate (UG)',
    examName: 'Anna University End-Semester University Examinations',
    conductingBody: 'Office of the Controller of Examinations (COE), Anna University Chennai',
    frequency: 'Bi-annual (Nov/Dec Odd Semester & April/May Even Semester)',
    examPattern: '100 Marks per theory paper: Part A (10 x 2 Marks = 20 Marks, compulsory) + Part B (5 x 13 Marks = 65 Marks, either/or choice) + Part C (1 x 15 Marks = 15 Marks application-oriented question).',
    officialSyllabusSummary: [
      '5 distinct syllabus units per course regulation (R2021 / R2017)',
      'Strict adherence to Bloom Taxonomy levels (Remembering, Understanding, Applying, Analyzing)',
    ],
    studyPlanRoadmap: [
      { phase: 'Continuous Assessment 1', duration: 'Week 1 - 6', focus: 'Unit 1 & 2 conceptual depth and internal test scoring.' },
      { phase: 'Continuous Assessment 2', duration: 'Week 7 - 12', focus: 'Unit 3 & 4 mastery and lab exam readiness.' },
      { phase: 'End Semester Blitz', duration: 'Week 13 - 16', focus: 'Past 5-year question paper patterns and Part A quick revision notes.' },
    ],
    subjectPreparationTips: [
      'Part A (2-mark questions): Answer in 3-4 concise lines with a formula, definition, or key bullet points.',
      'Part B (13-mark questions): Start with a clear architecture or circuit block diagram; use neat headings and bullet points.',
      'Part C (15-mark questions): Present a real-world case study or step-by-step problem solution showing your engineering methodology.',
    ],
    officialPortalUrl: 'https://coe1.annauniv.edu/',
    modelPapersAvailable: true,
    modelPapersUrl: 'https://annauniv.edu',
    revisionStrategy: [
      'Review previous question papers from Anna University COE repository.',
      'Prepare 2-page summary notes for each of the 5 units to review on exam morning.',
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. STUDY SKILLS & ACADEMIC PRODUCTIVITY
// ---------------------------------------------------------------------------
export const STUDY_SKILLS_GUIDES: StudySkillGuide[] = [
  {
    id: 'skill-timetable',
    title: 'How to Build a Sustainable, Realistic Daily Study Timetable',
    category: 'Time Management',
    summary: 'Most students fail with timetables because they make them unrealistically rigid. Learn how to design a flexible block-schedule that accounts for energy levels, college commutes, and buffer rest hours.',
    stepByStepProtocol: [
      'Step 1: Audit Your Fixed Hours: List hours dedicated to college classes, travel, meals, sleep (7-8 hours), and family chores.',
      'Step 2: Identify High-Focus Windows: Determine whether your peak mental energy is early morning (5 AM - 7 AM) or late evening (7 PM - 10 PM). Place your toughest subject (Maths, Physics, Coding) in this prime window.',
      'Step 3: Schedule 50-10 Pomodoro Study Blocks: Study intensely without phone distractions for 50 minutes, then take a genuine 10-minute mental break away from screens.',
      'Step 4: Build a "Buffer Hour" into Weekends: Leave Sunday evening open to catch up on missed sessions instead of feeling defeated when an unexpected delay happens.',
    ],
    actionableExamples: [
      'School Student Routine: 6:00-7:00 AM (Formula practice); 4:30-5:30 PM (Homework & assignments); 6:00-7:30 PM (Science concepts); 8:30-9:30 PM (Language reading & revision).',
      'Engineering Student Routine: 6:00-7:30 PM (Technical unit study); 8:00-9:30 PM (Coding practice / numerical problem solving); 10:00-10:45 PM (Record notebook completion).',
    ],
    commonMistakesToAvoid: [
      'Scheduling 8 continuous hours of study without breaks, which guarantees cognitive exhaustion by day 3.',
      'Never scheduling sleep: Sacrificing sleep destroys memory consolidation in the brain hippocampus.',
    ],
    recommendedTools: [
      { name: 'Spoken Tutorial Time Management Course', url: 'https://spoken-tutorial.org', note: 'Free self-paced personal development modules' },
    ],
  },
  {
    id: 'skill-active-recall-spaced-repetition',
    title: 'Active Recall & Spaced Repetition: How to Remember Difficult Lessons',
    category: 'Memory & Retention',
    summary: 'Rereading a textbook highlights the illusion of competence. Active recall forces the brain to retrieve information, building robust long-term neural pathways.',
    stepByStepProtocol: [
      'Step 1: The Blurting Method: Read a textbook section for 15 minutes. Close the book and write down everything you remember on a blank paper without checking.',
      'Step 2: Gap Verification: Open the textbook with a red pen and circle what you forgot or misremembered. Re-read only those specific points.',
      'Step 3: Space Your Reviews (Ebbinghaus Forgetting Curve): Review your summary notes at Day 1, Day 3, Day 7, Day 21, and Day 60.',
      'Step 4: Teach a Peer (Feynman Technique): Explain the concept in simple, jargon-free conversational words to a study partner or to yourself.',
    ],
    actionableExamples: [
      'Organic Chemistry: Write reaction names on front of flashcards; draw reagents and mechanism steps on the back.',
      'Anatomy / Biology: Keep a diagram with blank callout boxes and practice filling in the labels from memory.',
    ],
    commonMistakesToAvoid: [
      'Highlighter Trap: Highlighting entire paragraphs with yellow markers creates zero memory retention.',
      'Cramming everything the night before: Memory rapidly degrades within 48 hours without spaced intervals.',
    ],
    recommendedTools: [
      { name: 'SWAYAM Cognitive Learning & Memory Strategies', url: 'https://swayam.gov.in', note: 'Evidence-based cognitive science lectures' },
    ],
  },
  {
    id: 'skill-cornell-notetaking',
    title: 'The Cornell Note-Taking System for Lectures & Textbooks',
    category: 'Study Techniques',
    summary: 'A proven, organized note-taking structure that condenses lecture material into self-testing study sheets without tedious rewriting.',
    stepByStepProtocol: [
      'Step 1: Divide your notebook page into 3 sections: A 2.5-inch Cue column on the left, a 6-inch Notes column on the right, and a 2-inch Summary area at the bottom.',
      'Step 2: Take notes in the right-hand column during class: Use abbreviations, bullet points, and sketches.',
      'Step 3: After class (within 24 hours), fill in the left Cue column with keywords, formulas, and test questions.',
      'Step 4: Cover the Notes column with a paper sheet, look only at the Cue questions, and test your ability to explain the content.',
      'Step 5: Write a concise 2-sentence summary in the bottom box capturing the big idea.',
    ],
    actionableExamples: [
      'History Lesson: Cue column: "Year of Dandi March?", "Primary objective?", "Significance?". Notes column: "12 March 1930, Sabarmati to Dandi, breaking salt monopoly...".',
      'Computer Science: Cue column: "Worst-case QuickSort?", "Pivot choice?". Notes column: "O(n^2) when already sorted...".',
    ],
    commonMistakesToAvoid: [
      'Transcribing every single word the teacher speaks like a court stenographer.',
      'Filing notes away in a binder and never looking at them until exam week.',
    ],
    recommendedTools: [
      { name: 'National Digital Library Learning Skills Archive', url: 'https://ndl.iitkgp.ac.in', note: 'Academic writing and note-taking resources' },
    ],
  },
];

// ---------------------------------------------------------------------------
// 6. REMEDIAL LEARNING SUPPORT
// ---------------------------------------------------------------------------
export const REMEDIAL_LEARNING_TRACKS: RemedialLearningTrack[] = [
  {
    id: 'remedial-math-foundations',
    domain: 'Foundational Mathematics & Arithmetic',
    targetStage: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)', 'Diploma & Polytechnic'],
    foundationalConcepts: [
      'Fractions, Decimals, and Percentages',
      'Rules of Signs (- and + operations in multiplication & division)',
      'Algebraic Expansion (a+b)^2, (a-b)^2, factoring quadratics',
      'Basic Trigonometric Ratios (sin, cos, tan on right-angled triangles)',
      'Linear equations in one and two variables',
    ],
    learningRoadmap: [
      { stage: 'Stage 1: Arithmetic Fluency', topics: ['BODMAS rule', 'LCM and HCF', 'Fractions & powers'], milestone: 'Solve 20 algebraic expressions with 100% accuracy.' },
      { stage: 'Stage 2: Algebraic Operations', topics: ['Linear equations', 'Simultaneous equations', 'Quadratic formula'], milestone: 'Factorize 15 quadratic polynomials without errors.' },
      { stage: 'Stage 3: Geometry & Trigonometry', topics: ['Pythagoras theorem', 'Trigonometric tables (0, 30, 45, 60, 90)', 'Area & volume formulas'], milestone: 'Calculate heights and distances and solve basic coordinate geometry.' },
    ],
    beginnerCourses: [
      { title: 'DIKSHA Foundational Mathematics Modules', platform: 'DIKSHA', url: 'https://diksha.gov.in', free: true },
      { title: 'NPTEL Bridge Course in Mathematics for Engineers', platform: 'NPTEL', url: 'https://nptel.ac.in', free: true },
    ],
    practiceMaterials: [
      { title: 'NCERT Class 8 & 9 Mathematics Workbooks', type: 'PDF Textbook', url: 'https://ncert.nic.in/' },
      { title: 'TN SCERT Remedial Worksheets in Mathematics', type: 'Worksheet', url: 'https://scert.tnschools.gov.in' },
    ],
    progressionPathToAdvanced: 'Once foundational mastery is achieved, progress directly to Class 10/11 Board Mathematics or Polytechnic Engineering Mathematics M-I.',
  },
  {
    id: 'remedial-english-communication',
    domain: 'English Grammar & Reading Comprehension',
    targetStage: ['Class 10 (SSLC)', 'Class 11 & 12 (HSC)', 'Diploma & Polytechnic', 'Undergraduate (UG)'],
    foundationalConcepts: [
      'Parts of Speech (Nouns, Verbs, Adjectives, Adverbs, Prepositions)',
      'The 12 English Tenses and Subject-Verb Agreement',
      'Sentence Structure (Simple, Compound, Complex)',
      'Active and Passive Voice',
      'Basic Academic Vocabulary (Cause & Effect, Comparison words)',
    ],
    learningRoadmap: [
      { stage: 'Stage 1: Grammar Foundations', topics: ['Tenses', 'Subject-verb agreement', 'Articles (a, an, the)'], milestone: 'Construct 20 grammatically error-free sentences.' },
      { stage: 'Stage 2: Reading & Comprehension', topics: ['Paragraph main ideas', 'Contextual vocabulary', 'Summarizing short texts'], milestone: 'Read a 500-word editorial and write a 50-word accurate summary.' },
      { stage: 'Stage 3: Written Expression', topics: ['Formal letters', 'Report writing', 'Email etiquette'], milestone: 'Write a complete formal permission letter to a college principal.' },
    ],
    beginnerCourses: [
      { title: 'SWAYAM Basic English Communication Course', platform: 'SWAYAM', url: 'https://swayam.gov.in', free: true },
      { title: 'Spoken Tutorial Basic English Learning Track', platform: 'IIT Bombay', url: 'https://spoken-tutorial.org', free: true },
    ],
    practiceMaterials: [
      { title: 'SCERT English Bridge Course Workbooks', type: 'Workbook', url: 'https://scert.tnschools.gov.in' },
    ],
    progressionPathToAdvanced: 'Transition into technical report writing, university seminar presentations, and campus interview preparation.',
  },
];

// ---------------------------------------------------------------------------
// 7. DIGITAL SKILLS & COMPUTER LEARNING
// ---------------------------------------------------------------------------
export const DIGITAL_SKILLS_TRACKS: DigitalSkillTrack[] = [
  {
    id: 'digi-office-docs',
    title: 'Document Preparation, Spreadsheets & Presentations (Office Suite)',
    proficiencyLevel: 'Beginner',
    relevance: 'Essential for students across all disciplines to submit academic assignments, calculate laboratory data, and deliver seminar slide presentations.',
    syllabusModules: [
      'Module 1: Document Processing: Text formatting, tables, page numbering, headers/footers, and exporting to standard PDF.',
      'Module 2: Spreadsheet Mastery: Cell referencing, formulas (SUM, AVERAGE, IF, VLOOKUP), data sorting, and creating bar/scatter charts.',
      'Module 3: Presentation Skills: Clean slide hierarchy, embedding diagrams, concise bullet points, and presenter view.',
      'Module 4: Cloud Collaboration: Google Docs/Sheets or LibreOffice file sharing and version history.',
    ],
    practicalExercises: [
      'Prepare a formal 5-page academic assignment with a formatted Title Page, Table of Contents, and References.',
      'Create a spreadsheet to calculate average marks, percentage, and grade for 30 students using formulas and conditional formatting.',
    ],
    recommendedFreeCourses: [
      { title: 'LibreOffice Writer, Calc & Impress Spoken Tutorials', platform: 'Spoken Tutorial (IIT Bombay)', url: 'https://spoken-tutorial.org' },
    ],
    careerRelevance: 'Mandatory core requirement for any administrative, corporate, laboratory, or research role.',
  },
  {
    id: 'digi-python-programming',
    title: 'Python Programming for Scientific & Academic Problem Solving',
    proficiencyLevel: 'Beginner',
    relevance: 'Python is the universal language for academic automation, data analysis, engineering simulations, and software development.',
    syllabusModules: [
      'Module 1: Python Fundamentals: Variables, Data Types (Lists, Tuples, Dictionaries), and Control Structures (if/else, for/while loops).',
      'Module 2: Functions & Modularity: Defining functions, arguments, return values, and importing standard math libraries.',
      'Module 3: File Handling & Data: Reading and writing text/CSV files, string manipulation, and error handling with try/except.',
      'Module 4: Scientific Computing Basics: Introduction to NumPy arrays and Matplotlib scientific plotting.',
    ],
    practicalExercises: [
      'Write a Python program to solve quadratic equations and plot the parabola curve using Matplotlib.',
      'Create a program that reads a student mark CSV file and outputs highest, lowest, and average score statistics.',
    ],
    recommendedFreeCourses: [
      { title: 'Python 3.4.3 Spoken Tutorial Series (Tamil & English)', platform: 'IIT Bombay', url: 'https://spoken-tutorial.org' },
      { title: 'NPTEL Joy of Computing using Python', platform: 'NPTEL (IIT Ropar)', url: 'https://nptel.ac.in' },
    ],
    careerRelevance: 'Foundation for data science, software engineering, AI/ML, and computational research across all engineering branches.',
  },
  {
    id: 'digi-cyber-safety',
    title: 'Cybersecurity Awareness, Digital Privacy & Online Safety',
    proficiencyLevel: 'Beginner',
    relevance: 'Protecting student identities, financial accounts, and academic credentials from phishing, malicious downloads, and online fraud.',
    syllabusModules: [
      'Module 1: Password Security: Creating strong passphrases and enabling Two-Factor Authentication (2FA) on student portals.',
      'Module 2: Identifying Phishing: Spotting fake scholarship links, fraudulent job offers, and suspicious SMS/WhatsApp messages.',
      'Module 3: Secure Browsing & Device Safety: Recognizing HTTPS locks, safe downloading, and keeping antivirus/OS updated.',
      'Module 4: Student Data Privacy: Protecting Aadhaar, bank details, and examination registration numbers from public exposure.',
    ],
    practicalExercises: [
      'Audit your primary student email account security settings and configure an authenticator app.',
      'Verify the authentic domain (.gov.in / .nic.in) of 5 scholarship and examination portals before entering personal data.',
    ],
    recommendedFreeCourses: [
      { title: 'Information Security Education and Awareness (ISEA) Modules', platform: 'C-DAC / MeitY', url: 'https://www.isea.gov.in' },
    ],
    careerRelevance: 'Essential life skill and mandatory compliance knowledge in all digital workplace environments.',
  },
];

// ---------------------------------------------------------------------------
// 8. ACCESSIBILITY & SPECIAL LEARNING SUPPORT
// ---------------------------------------------------------------------------
export const ACCESSIBILITY_SUPPORT_RESOURCES: AccessibilitySupportItem[] = [
  {
    id: 'access-visual',
    category: 'Visual Accommodation',
    title: 'Support for Blind and Low-Vision Students (RPwD Act 2016)',
    statutoryNorm: 'Rights of Persons with Disabilities Act (RPwD Act 2016) & UGC Guidelines for Accessible Higher Education',
    accommodationsOffered: [
      'Scribe / Reader / Lab Assistant permission during Board and University semester examinations',
      'Compensatory time of 20 minutes per hour of examination duration',
      'Alternative accessible questions in place of visual diagrams/charts in mathematics and science papers',
      'Permission to use screen-reading laptops / Braille notetakers in approved test centres',
    ],
    accessibleSoftwareTools: [
      { name: 'NVDA (NonVisual Desktop Access) Screen Reader', developer: 'NV Access', url: 'https://www.nvaccess.org', free: true },
      { name: 'Sugamya Pustakalaya Online Library for Persons with Print Disabilities', developer: 'DAISY Forum of India / Ministry of Social Justice', url: 'https://www.daisyindia.org/', free: true },
      { name: 'ePathshala Audiobooks and DAISY Textbooks', developer: 'NCERT', url: 'https://epathshala.ncert.gov.in/', free: true },
    ],
    officialUniversityCells: [
      { university: 'Anna University Chennai - Enabling Unit for PwD', contactEmail: 'equal_opportunity@annauniv.edu', portal: 'https://annauniv.edu' },
      { university: 'University of Madras - Special Education Cell', contactEmail: 'registrar@unom.ac.in', portal: 'https://unom.ac.in' },
    ],
    statutoryHelpline: 'National Divyangjan Helpline: 1800-11-2001 (Toll-Free)',
  },
  {
    id: 'access-hearing',
    category: 'Hearing & Speech',
    title: 'Support for Deaf, Hard of Hearing & Speech Impaired Students',
    statutoryNorm: 'UGC Guidelines on Facilities for Differently Abled Students & NEP 2020 Indian Sign Language (ISL) Integration',
    accommodationsOffered: [
      'Sign Language Interpreter during viva voce, college interviews, and project presentations',
      'Language exemption options in secondary education under State Board regulations',
      'Captioned and subtitled educational video lectures on government platforms',
      'Quiet, well-lit examination seating with clear written instructions from invigilators',
    ],
    accessibleSoftwareTools: [
      { name: 'Indian Sign Language (ISL) Dictionary & Video Portal', developer: 'ISLRTC (DEPwD)', url: 'https://islrtc.nic.in', free: true },
      { name: 'SWAYAM Subtitled Video Lectures (NPTEL)', developer: 'IIT Madras', url: 'https://nptel.ac.in', free: true },
    ],
    officialUniversityCells: [
      { university: 'Tamil Nadu Open University - School of Special Education', contactEmail: 'contact@tnou.ac.in', portal: 'https://tnou.ac.in' },
    ],
    statutoryHelpline: 'ISLRTC Helpline: 011-26387558',
  },
  {
    id: 'access-learning-cognitive',
    category: 'Learning & Cognitive',
    title: 'Support for Specific Learning Disabilities (Dyslexia, Dyscalculia, Dysgraphia)',
    statutoryNorm: 'CBSE & Tamil Nadu DGE Examination Bye-Laws for Candidates with Specific Learning Disabilities',
    accommodationsOffered: [
      'Exemption from third language study in school boards',
      'Calculator permission during examinations for students with diagnosed Dyscalculia',
      'Exemption from spelling and grammatical error penalties in descriptive answers if core meaning is clear',
      'Extra time allocation (20 minutes per hour) during all board and university assessments',
    ],
    accessibleSoftwareTools: [
      { name: 'OpenDyslexic Free Accessible Font', developer: 'Abbie Gonzalez', url: 'https://opendyslexic.org', free: true },
    ],
    officialUniversityCells: [
      { university: 'Madras Dyslexia Association (Recognized Guidance Partner)', contactEmail: 'ananya@mdaindia.com', portal: 'https://mdaindia.com' },
    ],
    statutoryHelpline: 'National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD) Chennai: 044-27472104',
  },
];

// ---------------------------------------------------------------------------
// 9. ASSIGNMENT, PROJECT & RESEARCH GUIDANCE
// ---------------------------------------------------------------------------
export const ASSIGNMENT_RESEARCH_GUIDES: AssignmentResearchGuide[] = [
  {
    id: 'guide-school-science-project',
    stage: 'Class 10 (SSLC)',
    title: 'School Science Projects & Practical Record Submission',
    type: 'Science Projects',
    stepByStepWorkflow: [
      'Step 1: Choose a testable scientific question (e.g., Comparing water filtration materials, Testing soil pH with natural cabbage indicator).',
      'Step 2: State your Hypothesis clearly (e.g., "Charcoal filters will remove more turbidity than sand alone").',
      'Step 3: Document Materials and Procedure with labelled photographs or sketches.',
      'Step 4: Record Observation Tables with multiple trials to ensure reliability.',
      'Step 5: Write the Conclusion linking directly back to your original hypothesis.',
    ],
    formattingStandards: [
      'Cover Page: School Name, Project Title, Student Name, Roll Number, Class & Section, Academic Year.',
      'Certificate of Authenticity signed by your Science Teacher and School Principal.',
      'Acknowledgements, Table of Contents, Main Content, Observations, Conclusion, Bibliography.',
    ],
    ethicsAndPlagiarismRules: [
      'Never copy someone else science fair model or buy ready-made market projects.',
      'Perform the actual experiment yourself; never fabricate numerical readings or fake trial results.',
    ],
    recommendedReferenceManagers: [
      { name: 'NCERT Science Project Guidelines', url: 'https://ncert.nic.in/', note: 'Official exhibition and project guidelines' },
    ],
    officialGuidelinesPdfUrl: 'https://ncert.nic.in/',
  },
  {
    id: 'guide-ug-mini-major-project',
    stage: 'Undergraduate (UG)',
    title: 'Undergraduate Mini & Final-Year Major Capstone Project Protocol',
    type: 'Capstone Final Project',
    stepByStepWorkflow: [
      'Step 1: Problem Definition & Literature Survey: Identify an unsolved local community problem or industrial workflow bottle-neck.',
      'Step 2: Feasibility Study: Confirm availability of sensors, open-source software, APIs, and laboratory machinery.',
      'Step 3: System Design & Architecture: Draw Data Flow Diagrams (DFD Level 0 & 1), ER diagrams, or circuit schematic layouts.',
      'Step 4: Implementation & Iterative Testing: Build modular code or hardware prototypes and record unit testing results.',
      'Step 5: Performance Evaluation: Measure throughput, accuracy, power efficiency, or error rate against standard baseline methods.',
      'Step 6: Report Compilation, Presentation Slides, and Viva-Voce Rehearsal.',
    ],
    formattingStandards: [
      'Format strictly adhering to Anna University / University Guidelines: A4 white paper, 1-inch margins (1.25 left for binding).',
      'Font: Times New Roman, 12 pt for body, 1.5 line spacing, 14 pt bold for chapter titles.',
      'Chapter Sequence: 1. Introduction, 2. Literature Review, 3. Proposed Methodology, 4. Results & Discussion, 5. Conclusion & Future Work, References.',
    ],
    ethicsAndPlagiarismRules: [
      'Strict Zero Tolerance for Commercial Project Centres: Do not purchase completed hardware or code.',
      'All third-party open source code libraries, datasets, and algorithms must be credited in the References chapter.',
      'Run an institutional similarity check; maintain similarity below 15-20% according to university guidelines.',
    ],
    recommendedReferenceManagers: [
      { name: 'Zotero Open Source Reference Manager', url: 'https://www.zotero.org', note: 'Free, automated bibliography and citation generator' },
      { name: 'Mendeley Reference Management', url: 'https://www.mendeley.com', note: 'PDF indexing and citation integration' },
    ],
    officialGuidelinesPdfUrl: 'https://annauniv.edu',
  },
  {
    id: 'guide-pg-dissertation-thesis',
    stage: 'PhD & Research',
    title: 'Postgraduate Dissertation & Ph.D. Doctoral Research Methodology',
    type: 'Thesis & Publication',
    stepByStepWorkflow: [
      'Step 1: Formulate a novel, defensible research question backed by comprehensive Scopus/Web of Science literature review.',
      'Step 2: Prepare and defend the Research Proposal / Synopsis before the Departmental Research Committee (DRC).',
      'Step 3: Execute rigorous experimental / empirical methodology with strict control variables and statistical significance tests (p-values, ANOVA).',
      'Step 4: Publish mandatory peer-reviewed research papers in UGC-CARE or Scopus indexed journals as required by university doctoral regulations.',
      'Step 5: Draft the comprehensive dissertation: Introduction, Literature Review, Theoretical Framework, Experimental Results, Comparative Analysis, Conclusion.',
      'Step 6: Submit to University Chief Supervisor for Turnitin similarity clearance and external examination adjudication.',
    ],
    formattingStandards: [
      'Follow CFR / University Thesis Manual: Title Page, Certificate of Supervisor, Declaration of Scholar, Abstract (500 words), Table of Contents, Nomenclature, Chapters, References, Appendices.',
      'Citations: IEEE (numbered) or APA 7th Edition (author-date) applied consistently throughout the document.',
      'High-resolution vector plots (300 DPI) for all figures with meaningful axis labels and metric units.',
    ],
    ethicsAndPlagiarismRules: [
      'Strict adherence to UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations 2018.',
      'Similarity Index must be <= 10% (excluding common terminology, formulas, and references).',
      'Maintain verifiable research notebooks, raw data records, and code repositories for institutional audits.',
    ],
    recommendedReferenceManagers: [
      { name: 'Zotero Reference Manager', url: 'https://www.zotero.org', note: 'Automated bibtex and word processing citation sync' },
      { name: 'Overleaf Collaborative LaTeX Platform', url: 'https://www.overleaf.com', note: 'Standard university LaTeX thesis template authoring' },
    ],
    officialGuidelinesPdfUrl: 'https://ugc.gov.in',
  },
];

// Helper Query Functions
export function getResourcesByCategory(category: ResourceCategory) {
  if (category === 'All Categories') return VERIFIED_LEARNING_RESOURCES;
  return VERIFIED_LEARNING_RESOURCES.filter((r) => r.category === category);
}

export function getResourcesByStage(stage: EducationStage) {
  if (stage === 'All Stages') return VERIFIED_LEARNING_RESOURCES;
  return VERIFIED_LEARNING_RESOURCES.filter((r) => r.applicableStages.includes(stage));
}

export function searchAcademicResources(query: string, stage?: EducationStage, category?: ResourceCategory) {
  const q = query.toLowerCase().trim();
  return VERIFIED_LEARNING_RESOURCES.filter((res) => {
    const matchesQuery =
      !q ||
      res.title.toLowerCase().includes(q) ||
      res.organisation.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.subjects.some((s) => s.toLowerCase().includes(q));

    const matchesStage = !stage || stage === 'All Stages' || res.applicableStages.includes(stage);
    const matchesCategory = !category || category === 'All Categories' || res.category === category;

    return matchesQuery && matchesStage && matchesCategory;
  });
}
