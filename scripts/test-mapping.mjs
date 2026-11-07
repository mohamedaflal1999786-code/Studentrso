import fs from 'fs';

const csvContent = fs.readFileSync('temp-user-audited/scholarship-url-audit.csv', 'utf8');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(current);
      current = '';
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
    } else {
      current += char;
    }
  }
  if (current || row.length > 0) {
    row.push(current);
    lines.push(row);
  }
  return lines;
}

const parsed = parseCSV(csvContent);
const header = parsed[0];
const records = parsed.slice(1).map(r => {
  const obj = {};
  header.forEach((h, idx) => {
    obj[h.trim().replace(/^\ufeff/, '')] = r[idx] || '';
  });
  return obj;
});

const cData = fs.readFileSync('student-project-main/lib/scholarships-data.ts', 'utf8');

console.log('Total audited CSV records:', records.length);

const missing = [];
for (const r of records) {
  const id = r['Scholarship ID'];
  if (!cData.includes(`id: '${id}'`) && !cData.includes(`id: "${id}"`)) {
    missing.push(id);
  }
}

console.log('Missing IDs in cData:', missing);
