// components/academic-support/RemedialLearningSection.tsx
'use client';

import React from 'react';
import {
  Compass,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Download,
  GraduationCap
} from 'lucide-react';
import { REMEDIAL_LEARNING_TRACKS } from '@/lib/academic-data';

export function RemedialLearningSection() {
  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold uppercase">
          FOUNDATIONAL BRIDGE PROGRAMMES
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Remedial Learning &amp; Academic Bridge Tracks
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          Structured catch-up learning modules for students with foundational gaps in mathematics, grammar, science, and technical concepts. Master the fundamentals and progress confidently.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REMEDIAL_LEARNING_TRACKS.map((track) => (
          <div
            key={track.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold">
                  {track.targetStage.join(', ')}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2b2118] mt-2">
                  {track.domain}
                </h3>
              </div>

              {/* Foundational Concepts */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#0d3e2e] uppercase tracking-wider block">
                  Essential Prerequisite Concepts
                </span>
                <ul className="space-y-1">
                  {track.foundationalConcepts.map((concept, cIdx) => (
                    <li key={cIdx} className="text-xs text-[#2b2118] flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap Milestones */}
              <div className="space-y-2 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                  3-Stage Learning Roadmap
                </span>
                <div className="space-y-2">
                  {track.learningRoadmap.map((rm, rIdx) => (
                    <div key={rIdx} className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1 text-xs">
                      <div className="font-bold text-[#0d3e2e]">{rm.stage}</div>
                      <p className="text-[#7a6a5a]">Topics: {rm.topics.join(', ')}</p>
                      <p className="text-[#2b2118] font-medium">🎯 Milestone: {rm.milestone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beginner Courses & Practice */}
              <div className="space-y-2 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                  Free Beginner Courses &amp; Worksheets
                </span>
                <div className="space-y-1.5">
                  {track.beginnerCourses.map((bc, bIdx) => (
                    <a
                      key={bIdx}
                      href={bc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-[#efe3cc] hover:border-[#0d3e2e] transition flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-[#2b2118]">{bc.title} ({bc.platform})</span>
                      <ExternalLink className="w-3 h-3 text-[#0d3e2e]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Progression Path */}
            <div className="pt-3 border-t border-[#efe3cc] text-xs text-[#7a6a5a]">
              <span className="font-bold text-[#2b2118]">Path to Advanced: </span>
              <span>{track.progressionPathToAdvanced}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
