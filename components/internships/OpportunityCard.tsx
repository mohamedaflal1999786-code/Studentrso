'use client';

import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
  Building,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';

interface OpportunityCardProps {
  item: OpportunityListing;
  isBookmarked: boolean;
  onToggleBookmark: (opp: OpportunityListing) => void;
  onViewDetails: (opp: OpportunityListing) => void;
  onApplyOfficial?: (url: string) => void;
}

export function OpportunityCard({
  item,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  onApplyOfficial,
}: OpportunityCardProps) {
  const isClosed = item.isClosed || (item.applicationClosingDate !== 'Rolling Basis' && new Date(item.applicationClosingDate) < new Date());

  const categoryColor =
    item.category === 'government-internship' || item.category === 'government-job'
      ? 'bg-[#8c2f39]/10 text-[#8c2f39] border-[#8c2f39]/20'
      : item.category === 'apprenticeship'
      ? 'bg-blue-100 text-blue-900 border-blue-300'
      : item.category === 'skill-development'
      ? 'bg-amber-100 text-amber-900 border-amber-300'
      : 'bg-emerald-100 text-emerald-900 border-emerald-300';

  const categoryBadgeLabel =
    item.category === 'government-internship'
      ? 'Government Internship'
      : item.category === 'private-internship'
      ? 'Private Internship'
      : item.category === 'apprenticeship'
      ? 'Apprenticeship (NATS/NAPS)'
      : item.category === 'skill-development'
      ? 'Skill Programme'
      : item.category === 'government-job'
      ? 'Government Job'
      : 'Private Job';

  const cohorts = item.targetCohorts || item.qualification || [];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${categoryColor}`}>
            {categoryBadgeLabel}
          </span>
          <span className="rounded-full border border-[#d8c7ad] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#554a3f]">
            {item.organisationType}
          </span>
          <span className="rounded-full bg-stone-100 border border-stone-200 px-2 py-0.5 font-mono text-[9px] text-stone-600">
            {item.workMode}
          </span>
        </div>

        <button
          onClick={() => onToggleBookmark(item)}
          aria-label={isBookmarked ? 'Remove from saved' : 'Save opportunity'}
          className={`rounded-lg p-2 transition-colors cursor-pointer ${
            isBookmarked
              ? 'bg-[#8c2f39]/10 text-[#8c2f39]'
              : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#8c2f39]'
          }`}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Title */}
      <h3
        onClick={() => onViewDetails(item)}
        className="mt-3 font-serif text-[18px] font-bold leading-snug text-[#2b2118] line-clamp-2 hover:text-[#8c2f39] transition-colors cursor-pointer"
      >
        {item.title}
      </h3>
      <p className="mt-1 font-sans text-[12px] font-medium text-[#7a6a5a] line-clamp-1 flex items-center gap-1.5">
        <Building size={13} className="text-[#8c2f39] shrink-0" />
        <span className="truncate">{item.organisation}</span>
        {item.location && <span className="text-[#efe3cc]">·</span>}
        {item.location && <span className="truncate">{item.location}</span>}
      </p>

      {/* Summary */}
      <p className="mt-3 flex-1 font-sans text-[13px] leading-[22px] text-[#554a3f] line-clamp-3">
        {item.description}
      </p>

      {/* Cohorts & Stipend Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {cohorts.slice(0, 3).map((cohort: string) => (
          <span
            key={cohort}
            className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2 py-0.5 font-mono text-[10px] text-[#7a6a5a]"
          >
            {cohort}
          </span>
        ))}
        {cohorts.length > 3 && (
          <span className="rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-1.5 py-0.5 font-mono text-[10px] text-[#7a6a5a]">
            +{cohorts.length - 3} more
          </span>
        )}
        <span
          className={`rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold ${
            item.isPaid
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-stone-100 border border-stone-200 text-stone-600'
          }`}
        >
          {item.stipendOrSalary || (item.isPaid ? 'Paid' : 'Unpaid')}
        </span>
      </div>

      {/* Application Status & Zero-Fee Verification */}
      <div className="mt-4 border-t border-[#efe3cc] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[#7a6a5a] mb-3">
          <span className="inline-flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                isClosed
                  ? 'bg-stone-400'
                  : 'bg-emerald-500 animate-pulse'
              }`}
            />
            <span className={isClosed ? 'text-stone-500' : 'text-[#2b2118] font-medium'}>
              {isClosed ? 'Closed' : `Closes: ${item.applicationClosingDate}`}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
            <ShieldCheck size={13} />
            {item.verificationStatus}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(item)}
              className="flex-1 rounded-lg bg-[#8c2f39] px-3 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#6d1824] shadow-xs cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => onToggleBookmark(item)}
              title={isBookmarked ? 'Saved in Tracker' : 'Track Application'}
              className="flex items-center justify-center rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#8c2f39] transition-colors hover:bg-[#f6ede0] cursor-pointer"
            >
              <PlusCircle size={15} className="mr-1 inline" />
              {isBookmarked ? 'Tracked' : 'Track'}
            </button>
          </div>

          {item.officialApplicationUrl && onApplyOfficial && (
            <button
              onClick={() => onApplyOfficial(item.officialApplicationUrl)}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#8c2f39]/30 bg-[#8c2f39]/5 py-1.5 font-sans text-[12px] font-bold text-[#8c2f39] hover:bg-[#8c2f39]/10 cursor-pointer"
            >
              <span>Official Direct Link</span>
              <ExternalLink size={13} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
