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
const header = parsed[0].map(h => h.trim().replace(/^\ufeff/, ''));
const records = parsed.slice(1).map(r => {
  const obj = {};
  header.forEach((h, idx) => {
    obj[h] = r[idx] || '';
  });
  return obj;
});

console.log('Sample record:');
console.log(records[0]);

// Output JSON file for easy reading
fs.writeFileSync('student-project-main/scripts/parsed-audit-records.json', JSON.stringify(records, null, 2));
console.log('Wrote 52 parsed audit records to student-project-main/scripts/parsed-audit-records.json');
