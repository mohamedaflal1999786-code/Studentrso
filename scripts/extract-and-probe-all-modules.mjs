import fs from 'fs';
import path from 'path';

const filesToScan = [
  { modId: 'mod-02', modName: 'Module 02 – Student Safety & Emergency Support', file: 'lib/safety-data.ts' },
  { modId: 'mod-03', modName: 'Module 03 – Certificate & Document Service', file: 'lib/certificates-data.ts' },
  { modId: 'mod-04', modName: 'Module 04 – Examination & Opportunities', file: 'lib/exams-data.ts' },
  { modId: 'mod-05', modName: 'Module 05 – AI Career Assistant & Job Readiness', file: 'app/career-assistant/page.tsx' },
  { modId: 'mod-06', modName: 'Module 06 – Student Admission & Education Continuity', file: 'lib/admissions-data.ts' },
  { modId: 'mod-07', modName: 'Module 07 – Academic Support & Mentorship', file: 'lib/academic-data.ts' },
  { modId: 'mod-08', modName: 'Module 08 – Verified Internships & Apprenticeships', file: 'lib/internship-data.ts' },
  { modId: 'mod-09', modName: 'Module 09 – Language, Soft-Skills & Confidence Lab', file: 'lib/skill-lab-data.ts' },
  { modId: 'mod-10', modName: 'Module 10 – Digital Safety & Cyber-Wellness Shield', file: 'lib/digital-safety-data.ts' },
];

// Scan components as well
const componentDirs = [
  'components/safety',
  'components/certificates',
  'components/exams',
  'components/career',
  'components/admissions',
  'components/academic-support',
  'components/internships',
  'components/skill-lab',
  'components/digital-safety',
];

const allUrls = [];

function extractUrlsFromCode(content, sourceFile, modId, modName) {
  const lines = content.split('\n');
  const urlRegex = /https?:\/\/[^\s"'`\),>]+/g;

  lines.forEach((line, lineNum) => {
    // Skip image urls or localhost or font links
    if (line.includes('lh3.googleusercontent.com') || line.includes('localhost') || line.includes('fonts.googleapis.com')) return;
    const matches = line.match(urlRegex);
    if (matches) {
      matches.forEach(rawUrl => {
        const cleanUrl = rawUrl.replace(/[;,\."'\\]+$/, '');
        if (cleanUrl.startsWith('http')) {
          allUrls.push({
            modId,
            modName,
            sourceFile,
            lineNum: lineNum + 1,
            url: cleanUrl,
            contextLine: line.trim().slice(0, 150)
          });
        }
      });
    }
  });
}

// Scan lib files
for (const item of filesToScan) {
  if (fs.existsSync(item.file)) {
    const text = fs.readFileSync(item.file, 'utf8');
    extractUrlsFromCode(text, item.file, item.modId, item.modName);
  }
}

// Scan component dirs
for (const cDir of componentDirs) {
  if (fs.existsSync(cDir)) {
    const files = fs.readdirSync(cDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
    for (const f of files) {
      const fullPath = path.join(cDir, f);
      const text = fs.readFileSync(fullPath, 'utf8');
      const modId = cDir.split('/')[1];
      extractUrlsFromCode(text, fullPath, modId, cDir);
    }
  }
}

console.log(`Extracted total ${allUrls.length} URL references across Modules 02 through 10.`);

// Deduplicate by URL
const uniqueMap = new Map();
for (const u of allUrls) {
  if (!uniqueMap.has(u.url)) {
    uniqueMap.set(u.url, {
      url: u.url,
      modules: new Set([u.modId]),
      occurrences: [u]
    });
  } else {
    uniqueMap.get(u.url).modules.add(u.modId);
    uniqueMap.get(u.url).occurrences.push(u);
  }
}

console.log(`Unique URLs across Modules 02 through 10: ${uniqueMap.size}`);

const output = Array.from(uniqueMap.values()).map(v => ({
  url: v.url,
  modules: Array.from(v.modules),
  occurrenceCount: v.occurrences.length,
  sampleSourceFile: v.occurrences[0].sourceFile,
  sampleLine: v.occurrences[0].lineNum,
  sampleContext: v.occurrences[0].contextLine
}));

fs.writeFileSync('scripts/all-modules-urls-inventory.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Saved inventory to scripts/all-modules-urls-inventory.json');
