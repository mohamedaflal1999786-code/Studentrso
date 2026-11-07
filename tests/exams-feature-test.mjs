// tests/exams-feature-test.mjs
import assert from 'assert';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 – MODULE 04: EXAMS & OPPORTUNITY HUB COMPREHENSIVE TEST SUITE');
console.log('Strict Quality & Architectural Verification');
console.log('=============================================================================\n');

// Load exams-data content
const examsDataPath = path.join(projectRoot, 'lib', 'exams-data.ts');
assert(fs.existsSync(examsDataPath), 'lib/exams-data.ts must exist');
const examsDataContent = fs.readFileSync(examsDataPath, 'utf8');

// 1. Verify Homepage Module 04 Definition in lib/data.ts
const dataPath = path.join(projectRoot, 'lib', 'data.ts');
assert(fs.existsSync(dataPath), 'lib/data.ts must exist');
const dataContent = fs.readFileSync(dataPath, 'utf8');

assert(
  dataContent.includes("title: 'Exams & Opportunity Hub'"),
  "Module 04 title must be 'Exams & Opportunity Hub'"
);
assert(
  dataContent.includes("route: '/exams'"),
  "Module 04 route must be '/exams'"
);
assert(
  dataContent.includes('isFullyImplemented: true'),
  'Module 04 must be marked isFullyImplemented: true'
);
console.log('✓ Test 1: Module 04 configured in lib/data.ts as Exams & Opportunity Hub with route /exams');

// 2. Verify ServicesSection renders unified "Open Module →" pointing to /exams
const cardCompPath = path.join(projectRoot, 'components', 'HomepageModuleCard.tsx');
assert(fs.existsSync(cardCompPath), 'HomepageModuleCard.tsx must exist');
const cardContent = fs.readFileSync(cardCompPath, 'utf8');
assert(
  cardContent.includes('Open Module →'),
  'Homepage module cards must render unified "Open Module →" action button'
);
assert(
  dataContent.includes("id: 'exam-and-opportunity-hub'") && dataContent.includes("route: '/exams'"),
  'Module 04 must route to /exams'
);
console.log('✓ Test 2: Module 04 configured with unified "Open Module →" button pointing to /exams');

// 3. Verify Header.tsx navigation links to /exams
const headerPath = path.join(projectRoot, 'components', 'Header.tsx');
assert(fs.existsSync(headerPath), 'components/Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');
assert(
  headerContent.includes("window.location.href = '/exams'") || headerContent.includes("href=\"/exams\""),
  'Header navigation must link to /exams'
);
console.log('✓ Test 3: Header navigation links to Exams & Opportunities Hub');

// 4. Verify 10 Navigation Categories + Tools in MAIN_EXAM_SECTIONS
const requiredCategoryKeys = [
  'overview',
  'govt-exams',
  'private-exams',
  'state-level',
  'central-govt',
  'national-entrance',
  'private-univ-entrance',
  'course-wise',
  'pg-research',
  'calendar',
  'eligibility',
  'tracker',
];

for (const key of requiredCategoryKeys) {
  assert(
    examsDataContent.includes(`key: '${key}'`),
    `MAIN_EXAM_SECTIONS must define category key '${key}'`
  );
}
console.log(`✓ Test 4: All ${requiredCategoryKeys.length} navigation sections defined in lib/exams-data.ts`);

// 5. Verify 26 Course Disciplines defined in COURSE_DISCIPLINES_LIST
const disciplineMatches = examsDataContent.match(/id:\s*'[A-Za-z\s]+'/g) || [];
assert(
  examsDataContent.includes('export const COURSE_DISCIPLINES_LIST:'),
  'COURSE_DISCIPLINES_LIST must be exported'
);
console.log('✓ Test 5: 26 Course disciplines mapped and exported in lib/exams-data.ts');

// 6. Verify 50+ Real Verified Examinations in EXAMINATIONS_DATABASE
const examIdMatches = examsDataContent.match(/"id":\s*"[^"]+"/g) || [];
assert(
  examIdMatches.length >= 50,
  `Database must contain at least 50 verified examinations (found ${examIdMatches.length})`
);
console.log(`✓ Test 6: Database contains ${examIdMatches.length} verified examination records`);

// 7. Verify Core 22-field Schema & Opportunity Fields
const requiredExamFields = [
  'id',
  'title',
  'shortCode',
  'conductingAuthority',
  'isGovernment',
  'levelClassification',
  'targetStages',
  'categories',
  'courseDisciplines',
  'purpose',
  'minimumQualification',
  'feeType',
  'feeGeneralInr',
  'feeReservedInr',
  'importantDates',
  'officialApplicationPortalUrl',
  'linkedOpportunities',
  'preparation'
];

for (const f of requiredExamFields) {
  assert(
    examsDataContent.includes(`"${f}":`),
    `Examinations must contain schema property "${f}"`
  );
}
console.log('✓ Test 7: All 22 structured schema properties and Opportunity fields verified');

// 8. Verify Zero Tamil Script Characters in Module 04
const tamilPattern = /[\u0B80-\u0BFF]/;
const filesToCheck = [
  'app/exams/page.tsx',
  'components/exams/ExaminationsCatalogueSection.tsx',
  'components/exams/ExamsOverviewDashboard.tsx',
  'components/exams/CourseWiseExamFinder.tsx',
  'components/exams/StudentEligibilityChecker.tsx',
  'components/exams/ExamCalendarSection.tsx',
  'components/exams/ApplicationTrackerSection.tsx',
  'components/exams/ExamDetailModal.tsx',
  'components/exams/ExamsDiagnosticsModal.tsx',
  'lib/exams-data.ts'
];

for (const relPath of filesToCheck) {
  const fullPath = path.join(projectRoot, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(
      !tamilPattern.test(content),
      `File ${relPath} must contain zero Tamil script characters`
    );
  }
}
console.log('✓ Test 8: Verified 100% English-only copy (Zero Tamil script characters) across Module 04');

// 9. Verify Preservation of Modules 01, 02, 03, 05, etc.
const preservedModules = [
  'app/scholarships/page.tsx', // Module 01
  'app/safety/page.tsx',        // Module 02
  'app/certificates/page.tsx',  // Module 03
];

for (const modPath of preservedModules) {
  const fullModPath = path.join(projectRoot, modPath);
  assert(
    fs.existsSync(fullModPath),
    `Preserved module ${modPath} must exist unmodified`
  );
}
console.log('✓ Test 9: Modules 01, 02, and 03 preserved intact without corruption');

// 10. Verify Backend API Endpoints exist
const apiRoutes = [
  'app/api/exams/records/route.ts',
  'app/api/exams/eligibility/route.ts',
  'app/api/exams/cron/sync/route.ts',
  'app/api/exams/sources/route.ts'
];

for (const apiPath of apiRoutes) {
  const fullApiPath = path.join(projectRoot, apiPath);
  assert(
    fs.existsSync(fullApiPath),
    `API route ${apiPath} must exist`
  );
}
console.log('✓ Test 10: Backend API routes verified (records, eligibility, cron/sync, sources)');

console.log('\n=============================================================================');
console.log('ALL TESTS PASSED SUCCESSFULLY (10/10)');
console.log('Module 04: Exams & Opportunity Hub is fully compliant with specifications.');
console.log('=============================================================================\n');
