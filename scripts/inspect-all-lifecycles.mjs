import { GENUINE_SCHOLARSHIP_CATALOGUE } from '../lib/scholarships-data.ts';

console.log('Inspecting current lifecycleStatus and deadlines:');
const rows = GENUINE_SCHOLARSHIP_CATALOGUE.map(s => {
  const v = s.versions[0];
  return {
    id: s.id,
    name: s.name.slice(0, 40),
    category: s.category,
    status: v?.lifecycleStatus,
    start: v?.applicationStartDate,
    deadline: v?.applicationDeadline
  };
});

console.table(rows);
