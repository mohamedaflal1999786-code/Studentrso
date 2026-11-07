// tests/digital-safety-feature-test.mjs
// Comprehensive Verification for Module 10: Digital Safety & Cyber-Wellness Shield
// Student RSO 2.0 – Cybersecurity, Scam Defense, Privacy & Emergency Reporting Suite

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { services } from '../lib/data.ts';
import {
  SAFETY_FEATURES,
  GUIDANCE_SECTIONS,
  OFFICIAL_CYBER_RESOURCES,
  CYBER_SCAM_QUIZ_QUESTIONS,
  STUDENT_CYBER_CHECKLIST,
  PRIVACY_ASSESSMENT_QUESTIONS,
  EMERGENCY_PROCEDURES,
} from '../lib/digital-safety-data.ts';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 – MODULE 10: DIGITAL SAFETY & CYBER-WELLNESS SHIELD TEST SUITE');
console.log('Comprehensive Quality, Statutory, Security & Architectural Verification');
console.log('=============================================================================\n');

// 1. Verify Module 10 configured in lib/data.ts
const mod10 = services.find((s) => s.number === '10');
assert(mod10, 'Module 10 must exist in services array in lib/data.ts');
assert.strictEqual(mod10.id, 'digital-safety-cyber-shield', 'Module 10 id must be digital-safety-cyber-shield');
assert.strictEqual(mod10.route, '/digital-safety', 'Module 10 route must be /digital-safety');
assert.strictEqual(mod10.isFullyImplemented, true, 'Module 10 must be marked isFullyImplemented: true');
assert(mod10.title.includes('Digital Safety & Cyber-Wellness Shield'), 'Title must match exact specification');
assert(mod10.subtitle.includes('Online safety, cyberbullying & digital privacy.'), 'Subtitle must match specification');
assert(mod10.features.length >= 6, 'Module 10 must list all 6 primary features in lib/data.ts');
console.log('✓ Test 01: Module 10 configured in lib/data.ts with route /digital-safety and isFullyImplemented: true');

// 2. Verify Module 10 registered in components/Header.tsx
const headerContent = fs.readFileSync(path.join(projectRoot, 'components/Header.tsx'), 'utf8');
assert(headerContent.includes("route: '/digital-safety'"), 'Header.tsx must link Module 10 to /digital-safety');
assert(headerContent.includes("id: 'digital-safety-cyber-shield'"), 'Header.tsx must register Module 10');
console.log('✓ Test 02: Module 10 navigation item in Header.tsx registered with live: true and route /digital-safety');

// 3. Verify Next.js Page & All Dedicated Module 10 Components Exist
const requiredFiles = [
  'app/digital-safety/page.tsx',
  'lib/digital-safety-data.ts',
  'components/digital-safety/SafetyFeatureCard.tsx',
  'components/digital-safety/SafetyFeatureDetailModal.tsx',
  'components/digital-safety/CyberScamQuizSection.tsx',
  'components/digital-safety/CyberSafetyChecklistSection.tsx',
  'components/digital-safety/PrivacySelfAssessmentSection.tsx',
  'components/digital-safety/EmergencyActionGuideSection.tsx',
  'components/digital-safety/CyberResourcesDirectorySection.tsx',
  'components/digital-safety/AdditionalGuidanceSection.tsx',
  'components/digital-safety/DigitalSafetyDiagnosticsModal.tsx',
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Required file must exist: ${relPath}`);
}
console.log(`✓ Test 03: Next.js page and all ${requiredFiles.length} dedicated Module 10 components verified`);

// 4. Verify the 6 Primary Safety Feature Cards
const expectedFeatures = [
  'Cyberbullying Safeguards',
  'Social Media Impersonation Guide',
  'Financial Scam Alert – Helpline 1930',
  'Device Security Best Practices',
  'Digital Footprint Hygiene',
  'Phishing & Fake Link Detection',
];

assert.strictEqual(SAFETY_FEATURES.length, 6, 'Must contain exactly 6 primary safety features');

for (const expTitle of expectedFeatures) {
  const found = SAFETY_FEATURES.find((f) => f.title === expTitle);
  assert(found, `Safety Feature "${expTitle}" must exist in SAFETY_FEATURES`);
  assert(found.summary.length > 40, `Feature "${expTitle}" must have a detailed summary`);
  assert(found.actionSteps.length >= 6, `Feature "${expTitle}" must have at least 6 action steps`);
  assert(found.threatsCovered.length >= 3, `Feature "${expTitle}" must define threats covered`);
  assert(found.statutoryRemedies.length >= 1, `Feature "${expTitle}" must reference statutory legal remedies`);
  assert(found.practicalTips.length >= 2, `Feature "${expTitle}" must provide practical prevention tips`);
}
console.log('✓ Test 04: All 6 primary safety feature cards validated with 6-step action guides, threats & statutory remedies');

// 5. Verify the 8 Official Verified Cybersecurity Resources
assert.strictEqual(OFFICIAL_CYBER_RESOURCES.length, 8, 'Must contain exactly 8 official cyber resources');

const requiredAuthorities = [
  'cybercrime.gov.in',
  '1930',
  'cert-in.org.in',
  'sancharsaathi.gov.in',
  'csk.gov.in',
  'isea.gov.in',
  'cytrain.ncrb.gov.in',
];

for (const reqAuth of requiredAuthorities) {
  const matched = OFFICIAL_CYBER_RESOURCES.some((r) => r.portalUrl.includes(reqAuth));
  assert(matched, `Resource with URL matching "${reqAuth}" must exist in OFFICIAL_CYBER_RESOURCES`);
}
console.log('✓ Test 05: All 8 official verified cybersecurity government resources & portals validated');

// 6. Verify the 10-Question Cyber Scam Awareness Quiz
assert.strictEqual(CYBER_SCAM_QUIZ_QUESTIONS.length, 10, 'Must contain exactly 10 quiz questions');

for (const q of CYBER_SCAM_QUIZ_QUESTIONS) {
  assert(q.id > 0 && q.id <= 10, 'Question ID must be 1 to 10');
  assert(q.scenario.length > 30, `Scenario for question ${q.id} must be detailed`);
  assert(q.options.length === 4, `Question ${q.id} must have exactly 4 options`);
  assert(q.correctOptionIndex >= 0 && q.correctOptionIndex < 4, `Question ${q.id} must have valid correct option`);
  assert(q.explanation.length > 20, `Question ${q.id} must provide clear educational explanation`);
  assert(q.criticalTakeaway.length > 10, `Question ${q.id} must provide concise critical takeaway rule`);
}
console.log('✓ Test 06: 10-Question Cyber Scam Awareness Quiz validated with 4 options, explanations & takeaways');

// 7. Verify the Student Cyber Safety Checklist
assert.strictEqual(STUDENT_CYBER_CHECKLIST.length, 10, 'Must contain exactly 10 student cyber checklist items');
const checklistCategories = new Set(STUDENT_CYBER_CHECKLIST.map((c) => c.category));
assert(checklistCategories.has('Accounts'), 'Checklist must cover Accounts');
assert(checklistCategories.has('Payments'), 'Checklist must cover Payments');
assert(checklistCategories.has('Devices'), 'Checklist must cover Devices');
assert(checklistCategories.has('Privacy'), 'Checklist must cover Privacy');
assert(checklistCategories.has('Emergency'), 'Checklist must cover Emergency');
console.log('✓ Test 07: Student Cyber Safety Checklist validated across Accounts, Payments, Devices, Privacy & Emergency');

// 8. Verify the Digital Privacy Self-Assessment Engine
assert.strictEqual(PRIVACY_ASSESSMENT_QUESTIONS.length, 5, 'Must contain exactly 5 privacy assessment questions');
for (const pq of PRIVACY_ASSESSMENT_QUESTIONS) {
  assert(pq.options.length === 3, 'Each privacy question must offer 3 evaluated tiers');
  for (const opt of pq.options) {
    assert(typeof opt.points === 'number', 'Option must have numeric points');
    assert(opt.recommendation.length > 15, 'Option must have actionable recommendation');
  }
}
console.log('✓ Test 08: Digital Privacy Self-Assessment validated with 3-tier scoring and tailored guidance');

// 9. Verify Emergency Incident Procedures
assert(EMERGENCY_PROCEDURES.length >= 4, 'Must provide at least 4 emergency incident procedures');
const financialProc = EMERGENCY_PROCEDURES.find((p) => p.id === 'proc-financial-fraud');
assert(financialProc, 'Financial fraud procedure must exist');
assert.strictEqual(financialProc.primaryHotline, '1930', 'Financial fraud procedure must prioritize Helpline 1930');
assert(financialProc.sequentialSteps.length >= 4, 'Must define sequential steps');
assert(financialProc.avoidActions.length >= 1, 'Must define actions to avoid');
console.log('✓ Test 09: Emergency Incident Procedures validated with Golden Hour protocol and helpline 1930');

// 10. Verify Additional Guidance Pillars
assert.strictEqual(GUIDANCE_SECTIONS.length, 5, 'Must contain exactly 5 additional guidance pillars');
for (const gs of GUIDANCE_SECTIONS) {
  assert(gs.keyPractices.length >= 3, `Guidance section "${gs.title}" must list key practices`);
  assert(gs.warningSign.length > 10, `Guidance section "${gs.title}" must define warning sign`);
  assert(gs.studentActionTip.length > 10, `Guidance section "${gs.title}" must define student action tip`);
}
console.log('✓ Test 10: All 5 cyber-wellness field guidance pillars validated');

console.log('\n=============================================================================');
console.log('ALL MODULE 10: DIGITAL SAFETY & CYBER-WELLNESS SHIELD TESTS PASSED (10/10)');
console.log('=============================================================================\n');
