'use client';

import React from 'react';
import { Briefcase, Building, ExternalLink, Calendar, MapPin, DollarSign, ArrowRight, Bookmark } from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface PrivateJobsSectionProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function PrivateJobsSection({
  opportunities,
  onSelectOpportunity,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: PrivateJobsSectionProps) {
  const pvtJobs = opportunities.filter((o) => o.category === 'private-job');

  return (
    <div className="space-y-6 font-sans">
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Briefcase size={14} /> CORPORATE FRESHER RECRUITMENT &amp; DIRECT DRIVES
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Private Company Employment Exchange
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Direct corporate fresher jobs, graduate trainee openings, and entry-level positions verified directly on employer career portals.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Zero Placement Fee Guarantee
          </span>
        </div>

        <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 text-xs text-[#7a6a5a]">
          <strong className="text-[#2b2118]">Zero Placement Fee Guarantee:</strong> Student RSO lists only genuine corporate employers who never charge interview or placement fees. Do not pay any agent.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pvtJobs.map((item) => (
          <OpportunityCard
            key={item.id}
            item={item}
            isBookmarked={savedIds.has(item.id)}
            onToggleBookmark={onSaveOpportunity}
            onViewDetails={onSelectOpportunity}
            onApplyOfficial={onApplyOfficial}
          />
        ))}
      </div>
    </div>
  );
}
