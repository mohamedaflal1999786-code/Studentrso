// components/academic-support/AcademicDifficultiesSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Target,
  Compass,
  GraduationCap,
  Layers,
  Award,
  Brain,
  FileText,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ACADEMIC_DIFFICULTIES, EducationStage, AcademicDifficultyItem } from '@/lib/academic-data';

const STAGE_FILTERS: { id: EducationStage; label: string; icon: any }[] = [
  { id: 'All Stages', label: 'All Levels', icon: Compass },
  { id: 'Class 10 (SSLC)', label: 'Class 10 (SSLC)', icon: GraduationCap },
  { id: 'Class 11 & 12 (HSC)', label: 'Class 11 & 12 (HSC)', icon: BookOpen },
  { id: 'Diploma & Polytechnic', label: 'Diploma & Polytechnic', icon: Layers },
  { id: 'Undergraduate (UG)', label: 'Undergraduate (UG)', icon: Award },
  { id: 'Postgraduate (PG)', label: 'Postgraduate (PG)', icon: Brain },
  { id: 'PhD & Research', label: 'PhD & Research', icon: FileText },
];

export function AcademicDifficultiesSection() {
  const [selectedStage, setSelectedStage] = useState<EducationStage>('All Stages');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(ACADEMIC_DIFFICULTIES[0]?.id || null);

  const filteredDifficulties = ACADEMIC_DIFFICULTIES.filter((item) => {
    const matchesStage = selectedStage === 'All Stages' || item.stage === selectedStage;
    const matchesQuery =
      !searchQuery ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.practicalSolutions.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold uppercase mb-1">
              MODULE 07.01 • PROBLEM SOLVER
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
              Academic Difficulties &amp; Step-by-Step Student Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
              Real academic challenges faced by school, polytechnic, college, and postgraduate students with actionable, non-generic step-by-step solutions and verified learning materials.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem (e.g. Maths, Backlogs, Physics)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9]/50 text-xs text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20 focus:border-[#0d3e2e]"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#efe3cc]/60 pt-3">
          {STAGE_FILTERS.map((stg) => {
            const Icon = stg.icon;
            const isSelected = selectedStage === stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setSelectedStage(stg.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#efe3cc]/50 hover:text-[#2b2118]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0d3e2e]'}`} />
                <span>{stg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulties Accordion List */}
      <div className="space-y-4">
        {filteredDifficulties.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#efe3cc] text-xs text-[#7a6a5a] space-y-2">
            <AlertTriangle className="w-8 h-8 text-[#0d3e2e] mx-auto opacity-70" />
            <p className="font-serif text-sm font-bold text-[#2b2118]">No Academic Difficulties Found</p>
            <p>Try clearing your search query or selecting a different education level.</p>
          </div>
        ) : (
          filteredDifficulties.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs overflow-hidden transition"
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#fbf5e9]/40 transition"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold">
                        {item.stage}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#2b2118]">
                      {item.topic}
                    </h3>
                    <p className="text-xs text-[#7a6a5a] line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-[#0d3e2e] transition shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Detailed Guidance */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-[#efe3cc] bg-[#fdfbf6]/40 space-y-6 text-xs sm:text-sm text-[#2b2118]">
                    {/* Problem Description & Causes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
                        <span className="font-bold text-[#0d3e2e] uppercase text-xs flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-[#0d3e2e]" /> Problem Breakdown
                        </span>
                        <p className="text-xs leading-relaxed text-[#2b2118]">
                          {item.description}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-2">
                        <span className="font-bold text-[#0d3e2e] uppercase text-xs flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" /> Common Root Causes
                        </span>
                        <ul className="space-y-1">
                          {item.commonCauses.map((cause, cIdx) => (
                            <li key={cIdx} className="text-xs leading-relaxed text-[#7a6a5a] flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Practical Solutions */}
                    <div className="p-4 rounded-xl bg-white border border-[#efe3cc] space-y-3">
                      <span className="font-bold text-[#0d3e2e] uppercase text-xs flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-emerald-600" /> Practical, Actionable Solutions
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.practicalSolutions.map((sol, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] space-y-1">
                            <span className="font-bold text-xs text-[#0d3e2e] block">Solution #{sIdx + 1}</span>
                            <p className="text-xs text-[#2b2118] leading-relaxed">{sol}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Learning Guidance */}
                    <div className="space-y-2">
                      <span className="font-bold text-[#0d3e2e] uppercase text-xs tracking-wider block">
                        Step-by-Step Learning &amp; Recovery Protocol
                      </span>
                      <div className="space-y-2">
                        {item.stepByStepGuidance.map((step, stIdx) => (
                          <div key={stIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#efe3cc]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-[#2b2118] leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Official Free Learning Resources */}
                    <div className="space-y-2.5">
                      <span className="font-bold text-[#0d3e2e] uppercase text-xs tracking-wider block">
                        Recommended Official Learning Platforms &amp; Course Links
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {item.recommendedResources.map((rec, rIdx) => (
                          <a
                            key={rIdx}
                            href={rec.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e] transition group flex flex-col justify-between"
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold font-mono text-[#0d3e2e]">
                                {rec.platform}
                              </span>
                              <p className="text-xs font-semibold text-[#2b2118] group-hover:text-[#0d3e2e] transition line-clamp-2">
                                {rec.title}
                              </p>
                            </div>
                            <div className="pt-2 flex items-center justify-between text-[11px] text-[#7a6a5a]">
                              <span className="text-emerald-700 font-bold">{rec.free ? '100% Free' : 'Verified Resource'}</span>
                              <ExternalLink className="w-3 h-3 text-[#0d3e2e]" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Institutional Support Footnote */}
                    <div className="p-3 rounded-xl bg-[#f6ede0] border border-[#d8c7ad] text-xs text-[#0d3e2e] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span><strong>Further Campus Support:</strong> {item.furtherSupport}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
