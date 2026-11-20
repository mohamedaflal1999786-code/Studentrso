// components/academic-support/LanguageDevelopmentSection.tsx
'use client';

import React from 'react';
import {
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Users,
  Mic,
  PenTool
} from 'lucide-react';

const LANGUAGE_TRACKS = [
  {
    id: 'lang-grammar-writing',
    area: 'Academic English Writing & Grammar',
    focus: 'Structuring clear paragraphs, academic tone, avoiding run-on sentences, and precise vocabulary for exams and papers.',
    level: 'Foundational to Intermediate',
    dailyHabits: [
      'Write one 150-word summary every day about a newspaper or technical article.',
      'Check subject-verb agreement and tense consistency before submitting any assignment.',
      'Maintain an academic vocabulary logbook (e.g., delineate, elucidate, corroborate).',
    ],
    recommendedPlatforms: [
      { title: 'SWAYAM English for Academic Purposes', platform: 'SWAYAM', url: 'https://swayam.gov.in' },
      { title: 'NCERT English Language Learning Modules', platform: 'ePathshala', url: 'https://epathshala.nic.in' },
    ],
  },
  {
    id: 'lang-spoken-communication',
    area: 'Spoken English & Presentation Fluency',
    focus: 'Overcoming stage fright, pronouncing technical terms accurately, and delivering confident seminar presentations.',
    level: 'Intermediate',
    dailyHabits: [
      'Practice 2-minute spontaneous talks in front of a mirror on simple topics.',
      'Record your audio voice notes on your phone and listen back to identify filler words (um, ah, like).',
      'Engage in English peer-discussion circles with classmates on academic topics.',
    ],
    recommendedPlatforms: [
      { title: 'Spoken Tutorial English Communication Modules', platform: 'IIT Bombay', url: 'https://spoken-tutorial.org' },
    ],
  },
  {
    id: 'lang-interview-gd',
    area: 'Interview Communication & Group Discussions',
    focus: 'Professional self-introduction (elevator pitch), handling technical viva questions, active listening, and contributing constructively to group discussions.',
    level: 'Professional (College / Placement)',
    dailyHabits: [
      'Craft and memorize your 60-second professional introduction highlighting your degree, strengths, and projects.',
      'Practice the PREP structure for group discussion arguments: Point, Reason, Example, Point.',
      'Conduct mock interviews with senior students or faculty advisors.',
    ],
    recommendedPlatforms: [
      { title: 'NPTEL Developing Soft Skills and Personality', platform: 'NPTEL (IIT Kanpur)', url: 'https://nptel.ac.in' },
    ],
  },
  {
    id: 'lang-tamil-proficiency',
    area: 'Tamil Language & Classical Literature Learning Support',
    focus: 'Deepening understanding of Tamil grammar (Eluthu, Sol, Porul, Yaappu, Ani), Sangam literature, and formal administrative Tamil writing.',
    level: 'All Stages (School & Competitive)',
    dailyHabits: [
      'Read one Thirukkural with commentary daily and understand its metric structure.',
      'Practice formal drafting of official letters and petitions in pure administrative Tamil.',
      'Solve previous year Tamil question papers for SSLC and TNPSC exams.',
    ],
    recommendedPlatforms: [
      { title: 'Tamil Virtual Academy (TVA) Educational Portal', platform: 'Govt. of Tamil Nadu', url: 'https://www.tamilvu.org' },
      { title: 'TN SCERT Tamil Textbook & Grammatical Resources', platform: 'SCERT TN', url: 'https://scert.tnschools.gov.in' },
    ],
  },
];

export function LanguageDevelopmentSection() {
  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold uppercase">
          COMMUNICATION MASTERY
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2b2118]">
          Language Proficiency &amp; Professional Communication
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-2xl leading-relaxed">
          Confidence in academic writing, spoken fluency, seminar presentations, group discussions, and classical Tamil literary studies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LANGUAGE_TRACKS.map((track) => (
          <div
            key={track.id}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] font-mono text-[10px] text-[#0d3e2e] font-bold">
                {track.level}
              </span>

              <h3 className="font-serif text-lg font-bold text-[#2b2118]">
                {track.area}
              </h3>

              <p className="text-xs text-[#2b2118] leading-relaxed">
                {track.focus}
              </p>

              {/* Daily Habits */}
              <div className="space-y-1.5 pt-2 border-t border-[#efe3cc]/60">
                <span className="text-[11px] font-bold text-[#0d3e2e] uppercase tracking-wider block">
                  Actionable Daily Practice Habits
                </span>
                <ul className="space-y-1.5">
                  {track.dailyHabits.map((habit, hIdx) => (
                    <li key={hIdx} className="text-xs text-[#7a6a5a] flex items-start gap-1.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{habit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Platforms */}
            <div className="pt-3 border-t border-[#efe3cc] space-y-1.5">
              <span className="text-[10px] font-bold text-[#7a6a5a] uppercase tracking-wider block">
                Verified Free Learning Platforms
              </span>
              {track.recommendedPlatforms.map((plat, pIdx) => (
                <a
                  key={pIdx}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] hover:border-[#0d3e2e] transition flex items-center justify-between text-xs font-semibold text-[#2b2118]"
                >
                  <span>{plat.title} ({plat.platform})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0d3e2e]" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
