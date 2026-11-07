// scripts/audit-scholarships-full.mjs
// Inspects and audits all 52 scholarships in GENUINE_SCHOLARSHIP_CATALOGUE

import fs from 'fs';
import path from 'path';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from '../lib/scholarships-data.ts';

console.log(`Total scholarships in catalogue: ${GENUINE_SCHOLARSHIP_CATALOGUE.length}`);

const uniqueUrls = new Set();
const records = [];

for (const s of GENUINE_SCHOLARSHIP_CATALOGUE) {
  if (s.officialApplicationUrl) uniqueUrls.add(s.officialApplicationUrl);
  if (s.officialGuidelinesUrl) uniqueUrls.add(s.officialGuidelinesUrl);
  
  records.push({
    id: s.id,
    name: s.name,
    category: s.category,
    provider: s.provider || s.officialAuthority,
    appUrl: s.officialApplicationUrl,
    guideUrl: s.officialGuidelinesUrl,
    lifecycleStatus: s.lifecycleStatus,
    academicYear: s.academicYear,
  });
}

console.log(`Unique URLs found across the 52 scholarships: ${uniqueUrls.size}`);
console.log('Sample records:');
console.log(records.slice(0, 5));

fs.writeFileSync(
  'scripts/audit-initial-dump.json',
  JSON.stringify({ total: records.length, uniqueUrlsCount: uniqueUrls.size, uniqueUrls: Array.from(uniqueUrls), records }, null, 2),
  'utf8'
);
console.log('Written to scripts/audit-initial-dump.json');
