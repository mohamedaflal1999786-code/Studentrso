// components/academic-support/ExamPreparationSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { EXAM_PREPARATION_GUIDES, EducationStage, ExamPreparationGuide } from '@/lib/academic-data';

export function ExamPreparationSection() {
  const [selectedGuide, setSelectedGuide] = useState<ExamPreparationGuide>(EXAM_PREPARATION_GUIDES[0]);

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold uppercase">
          OFFICIAL EXAMINATION MASTERY
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Examination Preparation Toolkits &amp; Model Paper Blueprints
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          Comprehensive preparation strategies, official pattern breakdowns, 4-phase revision roadmaps, and authentic model paper repositories for Tamil Nadu board and university examinations.
        </p>
      </div>

      {/* Main Layout: Left Guide Selector, Right Guide Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Exam List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#7a6a5a] uppercase tracking-wider block px-1">
            Select Examination Toolkit
          </span>

          <div className="space-y-2.5">
            {EXAM_PREPARATION_GUIDES.map((guide) => {
              const isSelected = selectedGuide.id === guide.id;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white border-[#8c2f39] shadow-xs ring-1 ring-[#8c2f39]/20'
                      : 'bg-white/70 border-[#efe3cc] hover:bg-white hover:border-[#8c2f39]/40'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                    {guide.stage}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#2b2118]">
                    {guide.examName}
                  </h4>
                  <p className="text-[11px] text-[#7a6a5a] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#8c2f39]" />
                    <span>{guide.conductingBody}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Exam Guide Detailed View */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-6">
          <div className="border-b border-[#efe3cc] pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                {selectedGuide.stage}
              </span>
              <span className="text-xs font-semibold text-[#7a6a5a]">
                Frequency: {selectedGuide.frequency}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
              {selectedGuide.examName}
            </h3>

            <p className="text-xs text-[#7a6a5a] font-medium">
              Conducted by: <strong>{selectedGuide.conductingBody}</strong>
            </p>
          </div>

          {/* Exam Pattern */}
          <div className="p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5">
            <span className="text-[11px] font-bold text-[#8c2f39] uppercase tracking-wider block">
              Official Examination Pattern &amp; Structure
            </span>
            <p className="text-xs text-[#2b2118] leading-relaxed">
              {selectedGuide.examPattern}
            </p>
          </div>

          {/* 4-Phase Study Plan Roadmap */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#8c2f39] uppercase tracking-wider block">
              Phase-by-Phase Preparation Roadmap
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedGuide.studyPlanRoadmap.map((phase, pIdx) => (
                <div key={pIdx} className="p-3.5 rounded-xl bg-white border border-[#efe3cc] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-bold text-xs text-[#8c2f39]">
                      {phase.phase}
                    </span>
                    <span className="font-mono text-[10px] text-[#7a6a5a] bg-[#fbf5e9] px-2 py-0.5 rounded-md">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#2b2118] leading-relaxed">
                    {phase.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Preparation Tips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#8c2f39] uppercase tracking-wider block">
              High-Yield Subject Preparation Strategies
            </span>
            <div className="space-y-2">
              {selectedGuide.subjectPreparationTips.map((tip, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#2b2118] leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3">
            <a
              href={selectedGuide.modelPapersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] text-[#8c2f39] hover:bg-[#efe3cc]/50 transition text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Official Model Papers &amp; Blueprints</span>
            </a>

            <a
              href={selectedGuide.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition text-xs font-bold shadow-xs"
            >
              <span>COE Official Examination Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
