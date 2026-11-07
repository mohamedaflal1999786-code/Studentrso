'use client';

import { useState, useMemo } from 'react';
import {
  ExternalLink,
  Globe,
  PhoneCall,
  Search,
  ShieldCheck,
  Building,
  Landmark,
} from 'lucide-react';
import {
  OFFICIAL_AUTHORITIES,
  GovernmentClassification,
  OfficialReportingAuthority,
} from '@/lib/safety-data';

const CLASSIFICATION_GROUPS: GovernmentClassification[] = [
  'A. Tamil Nadu Government',
  'B. Central Government',
  'C. Statutory Commissions',
  'D. Higher Education Authorities',
  'E. Police and Emergency Services',
  'F. Child Protection Services',
  'G. Cybercrime Reporting',
];

export function OfficialPortalsDirectory() {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthorities = useMemo(() => {
    return OFFICIAL_AUTHORITIES.filter((auth) => {
      if (selectedGroup !== 'All' && auth.classification !== selectedGroup) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const text = `${auth.name} ${auth.classification} ${auth.purpose} ${auth.applicableComplaints.join(' ')} ${auth.domain}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
              <Landmark size={14} /> DIRECT GOVERNMENT COMPLAINT CHANNELS
            </div>
            <h3 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
              Official Government Reporting Portals Directory
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Direct access to genuine state, central, statutory commission, and emergency complaint mechanisms without commercial proxy intermediaries.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#5e8b7e] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            All Sources Strictly Government &amp; Statutory
          </span>
        </div>

        {/* Search & Group Filters */}
        <div className="space-y-3 pt-2 border-t border-[#efe3cc]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
            <input
              type="text"
              placeholder="Search by authority name, complaint type, or government domain (e.g., UGC, NCSC, CM Helpline, Cyber Crime)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white py-2 pl-10 pr-4 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedGroup('All')}
              className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold whitespace-nowrap transition ${
                selectedGroup === 'All'
                  ? 'bg-[#8c2f39] text-white shadow-2xs'
                  : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
              }`}
            >
              All Groups ({OFFICIAL_AUTHORITIES.length})
            </button>
            {CLASSIFICATION_GROUPS.map((grp) => {
              const count = OFFICIAL_AUTHORITIES.filter((a) => a.classification === grp).length;
              return (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`rounded-lg px-3 py-1.5 font-sans text-[12px] font-semibold whitespace-nowrap transition ${
                    selectedGroup === grp
                      ? 'bg-[#8c2f39] text-white shadow-2xs'
                      : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                  }`}
                >
                  {grp} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Authority Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredAuthorities.map((auth) => (
          <div
            key={auth.id}
            className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Classification Tag & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#f6ede0] px-2.5 py-0.5 rounded-full border border-[#d8c7ad]">
                  {auth.classification}
                </span>
                <span className="font-mono text-[10px] text-[#5e8b7e] font-semibold flex items-center gap-1 bg-[#fbf5e9] px-2 py-0.5 rounded-full border border-[#efe3cc]">
                  <ShieldCheck size={12} /> {auth.verificationStatus}
                </span>
              </div>

              {/* Title & Domain */}
              <div>
                <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#2b2118] leading-snug">
                  {auth.name}
                </h4>
                <span className="text-[12px] text-emerald-800 font-medium mt-0.5 block">
                  {auth.classification}
                </span>
              </div>

              {/* Purpose */}
              <p className="font-sans text-[13px] text-[#7a6a5a] leading-relaxed">
                {auth.purpose}
              </p>

              {/* Applicable Complaints */}
              <div className="space-y-1 pt-1">
                <span className="font-mono text-[10px] font-bold uppercase text-[#2b2118] block">
                  Applicable Complaints:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {auth.applicableComplaints.map((comp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex rounded-md bg-white border border-[#efe3cc] px-2.5 py-0.5 font-sans text-[11px] text-[#554a3f]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source Limitations */}
              {auth.sourceLimitations && (
                <div className="rounded-lg bg-[#fbf5e9] border border-[#efe3cc] p-2.5 text-[11px] font-sans text-[#7a6a5a]">
                  <strong className="text-[#2b2118] font-semibold">Jurisdiction Note: </strong>
                  {auth.sourceLimitations}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#efe3cc] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <a
                  href={auth.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[12px] font-semibold text-[#7a6a5a] hover:text-[#8c2f39] inline-flex items-center gap-1"
                >
                  <Globe size={13} />
                  <span>Official Website</span>
                  <ExternalLink size={11} />
                </a>

                {auth.helpline && (
                  <a
                    href={auth.telUrl || `tel:${auth.helpline}`}
                    className="font-mono text-[11px] font-bold text-[#8c2f39] hover:underline inline-flex items-center gap-1"
                  >
                    <PhoneCall size={12} />
                    <span>Helpline: {auth.helpline}</span>
                  </a>
                )}
              </div>

              <a
                href={auth.complaintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white py-2.5 font-sans text-[13px] font-bold shadow-2xs transition"
              >
                <span>Access Official Complaint Page</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
