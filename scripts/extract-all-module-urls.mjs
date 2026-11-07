import fs from 'fs';
import path from 'path';

const files = {
  'Module 02 (Safety)': 'lib/safety-data.ts',
  'Module 03 (Certificates)': 'lib/certificates-data.ts',
  'Module 04 (Exams)': 'lib/exams-data.ts',
  'Module 05 (Career Assistant)': 'app/career-assistant/page.tsx',
  'Module 06 (Admissions)': 'lib/admissions-data.ts',
  'Module 07 (Academic Support)': 'lib/academic-data.ts',
  'Module 08 (Internships)': 'lib/internship-data.ts',
  'Module 09 (Skill Lab)': 'lib/skill-lab-data.ts',
  'Module 10 (Digital Safety)': 'lib/digital-safety-data.ts',
};

const moduleUrls = {};

for (const [modName, relPath] of Object.entries(files)) {
  if (!fs.existsSync(relPath)) {
    console.log(`File not found: ${relPath}`);
    continue;
  }
  const content = fs.readFileSync(relPath, 'utf8');
  // Match URLs
  const urlRegex = /https?:\/\/[^\s"'`\),>]+/g;
  const matches = content.match(urlRegex) || [];
  
  // Clean trailing punctuation or escaped chars
  const cleaned = Array.from(new Set(matches.map(u => u.replace(/[;,\."'\\]+$/, ''))));
  moduleUrls[modName] = cleaned;
  console.log(`${modName}: found ${cleaned.length} unique URLs in ${relPath}`);
}

console.log('\nTotal unique URLs across all modules 02-10:');
const allUnique = new Set();
for (const urls of Object.values(moduleUrls)) {
  urls.forEach(u => allUnique.add(u));
}
console.log(`Total: ${allUnique.size} unique URLs.`);

fs.writeFileSync('scripts/extracted-all-module-urls.json', JSON.stringify(moduleUrls, null, 2), 'utf8');
