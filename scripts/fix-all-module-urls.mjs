import fs from 'fs';

const replacements = [
  // 1. Module 02: Safety
  {
    file: 'lib/safety-data.ts',
    from: 'https://www.antiragging.in/assets/pdf/annexure/Notice-Ragging.pdf',
    to: 'https://www.antiragging.in/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://www.annauniv.edu/grievance/',
    to: 'https://www.annauniv.edu/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://ncpcr.gov.in/index_pocso.php',
    to: 'https://ncpcr.gov.in/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://dce.tn.gov.in/',
    to: 'https://tndce.tn.gov.in/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://samagrax.tnschools.gov.in/',
    to: 'https://emis.tnschools.gov.in/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://www.dote.tn.gov.in/',
    to: 'https://dte.tn.gov.in/'
  },
  {
    file: 'lib/safety-data.ts',
    from: 'https://scd.tn.gov.in/',
    to: 'https://adw.tn.gov.in/'
  },

  // 2. Module 03: Certificates
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.incometax.gov.in/iec/foportal/verify-your-pan',
    to: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.incometax.gov.in/iec/foportal/instant-e-pan',
    to: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
    to: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
    to: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://verify.digitallocker.gov.in/',
    to: 'https://www.digilocker.gov.in/'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://nad.gov.in/',
    to: 'https://nad.digilocker.gov.in/'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.dge.tn.gov.in/',
    to: 'https://dge.tn.gov.in/'
  },
  {
    file: 'lib/certificates-data.ts',
    from: 'https://www.dote.tn.gov.in/',
    to: 'https://dte.tn.gov.in/'
  },

  // 3. Module 04: Exams
  {
    file: 'lib/exams-data.ts',
    from: 'https://www.tnpsc.gov.in/English/previous_questions.html',
    to: 'https://www.tnpsc.gov.in/English/previousquestionpapers.aspx'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://gate2026.iitg.ac.in/previous-papers',
    to: 'https://gate2026.iitg.ac.in/'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://www.dte.tn.gov.in/',
    to: 'https://dte.tn.gov.in/'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://cuetug.ntaonline.in/',
    to: 'https://exams.nta.ac.in/CUET-UG/'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://ugcnet.nta.ac.in/previous-papers',
    to: 'https://ugcnet.nta.ac.in/'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://www.tngasa.in/',
    to: 'https://tngasa.in/'
  },
  {
    file: 'lib/exams-data.ts',
    from: 'https://learning.tcsionhub.in/hub/national-qualifier-test/',
    to: 'https://learning.tcsionhub.in/'
  },
  {
    file: 'components/exams/ApplicationGuidanceSection.tsx',
    from: 'https://dte.tn.gov.in/',
    to: 'https://dte.tn.gov.in/'
  },

  // 4. Module 06: Admissions
  {
    file: 'lib/admissions-data.ts',
    from: 'https://tnau.ac.in/admissions/guidelines',
    to: 'https://tnau.ac.in/admissions/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://www.abc.gov.in/assets/resources/Academic-Bank-of-Credits-Guidelines.pdf',
    to: 'https://www.abc.gov.in/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://josaa.nic.in/business-rules/',
    to: 'https://josaa.nic.in/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://tnmedicalselection.net/prospectus.aspx',
    to: 'https://tnmedicalselection.net/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://tnmedicalselection.net/news.aspx',
    to: 'https://tnmedicalselection.net/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://cuet.samarth.ac.in/',
    to: 'https://exams.nta.ac.in/CUET-UG/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://www.tngasa.in/guidelines',
    to: 'https://tngasa.in/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://www.tngasa.in/news',
    to: 'https://tngasa.in/'
  },
  {
    file: 'lib/admissions-data.ts',
    from: 'https://www.tngasa.in/',
    to: 'https://tngasa.in/'
  },

  // 5. Module 07: Academic Support
  {
    file: 'lib/academic-data.ts',
    from: 'https://vlabs.ac.in',
    to: 'https://www.vlab.co.in/'
  },
  {
    file: 'lib/academic-data.ts',
    from: 'https://library.daisyindia.org',
    to: 'https://www.daisyindia.org/'
  },
  {
    file: 'lib/academic-data.ts',
    from: 'https://dge.tn.gov.in',
    to: 'https://dge.tn.gov.in/'
  },
  {
    file: 'lib/academic-data.ts',
    from: 'https://ncert.nic.in',
    to: 'https://ncert.nic.in/'
  },
  {
    file: 'lib/academic-data.ts',
    from: 'https://coe1.annauniv.edu',
    to: 'https://coe1.annauniv.edu/'
  },

  // 6. Module 08: Internships
  {
    file: 'lib/internship-data.ts',
    from: 'https://nextstep.tcs.com/',
    to: 'https://www.tcs.com/careers'
  },
  {
    file: 'lib/internship-data.ts',
    from: 'https://www.tnpscexams.in/',
    to: 'https://www.tnpsc.gov.in/'
  },
  {
    file: 'lib/internship-data.ts',
    from: 'https://www.tnusrb.tn.gov.in/',
    to: 'https://tnusrb.tn.gov.in/'
  },
  {
    file: 'components/internships/EmploymentExchangeSection.tsx',
    from: 'https://www.tnusrb.tn.gov.in/',
    to: 'https://tnusrb.tn.gov.in/'
  },

  // 7. Module 09: Skill Lab
  {
    file: 'lib/skill-lab-data.ts',
    from: 'https://portal.naanmudhalvan.tn.gov.in/',
    to: 'https://naanmudhalvan.tn.gov.in/'
  }
];

let appliedCount = 0;
for (const r of replacements) {
  if (!fs.existsSync(r.file)) {
    console.log(`File not found: ${r.file}`);
    continue;
  }
  let content = fs.readFileSync(r.file, 'utf8');
  if (content.includes(r.from)) {
    const occurrences = content.split(r.from).length - 1;
    content = content.replaceAll(r.from, r.to);
    fs.writeFileSync(r.file, content, 'utf8');
    console.log(`✓ Replaced in ${r.file} (${occurrences}x): ${r.from} -> ${r.to}`);
    appliedCount += occurrences;
  } else {
    console.log(`- Note: ${r.from} not found in ${r.file}`);
  }
}

console.log(`\nSuccessfully applied ${appliedCount} URL replacements across Modules 02 through 10!`);
