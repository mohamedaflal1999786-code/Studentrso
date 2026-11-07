// scripts/map-all-52.mjs
import fs from 'fs';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from '../lib/scholarships-data.ts';

const detailedList = GENUINE_SCHOLARSHIP_CATALOGUE.map((s, idx) => ({
  index: idx + 1,
  id: s.id,
  name: s.name,
  code: s.code || s.officialCode || '',
  category: s.category,
  provider: s.provider || s.officialAuthority,
  appUrl: s.officialApplicationUrl,
  guideUrl: s.officialGuidelinesUrl,
  notificationUrl: s.notificationSource?.notificationBulletinUrl || '',
  lifecycleStatus: s.lifecycleStatus,
  academicYear: s.academicYear || '2025-26',
}));

console.log(JSON.stringify(detailedList, null, 2));
fs.writeFileSync('scripts/52-scholarships-inventory.json', JSON.stringify(detailedList, null, 2), 'utf8');
