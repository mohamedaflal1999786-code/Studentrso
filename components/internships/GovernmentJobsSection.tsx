'use client';

import React from 'react';
import { Building, ExternalLink, Calendar, CheckCircle2, DollarSign, ArrowRight, Bookmark } from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface GovernmentJobsSectionProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function GovernmentJobsSection({
  opportunities,
  onSelectOpportunity,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: GovernmentJobsSectionProps) {
  const govJobs = opportunities.filter((o) => o.category === 'government-job');

  const boards = [
    { name: 'TNPSC', url: 'https://www.tnpsc.gov.in/', desc: 'State Civil & Administrative Services' },
    { name: 'TNUSRB', url: 'https://www.tnusrb.tn.gov.in/', desc: 'Uniformed Services & Police' },
    { name: 'TRB Tamil Nadu', url: 'https://www.trb.tn.gov.in/', desc: 'Teachers Recruitment Board' },
    { name: 'MRB Tamil Nadu', url: 'https://www.mrb.tn.gov.in/', desc: 'Medical Services Recruitment' },
    { name: 'SSC Central', url: 'https://ssc.gov.in/', desc: 'Staff Selection Commission' },
    { name: 'Railway RRB', url: 'https://www.rrbapply.gov.in/', desc: 'Railway Recruitment Boards' },
    { name: 'IBPS Banking', url: 'https://www.ibps.in/', desc: 'Public Sector Bank Recruitment' },
    { name: 'UPSC Civil Services', url: 'https://upsc.gov.in/', desc: 'Union Public Service Commission' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Building size={14} /> OFFICIAL PUBLIC COMMISSIONS &amp; BOARDS
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Government Employment Opportunities
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Verified direct public recruitment drives across Tamil Nadu state commissions and Central Government ministries.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            No Exam Fees Brokerage • Direct Portals Only
          </span>
        </div>

        {/* Nodal Boards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#efe3cc]">
          {boards.map((b, i) => (
            <a
              key={i}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] hover:border-[#8c2f39] transition group flex items-start justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#2b2118] group-hover:text-[#8c2f39]">{b.name}</p>
                <p className="text-[10px] text-[#7a6a5a]">{b.desc}</p>
              </div>
              <ExternalLink size={13} className="text-[#8c2f39] shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Verified Govt Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {govJobs.map((item) => (
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
