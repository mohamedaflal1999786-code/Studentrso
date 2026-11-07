import fs from 'fs';

const uData = fs.readFileSync('temp-user-audited/scholarships-data.ts', 'utf8');
const cData = fs.readFileSync('student-project-main/lib/scholarships-data.ts', 'utf8');
const csvData = fs.readFileSync('temp-user-audited/scholarship-url-audit.csv', 'utf8');

console.log('Comparing uploaded TS and current TS...');

// Check if uData has the updated URLs
const keywords = [
  'kotak-kanya-scholarship',
  'parivartanecss.com',
  'aicte.gov.in',
  'Reliance_Foundation_Scholarships_2026-27',
  'tatacapital.com/sustainability/education.html',
  'tnadw.top',
  'tnadwscholarship.in'
];

for (const kw of keywords) {
  console.log(`Keyword "${kw}": in uData? ${uData.includes(kw)}, in cData? ${cData.includes(kw)}`);
}
