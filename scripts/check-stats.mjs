import { getScholarshipAuditStats, SCHOLARSHIP_AUDIT_MASTER_52 } from '../lib/scholarship-url-audit.ts';

const stats = getScholarshipAuditStats();
console.log('Audit stats:');
console.log('totalScholarships:', stats.totalScholarships);
console.log('distinctUpdatedUrls:', stats.distinctUpdatedUrls);
console.log('manualAppVerificationCount:', stats.manualAppVerificationCount);
console.log('institutionalAppCount:', stats.institutionalAppCount);
console.log('verifiedDestinations:', stats.verifiedDestinations);
console.log('redirectedDestinations:', stats.redirectedDestinations);
console.log('brokenDestinations:', stats.brokenDestinations);
console.log('manualVerificationRequired:', stats.manualVerificationRequired);
