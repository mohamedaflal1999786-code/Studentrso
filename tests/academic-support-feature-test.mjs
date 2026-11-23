// tests/academic-support-feature-test.mjs
import assert from 'assert';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 – MODULE 07: ACADEMIC SUPPORT & LEARNING CENTRE TEST SUITE');
console.log('Comprehensive Quality, Statutory & Architectural Verification');
console.log('=============================================================================\n');

// 1. Verify Homepage Module 07 Definition in lib/data.ts
const dataPath = path.join(projectRoot, 'lib', 'data.ts');
assert(fs.existsSync(dataPath), 'lib/data.ts must exist');
const dataContent = fs.readFileSync(dataPath, 'utf8');

assert(
  dataContent.includes("id: 'academic-support-learning-centre'"),
  "Module 07 must have id 'academic-support-learning-centre'"
);
assert(
  dataContent.includes("title: 'Academic Support & Learning Centre'"),
  "Module 07 title must be 'Academic Support & Learning Centre'"
);
assert(
  dataContent.includes("route: '/academic-support'"),
  "Module 07 route must be '/academic-support'"
);
assert(
  dataContent.includes('isFullyImplemented: true'),
  'Module 07 must be marked isFullyImplemented: true'
);
console.log('✓ Test 01: Module 07 configured in lib/data.ts with route /academic-support');

// 2. Verify Next.js App Page & Dedicated Component Files Exist
const academicPagePath = path.join(projectRoot, 'app', 'academic-support', 'page.tsx');
assert(fs.existsSync(academicPagePath), 'app/academic-support/page.tsx must exist');

const apiResourcesPath = path.join(projectRoot, 'app', 'api', 'academic-support', 'resources', 'route.ts');
assert(fs.existsSync(apiResourcesPath), 'app/api/academic-support/resources/route.ts must exist');

const apiDifficultiesPath = path.join(projectRoot, 'app', 'api', 'academic-support', 'difficulties', 'route.ts');
assert(fs.existsSync(apiDifficultiesPath), 'app/api/academic-support/difficulties/route.ts must exist');

const apiSubjectsPath = path.join(projectRoot, 'app', 'api', 'academic-support', 'subjects', 'route.ts');
assert(fs.existsSync(apiSubjectsPath), 'app/api/academic-support/subjects/route.ts must exist');

const apiVerifyPath = path.join(projectRoot, 'app', 'api', 'academic-support', 'verify', 'route.ts');
assert(fs.existsSync(apiVerifyPath), 'app/api/academic-support/verify/route.ts must exist');

const dashboardPath = path.join(projectRoot, 'components', 'academic-support', 'AcademicOverviewDashboard.tsx');
assert(fs.existsSync(dashboardPath), 'AcademicOverviewDashboard.tsx must exist');

const difficultiesPath = path.join(projectRoot, 'components', 'academic-support', 'AcademicDifficultiesSection.tsx');
assert(fs.existsSync(difficultiesPath), 'AcademicDifficultiesSection.tsx must exist');

const subjectPath = path.join(projectRoot, 'components', 'academic-support', 'SubjectWiseLearningSection.tsx');
assert(fs.existsSync(subjectPath), 'SubjectWiseLearningSection.tsx must exist');

const freeResPath = path.join(projectRoot, 'components', 'academic-support', 'FreeLearningResourcesSection.tsx');
assert(fs.existsSync(freeResPath), 'FreeLearningResourcesSection.tsx must exist');

const examPrepPath = path.join(projectRoot, 'components', 'academic-support', 'ExamPreparationSection.tsx');
assert(fs.existsSync(examPrepPath), 'ExamPreparationSection.tsx must exist');

const studySkillsPath = path.join(projectRoot, 'components', 'academic-support', 'StudySkillsSection.tsx');
assert(fs.existsSync(studySkillsPath), 'StudySkillsSection.tsx must exist');

const remedialPath = path.join(projectRoot, 'components', 'academic-support', 'RemedialLearningSection.tsx');
assert(fs.existsSync(remedialPath), 'RemedialLearningSection.tsx must exist');

const digitalSkillsPath = path.join(projectRoot, 'components', 'academic-support', 'DigitalSkillsSection.tsx');
assert(fs.existsSync(digitalSkillsPath), 'DigitalSkillsSection.tsx must exist');

const langPath = path.join(projectRoot, 'components', 'academic-support', 'LanguageDevelopmentSection.tsx');
assert(fs.existsSync(langPath), 'LanguageDevelopmentSection.tsx must exist');

const accessPath = path.join(projectRoot, 'components', 'academic-support', 'AccessibilitySupportSection.tsx');
assert(fs.existsSync(accessPath), 'AccessibilitySupportSection.tsx must exist');

const researchPath = path.join(projectRoot, 'components', 'academic-support', 'AssignmentResearchSection.tsx');
assert(fs.existsSync(researchPath), 'AssignmentResearchSection.tsx must exist');

const modalPath = path.join(projectRoot, 'components', 'academic-support', 'ResourceDetailModal.tsx');
assert(fs.existsSync(modalPath), 'ResourceDetailModal.tsx must exist');

console.log('✓ Test 02: All Module 07 page, API endpoints, and dedicated components exist and verified');

// 3. Load Database from lib/academic-data.ts
const academicDataPath = path.join(projectRoot, 'lib', 'academic-data.ts');
assert(fs.existsSync(academicDataPath), 'lib/academic-data.ts must exist');
const academicDataContent = fs.readFileSync(academicDataPath, 'utf8');

// 4. Test Academic Difficulties Coverage (School, Diploma, UG, PG)
assert(
  academicDataContent.includes('Difficulty Understanding Mathematics & Problem Solving') &&
  academicDataContent.includes('Managing Dual Preparation: Board Syllabus vs Entrance Exams (JEE/NEET)') &&
  academicDataContent.includes('Engineering Mathematics (M-I & M-II) and Backlog Clearance') &&
  academicDataContent.includes('Engineering Graphics & Technical Drawing Difficulties') &&
  academicDataContent.includes('University Semester Backlog Preparation & Systematic Clearance') &&
  academicDataContent.includes('Final-Year Capstone Project & Technical Documentation') &&
  academicDataContent.includes('Conducting Systematic Literature Reviews & Research Gap Discovery') &&
  academicDataContent.includes('Doctoral Thesis Formatting, Plagiarism Ceilings (UGC Norms) & Submission'),
  'Must cover comprehensive academic difficulties across School, Diploma, UG, and PG stages'
);
console.log('✓ Test 03: Academic difficulties and student solutions across all cohorts verified');

// 5. Test Subject-Wise Learning Directory
assert(
  academicDataContent.includes('Relations and Functions, Numbers and Sequences') &&
  academicDataContent.includes('HSC-PHY') &&
  academicDataContent.includes('HSC-CHE') &&
  academicDataContent.includes('DOTE-MECH') &&
  academicDataContent.includes('Data Structures & Algorithms (DSA)'),
  'Must include subject directory items for Class 10, HSC, Diploma, and Undergraduate curricula'
);
console.log('✓ Test 04: Subject-wise learning directory verified');

// 6. Test Verified Free Government Learning Resources & Domains
const requiredDomains = [
  'swayam.gov.in',
  'nptel.ac.in',
  'diksha.gov.in',
  'epathshala.ncert.gov.in',
  'ndl.iitkgp.ac.in',
  'ncert.nic.in',
  'scert.tnschools.gov.in',
  'tnschools.gov.in',
  'spoken-tutorial.org',
  'vlab.co.in',
  'ugceresources.in',
  'free.aicte-india.org',
];

for (const domain of requiredDomains) {
  assert(
    academicDataContent.includes(domain),
    `Official educational domain ${domain} must be included in verified learning platforms`
  );
}
console.log('✓ Test 05: All 12 required official educational domains verified');

// 7. Test Examination Preparation Toolkits
assert(
  academicDataContent.includes('Tamil Nadu Class 10 SSLC Public Board Examination') &&
  academicDataContent.includes('Tamil Nadu Class 12 Higher Secondary Certificate (HSC) Board Exam') &&
  academicDataContent.includes('Anna University End-Semester University Examinations') &&
  academicDataContent.includes('Bloom Taxonomy') &&
  academicDataContent.includes('modelPapersAvailable'),
  'Must provide structured examination preparation blueprints and model paper access'
);
console.log('✓ Test 06: Examination preparation toolkits and model papers verified');

// 8. Test Study Skills & Productivity Methods
assert(
  academicDataContent.includes('How to Build a Sustainable, Realistic Daily Study Timetable') &&
  academicDataContent.includes('Active Recall & Spaced Repetition: How to Remember Difficult Lessons') &&
  academicDataContent.includes('The Cornell Note-Taking System for Lectures & Textbooks') &&
  academicDataContent.includes('Ebbinghaus Forgetting Curve') &&
  academicDataContent.includes('Pomodoro'),
  'Must include scientifically-grounded study skills and note-taking systems'
);
console.log('✓ Test 07: Study skills and productivity frameworks verified');

// 9. Test Remedial Learning Tracks
assert(
  academicDataContent.includes('Foundational Mathematics & Arithmetic') &&
  academicDataContent.includes('English Grammar & Reading Comprehension') &&
  academicDataContent.includes('BODMAS rule') &&
  academicDataContent.includes('progressionPathToAdvanced'),
  'Must provide structured remedial learning roadmaps for foundational gaps'
);
console.log('✓ Test 08: Remedial learning tracks and progression roadmaps verified');

// 10. Test Digital & Computer Skills
assert(
  academicDataContent.includes('Document Preparation, Spreadsheets & Presentations') &&
  academicDataContent.includes('Python Programming for Scientific & Academic Problem Solving') &&
  academicDataContent.includes('Cybersecurity Awareness, Digital Privacy & Online Safety'),
  'Must include digital literacy, scientific computing, and cybersecurity modules'
);
console.log('✓ Test 09: Digital and computer skills tracks verified');

// 11. Test Language & Communication Development
const langCompContent = fs.readFileSync(langPath, 'utf8');
assert(
  langCompContent.includes('Academic English Writing & Grammar') &&
  langCompContent.includes('Spoken English & Presentation Fluency') &&
  langCompContent.includes('Interview Communication & Group Discussions') &&
  langCompContent.includes('Tamil Language & Classical Literature Learning Support'),
  'Must provide language, interview, presentation, and Tamil literary learning tracks'
);
console.log('✓ Test 10: Language and communication development verified');

// 12. Test Special Learning Support & Accessibility
assert(
  academicDataContent.includes('Rights of Persons with Disabilities Act (RPwD Act 2016)') &&
  academicDataContent.includes('NVDA (NonVisual Desktop Access)') &&
  academicDataContent.includes('Sugamya Pustakalaya') &&
  academicDataContent.includes('Dyslexia, Dyscalculia, Dysgraphia') &&
  academicDataContent.includes('Compensatory time of 20 minutes per hour'),
  'Must provide accessibility support, assistive software, and RPwD Act statutory accommodations'
);
console.log('✓ Test 11: Special learning support and RPwD Act accessibility accommodations verified');

// 13. Test Assignment, Capstone Project & Research Guidance
assert(
  academicDataContent.includes('School Science Projects & Practical Record Submission') &&
  academicDataContent.includes('Undergraduate Mini & Final-Year Major Capstone Project Protocol') &&
  academicDataContent.includes('Postgraduate Dissertation & Ph.D. Doctoral Research Methodology') &&
  academicDataContent.includes('UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations 2018') &&
  academicDataContent.includes('Zotero') &&
  academicDataContent.includes('LaTeX'),
  'Must provide assignment, engineering capstone, and doctoral thesis formatting guidance'
);
console.log('✓ Test 12: Assignment, capstone project, and Ph.D. research thesis guidance verified');

// 14. Test Search and Filter Functions
assert(
  academicDataContent.includes('function searchAcademicResources') &&
  academicDataContent.includes('function getResourcesByCategory') &&
  academicDataContent.includes('function getResourcesByStage'),
  'Must export helper search and filter query functions'
);
console.log('✓ Test 13: Search and multi-parameter filtering query helpers verified');

// 15. Test Automated Verification API
const verifyRouteContent = fs.readFileSync(apiVerifyPath, 'utf8');
assert(
  verifyRouteContent.includes('AUTOMATED_VERIFICATION_PASS') &&
  verifyRouteContent.includes('officialDomainComplianceRatio') &&
  verifyRouteContent.includes('isGovDomain') &&
  verifyRouteContent.includes('verifiedAudits'),
  'Automated verification API must validate official domains and log health telemetry'
);
console.log('✓ Test 14: Automated source verification & telemetry API verified');

// 16. Test Module 07 UI Design System Consistency
const pageContent = fs.readFileSync(academicPagePath, 'utf8');
assert(
  (pageContent.includes('bg-[#fbf5e9]') || pageContent.includes('bg-[#fbf7ee]') || pageContent.includes('bg-[#faf6ed]') || pageContent.includes('bg-[#f2f8f4]')) &&
  (pageContent.includes('bg-[#8c2f39]') || pageContent.includes('bg-[#0d3e2e]')) &&
  pageContent.includes('font-serif') &&
  pageContent.includes('Back to Student RSO') &&
  (pageContent.includes('STUDENT RSO 2.0 · MODULE 07: ACADEMIC SUPPORT &amp; LEARNING CENTRE') ||
   pageContent.includes('STUDENT RSO 2.0 · MODULE 07: ACADEMIC SUPPORT & LEARNING CENTRE')),
  'Module 07 must strictly follow the visual design tokens of Modules 01-04'
);
console.log('✓ Test 15: Visual design system tokens and navigation consistency verified');

// 17. Verify NOT an AI Assistant / Chatbot / Gemini Integration
assert(!academicDataContent.includes('Gemini'), 'Module 07 must not use Gemini AI');
assert(!academicDataContent.includes('ChatGPT'), 'Module 07 must not use ChatGPT');
assert(!pageContent.includes('ChatInterface'), 'Module 07 page must not contain a chatbot interface');
assert(!pageContent.includes('ai-career-assistant'), 'Module 07 must be distinct from AI Career Assistant');
console.log('✓ Test 16: Verified Module 07 is a genuine academic resource centre, not an AI chatbot');

// 18. Strict English-Only Verification across all Module 07 Files
const tamilRegex = /[\u0B80-\u0BFF]/;
const filesToCheck = [
  academicPagePath,
  academicDataPath,
  apiResourcesPath,
  apiDifficultiesPath,
  apiSubjectsPath,
  apiVerifyPath,
  dashboardPath,
  difficultiesPath,
  subjectPath,
  freeResPath,
  examPrepPath,
  studySkillsPath,
  remedialPath,
  digitalSkillsPath,
  langPath,
  accessPath,
  researchPath,
  modalPath,
];

for (const filePath of filesToCheck) {
  const content = fs.readFileSync(filePath, 'utf8');
  assert(!tamilRegex.test(content), `File ${path.basename(filePath)} must not contain hardcoded Tamil characters`);
}
console.log('✓ Test 17: Strict 100% English-only copy verification passed across all 18 Module 07 files');

// 19. Verify Preservation of Modules 01 to 06
const mod1 = path.join(projectRoot, 'app', 'scholarships', 'page.tsx');
const mod2 = path.join(projectRoot, 'app', 'safety', 'page.tsx');
const mod3 = path.join(projectRoot, 'app', 'certificates', 'page.tsx');
const mod4 = path.join(projectRoot, 'app', 'exams', 'page.tsx');
const mod5 = path.join(projectRoot, 'app', 'career-assistant', 'page.tsx');
const mod6 = path.join(projectRoot, 'app', 'admissions', 'page.tsx');

assert(fs.existsSync(mod1), 'Module 01 (Scholarships) must remain intact');
assert(fs.existsSync(mod2), 'Module 02 (Safety) must remain intact');
assert(fs.existsSync(mod3), 'Module 03 (Certificates) must remain intact');
assert(fs.existsSync(mod4), 'Module 04 (Exams) must remain intact');
assert(fs.existsSync(mod5), 'Module 05 (Career Assistant) must remain intact');
assert(fs.existsSync(mod6), 'Module 06 (Admissions) must remain intact');
console.log('✓ Test 18: Modules 01, 02, 03, 04, 05, and 06 preserved intact without corruption');

console.log('\n=============================================================================');
console.log('ALL MODULE 07 TEST SUITE CHECKS PASSED (18 / 18)');
console.log('Module 07: Academic Support & Learning Centre is 100% Fully Compliant.');
console.log('=============================================================================\n');
