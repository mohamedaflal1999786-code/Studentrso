// components/academic-support/AssignmentResearchSection.tsx
'use client';

import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Award,
  PenTool,
  Bookmark
} from 'lucide-react';
import { ASSIGNMENT_RESEARCH_GUIDES } from '@/lib/academic-data';

export function AssignmentResearchSection() {
  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold uppercase">
          PROJECT &amp; THESIS GUIDELINES
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Assignment, Capstone Project &amp; Doctoral Research Guidance
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          From school science fair models and undergraduate final-year engineering projects to postgraduate dissertations, UGC plagiarism compliance ceilings, and LaTeX thesis typography.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ASSIGNMENT_RESEARCH_GUIDES.map((guide) => (
          <div
            key={guide.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                  {guide.stage}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {guide.type}
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] leading-tight">
                {guide.title}
              </h3>

              {/* Step-by-Step Workflow */}
              <div className="space-y-1.5 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#8c2f39] uppercase tracking-wider block">
                  Step-by-Step Project Workflow
                </span>
                <ul className="space-y-1.5">
                  {guide.stepByStepWorkflow.map((step, stIdx) => (
                    <li key={stIdx} className="text-xs text-[#2b2118] flex items-start gap-1.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formatting Standards */}
              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5">
                <span className="text-[11px] font-bold text-[#8c2f39] uppercase tracking-wider block">
                  Official Formatting Standards
                </span>
                {guide.formattingStandards.map((fmt, fIdx) => (
                  <p key={fIdx} className="text-xs text-[#2b2118] leading-relaxed">
                    • {fmt}
                  </p>
                ))}
              </div>

              {/* Ethics and Plagiarism Rules */}
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Academic Integrity &amp; Ethics
                </span>
                {guide.ethicsAndPlagiarismRules.map((eth, eIdx) => (
                  <p key={eIdx} className="text-xs text-amber-950 leading-relaxed">
                    • {eth}
                  </p>
                ))}
              </div>
            </div>

            {/* Reference Managers */}
            <div className="pt-3 border-t border-[#efe3cc] space-y-1.5">
              <span className="text-[10px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                Recommended Reference Tools:
              </span>
              <div className="flex flex-wrap gap-2">
                {guide.recommendedReferenceManagers.map((rm, rIdx) => (
                  <a
                    key={rIdx}
                    href={rm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#efe3cc] text-xs font-bold text-[#8c2f39] hover:bg-[#fbf5e9] transition"
                  >
                    <span>{rm.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
