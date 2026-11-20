'use client';

import React, { useState } from 'react';
import { Briefcase, Building, ExternalLink, ArrowRight, Bookmark, ShieldCheck } from 'lucide-react';
import { OpportunityListing } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface PrivateInternshipsSectionProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function PrivateInternshipsSection({
  opportunities,
  onSelectOpportunity,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: PrivateInternshipsSectionProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const pvtInternships = opportunities.filter((o) => o.category === 'private-internship');

  const domains = [
    { id: 'all', label: 'All Industries' },
    { id: 'Software', label: 'IT & Software' },
    { id: 'Engineering', label: 'Core Engineering' },
    { id: 'Healthcare', label: 'Healthcare & Pharma' },
    { id: 'Commerce', label: 'Finance & Management' },
  ];

  const filtered = pvtInternships.filter((item) => {
    if (selectedDomain === 'all') return true;
    return (
      item.departmentOrDomain.toLowerCase().includes(selectedDomain.toLowerCase()) ||
      item.eligibleCourses.some((c) => c.toLowerCase().includes(selectedDomain.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
              <Briefcase size={14} /> INDUSTRY &amp; CORPORATE RECRUITMENT
            </div>
            <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Private Company Internship Centre
            </h2>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Direct opportunities with verified corporate employers, startups, and MSMEs across Tamil Nadu and India.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Zero Placement Brokerage • 100% Direct Portal
          </span>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#efe3cc]">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                selectedDomain === d.id
                  ? 'bg-[#0d3e2e] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
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
