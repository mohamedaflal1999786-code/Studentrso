import fs from 'fs';
import path from 'path';

const libDir = path.join(process.cwd(), 'lib');
const files = fs.readdirSync(libDir).filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));

const queries = [
  'naan mudhalvan',
  'epathshala',
  'elis',
  'e-content',
  'tngasa',
  'tnau',
  'tancet',
  'ceeta',
  'cuet',
  'csir',
  'cris',
  'ugc net',
  'ugc-net',
  'ibps',
  'tangedco',
  'tn-set',
  'tnset'
];

console.log('--- FINDING MATCHES ACROSS LIB ---');
for (const file of files) {
  const content = fs.readFileSync(path.join(libDir, file), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const l = line.toLowerCase();
    for (const q of queries) {
      if (l.includes(q) && (l.includes('http') || l.includes('url') || l.includes('title') || l.includes('id:'))) {
        console.log(`[${file}:${idx+1}] (${q}) -> ${line.trim()}`);
      }
    }
  });
}
