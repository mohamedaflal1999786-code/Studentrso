// components/admissions/GovernmentPortalsSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Building,
  ExternalLink,
  ShieldCheck,
  Phone,
  Mail,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { OFFICIAL_PORTALS_DIRECTORY, OfficialPortalRecord } from '@/lib/admissions-data';

export function GovernmentPortalsSection() {
  const [tierFilter, setTierFilter] = useState<'All' | 'Tamil Nadu State' | 'Central / National'>('All');
  const [search, setSearch] = useState('');

  let portals = OFFICIAL_PORTALS_DIRECTORY;

  if (tierFilter !== 'All') {
    portals = portals.filter((p) => p.tier === tierFilter);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    portals = portals.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.governingBody.toLowerCase().includes(q) ||
        p.scope.toLowerCase().includes(q) ||
        p.verifiedDomain.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Anti-Agent Caution Notice */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
            Official Statutory Admission Portals Directory
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6a5a]">
            Verified official government single-window portals with authentic .gov.in, .nic.in, and .ac.in domains.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#efe3cc] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#5e8b7e] shrink-0 mt-0.5" />
          <div className="text-xs text-[#7a6a5a] space-y-1">
            <strong className="text-[#2b2118] font-semibold block">Official Source Verification Notice:</strong>
            <p>
              Always verify you are applying on the authentic government portal. Legitimate Tamil Nadu single-window
              counselling systems (TNEA, TNGASA, DME) never operate through private blogs, social media agents, or WhatsApp
              brokers, and never request capitation fees.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            {(['All', 'Tamil Nadu State', 'Central / National'] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setTierFilter(tier)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  tierFilter === tier
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : 'bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search portal name or domain..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#efe3cc] text-xs text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/20"
            />
          </div>
        </div>
      </div>

      {/* Portals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portals.map((portal) => (
          <div
            key={portal.id}
            className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#8c2f39]">
                  {portal.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {portal.tier}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#2b2118] leading-snug">{portal.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#7a6a5a] mt-1">
                  <Building className="w-3.5 h-3.5 text-[#8c2f39] shrink-0" />
                  <span>{portal.governingBody}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5 text-xs">
                <div>
                  <span className="font-bold text-[#2b2118]">Scope: </span>
                  <span className="text-[#7a6a5a]">{portal.scope}</span>
                </div>
                <div>
                  <span className="font-bold text-[#2b2118]">Annual Cycle: </span>
                  <span className="text-[#8c2f39] font-medium">{portal.typicalCycle}</span>
                </div>
                <div>
                  <span className="font-bold text-[#2b2118]">Statutory Status: </span>
                  <span className="text-emerald-800 font-semibold">Official Single Window</span>
                </div>
              </div>

              {/* Covered Courses Badges */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                  Covered Programs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {portal.coverageCourses.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-white border border-[#efe3cc] text-[11px] font-medium text-[#2b2118]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Helpline Information */}
              <div className="pt-2 border-t border-[#efe3cc] flex flex-wrap items-center gap-3 text-xs text-[#7a6a5a]">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#8c2f39]" />
                  <span>{portal.helplinePhone}</span>
                </div>
                <div className="flex items-center gap-1 truncate max-w-[200px]">
                  <Mail className="w-3 h-3 text-[#8c2f39]" />
                  <span className="truncate">{portal.helplineEmail}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#efe3cc] flex items-center gap-2">
              <a
                href={portal.guidelinesPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] hover:bg-[#f6ede0] text-[#8c2f39] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Guidelines PDF</span>
              </a>
              <a
                href={portal.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer text-center"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
