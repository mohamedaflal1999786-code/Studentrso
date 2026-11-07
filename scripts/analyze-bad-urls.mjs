import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scripts/audit-results-all-modules.json', 'utf8'));

console.log('=== SUMMARY OF MULTI-MODULE PROBE ===');
const verdicts = {};
results.forEach(r => {
  verdicts[r.verdict] = (verdicts[r.verdict] || 0) + 1;
});
console.table(verdicts);

const broken = results.filter(r => r.verdict === 'BROKEN_404');
console.log(`\n=== 404 NOT FOUND URLS (${broken.length}) ===`);
console.table(broken.map(b => ({
  url: b.url,
  modules: b.modules.join(', '),
  file: b.sampleSourceFile,
  line: b.sampleLine
})));

const failed = results.filter(r => r.verdict === 'CONNECTION_FAILED' || r.verdict === 'TIMEOUT');
console.log(`\n=== CONNECTION FAILED / TIMEOUT (${failed.length}) ===`);
console.table(failed.map(f => ({
  url: f.url,
  modules: f.modules.join(', '),
  file: f.sampleSourceFile,
  line: f.sampleLine,
  error: (f.error || '').slice(0, 50)
})));

const redirected = results.filter(r => r.verdict === 'REDIRECTED');
console.log(`\n=== REDIRECTED DESTINATIONS (${redirected.length}) ===`);
console.table(redirected.map(r => ({
  oldUrl: r.url,
  finalUrl: r.finalUrl,
  modules: r.modules.join(', ')
})));
