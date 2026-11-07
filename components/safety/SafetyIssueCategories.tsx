'use client';

import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Filter,
  PhoneCall,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { SAFETY_CATEGORIES, SafetyCategory } from '@/lib/safety-data';

interface SafetyIssueCategoriesProps {
  onSelectCategory: (cat: SafetyCategory) => void;
}

export function SafetyIssueCategories({ onSelectCategory }: SafetyIssueCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredCategories = useMemo(() => {
    return SAFETY_CATEGORIES.filter((cat) => {
      if (selectedFilter !== 'All') {
        if (selectedFilter === 'Statutory' && !cat.badge.includes('STATUTORY')) return false;
        if (selectedFilter === 'Campus' && (cat.code === 'cyberbullying' || cat.code === 'child-protection')) return false;
        if (selectedFilter === 'Online' && cat.code !== 'cyberbullying') return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const text = `${cat.title} ${cat.subtitle} ${cat.shortDescription} ${cat.scopeItems.join(' ')} ${cat.primaryAuthorities.join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              Student Issue &amp; Protection Categories Directory
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Showing {filteredCategories.length} verified statutory categories covering school, college, university, and digital conduct.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#8c2f39] bg-[#f6ede0] border border-[#d8c7ad] px-3 py-1 rounded-full">
            10 Official Categories Verified
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
            <input
              type="text"
              placeholder="Search by concern, e.g., ragging, sexual harassment, caste bias, certificate withholding, fake profile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2.5 pl-10 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Statutory', 'Campus', 'Online'].map((flt) => (
              <button
                key={flt}
                onClick={() => setSelectedFilter(flt)}
                className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold transition ${
                  selectedFilter === flt
                    ? 'bg-[#8c2f39] text-white shadow-2xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                }`}
              >
                {flt === 'All' ? 'All Issues' : flt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 10 Category Cards */}
      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center space-y-2">
          <ShieldAlert size={36} className="mx-auto text-[#a08f7e]" />
          <h4 className="font-serif text-[18px] font-bold text-[#2b2118]">
            No matching issue categories found
          </h4>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Try adjusting your search terms or clearing the active filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat.code}
              className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] bg-[#f6ede0] border border-[#d8c7ad] px-2.5 py-0.5 rounded-full">
                      CATEGORY {cat.number}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39]">
                      {cat.badge}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#5e8b7e] font-semibold flex items-center gap-1">
                    <ShieldCheck size={13} /> Verified
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h4 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#2b2118] group-hover:text-[#8c2f39] transition-colors">
                    {cat.title}
                  </h4>
                  <p className="font-serif text-[14px] italic text-[#8c2f39] mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Short Description */}
                <p className="font-sans text-[13px] text-[#7a6a5a] leading-relaxed">
                  {cat.shortDescription}
                </p>

                {/* Covered Situations Preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                    Situations Covered:
                  </span>
                  <div className="space-y-1">
                    {cat.scopeItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[12px] text-[#554a3f]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8c2f39] mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Authority & Helpline */}
                <div className="rounded-xl bg-[#fbf5e9] border border-[#efe3cc] p-3 space-y-1.5 text-[12px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a]">
                      Primary Reporting Authority:
                    </span>
                    <span className="font-sans font-bold text-[#2b2118] truncate max-w-[200px]">
                      {cat.primaryAuthorities[0]}
                    </span>
                  </div>
                  {cat.helplines.length > 0 && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#efe3cc]">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#8c2f39]">
                        Helpline:
                      </span>
                      <a
                        href={cat.helplines[0].telUrl}
                        className="font-mono font-bold text-[#8c2f39] hover:underline inline-flex items-center gap-1"
                      >
                        <PhoneCall size={11} />
                        <span>{cat.helplines[0].number}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-4 mt-4 border-t border-[#efe3cc]">
                <button
                  onClick={() => onSelectCategory(cat)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white py-2.5 font-sans text-[13px] font-bold shadow-2xs transition cursor-pointer"
                >
                  <span>View Reporting Guidelines &amp; Authorities</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
