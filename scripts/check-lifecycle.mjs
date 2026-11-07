import { GENUINE_SCHOLARSHIP_CATALOGUE } from '../lib/scholarships-data.ts';

const list = ['hdfc-parivartan-ecss', 'kotak-kanya-scholarship'];

for (const id of list) {
  const s = GENUINE_SCHOLARSHIP_CATALOGUE.find(x => x.id === id);
  console.log(`\n=== ${id} ===`);
  console.log('Name:', s.name);
  console.log('Versions:', JSON.stringify(s.versions, null, 2));
}

// Let's also check all scholarships and their current lifecycleStatus
console.log('\n=== ALL SCHOLARSHIPS LIFECYCLE STATUSES ===');
const statusCounts = {};
const upcomingList = [];
const openList = [];

for (const s of GENUINE_SCHOLARSHIP_CATALOGUE) {
  const currentVer = s.versions?.find(v => v.isCurrentVersion) || s.versions?.[0];
  const st = currentVer?.lifecycleStatus || 'Unknown';
  statusCounts[st] = (statusCounts[st] || 0) + 1;
  if (st === 'Upcoming') {
    upcomingList.push({ id: s.id, name: s.name, year: currentVer?.academicYear, appUrl: s.officialApplicationUrl });
  } else if (st === 'Open') {
    openList.push({ id: s.id, name: s.name, year: currentVer?.academicYear, deadline: currentVer?.applicationDeadline });
  }
}

console.log('Status Counts:', statusCounts);
console.log('\nUpcoming List:');
console.table(upcomingList);

console.log('\nOpen List:');
console.table(openList);
