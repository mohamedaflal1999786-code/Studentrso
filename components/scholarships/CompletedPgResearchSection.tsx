'use client';

import { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  IndianRupee,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ComprehensiveScholarship } from '@/lib/scholarships-data';

interface CompletedPgResearchSectionProps {
  programs: ComprehensiveScholarship[];
  onViewDetails: (prog: ComprehensiveScholarship) => void;
  onTrackApplication: (prog: ComprehensiveScholarship) => void;
}

export function CompletedPgResearchSection({
  programs,
  onViewDetails,
  onTrackApplication,
}: CompletedPgResearchSectionProps) {
  const [filterExam, setFilterExam] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Filter research and graduate completion schemes
  const researchPrograms = programs.filter((p) => {
    return (
      p.educationStages.includes('Completed PG') ||
      p.educationStages.includes('PhD') ||
      p.educationStages.includes('Junior Research Fellowship') ||
      p.educationStages.includes('Senior Research Fellowship') ||
      p.educationStages.includes('Postdoctoral research') ||
      p.educationStages.includes('Completed UG')
    );
  });

  const filtered = researchPrograms.filter((p) => {
    if (filterType !== 'All' && p.schemeType !== filterType) return false;
    if (filterExam !== 'All') {
      const exams = p.eligibility.requiresEntranceExam || [];
      if (!exams.includes(filterExam as any)) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      const text = `${p.name} ${p.tamilName || ''} ${p.provider} ${p.summary} ${p.tags.join(' ')}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-purple-900 mb-2">
          <GraduationCap size={16} /> ADVANCED HIGHER EDUCATION & RESEARCH
        </div>
        <h2 className="font-serif text-[24px] sm:text-[28px] font-bold text-purple-950">
          Postgraduate Completion & Doctoral Research Funding
        </h2>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-purple-900/90 max-w-3xl">
          Tailored opportunities for students who completed postgraduate or undergraduate degrees, doctoral research scholars (PhD), Junior/Senior Research Fellows (JRF/SRF), and postdoctoral fellows across Tamil Nadu and India.
        </p>

        {/* Exam Quick Filters */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold uppercase text-purple-900 mr-1">
            Qualifying Exam:
          </span>
          {['All', 'UGC-NET', 'CSIR-NET', 'GATE', 'ICAR-AICE'].map((ex) => (
            <button
              key={ex}
              onClick={() => setFilterExam(ex)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition ${
                filterExam === ex
                  ? 'bg-purple-900 text-white'
                  : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#efe3cc] bg-[#fdfbf6] p-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a6a5a]" />
          <input
            type="text"
            placeholder="Search research fellowship, discipline (e.g. Visvesvaraya, PMRF, JRF, MeitY, ICAR)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#d8c7ad] bg-white py-2 pl-9 pr-3 text-[13px] outline-none focus:border-[#0d3e2e]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-[#d8c7ad] bg-white px-3 py-2 text-[12px] text-[#2b2118]"
          >
            <option value="All">All Funding Types</option>
            <option value="Fellowship">Research Fellowship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Incentive">Research Incentive</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[13px] text-[#7a6a5a]">
        <span>
          Showing <strong className="text-[#2b2118]">{filtered.length}</strong> advanced research and completed-PG funding schemes
        </span>
        <span className="font-mono text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
          <ShieldCheck size={13} /> Official Fellowship Portals
        </span>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const curVer = item.versions.find((v) => v.isCurrentVersion) || item.versions[0];
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-purple-200/80 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-purple-100 text-purple-900 border border-purple-200 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {item.schemeType}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck size={12} /> {curVer.sourceVerificationDate}
                  </span>
                </div>

                <h3 className="mt-2.5 font-serif text-[17px] font-bold text-[#2b2118] leading-snug">
                  {item.name}
                </h3>
                <p className="mt-1 font-sans text-[12px] text-[#7a6a5a]">{item.provider}</p>

                <p className="mt-3 font-sans text-[13px] leading-[22px] text-[#554a3f] line-clamp-3">
                  {item.summary}
                </p>

                {/* Benefits Pill */}
                <div className="mt-3 rounded-lg border border-purple-100 bg-purple-50/70 p-2.5 text-[12px] text-purple-950 font-semibold flex items-center gap-1.5">
                  <IndianRupee size={14} className="text-purple-800 shrink-0" />
                  <span>{curVer.publishedAmountDetails || curVer.confirmedBenefits}</span>
                </div>

                {/* Target Stages */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.educationStages.map((st) => (
                    <span
                      key={st}
                      className="rounded bg-[#fbf5e9] border border-[#efe3cc] px-2 py-0.5 font-mono text-[10px] text-[#7a6a5a]"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
                <button
                  onClick={() => onViewDetails(item)}
                  className="font-sans text-[12px] font-bold text-[#0d3e2e] hover:underline"
                >
                  Full Guidelines →
                </button>
                <a
                  href={item.officialApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#0d3e2e] px-3 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c]"
                >
                  <span>Apply on Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
