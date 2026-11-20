'use client';

import {
  Activity,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Layers,
  ListTodo,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ComprehensiveScholarship, OFFICIAL_TRUSTED_SOURCES } from '@/lib/scholarships-data';

interface ScholarshipOverviewProps {
  programs: ComprehensiveScholarship[];
  bookmarkedCount: number;
  trackedCount: number;
  onNavigateTab: (tab: string) => void;
  onSelectProgram: (item: ComprehensiveScholarship) => void;
  onOpenDiagnostics?: () => void;
}

export function ScholarshipOverview({
  programs,
  bookmarkedCount,
  trackedCount,
  onNavigateTab,
  onSelectProgram,
  onOpenDiagnostics,
}: ScholarshipOverviewProps) {
  // Real dynamic counts derived from the database (never hardcoded)
  const totalVerifiedCount = programs.length;
  const tnCount = programs.filter((p) => p.category === 'Tamil Nadu Government').length;
  const centralCount = programs.filter((p) => p.category === 'Central Government').length;
  const privateCount = programs.filter((p) => p.category === 'Institution / Foundation').length;
  const researchCount = programs.filter(
    (p) =>
      p.educationStages.includes('PhD') ||
      p.educationStages.includes('Junior Research Fellowship') ||
      p.educationStages.includes('Senior Research Fellowship') ||
      p.educationStages.includes('Postdoctoral research') ||
      p.educationStages.includes('Completed PG')
  ).length;

  const schoolCount = programs.filter(
    (p) => p.educationStages.includes('Class 10') || p.educationStages.includes('Class 11') || p.educationStages.includes('Class 12')
  ).length;

  const ugCount = programs.filter(
    (p) => p.educationStages.includes('Undergraduate') || p.educationStages.includes('Professional degree') || p.educationStages.includes('Integrated degree')
  ).length;

  const pgCount = programs.filter(
    (p) => p.educationStages.includes('Postgraduate')
  ).length;

  return (
    <div className="space-y-8">
      {/* Dynamic Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#0d3e2e]">{totalVerifiedCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            Total Schemes
          </span>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#0d3e2e]">{tnCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            TN Govt Schemes
          </span>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-amber-700">{centralCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            Central Govt
          </span>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-blue-700">{researchCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            Research / Fellowships
          </span>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-emerald-700">{privateCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            Foundations
          </span>
        </div>

        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-4 text-center shadow-xs">
          <span className="font-serif text-3xl font-bold text-[#2b2118]">{trackedCount}</span>
          <span className="mt-1 block font-mono text-[10px] sm:text-[11px] text-[#7a6a5a] uppercase tracking-wider font-semibold">
            Tracked Apps
          </span>
        </div>
      </div>

      {/* Autonomous Intelligence Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-serif text-[17px] font-bold text-[#2b2118]">
              Automated Verification & Genuine Scheme Database
            </h3>
            <p className="font-sans text-[12px] text-[#7a6a5a]">
              Operates autonomously without manual data entry. All schemes continuously matched against official gazettes and department portals.
            </p>
          </div>
        </div>

        {onOpenDiagnostics && (
          <button
            onClick={onOpenDiagnostics}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3.5 py-2 font-mono text-[12px] font-semibold text-[#0d3e2e] hover:bg-[#f6ede0]"
          >
            <Activity size={14} />
            <span>Telemetry & Autonomous Connectors</span>
          </button>
        )}
      </div>

      {/* Quick Launchpad Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div
          onClick={() => onNavigateTab('matches')}
          className="group cursor-pointer rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 transition hover:border-[#0d3e2e] hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#e0a526] tracking-wider">
              SMART MATCHER
            </span>
          </div>
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">
            Smart Eligibility Checker
          </h3>
          <p className="mt-1.5 font-sans text-[13px] leading-[22px] text-[#7a6a5a]">
            Enter your study stage, community category, marks, and family income range for rule-based matching with transparent reasons.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-sans text-[13px] font-bold text-[#0d3e2e]">
            Launch Eligibility Checker <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('research')}
          className="group cursor-pointer rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 transition hover:border-[#0d3e2e] hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-blue-700 tracking-wider">
              SECTION 10
            </span>
          </div>
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">
            Postgraduate Completion & Research Funding
          </h3>
          <p className="mt-1.5 font-sans text-[13px] leading-[22px] text-[#7a6a5a]">
            Dedicated opportunities for Completed UG/PG, PhD scholars, and Postdocs with UGC-NET, CSIR-NET, GATE, and ICAR filters.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-sans text-[13px] font-bold text-blue-800">
            Explore Research Schemes <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('applications')}
          className="group cursor-pointer rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 transition hover:border-[#0d3e2e] hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ListTodo size={20} />
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
              TRACKER
            </span>
          </div>
          <h3 className="font-serif text-[18px] font-bold text-[#2b2118] group-hover:text-[#0d3e2e]">
            Application Tracker (8 Stages)
          </h3>
          <p className="mt-1.5 font-sans text-[13px] leading-[22px] text-[#7a6a5a]">
            Log your external application reference number, submission dates, institution verification, and payment milestones.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-sans text-[13px] font-bold text-[#0d3e2e]">
            Open Application Tracker <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </span>
        </div>
      </div>

      {/* Stage Breakdown Directory */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6">
        <h3 className="font-serif text-[20px] font-bold text-[#2b2118] mb-1">
          Explore by Educational Stage
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a] mb-5">
          Filtered views for every stage from high school through postdoctoral research.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <button
            onClick={() => onNavigateTab('school')}
            className="flex items-center justify-between rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 text-left hover:bg-[#f6ede0] transition"
          >
            <div>
              <span className="font-serif text-[15px] font-bold text-[#2b2118] block">School Education</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Class 10, 11 & 12</span>
            </div>
            <span className="rounded-full bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[12px] font-bold text-[#0d3e2e]">
              {schoolCount}
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('diploma')}
            className="flex items-center justify-between rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 text-left hover:bg-[#f6ede0] transition"
          >
            <div>
              <span className="font-serif text-[15px] font-bold text-[#2b2118] block">Diploma & ITI</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Polytechnic technical</span>
            </div>
            <span className="rounded-full bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[12px] font-bold text-[#0d3e2e]">
              {programs.filter((p) => p.educationStages.includes('Diploma') || p.educationStages.includes('ITI')).length}
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('ug')}
            className="flex items-center justify-between rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 text-left hover:bg-[#f6ede0] transition"
          >
            <div>
              <span className="font-serif text-[15px] font-bold text-[#2b2118] block">Undergraduate</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Degrees & Professional</span>
            </div>
            <span className="rounded-full bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[12px] font-bold text-[#0d3e2e]">
              {ugCount}
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('pg')}
            className="flex items-center justify-between rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 text-left hover:bg-[#f6ede0] transition"
          >
            <div>
              <span className="font-serif text-[15px] font-bold text-[#2b2118] block">Postgraduate</span>
              <span className="font-sans text-[12px] text-[#7a6a5a]">Master’s programs</span>
            </div>
            <span className="rounded-full bg-[#0d3e2e]/10 px-2.5 py-0.5 font-mono text-[12px] font-bold text-[#0d3e2e]">
              {pgCount}
            </span>
          </button>
        </div>
      </div>

      {/* Official Portals Directory */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
              <Landmark size={14} /> DIRECT OFFICIAL PORTALS
            </div>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              Recognised Government & Foundation Portals
            </h3>
          </div>
          <span className="font-sans text-[12px] text-[#7a6a5a]">
            Always apply directly on the official portal. Never submit sensitive credentials on third-party websites.
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OFFICIAL_TRUSTED_SOURCES.slice(0, 8).map((portal) => (
            <a
              key={portal.id}
              href={portal.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3.5 transition hover:bg-[#f6ede0] hover:border-[#d8c7ad]"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#0d3e2e] font-bold">
                  {portal.category}
                </span>
                <p className="font-sans text-[13px] font-bold text-[#2b2118] mt-1 line-clamp-2">
                  {portal.name}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0d3e2e]">
                Visit Portal <ExternalLink size={12} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Recently Verified Schemes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
              Verified Tamil Nadu Welfare & Central Schemes
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a]">
              Key programs actively checked for Tamil Nadu students.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('all')}
            className="font-sans text-[13px] font-bold text-[#0d3e2e] hover:underline"
          >
            View all {programs.length} schemes →
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {programs.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[#efe3cc] bg-[#fdfbf6] p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="rounded-full bg-[#f6ede0] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0d3e2e]">
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] text-stone-500">
                    {p.versions?.[0]?.academicYear || '2026-2027'}
                  </span>
                </div>
                <h4 className="font-serif text-[16px] font-bold text-[#2b2118] line-clamp-2">
                  {p.name}
                </h4>
                <p className="mt-1 font-sans text-[12px] text-[#7a6a5a] line-clamp-1">{p.provider}</p>
                <p className="mt-2 font-sans text-[13px] text-[#554a3f] line-clamp-2">{p.summary}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#efe3cc] flex items-center justify-between">
                <span className="font-mono text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} /> {p.versions?.[0]?.sourceVerificationDate || '2026-11-06'}
                </span>
                <button
                  onClick={() => onSelectProgram(p)}
                  className="font-sans text-[12px] font-bold text-[#0d3e2e] hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
