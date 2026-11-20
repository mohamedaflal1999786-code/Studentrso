'use client';

import React from 'react';
import { Building, ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertTriangle, ArrowRight, Bookmark } from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface GovernmentInternshipsSectionProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function GovernmentInternshipsSection({
  opportunities,
  onSelectOpportunity,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: GovernmentInternshipsSectionProps) {
  const govInternships = opportunities.filter((o) => o.category === 'government-internship');

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Building size={14} /> PUBLIC SECTOR &amp; AUTONOMOUS BODIES
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Government Internship Centre
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Official public sector internships from Central Government Ministries, State Government Departments, ISRO, DRDO, CSIR, and NITI Aayog.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            All Portals Strictly Government (.gov.in / .res.in)
          </span>
        </div>

        {/* Nodal Portals Quick Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-[#efe3cc]">
          {[
            { name: 'AICTE Internship', url: 'https://internship.aicte-india.org/', code: 'aicte-india.org' },
            { name: 'NITI Aayog', url: 'https://www.niti.gov.in/internship', code: 'niti.gov.in' },
            { name: 'ISRO Research', url: 'https://www.isro.gov.in/', code: 'isro.gov.in' },
            { name: 'CSIR Research', url: 'https://www.csir.res.in/', code: 'csir.res.in' },
            { name: 'DRDO Labs', url: 'https://www.drdo.gov.in/', code: 'drdo.gov.in' },
          ].map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] hover:border-[#0d3e2e] transition text-left group flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">{portal.name}</p>
                <p className="text-[10px] font-mono text-[#7a6a5a]">{portal.code}</p>
              </div>
              <ExternalLink size={13} className="text-[#0d3e2e] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Verified Government Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {govInternships.map((item) => (
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
