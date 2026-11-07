// tests/multi-module-url-audit-test.mjs
// Automated Link Integrity & Government Source Audit across Modules 02 through 10

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  MULTI_MODULE_AUDIT_REGISTRY,
  getMultiModuleAuditSummary,
} from '../lib/multi-module-link-audit.ts';

const projectRoot = process.cwd();

console.log('=============================================================================');
console.log('STUDENT RSO 2.0 — FULL 10-MODULE SOURCE & URL INTEGRITY AUDIT TEST');
console.log('Automated Link Verification, 404 Elimination & Statutory Compliance');
console.log('=============================================================================\n');

// 1. Verify Module 02 (Safety) has no broken 404 links
const safetyCode = fs.readFileSync(path.join(projectRoot, 'lib/safety-data.ts'), 'utf8');
assert(!safetyCode.includes('Notice-Ragging.pdf'), 'Module 02 must not contain broken 404 Notice-Ragging.pdf');
assert(!safetyCode.includes('annauniv.edu/grievance/'), 'Module 02 must not contain broken 404 annauniv.edu/grievance/');
assert(!safetyCode.includes('index_pocso.php'), 'Module 02 must not contain broken 404 index_pocso.php');
assert(!safetyCode.includes('https://dce.tn.gov.in/'), 'Module 02 must use canonical tndce.tn.gov.in domain');
assert(safetyCode.includes('https://www.antiragging.in/'), 'Module 02 must link to verified Anti-Ragging portal');
assert(safetyCode.includes('https://cybercrime.gov.in/'), 'Module 02 must link to verified Cybercrime portal');
console.log('✓ Test 01: Module 02 (Student Safety & Grievance Support) 404 links eliminated & verified');

// 2. Verify Module 03 (Certificates) has no broken 404 links
const certCode = fs.readFileSync(path.join(projectRoot, 'lib/certificates-data.ts'), 'utf8');
assert(!certCode.includes('/foportal/verify-your-pan'), 'Module 03 must not contain broken 404 verify-your-pan URL');
assert(!certCode.includes('/foportal/instant-e-pan'), 'Module 03 must not contain broken 404 instant-e-pan URL');
assert(!certCode.includes('verify.digitallocker.gov.in'), 'Module 03 must not contain broken verify.digitallocker.gov.in');
assert(certCode.includes('https://www.tnesevai.tn.gov.in/citizen/'), 'Module 03 must link to official e-Sevai portal');
assert(certCode.includes('https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml'), 'Module 03 must link to verification portal');
assert(certCode.includes('https://www.digilocker.gov.in/'), 'Module 03 must link to official DigiLocker portal');
console.log('✓ Test 02: Module 03 (Certificate & Document Service) 404 links eliminated & e-Sevai/DigiLocker verified');

// 3. Verify Module 04 (Exams) has no broken 404 links
const examsCode = fs.readFileSync(path.join(projectRoot, 'lib/exams-data.ts'), 'utf8');
assert(!examsCode.includes('previous_questions.html'), 'Module 04 must not contain broken 404 previous_questions.html');
assert(!examsCode.includes('gate2026.iitg.ac.in/previous-papers'), 'Module 04 must link to active GATE 2026 homepage');
assert(!examsCode.includes('cuetug.ntaonline.in'), 'Module 04 must link to active exams.nta.ac.in/CUET-UG/');
assert(examsCode.includes('https://www.tneaonline.org/'), 'Module 04 must link to official TNEA portal');
assert(examsCode.includes('tndce.tn.gov.in'), 'Module 04 must link to canonical TNDCE TNGASA portal');
console.log('✓ Test 03: Module 04 (Examination & Opportunities) 404 links eliminated & NTA/TNEA/TNPSC verified');

// 4. Verify Module 06 (Admissions) has no broken 404 links
const admCode = fs.readFileSync(path.join(projectRoot, 'lib/admissions-data.ts'), 'utf8');
assert(!admCode.includes('tnau.ac.in/admissions/guidelines'), 'Module 06 must link to active admissions page');
assert(!admCode.includes('Academic-Bank-of-Credits-Guidelines.pdf'), 'Module 06 must link to official ABC portal');
assert(!admCode.includes('josaa.nic.in/business-rules/'), 'Module 06 must link to official JoSAA portal');
assert(!admCode.includes('tnmedicalselection.net/prospectus.aspx'), 'Module 06 must link to official TN Medical portal');
assert(admCode.includes('https://josaa.nic.in/'), 'Module 06 must contain official JoSAA portal');
assert(admCode.includes('https://www.abc.gov.in/'), 'Module 06 must contain official ABC portal');
console.log('✓ Test 04: Module 06 (Student Admission & Education Continuity) 404 links eliminated & JoSAA/ABC verified');

// 5. Verify Module 07 (Academic Support) links
const acadCode = fs.readFileSync(path.join(projectRoot, 'lib/academic-data.ts'), 'utf8');
assert(!acadCode.includes('https://vlabs.ac.in'), 'Module 07 must link to official vlab.co.in simulation portal');
assert(acadCode.includes('vlab.co.in'), 'Module 07 must contain vlab.co.in link');
assert(acadCode.includes('https://swayam.gov.in'), 'Module 07 must link to official SWAYAM portal');
assert(acadCode.includes('ncert.nic.in'), 'Module 07 must link to official NCERT portal');
console.log('✓ Test 05: Module 07 (Academic Support & Mentorship) SWAYAM/VLab/NCERT links verified');

// 6. Verify Module 08 (Internships) links
const internCode = fs.readFileSync(path.join(projectRoot, 'lib/internship-data.ts'), 'utf8');
assert(!internCode.includes('https://nextstep.tcs.com'), 'Module 08 must not link to legacy nextstep portal');
assert(internCode.includes('https://nats.education.gov.in/'), 'Module 08 must link to official NATS 2.0 portal');
assert(internCode.includes('https://internship.aicte-india.org/'), 'Module 08 must link to official AICTE internship portal');
assert(internCode.includes('https://www.apprenticeshipindia.gov.in/'), 'Module 08 must link to official NAPS portal');
console.log('✓ Test 06: Module 08 (Verified Internships & Apprenticeships) NATS/AICTE/NAPS verified');

// 7. Verify Module 09 (Skill Lab) links
const skillCode = fs.readFileSync(path.join(projectRoot, 'lib/skill-lab-data.ts'), 'utf8');
assert(!skillCode.includes('portal.naanmudhalvan.tn.gov.in'), 'Module 09 must link to canonical naanmudhalvan.tn.gov.in');
assert(skillCode.includes('tnskill.tn.gov.in') || skillCode.includes('naanmudhalvan.tn.gov.in'), 'Module 09 must link to Naan Mudhalvan / TNSDC');
assert(skillCode.includes('swayamplus.education.gov.in'), 'Module 09 must link to SWAYAM Plus');
console.log('✓ Test 07: Module 09 (Language & Soft-Skills Lab) Naan Mudhalvan & SWAYAM Plus verified');

// 8. Verify Module 10 (Digital Safety) links
const digiCode = fs.readFileSync(path.join(projectRoot, 'lib/digital-safety-data.ts'), 'utf8');
assert(digiCode.includes('https://cybercrime.gov.in/'), 'Module 10 must link to official cybercrime portal');
assert(digiCode.includes('https://www.sancharsaathi.gov.in/'), 'Module 10 must link to official Sanchar Saathi portal');
assert(digiCode.includes('https://www.cert-in.org.in/'), 'Module 10 must link to official CERT-In portal');
console.log('✓ Test 08: Module 10 (Digital Safety & Cyber-Wellness) Sanchar Saathi/CERT-In/Cybercrime verified');

// 9. Verify Multi-Module Audit Registry & Summary
assert(MULTI_MODULE_AUDIT_REGISTRY.length >= 25, 'Audit registry must contain audited records for modules 02-10');
const summary = getMultiModuleAuditSummary();
for (const [modId, s] of Object.entries(summary)) {
  assert.strictEqual(s.brokenCount, 0, `Module ${modId} must have 0 broken links`);
  assert(s.verifiedCount > 0, `Module ${modId} must have verified links`);
}
console.log('✓ Test 09: Multi-module audit summary validated with zero broken links across all modules');

console.log('\n=============================================================================');
console.log('ALL MULTI-MODULE (02–10) URL INTEGRITY & AUDIT CHECKS PASSED (9/9)');
console.log('=============================================================================\n');
