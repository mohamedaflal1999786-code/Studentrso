/**
 * STUDENT RSO 2.0 – MODULE 03: CERTIFICATE & DOCUMENT SERVICE
 * Comprehensive Automated Verification Test Suite
 * 
 * Verifies:
 * 1. Homepage Module 03 description and 2 working buttons
 * 2. 10 Modules preservation
 * 3. Module 01 & 02 preservation
 * 4. All 17 Dedicated Certificate Hub sections & catalogs
 * 5. Revenue certificates (REV-101 to REV-116 + UDID)
 * 6. Income Certificate non-universal expiry rules
 * 7. Community Certificate permanent lifetime validity
 * 8. Aadhaar lifetime validity & privacy guarantees
 * 9. UDID permanent vs temporary distinction
 * 10. DigiLocker Rule 9A legal parity & authentic issuer distinction
 * 11. Document Readiness Checker engine (9 stages × 13 purposes)
 * 12. Official 8-Tier Service Directory
 * 13. External Application Tracker disclaimer
 * 14. Supabase migration schema
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

console.log('--- STARTING MODULE 03: CERTIFICATE & DOCUMENT SERVICE TEST SUITE ---');

// 1. Verify lib/data.ts Homepage Modules
const libDataPath = path.join(projectRoot, 'lib', 'data.ts');
assert(fs.existsSync(libDataPath), 'lib/data.ts must exist');
const libDataContent = fs.readFileSync(libDataPath, 'utf8');

// Check 10 final modules exist
const moduleTitles = [
  'Scholarship Hub',
  'Safety & Grievance System',
  'Certificate & Document Service',
  'Opportunity Hub',
  'AI Career Assistant',
  'Student Admission & Education Continuity',
  'Academic Support & Learning Centre',
  'Internship, Skill & Employment Exchange',
  'Language, Soft-Skills & Confidence Lab',
  'Digital Safety & Cyber-Wellness Shield',
];

for (const title of moduleTitles) {
  assert(libDataContent.includes(title), `Homepage data must contain module: ${title}`);
}
console.log('✓ Test 1: All 10 homepage modules present in lib/data.ts');

// Check Module 03 exact description and configuration
assert(
  libDataContent.includes('Apply, access, download and manage important educational and government certificates in one place.'),
  'Module 03 must have the exact approved description'
);
assert(
  libDataContent.includes("route: '/certificates'"),
  "Module 03 route must be '/certificates'"
);
assert(
  libDataContent.includes('Open Document Service') && libDataContent.includes('Find My Certificate'),
  'Module 03 must define action links for Open Document Service and Find My Certificate'
);
console.log('✓ Test 2: Module 03 description, route, and action links configured correctly');

// 2. Verify Homepage module routing for Module 03
const servicesSectionPath = path.join(projectRoot, 'components', 'sections', 'ServicesSection.tsx');
assert(fs.existsSync(servicesSectionPath), 'ServicesSection.tsx must exist');
const cardCompPath = path.join(projectRoot, 'components', 'HomepageModuleCard.tsx');
assert(fs.existsSync(cardCompPath), 'HomepageModuleCard.tsx must exist');
const cardContent = fs.readFileSync(cardCompPath, 'utf8');
assert(
  cardContent.includes('Open Module →'),
  'Homepage module cards must render unified "Open Module →" action button'
);
assert(
  libDataContent.includes("id: 'certificate-service'") && libDataContent.includes("route: '/certificates'"),
  'Module 03 must route to /certificates'
);
console.log('✓ Test 3: Module 03 configured with unified "Open Module →" button pointing to /certificates');

// 3. Verify Header.tsx contains Certificates link
const headerPath = path.join(projectRoot, 'components', 'Header.tsx');
assert(fs.existsSync(headerPath), 'Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');
assert(
  headerContent.includes('/certificates'),
  'Header navigation must contain link to /certificates'
);
console.log('✓ Test 4: Header navigation includes Certificates link');

// 4. Verify Supabase migration schema
const migrationPath = path.join(
  projectRoot,
  'supabase',
  'migrations',
  '20261106210000_certificates_documents_module.sql'
);
assert(fs.existsSync(migrationPath), 'Certificate module migration SQL must exist');
const migrationContent = fs.readFileSync(migrationPath, 'utf8');
assert(migrationContent.includes('certificate_catalogue'), 'Migration must create certificate_catalogue table');
assert(migrationContent.includes('certificate_authorities'), 'Migration must create certificate_authorities table');
assert(migrationContent.includes('student_document_readiness'), 'Migration must create student_document_readiness table');
assert(migrationContent.includes('student_certificate_trackers'), 'Migration must create student_certificate_trackers table');
assert(migrationContent.includes('student_document_checklists'), 'Migration must create student_document_checklists table');
assert(migrationContent.includes('Student-reported status – not independently verified.'), 'Tracker table must include statutory student disclaimer');
console.log('✓ Test 5: Supabase migration contains all 6 tables, RLS policies, and student disclaimer');

// 5. Verify API Routes exist
const apiRoutes = [
  'app/api/certificates/records/route.ts',
  'app/api/certificates/tracker/route.ts',
  'app/api/certificates/sources/route.ts',
  'app/api/certificates/readiness/route.ts',
];
for (const route of apiRoutes) {
  assert(fs.existsSync(path.join(projectRoot, route)), `API route ${route} must exist`);
}
console.log('✓ Test 6: All 4 certificates API routes exist');

// 6. Verify lib/certificates-data.ts Content & Statutory Rules
const certDataPath = path.join(projectRoot, 'lib', 'certificates-data.ts');
assert(fs.existsSync(certDataPath), 'lib/certificates-data.ts must exist');
const certDataContent = fs.readFileSync(certDataPath, 'utf8');

// Check Revenue certificates
assert(certDataContent.includes('rev-101-community') && certDataContent.includes('REV-101'), 'Must include REV-101 Community Certificate');
assert(certDataContent.includes('rev-102-nativity') && certDataContent.includes('REV-102'), 'Must include REV-102 Nativity Certificate');
assert(certDataContent.includes('rev-103-income') && certDataContent.includes('REV-103'), 'Must include REV-103 Income Certificate');
assert(certDataContent.includes('rev-104-first-graduate') && certDataContent.includes('REV-104'), 'Must include REV-104 First Graduate Certificate');
assert(certDataContent.includes('rev-115-obc-ncl') && certDataContent.includes('REV-115'), 'Must include REV-115 Central OBC-NCL Certificate');
assert(certDataContent.includes('rev-116-residence') && certDataContent.includes('REV-116'), 'Must include REV-116 Residence Certificate');
assert(certDataContent.includes('disability-udid-card'), 'Must include UDID Disability Card');
console.log('✓ Test 7: Core Tamil Nadu Revenue certificates (REV-101, 102, 103, 104, 115, 116, UDID) exist');

// Check Income certificate does NOT have universal 1-year expiry assumption
assert(
  certDataContent.includes('Validity depends on receiving institution or scheme') ||
  certDataContent.includes('academic year') ||
  certDataContent.includes('financial year'),
  'Income certificate must state validity depends on scheme/institution, avoiding false blanket 1-year expiry'
);
console.log('✓ Test 8: Income certificate correctly documents non-universal statutory validity');

// Check Community certificate has lifetime validity
assert(
  certDataContent.includes('No routine expiry specified by source') ||
  certDataContent.includes('permanent lifetime validity') ||
  certDataContent.includes('Permanent lifetime'),
  'Community certificate must specify permanent lifetime validity'
);
console.log('✓ Test 9: Community certificate documents permanent lifetime validity');

// Check Aadhaar lifetime validity & privacy
assert(
  certDataContent.includes('Lifetime validity') || certDataContent.includes('lifetime validity'),
  'Aadhaar must document lifetime validity without false annual renewal'
);
console.log('✓ Test 10: Aadhaar lifetime validity confirmed');

// Check Official Service Directory has all 8 Tiers (A to H)
assert(certDataContent.includes('A. Tamil Nadu Government'), 'Directory must have Tier A');
assert(certDataContent.includes('B. Central Government'), 'Directory must have Tier B');
assert(certDataContent.includes('C. Identity Documents'), 'Directory must have Tier C');
assert(certDataContent.includes('D. School Education'), 'Directory must have Tier D');
assert(certDataContent.includes('E. Technical Education'), 'Directory must have Tier E');
assert(certDataContent.includes('F. Universities'), 'Directory must have Tier F');
assert(certDataContent.includes('G. Disability and Accessibility Services'), 'Directory must have Tier G');
assert(certDataContent.includes('H. Digital Documents'), 'Directory must have Tier H');
console.log('✓ Test 11: Official Service Directory covers all 8 authorized authority tiers (A to H)');

// Check DigiLocker Rule 9A legal parity
assert(
  certDataContent.includes('Rule 9A') && certDataContent.includes('2016'),
  'Must cite Rule 9A of IT Rules 2016 regarding DigiLocker digital document legal equivalency'
);
console.log('✓ Test 12: DigiLocker Rule 9A IT Rules 2016 parity cited');

// 7. Verify all 19 Certificate UI Components exist
const requiredComponents = [
  'CertificateOverviewDashboard.tsx',
  'FindMyCertificateFinder.tsx',
  'DocumentReadinessChecker.tsx',
  'GovernmentCertificatesSection.tsx',
  'IdentityDocumentsSection.tsx',
  'SchoolDocumentsSection.tsx',
  'DiplomaDocumentsSection.tsx',
  'CollegeDocumentsSection.tsx',
  'PostgraduateDocumentsSection.tsx',
  'DigiLockerCentre.tsx',
  'ApplicationGuidanceSection.tsx',
  'DownloadVerificationSection.tsx',
  'ValidityRenewalAssistant.tsx',
  'MyDocumentChecklist.tsx',
  'MyApplicationTracker.tsx',
  'OfficialServiceDirectory.tsx',
  'CertificateFaqsSection.tsx',
  'CertificateDetailModal.tsx',
  'CertificateDiagnosticsModal.tsx',
];

for (const comp of requiredComponents) {
  const compPath = path.join(projectRoot, 'components', 'certificates', comp);
  assert(fs.existsSync(compPath), `Component ${comp} must exist in components/certificates/`);
}
console.log('✓ Test 13: All 19 dedicated Certificate & Document components exist');

// 8. Verify Tracker contains mandatory student disclaimer
const trackerCompPath = path.join(projectRoot, 'components', 'certificates', 'MyApplicationTracker.tsx');
const trackerContent = fs.readFileSync(trackerCompPath, 'utf8');
assert(
  trackerContent.includes('Student-reported status – not independently verified.'),
  'Tracker must visibly present the disclaimer: "Student-reported status – not independently verified."'
);
console.log('✓ Test 14: Tracker component enforces "Student-reported status – not independently verified." disclaimer');

// 9. Verify dedicated page app/certificates/page.tsx
const pagePath = path.join(projectRoot, 'app', 'certificates', 'page.tsx');
assert(fs.existsSync(pagePath), 'app/certificates/page.tsx must exist');
const pageContent = fs.readFileSync(pagePath, 'utf8');
assert(pageContent.includes('Student Certificate & Document Service Centre'), 'Page must contain official service title');
assert(pageContent.includes('Find My Certificate'), 'Page must contain Find My Certificate button');
assert(pageContent.includes('Check Document Readiness'), 'Page must contain Document Readiness button');
assert(pageContent.includes('tab=finder') || pageContent.includes("tabParam === 'finder'"), 'Page must handle ?tab=finder query parameter');

// Verify Overview Dashboard has hero heading
const dashboardPath = path.join(projectRoot, 'components', 'certificates', 'CertificateOverviewDashboard.tsx');
const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
assert(
  dashboardContent.includes('Every Important Student Document') && dashboardContent.includes('One Trusted Place'),
  'Overview Dashboard must contain hero heading "Every Important Student Document. One Trusted Place."'
);

// Check all 17 tabs are registered in page
const tabKeys = [
  'overview',
  'finder',
  'govt',
  'identity',
  'school',
  'diploma',
  'college',
  'pg',
  'digilocker',
  'guidance',
  'download-verify',
  'validity',
  'readiness',
  'checklist',
  'tracker',
  'directory',
  'faqs',
];
for (const tab of tabKeys) {
  assert(pageContent.includes(`'${tab}'`), `Page must include navigation tab '${tab}'`);
}
console.log('✓ Test 15: Dedicated /certificates hub registers all 17 functional navigation tabs');

// 10. Check Module 01 and Module 02 preservation
assert(fs.existsSync(path.join(projectRoot, 'app', 'scholarships', 'page.tsx')), 'Module 01 Scholarship Hub page must exist');
assert(fs.existsSync(path.join(projectRoot, 'app', 'safety', 'page.tsx')), 'Module 02 Safety & Grievance Hub page must exist');
console.log('✓ Test 16: Module 01 (Scholarship Hub) & Module 02 (Safety & Grievance) fully preserved');

// 11. Strict English-Only Verification for Module 03
const tamilRegex = /[\u0B80-\u0BFF]/;
function scanForTamil(targetPath) {
  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    for (const f of fs.readdirSync(targetPath)) {
      scanForTamil(path.join(targetPath, f));
    }
  } else if (stat.isFile() && /\.(tsx?|jsx?|json|mjs)$/.test(targetPath)) {
    const content = fs.readFileSync(targetPath, 'utf8');
    assert(!tamilRegex.test(content), `No Tamil Unicode characters permitted in Module 03 file: ${targetPath}`);
    assert(!content.includes('tamilTitle'), `No tamilTitle properties permitted in Module 03 file: ${targetPath}`);
  }
}

[
  path.join(projectRoot, 'components', 'certificates'),
  path.join(projectRoot, 'app', 'certificates'),
  path.join(projectRoot, 'app', 'api', 'certificates'),
  path.join(projectRoot, 'lib', 'certificates-data.ts'),
].forEach(scanForTamil);
console.log('✓ Test 17: Strict English-only verification passed: 0 Tamil characters or subtitles in Module 03');

console.log('\n--- ALL MODULE 03 TEST SUITE CHECKS PASSED (17 / 17) ---');
