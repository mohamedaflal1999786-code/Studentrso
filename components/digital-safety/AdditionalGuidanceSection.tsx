'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Shield,
  KeyRound,
  CreditCard,
  Heart,
  Bot,
  Users,
} from 'lucide-react';
import {
  GUIDANCE_SECTIONS,
  GuidanceSection,
} from '@/lib/digital-safety-data';

export function AdditionalGuidanceSection() {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(
    GUIDANCE_SECTIONS[0].id
  );

  function handleToggleSection(id: string) {
    setExpandedSectionId((prev) => (prev === id ? null : id));
  }

  const iconMap: Record<string, React.ReactNode> = {
    'password-protection-centre': <KeyRound size={20} />,
    'safe-online-payments': <CreditCard size={20} />,
    'online-mental-wellbeing': <Heart size={20} />,
    'ai-deepfakes-manipulation': <Bot size={20} />,
    'student-emergency-support': <Users size={20} />,
  };

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-[#efe3cc] pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
          <BookOpen size={13} /> CURRICULUM ARCHIVE
        </div>
        <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1.5">
          Student Cyber-Wellness &amp; Defense Field Guides (5 Pillars)
        </h2>
        <p className="font-sans text-[13.5px] text-[#7a6a5a]">
          Deep-dive guides covering passwords, digital payment hygiene, mental health balance, AI synthetic media, and institutional escalation.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {GUIDANCE_SECTIONS.map((section) => {
          const isExpanded = expandedSectionId === section.id;

          return (
            <div
              key={section.id}
              className="rounded-xl border border-[#efe3cc] bg-white overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => handleToggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition hover:bg-[#fdfbf6] cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[#0d3e2e]">
                    {iconMap[section.id] || <Shield size={20} />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#0d3e2e]">
                        {section.badge}
                      </span>
                      <span className="font-mono text-[10px] text-[#7a6a5a]">
                        • {section.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#2b2118]">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <div className="text-[#7a6a5a] pl-2">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[#efe3cc] p-4 sm:p-6 bg-[#fdfbf6]/40 space-y-5">
                  {/* Overview */}
                  <p className="font-sans text-[13.5px] leading-relaxed text-[#554a3f]">
                    {section.overview}
                  </p>

                  {/* Key Practices */}
                  <div>
                    <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2b2118] mb-2.5">
                      RECOMMENDED FIELD PRACTICES:
                    </h4>
                    <div className="space-y-2">
                      {section.keyPractices.map((practice, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2.5 rounded-lg bg-white p-3 border border-[#efe3cc] font-sans text-[13px] text-[#2b2118]"
                        >
                          <CheckCircle2 size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning Sign Callout */}
                  <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 flex items-start gap-2.5">
                    <AlertTriangle size={16} className="text-rose-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-rose-900 block mb-0.5">
                        CRITICAL WARNING SIGN:
                      </span>
                      <p className="font-sans text-[12.5px] text-rose-950">
                        {section.warningSign}
                      </p>
                    </div>
                  </div>

                  {/* Student Action Tip */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 flex items-start gap-2.5">
                    <Lightbulb size={16} className="text-[#e0a526] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-amber-950 block mb-0.5">
                        STUDENT ACTION TIP:
                      </span>
                      <p className="font-sans text-[12.5px] text-amber-900">
                        {section.studentActionTip}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
