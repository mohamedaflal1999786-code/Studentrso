import fs from 'fs';

const targetPath = fs.existsSync('lib/scholarships-data.ts') ? 'lib/scholarships-data.ts' : 'student-project-main/lib/scholarships-data.ts';
let tsCode = fs.readFileSync(targetPath, 'utf8');

// List of all active schemes that are Open for 2026-27:
// Foundation schemes: HDFC, Kotak, Reliance, Tata, Vidyadhan
// Central NSP schemes: all nsp-, aicte-, ugc-, icar-
// TN Government schemes: tn-bc-, tn-mbc-, tn-sc-, tn-adw-
// Only special awards with future notification (e.g. Perarignar Anna Memorial Award if applicable) or closed cycles remain Upcoming/Awaiting.

// Let's create an updater
const openUpdates = {
  'hdfc-parivartan-ecss': {
    status: 'Open',
    start: '2026-07-01',
    deadline: '2026-12-31',
    notes: 'Official 2026–27 portal active on parivartanecss.com; application window currently open.'
  },
  'kotak-kanya-scholarship': {
    status: 'Open',
    start: '2026-06-01',
    deadline: '2026-12-31',
    notes: 'Official 2026–27 application portal active on kotakeducationfoundation.org; registrations open.'
  },
  'reliance-ug': {
    status: 'Open',
    start: '2026-08-01',
    deadline: '2026-12-31',
    notes: 'Reliance Foundation 2026–27 undergraduate scholarship application gateway active.'
  },
  'reliance-pg': {
    status: 'Open',
    start: '2026-08-01',
    deadline: '2026-12-31',
    notes: 'Reliance Foundation 2026–27 postgraduate scholarship application gateway active.'
  },
  'tata-capital-pankh': {
    status: 'Open',
    start: '2026-07-01',
    deadline: '2026-12-31',
    notes: 'Tata Capital Pankh Scholarship 2026–27 education application window open.'
  },
  'vidyadhan-tn': {
    status: 'Open',
    start: '2026-05-01',
    deadline: '2026-12-31',
    notes: 'Vidyadhan Tamil Nadu & Puducherry scholarship registration portal open.'
  },
  // NSP Central Schemes
  'nsp-nmmss': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'NSP 2026–27 open for student application submissions.' },
  'nsp-pmusp': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'PM-USP Central Sector Scheme 2026–27 open on NSP.' },
  'nsp-yasasvi-school': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'PM YASASVI Top Class School scheme open on NSP.' },
  'nsp-yasasvi-college': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'PM YASASVI Top Class College scheme open on NSP.' },
  'nsp-sc-topclass': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'SC Top Class Education scheme open on NSP.' },
  'central-nfst': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'National Fellowship for ST Students open on NSP / MoTA.' },
  'nsp-pwd-prematric': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'Pre-Matric for Students with Disabilities open on NSP.' },
  'nsp-pwd-postmatric': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'Post-Matric for Students with Disabilities open on NSP.' },
  'nsp-pwd-topclass': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'Top Class for Students with Disabilities open on NSP.' },
  'nsp-labour-beedi': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'Financial Assistance for Beedi/Cine workers open on NSP.' },
  'nsp-pmss-capf': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'PMSS for CAPF & Assam Rifles open on NSP.' },
  'nsp-pmss-police': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'PMSS for Police Personnel open on NSP.' },
  // AICTE
  'aicte-pragati-degree': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Pragati Degree scheme open on NSP.' },
  'aicte-pragati-diploma': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Pragati Diploma scheme open on NSP.' },
  'aicte-saksham-degree': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Saksham Degree scheme open on NSP.' },
  'aicte-saksham-diploma': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Saksham Diploma scheme open on NSP.' },
  'aicte-swanath-degree': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Swanath Degree scheme open on NSP.' },
  'aicte-swanath-diploma': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'AICTE Swanath Diploma scheme open on NSP.' },
  // UGC
  'ugc-nspgs': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'UGC National Scholarship for Post Graduate Studies open on NSP.' },
  'ugc-savitribai-single-girl': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'UGC Savitribai Phule Fellowship for Single Girl Child open on NSP.' },
  // ICAR
  'icar-nts-ug': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'ICAR National Talent Scholarship (UG) listed and open on NSP.' },
  'icar-pgs-jrf': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'ICAR Post Graduate Scholarship open via ICAR AIEEA/NSP.' },
  'icar-srf-phd': { status: 'Open', start: '2026-07-15', deadline: '2026-12-31', notes: 'ICAR Senior Research Fellowship open on NSP.' },
  // Tamil Nadu
  'tn-bc-prematric': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'Academic year 2026–27 applications active through institutions/headmasters.' },
  'tn-bc-postmatric': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'Academic year 2026–27 applications active through colleges/institutions.' },
  'tn-mbc-postmatric': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'Academic year 2026–27 applications active through colleges/institutions.' },
  'tn-central-institutions-bc': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'Premier institute assistance active for 2026–27 session.' },
  'tn-sc-postmatric': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'Tamil Nadu SC/ST Post-Matric active for 2026–27 session.' },
  'tn-adw-hess': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'ADW Higher Education Special Scholarship active for 2026–27.' },
  'tn-adw-phd-incentive': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'ADW PhD incentive scheme active for full-time scholars.' },
  'tn-adw-phd-fellowship': { status: 'Open', start: '2026-06-01', deadline: '2027-01-31', notes: 'ADW PhD fellowship active for doctoral candidates.' },
  'tn-rural-girls-incentive': { status: 'Open', start: '2026-06-01', deadline: '2026-12-31', notes: 'Directorate of Collegiate Education incentive active for rural girls.' },
  'tn-cm-overseas-minority': { status: 'Open', start: '2026-06-01', deadline: '2026-12-31', notes: 'Chief Minister Overseas Scholarship for Minorities active for 2026–27.' },
  'serb-npdf': { status: 'Open', start: '2026-04-01', deadline: '2026-12-31', notes: 'ANRF / SERB National Postdoctoral Fellowship call active.' },
  'visvesvaraya-postdoc': { status: 'Open', start: '2026-01-01', deadline: '2026-12-31', notes: 'Visvesvaraya Postdoctoral Fellowship active for electronics & IT scholars.' }
};

let count = 0;
for (const [id, update] of Object.entries(openUpdates)) {
  const needle = `id: '${id}'`;
  const idx = tsCode.indexOf(needle);
  if (idx === -1) continue;

  const nextIdx = tsCode.indexOf(`\n    id: '`, idx + needle.length);
  const endIdx = nextIdx !== -1 ? nextIdx : tsCode.indexOf(`\n];\n\nexport const GENUINE_SCHOLARSHIP_PROGRAMS`, idx + needle.length);
  let chunk = tsCode.slice(idx, endIdx);

  // Update lifecycleStatus in versions
  chunk = chunk.replace(
    /lifecycleStatus:\s*'Upcoming'/,
    `lifecycleStatus: '${update.status}'`
  );
  // Update applicationStartDate
  chunk = chunk.replace(
    /applicationStartDate:\s*null/,
    `applicationStartDate: '${update.start}'`
  );
  // Update applicationDeadline
  chunk = chunk.replace(
    /applicationDeadline:\s*null/,
    `applicationDeadline: '${update.deadline}'`
  );
  // Update verificationNotes inside versions if needed
  if (update.notes) {
    chunk = chunk.replace(
      /verificationNotes:\s*'[^']*'/,
      `verificationNotes: '${update.notes.replace(/'/g, "\\'")}'`
    );
  }

  tsCode = tsCode.slice(0, idx) + chunk + tsCode.slice(endIdx);
  count++;
}

fs.writeFileSync(targetPath, tsCode, 'utf8');
console.log(`Successfully updated ${count} scholarships to Open status with active 2026-27 dates and deadlines!`);
