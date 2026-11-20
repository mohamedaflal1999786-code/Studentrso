'use client';

import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  FileText,
  HelpCircle,
  IndianRupee,
  Info,
  PlusCircle,
  RefreshCw,
  School,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ComprehensiveScholarship } from '@/lib/scholarships-data';

interface ScholarshipDetailsModalProps {
  item: ComprehensiveScholarship | any;
  isOpen: boolean;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onTrackApplication: (item: ComprehensiveScholarship) => void;
  onOpenChecklistForProgram?: (item: ComprehensiveScholarship) => void;
  onApplyOfficial?: (item: ComprehensiveScholarship) => void;
}

export function ScholarshipDetailsModal({
  item,
  isOpen,
  isBookmarked,
  onClose,
  onToggleBookmark,
  onTrackApplication,
  onOpenChecklistForProgram,
  onApplyOfficial,
}: ScholarshipDetailsModalProps) {
  if (!isOpen || !item) return null;

  const currentVersion =
    item.versions?.find((v: any) => v.isCurrentVersion) || item.versions?.[0] || {};
  const academicYear = currentVersion?.academicYear || item.academicYear || '2026-2027';
  const lifecycleStatus =
    currentVersion?.lifecycleStatus || item.applicationStatus || 'Upcoming';
  const verifiedDate =
    currentVersion?.sourceVerificationDate || item.lastVerifiedAt || '2026-11-06';
  const amountPublished =
    currentVersion?.amountPublished ?? item.amountPublished ?? false;
  const amountDetails =
    currentVersion?.publishedAmountDetails || item.amountDetails || 'Not officially confirmed';
  const benefitsConfirmed =
    currentVersion?.confirmedBenefits || item.benefitsSummary || 'Benefits provided as per current Government Order / Foundation guidelines.';

  const rules = item.eligibility;
  const stages: string[] = item.educationStages || item.educationLevels || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2b2118]/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Category & Verified Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            {item.category}
          </span>
          {item.schemeType && (
            <span className="rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-700">
              {item.schemeType}
            </span>
          )}
          {item.code && (
            <span className="font-mono text-[11px] text-[#7a6a5a]">
              ID: {item.code}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 ml-auto mr-8">
            <ShieldCheck size={14} />
            Verified {verifiedDate}
          </span>
        </div>

        {/* Header Title */}
        <h2 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight text-[#2b2118] pr-8">
          {item.name}
        </h2>
        <p className="mt-1 font-sans text-[14px] text-[#7a6a5a]">
          <strong className="text-[#2b2118] font-medium">{item.provider}</strong>
          {item.department && item.department !== item.provider && ` · ${item.department}`}
        </p>

        {/* Academic Year Banner */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 font-sans text-[13px] text-[#554a3f]">
          <div className="flex items-center gap-1.5 font-semibold text-[#2b2118]">
            <Calendar size={15} className="text-[#0d3e2e]" />
            Academic Cycle: {academicYear}
          </div>
          <div>
            Lifecycle Status:{' '}
            <span className="font-semibold text-[#0d3e2e]">{lifecycleStatus}</span>
          </div>
          <div>
            Application Deadline:{' '}
            <span className="font-medium text-[#2b2118]">
              {currentVersion?.applicationDeadline || item.applicationDeadline || 'Not officially confirmed'}
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="mt-5 space-y-3 font-sans text-[14px] leading-[24px] text-[#554a3f]">
          <p>{item.detailedDescription || item.summary}</p>
        </div>

        {/* Benefits & Amounts Section */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <div className="flex items-center gap-2 font-serif text-[16px] font-bold text-emerald-950">
            <IndianRupee size={18} className="text-emerald-700" />
            Benefits & Scholarship Amount
          </div>
          <p className="mt-2 font-sans text-[14px] text-emerald-900 leading-relaxed font-semibold">
            {amountPublished ? amountDetails : 'Not officially confirmed'}
          </p>
          <p className="mt-1 font-sans text-[13px] text-emerald-800 leading-normal">
            {benefitsConfirmed}
          </p>
          {!amountPublished && (
            <p className="mt-2 font-sans text-[12px] text-stone-500 italic">
              Exact disbursement amount depends on verified course fee slabs, tuition waivers, or official circular updates.
            </p>
          )}
        </div>

        {/* Eligibility Details Grid */}
        <div className="mt-6 rounded-xl border border-[#efe3cc] bg-white p-5 space-y-4">
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#0d3e2e]" />
            Eligibility Criteria
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 text-[13px]">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Target Education Stage
              </span>
              <div className="flex flex-wrap gap-1">
                {stages.map((lvl) => (
                  <span
                    key={lvl}
                    className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[11px] text-[#2b2118]"
                  >
                    {lvl}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Community / Social Category
              </span>
              <span className="font-medium text-[#2b2118]">
                {rules?.communityCategories?.length
                  ? rules.communityCategories.join(', ')
                  : 'All Eligible Communities'}
              </span>
            </div>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Income Ceiling
              </span>
              <span className="font-medium text-[#2b2118]">
                {rules?.minIncomeCeiling
                  ? `₹${rules.minIncomeCeiling.toLocaleString('en-IN')} per annum max`
                  : 'No strict income ceiling confirmed'}
              </span>
              {rules?.incomeConditionDescription && (
                <p className="text-[12px] text-[#7a6a5a] mt-0.5">{rules.incomeConditionDescription}</p>
              )}
            </div>

            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                Academic Qualifying Marks
              </span>
              <span className="font-medium text-[#2b2118]">
                {rules?.minMarksPercentage
                  ? `Minimum ${rules.minMarksPercentage}% in qualifying exam`
                  : 'Passed in previous qualifying board / semester'}
              </span>
              {rules?.marksConditionDescription && (
                <p className="text-[12px] text-[#7a6a5a] mt-0.5">{rules.marksConditionDescription}</p>
              )}
            </div>

            {rules?.tnGovtSchoolRequired && (
              <div className="sm:col-span-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-amber-900 text-[12px]">
                <strong>Government School Criterion:</strong> Must have studied Class 6 through 12 in Tamil Nadu Government Schools (EMIS verified).
              </div>
            )}

            {rules?.firstGenerationGraduateRequired && (
              <div className="sm:col-span-2 rounded-lg bg-blue-50 border border-blue-200 p-2.5 text-blue-900 text-[12px]">
                <strong>First Generation Graduate:</strong> Must obtain First Generation Graduate certificate from the Revenue Department.
              </div>
            )}

            {rules?.genderEligibility && rules.genderEligibility !== 'All' && (
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                  Gender Eligibility
                </span>
                <span className="font-medium text-[#0d3e2e]">{rules.genderEligibility}</span>
              </div>
            )}

            {rules?.requiresEntranceExam?.length && (
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-1">
                  Entrance / Fellowship Exam
                </span>
                <span className="font-medium text-blue-900">
                  {rules.requiresEntranceExam.join(' / ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Required Documents */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[18px] font-bold text-[#2b2118] flex items-center gap-2">
              <FileText size={18} className="text-[#0d3e2e]" />
              Required Documents
            </h3>
            {onOpenChecklistForProgram && (
              <button
                onClick={() => {
                  onClose();
                  onOpenChecklistForProgram(item);
                }}
                className="font-sans text-[12px] font-semibold text-[#0d3e2e] hover:underline"
              >
                Open in Document Checklist →
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.documents?.map((doc: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1.5 font-sans text-[12px] text-[#2b2118]"
              >
                <FileCheck size={14} className="text-[#0d3e2e]" />
                {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Renewal Information */}
        {item.isRenewable && item.renewalConditions?.length > 0 && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/60 p-4 font-sans text-[13px] text-blue-950">
            <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-1">
              <RefreshCw size={15} />
              Renewal Guidelines for Continuing Scholars:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-blue-900">
              {item.renewalConditions.map((cond: string, i: number) => (
                <li key={i}>{cond}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Verification Notice & Status */}
        <div className="mt-6 rounded-xl bg-[#f6ede0] border border-[#efe3cc] p-4 text-[12px] text-[#7a6a5a] leading-relaxed">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 font-semibold text-[#2b2118]">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>Official Source & Verification Status</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {item.infoUrlVerificationStatus ? (
                <>
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-900" title="Information URL Status">
                    Info: {item.infoUrlVerificationStatus.includes('VERIFIED') ? 'Verified Official Page' : 'Audit Review'}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold border ${
                    item.appUrlVerificationStatus?.includes('INSTITUTION')
                      ? 'bg-purple-50 border-purple-200 text-purple-900'
                      : item.appUrlVerificationStatus?.includes('MANUAL')
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  }`} title="Application URL Status">
                    App: {item.appUrlVerificationStatus?.includes('INSTITUTION') ? 'Institutional Process' : item.appUrlVerificationStatus?.includes('MANUAL') ? 'Manual Check Required' : 'Portal Live'}
                  </span>
                </>
              ) : (
                <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                  {item.urlVerificationStatus || 'VERIFIED'}
                </span>
              )}
            </div>
          </div>
          <p className="mb-2">
            Verified on <strong className="text-[#2b2118]">{verifiedDate}</strong> directly against official department portal:{' '}
            {item.officialGuidelinesUrl || item.officialApplicationUrl ? (
              <a
                href={item.officialGuidelinesUrl || item.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d3e2e] underline font-medium"
              >
                {new URL(item.officialGuidelinesUrl || item.officialApplicationUrl).hostname}
              </a>
            ) : (
              <span className="text-[#0d3e2e] font-medium">Official Government / Foundation Source</span>
            )}
            . Always review the full official gazette or scheme circular before submitting documentation.
          </p>
          {item.appUrlVerificationStatus?.includes('INSTITUTION') && (
            <div className="rounded-lg bg-purple-50/80 border border-purple-200 px-3 py-1.5 text-[11.5px] text-purple-900 font-medium">
              ℹ Application Mode: Processed via school/college institution or department submission rather than a public self-registration form.
            </div>
          )}
          {item.appUrlVerificationStatus?.includes('UMIS') && (
            <div className="rounded-lg bg-blue-50/80 border border-blue-200 px-3 py-1.5 text-[11.5px] text-blue-900 font-medium">
              ℹ Application Mode: Processed automatically through the Tamil Nadu UMIS (University Management Information System) portal.
            </div>
          )}
        </div>

        {/* Action Buttons Bar */}
        <div className="mt-6 pt-4 border-t border-[#efe3cc] space-y-4">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-2.5 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {item.officialApplicationUrl ? (
                <button
                  type="button"
                  title="Apply on Official Website"
                  onClick={() => {
                    if (onApplyOfficial) {
                      onClose();
                      onApplyOfficial(item);
                    } else {
                      window.open(item.officialApplicationUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0d3e2e] px-4 py-2.5 font-sans text-[13.5px] font-bold text-white transition hover:bg-[#08261c] shadow-xs cursor-pointer"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink size={15} />
                </button>
              ) : (
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3.5 py-2 font-sans text-[12px] text-amber-900">
                  Official application link not currently available. Please check the official scheme notification.
                </div>
              )}

              {/* View Official Details */}
              <a
                href={item.officialInfoUrl || item.officialGuidelinesUrl || item.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#2b2118] transition hover:bg-[#f6ede0]"
              >
                <span>View Official Details</span>
                <ExternalLink size={14} />
              </a>

              {/* Read Official Guidelines */}
              {item.officialGuidelinesUrl && item.officialGuidelinesUrl !== item.officialApplicationUrl && (
                <a
                  href={item.officialGuidelinesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#554a3f] transition hover:bg-[#f6ede0]"
                >
                  <span>Read Official Guidelines</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Check Application Status (Only shown when an official tracking facility exists) */}
              {(item.trackingUrl || item.officialApplicationUrl?.includes('scholarships.gov.in') || item.officialApplicationUrl?.includes('canarabank.in') || item.officialApplicationUrl?.includes('tneaonline.org') || item.officialApplicationUrl?.includes('tils.tn.gov.in') || item.officialApplicationUrl?.includes('parivartanecss.com')) && (
                <a
                  href={item.trackingUrl || item.officialApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3.5 py-2.5 font-sans text-[13px] font-bold text-emerald-900 transition hover:bg-emerald-100"
                  title="Track application status on official portal"
                >
                  <Search size={14} className="text-emerald-700" />
                  <span>Check Application Status</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleBookmark(item.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#0d3e2e] transition hover:bg-[#f6ede0] cursor-pointer"
              >
                {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTrackApplication(item);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#0d3e2e] bg-[#0d3e2e]/10 px-3.5 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] transition hover:bg-[#0d3e2e] hover:text-white cursor-pointer"
              >
                <PlusCircle size={16} />
                Track Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
