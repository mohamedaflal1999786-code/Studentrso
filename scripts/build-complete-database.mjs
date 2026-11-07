// scripts/build-complete-database.mjs
import fs from 'fs';
import path from 'path';

const outPath = path.join(process.cwd(), 'lib', 'exams-data.ts');
const header = fs.readFileSync(path.join(process.cwd(), 'scripts', 'exams-header.ts'), 'utf8');

console.log('Building full examination database...');
