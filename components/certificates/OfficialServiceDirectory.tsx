'use client';

import React, { useState } from 'react';
import {
  Globe,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { OFFICIAL_SERVICE_DIRECTORY } from '@/lib/certificates-data';

export function OfficialServiceDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filtered = OFFICIAL_SERVICE_DIRECTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedTier !== 'all' && item.category !== selectedTier) return false;
    return true;
  });

  const tiers = [
    { id: 'all', label: 'All 8 Tiers' },
    { id: 'A. Tamil Nadu Government', label: 'Tier A: TN Govt' },
    { id: 'B. Central Government', label: 'Tier B: Central Govt' },
    { id: 'C. Identity Documents', label: 'Tier C: National Identity' },
    { id: 'D. School Education', label: 'Tier D: School Education' },
    { id: 'E. Technical Education', label: 'Tier E: Technical Education' },
    { id: 'F. Universities', label: 'Tier F: Universities' },
    { id: 'G. Disability and Accessibility Services', label: 'Tier G: Accessibility' },
    { id: 'H. Digital Documents', label: 'Tier H: Digital Documents' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 border border-[#8c2f39]/20 mb-1.5">
          <Globe size={12} /> DIRECT STATUTORY AUTHORITIES DIRECTORY
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Official Government Service Directory
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Verified external government web portals categorized across 8 official tiers (A through H). All links navigate directly to official government domains.
        </p>
      </div>

      {/* Search & Tier Filters */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs space-y-3">
        <div className="relative max-w-lg">
          <Search size={14} className="text-[#7a6a5a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search portal name, authority, or purpose..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#efe3cc] rounded-xl font-sans text-[12px] text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-1 focus:ring-[#8c2f39] focus:border-[#8c2f39]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`px-3 py-1.5 rounded-lg font-sans text-[12px] font-semibold transition ${
                selectedTier === t.id
                  ? 'bg-[#8c2f39] text-white shadow-xs'
                  : 'bg-white border border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#efe3cc] bg-white p-5 shadow-2xs hover:border-[#8c2f39]/30 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20">
                  {item.category}
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={11} /> {item.authorityBadge}
                </span>
              </div>

              <h3 className="font-serif text-[17px] font-bold text-[#2b2118]">{item.name}</h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">Department: {item.department}</p>

              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[12px] font-sans text-[#5c4a3a] space-y-1">
                <div>
                  <strong>Key Purpose:</strong> {item.purpose}
                </div>
                <div className="text-[11px] pt-1">
                  <strong>Service Mode:</strong> <span className="text-[#8c2f39] font-medium">Direct Citizen Portal</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#efe3cc] flex items-center justify-between gap-3">
              {item.verificationUrl ? (
                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[12px] font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <ShieldCheck size={13} /> Verification Portal <ExternalLink size={11} />
                </a>
              ) : (
                <div />
              )}

              <a
                href={item.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold flex items-center gap-1.5 transition shadow-2xs"
              >
                Open Official Portal <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
