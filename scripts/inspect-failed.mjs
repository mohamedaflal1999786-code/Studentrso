import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scripts/audit-results-all-modules.json', 'utf8'));
const failed = results.filter(r => r.verdict === 'CONNECTION_FAILED' || r.verdict === 'TIMEOUT');

console.log('Failed items count:', failed.length);
failed.forEach((f, idx) => {
  console.log(`${idx + 1}. [${f.modules.join(', ')}] ${f.url} -> Error: ${f.error}`);
});
