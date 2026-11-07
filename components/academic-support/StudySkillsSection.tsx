// components/academic-support/StudySkillsSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Brain,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';
import { STUDY_SKILLS_GUIDES, StudySkillGuide } from '@/lib/academic-data';

export function StudySkillsSection() {
  const [selectedGuide, setSelectedGuide] = useState<StudySkillGuide>(STUDY_SKILLS_GUIDES[0]);

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold uppercase">
          EVIDENCE-BASED PRODUCTIVITY
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Study Skills, Active Recall &amp; Academic Productivity
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          Master the science of effective learning: Stop passive rereading and adopt Cornell note-taking, Ebbinghaus spaced intervals, and structured daily study blocks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Skill Selector */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#7a6a5a] uppercase tracking-wider block px-1">
            Productivity &amp; Learning Guides
          </span>

          <div className="space-y-2.5">
            {STUDY_SKILLS_GUIDES.map((guide) => {
              const isSelected = selectedGuide.id === guide.id;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-white border-[#8c2f39] shadow-xs ring-1 ring-[#8c2f39]/20'
                      : 'bg-white/70 border-[#efe3cc] hover:bg-white hover:border-[#8c2f39]/40'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
                    {guide.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#2b2118] leading-tight">
                    {guide.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Skill Detail */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-6">
          <div className="border-b border-[#efe3cc] pb-3 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold">
              {selectedGuide.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
              {selectedGuide.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#7a6a5a] leading-relaxed">
              {selectedGuide.summary}
            </p>
          </div>

          {/* Step-by-Step Protocol */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-[#8c2f39] uppercase tracking-wider block">
              Step-by-Step Execution Protocol
            </span>
            <div className="space-y-2">
              {selectedGuide.stepByStepProtocol.map((step, stIdx) => (
                <div key={stIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#2b2118] leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Examples */}
          <div className="p-4 rounded-xl bg-[#fdfbf6] border border-[#efe3cc] space-y-2">
            <span className="text-xs font-bold text-[#8c2f39] uppercase tracking-wider block">
              Concrete Student Work Examples
            </span>
            <div className="space-y-2">
              {selectedGuide.actionableExamples.map((ex, eIdx) => (
                <div key={eIdx} className="p-3 rounded-lg bg-white border border-[#efe3cc] text-xs text-[#2b2118] leading-relaxed">
                  {ex}
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/60 space-y-2">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" /> Common Pitfalls to Avoid
            </span>
            <ul className="space-y-1">
              {selectedGuide.commonMistakesToAvoid.map((mistake, mIdx) => (
                <li key={mIdx} className="text-xs text-red-950 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Verified Tool */}
          <div className="pt-2 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#7a6a5a]">
              Recommended Free Open Courseware:
            </span>
            {selectedGuide.recommendedTools.map((tool, tIdx) => (
              <a
                key={tIdx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition font-bold"
              >
                <span>{tool.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
