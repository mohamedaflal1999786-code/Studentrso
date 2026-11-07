import fs from 'fs';

const csvContent = fs.readFileSync('temp-user-audited/scholarship-url-audit.csv', 'utf8');

// Parse CSV taking into account quoted fields
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
        i++; // skip escaped quote
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
console.log('Header:', header);
const records = parsed.slice(1).map(r => {
  const obj = {};
  header.forEach((h, idx) => {
    obj[h] = r[idx] || '';
  });
  return obj;
});

console.log('Total parsed records:', records.length);

// Count distinct updated URLs across information and application fields
const distinctUrls = new Set();
const infoStatuses = {};
const appStatuses = {};
let manualAppCount = 0;
let institutionalAppCount = 0;

records.forEach(r => {
  if (r['Updated information URL']) distinctUrls.add(r['Updated information URL']);
  if (r['Updated application URL']) distinctUrls.add(r['Updated application URL']);

  const infoStatus = r['Information URL audit status'];
  infoStatuses[infoStatus] = (infoStatuses[infoStatus] || 0) + 1;

  const appStatus = r['Application URL audit status'];
  appStatuses[appStatus] = (appStatuses[appStatus] || 0) + 1;

  if (appStatus === 'MANUAL VERIFICATION REQUIRED') {
    manualAppCount++;
  }
  if (appStatus.includes('INSTITUTION / DEPARTMENT PROCESS')) {
    institutionalAppCount++;
  }
});

console.log('\nDistinct updated URLs:', distinctUrls.size);
console.log('Manual app verification count:', manualAppCount);
console.log('Institutional app count:', institutionalAppCount);

console.log('\n--- Information URL Statuses ---');
console.table(infoStatuses);

console.log('\n--- Application URL Statuses ---');
console.table(appStatuses);

console.log('\n--- Distinct URLs List ---');
console.log(Array.from(distinctUrls));
