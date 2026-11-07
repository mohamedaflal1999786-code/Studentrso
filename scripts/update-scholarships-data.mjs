import fs from 'fs';

const records = JSON.parse(fs.readFileSync('student-project-main/scripts/parsed-audit-records.json', 'utf8'));
const recordsMap = new Map();
records.forEach(r => recordsMap.set(r['Scholarship ID'], r));

let code = fs.readFileSync('student-project-main/lib/scholarships-data.ts', 'utf8');

// 1. Update interface ComprehensiveScholarship
const ifaceSnippet = `export interface ComprehensiveScholarship {`;
const ifaceSnippetNew = `export interface ScholarshipVerificationHistoryEntry {
  checkedAt: string;
  checkedBy: string;
  infoStatus: string;
  appStatus: string;
  notes?: string;
  evidenceRefs?: string;
}

export interface ComprehensiveScholarship {`;

if (!code.includes('ScholarshipVerificationHistoryEntry')) {
  code = code.replace(ifaceSnippet, ifaceSnippetNew);
}

// Add infoUrlVerificationStatus, appUrlVerificationStatus, evidenceRefs, urlVerificationHistory to ComprehensiveScholarship interface
if (!code.includes('infoUrlVerificationStatus?:')) {
  code = code.replace(
    `  urlVerificationStatus?: 'VERIFIED' | 'REDIRECTED' | 'BROKEN' | 'WRONG DESTINATION' | 'OUTDATED' | 'NOT YET PUBLISHED' | 'MANUAL VERIFICATION REQUIRED';`,
    `  urlVerificationStatus?: 'VERIFIED' | 'REDIRECTED' | 'BROKEN' | 'WRONG DESTINATION' | 'OUTDATED' | 'NOT YET PUBLISHED' | 'MANUAL VERIFICATION REQUIRED' | string;
  infoUrlVerificationStatus?: string;
  appUrlVerificationStatus?: string;
  evidenceRefs?: string;
  urlVerificationHistory?: ScholarshipVerificationHistoryEntry[];`
  );
}

// 2. Update OFFICIAL_TRUSTED_SOURCES
const sourcesSnippetStart = `export const OFFICIAL_TRUSTED_SOURCES = [`;
const sourcesSnippetEnd = `];`;
const newSources = `export const OFFICIAL_TRUSTED_SOURCES = [
  { id: 'src-nsp', name: 'National Scholarship Portal (NSP)', portalUrl: 'https://scholarships.gov.in/All-Scholarships', domain: 'scholarships.gov.in', category: 'Central Government' },
  { id: 'src-tn-bcmbc', name: 'Tamil Nadu BC/MBC/DNC Welfare Department', portalUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm', domain: 'bcmbcmw.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-adw', name: 'Tamil Nadu Adi Dravidar Welfare Department', portalUrl: 'https://tnadwscholarship.in/', domain: 'tnadwscholarship.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-tils', name: 'Tamil Nadu Schemes Portal (Pudhumai Penn / Tamil Pudhalvan)', portalUrl: 'https://tils.tn.gov.in/schemes', domain: 'tils.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-tn-dce', name: 'Tamil Nadu Directorate of Collegiate Education', portalUrl: 'https://tndce.tn.gov.in/Home/scholarship', domain: 'tndce.tn.gov.in', category: 'Tamil Nadu Government' },
  { id: 'src-ugc', name: 'University Grants Commission (UGC) Student Corner', portalUrl: 'https://www.ugc.gov.in/Home/student_Corner', domain: 'ugc.gov.in', category: 'UGC' },
  { id: 'src-aicte', name: 'AICTE Student Development Schemes', portalUrl: 'https://www.aicte.gov.in/schemes/students-development-schemes', domain: 'aicte.gov.in', category: 'AICTE' },
  { id: 'src-mota', name: 'Ministry of Tribal Affairs', portalUrl: 'https://tribal.nic.in/ScholarshiP.aspx', domain: 'tribal.nic.in', category: 'Central Government' },
  { id: 'src-icar', name: 'Indian Council of Agricultural Research (ICAR)', portalUrl: 'https://icar.org.in/', domain: 'icar.org.in', category: 'ICAR' },
  { id: 'src-dic', name: 'Digital India Corporation (Visvesvaraya PhD Scheme)', portalUrl: 'https://phd.dic.gov.in/', domain: 'phd.dic.gov.in', category: 'Central Government' },
  { id: 'src-pmrf', name: 'PMRF National Coordinating Institute (IIT Madras)', portalUrl: 'https://www.pmrf.in/', domain: 'pmrf.in', category: 'Central Government' },
  { id: 'src-serb', name: 'Science and Engineering Research Board (SERB / ANRF)', portalUrl: 'https://www.serbonline.in/', domain: 'serbonline.in', category: 'Research Council' },
  { id: 'src-vidyadhan', name: 'Sarojini Damodaran Foundation (Vidyadhan)', portalUrl: 'https://www.vidyadhan.org/', domain: 'vidyadhan.org', category: 'Institution / Foundation' },
  { id: 'src-reliance', name: 'Reliance Foundation Scholarships', portalUrl: 'https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27', domain: 'reliancefoundation.org', category: 'Institution / Foundation' },
  { id: 'src-tata', name: 'Tata Capital Education & Sustainability', portalUrl: 'https://www.tatacapital.com/sustainability/education.html', domain: 'tatacapital.com', category: 'Institution / Foundation' },
  { id: 'src-hdfc', name: 'HDFC Bank Parivartan ECSS', portalUrl: 'https://www.parivartanecss.com/', domain: 'parivartanecss.com', category: 'Institution / Foundation' },
  { id: 'src-kotak', name: 'Kotak Education Foundation', portalUrl: 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship', domain: 'kotakeducationfoundation.org', category: 'Institution / Foundation' },
  { id: 'src-jindal', name: 'Sitaram Jindal Foundation', portalUrl: 'https://www.sitaramjindalfoundation.org/', domain: 'sitaramjindalfoundation.org', category: 'Institution / Foundation' },
];`;

const sStartIdx = code.indexOf(sourcesSnippetStart);
const sEndIdx = code.indexOf(sourcesSnippetEnd, sStartIdx);
if (sStartIdx !== -1 && sEndIdx !== -1) {
  code = code.slice(0, sStartIdx) + newSources + code.slice(sEndIdx + sourcesSnippetEnd.length);
}

// 3. Update each scholarship in GENUINE_SCHOLARSHIP_CATALOGUE
// We will locate each scheme by `id: '${r.id}'`
for (const [id, r] of recordsMap.entries()) {
  const needle = `id: '${id}'`;
  const idx = code.indexOf(needle);
  if (idx === -1) {
    console.error(`Could not find scheme ${id}`);
    continue;
  }

  // Find the boundary of this scholarship object
  // It ends before the next `id: '` or before `export const GENUINE_SCHOLARSHIP_PROGRAMS`
  let nextIdx = code.indexOf(`\n    id: '`, idx + needle.length);
  if (nextIdx === -1) {
    nextIdx = code.indexOf(`\n  },\n  {`, idx + needle.length);
  }
  if (nextIdx === -1) {
    nextIdx = code.indexOf(`\n];\n\nexport const GENUINE_SCHOLARSHIP_PROGRAMS`, idx + needle.length);
  }
  const chunk = code.slice(idx, nextIdx);

  // Determine urlVerificationStatus
  let overallStatus = 'VERIFIED';
  if (r['Application URL audit status'].includes('MANUAL') || r['Information URL audit status'].includes('MANUAL') || r['Information URL audit status'].includes('REVIEW') || r['Information URL audit status'].includes('OUTDATED')) {
    overallStatus = 'MANUAL VERIFICATION REQUIRED';
  } else if (r['Information URL audit status'].includes('REDIRECT')) {
    overallStatus = 'REDIRECTED';
  }

  // Tracking facility
  const hasTracking = r['Updated application URL'].includes('scholarships.gov.in') || id === 'kotak-kanya-scholarship' || id === 'hdfc-parivartan-ecss';
  const trackingUrl = r['Updated application URL'].includes('scholarships.gov.in')
    ? 'https://scholarships.gov.in/All-Scholarships'
    : id === 'kotak-kanya-scholarship'
    ? 'https://www.kotakeducationfoundation.org/kotak-kanya-scholarship'
    : id === 'hdfc-parivartan-ecss'
    ? 'https://www.parivartanecss.com/'
    : undefined;

  // Replacement properties
  let newChunk = chunk;

  // Replace officialGuidelinesUrl
  newChunk = newChunk.replace(/officialGuidelinesUrl:\s*'[^']*'/, `officialGuidelinesUrl: '${r['Updated information URL']}'`);
  // Replace officialApplicationUrl
  newChunk = newChunk.replace(/officialApplicationUrl:\s*'[^']*'/, `officialApplicationUrl: '${r['Updated application URL']}'`);

  // Clean existing injected fields if present
  newChunk = newChunk.replace(/    officialInfoUrl:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    trackingUrl:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    urlVerificationStatus:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    infoUrlVerificationStatus:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    appUrlVerificationStatus:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    lastVerifiedAt:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    verificationNotes:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    previousUrl:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    evidenceRefs:[^\n]*\n/, '');
  newChunk = newChunk.replace(/    urlVerificationHistory:[^\n]*\n(\s*\[[\s\S]*?\])?\n?/, '');

  const escapedNotes = (r['Audit notes'] || '').replace(/'/g, "\\'");
  const escapedEvidence = (r['Evidence refs'] || '').replace(/'/g, "\\'");
  const escapedOldInfo = (r['Old information URL'] || '').replace(/'/g, "\\'");
  const escapedOldApp = (r['Old application URL'] || '').replace(/'/g, "\\'");

  const injection = `    officialInfoUrl: '${r['Updated information URL']}',
    ${trackingUrl ? `trackingUrl: '${trackingUrl}',\n    ` : ''}urlVerificationStatus: '${overallStatus}',
    infoUrlVerificationStatus: '${r['Information URL audit status']}',
    appUrlVerificationStatus: '${r['Application URL audit status']}',
    lastVerifiedAt: '${r['Audit date']}',
    verificationNotes: '${escapedNotes}',
    previousUrl: '${escapedOldInfo !== r['Updated information URL'] ? escapedOldInfo : escapedOldApp}',
    evidenceRefs: '${escapedEvidence}',
    urlVerificationHistory: [
      {
        checkedAt: '2026-11-07T09:32:00.000Z',
        checkedBy: 'Automated Link Monitor & Scheme Auditor',
        infoStatus: '${r['Information URL audit status']}',
        appStatus: '${r['Application URL audit status']}',
        notes: '${escapedNotes}',
        evidenceRefs: '${escapedEvidence}'
      }
    ],`;

  // Insert after officialApplicationUrl
  newChunk = newChunk.replace(
    `officialApplicationUrl: '${r['Updated application URL']}',`,
    `officialApplicationUrl: '${r['Updated application URL']}',\n${injection}`
  );

  code = code.slice(0, idx) + newChunk + code.slice(nextIdx);
}

fs.writeFileSync('student-project-main/lib/scholarships-data.ts', code);
console.log('Successfully updated student-project-main/lib/scholarships-data.ts');
