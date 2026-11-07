/**
 * STUDENT RSO 2.0 – MODULE 03: CERTIFICATE & DOCUMENT SERVICE
 * 
 * Production Intelligence Catalog, Tamil Nadu e-Sevai / e-District Mappings,
 * Identity Documents, School/College Credentials, DigiLocker Engine,
 * Validity Intelligence, and Student Document Readiness Checker.
 * 
 * Strict Public Service Compliance:
 * - Real official portals (tnesevai.tn.gov.in, tnedistrict.tn.gov.in, uidai.gov.in, digilocker.gov.in, dge.tn.gov.in)
 * - Zero fake certificate download simulators
 * - Zero universal 1-year expiry assumptions
 * - Zero collection of Aadhaar OTPs, passwords, or biometrics
 */

export type EducationStage =
  | 'Class 10'
  | 'Class 11'
  | 'Class 12'
  | 'ITI'
  | 'Diploma'
  | 'Polytechnic'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Completed Postgraduate'
  | 'Research Scholar';

export type DocumentCategory =
  | 'Revenue & Government Certificates'
  | 'Identity Documents'
  | 'School Documents'
  | 'Diploma & Technical Documents'
  | 'College & University Documents'
  | 'Postgraduate & Research Documents'
  | 'Disability & Inclusion'
  | 'Other Revenue & Family Certificates';

export type ValidityClassification =
  | 'Fixed official validity'
  | 'Valid until printed expiry date'
  | 'No routine expiry specified by source'
  | 'Fresh issue may be required for specific purpose'
  | 'Validity depends on receiving institution or scheme'
  | 'Official validity information unavailable';

export interface DocumentItem {
  id: string;
  code?: string;
  title: string;
  category: DocumentCategory;
  issuingAuthority: string;
  governingDepartment: string;
  purpose: string;
  whoMayApply: string[];
  eligibilitySummary: string;
  supportingDocuments: string[];
  familyDocuments?: string[];
  applicationProcedure: string[];
  applicationPortalName: string;
  applicationPortalUrl: string;
  downloadPortalName: string;
  downloadPortalUrl: string;
  verificationPortalName: string;
  verificationPortalUrl: string;
  validityRule: string;
  validityClassification: ValidityClassification;
  renewalOrFreshIssueGuidance: string;
  duplicateProcedure: string;
  correctionProcedure: string;
  isDigiLockerAvailable: boolean;
  digiLockerIssuerName?: string;
  relevantEducationStages: EducationStage[];
  commonPurposes: string[];
  feeInfo: string;
  turnaroundTime: string;
  discrepancyNote?: string;
  verificationStatus: string;
  lastVerified: string;
}

export interface OfficialServiceEntry {
  id: string;
  name: string;
  category:
    | 'A. Tamil Nadu Government'
    | 'B. Central Government'
    | 'C. Identity Documents'
    | 'D. School Education'
    | 'E. Technical Education'
    | 'F. Universities'
    | 'G. Disability and Accessibility Services'
    | 'H. Digital Documents';
  department: string;
  purpose: string;
  domain: string;
  applicationUrl: string;
  downloadUrl: string;
  verificationUrl: string;
  supportContact?: string;
  lastChecked: string;
  verificationStatus: string;
  authorityBadge: string;
}

export interface ReadinessRequirement {
  id: string;
  documentId: string;
  documentName: string;
  isMandatory: boolean;
  reason: string;
  issuingAuthority: string;
  applicationUrl: string;
  downloadUrl: string;
  verificationUrl: string;
  validityGuidance: string;
}

export interface ExternalTrackerRecord {
  id: string;
  certificateName: string;
  issuingAuthority: string;
  externalReferenceNumber: string;
  applicationDate: string;
  status:
    | 'Preparing'
    | 'Ready to Apply'
    | 'Applied'
    | 'Under Review'
    | 'Additional Information Requested'
    | 'Approved'
    | 'Rejected'
    | 'Downloaded';
  followUpDate?: string;
  personalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// 1. TAMIL NADU GOVERNMENT & STATUTORY CERTIFICATES DATABASE
// -----------------------------------------------------------------------------
export const CERTIFICATES_CATALOGUE: DocumentItem[] = [
  // A. Community Certificate
  {
    id: 'rev-101-community',
    code: 'REV-101',
    title: 'Community Certificate (Caste Certificate)',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Revenue Administration Department (Tahsildar / Zonal Deputy Tahsildar)',
    governingDepartment: 'Revenue and Disaster Management Department, Government of Tamil Nadu',
    purpose: 'Official proof of belonging to Backward Class (BC), Most Backward Class (MBC), Denotified Community (DNC), Scheduled Caste (SC), or Scheduled Tribe (ST) to claim reservation in admissions, government scholarships, and competitive examinations.',
    whoMayApply: [
      'Tamil Nadu permanent residents belonging to notified communities.',
      'Parents/guardians applying on behalf of minor school students.',
      'College, university, and competitive exam aspirants seeking statutory quota reservation.',
    ],
    eligibilitySummary: 'The applicant or their parents must be genuine residents of Tamil Nadu belonging to one of the notified communities in the state schedule.',
    supportingDocuments: [
      'Applicant photo (passport size format)',
      'Proof of Residence (Ration Card / Smart Card / Family Card or Aadhaar Card)',
      'School transfer certificate (TC) showing community or school bonafide certificate',
      'Self-declaration of the applicant / parent',
    ],
    familyDocuments: [
      'Community certificate of father, mother, or siblings (vital primary evidence)',
      'Parent transfer certificate showing caste entry (if parent community certificate is unavailable)',
    ],
    applicationProcedure: [
      'Step 1: Create an account on the Tamil Nadu e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/) or visit an authorized e-Sevai centre.',
      'Step 2: Select Revenue Department -> Service REV-101 Community Certificate.',
      'Step 3: Register or enter your Citizen Access Number (CAN). If you do not have a CAN, complete CAN registration first using Aadhaar & Smart Card details.',
      'Step 4: Fill in applicant details, caste, sub-caste, and attach scanned supporting proofs.',
      'Step 5: Pay the statutory citizen fee (Rs. 60) online and note the Application Number.',
      'Step 6: The Village Administrative Officer (VAO), Revenue Inspector (RI), and Zonal Deputy Tahsildar verify the records and approve digitally.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-101)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Certificate Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Online Certificate Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Permanent validity for the community specified. Once issued with a digital barcode and QR signature by an authorized revenue official, it does not expire unless revoked due to false representation.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Routine annual renewal is NOT required. A fresh application is only necessary if your original certificate has torn, was issued in an older non-digital manual format requiring digital barcoded conversion, or if an official name correction is needed.',
    duplicateProcedure: 'If a digital certificate was previously issued, you can re-download it from tnedistrict.tn.gov.in using your Application Number. For older manual certificates, apply for a fresh digital certificate on e-Sevai referencing your old manual certificate copy.',
    correctionProcedure: 'Apply for correction through e-Sevai CAN update or submit a representation with school transfer certificates to the Taluk Tahsildar office.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['College admission', 'Scholarship application', 'Government examination', 'Competitive examination', 'Employment'],
    feeInfo: 'Statutory citizen portal fee: Rs. 60 (official e-Sevai rate)',
    turnaroundTime: 'Statutory delivery timeline: 15 to 30 working days from verification date',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // B. Nativity Certificate
  {
    id: 'rev-102-nativity',
    code: 'REV-102',
    title: 'Nativity Certificate',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue and Disaster Management Department, Government of Tamil Nadu',
    purpose: 'Certifies that the applicant was born in Tamil Nadu or has domicile roots in the state, mandatory for Tamil Nadu state quota admissions (TNEA engineering, TN Medical selection, TNGASA Arts & Science) and state scholarship schemes.',
    whoMayApply: [
      'Individuals born in Tamil Nadu.',
      'Students who resided continuously in Tamil Nadu for at least 5 years.',
      'Students whose parents are native to Tamil Nadu even if studied temporarily outside the state.',
    ],
    eligibilitySummary: 'Proof of birth in Tamil Nadu, parent nativity, or continuous residence of 5 years or more backed by municipal/school records.',
    supportingDocuments: [
      'Applicant Birth Certificate / School TC / Bonafide Certificate showing place of birth',
      'Ration Card / Smart Card / Aadhaar Card of applicant and parent',
      'Proof of continuous residence for 5 years (gas bill, property tax receipt, electricity bill, voter ID)',
      'Self-declaration of applicant / parent',
    ],
    familyDocuments: [
      'Parent Nativity Certificate / School Leaving Certificate showing parent place of birth',
      'Parent property documents or ancestral residence proof in Tamil Nadu',
    ],
    applicationProcedure: [
      'Step 1: Sign in to the TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/) with your CAN number.',
      'Step 2: Choose Revenue Department -> Service REV-102 Nativity Certificate.',
      'Step 3: Select whether claiming nativity by birth or continuous residence of 5+ years.',
      'Step 4: Upload applicant birth/school certificate and family residence records.',
      'Step 5: Pay Rs. 60 citizen fee and obtain your online tracking reference.',
      'Step 6: VAO field enquiry verifies nativity, followed by Revenue Inspector and Tahsildar digital signature.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-102)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Genuineness Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Permanent validity for nativity by birth. Nativity is an enduring statutory status and does not expire annually.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Nativity certificates do not require yearly renewal. However, if nativity was granted based on temporary 5-year continuous residence rather than birth, certain admission authorities (like MBBS counseling) may request recent verification of continued domicile.',
    duplicateProcedure: 'Re-download from tnedistrict.tn.gov.in using your original Application Number / Certificate Number.',
    correctionProcedure: 'Apply for correction via e-Sevai with birth certificate and parent records as evidence.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['College admission', 'Scholarship application', 'Competitive examination', 'Government examination'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 30 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // C. Income Certificate (Detailed Validity Rules)
  {
    id: 'rev-103-income',
    code: 'REV-103',
    title: 'Income Certificate',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue and Disaster Management Department, Government of Tamil Nadu',
    purpose: 'Official revenue document certifying the annual family income from all sources (salary, agriculture, business, profession) for establishing eligibility for welfare scholarships, tuition fee waivers (First Graduate, Post-Matric, PM-USP), and economic concessions.',
    whoMayApply: [
      'Students and parents whose annual household income falls within statutory welfare limits (e.g. <= Rs. 2.5 Lakhs for Post-Matric/Pudhumai Penn or <= Rs. 8 Lakhs for EWS/OBC-NCL).',
      'Employed, self-employed, agricultural, or informal sector family breadwinners.',
    ],
    eligibilitySummary: 'Accurate disclosure of annual income earned by all earning family members residing together, verified through revenue records, pay slips, or agricultural assessments.',
    supportingDocuments: [
      'Applicant / Parent Ration Card / Smart Card (mandatory proof of family tree)',
      'Aadhaar card of applicant and earning parents/guardians',
      'Salary certificate / Pay slip / Form 16 (for salaried government or private employees)',
      'Income Tax Return (ITR) acknowledgment (for business / professional households)',
      'Village Administrative Officer (VAO) income recommendation report (for agricultural / daily wage families)',
      'Self-declaration of annual household income',
    ],
    familyDocuments: [
      'Chitta / Adangal or patta copy (if family owns agricultural land)',
      'Electricity bill or property tax receipt of family residence',
    ],
    applicationProcedure: [
      'Step 1: Sign in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/) using CAN credentials.',
      'Step 2: Select Revenue Department -> Service REV-103 Income Certificate.',
      'Step 3: Enter complete family details: relationship, occupation, and individual annual income breakdown.',
      'Step 4: Upload family Smart Card, salary proof/ITR or agricultural assessment records.',
      'Step 5: Pay Rs. 60 statutory fee online and note your acknowledgment reference.',
      'Step 6: VAO conducts local enquiry to verify living standards, followed by RI scrutiny and Tahsildar digital signature.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-103)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Income Certificate Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Validity depends on the receiving institution or welfare scheme. While revenue records typically evaluate income for the financial year of issue, admissions and scholarships (such as NSP, TN Post-Matric, AICTE) routinely require an Income Certificate issued on or after April 1st of the current academic year. Do not assume universal indefinite validity.',
    validityClassification: 'Fresh issue may be required for specific purpose',
    renewalOrFreshIssueGuidance: 'Check the receiving scholarship or admission portal guidelines: Central schemes (NSP, PM-USP) and State Welfare directorates (BC/MBC/Adi Dravidar) require certificates issued within the current financial/academic year. When applying for fresh admission or renewal scholarships, obtain a fresh Income Certificate via e-Sevai using your existing CAN profile (takes only a few days if family income details remain consistent).',
    duplicateProcedure: 'Digitally signed certificates can be re-downloaded at any time from tnedistrict.tn.gov.in using the certificate number and issue date.',
    correctionProcedure: 'If income changed or was recorded incorrectly, apply for a fresh Income Certificate on e-Sevai submitting current pay slips, ITR, or updated VAO report.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Scholarship application', 'College admission', 'Fee concession', 'Government examination'],
    feeInfo: 'Statutory citizen portal fee: Rs. 60',
    turnaroundTime: '15 to 20 working days from verification date',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // D. First Graduate Certificate
  {
    id: 'rev-104-first-graduate',
    code: 'REV-104',
    title: 'First Graduate Certificate (No Graduate in Family)',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Directorate of Technical Education (DoTE) & Revenue Department, Tamil Nadu',
    purpose: 'Grants tuition fee concession / reimbursement for students whose parents, siblings, or grandparents have never graduated with a university degree, enabling free education in government and self-financing professional colleges under single-window counseling (TNEA).',
    whoMayApply: [
      'Students entering undergraduate professional degree courses (such as BE/BTech/MBBS) through government single-window counseling.',
      'Students where neither parents nor any elder sibling has obtained an undergraduate degree.',
    ],
    eligibilitySummary: 'Strict family educational qualification audit: Applicant must be the first person in their entire direct family (father, mother, brother, sister) to enroll in an undergraduate degree program.',
    supportingDocuments: [
      'Applicant 10th and 12th standard mark sheets / School TC',
      'Applicant Ration Card / Smart Card (compulsory proof of family members)',
      'Joint declaration signed by parents, applicant, and elder siblings on non-graduate status',
      'School leaving certificates of parents and siblings showing highest class completed',
    ],
    familyDocuments: [
      'Transfer certificates of father and mother proving educational status',
      'Transfer certificates of elder brothers / sisters showing non-degree education or discontinuation',
    ],
    applicationProcedure: [
      'Step 1: Sign in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/) with CAN profile.',
      'Step 2: Choose Revenue Department -> Service REV-104 First Graduate Certificate.',
      'Step 3: Enter educational details of every family member listed on your Smart Card.',
      'Step 4: Upload signed joint declaration, family Smart Card, and school TCs of parents and siblings.',
      'Step 5: Pay Rs. 60 fee and track online.',
      'Step 6: VAO inspects family background and confirms no previous graduate in family before Tahsildar issues certificate.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-104)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Permanent validity for undergraduate professional admission. Once issued and surrendered during counseling, it applies throughout the duration of that degree course.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Does NOT expire. Applicable once per family: If an elder sibling already utilized the First Graduate fee concession, a younger sibling cannot claim it.',
    duplicateProcedure: 'Re-download from tnedistrict.tn.gov.in using certificate number.',
    correctionProcedure: 'Family composition or name corrections require filing an e-Sevai grievance with Tahsildar approval.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 12', 'Diploma', 'Polytechnic', 'Undergraduate'],
    commonPurposes: ['College admission', 'Fee concession', 'Scholarship application'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 30 working days',
    discrepancyNote: 'Historical e-Sevai manuals sometimes referenced REV-104 as Family Income/Dependency in older archives; the verified active citizen catalogue confirms REV-104 as First Graduate Certificate.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // E. OBC Certificate (State vs Central Distinction)
  {
    id: 'rev-115-obc-ncl',
    code: 'REV-115',
    title: 'Other Backward Class (OBC) Certificate (Central Services / Non-Creamy Layer)',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Ministry of Social Justice & Empowerment / Revenue Dept Tamil Nadu',
    purpose: 'Official certificate for claiming 27% reservation in Central Government higher education institutions (IIT, NIT, IIM, Central Universities, AIIMS) and Central Government recruitments (UPSC, SSC, IBPS, Railways).',
    whoMayApply: [
      'Students belonging to communities included in the Central List of OBCs for Tamil Nadu.',
      'Households whose gross annual income from non-salary/non-agricultural sources is below the creamy layer threshold (currently Rs. 8 Lakhs per annum).',
    ],
    eligibilitySummary: 'Community must appear on the National Commission for Backward Classes (NCBC) Central List for Tamil Nadu, AND family must satisfy Non-Creamy Layer (NCL) criteria.',
    supportingDocuments: [
      'Applicant State Community Certificate (BC / MBC / DNC)',
      'Ration Card / Smart Card of the family',
      'Income Certificate / ITR / Form 16 / Salary slips of parents',
      'Aadhaar card of applicant and parents',
      'Self-declaration of Non-Creamy Layer status',
    ],
    familyDocuments: [
      'Parent employment proof (distinguishing Group A/B/C/D government employment or agricultural landholdings)',
    ],
    applicationProcedure: [
      'Step 1: Log in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/).',
      'Step 2: Choose Revenue Department -> Service REV-115 Other Backward Class (OBC) Certificate.',
      'Step 3: Enter State community details and verify that your caste is included in the Central OBC List on ncbc.nic.in.',
      'Step 4: Submit parental income and employment records to verify Non-Creamy Layer status.',
      'Step 5: Pay Rs. 60 fee and obtain e-Sevai tracking acknowledgment.',
      'Step 6: Tahsildar verifies Central list eligibility and issues certificate in the Government of India format.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-115)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Crucial distinction: While community status is permanent, the Non-Creamy Layer (NCL) status is financial-year specific. Central examinations (UPSC, JEE, NEET, CUET) require an OBC-NCL certificate issued on or after April 1st of the current financial year.',
    validityClassification: 'Fresh issue may be required for specific purpose',
    renewalOrFreshIssueGuidance: 'A State BC/MBC certificate does NOT automatically work for Central Government admissions. Apply for REV-115 annually before central admissions/examinations to ensure your NCL certificate is dated in the current financial year.',
    duplicateProcedure: 'Re-download via tnedistrict.tn.gov.in using your application number.',
    correctionProcedure: 'Re-apply on e-Sevai with updated income proofs and parental employment status.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 12', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Central university admission', 'Competitive examination', 'Government examination', 'Scholarship application'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 30 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // F. Residence Certificate
  {
    id: 'rev-116-residence',
    code: 'REV-116',
    title: 'Residence Certificate',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue and Disaster Management Department, Government of Tamil Nadu',
    purpose: 'Certifies current residential address within a specific taluk or revenue village in Tamil Nadu, distinct from Nativity (which certifies enduring domicile origin).',
    whoMayApply: [
      'Individuals currently living at a specific address in Tamil Nadu for a specified duration.',
      'Students requiring localized proof of current residence for school admissions, local body benefits, or passport verification.',
    ],
    eligibilitySummary: 'Proof of actual physical residence at the address stated for at least 6 months to 1 year.',
    supportingDocuments: [
      'Applicant photo',
      'Ration Card / Smart Card showing current address',
      'Electricity bill / Property tax receipt / Rental agreement of current home',
      'Self-declaration of applicant',
    ],
    applicationProcedure: [
      'Step 1: Sign in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/).',
      'Step 2: Select Revenue Department -> Service REV-116 Residence Certificate.',
      'Step 3: Enter current residential address and duration of stay.',
      'Step 4: Upload Smart Card, rental/electricity bill proof, and pay Rs. 60 fee.',
      'Step 5: VAO physically checks local stay and Tahsildar approves.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-116)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Certifies residence as on the date of inquiry. Does not carry permanent domicile status like a Nativity Certificate.',
    validityClassification: 'Validity depends on receiving institution or scheme',
    renewalOrFreshIssueGuidance: 'If you change residence, apply for a fresh Residence Certificate reflecting your new address.',
    duplicateProcedure: 'Re-download from tnedistrict.tn.gov.in using application number.',
    correctionProcedure: 'Apply for address update with new utility bill / rental deed.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate', 'Postgraduate'],
    commonPurposes: ['School admission', 'College admission', 'Identity verification'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 20 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // G. Unemployment Certificate
  {
    id: 'rev-108-unemployment',
    code: 'REV-108',
    title: 'Unemployment Certificate',
    category: 'Revenue & Government Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue Department & Employment Training, Tamil Nadu',
    purpose: 'Certifies that a qualified graduate / diploma holder is currently not gainfully employed in government or formal private sector, required for state unemployment assistance allowances, age concession benefits, and specialized welfare grants.',
    whoMayApply: [
      'Educated unemployed youth who completed Class 10, Class 12, ITI, Diploma, Undergraduate, or Postgraduate degrees.',
      'Registered jobseekers on the Tamil Nadu Employment Exchange portal.',
    ],
    eligibilitySummary: 'Applicant must have completed education, registered with the Employment Exchange, and currently have no taxable salary or government appointment.',
    supportingDocuments: [
      'Educational qualification certificates (SSLC/HSC/Degree mark sheets)',
      'Tamil Nadu Employment Exchange Registration Card (with continuous renewal registration)',
      'Aadhaar card and Smart Card',
      'Self-declaration of unemployment',
    ],
    applicationProcedure: [
      'Step 1: Sign in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/).',
      'Step 2: Select Revenue Department -> Service REV-108 Unemployment Certificate.',
      'Step 3: Enter educational details and Employment Exchange registration number.',
      'Step 4: Upload qualification certificates and declaration; pay Rs. 60 fee.',
      'Step 5: VAO verifies local employment status and Tahsildar issues digital certificate.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-108)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Time-bound validity (usually 6 months to 1 year depending on the specific state unemployment assistance scheme window).',
    validityClassification: 'Validity depends on receiving institution or scheme',
    renewalOrFreshIssueGuidance: 'Fresh certificate required when applying for each unemployment allowance cycle or government scheme sanction.',
    duplicateProcedure: 'Re-download from e-District using certificate reference.',
    correctionProcedure: 'File fresh application if educational credentials updated.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Diploma', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate'],
    commonPurposes: ['Employment', 'Welfare allowance', 'Age relaxation in examinations'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 20 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // H. Disability Certificate & UDID Card
  {
    id: 'disability-udid-card',
    code: 'UDID-01',
    title: 'Disability Certificate & Unique Disability ID (UDID) Card',
    category: 'Disability & Inclusion',
    issuingAuthority: 'Department of Empowerment of Persons with Disabilities (DEPwD), Ministry of Social Justice & Empowerment & Medical Authority Tamil Nadu',
    governingDepartment: 'Ministry of Social Justice & Empowerment & TN Commissionerate for the Welfare of the Differently Abled',
    purpose: 'Universal statutory proof of specified benchmark disability (40% or more) under the Rights of Persons with Disabilities (RPwD) Act 2016 for claiming educational quota, examination scribe accommodations, fee waivers, transport concessions, and national fellowships.',
    whoMayApply: [
      'Persons with benchmark disabilities across any of the 21 specified categories in the RPwD Act 2016 (locomotor, visual impairment, hearing impairment, intellectual disability, specific learning disability, etc.).',
      'Students requiring extra compensatory time, scribe facility, or quota reservation in NEET, JEE, UPSC, TNPSC, or college admissions.',
    ],
    eligibilitySummary: 'Medical assessment by an authorized District Medical Board confirming benchmark disability percentage.',
    supportingDocuments: [
      'Applicant color photograph (passport size)',
      'Proof of identity (Aadhaar Card / Voter ID / Birth Certificate)',
      'Proof of address (Aadhaar / Ration Card / Smart Card)',
      'Previous disability certificate issued by state medical officer (if converting to UDID)',
      'Clinical diagnostic reports (audiometry, vision assessment, neurological records if applicable)',
    ],
    applicationProcedure: [
      'Step 1: Visit the official National UDID Portal (swavlambancard.gov.in) and click "Apply for Disability Certificate & UDID Card".',
      'Step 2: Enter personal details, address, employment/student status, and select disability category.',
      'Step 3: Upload photograph, signature/thumb impression, ID proof, and address proof.',
      'Step 4: Submit application and receive Enrolment Number (e.g. TN2610XXXXXX).',
      'Step 5: Visit the assigned District Government Hospital / Medical Board on the appointed date for clinical assessment.',
      'Step 6: Medical Board enters disability percentage. Once approved, download e-Disability Certificate & e-UDID Card online. Physical plastic card is posted to residential address.',
    ],
    applicationPortalName: 'Unique Disability ID (UDID) National Portal',
    applicationPortalUrl: 'https://www.swavlambancard.gov.in/',
    downloadPortalName: 'UDID e-Card & Certificate Download',
    downloadPortalUrl: 'https://www.swavlambancard.gov.in/pwd/application-status',
    verificationPortalName: 'UDID Online Genuineness Verification',
    verificationPortalUrl: 'https://www.swavlambancard.gov.in/',
    validityRule: 'Permanent vs Temporary: For irreversible conditions, the Medical Board issues a "Permanent UDID Card" with lifetime validity. For progressive, surgical, or developmental conditions, a "Temporary UDID Card" is issued valid for 1 to 5 years (expiry date printed on card).',
    validityClassification: 'Valid until printed expiry date',
    renewalOrFreshIssueGuidance: 'If your UDID Card is marked "Temporary" with an expiry date, click "Apply for Card Renewal" on swavlambancard.gov.in 3 to 6 months before expiry for reassessment by the Medical Board. Permanent cards never expire.',
    duplicateProcedure: 'Re-download e-UDID Card from swavlambancard.gov.in using Enrolment Number or Aadhaar. Apply for duplicate physical card if lost.',
    correctionProcedure: 'Use "Apply for Update" on swavlambancard.gov.in with supporting medical/gazette documents.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Department of Empowerment of Persons with Disabilities',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['College admission', 'Scholarship application', 'Competitive examination', 'Scribe accommodation', 'Travel concession'],
    feeInfo: 'Completely FREE of charge (Government of India initiative)',
    turnaroundTime: '30 to 45 days including hospital medical board appointment',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // I. Agricultural Income Certificate
  {
    id: 'rev-106-agri-income',
    code: 'REV-106',
    title: 'Agricultural Income Certificate',
    category: 'Other Revenue & Family Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue Department, Government of Tamil Nadu',
    purpose: 'Certifies annual income derived strictly from agricultural landholdings, required for ICAR admissions, agricultural university quota (TNAU 7.5% or vocational seats), and subsidized agricultural scholarships.',
    whoMayApply: [
      'Students whose families own or cultivate agricultural lands in Tamil Nadu.',
      'Applicants seeking benefits under farm family educational welfare schemes.',
    ],
    eligibilitySummary: 'Ownership or tenancy of registered agricultural lands verified by village land revenue records (Adangal / Chitta / Patta).',
    supportingDocuments: [
      'Patta / Chitta copy in the name of applicant / parents',
      'Adangal record for current fasli year from VAO',
      'Ration Card / Smart Card and Aadhaar cards',
      'Self-declaration of agricultural yield and income',
    ],
    applicationProcedure: [
      'Step 1: Sign in to TN e-Sevai Citizen Portal (tnesevai.tn.gov.in/citizen/).',
      'Step 2: Select Revenue Department -> Service REV-106 Agricultural Income Certificate.',
      'Step 3: Enter survey numbers, village, crop details, and annual harvest value.',
      'Step 4: Upload patta/adangal copy, pay Rs. 60 fee, and track online.',
      'Step 5: VAO assesses crop yield and Tahsildar issues digital certificate.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-106)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Issued for the specific Fasli year (agricultural financial cycle). Fresh issue needed each academic year for scholarship compliance.',
    validityClassification: 'Fresh issue may be required for specific purpose',
    renewalOrFreshIssueGuidance: 'Agricultural yield varies by crop cycle; educational schemes typically require current year certification.',
    duplicateProcedure: 'Re-download via tnedistrict.tn.gov.in.',
    correctionProcedure: 'Re-apply with updated adangal copy.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 12', 'Diploma', 'Undergraduate', 'Postgraduate'],
    commonPurposes: ['Agricultural university admission', 'Scholarship application'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 25 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // J. Family Migration Certificate
  {
    id: 'rev-107-family-migration',
    code: 'REV-107',
    title: 'Family Migration Certificate',
    category: 'Other Revenue & Family Certificates',
    issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
    governingDepartment: 'Revenue Department, Government of Tamil Nadu',
    purpose: 'Certifies official inter-district or interstate relocation of a family for employment or livelihood, ensuring continuity of student welfare benefits and school transfer admissions without loss of domicile protections.',
    whoMayApply: [
      'Families relocating across revenue districts in Tamil Nadu due to government or private transfers.',
    ],
    eligibilitySummary: 'Evidence of previous residence and transfer/relocation order.',
    supportingDocuments: [
      'Previous and current Ration Cards / Smart Card',
      'Transfer order / Employment relocation letter of parent',
      'School transfer certificate of student',
      'Aadhaar card with address update proof',
    ],
    applicationProcedure: [
      'Step 1: Apply through TN e-Sevai (Service REV-107 Family Migration Certificate).',
      'Step 2: Attach transfer orders and ration card copies.',
      'Step 3: Pay Rs. 60 statutory fee and obtain acknowledgement.',
    ],
    applicationPortalName: 'TN e-Sevai Citizen Portal (REV-107)',
    applicationPortalUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadPortalName: 'TN e-District Download',
    downloadPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationPortalName: 'TN e-District Verification',
    verificationPortalUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    validityRule: 'Permanent record of the relocation event.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Does not expire. Only fresh application if another relocation occurs.',
    duplicateProcedure: 'Re-download online using reference number.',
    correctionProcedure: 'Apply for CAN address change.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Revenue and Disaster Management Department, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'Diploma', 'Undergraduate'],
    commonPurposes: ['School admission', 'College transfer', 'Welfare continuity'],
    feeInfo: 'Statutory fee: Rs. 60',
    turnaroundTime: '15 to 20 working days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
];

// -----------------------------------------------------------------------------
// 2. IDENTITY DOCUMENTS CATALOGUE
// -----------------------------------------------------------------------------
export const IDENTITY_DOCUMENTS: DocumentItem[] = [
  // A. Aadhaar Card
  {
    id: 'id-aadhaar',
    title: 'Aadhaar Card (UIDAI Digital Identity)',
    category: 'Identity Documents',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    governingDepartment: 'Ministry of Electronics & Information Technology, Government of India',
    purpose: 'Universal 12-digit biometric identity credential required for DBT scholarship transfers, college registration, DigiLocker verification, and entrance examination authentication (NEET, JEE, CUET).',
    whoMayApply: ['Every resident of India (including children and students) residing for 182 days or more.'],
    eligibilitySummary: 'Resident of India with verified biometric and demographic records.',
    supportingDocuments: [
      'Proof of Identity (POI): Birth certificate, School ID card with photo, or Passport',
      'Proof of Address (POA): Ration card, electricity bill, or parent Aadhaar (for minors)',
      'Proof of Date of Birth (DOB): Birth certificate or SSLC mark sheet',
    ],
    applicationProcedure: [
      'Step 1: For new enrollment, book an appointment on uidai.gov.in and visit an Aadhaar Seva Kendra for photograph and biometrics.',
      'Step 2: For existing cardholders, download e-Aadhaar PDF anytime from myaadhaar.uidai.gov.in using Aadhaar number and registered mobile OTP.',
      'Step 3: Update mobile number and mandatory biometric updates (at age 5 and age 15) at authorized Aadhaar enrolment centres.',
    ],
    applicationPortalName: 'MyAadhaar Portal (UIDAI)',
    applicationPortalUrl: 'https://myaadhaar.uidai.gov.in/',
    downloadPortalName: 'e-Aadhaar Download (UIDAI)',
    downloadPortalUrl: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar',
    verificationPortalName: 'Verify Aadhaar Online (UIDAI)',
    verificationPortalUrl: 'https://myaadhaar.uidai.gov.in/verifyAadhaar',
    validityRule: 'Aadhaar has LIFETIME validity. It is NOT an annually renewable certificate. Mandatory biometric update is required when a minor turns 5 and 15 years old. Never pay or fall for scams claiming Aadhaar needs yearly renewal.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Routine annual renewal does NOT exist. Only update address or mobile number when changed. Complete mandatory biometric update if turning 15.',
    duplicateProcedure: 'Download e-Aadhaar PDF from myaadhaar.uidai.gov.in using registered mobile OTP (free of cost). Order official PVC Card for Rs. 50.',
    correctionProcedure: 'Update demographic details online via myaadhaar.uidai.gov.in; update biometric details at Aadhaar Seva Kendra.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Unique Identification Authority of India',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Identity verification', 'College admission', 'Scholarship application', 'Bank account opening', 'Competitive examination'],
    feeInfo: 'New enrollment: FREE. Mandatory biometric update (at age 5/15): FREE. Demographic update: Rs. 50.',
    turnaroundTime: 'e-Aadhaar: Instant download. Address update: 5 to 15 days.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // B. PAN Card
  {
    id: 'id-pan',
    title: 'Permanent Account Number (PAN Card)',
    category: 'Identity Documents',
    issuingAuthority: 'Income Tax Department, Government of India',
    governingDepartment: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    purpose: '10-digit alphanumeric identifier required for student bank account opening (scholarship DBT credit), paid internships, fellowship stipends, and financial transactions.',
    whoMayApply: [
      'Adult citizens (18+).',
      'Minors under 18 through parent/guardian (for receiving stipends or opening major/minor bank accounts).',
    ],
    eligibilitySummary: 'Citizen of India requiring financial identity.',
    supportingDocuments: [
      'Identity proof: Aadhaar Card or Passport or School ID',
      'Date of Birth proof: Birth certificate, Aadhaar, or 10th mark sheet',
      'Address proof: Aadhaar card or Ration card',
    ],
    applicationProcedure: [
      'Step 1: If you have an Aadhaar linked to your mobile, apply for instant e-PAN on the Income Tax e-Filing portal (incometax.gov.in) free of cost.',
      'Step 2: For physical card, apply via Protean (NSDL) or UTIITSL website (Form 49A).',
      'Step 3: Complete Aadhaar-based e-KYC or post physical documents.',
    ],
    applicationPortalName: 'Income Tax e-Filing Portal (Instant e-PAN)',
    applicationPortalUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan',
    downloadPortalName: 'Download e-PAN (Protean / UTIITSL)',
    downloadPortalUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    verificationPortalName: 'Verify PAN Online (Income Tax Portal)',
    verificationPortalUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken',
    validityRule: 'Permanent lifetime validity. PAN does NOT expire.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'No renewal. Update photo/signature or address when necessary.',
    duplicateProcedure: 'Reprint physical PAN card on onlineservices.nsdl.com for Rs. 50.',
    correctionProcedure: 'Apply for "Changes or Correction in PAN Data" on Protean or UTIITSL.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Income Tax Department',
    relevantEducationStages: ['Class 12', 'Diploma', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Bank account opening', 'Internship stipend', 'Fellowship', 'Employment'],
    feeInfo: 'Instant e-PAN: FREE. Physical card delivery: Rs. 107 (within India).',
    turnaroundTime: 'Instant e-PAN: 10 minutes. Physical card: 10 to 15 days.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // C. Voter ID (EPIC)
  {
    id: 'id-voter',
    title: 'Voter ID (Elector Photo Identity Card - EPIC)',
    category: 'Identity Documents',
    issuingAuthority: 'Election Commission of India (ECI)',
    governingDepartment: 'Election Commission of India & Chief Electoral Officer, Tamil Nadu',
    purpose: 'Constitutional proof of citizenship and voting franchise, valid identity proof for admissions and government job applications.',
    whoMayApply: ['Indian citizens who have reached 18 years of age (or turning 18 on the qualifying dates).'],
    eligibilitySummary: 'Indian citizen residing in the electoral constituency, aged 18+.',
    supportingDocuments: [
      'Photograph (passport size)',
      'Age proof: 10th mark sheet, Birth certificate, or Aadhaar',
      'Address proof: Ration card, electricity bill, or parent voter card',
    ],
    applicationProcedure: [
      'Step 1: Visit the official Voters Service Portal (voters.eci.gov.in).',
      'Step 2: Sign up with mobile number and select "New registration for general electors (Form 6)".',
      'Step 3: Fill constituency details, upload photo and age/address proof.',
      'Step 4: Receive Application Reference Number to track status.',
      'Step 5: Booth Level Officer (BLO) field verification completes approval.',
      'Step 6: Download digital e-EPIC PDF from voters.eci.gov.in.',
    ],
    applicationPortalName: 'Election Commission Voters Service Portal',
    applicationPortalUrl: 'https://voters.eci.gov.in/',
    downloadPortalName: 'Download e-EPIC Digital Voter Card',
    downloadPortalUrl: 'https://voters.eci.gov.in/e-epic',
    verificationPortalName: 'Search in Electoral Roll',
    verificationPortalUrl: 'https://electoralsearch.eci.gov.in/',
    validityRule: 'Permanent validity as long as you reside in the registered constituency. Update constituency if shifting home.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'No routine expiry. Use Form 8 for shifting of residence or correction of entries.',
    duplicateProcedure: 'Download e-EPIC PDF online or submit Form 8 for replacement card.',
    correctionProcedure: 'Submit Form 8 on voters.eci.gov.in.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Election Commission of India',
    relevantEducationStages: ['Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Voting', 'Identity proof', 'Government job application'],
    feeInfo: 'Completely FREE of charge.',
    turnaroundTime: '15 to 30 days',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },

  // D. Passport
  {
    id: 'id-passport',
    title: 'Indian Passport (Passport Seva)',
    category: 'Identity Documents',
    issuingAuthority: 'Consular, Passport & Visa (CPV) Division, Ministry of External Affairs',
    governingDepartment: 'Ministry of External Affairs, Government of India',
    purpose: 'International travel credential and statutory proof of Indian citizenship, required for higher education abroad, global competitive internships, and overseas scholarships (e.g. Annal Ambedkar Overseas Scheme).',
    whoMayApply: ['Indian citizens by birth or naturalization.'],
    eligibilitySummary: 'Indian citizen with clean judicial and police verification record.',
    supportingDocuments: [
      'Proof of Date of Birth: Birth certificate or School Transfer Certificate (TC) / 10th mark sheet',
      'Proof of Present Address: Aadhaar card / Parent passport / Bank passbook',
      'Educational certificate for Non-ECR status (10th standard pass certificate or higher)',
    ],
    applicationProcedure: [
      'Step 1: Register on the official Passport Seva portal (passportindia.gov.in).',
      'Step 2: Fill Form for Ordinary Passport (Fresh / Reissue).',
      'Step 3: Pay statutory fee (Rs. 1,500 for normal 36 pages) and book appointment at nearby PSK / POPSK.',
      'Step 4: Visit Passport Seva Kendra on the appointment date with original documents.',
      'Step 5: Local police station conducts physical address verification.',
      'Step 6: Passport is printed and dispatched via Speed Post.',
    ],
    applicationPortalName: 'Passport Seva Official Portal',
    applicationPortalUrl: 'https://www.passportindia.gov.in/',
    downloadPortalName: 'Track Application Status (Passport Seva)',
    downloadPortalUrl: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
    verificationPortalName: 'Passport Application Status Check',
    verificationPortalUrl: 'https://www.passportindia.gov.in/',
    validityRule: 'Printed expiry date: 10 years for adults (18+); 5 years (or until attaining 18) for minors under 18 years.',
    validityClassification: 'Valid until printed expiry date',
    renewalOrFreshIssueGuidance: 'Apply for Passport Reissue up to 1 year before the printed expiry date on passportindia.gov.in.',
    duplicateProcedure: 'In case of loss or damage, apply for Reissue under "Lost/Damaged Passport" with police loss report.',
    correctionProcedure: 'Apply for Reissue under "Change in Existing Personal Particulars".',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Ministry of External Affairs',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'Diploma', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Study abroad', 'International internship', 'Identity verification', 'Foreign fellowship'],
    feeInfo: 'Normal fee (36 pages, 10 years): Rs. 1,500. Tatkaal: Rs. 3,500.',
    turnaroundTime: 'Normal: 15 to 30 days. Tatkaal: 3 to 7 days.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
];

// -------------------------------------------------------------
// 3. SCHOOL CREDENTIALS (CLASS 10, 11, 12)
// -------------------------------------------------------------
export const SCHOOL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'school-sslc-marksheet',
    title: 'SSLC (Class 10) Marksheet',
    category: 'School Documents',
    issuingAuthority: 'Directorate of Government Examinations (DGE), Tamil Nadu',
    governingDepartment: 'School Education Department, Government of Tamil Nadu',
    purpose: 'Standard secondary education credential and primary legal proof of Date of Birth for all higher education, admissions, identity cards, and civil appointments.',
    whoMayApply: ['Students who appeared for and cleared the Class 10 SSLC board examination in Tamil Nadu.'],
    eligibilitySummary: 'Passing the SSLC Board Examination.',
    supportingDocuments: ['Hall ticket number, exam session (March/June/September), and school index number.'],
    applicationProcedure: [
      'Original marksheet is issued directly through the school of study.',
      'Digital verifiable marksheet can be fetched instantly into DigiLocker using Roll Number and Exam Year.',
      'For duplicate marksheet, apply through the concerned District Educational Office (DEO) or DGE portal.',
    ],
    applicationPortalName: 'Directorate of Government Examinations (DGE)',
    applicationPortalUrl: 'https://dge.tn.gov.in/',
    downloadPortalName: 'DigiLocker TN DGE Marksheets',
    downloadPortalUrl: 'https://www.digilocker.gov.in/',
    verificationPortalName: 'TN DGE Results & Verification',
    verificationPortalUrl: 'https://dge.tn.gov.in/',
    validityRule: 'Permanent lifetime validity. Academic marksheets NEVER expire.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Does not expire. If lost or damaged, apply for a Duplicate Marksheet via DGE procedure.',
    duplicateProcedure: 'Submit application through the school head to the District Educational Officer (DEO) with police non-traceable certificate and prescribed DGE fee challan.',
    correctionProcedure: 'Name or DOB corrections must be petitioned through the school head with admission register copy to DGE.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Directorate of Government Examinations, Tamil Nadu',
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Polytechnic', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Date of Birth proof', 'Higher education admission', 'Diploma admission', 'Identity proof', 'Employment'],
    feeInfo: 'Original: Issued free through school. Duplicate: Statutory DGE fee challan.',
    turnaroundTime: 'DigiLocker: Instant fetch. Duplicate copy: 30 to 45 days.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
  {
    id: 'school-hsc-marksheet',
    title: 'Higher Secondary (+2 / HSC) Marksheet',
    category: 'School Documents',
    issuingAuthority: 'Directorate of Government Examinations (DGE), Tamil Nadu',
    governingDepartment: 'School Education Department, Government of Tamil Nadu',
    purpose: 'Mandatory qualifying credential for undergraduate admissions (Engineering, Arts, Science, Medicine, Law, Agriculture) and government competitive recruitments.',
    whoMayApply: ['Students who completed and cleared Class 12 Higher Secondary Examinations.'],
    eligibilitySummary: 'Cleared Class 12 Board Examination.',
    supportingDocuments: ['HSC Roll number, exam month/year, date of birth.'],
    applicationProcedure: [
      'Original marksheet issued by school of study.',
      'Authentic digital marksheet fetchable via DigiLocker.',
      'Duplicate marksheet application processed through school head to DGE.',
    ],
    applicationPortalName: 'TN DGE Official Portal',
    applicationPortalUrl: 'https://dge.tn.gov.in/',
    downloadPortalName: 'DigiLocker TN DGE Issuer',
    downloadPortalUrl: 'https://www.digilocker.gov.in/',
    verificationPortalName: 'TN DGE Verification Portal',
    verificationPortalUrl: 'https://dge.tn.gov.in/',
    validityRule: 'Permanent lifetime validity. Never expires.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Permanent record. Apply for duplicate if lost.',
    duplicateProcedure: 'Submit application through school head to DEO with police certificate and fee challan.',
    correctionProcedure: 'Apply through school head with 10th mark sheet proof.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Directorate of Government Examinations, Tamil Nadu',
    relevantEducationStages: ['Class 12', 'Diploma', 'Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['College admission', 'UG counseling', 'Scholarship application', 'Competitive exam'],
    feeInfo: 'Original: Free through school. Duplicate: Prescribed fee challan.',
    turnaroundTime: 'DigiLocker: Instant. Duplicate: 30 to 45 days.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
  {
    id: 'school-transfer-certificate',
    title: 'School Transfer Certificate (TC) & Conduct Certificate',
    category: 'School Documents',
    issuingAuthority: 'Headmaster / Principal of the school last studied',
    governingDepartment: 'Department of School Education, Tamil Nadu (EMIS Portal)',
    purpose: 'Official record certifying discontinuation or completion of schooling, date of birth, community record, and character conduct for college admission.',
    whoMayApply: ['Students passing out of school or transferring to another institution.'],
    eligibilitySummary: 'Clearance of all school dues and completion of relevant standard.',
    supportingDocuments: ['School admission number, clearance from library/laboratory, EMIS student ID.'],
    applicationProcedure: [
      'Transfer Certificates are issued exclusively by the school of study through the Tamil Nadu EMIS portal (emis.tnschools.gov.in).',
      'There is no universal independent public download portal; students must request it directly from their school head.',
    ],
    applicationPortalName: 'School Head / TN EMIS System',
    applicationPortalUrl: 'https://emis.tnschools.gov.in/',
    downloadPortalName: 'School Head Office (EMIS)',
    downloadPortalUrl: 'https://emis.tnschools.gov.in/',
    verificationPortalName: 'TN EMIS Institutional Verification',
    verificationPortalUrl: 'https://emis.tnschools.gov.in/',
    validityRule: 'Permanent record of schooling transition. TC is surrendered to the newly joined college or institution.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'No renewal. Surrendered during college admission.',
    duplicateProcedure: 'Apply to the school headmaster with an affidavit explaining loss of original TC.',
    correctionProcedure: 'Correction must be made in the school admission register prior to TC generation.',
    isDigiLockerAvailable: false,
    relevantEducationStages: ['Class 10', 'Class 11', 'Class 12', 'ITI', 'Diploma', 'Undergraduate'],
    commonPurposes: ['College admission', 'School transfer'],
    feeInfo: 'Free of charge (mandated under RTE / School Education norms).',
    turnaroundTime: '1 to 3 working days from school office',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
];

// -------------------------------------------------------------
// 4. HIGHER EDUCATION CREDENTIALS (DIPLOMA, UG, PG, RESEARCH)
// -------------------------------------------------------------
export const HIGHER_ED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'ug-degree-certificate',
    title: 'Undergraduate Original Degree Certificate / Convocation Degree',
    category: 'College & University Documents',
    issuingAuthority: 'Affiliating University (e.g. Anna University, University of Madras, Madurai Kamaraj, Bharathiar, TNDALU, etc.)',
    governingDepartment: 'Higher Education Department, Government of Tamil Nadu & UGC',
    purpose: 'Final statutory proof of graduation and academic title conferred during annual convocation, mandatory for postgraduate admissions, government Gazetted officer recruitments, and overseas immigration/visa processing.',
    whoMayApply: ['Students who cleared all prescribed semester papers and obtained Provisional Degree.'],
    eligibilitySummary: 'Completion of degree credits and formal graduation approval by the University Syndicate.',
    supportingDocuments: [
      'Provisional Degree Certificate',
      'Consolidated Marksheet (CMM)',
      'All semester grade cards / mark sheets',
      'No Dues Certificate from the college / department',
      'Convocation application fee payment receipt',
    ],
    applicationProcedure: [
      'Step 1: College submits graduation candidate list to the affiliating university controller of examinations.',
      'Step 2: Pay prescribed convocation fee through your college or university student portal.',
      'Step 3: Receive Degree Certificate in-person at convocation or by registered post through your college.',
      'Step 4: Fetch authentic digital degree into DigiLocker from participating university issuers.',
    ],
    applicationPortalName: 'University Controller of Examinations (COE)',
    applicationPortalUrl: 'https://www.annauniv.edu/',
    downloadPortalName: 'DigiLocker University Credential Portal',
    downloadPortalUrl: 'https://www.digilocker.gov.in/',
    verificationPortalName: 'National Academic Depository (NAD) / DigiLocker',
    verificationPortalUrl: 'https://nad.digilocker.gov.in/',
    validityRule: 'Permanent lifetime validity. University degrees NEVER expire.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Degrees are permanent. In case of loss, apply for a Duplicate Degree Certificate.',
    duplicateProcedure: 'Submit formal application to University COE with police non-traceable certificate, notary affidavit, national newspaper advertisement, and university duplicate fee.',
    correctionProcedure: 'Submit original degree with SSLC marksheet as name proof to the University COE for reissue.',
    isDigiLockerAvailable: true,
    digiLockerIssuerName: 'Anna University / University of Madras / Participating Universities',
    relevantEducationStages: ['Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['PG admission', 'Higher education abroad', 'Employment', 'Government exam'],
    feeInfo: 'Statutory university convocation fee (typically Rs. 1,000 to Rs. 2,000 depending on university).',
    turnaroundTime: 'Conferred at annual convocation cycle.',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
  {
    id: 'ug-provisional-certificate',
    title: 'Provisional Degree Certificate',
    category: 'College & University Documents',
    issuingAuthority: 'Affiliating University Controller of Examinations',
    governingDepartment: 'Higher Education Department, Government of Tamil Nadu',
    purpose: 'Interim statutory credential issued immediately after final semester results, valid for employment, higher education admission, and competitive exams until the formal convocation degree is awarded.',
    whoMayApply: ['Graduating students who have passed all semester examinations.'],
    eligibilitySummary: 'Pass in all degree requirements.',
    supportingDocuments: ['University registration number, college code, consolidated mark statement.'],
    applicationProcedure: [
      'Generated by the university COE automatically and distributed through your college office.',
    ],
    applicationPortalName: 'College Office / University COE',
    applicationPortalUrl: 'https://www.annauniv.edu/',
    downloadPortalName: 'DigiLocker / University COE',
    downloadPortalUrl: 'https://www.digilocker.gov.in/',
    verificationPortalName: 'University COE Portal',
    verificationPortalUrl: 'https://www.annauniv.edu/',
    validityRule: 'Valid until the Original Convocation Degree is officially conferred.',
    validityClassification: 'Valid until printed expiry date',
    renewalOrFreshIssueGuidance: 'Once the original degree certificate is issued at convocation, the original degree becomes the primary credential.',
    duplicateProcedure: 'Apply to COE through college principal.',
    correctionProcedure: 'Return to COE with SSLC copy.',
    isDigiLockerAvailable: true,
    relevantEducationStages: ['Undergraduate', 'Postgraduate', 'Completed Postgraduate', 'Research Scholar'],
    commonPurposes: ['Employment', 'PG admission', 'Internship'],
    feeInfo: 'Included in final semester examination fees.',
    turnaroundTime: '15 to 30 days post result publication',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
  {
    id: 'diploma-consolidated-marksheet',
    title: 'Diploma Consolidated Marksheet & Provisional Certificate',
    category: 'Diploma & Technical Documents',
    issuingAuthority: 'Directorate of Technical Education (DoTE), Tamil Nadu',
    governingDepartment: 'Higher Education Department, Government of Tamil Nadu',
    purpose: 'Complete academic transcript and completion certificate for polytechnic and diploma engineering graduates, required for lateral entry B.E./B.Tech admissions (TNEA Lateral) and junior engineer recruitments.',
    whoMayApply: ['Students who completed 3-year polytechnic diploma or 2-year lateral entry diploma in Tamil Nadu.'],
    eligibilitySummary: 'Pass in all 6 diploma semesters.',
    supportingDocuments: ['Diploma register number, polytechnic college code, semester mark statements.'],
    applicationProcedure: [
      'Issued by DoTE through the polytechnic college principal office.',
      'Check status and certificate alerts on dote.tn.gov.in.',
    ],
    applicationPortalName: 'DoTE Tamil Nadu',
    applicationPortalUrl: 'https://dte.tn.gov.in/',
    downloadPortalName: 'DoTE / DigiLocker',
    downloadPortalUrl: 'https://www.digilocker.gov.in/',
    verificationPortalName: 'DoTE Examination Verification',
    verificationPortalUrl: 'https://dte.tn.gov.in/',
    validityRule: 'Permanent lifetime validity.',
    validityClassification: 'No routine expiry specified by source',
    renewalOrFreshIssueGuidance: 'Permanent record. Never expires.',
    duplicateProcedure: 'Apply via polytechnic principal to DoTE with prescribed fee challan.',
    correctionProcedure: 'Submit 10th mark sheet copy to DoTE through principal.',
    isDigiLockerAvailable: true,
    relevantEducationStages: ['ITI', 'Diploma', 'Polytechnic', 'Undergraduate'],
    commonPurposes: ['Lateral entry B.E. admission', 'Employment', 'Apprenticeship (NATS)'],
    feeInfo: 'Prescribed DoTE examination fee.',
    turnaroundTime: 'Distributed within 30 days of final semester results',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
  {
    id: 'pg-research-registration',
    title: 'Research Registration & PhD Course Completion Certificate',
    category: 'Postgraduate & Research Documents',
    issuingAuthority: 'Centre for Research / University Academic Research Board',
    governingDepartment: 'University Grants Commission (UGC) & University Syndicate',
    purpose: 'Official credential establishing doctoral research scholar status, required for claiming UGC-JRF, CSIR-JRF, ICAR fellowships, ADW PhD Incentive Scheme, and thesis submission.',
    whoMayApply: ['Full-time and part-time doctoral scholars enrolled in recognized university research departments.'],
    eligibilitySummary: 'Cleared PhD coursework and comprehensive viva examination.',
    supportingDocuments: ['Provisional registration order, coursework mark sheets, doctoral committee approval minutes.'],
    applicationProcedure: ['Issued directly by the university Centre for Research upon clearing coursework.'],
    applicationPortalName: 'University Centre for Research',
    applicationPortalUrl: 'https://cfr.annauniv.edu/',
    downloadPortalName: 'University Research Portal',
    downloadPortalUrl: 'https://cfr.annauniv.edu/',
    verificationPortalName: 'University Research Register',
    verificationPortalUrl: 'https://cfr.annauniv.edu/',
    validityRule: 'Valid for the prescribed doctoral research tenure (typically 5 to 6 years as per UGC regulations).',
    validityClassification: 'Valid until printed expiry date',
    renewalOrFreshIssueGuidance: 'Extension of research tenure requires doctoral committee recommendation and university syndicate approval.',
    duplicateProcedure: 'Apply to Director, Centre for Research.',
    correctionProcedure: 'Submit doctoral committee amendment order.',
    isDigiLockerAvailable: false,
    relevantEducationStages: ['Research Scholar', 'Completed Postgraduate'],
    commonPurposes: ['Fellowship disbursement', 'ADW PhD incentive', 'Thesis submission'],
    feeInfo: 'Statutory semester research tuition and registration fee.',
    turnaroundTime: 'Issued per academic semester',
    verificationStatus: 'Official Source Confirmed',
    lastVerified: '06 November 2026',
  },
];

// -------------------------------------------------------------
// 5. OFFICIAL SERVICE DIRECTORY (CATEGORIES A THROUGH H)
// -------------------------------------------------------------
export const OFFICIAL_SERVICE_DIRECTORY: OfficialServiceEntry[] = [
  // A. Tamil Nadu Government
  {
    id: 'dir-tn-esevai',
    name: 'Tamil Nadu e-Sevai Citizen Portal (TNeGA)',
    category: 'A. Tamil Nadu Government',
    department: 'Information Technology and Digital Services Department, Govt of Tamil Nadu',
    purpose: 'Unified citizen gateway for applying online to all Revenue certificates (Community, Income, Nativity, First Graduate, OBC, Residence, Unemployment).',
    domain: 'tnesevai.tn.gov.in',
    applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    supportContact: 'Toll-Free Helpline: 1800-425-1333 | Email: tnesevaihelpdesk@tn.gov.in',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Government Portal',
  },
  {
    id: 'dir-tn-edistrict',
    name: 'Tamil Nadu e-District Certificate Verification & Genuineness Portal',
    category: 'A. Tamil Nadu Government',
    department: 'Revenue Administration Department, Govt of Tamil Nadu',
    purpose: 'Public verification engine to check authenticity and digital signatures of any Tamil Nadu revenue certificate using Application / Certificate Number.',
    domain: 'tnedistrict.tn.gov.in',
    applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
    downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Verification Engine',
  },

  // B. Central Government
  {
    id: 'dir-ncbc-central-obc',
    name: 'National Commission for Backward Classes (NCBC) Central OBC List',
    category: 'B. Central Government',
    department: 'Ministry of Social Justice and Empowerment, Government of India',
    purpose: 'Official statutory list of communities recognized as Other Backward Classes for the State of Tamil Nadu under Central Government norms.',
    domain: 'dosje.gov.in',
    applicationUrl: 'https://www.dosje.gov.in/organisation/national-commission-for-backward-classes-ncbc/central-list-of-obcs/',
    downloadUrl: 'https://www.dosje.gov.in/organisation/national-commission-for-backward-classes-ncbc/central-list-of-obcs/',
    verificationUrl: 'https://www.dosje.gov.in/organisation/national-commission-for-backward-classes-ncbc/central-list-of-obcs/',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Statutory Commission Portal',
  },

  // C. Identity Documents
  {
    id: 'dir-uidai-myaadhaar',
    name: 'MyAadhaar Portal – Unique Identification Authority of India (UIDAI)',
    category: 'C. Identity Documents',
    department: 'Ministry of Electronics & Information Technology, Government of India',
    purpose: 'Official citizen portal for e-Aadhaar download, address updates, PVC card orders, and biometric lock/unlock.',
    domain: 'myaadhaar.uidai.gov.in',
    applicationUrl: 'https://myaadhaar.uidai.gov.in/',
    downloadUrl: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar',
    verificationUrl: 'https://myaadhaar.uidai.gov.in/verifyAadhaar',
    supportContact: 'Toll-Free: 1947 | Email: help@uidai.gov.in',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Identity Authority',
  },
  {
    id: 'dir-incometax-pan',
    name: 'Income Tax e-Filing Portal (Instant e-PAN & Verification)',
    category: 'C. Identity Documents',
    department: 'Income Tax Department, Ministry of Finance',
    purpose: 'Instant issuance and verification of PAN cards linked to Aadhaar.',
    domain: 'incometax.gov.in',
    applicationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan',
    downloadUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    verificationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Tax Department Portal',
  },
  {
    id: 'dir-eci-voters',
    name: 'Voters Service Portal – Election Commission of India (ECI)',
    category: 'C. Identity Documents',
    department: 'Election Commission of India',
    purpose: 'New voter enrollment (Form 6), electoral roll search, and e-EPIC digital voter card download.',
    domain: 'voters.eci.gov.in',
    applicationUrl: 'https://voters.eci.gov.in/',
    downloadUrl: 'https://voters.eci.gov.in/e-epic',
    verificationUrl: 'https://electoralsearch.eci.gov.in/',
    supportContact: 'Toll-Free: 1950',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Constitutional Body Portal',
  },
  {
    id: 'dir-mea-passport',
    name: 'Passport Seva Portal – Ministry of External Affairs (MEA)',
    category: 'C. Identity Documents',
    department: 'CPV Division, Ministry of External Affairs',
    purpose: 'Online appointment booking, passport issuance, reissue, and status tracking.',
    domain: 'passportindia.gov.in',
    applicationUrl: 'https://www.passportindia.gov.in/',
    downloadUrl: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
    verificationUrl: 'https://www.passportindia.gov.in/',
    supportContact: 'National Call Centre: 1800-258-1800',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Passport Portal',
  },

  // D. School Education
  {
    id: 'dir-tn-dge',
    name: 'Directorate of Government Examinations (TN DGE)',
    category: 'D. School Education',
    department: 'Department of School Education, Govt of Tamil Nadu',
    purpose: 'Statutory board conducting SSLC (10th) and HSC (12th) board examinations and issuing official duplicate marksheets and migration certificates.',
    domain: 'dge.tn.gov.in',
    applicationUrl: 'https://dge.tn.gov.in/',
    downloadUrl: 'https://www.digilocker.gov.in/',
    verificationUrl: 'https://dge.tn.gov.in/',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Board Portal',
  },

  // E. Technical Education
  {
    id: 'dir-tn-dote',
    name: 'Directorate of Technical Education (DoTE Tamil Nadu)',
    category: 'E. Technical Education',
    department: 'Higher Education Department, Govt of Tamil Nadu',
    purpose: 'Supervising polytechnic diploma examinations, diploma certificates, and engineering counseling administration.',
    domain: 'dote.tn.gov.in',
    applicationUrl: 'https://dte.tn.gov.in/',
    downloadUrl: 'https://www.digilocker.gov.in/',
    verificationUrl: 'https://dte.tn.gov.in/',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Technical Directorate',
  },

  // F. Universities
  {
    id: 'dir-anna-univ',
    name: 'Anna University Controller of Examinations (COE)',
    category: 'F. Universities',
    department: 'Anna University, Chennai (State Technical University)',
    purpose: 'Conferring undergraduate and postgraduate engineering degrees, transcripts, and online credential verifications for all affiliated colleges.',
    domain: 'annauniv.edu',
    applicationUrl: 'https://www.annauniv.edu/',
    downloadUrl: 'https://www.digilocker.gov.in/',
    verificationUrl: 'https://www.annauniv.edu/',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official University Website',
  },

  // G. Disability and Accessibility Services
  {
    id: 'dir-depwd-udid',
    name: 'Swavlamban Card (UDID) National Portal',
    category: 'G. Disability and Accessibility Services',
    department: 'Department of Empowerment of Persons with Disabilities, Govt of India',
    purpose: 'National digital registration, medical board assessment booking, and download of UDID cards for persons with benchmark disabilities.',
    domain: 'swavlambancard.gov.in',
    applicationUrl: 'https://www.swavlambancard.gov.in/',
    downloadUrl: 'https://www.swavlambancard.gov.in/pwd/application-status',
    verificationUrl: 'https://www.swavlambancard.gov.in/',
    supportContact: 'Helpline: 011-24365019 | Email: support-udid@gov.in',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Disability Portal',
  },

  // H. Digital Documents
  {
    id: 'dir-digilocker',
    name: 'DigiLocker – National Digital Document Wallet',
    category: 'H. Digital Documents',
    department: 'Digital India Corporation, Ministry of Electronics & IT',
    purpose: 'Statutory platform under Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules 2016 for fetching legally valid digital marksheets, degrees, and government certificates.',
    domain: 'digilocker.gov.in',
    applicationUrl: 'https://www.digilocker.gov.in/',
    downloadUrl: 'https://www.digilocker.gov.in/',
    verificationUrl: 'https://www.digilocker.gov.in/',
    supportContact: 'Email: support@digitallocker.gov.in',
    lastChecked: '06 November 2026',
    verificationStatus: 'Official Source Confirmed',
    authorityBadge: 'Official Digital Document Service',
  },
];

// -------------------------------------------------------------
// 6. STUDENT DOCUMENT READINESS CHECKER ENGINE
// -------------------------------------------------------------
export interface ReadinessInputs {
  educationLevel: EducationStage;
  purpose:
    | 'School admission'
    | 'College admission'
    | 'Diploma admission'
    | 'Undergraduate admission'
    | 'Postgraduate admission'
    | 'Scholarship application'
    | 'Competitive examination'
    | 'Government job application'
    | 'Private employment'
    | 'Internship'
    | 'Higher education abroad'
    | 'Fellowship'
    | 'Research admission';
  hasReservationClaim: boolean;
  requiresIncomeCert: boolean;
  requiresNativityCert: boolean;
  hasDisabilityBenefit: boolean;
  isFirstGraduateClaim: boolean;
  isFreshAdmission: boolean;
}

export function evaluateDocumentReadiness(inputs: ReadinessInputs): ReadinessRequirement[] {
  const reqs: ReadinessRequirement[] = [];

  // Core Identity (Universal)
  reqs.push({
    id: 'req-aadhaar',
    documentId: 'id-aadhaar',
    documentName: 'Aadhaar Card',
    isMandatory: true,
    reason: 'Essential biometric identity credential required for applicant verification and DBT bank linking.',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    applicationUrl: 'https://myaadhaar.uidai.gov.in/',
    downloadUrl: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar',
    verificationUrl: 'https://myaadhaar.uidai.gov.in/verifyAadhaar',
    validityGuidance: 'Lifetime validity. Ensure registered mobile number is active for OTP-based verification.',
  });

  // School level
  if (inputs.educationLevel === 'Class 10' || inputs.educationLevel === 'Class 11' || inputs.educationLevel === 'Class 12') {
    if (inputs.educationLevel !== 'Class 10') {
      reqs.push({
        id: 'req-sslc',
        documentId: 'school-sslc-marksheet',
        documentName: 'SSLC (Class 10) Marksheet',
        isMandatory: true,
        reason: 'Statutory proof of completing secondary school and standard primary proof of Date of Birth.',
        issuingAuthority: 'Directorate of Government Examinations (DGE) Tamil Nadu',
        applicationUrl: 'https://dge.tn.gov.in/',
        downloadUrl: 'https://www.digilocker.gov.in/',
        verificationUrl: 'https://dge.tn.gov.in/',
        validityGuidance: 'Lifetime validity. Available digitally on DigiLocker.',
      });
    }

    reqs.push({
      id: 'req-school-tc',
      documentId: 'school-transfer-certificate',
      documentName: 'School Transfer Certificate (TC) & Conduct Certificate',
      isMandatory: inputs.purpose.includes('admission'),
      reason: 'Mandatory for admission to verify student record, standard completed, and character.',
      issuingAuthority: 'School Headmaster / Principal (via TN EMIS)',
      applicationUrl: 'https://emis.tnschools.gov.in/',
      downloadUrl: 'https://emis.tnschools.gov.in/',
      verificationUrl: 'https://emis.tnschools.gov.in/',
      validityGuidance: 'Issued once upon school leaving; surrendered during college/school admission.',
    });
  }

  // Higher Secondary / UG / Diploma
  if (
    inputs.educationLevel === 'Undergraduate' ||
    inputs.educationLevel === 'Diploma' ||
    inputs.educationLevel === 'Polytechnic' ||
    inputs.educationLevel === 'ITI'
  ) {
    reqs.push({
      id: 'req-sslc',
      documentId: 'school-sslc-marksheet',
      documentName: 'SSLC (Class 10) Marksheet',
      isMandatory: true,
      reason: 'Required for age and Date of Birth verification in all college admissions and examinations.',
      issuingAuthority: 'TN DGE',
      applicationUrl: 'https://dge.tn.gov.in/',
      downloadUrl: 'https://www.digilocker.gov.in/',
      verificationUrl: 'https://dge.tn.gov.in/',
      validityGuidance: 'Permanent validity.',
    });

    reqs.push({
      id: 'req-hsc',
      documentId: 'school-hsc-marksheet',
      documentName: 'Higher Secondary (+2) Marksheet',
      isMandatory: inputs.educationLevel === 'Undergraduate',
      reason: 'Qualifying examination marksheet determining cutoff and eligibility for degree courses.',
      issuingAuthority: 'TN DGE',
      applicationUrl: 'https://dge.tn.gov.in/',
      downloadUrl: 'https://www.digilocker.gov.in/',
      verificationUrl: 'https://dge.tn.gov.in/',
      validityGuidance: 'Permanent validity.',
    });
  }

  // PG & Completed PG
  if (
    inputs.educationLevel === 'Postgraduate' ||
    inputs.educationLevel === 'Completed Postgraduate' ||
    inputs.educationLevel === 'Research Scholar'
  ) {
    reqs.push({
      id: 'req-ug-degree',
      documentId: 'ug-degree-certificate',
      documentName: 'Undergraduate Degree / Provisional Certificate',
      isMandatory: true,
      reason: 'Basic statutory qualifying degree proof required for postgraduate admission, research entry, and job applications.',
      issuingAuthority: 'University Controller of Examinations (COE)',
      applicationUrl: 'https://www.annauniv.edu/',
      downloadUrl: 'https://www.digilocker.gov.in/',
      verificationUrl: 'https://nad.digilocker.gov.in/',
      validityGuidance: 'Permanent validity. Digilocker verified record accepted.',
    });

    if (inputs.purpose === 'Research admission' || inputs.purpose === 'Fellowship') {
      reqs.push({
        id: 'req-research-reg',
        documentId: 'pg-research-registration',
        documentName: 'PG Consolidated Marksheet / Research Registration Order',
        isMandatory: true,
        reason: 'Required to confirm coursework clearance and eligibility for doctoral stipends (UGC-JRF, CSIR, ADW PhD Incentive).',
        issuingAuthority: 'University Centre for Research',
        applicationUrl: 'https://cfr.annauniv.edu/',
        downloadUrl: 'https://cfr.annauniv.edu/',
        verificationUrl: 'https://cfr.annauniv.edu/',
        validityGuidance: 'Valid for active doctoral registration period.',
      });
    }
  }

  // Reservation Condition
  if (inputs.hasReservationClaim) {
    reqs.push({
      id: 'req-community',
      documentId: 'rev-101-community',
      documentName: 'Community Certificate (BC / MBC / DNC / SC / ST)',
      isMandatory: true,
      reason: 'Mandatory proof for claiming statutory reservation seats in admissions and welfare scholarships in Tamil Nadu.',
      issuingAuthority: 'Revenue Administration Department (Tahsildar)',
      applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
      downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      validityGuidance: 'Permanent validity for the community specified. Digital barcode version required.',
    });

    if (inputs.purpose.includes('Competitive') || inputs.purpose.includes('Government job') || inputs.purpose.includes('admission')) {
      reqs.push({
        id: 'req-obc-ncl',
        documentId: 'rev-115-obc-ncl',
        documentName: 'Central OBC-NCL Certificate (If applying for Central Institutions)',
        isMandatory: false,
        reason: 'Required only if seeking 27% quota in Central Government institutions (IIT, NIT, Central Universities, UPSC).',
        issuingAuthority: 'Tahsildar (e-Sevai REV-115)',
        applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
        downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
        verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
        validityGuidance: 'Central OBC-NCL requires issuance in the current financial year (on or after April 1).',
      });
    }
  }

  // Income Condition
  if (inputs.requiresIncomeCert || inputs.purpose === 'Scholarship application') {
    reqs.push({
      id: 'req-income',
      documentId: 'rev-103-income',
      documentName: 'Income Certificate (REV-103)',
      isMandatory: true,
      reason: 'Required to establish financial ceiling eligibility for government post-matric aid, welfare incentives, and fee concessions.',
      issuingAuthority: 'Revenue Department (Tahsildar)',
      applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
      downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      validityGuidance: 'Validity depends on scheme. Scholarships and admissions usually require an Income Certificate issued on or after April 1st of the current academic year.',
    });
  }

  // Nativity Condition
  if (inputs.requiresNativityCert || inputs.purpose.includes('admission')) {
    reqs.push({
      id: 'req-nativity',
      documentId: 'rev-102-nativity',
      documentName: 'Nativity Certificate (REV-102)',
      isMandatory: false,
      reason: 'Required for Tamil Nadu government quota seats if schooling between Class 8 and 12 was completed outside Tamil Nadu, or when demanded by counseling guidelines.',
      issuingAuthority: 'Revenue Department (Tahsildar)',
      applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
      downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      validityGuidance: 'Permanent validity for nativity by birth. Does not expire annually.',
    });
  }

  // First Graduate Condition
  if (inputs.isFirstGraduateClaim) {
    reqs.push({
      id: 'req-first-graduate',
      documentId: 'rev-104-first-graduate',
      documentName: 'First Graduate Certificate (REV-104)',
      isMandatory: true,
      reason: 'Required to obtain full tuition fee concession under TNEA engineering counseling if no sibling/parent has a university degree.',
      issuingAuthority: 'Tahsildar (via e-Sevai)',
      applicationUrl: 'https://www.tnesevai.tn.gov.in/citizen/',
      downloadUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      verificationUrl: 'https://tnedistrict.tn.gov.in/web/VerifyCerti.xhtml',
      validityGuidance: 'Permanent validity for the entire duration of undergraduate study once approved.',
    });
  }

  // Disability Condition
  if (inputs.hasDisabilityBenefit) {
    reqs.push({
      id: 'req-udid',
      documentId: 'disability-udid-card',
      documentName: 'UDID Card & Disability Certificate',
      isMandatory: true,
      reason: 'Statutory proof under RPwD Act 2016 for 5% reservation quota, scribe accommodation, and fee exemption.',
      issuingAuthority: 'District Medical Board / Swavlamban Card DEPwD',
      applicationUrl: 'https://www.swavlambancard.gov.in/',
      downloadUrl: 'https://www.swavlambancard.gov.in/pwd/application-status',
      verificationUrl: 'https://www.swavlambancard.gov.in/',
      validityGuidance: 'Permanent card has lifetime validity. Temporary card must be renewed prior to printed expiry date.',
    });
  }

  // Employment / Passport for higher education abroad
  if (inputs.purpose === 'Higher education abroad') {
    reqs.push({
      id: 'req-passport',
      documentId: 'id-passport',
      documentName: 'Valid Indian Passport',
      isMandatory: true,
      reason: 'Mandatory international identity and travel credential required for overseas university enrollment and student visa.',
      issuingAuthority: 'Passport Seva (MEA)',
      applicationUrl: 'https://www.passportindia.gov.in/',
      downloadUrl: 'https://portal2.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew',
      verificationUrl: 'https://www.passportindia.gov.in/',
      validityGuidance: 'Check printed expiry date. Most foreign consulates require at least 6 months validity beyond intended stay.',
    });
  }

  // Bank Account & PAN for stipend/employment
  if (inputs.purpose === 'Private employment' || inputs.purpose === 'Internship' || inputs.purpose === 'Fellowship') {
    reqs.push({
      id: 'req-pan',
      documentId: 'id-pan',
      documentName: 'PAN Card',
      isMandatory: true,
      reason: 'Mandatory for bank salary credit, tax deduction, and stipend disbursement.',
      issuingAuthority: 'Income Tax Department (Protean/UTIITSL)',
      applicationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan',
      downloadUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      verificationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken',
      validityGuidance: 'Permanent lifetime validity.',
    });
  }

  return reqs;
}

// -------------------------------------------------------------
// 7. FREQUENTLY ASKED QUESTIONS (FAQS)
// -------------------------------------------------------------
export const CERTIFICATE_FAQS = [
  {
    question: 'Does an Income Certificate automatically expire after exactly one year?',
    answer:
      'Not necessarily. While many revenue departments evaluate income on an annual financial cycle, the acceptance window is determined by the receiving authority. Most scholarship bodies (such as NSP or Tamil Nadu Welfare Directorates) and college admissions require an Income Certificate issued on or after April 1st of the current academic year. Always verify the specific receiving institution’s notification.',
  },
  {
    question: 'Does a Community Certificate expire or require yearly renewal in Tamil Nadu?',
    answer:
      'No. In Tamil Nadu, a Community Certificate issued by a competent revenue authority (Tahsildar / Zonal Deputy Tahsildar) with digital signature and barcode carries permanent lifetime validity. Routine annual renewal is NOT required unless the certificate is damaged or an official clerical correction is needed.',
  },
  {
    question: 'Can I use a Tamil Nadu State BC/MBC certificate for Central Government admissions (IIT/NIT/NEET)?',
    answer:
      'No. State Community Certificates are valid only for Tamil Nadu State Government reservations. For Central Government institutions, Central Universities, and Central jobs, you must obtain an Other Backward Class (OBC) Certificate in the prescribed Government of India format (e-Sevai Service REV-115) confirming that your caste appears in the Central OBC List and that you satisfy Non-Creamy Layer (NCL) criteria.',
  },
  {
    question: 'What is the difference between a Nativity Certificate and a Residence Certificate?',
    answer:
      'A Nativity Certificate certifies enduring domicile origin (place of birth or permanent family roots in Tamil Nadu), which is critical for state quota reservation seats. A Residence Certificate merely certifies where you are physically living at present (e.g. for local address proof or municipal services) and does not confer state domicile benefits.',
  },
  {
    question: 'Is a document fetched into DigiLocker legally equivalent to the original paper certificate?',
    answer:
      'Yes. Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules 2016, documents directly issued and fetched from authorized issuers into DigiLocker are treated on par with original physical documents.',
  },
  {
    question: 'Does Aadhaar expire annually or need yearly renewal fees?',
    answer:
      'No. Aadhaar has permanent lifetime validity and never requires annual renewal fees. Do not pay any agent claiming your Aadhaar has expired. Mandatory biometric updates are required only when a child turns 5 years and 15 years of age.',
  },
  {
    question: 'What is the First Graduate Certificate and can multiple siblings claim it?',
    answer:
      'The First Graduate Certificate (e-Sevai REV-104) certifies that neither parents nor any elder sibling has graduated with a university degree, granting full tuition fee concession in professional college counseling. It can be claimed only once per family; if an elder sibling has already used the benefit, younger siblings are not eligible.',
  },
];

export const ALL_DOCUMENTS: DocumentItem[] = [
  ...CERTIFICATES_CATALOGUE,
  ...IDENTITY_DOCUMENTS,
  ...SCHOOL_DOCUMENTS,
  ...HIGHER_ED_DOCUMENTS,
];

export const DIPLOMA_DOCUMENTS: DocumentItem[] = HIGHER_ED_DOCUMENTS.filter(
  (d) =>
    d.category === 'Diploma & Technical Documents' ||
    d.id.includes('diploma') ||
    d.id.includes('iti') ||
    d.relevantEducationStages.includes('Diploma') ||
    d.relevantEducationStages.includes('Polytechnic') ||
    d.relevantEducationStages.includes('ITI')
);

export const COLLEGE_DOCUMENTS: DocumentItem[] = HIGHER_ED_DOCUMENTS.filter(
  (d) =>
    d.category === 'College & University Documents' ||
    d.relevantEducationStages.includes('Undergraduate')
);

export const POSTGRADUATE_DOCUMENTS: DocumentItem[] = HIGHER_ED_DOCUMENTS.filter(
  (d) =>
    d.category === 'Postgraduate & Research Documents' ||
    d.relevantEducationStages.includes('Postgraduate') ||
    d.relevantEducationStages.includes('Completed Postgraduate') ||
    d.relevantEducationStages.includes('Research Scholar')
);

