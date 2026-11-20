'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { OpportunityListing, filterOpportunities, OpportunityCategory } from '@/lib/internship-data';
import { OpportunityCard } from './OpportunityCard';

interface InternshipOverviewDashboardProps {
  opportunities: OpportunityListing[];
  onSelectOpportunity: (opportunity: OpportunityListing) => void;
  onNavigateTab: (tabId: string) => void;
  onSaveOpportunity: (opportunity: OpportunityListing) => void;
  savedIds: Set<string>;
  onApplyOfficial?: (url: string) => void;
}

export function InternshipOverviewDashboard({
  opportunities,
  onSelectOpportunity,
  onNavigateTab,
  onSaveOpportunity,
  savedIds,
  onApplyOfficial,
}: InternshipOverviewDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [selectedPaid, setSelectedPaid] = useState<boolean | 'all'>('all');

  // Search & Filter Memo
  const filteredList = useMemo(() => {
    return filterOpportunities(opportunities, {
      query: searchQuery,
      category: selectedCategory,
      qualification: selectedCohort === 'all' ? '' : selectedCohort,
      isPaid: selectedPaid,
    });
  }, [opportunities, searchQuery, selectedCategory, selectedCohort, selectedPaid]);

  // Pillar counters
  const counts = useMemo(() => {
    return {
      govInternships: opportunities.filter((o) => o.category === 'government-internship').length,
      pvtInternships: opportunities.filter((o) => o.category === 'private-internship').length,
      apprenticeships: opportunities.filter((o) => o.category === 'apprenticeship').length,
      skills: opportunities.filter((o) => o.category === 'skill-development').length,
      govJobs: opportunities.filter((o) => o.category === 'government-job').length,
      pvtJobs: opportunities.filter((o) => o.category === 'private-job').length,
    };
  }, [opportunities]);

  return (
    <div className="space-y-8 font-sans">
      {/* Six Pillar Quick Access Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onNavigateTab('government-internships')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <Building size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">Government</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">{counts.govInternships} Verified Openings</div>
        </button>

        <button
          onClick={() => onNavigateTab('private-internships')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <Briefcase size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">Private Firms</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">{counts.pvtInternships} Verified Openings</div>
        </button>

        <button
          onClick={() => onNavigateTab('apprenticeships')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <GraduationCap size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">Apprenticeship</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">NATS &amp; NAPS Portals</div>
        </button>

        <button
          onClick={() => onNavigateTab('skill-development')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <Award size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">Skills &amp; Training</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">Naan Mudhalvan &amp; NSDC</div>
        </button>

        <button
          onClick={() => onNavigateTab('employment-exchange')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <Layers size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">TN Velaivaaippu</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">Employment Card Reg.</div>
        </button>

        <button
          onClick={() => onNavigateTab('government-jobs')}
          className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] hover:border-[#0d3e2e] text-left transition shadow-[0_2px_12px_rgba(43,33,24,0.04)] group cursor-pointer"
        >
          <Sparkles size={20} className="text-[#0d3e2e] mb-2 group-hover:scale-105 transition-transform" />
          <div className="font-serif text-[15px] font-bold text-[#2b2118] line-clamp-1">Jobs Directory</div>
          <div className="font-mono text-[11px] text-[#7a6a5a]">Govt &amp; Private Roles</div>
        </button>
      </div>

      {/* Search & Smart Filter Bar (Matching Module 01/02 Directory Search Box) */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            <Search size={14} /> DIRECT SEARCH &amp; COHORT FILTER
          </div>
          <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
            Search Opportunities &amp; Verified Schemes
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Search genuine internships, apprenticeships, stipend opportunities and direct employment across Tamil Nadu and Central platforms.
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-[#efe3cc]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, department, organisation, location, course, or skills (e.g. B.Sc, AICTE, ISRO, Chennai)..."
              className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2.5 pl-10 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
            />
          </div>

          {/* Cohort & Paid filter pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#7a6a5a] text-[11px] uppercase tracking-wider mr-1">Cohort:</span>
              {[
                { id: 'all', label: 'All Cohorts' },
                { id: 'Class 10', label: 'Class 10' },
                { id: 'Class 12', label: 'Class 12' },
                { id: 'Diploma', label: 'Diploma' },
                { id: 'Undergraduate', label: 'UG / College' },
                { id: 'Postgraduate', label: 'PG / Masters' },
                { id: 'Fresh Graduates', label: 'Freshers' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCohort(c.id)}
                  className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition cursor-pointer ${
                    selectedCohort === c.id
                      ? 'bg-[#0d3e2e] text-white shadow-2xs'
                      : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#7a6a5a] text-[11px] uppercase tracking-wider">Pay:</span>
              <button
                onClick={() => setSelectedPaid('all')}
                className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold cursor-pointer transition ${
                  selectedPaid === 'all'
                    ? 'bg-[#0d3e2e] text-white shadow-2xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedPaid(true)}
                className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold cursor-pointer transition ${
                  selectedPaid === true
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                }`}
              >
                Paid Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities List / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              Verified Opportunities ({filteredList.length})
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Direct applications through official portals with zero commission or fees
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            100% Zero-Fee Verified Sources
          </span>
        </div>

        {filteredList.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] text-center space-y-2">
            <p className="font-serif text-lg font-bold text-[#0d3e2e]">No opportunities match your filter.</p>
            <p className="text-xs sm:text-sm text-[#7a6a5a]">
              Try searching with broader terms or resetting your cohort filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredList.map((item) => (
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
        )}
      </div>
    </div>
  );
}
