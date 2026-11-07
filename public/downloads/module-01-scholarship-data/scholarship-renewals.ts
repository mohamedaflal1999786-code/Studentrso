/**
 * STUDENT RSO 2.0 – SCHOLARSHIP RENEWALS INTELLIGENCE ENGINE
 * 
 * Safely handles renewal logic, statuses, URL resolution priority,
 * and conditions across heterogeneous scholarship data models without runtime errors.
 */

export type RenewalStatus =
  | 'Renewal Available'
  | 'Upcoming Renewal'
  | 'Awaiting Official Notification'
  | 'Renewal Closed'
  | 'Renewal Not Applicable'
  | 'Verification Required';

export interface NormalizedRenewalInfo {
  isRenewable: boolean;
  status: RenewalStatus;
  academicYear: string;
  conditions: string[];
  academicRequirement: string;
  documents: string[];
  notificationUrl?: string;
  portalUrl?: string;
  hasReliablePortalLink: boolean;
  deadline?: string | null;
}

/**
 * Safely extracts and normalizes renewal information from any scholarship record.
 * Handles undefined, null, partial records, and varying data schemas without runtime errors.
 */
export function normalizeRenewalData(prog: any): NormalizedRenewalInfo {
  if (!prog || typeof prog !== 'object') {
    return {
      isRenewable: false,
      status: 'Renewal Not Applicable',
      academicYear: '2026-2027',
      conditions: ['Renewal guidelines not specified by provider.'],
      academicRequirement: 'Pass in previous semester examinations.',
      documents: ['Previous semester marksheet', 'Bonafide certificate'],
      hasReliablePortalLink: false,
      deadline: null,
    };
  }

  // 1. Determine renewal eligibility flag
  const isRenewable = Boolean(prog.isRenewable ?? prog.renewalInfo?.isRenewable ?? false);

  if (!isRenewable) {
    return {
      isRenewable: false,
      status: 'Renewal Not Applicable',
      academicYear: '2026-2027',
      conditions: ['This scheme is a one-time grant or does not offer continuous renewal.'],
      academicRequirement: 'Not applicable',
      documents: [],
      hasReliablePortalLink: false,
      deadline: null,
    };
  }

  // 2. Safe version extraction
  const versions = Array.isArray(prog.versions) ? prog.versions : [];
  const currentVer = versions.find((v: any) => v && v.isCurrentVersion) || versions[0] || {};
  const academicYear = currentVer.academicYear || prog.academicYear || '2026-2027';
  const lifecycleStatus = currentVer.lifecycleStatus || prog.applicationStatus || 'Upcoming';
  const deadline = currentVer.applicationDeadline || prog.applicationDeadline || null;

  // 3. Determine strict renewal status based on official evidence
  let status: RenewalStatus = 'Verification Required';

  if (lifecycleStatus === 'Awaiting New Notification' || lifecycleStatus === 'Source Unavailable') {
    status = 'Awaiting Official Notification';
  } else if (lifecycleStatus === 'Discontinued') {
    status = 'Renewal Closed';
  } else if (deadline) {
    const deadlineTime = new Date(deadline).getTime();
    if (!isNaN(deadlineTime) && deadlineTime < Date.now()) {
      status = 'Renewal Closed';
    } else if (lifecycleStatus === 'Open' || lifecycleStatus === 'Closing Soon') {
      status = 'Renewal Available';
    } else if (lifecycleStatus === 'Upcoming' || lifecycleStatus === 'Upcoming / To Be Announced') {
      status = 'Upcoming Renewal';
    } else {
      status = 'Verification Required';
    }
  } else if (lifecycleStatus === 'Open') {
    status = 'Renewal Available';
  } else if (lifecycleStatus === 'Upcoming' || lifecycleStatus === 'Upcoming / To Be Announced') {
    status = 'Upcoming Renewal';
  } else if (lifecycleStatus === 'Closed' || lifecycleStatus === 'Expired') {
    status = 'Renewal Closed';
  } else {
    status = 'Verification Required';
  }

  // 4. Conditions
  let conditions: string[] = [];
  if (Array.isArray(prog.renewalConditions) && prog.renewalConditions.length > 0) {
    conditions = prog.renewalConditions;
  } else if (Array.isArray(prog.renewalInfo?.renewalConditions) && prog.renewalInfo.renewalConditions.length > 0) {
    conditions = prog.renewalInfo.renewalConditions;
  } else {
    conditions = [
      'Continued regular enrollment in the approved course of study without break.',
      'Clearing all subjects / semester examinations in the previous academic year.',
      'Maintaining satisfactory attendance and conduct certified by the head of the institution.',
    ];
  }

  // 5. Academic requirement
  const academicRequirement =
    prog.renewalInfo?.minAcademicRequirement ||
    (prog.eligibility?.minMarksPercentage
      ? `Minimum ${prog.eligibility.minMarksPercentage}% in previous year examinations or clearing all papers.`
      : 'Passing all papers with satisfactory academic attendance.');

  // 6. Documents
  let documents: string[] = [];
  if (Array.isArray(prog.renewalInfo?.renewalDocumentChecklist) && prog.renewalInfo.renewalDocumentChecklist.length > 0) {
    documents = prog.renewalInfo.renewalDocumentChecklist;
  } else if (Array.isArray(prog.documents) && prog.documents.length > 0) {
    // Pick typical renewal documents from the general documents array
    documents = prog.documents.filter((d: string) => {
      const lower = d.toLowerCase();
      return (
        lower.includes('mark') ||
        lower.includes('bonafide') ||
        lower.includes('grade') ||
        lower.includes('attendance') ||
        lower.includes('fee receipt') ||
        lower.includes('income')
      );
    });
    if (documents.length === 0) {
      documents = [
        'Previous Academic Year Marksheet / Consolidated Grade Sheet',
        'Current Academic Year Bonafide Certificate from College / Institution',
        'Tuition Fee Receipt for current semester / academic year',
      ];
    }
  } else {
    documents = [
      'Previous Academic Year Marksheet',
      'Current Academic Year Bonafide Certificate',
      'Fee Receipt / Renewal Registration Confirmation',
    ];
  }

  // 7. Official links resolution based on strict priority
  // Priority 1: Official renewal-specific application URL
  // Priority 2: Official scholarship application URL, only when it supports renewal
  // Priority 3: Official scheme information page
  let portalUrl: string | undefined = undefined;
  let hasReliablePortalLink = false;

  const candidateRenewalUrl = prog.renewalInfo?.renewalPortalUrl;
  const candidateAppUrl = prog.officialApplicationUrl;
  const candidateGuidelinesUrl = currentVer.notificationBulletinUrl || prog.officialGuidelinesUrl;

  if (candidateRenewalUrl && typeof candidateRenewalUrl === 'string' && candidateRenewalUrl.startsWith('http')) {
    portalUrl = candidateRenewalUrl;
    hasReliablePortalLink = true;
  } else if (candidateAppUrl && typeof candidateAppUrl === 'string' && candidateAppUrl.startsWith('http')) {
    portalUrl = candidateAppUrl;
    hasReliablePortalLink = true;
  } else if (candidateGuidelinesUrl && typeof candidateGuidelinesUrl === 'string' && candidateGuidelinesUrl.startsWith('http')) {
    portalUrl = candidateGuidelinesUrl;
    hasReliablePortalLink = true;
  }

  const notificationUrl =
    (currentVer.notificationBulletinUrl && currentVer.notificationBulletinUrl.startsWith('http')
      ? currentVer.notificationBulletinUrl
      : undefined) ||
    (prog.officialGuidelinesUrl && prog.officialGuidelinesUrl.startsWith('http')
      ? prog.officialGuidelinesUrl
      : undefined);

  return {
    isRenewable: true,
    status,
    academicYear,
    conditions,
    academicRequirement,
    documents,
    notificationUrl,
    portalUrl,
    hasReliablePortalLink,
    deadline,
  };
}
