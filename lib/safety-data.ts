/**
 * STUDENT RSO 2.0 – MODULE 02: SAFETY & GRIEVANCE SYSTEM
 * 
 * Production Intelligence Catalog, Statutory Authority Mappings,
 * Emergency Helplines, and Guided Decision Engine.
 * 
 * Intended for Tamil Nadu Higher Education & Public Guidance.
 * Strict Rule: Only verified, authentic government portals & statutory authorities.
 */

export type SafetyCategoryCode =
  | 'ragging'
  | 'bullying'
  | 'harassment'
  | 'discrimination'
  | 'staff-misconduct'
  | 'threats-intimidation'
  | 'unfair-treatment'
  | 'cyberbullying'
  | 'child-protection'
  | 'other-concerns';

export type VerificationStatus =
  | 'Official Source – Confirmed'
  | 'Official Source – Needs Recheck'
  | 'Temporarily Unavailable'
  | 'Link Changed'
  | 'Unverified';

export type GovernmentClassification =
  | 'A. Tamil Nadu Government'
  | 'B. Central Government'
  | 'C. Statutory Commissions'
  | 'D. Higher Education Authorities'
  | 'E. Police and Emergency Services'
  | 'F. Child Protection Services'
  | 'G. Cybercrime Reporting';

export interface SafetyCategory {
  code: SafetyCategoryCode;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  shortDescription: string;
  scopeItems: string[];
  primaryAuthorities: string[];
  officialPortals: {
    name: string;
    url: string;
    complaintUrl?: string;
    isDirectComplaint?: boolean;
    domain: string;
  }[];
  helplines: {
    name: string;
    number: string;
    telUrl: string;
    hours?: string;
    note?: string;
  }[];
  stepByStepGuidance: string[];
  requestedInformation: string[];
  acknowledgementToSave: string;
  followUpProcess: string;
  alternativeEscalation: string;
  jurisdictionLimitations: string;
  lastVerified: string;
  verificationStatus: VerificationStatus;
}

export interface OfficialReportingAuthority {
  id: string;
  name: string;
  classification: GovernmentClassification;
  purpose: string;
  applicableComplaints: string[];
  officialUrl: string;
  complaintUrl: string;
  helpline?: string;
  telUrl?: string;
  domain: string;
  verificationStatus: VerificationStatus;
  sourceLimitations: string;
  lastVerified: string;
}

export interface EmergencyHelpline {
  number: string;
  telUrl: string;
  title: string;
  authority: string;
  purpose: string;
  hours: string;
  isIntegratedEmergency?: boolean;
  priorityOrder: number;
}

export interface ComplaintChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Preparation' | 'Documentation' | 'Submission' | 'Post-Submission';
}

export interface ExternalComplaintRecord {
  id: string;
  authorityName: string;
  complaintCategory: string;
  externalReferenceNumber: string;
  submissionDate: string;
  status:
    | 'Preparing'
    | 'Submitted'
    | 'Acknowledged'
    | 'Under Review'
    | 'Additional Information Requested'
    | 'Resolved'
    | 'Closed';
  followUpDate?: string;
  personalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuidedFinderInputs {
  issueType: SafetyCategoryCode | 'unclear';
  incidentLocation: 'school' | 'college' | 'university' | 'hostel' | 'workplace' | 'online';
  immediateDanger: boolean;
  natureOrGround: string;
  isMinor: boolean;
}

export interface GuidedFinderResult {
  isEmergency: boolean;
  emergencyNotice?: string;
  primaryAuthority: OfficialReportingAuthority;
  secondaryEscalationAuthority?: OfficialReportingAuthority;
  reason: string;
  jurisdictionNote: string;
  recommendedSteps: string[];
  relevantHelplines: { name: string; number: string; telUrl: string }[];
}

// -----------------------------------------------------------------------------
// 1. PROMINENT EMERGENCY HELPLINES REGISTRY
// -----------------------------------------------------------------------------
export const EMERGENCY_HELPLINES: EmergencyHelpline[] = [
  {
    number: '112',
    telUrl: 'tel:112',
    title: 'Integrated Emergency Response Support System (ERSS)',
    authority: 'Ministry of Home Affairs & Tamil Nadu Police',
    purpose: 'For immediate life danger, severe physical violence, active intimidation or urgent police, fire, or medical dispatch.',
    hours: '24x7 Active Integrated Emergency Service',
    isIntegratedEmergency: true,
    priorityOrder: 1,
  },
  {
    number: '1098',
    telUrl: 'tel:1098',
    title: 'Childline National Emergency Service',
    authority: 'Ministry of Women & Child Development / NCPCR',
    purpose: 'Dedicated protection service for school students and minors (under 18) experiencing abuse, child rights violation, or exploitation.',
    hours: '24x7 Toll-Free Emergency Support for Minors',
    priorityOrder: 2,
  },
  {
    number: '181',
    telUrl: 'tel:181',
    title: 'Women Helpline (Toll-Free Support)',
    authority: 'Department of Social Welfare & Women Rights, Govt of Tamil Nadu',
    purpose: 'Support, counseling, and rescue coordination for female students facing gender-based harassment, violence, or distress.',
    hours: '24x7 Dedicated Women & Girls Helpline',
    priorityOrder: 3,
  },
  {
    number: '1800-180-5522',
    telUrl: 'tel:18001805522',
    title: 'National Anti-Ragging Toll-Free Helpline',
    authority: 'University Grants Commission (UGC) Anti-Ragging Regulatory Cell',
    purpose: 'Official toll-free reporting line for any form of physical, verbal, mental ragging or senior intimidation in higher education.',
    hours: '24x7 Toll-Free Multi-Language Helpline',
    priorityOrder: 4,
  },
  {
    number: '1930',
    telUrl: 'tel:1930',
    title: 'Citizen Financial Cyber Fraud Helpline',
    authority: 'Indian Cyber Crime Coordination Centre (I4C), MHA',
    purpose: 'Immediate reporting of online financial fraud, scholarship impersonation scams, phishing, or unauthorized banking deductions.',
    hours: 'National Cyber Financial Emergency Service',
    priorityOrder: 5,
  },
  {
    number: '1100',
    telUrl: 'tel:1100',
    title: 'Tamil Nadu CM Helpline (Makkaludan Mudhalvar)',
    authority: 'Tamil Nadu e-Governance Agency (TNeGA), Govt of Tamil Nadu',
    purpose: 'Public grievance redressal concerning Tamil Nadu state educational institutions, government college administration, and welfare directorates.',
    hours: 'Official State Public Grievance Helpline',
    priorityOrder: 6,
  },
];

// -----------------------------------------------------------------------------
// 2. OFFICIAL GOVERNMENT REPORTING DIRECTORY (A through G)
// -----------------------------------------------------------------------------
export const OFFICIAL_AUTHORITIES: OfficialReportingAuthority[] = [
  // A. Tamil Nadu Government
  {
    id: 'auth-tn-cm-helpline',
    name: 'Tamil Nadu Chief Minister Helpline (CM Helpline Portal)',
    classification: 'A. Tamil Nadu Government',
    purpose: 'Official grievance portal of the Government of Tamil Nadu for unresolved complaints concerning state collegiate education, welfare directorates, and state universities.',
    applicableComplaints: ['Staff misconduct in state institutions', 'Denied welfare benefits', 'Hostel infrastructure failures', 'State administrative neglect'],
    officialUrl: 'https://cmhelpline.tnega.org/portal/en/home',
    complaintUrl: 'https://cmhelpline.tnega.org/portal/en/home',
    helpline: '1100',
    telUrl: 'tel:1100',
    domain: 'cmhelpline.tnega.org',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Applicable to institutions and directorates under the Government of Tamil Nadu.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-tn-dce',
    name: 'Directorate of Collegiate Education (DCE), Tamil Nadu',
    classification: 'A. Tamil Nadu Government',
    purpose: 'Supervising authority for Arts, Science and Education colleges across Tamil Nadu.',
    applicableComplaints: ['College administrative malpractice', 'Unfair fee levies', 'Institutional service denial in TN colleges'],
    officialUrl: 'https://tndce.tn.gov.in/',
    complaintUrl: 'https://tndce.tn.gov.in/',
    domain: 'dce.tn.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Applies to Arts & Science colleges under DCE jurisdiction in Tamil Nadu.',
    lastVerified: '06 November 2026',
  },

  // B. Central Government
  {
    id: 'auth-anti-ragging',
    name: 'National Anti-Ragging Monitoring Agency (UGC)',
    classification: 'B. Central Government',
    purpose: 'Statutory national reporting system established pursuant to Supreme Court directives and UGC regulations to eliminate ragging in higher educational institutions.',
    applicableComplaints: ['Physical ragging', 'Verbal intimidation', 'Hostel harassment by seniors', 'Forced acts', 'Threats for refusing ragging'],
    officialUrl: 'https://www.antiragging.in/',
    complaintUrl: 'https://www.antiragging.in/complaint_register_form.html',
    helpline: '1800-180-5522',
    telUrl: 'tel:18001805522',
    domain: 'antiragging.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Covers higher education institutions across India recognized under Central or State statutes.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-ugc-samadhaan',
    name: 'UGC e-Samadhaan (Higher Education Grievance Redressal Portal)',
    classification: 'B. Central Government',
    purpose: 'Centralized statutory portal of the University Grants Commission for all student and faculty grievances across Indian universities and colleges.',
    applicableComplaints: ['Harassment by staff/students', 'Caste discrimination', 'Delayed degree certificates', 'Unfair internal evaluation', 'Denial of student amenities'],
    officialUrl: 'https://samadhaan.ugc.ac.in/',
    complaintUrl: 'https://samadhaan.ugc.ac.in/',
    domain: 'samadhaan.ugc.ac.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Covers universities and colleges under UGC purview. Requires registration on the e-Samadhaan platform.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-aicte-grievance',
    name: 'AICTE Centralized Grievance Redressal Portal',
    classification: 'B. Central Government',
    purpose: 'Statutory body monitoring and addressing grievances in technical, engineering, pharmacy, and management institutions.',
    applicableComplaints: ['Technical college capitation fee issues', 'Withholding of original student certificates', 'Unapproved engineering curricula'],
    officialUrl: 'https://www.aicte.gov.in/centralized-support-system',
    complaintUrl: 'https://www.aicte.gov.in/centralized-support-system',
    domain: 'aicte.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Restricted to AICTE-approved technical institutions.',
    lastVerified: '06 November 2026',
  },

  // C. Statutory Commissions
  {
    id: 'auth-ncsc',
    name: 'National Commission for Scheduled Castes (NCSC)',
    classification: 'C. Statutory Commissions',
    purpose: 'Constitutional body established under Article 338 of the Constitution to safeguard rights of Scheduled Caste students against discrimination and atrocities.',
    applicableComplaints: ['Caste-based discrimination', 'Hostel segregation', 'Denied reservation benefits', 'Untouchability practices'],
    officialUrl: 'https://ncsc.nic.in/',
    complaintUrl: 'https://ncsccmis.nic.in/',
    domain: 'ncsc.nic.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Specifically investigates caste discrimination against Scheduled Caste individuals under statutory mandate.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-ncpcr',
    name: 'National Commission for Protection of Child Rights (NCPCR)',
    classification: 'C. Statutory Commissions',
    purpose: 'Statutory commission established under the CPCR Act 2005 protecting rights of children and minors up to 18 years of age.',
    applicableComplaints: ['School corporal punishment', 'Bullying of minors', 'Exploitation in boarding schools', 'Violation of Right to Education (RTE)'],
    officialUrl: 'https://ncpcr.gov.in/',
    complaintUrl: 'https://ncpcr.gov.in/index_ebaalnidan.php/main/complaint',
    helpline: '1098',
    telUrl: 'tel:1098',
    domain: 'ncpcr.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Jurisdiction strictly applies to students below 18 years of age.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-ncw',
    name: 'National Commission for Women (NCW)',
    classification: 'C. Statutory Commissions',
    purpose: 'Statutory body protecting rights and safety of women, operating a 24x7 online complaint cell for gender harassment and exploitation.',
    applicableComplaints: ['Severe gender harassment', 'Cyber stalking of women', 'Institutional inaction on sexual harassment complaints'],
    officialUrl: 'https://ncw.nic.in/',
    complaintUrl: 'http://ncwapps.nic.in/onlinecomplaintsv2/',
    helpline: '7827170170',
    telUrl: 'tel:7827170170',
    domain: 'ncw.nic.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Applies to female students. Recommends exhausting institutional Internal Committee first for educational disputes.',
    lastVerified: '06 November 2026',
  },

  // D. Higher Education Authorities
  {
    id: 'auth-ugc-student-corner',
    name: 'UGC Student Corner & Ombudsman Guidelines',
    classification: 'D. Higher Education Authorities',
    purpose: 'Official university grievance regulations, statutory student rights, and institution-level Ombudsperson appointment mandates.',
    applicableComplaints: ['Establishment of Student Grievance Redressal Committees (SGRC)', 'University Ombudsman appeals'],
    officialUrl: 'https://www.ugc.gov.in/Home/student_Corner',
    complaintUrl: 'https://samadhaan.ugc.ac.in/',
    domain: 'ugc.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Information clearinghouse and regulatory guidelines for university students.',
    lastVerified: '06 November 2026',
  },

  // E. Police and Emergency Services
  {
    id: 'auth-police-erss',
    name: 'Integrated Emergency Response Support System (112 ERSS)',
    classification: 'E. Police and Emergency Services',
    purpose: 'Unified emergency response system linking emergency police control rooms, PCR vans, fire, and medical teams across Tamil Nadu.',
    applicableComplaints: ['Physical assault', 'Imminent threat to life', 'Violent campus riots', 'Kidnapping or illegal detention'],
    officialUrl: 'https://112.gov.in/',
    complaintUrl: 'tel:112',
    helpline: '112',
    telUrl: 'tel:112',
    domain: '112.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'For immediate emergency dispatch. Non-emergency student administrative matters should be routed through GRC/UGC.',
    lastVerified: '06 November 2026',
  },
  {
    id: 'auth-tn-police-citizen',
    name: 'Tamil Nadu Police Citizen Services Portal',
    classification: 'E. Police and Emergency Services',
    purpose: 'Online police complaint registration and FIR status tracking for cognizable offences within Tamil Nadu.',
    applicableComplaints: ['Theft of certificates/laptops', 'Physical threats', 'Assault incidents outside campus'],
    officialUrl: 'https://www.police.tn.gov.in/citizenportal',
    complaintUrl: 'https://www.police.tn.gov.in/citizenportal',
    domain: 'police.tn.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Covers criminal offences within Tamil Nadu police jurisdiction.',
    lastVerified: '06 November 2026',
  },

  // F. Child Protection Services
  {
    id: 'auth-child-baalnidan',
    name: 'e-BaalNidan (National Child Grievance Portal)',
    classification: 'F. Child Protection Services',
    purpose: 'Direct child rights complaint portal managed by NCPCR for reporting violations against minor students under POSCO, RTE, and Juvenile Justice Acts.',
    applicableComplaints: ['Child abuse', 'School safety breaches', 'Denied admission under RTE', 'Physical harassment in school hostels'],
    officialUrl: 'https://ncpcr.gov.in/',
    complaintUrl: 'https://ncpcr.gov.in/index_ebaalnidan.php/main/complaint',
    helpline: '1098',
    telUrl: 'tel:1098',
    domain: 'ncpcr.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Restricted to children and adolescents under 18 years of age.',
    lastVerified: '06 November 2026',
  },

  // G. Cybercrime Reporting
  {
    id: 'auth-cyber-crime-portal',
    name: 'National Cyber Crime Reporting Portal',
    classification: 'G. Cybercrime Reporting',
    purpose: 'Central government citizen portal operated by Ministry of Home Affairs to report online harassment, cyberstalking, non-consensual media sharing, and financial cybercrimes.',
    applicableComplaints: ['Online defamation', 'Fake social media accounts', 'Cyber extortion', 'Unsolicited explicit messages', 'Digital financial fraud'],
    officialUrl: 'https://cybercrime.gov.in/home',
    complaintUrl: 'https://cybercrime.gov.in/Webform/Accept.aspx',
    helpline: '1930',
    telUrl: 'tel:1930',
    domain: 'cybercrime.gov.in',
    verificationStatus: 'Official Source – Confirmed',
    sourceLimitations: 'Operates as an intelligence and incident reporting clearinghouse; jurisdictional state police examine report for FIR registration.',
    lastVerified: '06 November 2026',
  },
];

// -----------------------------------------------------------------------------
// 3. TEN STUDENT ISSUE CATEGORIES (EXHAUSTIVE DETAILED SPECIFICATIONS)
// -----------------------------------------------------------------------------
export const SAFETY_CATEGORIES: SafetyCategory[] = [
  {
    code: 'ragging',
    number: '01',
    title: 'Ragging & Senior Intimidation',
    subtitle: 'Zero tolerance across all higher education institutions in India.',
    icon: 'gavel',
    badge: 'ZERO TOLERANCE • STATUTORY OFFENCE',
    shortDescription:
      'Any conduct by students whether by words spoken, written, or by an act which has the effect of teasing, treating, or handling with rudeness a fresher or junior student.',
    scopeItems: [
      'Physical assault, physical abuse or forceful physical tasks.',
      'Verbal abuse, obscene jokes, or derogatory language.',
      'Mental harassment, humiliation, or psychological intimidation.',
      'Senior student intimidation in hostels, mess halls, or buses.',
      'Forced activities, dress codes, or compulsory chores.',
      'Ragging during admission, freshers week, or college sports.',
      'Direct or implied threats related to refusing ragging demands.',
    ],
    primaryAuthorities: [
      'National Anti-Ragging Regulatory Cell (UGC)',
      'College Anti-Ragging Committee (Mandatory Supreme Court Compliance)',
      'Head of Institution / Principal',
      'Local Police (Under TN Prohibition of Ragging Act)',
    ],
    officialPortals: [
      {
        name: 'National Anti-Ragging Portal',
        url: 'https://www.antiragging.in/',
        complaintUrl: 'https://www.antiragging.in/complaint_register_form.html',
        isDirectComplaint: true,
        domain: 'antiragging.in',
      },
      {
        name: 'UGC Official Regulatory Notice',
        url: 'https://www.antiragging.in/',
        domain: 'antiragging.in',
      },
    ],
    helplines: [
      {
        name: 'UGC 24x7 Anti-Ragging Toll-Free Helpline',
        number: '1800-180-5522',
        telUrl: 'tel:18001805522',
        hours: '24x7 Multi-Language Support',
        note: 'Toll-free across all telecom networks in India',
      },
      {
        name: 'Official UGC Anti-Ragging Monitoring Email',
        number: 'helpline@antiragging.in',
        telUrl: 'mailto:helpline@antiragging.in',
        note: 'Monitored centrally with automated tracking ticket generation',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Identify the incident and do not agree to meet alleged seniors in private or hostel rooms.',
      'Step 2: Access the National Anti-Ragging Portal (antiragging.in) or call 1800-180-5522 immediately.',
      'Step 3: Complete the official complaint register form with college name, location, dates, and names of individuals if known.',
      'Step 4: Save the auto-generated Complaint Registration Number (Ticket Reference) sent to your mobile/email.',
      'Step 5: UGC automatically intimates the College Principal, District Magistrate, and Police Superintendent for mandatory 24-hour enquiry.',
    ],
    requestedInformation: [
      'Full Name of College / University and Campus City/District.',
      'Date, time, and specific location (hostel room, campus ground, bus route).',
      'Names or identifying details of students involved (if known; complaints can request confidentiality).',
      'Factual description of the acts or threats committed.',
      'Details of any prior informal complaint made to hostel warden or faculty.',
    ],
    acknowledgementToSave:
      'Official Anti-Ragging Complaint Registration Number (e.g., AR-TN-2026-XXXX) sent via SMS and confirmation email from helpline@antiragging.in.',
    followUpProcess:
      'Use the "Track Complaint" feature on antiragging.in using your ticket number. The college anti-ragging squad is legally obligated to submit an action-taken report within 24 to 48 hours.',
    alternativeEscalation:
      'If the college principal fails to act, UGC escalates directly to the Tamil Nadu Higher Education Secretary and the District Collector under the Tamil Nadu Prohibition of Ragging Act, 1997.',
    jurisdictionLimitations:
      'Applies to all recognized universities, deemed universities, engineering colleges, polytechnics, medical institutions, and arts & science colleges.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'bullying',
    number: '02',
    title: 'Student Bullying & Peer Aggression',
    subtitle: 'Institutional accountability and safe learning environments.',
    icon: 'sentiment_very_dissatisfied',
    badge: 'STUDENT WELFARE • ANTI-BULLYING',
    shortDescription:
      'Repeated, intentional verbal, physical, psychological, or social harm by an individual student or peer group where there is a power imbalance.',
    scopeItems: [
      'Repeated verbal abuse, insults, name-calling or derogatory mocking.',
      'Social ostracization, forced isolation, or group boycotts.',
      'Threatening gestures, intimidation in corridors or cafeteria.',
      'Hostel bullying, extortion of food, clothing, or pocket money.',
      'Bullying in student group chats, messaging apps, or gaming servers.',
      'Targeting students based on regional dialect, language, or appearance.',
    ],
    primaryAuthorities: [
      'Institution Student Welfare Officer / Dean of Student Affairs',
      'College Grievance Redressal Committee (GRC)',
      'Hostel Chief Warden',
      'UGC e-Samadhaan (for persistent higher education grievances)',
      'Emergency 112 (if immediate physical harm is threatened)',
    ],
    officialPortals: [
      {
        name: 'UGC e-Samadhaan Portal',
        url: 'https://samadhaan.ugc.ac.in/',
        complaintUrl: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
      {
        name: 'National Cyber Crime Reporting Portal (for online bullying)',
        url: 'https://cybercrime.gov.in/',
        domain: 'cybercrime.gov.in',
      },
    ],
    helplines: [
      {
        name: 'Integrated Emergency Service (Imminent Danger)',
        number: '112',
        telUrl: 'tel:112',
        hours: '24x7 Integrated Emergency',
      },
      {
        name: 'Tele-MANAS National Mental Health Helpline',
        number: '14416',
        telUrl: 'tel:14416',
        hours: '24x7 Psychological Support & Counseling',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Document specific incidents with approximate dates, places, witnesses, and text messages/screenshots if any.',
      'Step 2: Submit a factual written letter to the Head of Department (HOD) or Institutional Grievance Redressal Committee.',
      'Step 3: If in a college hostel, immediately submit a formal complaint to the Hostel Warden and request room/block relocation if necessary.',
      'Step 4: Request a formal acknowledgment or stamped receipt of your written grievance.',
      'Step 5: If the institution does not initiate enquiry within 7 working days, escalate to university ombudsman or UGC e-Samadhaan.',
    ],
    requestedInformation: [
      'Student roll number, department, and academic year.',
      'Names or identities of students engaging in bullying conduct.',
      'Chronology of incidents with dates and locations.',
      'Copies of any threatening digital messages or eyewitness names.',
    ],
    acknowledgementToSave:
      'Institutional Grievance Filing Inward Number or registered email acknowledgment from college grievance cell.',
    followUpProcess:
      'Contact the Student Welfare Dean or student counsellor after 5 working days. If unresolved, record institutional inaction on UGC e-Samadhaan.',
    alternativeEscalation:
      'State Directorate of Collegiate Education (DCE) or University Ombudsman appointed under UGC Grievance Redressal Regulations 2023.',
    jurisdictionLimitations:
      'Institution-level grievance mechanisms resolve internal campus disputes; incidents involving bodily harm or cyberstalking trigger criminal police jurisdiction.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'harassment',
    number: '03',
    title: 'Harassment & Gender Safety',
    subtitle: 'Statutory protection under Internal Committee (IC) & UGC POSH Regulations.',
    icon: 'security',
    badge: 'STATUTORY IC / POSH PROTECTION',
    shortDescription:
      'Unwanted, offensive, or coercive conduct of a sexual or gender-discriminatory nature committed by students, faculty, or staff members.',
    scopeItems: [
      'Sexual harassment, unwelcome physical contact, or sexual advances.',
      'Demand or request for sexual favours in exchange for marks, attendance, or recommendations.',
      'Gender-based slurs, sexist comments, or hostile classroom environments.',
      'Harassment by faculty members, research guides, or laboratory assistants.',
      'Harassment by administrative, hostel, or non-teaching employees.',
      'Digital stalking, sending unsolicited explicit messages or images.',
    ],
    primaryAuthorities: [
      'Institutional Internal Committee (IC / ICC) — Mandatory under POSH Act 2013',
      'College Grievance Redressal Committee',
      'UGC e-Samadhaan (Higher Education Student Corner)',
      'State Women Helpline 181 (Tamil Nadu)',
      'Local Police Station / All Women Police Station (AWPS) for cognizable offences',
    ],
    officialPortals: [
      {
        name: 'UGC Student Corner & Saksham Portal Guidelines',
        url: 'https://www.ugc.gov.in/Home/student_Corner',
        domain: 'ugc.gov.in',
      },
      {
        name: 'UGC e-Samadhaan',
        url: 'https://samadhaan.ugc.ac.in/',
        complaintUrl: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
      {
        name: 'National Commission for Women (NCW)',
        url: 'http://ncwapps.nic.in/onlinecomplaintsv2/',
        domain: 'ncw.nic.in',
      },
    ],
    helplines: [
      {
        name: 'Tamil Nadu Women Helpline',
        number: '181',
        telUrl: 'tel:181',
        hours: '24x7 Dedicated Women & Girls Helpline',
      },
      {
        name: 'Integrated Emergency Service',
        number: '112',
        telUrl: 'tel:112',
        hours: '24x7 Emergency Police Response',
      },
      {
        name: 'NCW 24x7 Women Helpline',
        number: '7827170170',
        telUrl: 'tel:7827170170',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Understand your right to approach the Internal Committee (IC) constituted in every educational institution under UGC Regulations 2015.',
      'Step 2: Submit 6 copies of the written complaint along with supporting documents and witness list to the Presiding Officer of the IC within 3 months of the incident.',
      'Step 3: The IC is legally bound to maintain confidentiality and provide copies of findings within statutory timelines.',
      'Step 4: You have the right to request interim relief (change of guide, transfer of class, protection against victimisation).',
      'Step 5: If the complaint involves severe criminal violence or the college refuses to constitute an IC, contact 181 or local All Women Police Station directly.',
    ],
    requestedInformation: [
      'Name, department, and designation of the respondent (student or staff).',
      'Detailed factual narrative of each incident with dates, times, and context.',
      'Supporting evidence: messages, emails, audio/video recordings, or witness contacts.',
      'Impact of the conduct on your academic standing, thesis work, or well-being.',
    ],
    acknowledgementToSave:
      'Official stamped acknowledgment receipt from the IC Presiding Officer with date of submission.',
    followUpProcess:
      'IC inquiry must complete within 90 days. The report is submitted to the Executive Authority/Principal with recommendations within 10 days of completion.',
    alternativeEscalation:
      'University Ombudsman, UGC Saksham monitoring committee, or National/State Commission for Women.',
    jurisdictionLimitations:
      'Internal Committees adjudicate civil institutional service/academic measures; criminal actions (FIR under IPC/BNS) proceed independently through police/courts.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'discrimination',
    number: '04',
    title: 'Discrimination & Equal Opportunity',
    subtitle: 'Protection against caste, community, religious, disability & gender bias.',
    icon: 'balance',
    badge: 'CONSTITUTIONAL SAFEGUARDS • EQUAL RIGHTS',
    shortDescription:
      'Differential, prejudicial, or unfair treatment of students based on caste, community, religion, gender, disability, or socio-economic background.',
    scopeItems: [
      'Caste-based discrimination, derogatory comments, or caste slurs.',
      'Denial or intentional delay in verifying SC/ST/BC/MBC scholarship applications.',
      'Hostel segregation or discriminatory seating in classrooms and dining areas.',
      'Disability-based discrimination, denial of reasonable accommodations or barrier-free access.',
      'Discriminatory evaluation or viva marking based on social identity.',
      'Denial of access to library, sports, or academic facilities available to other students.',
    ],
    primaryAuthorities: [
      'Institution Equal Opportunity Cell (EOC) / SC/ST Cell',
      'College Grievance Redressal Committee (GRC)',
      'UGC e-Samadhaan (Special Caste Discrimination Prevention Channel)',
      'National Commission for Scheduled Castes (NCSC)',
      'State Commissionerate for the Differently Abled (Tamil Nadu)',
    ],
    officialPortals: [
      {
        name: 'UGC e-Samadhaan (Discrimination Cell)',
        url: 'https://samadhaan.ugc.ac.in/',
        complaintUrl: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
      {
        name: 'National Commission for Scheduled Castes (NCSC Portal)',
        url: 'https://ncsc.nic.in/',
        complaintUrl: 'https://ncsccmis.nic.in/',
        isDirectComplaint: true,
        domain: 'ncsc.nic.in',
      },
      {
        name: 'TN Commission for Differently Abled',
        url: 'https://adw.tn.gov.in/',
        domain: 'scd.tn.gov.in',
      },
    ],
    helplines: [
      {
        name: 'National Helpline for Prevention of Atrocities',
        number: '14566',
        telUrl: 'tel:14566',
        hours: '24x7 Toll-Free Multi-Language',
        note: 'Ministry of Social Justice and Empowerment',
      },
      {
        name: 'Tamil Nadu CM Helpline',
        number: '1100',
        telUrl: 'tel:1100',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Check whether your institution has an active SC/ST Cell or Equal Opportunity Cell as mandated by UGC regulations.',
      'Step 2: Submit a formal complaint in writing to the Cell Coordinator or College Grievance Redressal Committee.',
      'Step 3: Detail the specific discriminatory act (e.g. withheld scholarship signatures, viva bias, or verbal slurs).',
      'Step 4: If no action is taken within 14 days, register an online grievance on UGC e-Samadhaan under "Discrimination".',
      'Step 5: For severe caste atrocities, file a formal petition directly through the NCSC Grievance Portal (ncsccmis.nic.in) or local police under the SC/ST (PoA) Act.',
    ],
    requestedInformation: [
      'Student identity, category (SC, ST, BC, MBC, PwD, etc.), and roll number.',
      'Name and designation of the offending staff member, student, or committee.',
      'Factual record of dates, discriminatory statements, or withholding of benefits.',
      'Copies of any rejected application forms or discriminatory official notices.',
    ],
    acknowledgementToSave:
      'NCSC Portal Filing Token (e.g. NCSC/2026/XXXX) or UGC e-Samadhaan Tracking ID.',
    followUpProcess:
      'Track statutory inquiry on NCSC or UGC portals. The college head must submit a compliance report to the commission.',
    alternativeEscalation:
      'State Human Rights Commission (SHRC) Tamil Nadu or District Vigilance Committee chaired by District Collector.',
    jurisdictionLimitations:
      'NCSC handles Scheduled Caste complaints; NCPCR handles minor children; general discrimination appeals go through UGC and University Ombudsman.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'staff-misconduct',
    number: '05',
    title: 'Staff Misconduct & Administrative Abuse',
    subtitle: 'Accountability for teaching and non-teaching institutional personnel.',
    icon: 'badge',
    badge: 'ADMINISTRATIVE INTEGRITY • GRIEVANCE REDRESS',
    shortDescription:
      'Unprofessional behaviour, misuse of authority, arbitrary academic victimisation, or improper administrative conduct by institutional employees.',
    scopeItems: [
      'Arbitrary withholding of hall tickets, transfer certificates, or marks cards.',
      'Demanding unofficial fees, donations, or capitation payments.',
      'Unprofessional, abusive, or threatening language by faculty or lab staff.',
      'Deliberate academic victimisation or threats to fail students.',
      'Neglect of mandatory classes or refusal to guide research scholars.',
      'Administrative extortion or refusal to process official student applications.',
    ],
    primaryAuthorities: [
      'Head of the Institution / College Principal',
      'University Registrar & Controller of Examinations',
      'Directorate of Collegiate Education (DCE), Tamil Nadu',
      'Directorate of Technical Education (DoTE) for polytechnic/engineering colleges',
      'Tamil Nadu CM Helpline (1100) for state government institutions',
    ],
    officialPortals: [
      {
        name: 'Tamil Nadu CM Helpline Portal',
        url: 'https://cmhelpline.tnega.org/portal/en/home',
        complaintUrl: 'https://cmhelpline.tnega.org/portal/en/home',
        isDirectComplaint: true,
        domain: 'cmhelpline.tnega.org',
      },
      {
        name: 'UGC e-Samadhaan Portal',
        url: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
      {
        name: 'DoTE Tamil Nadu',
        url: 'https://dte.tn.gov.in/',
        domain: 'dote.tn.gov.in',
      },
    ],
    helplines: [
      {
        name: 'Tamil Nadu CM Helpline',
        number: '1100',
        telUrl: 'tel:1100',
        hours: 'State Public Grievance Helpline',
      },
      {
        name: 'Directorate of Collegiate Education Information Cell',
        number: '044-28260480',
        telUrl: 'tel:04428260480',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Do not confront the staff member individually; maintain written records of all official interactions.',
      'Step 2: Submit a formal representation to the College Principal or Registrar detailing the administrative lapse.',
      'Step 3: If the matter concerns withholding certificates or demanding unofficial payments, cite UGC/DoTE circulars explicitly prohibiting certificate retention.',
      'Step 4: If the Principal is the subject of the complaint or fails to respond, escalate to the University Registrar or DCE Regional Joint Director.',
      'Step 5: For state government colleges or university departments, submit a grievance on the Tamil Nadu CM Helpline portal (cmhelpline.tnega.org).',
    ],
    requestedInformation: [
      'Name, department, and designation of the staff member.',
      'Official student enrolment credentials and academic year.',
      'Dates of application submission, receipts of fee paid, or email correspondence.',
      'Specific rules or university regulations violated by the staff conduct.',
    ],
    acknowledgementToSave:
      'TN CM Helpline Docket Number (e.g. TN/2026/XXXXX) or University Registrar Inward Number.',
    followUpProcess:
      'Check status on cmhelpline.tnega.org using docket number. Government departments must record departmental action taken.',
    alternativeEscalation:
      'Higher Education Department, Government of Tamil Nadu, or Directorate of Vigilance and Anti-Corruption (DVAC) for bribery/capitation demands.',
    jurisdictionLimitations:
      'Internal academic disputes must first exhaust college/university grievance procedures before state departmental escalation.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'threats-intimidation',
    number: '06',
    title: 'Threats & Physical Intimidation',
    subtitle: 'Urgent personal safety, security response and law enforcement coordination.',
    icon: 'shield_alert',
    badge: 'PERSONAL SAFETY • IMMEDIATE RESPONSE',
    shortDescription:
      'Explicit or implied threats of physical violence, coercion, academic sabotage, or intimidation by individuals or organized student groups.',
    scopeItems: [
      'Threatening messages via phone calls, SMS, WhatsApp, or paper notes.',
      'Physical stalking, intimidation at hostel gates, bus stops, or campus exits.',
      'Coercion to join political groups, illegal strikes, or unauthorized campus factions.',
      'Threats involving academic consequences (e.g. "We will ensure you are debarred").',
      'Hostel gang intimidation, weapon display, or room lockouts.',
      'Extortion demands backed by threats of violence or social humiliation.',
    ],
    primaryAuthorities: [
      'Integrated Emergency Response Support System (112)',
      'Campus Security Office / Chief Security Officer',
      'Hostel Warden & Principal',
      'Local Police Station (Jurisdiction over campus area)',
      'National Cyber Crime Reporting Portal (if threats are delivered online)',
    ],
    officialPortals: [
      {
        name: 'Integrated Emergency Service (112 ERSS)',
        url: 'https://112.gov.in/',
        complaintUrl: 'tel:112',
        domain: '112.gov.in',
      },
      {
        name: 'TN Police Citizen Portal',
        url: 'https://www.police.tn.gov.in/citizenportal',
        domain: 'police.tn.gov.in',
      },
      {
        name: 'National Cyber Crime Portal (for online threats)',
        url: 'https://cybercrime.gov.in/home',
        domain: 'cybercrime.gov.in',
      },
    ],
    helplines: [
      {
        name: 'Integrated Emergency Police Helpline',
        number: '112',
        telUrl: 'tel:112',
        hours: '24x7 Immediate Emergency Dispatch',
      },
      {
        name: 'Tamil Nadu Police Control Room',
        number: '100',
        telUrl: 'tel:100',
      },
    ],
    stepByStepGuidance: [
      'Step 1: If in immediate danger, move to a safe, populated area (library, faculty room, security booth) and dial 112 immediately.',
      'Step 2: Do not delete threatening text messages, voicemails, call logs, or letters; take photos and export backup copies.',
      'Step 3: Alert the Campus Security Officer and Principal in writing, detailing the threat to your life or safety.',
      'Step 4: If threats persist or involve weapons/extortion, file a formal complaint with the local police station to obtain a Community Service Register (CSR) or FIR.',
      'Step 5: Request immediate campus protection or hostel relocation while the police/institution investigates.',
    ],
    requestedInformation: [
      'Your location, current phone number, and safe contact information.',
      'Names, descriptions, vehicle numbers, or phone numbers of perpetrators.',
      'Exact wording and nature of the threats delivered.',
      'Screenshots of messages with timestamps and sender metadata.',
    ],
    acknowledgementToSave:
      'Police CSR (Community Service Register) Number or Crime FIR copy stamped by local police station.',
    followUpProcess:
      'Contact the investigating Sub-Inspector or campus security head with the CSR/FIR reference.',
    alternativeEscalation:
      'City Police Commissioner / District Superintendent of Police (SP) or District Collector.',
    jurisdictionLimitations:
      'Immediate physical threats are police matters; Student RSO provides informational guidance and cannot replace emergency dispatch.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'unfair-treatment',
    number: '07',
    title: 'Unfair Academic & Examination Treatment',
    subtitle: 'Transparent evaluations, examination rights, and fair disciplinary hearings.',
    icon: 'assignment_late',
    badge: 'EXAMINATION INTEGRITY • ACADEMIC DUE PROCESS',
    shortDescription:
      'Violations of university examination regulations, biased internal evaluation, arbitrary disciplinary sanctions, or unjustified denial of academic facilities.',
    scopeItems: [
      'Biased or manipulated continuous internal assessment (CIA) marks.',
      'Arbitrary detention from university examinations despite meeting attendance rules.',
      'Improper examination hall administration, paper leaks, or sudden syllabus deviation.',
      'Disciplinary punishment without written show-cause notice or fair hearing.',
      'Arbitrary cancellation of examination papers without proper investigation.',
      'Denial of rightful revaluation, answer script copy, or retotalling rights.',
    ],
    primaryAuthorities: [
      'College Examination Grievance Committee',
      'University Controller of Examinations (COE)',
      'University Academic Ombudsman',
      'UGC e-Samadhaan (Academic Grievance Channel)',
      'State Higher Education Department, Tamil Nadu',
    ],
    officialPortals: [
      {
        name: 'UGC e-Samadhaan (Academic Grievance Redressal)',
        url: 'https://samadhaan.ugc.ac.in/',
        complaintUrl: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
      {
        name: 'Anna University Student Grievance Redressal (Engineering)',
        url: 'https://www.annauniv.edu/',
        domain: 'annauniv.edu',
      },
      {
        name: 'University of Madras Student Grievance Cell',
        url: 'https://www.unom.ac.in/',
        domain: 'unom.ac.in',
      },
    ],
    helplines: [
      {
        name: 'UGC Student Support Helpline',
        number: '1800-111-656',
        telUrl: 'tel:1800111656',
        hours: 'Working Hours Support',
      },
      {
        name: 'Tamil Nadu CM Helpline',
        number: '1100',
        telUrl: 'tel:1100',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Check your university examination handbook for revaluation, attendance condonation, and disciplinary enquiry regulations.',
      'Step 2: Submit a formal application to the Controller of Examinations (COE) within the prescribed window for answer script photocopy or revaluation.',
      'Step 3: If contesting unfair internal assessment marks, submit a written representation to the Academic Dean with proof of submitted assignments and test marks.',
      'Step 4: If disciplinary suspension or debarment is ordered without due process, petition the University Ombudsperson within 15 days.',
      'Step 5: File an appeal on UGC e-Samadhaan if the university fails to constitute an independent review committee.',
    ],
    requestedInformation: [
      'University register number, degree, branch, and semester.',
      'Subject code, subject name, exam date, and hall ticket number.',
      'Copies of mark sheets, attendance percentage records, or show-cause notices.',
      'Written chronology demonstrating violation of published university statutes.',
    ],
    acknowledgementToSave:
      'Controller of Examinations (COE) Fee Challan & Application Reference or University Ombudsman Filing Receipt.',
    followUpProcess:
      'Track university revaluation or ombudsman hearing dates. Ombudsman decisions are binding on affiliated institutions.',
    alternativeEscalation:
      'Vice-Chancellor of the affiliating university or Higher Education Department, Govt of Tamil Nadu.',
    jurisdictionLimitations:
      'Evaluation appeals must strictly follow university statutory deadlines; administrative courts require exhaustion of internal remedies.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'cyberbullying',
    number: '08',
    title: 'Cyberbullying & Digital Safety',
    subtitle: 'National Cyber Crime Reporting & online harassment deterrence.',
    icon: 'devices',
    badge: 'CYBERCRIME REPORTING • I4C COMPLIANT',
    shortDescription:
      'Harassment, impersonation, cyberstalking, non-consensual media sharing, or financial fraud executed through digital networks, social media, or messaging apps.',
    scopeItems: [
      'Creation of fake social media profiles or impersonation accounts.',
      'Circulation of morphed, defamatory, or non-consensual private photographs.',
      'Persistent cyberstalking, unsolicited calls, or threatening direct messages.',
      'Doxxing (unauthorized online sharing of student phone number, address, or roll number).',
      'Cyber financial fraud: fake scholarship portals, phishing links, or OTP theft.',
      'Group harassment, coordinated downvoting, or trolling campaigns targeting students.',
    ],
    primaryAuthorities: [
      'National Cyber Crime Reporting Portal (cybercrime.gov.in)',
      'Tamil Nadu State Cyber Crime Wing (Cyber Police Stations in each District/City)',
      'Citizen Financial Cyber Fraud Helpline (1930)',
      'College IT / Disciplinary Committee',
    ],
    officialPortals: [
      {
        name: 'National Cyber Crime Reporting Portal',
        url: 'https://cybercrime.gov.in/',
        complaintUrl: 'https://cybercrime.gov.in/Webform/Accept.aspx',
        isDirectComplaint: true,
        domain: 'cybercrime.gov.in',
      },
      {
        name: 'Report Women & Child Cyber Crime Specifically',
        url: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
        domain: 'cybercrime.gov.in',
      },
      {
        name: 'CERT-In Incident Reporting',
        url: 'https://www.cert-in.org.in/',
        domain: 'cert-in.org.in',
      },
    ],
    helplines: [
      {
        name: 'National Cyber Financial Fraud Helpline',
        number: '1930',
        telUrl: 'tel:1930',
        hours: '24x7 Immediate Fraud Mitigation',
        note: 'Call immediately if scholarship/tuition money was fraudulently transferred',
      },
      {
        name: 'Tamil Nadu Cyber Crime Wing',
        number: '044-28447701',
        telUrl: 'tel:04428447701',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Do not delete evidence. Preserve screenshots showing profile URL, account handle, date/time, and complete message text.',
      'Step 2: Block the user on the platform, but first export conversation backups or screen recordings.',
      'Step 3: If financial theft occurred, dial 1930 within the "golden hour" to freeze the recipient bank/wallet account.',
      'Step 4: Visit cybercrime.gov.in, select "Report Other Cyber Crime" (or "Report Crime Related to Women/Children"), and register the complaint.',
      'Step 5: Save the Cyber Crime Acknowledgement Number and submit a copy to your local Cyber Crime Police Station if summoned for verification.',
    ],
    requestedInformation: [
      'URLs, handles, or IP headers of the offending social media profiles.',
      'Screenshots of messages, posts, or emails clearly displaying date and timestamps.',
      'Bank transaction reference numbers (UTR) if financial fraud was committed.',
      'Details of platform reporting attempts (e.g. Instagram/Meta or WhatsApp report ticket).',
    ],
    acknowledgementToSave:
      'National Cyber Crime Portal Acknowledgement Number (e.g. 2026/CYBER/XXXXXXX) with downloadable PDF copy.',
    followUpProcess:
      'Check status on cybercrime.gov.in using your acknowledgment number. The assigned Cyber Crime Police Station reviews and updates status.',
    alternativeEscalation:
      'Superintendent of Police (Cyber Crime Wing), Tamil Nadu Police Headquarters, Chennai.',
    jurisdictionLimitations:
      'Filing on cybercrime.gov.in creates an official intelligence record for state police evaluation; an FIR is registered upon initial police inquiry.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'child-protection',
    number: '09',
    title: 'Child & Minor Student Protection',
    subtitle: 'Statutory safeguarding under POCSO Act, RTE Act & NCPCR guidelines.',
    icon: 'child_care',
    badge: 'CHILD SAFEGUARDING • UNDER 18 MANDATE',
    shortDescription:
      'Safeguarding children and minor students (below 18 years) in schools, residential hostels, polytechnics, and competitive junior coaching centres.',
    scopeItems: [
      'Physical corporal punishment or humiliation in school environments.',
      'Abuse, exploitation, or misconduct involving minor school students.',
      'Severe bullying, hazing, or extortion in school hostels.',
      'Denial of basic safety, drinking water, or sanitary infrastructure in schools.',
      'Arbitrary expulsion or denial of admission violating the Right to Education (RTE) Act.',
      'Child labor, institutional neglect, or endangerment of boarding students.',
    ],
    primaryAuthorities: [
      'Childline India / National Emergency Response (1098 / 112)',
      'National Commission for Protection of Child Rights (NCPCR)',
      'Tamil Nadu Commission for Protection of Child Rights (TNCPCR)',
      'District Child Protection Unit (DCPU) & Child Welfare Committee (CWC)',
      'Chief Educational Officer (CEO) of the respective District',
    ],
    officialPortals: [
      {
        name: 'NCPCR e-BaalNidan Complaint Portal',
        url: 'https://ncpcr.gov.in/',
        complaintUrl: 'https://ncpcr.gov.in/index_ebaalnidan.php/main/complaint',
        isDirectComplaint: true,
        domain: 'ncpcr.gov.in',
      },
      {
        name: 'POCSO e-Box (National POCSO Reporting)',
        url: 'https://ncpcr.gov.in/',
        complaintUrl: 'https://ncpcr.gov.in/',
        isDirectComplaint: true,
        domain: 'ncpcr.gov.in',
      },
      {
        name: 'Samagra Shiksha Tamil Nadu',
        url: 'https://emis.tnschools.gov.in/',
        domain: 'tnschools.gov.in',
      },
    ],
    helplines: [
      {
        name: 'National Child Helpline',
        number: '1098',
        telUrl: 'tel:1098',
        hours: '24x7 Dedicated Emergency Helpline for Children',
      },
      {
        name: 'Integrated Emergency Service',
        number: '112',
        telUrl: 'tel:112',
        hours: '24x7 Emergency Police & Rescue',
      },
    ],
    stepByStepGuidance: [
      'Step 1: If a child is in danger or undergoing abuse, immediately inform a trusted adult, parent, or call 1098 or 112.',
      'Step 2: Do not compel a minor to disclose traumatic details in public; confidential reports can be submitted by parents, guardians, or teachers.',
      'Step 3: Access the e-BaalNidan portal (ncpcr.gov.in) to register child rights or school safety violations.',
      'Step 4: For allegations under the POCSO Act, mandatory reporting is required by law; institutions cannot conceal allegations.',
      'Step 5: The District Child Protection Officer (DCPO) and Child Welfare Committee (CWC) initiate physical verification and care protection.',
    ],
    requestedInformation: [
      'Child approximate age, school name, standard, and location.',
      'Factual description of the safety violation or abuse observed.',
      'Details of the school administration or individuals involved.',
      'Contact information of parent, guardian, or notifying person.',
    ],
    acknowledgementToSave:
      'e-BaalNidan Registration Reference (e.g. EBN/2026/XXXXX) or Childline 1098 Docket ID.',
    followUpProcess:
      'The District Child Protection Unit (DCPU) or NCPCR sends inquiry notices to the District Collector and School Education Department.',
    alternativeEscalation:
      'District Collector (District Magistrate) or Tamil Nadu State Commission for Protection of Child Rights (TNCPCR), Chennai.',
    jurisdictionLimitations:
      'Mandatory applicability for all children below 18 years of age across government, aided, and private matriculation/CBSE schools.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
  {
    code: 'other-concerns',
    number: '10',
    title: 'Hostel, Campus Welfare & Public Grievances',
    subtitle: 'Institutional infrastructure, student amenities, and public welfare standards.',
    icon: 'home_work',
    badge: 'STUDENT AMENITIES • CAMPUS WELFARE',
    shortDescription:
      'Unsafe hostel accommodation, lack of drinking water/sanitation, transport neglect, unhygienic mess food, or denial of basic student public services.',
    scopeItems: [
      'Unhygienic drinking water, contaminated food, or uninspected mess facilities.',
      'Hostel security breaches, missing boundary walls, or absence of female security.',
      'Inaccessible disability ramps, broken laboratory safety equipment, or chemical hazards.',
      'Unscheduled college bus cancellations causing safety hazards for day scholars.',
      'Denial of student concession forms, rail/bus pass attestations, or bonafide certificates.',
      'Arbitrary campus electricity/water cutoffs during examination periods.',
    ],
    primaryAuthorities: [
      'Hostel Management Committee & Chief Warden',
      'Campus Safety & Health Inspectorate',
      'Food Safety and Standards Authority of India (FSSAI) for campus canteens',
      'Tamil Nadu CM Helpline (1100)',
      'University Student Welfare Directorate',
    ],
    officialPortals: [
      {
        name: 'Tamil Nadu CM Helpline Portal',
        url: 'https://cmhelpline.tnega.org/portal/en/home',
        complaintUrl: 'https://cmhelpline.tnega.org/portal/en/home',
        isDirectComplaint: true,
        domain: 'cmhelpline.tnega.org',
      },
      {
        name: 'FSSAI Consumer Grievance (Food Safety in Campus)',
        url: 'https://foscos.fssai.gov.in/consumergrievance/',
        domain: 'fssai.gov.in',
      },
      {
        name: 'UGC e-Samadhaan (General Amenities Channel)',
        url: 'https://samadhaan.ugc.ac.in/',
        domain: 'samadhaan.ugc.ac.in',
      },
    ],
    helplines: [
      {
        name: 'Tamil Nadu CM Helpline',
        number: '1100',
        telUrl: 'tel:1100',
        hours: 'State Public Grievance Helpline',
      },
      {
        name: 'FSSAI National Food Safety Toll-Free Helpline',
        number: '1800-112-100',
        telUrl: 'tel:1800112100',
      },
    ],
    stepByStepGuidance: [
      'Step 1: Document safety or hygiene hazards with clear photographs (e.g. contaminated water dispenser or hazardous wiring).',
      'Step 2: Submit a joint petition signed by hostel residents or student representatives to the Chief Warden and Principal.',
      'Step 3: If food contamination or food poisoning occurs, lodge a direct food safety complaint on the FSSAI portal or notify local food safety officer.',
      'Step 4: For state-run or welfare hostels (BC/MBC/Adi Dravidar), register the complaint on the Tamil Nadu CM Helpline (1100).',
      'Step 5: Follow up with the District Collector office if basic sanitation or drinking water is neglected.',
    ],
    requestedInformation: [
      'Hostel block name, room numbers, campus name, and district.',
      'Clear description of the amenity or infrastructure failure.',
      'Photographic or water test evidence where available.',
      'Copies of previous maintenance requests submitted to the warden.',
    ],
    acknowledgementToSave:
      'CM Helpline Docket Number or College Inward Petition Receipt.',
    followUpProcess:
      'CM Helpline tickets must be assigned to the District Welfare Officer or Higher Education Joint Director for field inspection.',
    alternativeEscalation:
      'District Collectorate Public Grievance Day (every Monday at Collector Office) or Tamil Nadu State Human Rights Commission.',
    jurisdictionLimitations:
      'Applies to living conditions, campus public health, student amenities, and public welfare execution.',
    lastVerified: '06 November 2026',
    verificationStatus: 'Official Source – Confirmed',
  },
];

// -----------------------------------------------------------------------------
// 4. COMPLAINT PREPARATION CHECKLIST (10 ACTIONABLE ITEMS)
// -----------------------------------------------------------------------------
export const COMPLAINT_CHECKLIST: ComplaintChecklistItem[] = [
  {
    id: 'chk-authority',
    title: '1. Identify the Correct Reporting Authority',
    description: 'Determine whether your issue falls under the College Anti-Ragging Committee, Internal Committee (IC), UGC e-Samadhaan, Cyber Crime Portal, or Emergency 112.',
    category: 'Preparation',
  },
  {
    id: 'chk-instructions',
    title: '2. Read Official Reporting Instructions',
    description: 'Check the specific guidelines of the government or institutional portal so you know mandatory formats, file size limits, and time windows.',
    category: 'Preparation',
  },
  {
    id: 'chk-dates-locations',
    title: '3. Record Relevant Dates, Times, and Locations',
    description: 'Prepare an accurate chronological record noting specific classroom, hostel block, laboratory, bus route, or online platform details.',
    category: 'Documentation',
  },
  {
    id: 'chk-factual-description',
    title: '4. Prepare an Objective Factual Description',
    description: 'Write a calm, precise description of events in chronological order. Avoid emotional insults and focus strictly on facts, words spoken, and actions taken.',
    category: 'Documentation',
  },
  {
    id: 'chk-witnesses',
    title: '5. Identify Relevant Witnesses (If Applicable)',
    description: 'Note names, batch numbers, or contacts of students, faculty, or staff who observed the incident and can verify facts if questioned.',
    category: 'Documentation',
  },
  {
    id: 'chk-evidence-safe',
    title: '6. Preserve Supporting Material Safely',
    description: 'Save original screenshots, emails, call logs, fee receipts, or medical records in a secure cloud drive or external storage before submitting.',
    category: 'Documentation',
  },
  {
    id: 'chk-privacy',
    title: '7. Avoid Sharing Sensitive Details Publicly',
    description: 'Do not post unverified allegations or private phone numbers on social media, which may compromise statutory inquiries or breach defamation laws.',
    category: 'Submission',
  },
  {
    id: 'chk-review',
    title: '8. Review Your Complaint Before Submitting',
    description: 'Ensure names, college details, and contact credentials are typed accurately so official enquiry teams can reach you.',
    category: 'Submission',
  },
  {
    id: 'chk-acknowledgement',
    title: '9. Save the Official Acknowledgement Receipt',
    description: 'Download the confirmation PDF, note the registration token, or screenshot the confirmation screen immediately after submission.',
    category: 'Post-Submission',
  },
  {
    id: 'chk-followup',
    title: '10. Track and Follow Up Respecting Service Norms',
    description: 'Use the official portal tracking option. If inquiry standards are breached without cause, use verified statutory escalation routes.',
    category: 'Post-Submission',
  },
];

// -----------------------------------------------------------------------------
// 5. GUIDED DECISION ENGINE (SMART AUTHORITY FINDER)
// -----------------------------------------------------------------------------
export function evaluateSafetyAuthority(inputs: GuidedFinderInputs): GuidedFinderResult {
  const { immediateDanger, issueType, incidentLocation, isMinor, natureOrGround } = inputs;

  // RULE 1: EMERGENCY FIRST
  if (immediateDanger) {
    const emergencyAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-police-erss')!;
    return {
      isEmergency: true,
      emergencyNotice:
        'IMMEDIATE EMERGENCY ALERT: You indicated an imminent threat of violence or danger. Dial 112 immediately. Do not wait for an online form or grievance portal.',
      primaryAuthority: emergencyAuth,
      reason:
        'When physical safety or life is in imminent danger, the Integrated Emergency Response Support System (112) is the only authorized service for real-time police, rescue, or medical dispatch.',
      jurisdictionNote:
        '112 dispatches immediate police and PCR patrol across all districts of Tamil Nadu and nationwide.',
      recommendedSteps: [
        'Call 112 immediately from any mobile or landline network.',
        'State your current exact location: College name, hostel block, or road junction.',
        'Move to a well-lit, populated area (security office, principal chamber, nearby shop).',
        'Once emergency protection is active, proceed with institutional disciplinary complaints.',
      ],
      relevantHelplines: [
        { name: 'Integrated Emergency Service', number: '112', telUrl: 'tel:112' },
        { name: 'Tamil Nadu Police Control Room', number: '100', telUrl: 'tel:100' },
      ],
    };
  }

  // RULE 2: MINORS & SCHOOL STUDENTS
  if (isMinor || incidentLocation === 'school' || issueType === 'child-protection') {
    const childAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-child-baalnidan')!;
    return {
      isEmergency: false,
      primaryAuthority: childAuth,
      reason:
        'The National Commission for Protection of Child Rights (NCPCR) and Childline (1098) hold dedicated statutory jurisdiction for protecting students under 18 years of age against school abuse, corporal punishment, and rights violations.',
      jurisdictionNote:
        'Applies under the Right to Education (RTE) Act and Protection of Children from Sexual Offences (POCSO) Act for all schools and junior institutions.',
      recommendedSteps: [
        'Confide in a parent, guardian, or trusted teacher.',
        'Call Childline 1098 for free, confidential student protection advice.',
        'Submit a formal complaint on the e-BaalNidan portal (ncpcr.gov.in).',
        'Notify the District Chief Educational Officer (CEO) if the school administration is non-responsive.',
      ],
      relevantHelplines: [
        { name: 'Childline National Helpline', number: '1098', telUrl: 'tel:1098' },
        { name: 'Integrated Emergency Service', number: '112', telUrl: 'tel:112' },
      ],
    };
  }

  // RULE 3: RAGGING
  if (issueType === 'ragging') {
    const antiRaggingAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-anti-ragging')!;
    return {
      isEmergency: false,
      primaryAuthority: antiRaggingAuth,
      secondaryEscalationAuthority: OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ugc-samadhaan'),
      reason:
        'The National Anti-Ragging Regulatory Cell (UGC) is mandated by Supreme Court directives to register every ragging complaint, notify the District Magistrate/Police SP, and demand a 24-hour compliance report from the college.',
      jurisdictionNote:
        'Covers all recognized universities, deemed universities, engineering colleges, polytechnics, and medical colleges.',
      recommendedSteps: [
        'Dial the 24x7 toll-free helpline: 1800-180-5522.',
        'Register your complaint on antiragging.in/complaint_register_form.html.',
        'Save your Complaint Ticket Number for tracking.',
        'Submit a written intimation to the College Anti-Ragging Committee.',
      ],
      relevantHelplines: [
        { name: 'UGC 24x7 Anti-Ragging Helpline', number: '1800-180-5522', telUrl: 'tel:18001805522' },
      ],
    };
  }

  // RULE 4: CYBERCRIME & ONLINE HARASSMENT
  if (issueType === 'cyberbullying' || incidentLocation === 'online') {
    const cyberAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-cyber-crime-portal')!;
    return {
      isEmergency: false,
      primaryAuthority: cyberAuth,
      reason:
        'The National Cyber Crime Reporting Portal (cybercrime.gov.in) operated by MHA is the statutory mechanism for investigating digital stalking, fake profile impersonation, doxxing, and financial fraud.',
      jurisdictionNote:
        'Reports are routed directly to the designated Cyber Crime Police Station of your district in Tamil Nadu.',
      recommendedSteps: [
        'Preserve all screenshots, message headers, and profile links.',
        'If financial fraud occurred, call 1930 within the golden hour to freeze bank transfers.',
        'File report on cybercrime.gov.in and download the acknowledgment PDF.',
        'Notify your college IT / Disciplinary committee if harassment involves batchmates.',
      ],
      relevantHelplines: [
        { name: 'Citizen Financial Cyber Fraud Helpline', number: '1930', telUrl: 'tel:1930' },
      ],
    };
  }

  // RULE 5: SEXUAL / GENDER HARASSMENT
  if (issueType === 'harassment' || natureOrGround.toLowerCase().includes('gender') || natureOrGround.toLowerCase().includes('sexual')) {
    const ugcAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ugc-student-corner')!;
    const ncwAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ncw');
    return {
      isEmergency: false,
      primaryAuthority: ugcAuth,
      secondaryEscalationAuthority: ncwAuth,
      reason:
        'Every higher educational institution is legally bound under the UGC POSH Regulations 2015 to maintain an active Internal Committee (IC) to conduct confidential inquiries into sexual and gender harassment.',
      jurisdictionNote:
        'Statutory inquiry must be concluded within 90 days. For criminal assault, independent police complaint (AWPS) is supported.',
      recommendedSteps: [
        'Submit a written complaint to the Presiding Officer of your college Internal Committee (IC).',
        'Request written acknowledgment and request any interim protective measures needed.',
        'Call Women Helpline 181 for guidance, legal aid counseling, or shelter assistance.',
        'If the institution conceals the complaint, escalate to UGC e-Samadhaan or NCW.',
      ],
      relevantHelplines: [
        { name: 'Tamil Nadu Women Helpline', number: '181', telUrl: 'tel:181' },
        { name: 'National Commission for Women Helpline', number: '7827170170', telUrl: 'tel:7827170170' },
      ],
    };
  }

  // RULE 6: CASTE / DISCRIMINATION
  if (issueType === 'discrimination' || natureOrGround.toLowerCase().includes('caste')) {
    const ncscAuth = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ncsc')!;
    const ugcSamadhaan = OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ugc-samadhaan')!;
    return {
      isEmergency: false,
      primaryAuthority: ugcSamadhaan,
      secondaryEscalationAuthority: ncscAuth,
      reason:
        'UGC e-Samadhaan maintains a dedicated monitoring channel for caste discrimination complaints, backed by constitutional oversight from the National Commission for Scheduled Castes (NCSC).',
      jurisdictionNote:
        'Covers university SC/ST cells, scholarship verification harassment, and classroom discrimination.',
      recommendedSteps: [
        'File representation before college SC/ST Cell and Grievance Committee.',
        'Register an online grievance on samadhaan.ugc.ac.in under Discrimination.',
        'If serious discrimination or atrocities occurred, file on ncsccmis.nic.in directly.',
      ],
      relevantHelplines: [
        { name: 'National Atrocity Prevention Helpline', number: '14566', telUrl: 'tel:14566' },
        { name: 'Tamil Nadu CM Helpline', number: '1100', telUrl: 'tel:1100' },
      ],
    };
  }

  // RULE 7: DEFAULT TO UGC E-SAMADHAAN OR TN CM HELPLINE
  const isTNStateDept = natureOrGround.toLowerCase().includes('state') || natureOrGround.toLowerCase().includes('hostel');
  const primary = isTNStateDept
    ? OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-tn-cm-helpline')!
    : OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ugc-samadhaan')!;

  return {
    isEmergency: false,
    primaryAuthority: primary,
    secondaryEscalationAuthority: OFFICIAL_AUTHORITIES.find((a) => a.id === 'auth-ugc-samadhaan'),
    reason: isTNStateDept
      ? 'Grievances involving Tamil Nadu government colleges, welfare directorates, or state hostel facilities are monitored directly by the Chief Minister Helpline.'
      : 'UGC e-Samadhaan is the statutory central gateway for academic, staff misconduct, evaluation, and administrative grievances across Indian higher education.',
    jurisdictionNote:
      'Requires submitting student enrolment credentials and a factual account of prior representation to college authorities.',
    recommendedSteps: [
      'Submit written grievance to your Head of Institution or Controller of Examinations.',
      'Obtain an acknowledgment copy or registered email receipt.',
      `Register online on ${primary.name}.`,
      'Save your tracking reference number and follow up within statutory response windows.',
    ],
    relevantHelplines: [
      { name: 'Tamil Nadu CM Helpline', number: '1100', telUrl: 'tel:1100' },
      { name: 'UGC Student Support', number: '1800-111-656', telUrl: 'tel:1800111656' },
    ],
  };
}

// -----------------------------------------------------------------------------
// 6. FREQUENTLY ASKED QUESTIONS (FAQS)
// -----------------------------------------------------------------------------
export const SAFETY_FAQS = [
  {
    question: 'Does filing a complaint on an official portal guarantee an immediate police FIR?',
    answer:
      'No. Submitting a complaint on a government portal like UGC e-Samadhaan or the National Cyber Crime Portal registers an official grievance or intelligence report. For criminal matters, the receiving authority or cyber police station evaluates the evidence and issues a Community Service Register (CSR) or formal First Information Report (FIR) based on cognizable legal grounds.',
  },
  {
    question: 'Can I report ragging without revealing my identity to the senior students?',
    answer:
      'Yes. The National Anti-Ragging Portal and UGC regulations explicitly allow students to request confidentiality. When you register a complaint via 1800-180-5522 or antiragging.in, you can mark your details as confidential so the accused students are not provided your identity during inquiry proceedings.',
  },
  {
    question: 'What is the Internal Committee (IC) and is every college required to have one?',
    answer:
      'Yes. Under the Sexual Harassment of Women at Workplace (POSH) Act 2013 and UGC Regulations 2015, every college and university must constitute an Internal Committee (IC). It must be headed by a senior woman faculty member, include employee and student representatives, and feature an external independent member from an NGO or legal background.',
  },
  {
    question: 'Can a college legally withhold my original mark sheets or transfer certificates?',
    answer:
      'No. The University Grants Commission (UGC) and All India Council for Technical Education (AICTE) have issued strict statutory circulars prohibiting educational institutions from retaining original academic certificates, mark sheets, or school transfer certificates under any circumstances.',
  },
  {
    question: 'Does Student RSO handle my complaint directly or forward it to authorities?',
    answer:
      'Student RSO is an independent digital information and rights guidance platform. We never act as a commercial intermediary, we do not collect sensitive incident narratives or passwords, and we do not claim official government integration. We empower students by directing them to genuine, verified government portals, statutory helplines, and exact reporting instructions.',
  },
  {
    question: 'What should I do first if someone is threatening me with immediate physical violence?',
    answer:
      'Dial 112 immediately. Do not spend time filling out online forms or writing complaint drafts. Move to a safe, populated area and allow emergency police dispatch to respond to active physical threats.',
  },
];
