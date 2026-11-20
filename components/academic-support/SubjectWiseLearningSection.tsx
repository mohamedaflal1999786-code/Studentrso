// components/academic-support/SubjectWiseLearningSection.tsx
'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  GraduationCap,
  Layers,
  Award,
  Brain,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Download,
  Video,
  FileSpreadsheet
} from 'lucide-react';
import { SUBJECT_DIRECTORY, EducationStage, SubjectDirectoryItem } from '@/lib/academic-data';

const STAGE_FILTERS: { id: EducationStage; label: string; icon: any }[] = [
  { id: 'All Stages', label: 'All Levels', icon: Compass },
  { id: 'Class 10 (SSLC)', label: 'Class 10 (SSLC)', icon: GraduationCap },
  { id: 'Class 11 & 12 (HSC)', label: 'Class 11 & 12 (HSC)', icon: BookOpen },
  { id: 'Diploma & Polytechnic', label: 'Diploma & Polytechnic', icon: Layers },
  { id: 'Undergraduate (UG)', label: 'Undergraduate (UG)', icon: Award },
];

export function SubjectWiseLearningSection() {
  const [selectedStage, setSelectedStage] = useState<EducationStage>('All Stages');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = SUBJECT_DIRECTORY.filter((subj) => {
    const matchesStage = selectedStage === 'All Stages' || subj.stage === selectedStage;
    const matchesQuery =
      !searchQuery ||
      subj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subj.stream && subj.stream.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold uppercase mb-1">
              CURRICULUM DIRECTORY
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
              Subject-Wise Learning &amp; Textbook Repository
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
              Curriculum-mapped subject modules across Tamil Nadu State Board (Samacheer Kalvi), CBSE, DOTE Polytechnic, and University Engineering/Arts regulations.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7a6a5a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject (e.g. Physics, Maths, Algorithms)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9]/50 text-xs text-[#2b2118] placeholder-[#7a6a5a] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/20 focus:border-[#0d3e2e]"
            />
          </div>
        </div>

        {/* Stage Filters */}
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

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredSubjects.map((subj) => (
          <div
            key={subj.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold">
                  {subj.stage}
                </span>
                {subj.stream && (
                  <span className="text-[11px] font-semibold text-[#7a6a5a]">
                    {subj.stream}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118]">
                  {subj.name}
                </h3>
                {subj.code && (
                  <span className="font-mono text-xs text-[#0d3e2e] font-semibold">
                    Code: {subj.code}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#2b2118] leading-relaxed">
                {subj.description}
              </p>

              {/* Learning Objectives */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#0d3e2e] uppercase tracking-wider block">
                  Core Learning Objectives
                </span>
                <ul className="space-y-1">
                  {subj.learningObjectives.map((obj, oIdx) => (
                    <li key={oIdx} className="text-xs text-[#7a6a5a] flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Free Course Platforms & Textbooks */}
              <div className="space-y-2 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                  Recommended Learning Resources
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {subj.freeCoursePlatforms.map((fc, fIdx) => (
                    <a
                      key={fIdx}
                      href={fc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] hover:border-[#0d3e2e] transition flex items-center justify-between text-xs"
                    >
                      <span className="flex items-center gap-1.5 text-[#2b2118] font-semibold">
                        <Video className="w-3.5 h-3.5 text-[#0d3e2e]" />
                        <span>{fc.title} ({fc.platform})</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#0d3e2e]" />
                    </a>
                  ))}

                  {subj.textbookResources.map((tb, tIdx) => (
                    <a
                      key={tIdx}
                      href={tb.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e] transition flex items-center justify-between text-xs"
                    >
                      <span className="flex items-center gap-1.5 text-[#2b2118] font-semibold">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{tb.title} — {tb.publisher}</span>
                      </span>
                      <Download className="w-3 h-3 text-[#7a6a5a]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with Syllabus Link */}
            <div className="pt-3 border-t border-[#efe3cc] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#7a6a5a]">
                Authority: <strong>{subj.syllabusAuthority}</strong>
              </span>

              <a
                href={subj.officialSyllabusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0d3e2e] text-white hover:bg-[#08261c] transition font-bold"
              >
                <span>Official Syllabus</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
