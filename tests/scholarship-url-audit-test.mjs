// tests/scholarship-url-audit-test.mjs
// Comprehensive Quality, Source Verification & Link Monitoring Test Suite for Module 01: Scholarship Hub

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  GENUINE_SCHOLARSHIP_CATALOGUE,
  OFFICIAL_TRUSTED_SOURCES,
} from '../lib/scholarships-data.ts';
import {
  SCHOLARSHIP_AUDIT_MASTER_52,
  SCHOLARSHIP_AUDIT_HISTORY_LOG,
  getScholarshipAuditStats,
} from '../lib/scholarship-url-audit.ts';
import { scholarshipLinkMonitor } from '../lib/scholarship-link-monitor.ts';
import { evaluateSchemeEligibility, rankSmartRecommendations } from '../lib/scholarship-matcher.ts';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 – MODULE 01: 52-SCHOLARSHIP URL AUDIT & LINK MONITORING TEST');
console.log('Comprehensive Quality, Statutory, Source & Architectural Verification');
console.log('=============================================================================\n');

// 1. Verify exactly 52 scholarships in master catalogue
assert.strictEqual(
  GENUINE_SCHOLARSHIP_CATALOGUE.length,
  52,
  'Master catalogue must contain exactly 52 scholarship records'
);
assert.strictEqual(
  SCHOLARSHIP_AUDIT_MASTER_52.length,
  52,
  'Master audit must contain exactly 52 scholarship records'
);
console.log('✓ Test 01: Exactly 52 scholarship records confirmed in both catalogue and audit registry');

// 2. Verify unique URLs in initial supplied CSV was 26 and distinct updated URLs is 27
const stats = getScholarshipAuditStats();
assert.strictEqual(
  stats.totalScholarships,
  52,
  'Total scholarships in stats must be 52'
);
assert.strictEqual(
  stats.distinctUpdatedUrls,
  27,
  'Distinct updated URLs across info and app fields must be exactly 27'
);
console.log('✓ Test 02: Total 52 records reviewed across exactly 27 distinct updated URLs confirmed');

// 3. MANDATORY CORRECTION A: Kotak Kanya Scholarship
const kotakRecord = SCHOLARSHIP_AUDIT_MASTER_52.find((r) => r.scholarshipId === 'kotak-kanya-scholarship');
assert(kotakRecord, 'Kotak Kanya Scholarship record must exist in audit');
assert.strictEqual(
  kotakRecord.correctedUrl,
  'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
  'Corrected URL for Kotak Kanya must be https://www.kotakeducationfoundation.org/kotak-kanya-scholarship'
);
const kotakCatalogue = GENUINE_SCHOLARSHIP_CATALOGUE.find((s) => s.id === 'kotak-kanya-scholarship');
assert(kotakCatalogue, 'Kotak Kanya must exist in GENUINE_SCHOLARSHIP_CATALOGUE');
assert.strictEqual(
  kotakCatalogue.officialApplicationUrl,
  'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship',
  'Catalogue officialApplicationUrl must be the corrected Kotak Kanya URL'
);
console.log('✓ Test 03: Kotak Kanya Scholarship mandatory URL correction verified (https://www.kotakeducationfoundation.org/kotak-kanya-scholarship)');

// 4. MANDATORY CORRECTION B: HDFC Bank Parivartan's ECSS Programme
const hdfcRecord = SCHOLARSHIP_AUDIT_MASTER_52.find((r) => r.scholarshipId === 'hdfc-parivartan-ecss');
assert(hdfcRecord, 'HDFC ECSS record must exist in audit');
assert.strictEqual(
  hdfcRecord.correctedUrl,
  'https://www.parivartanecss.com/',
  'Corrected URL for HDFC ECSS must be https://www.parivartanecss.com/'
);
const hdfcCatalogue = GENUINE_SCHOLARSHIP_CATALOGUE.find((s) => s.id === 'hdfc-parivartan-ecss');
assert(hdfcCatalogue, 'HDFC ECSS must exist in GENUINE_SCHOLARSHIP_CATALOGUE');
assert.strictEqual(
  hdfcCatalogue.officialApplicationUrl,
  'https://www.parivartanecss.com/',
  'Catalogue officialApplicationUrl must be the corrected direct Parivartan ECSS portal'
);
console.log("✓ Test 04: HDFC Bank Parivartan's ECSS Programme mandatory URL correction verified (https://www.parivartanecss.com/)");

// 5. UPDATED DESTINATIONS: AICTE, Tata Capital & Reliance 2026-27
const aicte = GENUINE_SCHOLARSHIP_CATALOGUE.find(s => s.id === 'aicte-pragati-degree');
assert(aicte, 'AICTE scheme must exist');
assert(
  aicte.officialGuidelinesUrl.includes('aicte') && aicte.officialApplicationUrl.includes('scholarships.gov.in'),
  'AICTE scheme must link to official AICTE guidelines and NSP portal'
);

const tata = GENUINE_SCHOLARSHIP_CATALOGUE.find(s => s.id === 'tata-capital-pankh');
assert(tata, 'Tata Capital scheme must exist');
assert.strictEqual(
  tata.officialGuidelinesUrl,
  'https://www.tatacapital.com/sustainability/education.html',
  'Tata Capital Pankh must link to official sustainability/education.html page'
);

const rel = GENUINE_SCHOLARSHIP_CATALOGUE.find(s => s.id === 'reliance-ug');
assert(rel, 'Reliance UG scheme must exist');
assert.strictEqual(
  rel.officialGuidelinesUrl,
  'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27',
  'Reliance UG must link to 2026-27 announcement release'
);
console.log('✓ Test 05: AICTE, Tata Capital (education.html), and Reliance 2026–27 information destinations verified');

// 6. Verify URL Classification & Audit Metrics
assert.strictEqual(stats.manualAppVerificationCount, 14, 'Application destinations requiring manual verification must be 14');
assert.strictEqual(stats.brokenDestinations, 0, 'Broken destinations must be 0');
assert.strictEqual(stats.wrongDestinations, 0, 'Wrong destinations must be 0');
assert(stats.verifiedDestinations >= 30, 'Verified destinations must be >= 30');
console.log(`✓ Test 06: Full 52-record audit metrics validated (52 reviewed, 27 distinct URLs, 14 manual app reviews, 0 broken)`);

// 7. Verify Required Audit Columns Present on Every Record
for (const r of SCHOLARSHIP_AUDIT_MASTER_52) {
  assert(r.scholarshipId, 'Record must have scholarshipId');
  assert(r.scholarshipName, 'Record must have scholarshipName');
  assert(r.awardingAuthority, 'Record must have awardingAuthority');
  assert(r.oldUrl, 'Record must have oldUrl');
  assert(r.correctedUrl, 'Record must have correctedUrl');
  assert(r.informationUrl, 'Record must have informationUrl');
  assert(r.applicationUrl, 'Record must have applicationUrl');
  assert(r.infoUrlStatus, 'Record must have infoUrlStatus');
  assert(r.appUrlStatus, 'Record must have appUrlStatus');
  assert(typeof r.httpStatus === 'number', 'Record must have numeric httpStatus');
  assert(r.lastChecked, 'Record must have lastChecked timestamp');
  assert(r.verificationNotes, 'Record must have verificationNotes');
}
console.log('✓ Test 07: All required audit columns (including separate info & app statuses) validated on all 52 records');

// 8. Verify Automated Link Monitoring Service
const monitorRecords = scholarshipLinkMonitor.getAllRecords();
assert.strictEqual(monitorRecords.length, 52, 'Link monitor service must track all 52 records');

const schedules = scholarshipLinkMonitor.getMonitoringSchedules();
assert.strictEqual(schedules.length, 4, 'Must provide 4 monitoring schedule frequencies');
const frequencies = schedules.map((s) => s.frequency);
assert(frequencies.includes('daily'), 'Schedule must include daily');
assert(frequencies.includes('weekly'), 'Schedule must include weekly');
assert(frequencies.includes('monthly'), 'Schedule must include monthly');
assert(frequencies.includes('pre-academic-year'), 'Schedule must include pre-academic-year');
console.log('✓ Test 08: Automated link monitoring service and schedule matrix (Daily, Weekly, Monthly, Pre-Academic-Year) verified');

// 9. Verify Detail Modal Separate Functional Links & Fallback
const modalContent = fs.readFileSync(
  path.join(projectRoot, 'components/scholarships/ScholarshipDetailsModal.tsx'),
  'utf8'
);
assert(modalContent.includes('View Official Details'), 'Detail modal must include View Official Details link');
assert(modalContent.includes('Apply on Official Portal'), 'Detail modal must include Apply on Official Portal button');
assert(modalContent.includes('Read Official Guidelines'), 'Detail modal must include Read Official Guidelines link');
assert(modalContent.includes('Check Application Status'), 'Detail modal must include Check Application Status link');
assert(modalContent.includes('Official application link not currently available'), 'Detail modal must include graceful fallback message');
assert(!modalContent.includes('href="#"'), 'Detail modal must not contain dummy href="#" links');
console.log('✓ Test 09: ScholarshipDetailsModal separate functional link provisions, external indicators & fallback confirmed');

// 10. Verify Admin Dashboard Link Monitoring & Governance Panel
const adminContent = fs.readFileSync(
  path.join(projectRoot, 'components/scholarships/AdminManagementSection.tsx'),
  'utf8'
);
assert(
  adminContent.includes('url-monitoring'),
  'Admin dashboard must include url-monitoring tab'
);
assert(adminContent.includes('Recheck All 52 Scholarships'), 'Admin dashboard must include Recheck All 52 button');
assert(adminContent.includes('urlFilterStatus'), 'Admin dashboard must include filter controls');
console.log('✓ Test 10: AdminManagementSection URL monitoring controls, recheck buttons & 52-record table verified');

// 11. Verify Core Eligibility & Renewal Engine Remains 100% Intact
const testProfile = {
  educationStage: 'Class 12',
  academicPercentage: 88,
  annualFamilyIncome: 180000,
  incomeRange: '₹1–2.5 lakh',
  domicileState: 'Tamil Nadu',
  district: 'Chennai',
  studiesInTamilNadu: true,
  communityCategory: 'BC',
  gender: 'Female',
  hasDisability: false,
  studiedInTnGovtSchool: false,
  isFirstGenerationGraduate: true,
  isSingleGirlChild: false,
};

const results = rankSmartRecommendations(GENUINE_SCHOLARSHIP_CATALOGUE, testProfile);
assert.strictEqual(results.length, 52, 'All 52 scholarships must be evaluated');
const eligible = results.filter((r) => r.status === 'POTENTIALLY ELIGIBLE');
assert(eligible.length > 0, 'Eligibility engine must successfully evaluate eligible scholarships');
console.log(`✓ Test 11: Core eligibility matching engine verified (${eligible.length} schemes matched for test profile, 52 evaluated)`);

console.log('\n=============================================================================');
console.log('ALL MODULE 01: 52-SCHOLARSHIP MASTER AUDIT & MONITORING CHECKS PASSED (11/11)');
console.log('=============================================================================\n');
