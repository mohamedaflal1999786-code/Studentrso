// lib/ai/web-research.ts
import { CitationSource } from './types';

export const STATUTORY_SOURCES_DIRECTORY: CitationSource[] = [
  {
    title: 'Tamil Nadu Engineering Admissions (TNEA) Portal',
    url: 'https://www.tneaonline.org/',
    authority: 'Directorate of Technical Education (DOTE) / Anna University',
    verified: true,
  },
  {
    title: 'Tamil Nadu Public Service Commission (TNPSC)',
    url: 'https://www.tnpsc.gov.in/',
    authority: 'Government of Tamil Nadu Constitutional Commission',
    verified: true,
  },
  {
    title: 'National Testing Agency (NTA)',
    url: 'https://nta.ac.in/',
    authority: 'Ministry of Education, Government of India (JEE, NEET, CUET, UGC NET)',
    verified: true,
  },
  {
    title: 'University Grants Commission (UGC)',
    url: 'https://www.ugc.gov.in/',
    authority: 'Statutory Body for Higher Education Standards and Research Regulations',
    verified: true,
  },
  {
    title: 'All India Council for Technical Education (AICTE)',
    url: 'https://www.aicte-india.org/',
    authority: 'National Regulator for Technical, Engineering & Management Education',
    verified: true,
  },
  {
    title: 'Directorate of Technical Education Tamil Nadu (DOTE)',
    url: 'https://www.dte.tn.gov.in/',
    authority: 'Government of Tamil Nadu Polytechnic & Lateral Entry Admissions',
    verified: true,
  },
  {
    title: 'Union Public Service Commission (UPSC)',
    url: 'https://upsc.gov.in/',
    authority: 'Central Civil Services, NDA, CDS, and Engineering Recruitment',
    verified: true,
  },
  {
    title: 'Staff Selection Commission (SSC)',
    url: 'https://ssc.gov.in/',
    authority: 'Central Ministries & Department Staff Recruitment',
    verified: true,
  },
  {
    title: 'Tamil Nadu Medical Selection Committee (DME TN)',
    url: 'https://tnmedicalselection.net/',
    authority: 'MBBS, BDS, Paramedical, Pharmacy & Nursing Admissions in Tamil Nadu',
    verified: true,
  },
  {
    title: 'National Career Service (NCS) Portal',
    url: 'https://www.ncs.gov.in/',
    authority: 'Ministry of Labour & Employment, Government of India',
    verified: true,
  },
  {
    title: 'National Apprenticeship Training Scheme (NATS 2.0)',
    url: 'https://nats.education.gov.in/',
    authority: 'Ministry of Education (Statutory Stipendiary Apprenticeships)',
    verified: true,
  },
  {
    title: 'Naan Mudhalvan Skill & Career Platform',
    url: 'https://www.naanmudhalvan.tn.gov.in/',
    authority: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    verified: true,
  },
];

export function findRelevantSources(queryText: string): CitationSource[] {
  const q = queryText.toLowerCase();
  const matched: CitationSource[] = [];

  if (q.includes('tnea') || q.includes('engineering') || q.includes('anna university')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[0]);
  }
  if (q.includes('tnpsc') || q.includes('group 1') || q.includes('group 2') || q.includes('group 4') || q.includes('va')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[1]);
  }
  if (q.includes('neet') || q.includes('jee') || q.includes('cuet') || q.includes('nta') || q.includes('net')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[2]);
  }
  if (q.includes('phd') || q.includes('ugc') || q.includes('research') || q.includes('fellowship') || q.includes('jrf')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[3]);
  }
  if (q.includes('polytechnic') || q.includes('diploma') || q.includes('lateral entry') || q.includes('dote')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[5]);
  }
  if (q.includes('upsc') || q.includes('ias') || q.includes('ips') || q.includes('nda') || q.includes('cds')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[6]);
  }
  if (q.includes('ssc') || q.includes('cgl') || q.includes('chsl') || q.includes('mts')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[7]);
  }
  if (q.includes('medical') || q.includes('mbbs') || q.includes('bds') || q.includes('paramedical') || q.includes('nursing')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[8]);
  }
  if (q.includes('internship') || q.includes('apprentice') || q.includes('job') || q.includes('career')) {
    matched.push(STATUTORY_SOURCES_DIRECTORY[9]);
    matched.push(STATUTORY_SOURCES_DIRECTORY[10]);
  }

  // Deduplicate by url
  const uniqueUrls = new Set<string>();
  return matched.filter((s) => {
    if (uniqueUrls.has(s.url)) return false;
    uniqueUrls.add(s.url);
    return true;
  });
}
