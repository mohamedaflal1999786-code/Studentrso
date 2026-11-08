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
  const specialization = (profile.specialization || '').toLowerCase();
  const instName = profile.institution_name || '';
  const district = profile.district || 'Tamil Nadu';
  const interests = (profile.study_interests || []).map((i) => i.toLowerCase());
  const careerInterests = (profile.career_interests || []).map((c) => c.toLowerCase());

  const isSchool =
    eduLevel.includes('class 10') ||
    eduLevel.includes('class 11') ||
    eduLevel.includes('class 12') ||
    eduLevel.includes('school');

  const isUG =
    eduLevel.includes('undergraduate') ||
    eduLevel.includes('bachelor') ||
    eduLevel.includes('degree') ||
    eduLevel.includes('diploma') ||
    (!eduLevel && !isSchool);

  const isPG = eduLevel.includes('postgraduate') || eduLevel.includes('master');
  const isResearch = eduLevel.includes('phd') || eduLevel.includes('research') || eduLevel.includes('fellowship');

  const community = (profile.community_category || '').toUpperCase();
  const isGovtSchool = Boolean(profile.studied_in_tn_govt_school);
  const isFirstGrad = Boolean(profile.is_first_graduate);
  const isSingleGirl = Boolean(profile.is_single_girl_child);
  const hasDisability = Boolean(profile.has_disability);

  const isTechOrEng =
    course.includes('b tech') ||
    course.includes('b.tech') ||
    course.includes('btech') ||
    course.includes('b.e') ||
    course.includes('be ') ||
    course.includes('eng') ||
    course.includes('tech') ||
    course.includes('computer') ||
    course.includes('information') ||
    specialization.includes('computer') ||
    specialization.includes('engineering') ||
    interests.some((i) => i.includes('engineering') || i.includes('tech'));

  // =========================================================================
  // 1. SCHOLARSHIPS (Module 01)
  // =========================================================================
  const scholarshipMatches: { rec: OpportunityRecommendation; score: number }[] = [];

  for (const s of GENUINE_SCHOLARSHIP_CATALOGUE) {
    const el = s.eligibility || {};
    let score = 0;
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'General eligibility scheme open to students in Tamil Nadu.';

    // A. Hard disqualifications
    if (el.tnGovtSchoolRequired && !isGovtSchool) continue;
    if (el.firstGenerationGraduateRequired && !isFirstGrad) continue;
    if (el.singleGirlChildRequired && !isSingleGirl) continue;
    if (el.disabilityRequired && !hasDisability) continue;
    if (el.requiresPhdEnrollment && !isResearch) continue;
    if (el.requiresCompletedUG && !isPG && !isResearch) continue;

    // School-only vs College-only stages
    const isSchemeSchoolOnly =
      s.educationStages.every((stage) => ['Class 10', 'Class 11', 'Class 12'].includes(stage));
    if (isSchemeSchoolOnly && (isUG || isPG || isResearch)) continue;

    const isSchemePostgradOnly =
      s.educationStages.every((stage) => ['Postgraduate', 'PhD', 'Postdoctoral research'].includes(stage));
    if (isSchemePostgradOnly && isUG && !isPG && !isResearch) continue;

    // B. Statutory Criteria matches
    if (s.id === 'tn-pudhumai-penn' && isGovtSchool && (isUG || isSchool)) {
      score += 45;
      matchStatus = 'Strong Match';
      matchReason = 'Direct statutory match: Tamil Nadu Government School alumna pursuing higher education.';
    } else if (s.id === 'tn-tamil-pudhalvan' && isGovtSchool && (isUG || isSchool)) {
      score += 45;
      matchStatus = 'Strong Match';
      matchReason = 'Direct statutory match: Tamil Nadu Government School student pursuing higher education.';
    } else if (s.id === 'tn-first-graduate' && isFirstGrad && isUG) {
      score += 40;
      matchStatus = 'Strong Match';
      matchReason = 'Direct statutory match: First Generation Graduate tuition concession for Tamil Nadu degree.';
    }

    // C. Community Category Matching
    if (el.communityCategories && el.communityCategories.length > 0) {
      const matchComm = el.communityCategories.some((c) => {
        const cUp = c.toUpperCase();
        if (community.includes('BC') && (cUp === 'BC' || cUp === 'OBC')) return true;
        if (community.includes('MBC') && (cUp === 'MBC' || cUp === 'DNC')) return true;
        if (community.includes('SC') && cUp === 'SC') return true;
        if (community.includes('ST') && cUp === 'ST') return true;
        if (community.includes('MINORITY') && cUp.includes('MINORI')) return true;
        if (cUp === 'ALL' || cUp === 'GENERAL') return true;
        return false;
      });

      if (matchComm) {
        score += 25;
        matchStatus = 'Strong Match';
        matchReason = `Direct match for ${profile.community_category || 'state quota'} student in Tamil Nadu institutions.`;
      } else {
        // Disqualify if scheme strictly targets different reserved category (e.g. SC-only for BC student)
        if (
          !el.communityCategories.includes('General') &&
          !el.communityCategories.includes('All') &&
          community !== ''
        ) {
          continue;
        }
      }
    }

    // D. Degree / Course Matching
    if (isUG && s.educationStages.includes('Undergraduate')) {
      score += 15;
    }

    if (isTechOrEng) {
      const isTechScheme =
        s.id.includes('aicte') ||
        s.id === 'nsp-pmusp' ||
        s.id === 'reliance-ug' ||
        s.id === 'tata-capital-pankh' ||
        s.id === 'hdfc-parivartan-ecss' ||
        s.id === 'sitaram-jindal-foundation' ||
        s.name.toLowerCase().includes('technical') ||
        s.name.toLowerCase().includes('engineering');

      if (isTechScheme) {
        score += 30;
        matchStatus = 'Strong Match';
        matchReason = `Direct match for ${profile.course || 'B.Tech / Engineering'} undergraduate student${
          instName ? ` at ${instName}` : ''
        }.`;
      }
    }

    // E. Income Tier Assistance
    const incomeTier = profile.annual_family_income || '';
    if (incomeTier.includes('Below ₹2,50,000') || incomeTier.includes('Below 2.5')) {
      if (el.minIncomeCeiling && el.minIncomeCeiling >= 200000) {
        score += 15;
      }
    }

    // Base Tamil Nadu resident eligibility
    if (s.isForTnResidents) {
      score += 10;
    }

    if (score > 0) {
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
          highlights: [
            s.category,
            s.schemeType,
            s.isRenewable ? 'Renewable' : 'Annual Cycle',
            district,
          ],
        },
      });
    }
  }

  // Sort descending by calculated relevance score
  scholarshipMatches.sort((a, b) => b.score - a.score);
  recommendations.push(...scholarshipMatches.slice(0, 6).map((m) => m.rec));

  // =========================================================================
  // 2. CERTIFICATES (Module 03)
  // =========================================================================
  const certificateMatches: { rec: OpportunityRecommendation; score: number }[] = [];

  for (const c of CERTIFICATES_CATALOGUE) {
    let score = 5;
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'Standard government verification document delivered via e-Sevai centres.';

    if (c.id === 'first-graduate-certificate') {
      if (isFirstGrad) {
        score = 40;
        matchStatus = 'Strong Match';
        matchReason = 'Crucial document for 100% tuition fee waiver in Tamil Nadu engineering & arts admissions.';
      } else {
        continue;
      }
    } else if (c.id === 'community-certificate') {
      score = 30;
      matchStatus = 'Strong Match';
      matchReason = `Required for reservation & fee concession under ${profile.community_category || 'state'} quota.`;
    } else if (c.id === 'income-certificate') {
      score = 25;
      matchStatus = 'Strong Match';
      matchReason = `Required for financial scholarship disbursement under family income criteria (${profile.annual_family_income || 'Below ₹2,50,000'}).`;
    } else if (c.id === 'nativity-certificate') {
      score = 20;
      matchStatus = 'Strong Match';
      matchReason = 'Proves Tamil Nadu domicile for state quota single-window counselling & local reservations.';
    }

    certificateMatches.push({
      score,
      rec: {
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
      },
    });
  }

  certificateMatches.sort((a, b) => b.score - a.score);
  recommendations.push(...certificateMatches.slice(0, 2).map((m) => m.rec));

  // =========================================================================
  // 3. INTERNSHIPS (Module 08)
  // =========================================================================
  const internshipMatches: { rec: OpportunityRecommendation; score: number }[] = [];

  for (const i of VERIFIED_OPPORTUNITIES) {
    let score = 5;
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'Verified government apprenticeship scheme with statutory monthly stipend.';

    const eligibleCoursesStr = (i.eligibleCourses || []).join(' ').toLowerCase();
    const titleStr = i.title.toLowerCase();
    const deptStr = (i.departmentOrDomain || '').toLowerCase();

    if (isTechOrEng && (eligibleCoursesStr.includes('b.tech') || eligibleCoursesStr.includes('b.e') || eligibleCoursesStr.includes('engineering') || titleStr.includes('software') || titleStr.includes('technology') || deptStr.includes('engineering'))) {
      score += 35;
      matchStatus = 'Strong Match';
      matchReason = `Direct curriculum match for ${profile.course || 'B.Tech'} student${instName ? ` at ${instName}` : ''} with monthly stipend.`;
    } else if (interests.some((int) => titleStr.includes(int) || deptStr.includes(int))) {
      score += 20;
      matchStatus = 'Strong Match';
      matchReason = `Matches your chosen study domain in ${interests[0] || 'applied sciences'}.`;
    }

    if (i.location.toLowerCase().includes('tamil nadu') || i.state.toLowerCase().includes('tamil nadu')) {
      score += 10;
    }

    internshipMatches.push({
      score,
      rec: {
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
      },
    });
  }

  internshipMatches.sort((a, b) => b.score - a.score);
  recommendations.push(...internshipMatches.slice(0, 2).map((m) => m.rec));

  // =========================================================================
  // 4. EXAMINATIONS (Module 04)
  // =========================================================================
  const examMatches: { rec: OpportunityRecommendation; score: number }[] = [];

  for (const e of EXAMINATIONS_DATABASE) {
    let score = 5;
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'State & national competitive examination pathway.';

    const stages = e.targetStages || [];
    const disciplines = e.courseDisciplines || [];

    // Check Stage
    if (isUG && stages.some((st) => st.includes('Undergraduate') || st.includes('Degree'))) {
      score += 15;
    } else if (isPG && stages.some((st) => st.includes('Postgraduate') || st.includes('Master'))) {
      score += 20;
    } else if (isSchool && stages.some((st) => st.includes('10') || st.includes('12') || st.includes('School'))) {
      score += 20;
    }

    // Check Discipline
    if (isTechOrEng && disciplines.includes('Engineering')) {
      score += 30;
      matchStatus = 'Strong Match';
      matchReason = `Key examination for Engineering / B.Tech graduates targeting public sector and professional roles.`;
    }

    // Specific high-value tests
    if (e.id === 'tcs-nqt' && (isUG || careerInterests.includes('private sector employment'))) {
      score += 25;
      matchStatus = 'Strong Match';
      matchReason = 'High-volume national corporate qualifier test for engineering and science graduates.';
    } else if (e.id === 'tnpsc-group-1' && (isUG || isPG)) {
      score += 20;
      matchStatus = 'Strong Match';
      matchReason = 'Premier Tamil Nadu statutory civil service examination open to any bachelor graduate.';
    } else if (e.id === 'tn-set' && (isPG || isResearch)) {
      score += 35;
      matchStatus = 'Strong Match';
      matchReason = 'Qualifying examination for Assistant Professorship in Tamil Nadu Universities.';
    }

    examMatches.push({
      score,
      rec: {
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
      },
    });
  }

  examMatches.sort((a, b) => b.score - a.score);
  recommendations.push(...examMatches.slice(0, 2).map((m) => m.rec));

  // =========================================================================
  // 5. ADMISSIONS & CONTINUITY (Module 06)
  // =========================================================================
  const admissionMatches: { rec: OpportunityRecommendation; score: number }[] = [];

  for (const a of ADMISSION_PATHWAYS) {
    let score = 5;
    let matchStatus: MatchStatus = 'Possible Match';
    let matchReason = 'Single-window government counselling & seat allocation system.';

    if (isUG && (a.id === 'tn-tancet-postgraduate' || a.id === 'transfer-anna-univ' || a.id === 'reentry-anna-univ')) {
      score += 30;
      matchStatus = 'Strong Match';
      matchReason = `Anna University postgraduate entrance & academic continuity pathway for ${profile.course || 'engineering'} students.`;
    } else if (isSchool && (a.id === 'tn-tnea-engineering' || a.id === 'tn-tngasa-arts-science')) {
      score += 35;
      matchStatus = 'Strong Match';
      matchReason = 'Single-window counselling for Tamil Nadu degree college admissions.';
    }

    admissionMatches.push({
      score,
      rec: {
        id: `adm-${a.id}`,
        category: 'Admission',
        title: a.title,
        awardingAuthority: a.authority,
        matchStatus,
        matchReason,
        deadline: a.applicationPeriod || 'Annual Single-Window Schedule',
        officialSource: a.portalName || a.authority,
        officialUrl: a.portalUrl || 'https://www.tneaonline.org',
        moduleRoute: '/admissions',
        moduleNumber: '06',
        highlights: [a.level, 'Single Window Counselling'],
      },
    });
  }

  admissionMatches.sort((a, b) => b.score - a.score);
  if (admissionMatches.length > 0) {
    recommendations.push(admissionMatches[0].rec);
  }

  // =========================================================================
  // 6. ACADEMIC SUPPORT (Module 07)
  // =========================================================================
  if (VERIFIED_LEARNING_RESOURCES && VERIFIED_LEARNING_RESOURCES.length > 0) {
    const s = VERIFIED_LEARNING_RESOURCES[0];
    recommendations.push({
      id: `acad-${s.id}`,
      category: 'Academic',
      title: `${s.title} Curriculum Roadmap`,
      awardingAuthority: s.organisation,
      matchStatus: 'Strong Match',
      matchReason: `Government-verified curriculum syllabus and interactive roadmaps tailored for ${profile.course || 'degree students'}.`,
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
