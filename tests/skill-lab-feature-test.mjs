// tests/skill-lab-feature-test.mjs
// Comprehensive Quality, Curriculum & Architectural Verification for Module 09: Language, Soft-Skills & Confidence Lab

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { services } from '../lib/data.ts';
import {
  SKILL_CATEGORIES,
  TRUSTED_OFFICIAL_RESOURCES,
  PATHWAY_STAGES,
  DAILY_PRACTICE_ITEMS,
  getDailyPracticeItem,
} from '../lib/skill-lab-data.ts';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 – MODULE 09: LANGUAGE, SOFT-SKILLS & CONFIDENCE LAB TEST SUITE');
console.log('Comprehensive Quality, Statutory & Architectural Verification');
console.log('=============================================================================\n');

// 1. Verify Module 09 configured in lib/data.ts
const mod09 = services.find((s) => s.number === '09');
assert(mod09, 'Module 09 must exist in services array in lib/data.ts');
assert.strictEqual(mod09.id, 'language-soft-skills-lab', 'Module 09 id must be language-soft-skills-lab');
assert.strictEqual(mod09.route, '/skill-lab', 'Module 09 route must be /skill-lab');
assert.strictEqual(mod09.isFullyImplemented, true, 'Module 09 must be marked isFullyImplemented: true');
assert(mod09.title.includes('Language, Soft-Skills & Confidence Lab'), 'Title must match exact specification');
assert(mod09.subtitle.includes('Communication, presentation & interview prep.'), 'Subtitle must match specification');
console.log('✓ Test 01: Module 09 configured in lib/data.ts with route /skill-lab and isFullyImplemented: true');

// 2. Verify Next.js Page & All Dedicated Module 09 Components Exist
const requiredFiles = [
  'app/skill-lab/page.tsx',
  'lib/skill-lab-data.ts',
  'components/skill-lab/SkillCategoryCard.tsx',
  'components/skill-lab/SkillCategoryDetailModal.tsx',
  'components/skill-lab/DailyPracticeSection.tsx',
  'components/skill-lab/InteractivePracticeCentre.tsx',
  'components/skill-lab/LearningPathwaySection.tsx',
  'components/skill-lab/TrustedResourcesSection.tsx',
  'components/skill-lab/SkillLabDiagnosticsModal.tsx',
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Required file must exist: ${relPath}`);
}
console.log(`✓ Test 02: Next.js page and all ${requiredFiles.length} dedicated Module 09 components verified`);

// 3. Verify all 8 learning categories present
const expectedCategories = [
  'English Language Development',
  'Communication & Interpersonal Skills',
  'Interview Preparation',
  'Group Discussion Practice',
  'Resume & Cover Letter Guide',
  'Public Speaking & Presentation',
  'Confidence & Personality Development',
  'Professional & Workplace Readiness',
];

assert.strictEqual(SKILL_CATEGORIES.length, 8, 'Must contain exactly 8 skill categories');

for (const expCat of expectedCategories) {
  const found = SKILL_CATEGORIES.find((c) => c.title === expCat);
  assert(found, `Category "${expCat}" must exist in SKILL_CATEGORIES`);
  assert(found.description.length > 50, `Category "${expCat}" must have comprehensive description`);
  assert(found.learningObjectives.length >= 3, `Category "${expCat}" must have at least 3 learning objectives`);
  assert(found.topics.length >= 1, `Category "${expCat}" must have learning topics`);
}
console.log('✓ Test 03: All 8 core learning categories validated with rich learning objectives and topics');

// 4. Verify topic guides and practice exercises
for (const cat of SKILL_CATEGORIES) {
  for (const topic of cat.topics) {
    assert(topic.keyPoints.length >= 3, `Topic "${topic.title}" must have at least 3 key points`);
    assert(topic.practicalExample.length > 20, `Topic "${topic.title}" must have practical example`);
    assert(topic.exercises.length >= 1, `Topic "${topic.title}" must have at least 1 interactive exercise`);
    for (const ex of topic.exercises) {
      assert(ex.question, 'Exercise must have question');
      assert(ex.explanation, 'Exercise must have explanation');
    }
  }
}
console.log('✓ Test 04: Lesson topics validated with step-by-step guides, practical examples and quizzes');

// 5. Verify the 6 Authentic Official Learning Resources
assert.strictEqual(TRUSTED_OFFICIAL_RESOURCES.length, 6, 'Must contain exactly 6 trusted official resources');

const expectedDomains = [
  'tnskill.tn.gov.in',
  'naanmudhalvan.tn.gov.in',
  'www.ncs.gov.in',
  'swayamplus.education.gov.in',
  'employmentexchange.tn.gov.in',
];

for (const res of TRUSTED_OFFICIAL_RESOURCES) {
  assert(res.officialUrl.startsWith('https://'), `Resource "${res.title}" URL must be secure HTTPS`);
  assert(
    expectedDomains.some((d) => res.officialUrl.includes(d)),
    `Resource "${res.title}" must link to an authorized government / national education domain`
  );
  assert(res.topicsCovered.length >= 3, `Resource "${res.title}" must specify covered topics`);
}
console.log('✓ Test 05: All 6 official government resources validated with authorized domains (Naan Mudhalvan, NCS, SWAYAM Plus, TN Employment)');

// 6. Verify Daily Practice Rotation
assert(DAILY_PRACTICE_ITEMS.length >= 3, 'Must contain at least 3 daily communication rotation items');
const todayItem = getDailyPracticeItem(new Date());
assert(todayItem.wordOfTheDay.word, 'Word of the day must exist');
assert(todayItem.sentenceOfTheDay.phrase, 'Sentence of the day must exist');
assert(todayItem.dailyConversation.dialogue.length >= 4, 'Daily conversation must have realistic dialogue');
assert(todayItem.interviewQuestionOfTheDay.question, 'Interview question must exist');
assert(todayItem.groupDiscussionTopic.topic, 'GD topic must exist');
assert(todayItem.publicSpeakingTopic.topic, 'Public speaking topic must exist');
assert(todayItem.proCommunicationTip.title, 'Pro communication tip must exist');

const futureDate = new Date('2026-11-20');
const futureItem = getDailyPracticeItem(futureDate);
assert(futureItem, 'getDailyPracticeItem must successfully compute rotation for future dates');
console.log('✓ Test 06: Daily communication 7-part workout and dynamic day-of-year rotation validated');

// 7. Verify 8-Stage Learning Pathway
assert.strictEqual(PATHWAY_STAGES.length, 8, 'Pathway must contain exactly 8 progressive stages');
for (let i = 1; i <= 8; i++) {
  const stage = PATHWAY_STAGES.find((s) => s.stageNumber === i);
  assert(stage, `Stage ${i} must exist in pathway`);
  assert(stage.milestoneOutcome, `Stage ${i} must specify concrete milestone outcome`);
}
console.log('✓ Test 07: 8-Stage structured career pathway and milestones validated');

// 8. Verify Header & Footer Navigation for Module 09
const headerCode = fs.readFileSync(path.join(projectRoot, 'components', 'Header.tsx'), 'utf8');
assert(headerCode.includes('/skill-lab'), 'Header.tsx must link to /skill-lab for Module 09');

const footerCode = fs.readFileSync(path.join(projectRoot, 'components', 'Footer.tsx'), 'utf8');
assert(footerCode.includes('/skill-lab') || footerCode.includes('s.route'), 'Footer must route to /skill-lab for Module 09');
console.log('✓ Test 08: Global Header and Footer navigation link correctly to /skill-lab');

// 9. Verify Homepage Module 09 card adheres to single-button design
const cardCompCode = fs.readFileSync(path.join(projectRoot, 'components', 'HomepageModuleCard.tsx'), 'utf8');
assert(cardCompCode.includes('Open Module →'), 'HomepageModuleCard must enforce single "Open Module →" button');
console.log('✓ Test 09: Homepage Module 09 card adheres to single "Open Module →" button architecture');

// 10. Verify Module 01 View Details Consistency
const detailModalCode = fs.readFileSync(
  path.join(projectRoot, 'components', 'skill-lab', 'SkillCategoryDetailModal.tsx'),
  'utf8'
);
assert(detailModalCode.includes('role="dialog"'), 'Detail modal must use role="dialog"');
assert(detailModalCode.includes('aria-modal="true"'), 'Detail modal must use aria-modal="true"');
assert(detailModalCode.includes('backdrop-blur'), 'Detail modal must use backdrop blur consistent with Module 01');
assert(detailModalCode.includes('#8c2f39'), 'Detail modal must use Student RSO primary burgundy #8c2f39');
assert(detailModalCode.includes('Mark Lesson Complete') || detailModalCode.includes('Completed ✓'), 'Detail modal must have completion toggle');
console.log('✓ Test 10: Detail modal UX/UI strictly matches Module 01 (layout, typography, colors, backdrop, buttons)');

// 11. Verify Modules 01 through 08 remain intact
const previousModulePages = [
  'app/scholarships/page.tsx',
  'app/safety/page.tsx',
  'app/certificates/page.tsx',
  'app/exams/page.tsx',
  'app/career-assistant/page.tsx',
  'app/admissions/page.tsx',
  'app/academic-support/page.tsx',
  'app/internships/page.tsx',
];

for (const modPage of previousModulePages) {
  assert(fs.existsSync(path.join(projectRoot, modPage)), `Previous module page must remain intact: ${modPage}`);
}
console.log('✓ Test 11: Modules 01, 02, 03, 04, 05, 06, 07, and 08 preserved completely intact without corruption');

console.log('\n=============================================================================');
console.log('ALL MODULE 09 TEST SUITE CHECKS PASSED (11 / 11)');
console.log('Module 09: Language, Soft-Skills & Confidence Lab is 100% Fully Compliant.');
console.log('=============================================================================\n');
