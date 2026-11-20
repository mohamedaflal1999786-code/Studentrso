// components/admissions/AdmissionsOverviewDashboard.tsx
'use client';

import React from 'react';
import {
  Compass,
  GraduationCap,
  Layers,
  Award,
  Brain,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import {
  EducationStage,
  AdmissionPathway,
  ADMISSION_PATHWAYS,
  OFFICIAL_PORTALS_DIRECTORY
} from '@/lib/admissions-data';

interface AdmissionsOverviewDashboardProps {
  selectedStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectPathway: (p: AdmissionPathway) => void;
  onNavigateTab: (tab: string) => void;
}

const STAGES: { id: EducationStage; label: string; icon: any; count: number }[] = [
  { id: 'All Stages', label: 'All Stages', icon: Compass, count: ADMISSION_PATHWAYS.length },
  { id: 'Class 10', label: 'After Class 10', icon: GraduationCap, count: 3 },
  { id: 'Class 12', label: 'After Class 12', icon: Layers, count: 7 },
  { id: 'Diploma / Polytechnic', label: 'Diploma & Lateral Entry', icon: Award, count: 1 },
  { id: 'Undergraduate', label: 'Undergraduate (UG to PG)', icon: Brain, count: 1 },
  { id: 'Postgraduate', label: 'Postgraduate (PG to PhD)', icon: FileText, count: 1 },
];

export function AdmissionsOverviewDashboard({
  selectedStage,
  onSelectStage,
  searchQuery,
  onSearchChange,
  onSelectPathway,
  onNavigateTab,
}: AdmissionsOverviewDashboardProps) {
  // Key featured portals
  const featuredPathways = ADMISSION_PATHWAYS.slice(0, 4);

  return (
    <div className="space-y-6 font-sans">
      {/* Hero Banner with Stat Badges */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#fdfbf6] via-[#fbf5e9] to-[#efe3cc]/50 border border-[#efe3cc] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[11px] text-[#0d3e2e] font-bold">
            MODULE 06 • FULLY FUNCTIONAL
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-800 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            100% Genuine Statutory Data
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#efe3cc] font-mono text-[11px] text-[#7a6a5a] font-semibold">
            Tamil Nadu Priority &amp; National Framework
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2b2118] leading-tight">
            Student Admission &amp; Education Continuity Centre
          </h1>
          <p className="text-xs sm:text-base text-[#7a6a5a] leading-relaxed">
            Centralized statutory guidance across your complete education journey: Class 10 → Class 12 → Diploma →
            Undergraduate → Postgraduate → PhD &amp; Research. Understand official portals, counselling rules, inter-college
            transfers, study break re-entry, and academic credit mobility.
          </p>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block">
              ADMISSION PATHWAYS
            </span>
            <span className="font-serif text-2xl font-bold text-[#2b2118]">{ADMISSION_PATHWAYS.length}+</span>
            <span className="text-[11px] text-[#7a6a5a] block">Class 10 to PhD covered</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block">
              OFFICIAL PORTALS
            </span>
            <span className="font-serif text-2xl font-bold text-[#0d3e2e]">
              {OFFICIAL_PORTALS_DIRECTORY.length} Portals
            </span>
            <span className="text-[11px] text-[#7a6a5a] block">Verified .gov.in &amp; .ac.in</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block">
              TRANSFER &amp; RE-ENTRY
            </span>
            <span className="font-serif text-2xl font-bold text-[#2b2118]">Statutory Rules</span>
            <span className="text-[11px] text-[#7a6a5a] block">Anna Univ, DCE &amp; DOTE</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#efe3cc] space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block">
              ACADEMIC MOBILITY
            </span>
            <span className="font-serif text-2xl font-bold text-emerald-800">ABC / APAAR</span>
            <span className="text-[11px] text-[#7a6a5a] block">Credit transfer guidelines</span>
          </div>
        </div>
      </div>

      {/* Emergency Continuity Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#fdfbf6] border-2 border-dashed border-[#d8c7ad] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d3e2e] text-white flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-[#e0a526]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#2b2118]">
              Facing fee difficulties, study interruptions, or thinking of dropping out?
            </h3>
            <p className="text-xs text-[#7a6a5a]">
              Do not abandon education prematurely. Explore statutory fee concessions, break-of-study condonation,
              and recognized re-entry pathways.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('break-study-reentry')}
          className="px-4 py-2 rounded-xl bg-[#0d3e2e] text-white hover:bg-[#08261c] transition text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer"
        >
          View Continuity &amp; Re-entry Options &rarr;
        </button>
      </div>

      {/* Interactive Search & Stage Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by course, college type, authority (e.g. TNEA, TNGASA, Lateral Entry, MBBS, Transfer, PhD)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#efe3cc] text-xs sm:text-sm text-[#2b2118] placeholder-[#7a6a5a]/70 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('admission-guidance')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#efe3cc] text-xs font-bold text-[#0d3e2e] hover:bg-[#fbf5e9] transition flex items-center justify-center gap-1.5"
          >
            <span>Explore All Pathways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STAGES.map((stg) => {
            const Icon = stg.icon;
            const isSelected = selectedStage === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => onSelectStage(stg.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9] hover:text-[#0d3e2e]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{stg.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#fbf5e9] text-[#7a6a5a]'
                  }`}
                >
                  {stg.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Single-Window Admission Services */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118]">
              Primary Tamil Nadu Single-Window Admissions
            </h2>
            <p className="text-xs text-[#7a6a5a]">
              Official government admission portals for engineering, arts &amp; science, medical, and lateral entry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('govt-portals')}
            className="text-xs font-bold text-[#0d3e2e] hover:underline flex items-center gap-1"
          >
            <span>View All Portals</span> &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredPathways.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-white border border-[#efe3cc] shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[10px] font-bold text-[#7a6a5a]">
                    {p.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] font-bold text-emerald-800">
                    {p.selectionMode}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] group-hover:text-[#0d3e2e] transition leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[#7a6a5a] line-clamp-2 leading-relaxed">{p.description}</p>

                <div className="flex items-center gap-2 text-xs font-medium text-[#7a6a5a] pt-1">
                  <Building className="w-3.5 h-3.5 text-[#0d3e2e] shrink-0" />
                  <span className="truncate">{p.authority}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#efe3cc] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPathway(p)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>View Full Procedure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={p.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] hover:bg-[#f6ede0] text-[#0d3e2e] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
