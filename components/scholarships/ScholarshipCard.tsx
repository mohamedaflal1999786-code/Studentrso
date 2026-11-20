'use client';

import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';
import { ComprehensiveScholarship, ScholarshipProgram } from '@/lib/scholarships-data';

interface ScholarshipCardProps {
  item: ComprehensiveScholarship | any;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onViewDetails: (item: ComprehensiveScholarship) => void;
  onTrackApplication: (item: ComprehensiveScholarship) => void;
  onApplyOfficial?: (item: ComprehensiveScholarship) => void;
}

export function ScholarshipCard({
  item,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  onTrackApplication,
  onApplyOfficial,
}: ScholarshipCardProps) {
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

  const categoryColor =
    item.category === 'Tamil Nadu Government'
      ? 'bg-[#0d3e2e]/10 text-[#0d3e2e] border-[#0d3e2e]/20'
      : item.category === 'Central Government'
      ? 'bg-amber-100 text-amber-900 border-amber-300'
      : item.category === 'AICTE' || item.category === 'UGC' || item.category === 'ICAR' || item.category === 'Research Council'
      ? 'bg-blue-100 text-blue-900 border-blue-300'
      : 'bg-emerald-100 text-emerald-900 border-emerald-300';

  const statusColor =
    lifecycleStatus === 'Open'
      ? 'bg-emerald-500'
      : lifecycleStatus === 'Upcoming' || lifecycleStatus === 'Upcoming / To Be Announced'
      ? 'bg-blue-500'
      : lifecycleStatus === 'Closing Soon'
      ? 'bg-amber-500'
      : lifecycleStatus === 'Awaiting New Notification'
      ? 'bg-stone-500'
      : 'bg-stone-400';

  const stages: string[] = item.educationStages || item.educationLevels || [];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}>
            {item.category}
          </span>
          {item.schemeType && (
            <span className="rounded-full border border-[#d8c7ad] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#554a3f]">
              {item.schemeType}
            </span>
          )}
          <span className="rounded-full bg-stone-100 border border-stone-200 px-2 py-0.5 font-mono text-[9px] text-stone-600">
            {academicYear}
          </span>
        </div>

        <button
          onClick={() => onToggleBookmark(item.id)}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scholarship'}
          className={`rounded-lg p-2 transition-colors ${
            isBookmarked ? 'bg-[#0d3e2e]/10 text-[#0d3e2e]' : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#0d3e2e]'
          }`}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Title */}
      <h3 className="mt-3 font-serif text-[18px] font-bold leading-snug text-[#2b2118] line-clamp-2">
        {item.name}
      </h3>
      <p className="mt-1 font-sans text-[12px] font-medium text-[#7a6a5a] line-clamp-1">
        {item.provider} {item.department && item.department !== item.provider ? `· ${item.department}` : ''}
      </p>

      {/* Summary */}
      <p className="mt-3 flex-1 font-sans text-[13px] leading-[22px] text-[#554a3f] line-clamp-3">
        {item.summary}
      </p>

      {/* Education Levels & Amount */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {stages.slice(0, 3).map((lvl) => (
          <span
            key={lvl}
            className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[10px] text-[#7a6a5a]"
          >
            {lvl}
          </span>
        ))}
        {stages.length > 3 && (
          <span className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-1.5 py-0.5 font-mono text-[10px] text-[#7a6a5a]">
            +{stages.length - 3} more
          </span>
        )}
        <span
          className={`rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold ${
            amountPublished
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-stone-100 border border-stone-200 text-stone-600'
          }`}
        >
          {amountDetails}
        </span>
      </div>

      {/* Application Status & Official Badge */}
      <div className="mt-4 border-t border-[#efe3cc] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[#7a6a5a] mb-3">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
            {lifecycleStatus}
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
            <ShieldCheck size={13} />
            Verified {verifiedDate}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(item)}
              className="flex-1 rounded-lg bg-[#0d3e2e] px-3 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#08261c] shadow-xs"
            >
              Full Details
            </button>
            <button
              onClick={() => onTrackApplication(item)}
              title="Add to My Application Tracker"
              className="flex items-center justify-center rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#0d3e2e] transition-colors hover:bg-[#f6ede0]"
            >
              <PlusCircle size={15} className="mr-1 inline" />
              Track
            </button>
          </div>

          {onApplyOfficial && (
            <button
              onClick={() => onApplyOfficial(item)}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#0d3e2e]/30 bg-[#0d3e2e]/5 py-1.5 font-sans text-[12px] font-bold text-[#0d3e2e] hover:bg-[#0d3e2e]/10"
            >
              <span>Apply on Official Website</span>
              <ExternalLink size={13} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
