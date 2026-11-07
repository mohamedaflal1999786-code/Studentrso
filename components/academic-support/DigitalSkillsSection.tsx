// components/academic-support/DigitalSkillsSection.tsx
'use client';

import React from 'react';
import {
  Laptop,
  CheckCircle2,
  Code,
  Shield,
  FileSpreadsheet,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { DIGITAL_SKILLS_TRACKS } from '@/lib/academic-data';

export function DigitalSkillsSection() {
  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#8c2f39] font-bold uppercase">
          APPLIED COMPUTING &amp; DIGITAL LITERACY
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Digital Learning &amp; Practical Computer Skills
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          From academic document formatting and laboratory data spreadsheets to Python programming and cybersecurity defense. Free, self-paced open courseware from IIT Bombay and C-DAC.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DIGITAL_SKILLS_TRACKS.map((track) => (
          <div
            key={track.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-800 font-bold">
                Level: {track.proficiencyLevel}
              </span>

              <h3 className="font-serif text-base sm:text-lg font-bold text-[#2b2118] leading-tight">
                {track.title}
              </h3>

              <p className="text-xs text-[#7a6a5a] leading-relaxed">
                {track.relevance}
              </p>

              {/* Modules */}
              <div className="space-y-1.5 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#8c2f39] uppercase tracking-wider block">
                  Curriculum Modules
                </span>
                <ul className="space-y-1">
                  {track.syllabusModules.map((mod, mIdx) => (
                    <li key={mIdx} className="text-xs text-[#2b2118] leading-snug">
                      • {mod}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Exercises */}
              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5">
                <span className="text-[11px] font-bold text-[#8c2f39] uppercase tracking-wider block">
                  Hands-on Exercises
                </span>
                {track.practicalExercises.map((ex, eIdx) => (
                  <p key={eIdx} className="text-xs text-[#2b2118] leading-relaxed">
                    ✓ {ex}
                  </p>
                ))}
              </div>
            </div>

            {/* Free Courses */}
            <div className="pt-3 border-t border-[#efe3cc] space-y-2">
              <span className="text-[10px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                Free Certified Learning Course
              </span>
              {track.recommendedFreeCourses.map((fc, fIdx) => (
                <a
                  key={fIdx}
                  href={fc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition flex items-center justify-between text-xs font-bold"
                >
                  <span className="truncate">{fc.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
