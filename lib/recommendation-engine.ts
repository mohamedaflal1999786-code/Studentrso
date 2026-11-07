import { UserProfileData } from './auth-service';
import { GENUINE_SCHOLARSHIP_CATALOGUE } from './scholarships-data';
import { CERTIFICATES_CATALOGUE } from './certificates-data';
import { VERIFIED_OPPORTUNITIES } from './internship-data';
import { EXAMINATIONS_DATABASE } from './exams-data';
import { ADMISSION_PATHWAYS } from './admissions-data';
import { VERIFIED_LEARNING_RESOURCES } from './academic-data';

export type MatchStatus = 'Strong Match' | 'Possible Match' | 'More Information Needed';

export interface OpportunityRecommendation {
  id: string;
  category: 'Scholarship' | 'Certificate' | 'Internship' | 'Examination' | 'Admission' | 'Academic' | 'Career' | 'SkillLab' | 'DigitalSafety';
  title: string;
  awardingAuthority: string;
  matchStatus: MatchStatus;
  matchReason: string;
  deadline: string;
  officialSource: string;
  officialUrl: string;
  moduleRoute: string;
  moduleNumber: string;
  highlights: string[];
}

export function generatePersonalizedRecommendations(profile: UserProfileData): OpportunityRecommendation[] {
  const recommendations: OpportunityRecommendation[] = [];

  const eduLevel = (profile.education_level || '').toLowerCase();
  const course = (profile.course || '').toLowerCase();
  const interests = (profile.study_interests || []).map((i) => i.toLowerCase());
  const careerInterests = (profile.career_interests || []).map((c) => c.toLowerCase());
  const isSchool = eduLevel.includes('class 10') || eduLevel.includes('class 11') || eduLevel.includes('class 12');
  const isUG = eduLevel.includes('undergraduate') || eduLevel.includes('bachelor') || eduLevel.includes('diploma');
  const isPG = eduLevel.includes('postgraduate') || eduLevel.includes('master');
  const isResearch = eduLevel.includes('phd') || eduLevel.includes('research');

  // 1. Scholarships (Module 01)
  const scholarshipMatches: { rec: OpportunityRecommendation; score: number }[] = [];
  for (const s of GENUINE_SCHOLARSHIP_CATALOGUE) {
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'General eligibility scheme open to students in Tamil Nadu.';
    let score = 2;

    if (s.id === 'tn-pudhumai-penn' && profile.studied_in_tn_govt_school && (isUG || isSchool)) {
      matchStatus = 'Strong Match';
      matchReason = 'Direct statutory match: Studied in Tamil Nadu Government School from Class 6 to 12.';
      score = 10;
    } else if (s.id === 'tn-tamil-pudhalvan' && profile.studied_in_tn_govt_school && (isUG || isSchool)) {
      matchStatus = 'Strong Match';
      matchReason = 'Direct statutory match: Tamil Nadu Government School student pursuing higher education.';
      score = 10;
    } else if (s.id === 'tn-first-graduate' && profile.is_first_graduate && isUG) {
      matchStatus = 'Strong Match';
      matchReason = 'Matches First Generation Graduate concession for Tamil Nadu degree programmes.';
      score = 10;
    } else if (s.id === 'aicte-pragati' && isUG && (course.includes('eng') || course.includes('tech') || course.includes('polytechnic'))) {
      matchStatus = 'Strong Match';
      matchReason = 'Matches female student enrolled in AICTE-approved degree or diploma programme.';
      score = 9;
    } else if (s.id === 'serb-npdf' && isResearch) {
      matchStatus = 'Strong Match';
      matchReason = 'Matches PhD scholar / postdoctoral researcher criteria.';
      score = 9;
    } else if (isUG && (s.audience?.toLowerCase().includes('undergraduate') || s.audience?.toLowerCase().includes('college'))) {
      matchStatus = 'Possible Match';
      matchReason = `Open to undergraduate students in ${profile.course || 'higher education'}.`;
      score = 5;
    } else if (isPG && s.audience?.toLowerCase().includes('postgraduate')) {
      matchStatus = 'Strong Match';
      matchReason = 'Direct match for postgraduate degree seekers.';
      score = 8;
    } else {
      matchStatus = 'More Information Needed';
      matchReason = 'Requires specific income and category verification on the official scheme portal.';
      score = 1;
    }

    scholarshipMatches.push({
      score,
      rec: {
        id: `sch-${s.id}`,
        category: 'Scholarship',
        title: s.name,
        awardingAuthority: s.provider || s.department || 'Government of Tamil Nadu',
        matchStatus,
        matchReason,
        deadline: 'Active Cycle 2026-27',
        officialSource: s.officialApplicationUrl || s.officialGuidelinesUrl || 'Official Department Portal',
        officialUrl: s.officialApplicationUrl || s.officialGuidelinesUrl || 'https://www.myscheme.gov.in',
        moduleRoute: '/scholarships',
        moduleNumber: '01',
        highlights: [s.category, s.schemeType, s.isRenewable ? 'Renewable' : 'Annual Cycle'],
      },
    });
  }

  // Sort scholarship matches descending by score so highest relevance schemes are placed first
  scholarshipMatches.sort((a, b) => b.score - a.score);
  recommendations.push(...scholarshipMatches.slice(0, 6).map((item) => item.rec));

  // 2. Certificates (Module 03)
  for (const c of CERTIFICATES_CATALOGUE) {
    let matchStatus: MatchStatus = 'Strong Match';
    let matchReason = 'Essential certificate required for government welfare & admission verification.';

    if (c.id === 'first-graduate-certificate') {
      if (profile.is_first_graduate) {
        matchStatus = 'Strong Match';
        matchReason = 'Crucial document for tuition fee waiver in Tamil Nadu engineering/arts admissions.';
      } else {
        continue;
      }
    } else if (c.id === 'community-certificate') {
      matchStatus = 'Strong Match';
      matchReason = `Required for reservation & fee concession under ${profile.community_category || 'state'} quota.`;
    }

    recommendations.push({
      id: `cert-${c.id}`,
      category: 'Certificate',
      title: c.title,
      awardingAuthority: c.issuingAuthority || 'Revenue Department, Government of Tamil Nadu',
      matchStatus,
      matchReason,
      deadline: c.turnaroundTime || 'Statutory 15–30 Days Delivery',
      officialSource: c.applicationPortalName || 'Tamil Nadu e-Sevai',
      officialUrl: c.applicationPortalUrl || 'https://www.tnesevai.tn.gov.in',
      moduleRoute: '/certificates',
      moduleNumber: '03',
      highlights: [c.feeInfo || 'Government Fixed Fee', 'e-Sevai Portal', c.turnaroundTime || '15 Days Delivery'],
    });

    if (recommendations.filter((r) => r.category === 'Certificate').length >= 2) break;
  }

  // 3. Internships (Module 08)
  for (const i of VERIFIED_OPPORTUNITIES) {
    const titleLower = i.title.toLowerCase();
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'Verified government apprenticeship scheme with statutory monthly stipend.';

    if (interests.some((int) => titleLower.includes(int)) || course.includes('eng') || course.includes('tech')) {
      matchStatus = 'Strong Match';
      matchReason = `Matches your curriculum in ${profile.course || 'technology & applied sciences'}.`;
    }

    recommendations.push({
      id: `int-${i.id}`,
      category: 'Internship',
      title: i.title,
      awardingAuthority: i.organisation,
      matchStatus,
      matchReason,
      deadline: i.applicationClosingDate || 'Rolling Statutory Batches',
      officialSource: i.officialPortalDomain || 'National Apprenticeship Portal',
      officialUrl: i.officialApplicationUrl || 'https://nats.education.gov.in',
      moduleRoute: '/internships',
      moduleNumber: '08',
      highlights: [i.stipendOrSalary || 'Statutory Stipend', i.duration || '6-12 Months', i.location || 'Tamil Nadu'],
    });

    if (recommendations.filter((r) => r.category === 'Internship').length >= 2) break;
  }

  // 4. Examinations (Module 04)
  for (const e of EXAMINATIONS_DATABASE) {
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'State & national competitive examination pathway.';

    if (e.id === 'tn-set' && (isPG || isResearch)) {
      matchStatus = 'Strong Match';
      matchReason = 'Qualifying examination for Assistant Professorship in Tamil Nadu Universities.';
    } else if (e.id === 'tcs-nqt' && (isUG || careerInterests.includes('private sector employment'))) {
      matchStatus = 'Strong Match';
      matchReason = 'High-volume national corporate qualifier test for engineering and science graduates.';
    }

    recommendations.push({
      id: `exam-${e.id}`,
      category: 'Examination',
      title: e.title,
      awardingAuthority: e.conductingAuthority,
      matchStatus,
      matchReason,
      deadline: e.importantDates?.applicationDeadline || 'Active Academic Cycle',
      officialSource: e.conductingAuthority,
      officialUrl: e.officialApplicationPortalUrl || e.officialWebsiteUrl || 'https://trb.tn.gov.in',
      moduleRoute: '/exams',
      moduleNumber: '04',
      highlights: [e.levelClassification, e.feeDescription || 'Online Exam', 'National / State Level'],
    });

    if (recommendations.filter((r) => r.category === 'Examination').length >= 2) break;
  }

  // 5. Admissions (Module 06)
  for (const a of ADMISSION_PATHWAYS) {
    recommendations.push({
      id: `adm-${a.id}`,
      category: 'Admission',
      title: a.title,
      awardingAuthority: a.authority,
      matchStatus: isSchool ? 'Strong Match' : 'Possible Match',
      matchReason: 'Single-window government counselling & seat allocation system.',
      deadline: a.applicationPeriod || 'Annual Single-Window Schedule',
      officialSource: a.portalName || a.authority,
      officialUrl: a.portalUrl || 'https://www.tneaonline.org',
      moduleRoute: '/admissions',
      moduleNumber: '06',
      highlights: [a.level, 'Single Window Counselling'],
    });

    if (recommendations.filter((r) => r.category === 'Admission').length >= 1) break;
  }

  // 6. Academic Support (Module 07)
  if (VERIFIED_LEARNING_RESOURCES && VERIFIED_LEARNING_RESOURCES.length > 0) {
    const s = VERIFIED_LEARNING_RESOURCES[0];
    recommendations.push({
      id: `acad-${s.id}`,
      category: 'Academic',
      title: `${s.title} Curriculum Roadmap`,
      awardingAuthority: s.organisation,
      matchStatus: 'Strong Match',
      matchReason: 'Government-verified curriculum syllabus, NCERT, and VLab interactive experiments.',
      deadline: 'Free Open Educational Resource',
      officialSource: s.organisation,
      officialUrl: s.officialUrl || 'https://swayam.gov.in',
      moduleRoute: '/academic-support',
      moduleNumber: '07',
      highlights: [s.cost, s.category, 'Open Access'],
    });
  }

  return recommendations;
}
