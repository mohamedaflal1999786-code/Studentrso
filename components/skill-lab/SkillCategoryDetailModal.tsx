'use client';

import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BookmarkCheck,
  Bookmark,
  Share2,
} from 'lucide-react';
import { SkillCategory, LearningTopic, PracticeExercise } from '@/lib/skill-lab-data';

interface SkillCategoryDetailModalProps {
  category: SkillCategory | null;
  isOpen: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: (categoryId: string) => void;
  onOpenPracticeTool?: (toolId: string) => void;
}

export function SkillCategoryDetailModal({
  category,
  isOpen,
  isCompleted,
  onClose,
  onToggleComplete,
  onOpenPracticeTool,
}: SkillCategoryDetailModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  if (!isOpen || !category) return null;

  const currentTopic: LearningTopic | undefined = category.topics[activeTopicIndex] || category.topics[0];

  function handleSelectOption(exerciseId: string, option: string) {
    setSelectedAnswers((prev) => ({ ...prev, [exerciseId]: option }));
  }

  function handleToggleReveal(exerciseId: string) {
    setRevealedAnswers((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2b2118]/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#7a6a5a] transition hover:bg-[#f6ede0] hover:text-[#0d3e2e] cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
          <span className="rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            {category.badge}
          </span>
          <span className="rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-700">
            CAT {category.number} · {category.code}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 ml-auto">
            <ShieldCheck size={14} />
            Verified Educational Curriculum
          </span>
        </div>

        {/* Header Title & Subtitle */}
        <h2 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight text-[#2b2118] pr-8">
          {category.title}
        </h2>
        <p className="mt-1 font-serif text-[15px] italic text-[#0d3e2e]">
          {category.subtitle}
        </p>

        {/* Meta Banner */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3 font-sans text-[13px] text-[#554a3f]">
          <div className="flex items-center gap-1.5 font-semibold text-[#2b2118]">
            <Clock size={15} className="text-[#0d3e2e]" />
            Study Time: ~{category.estimatedMinutes} Minutes
          </div>
          <div className="text-[#efe3cc]">|</div>
          <div className="flex items-center gap-1.5 text-[#524336] text-[12px] truncate max-w-sm">
            <ShieldCheck size={15} className="text-[#92400e] shrink-0" aria-hidden="true" />
            <span>{category.officialSourceLabel}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 font-sans text-[14px] leading-relaxed text-[#7a6a5a]">
          {category.description}
        </p>

        {/* Learning Objectives Box */}
        <div className="mt-6 rounded-xl border border-[#efe3cc] bg-white p-5 shadow-2xs">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block mb-2">
            CORE LEARNING OUTCOMES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {category.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 font-sans text-[13px] text-[#2b2118]">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <span className="leading-snug">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Topics Navigation Tabs */}
        {category.topics.length > 1 && (
          <div className="mt-6">
            <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] tracking-wider block mb-2">
              LESSON TOPICS IN THIS MODULE:
            </span>
            <div className="flex flex-wrap gap-2">
              {category.topics.map((t, index) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTopicIndex(index)}
                  className={`px-3 py-1.5 rounded-lg font-sans text-[13px] font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTopicIndex === index
                      ? 'bg-[#0d3e2e] text-white shadow-xs'
                      : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#2b2118] hover:bg-[#f6ede0]'
                  }`}
                >
                  <span>{index + 1}. {t.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Topic Content */}
        {currentTopic && (
          <div className="mt-6 space-y-6">
            {/* Topic Summary & Key Points */}
            <div className="rounded-xl border border-[#efe3cc] bg-[#fdfbf6] p-5">
              <h3 className="font-serif text-[19px] font-bold text-[#2b2118] mb-2">
                {currentTopic.title}
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#7a6a5a] mb-4">
                {currentTopic.summary}
              </p>

              <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] tracking-wider block mb-2">
                KEY CONCEPTS &amp; RULES:
              </span>
              <ul className="space-y-2 font-sans text-[13px] text-[#2b2118]">
                {currentTopic.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#0d3e2e] font-bold shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Real-World Example */}
            <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-5">
              <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] tracking-wider block mb-1">
                PRACTICAL REAL-WORLD EXAMPLE
              </span>
              <p className="font-mono text-[12px] sm:text-[13px] text-[#2b2118] bg-white p-3.5 rounded-lg border border-[#efe3cc] leading-relaxed whitespace-pre-line mt-2">
                {currentTopic.practicalExample}
              </p>
            </div>

            {/* Step-by-Step Guide */}
            {currentTopic.stepByStepGuide.length > 0 && (
              <div className="rounded-xl border border-[#efe3cc] bg-white p-5">
                <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] tracking-wider block mb-3">
                  STEP-BY-STEP IMPLEMENTATION METHOD
                </span>
                <div className="space-y-2.5">
                  {currentTopic.stepByStepGuide.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-[13px] font-sans text-[#2b2118]">
                      <span className="w-5 h-5 rounded-full bg-[#f6ede0] text-[#0d3e2e] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Practice Exercise */}
            {currentTopic.exercises.length > 0 && (
              <div className="rounded-xl border border-[#efe3cc] bg-[#fdfbf6] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle size={18} className="text-[#92400e] shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold uppercase text-[#2b2118] tracking-wider">
                    INTERACTIVE SELF-ASSESSMENT EXERCISE
                  </span>
                </div>

                {currentTopic.exercises.map((ex) => {
                  const selected = selectedAnswers[ex.id];
                  const revealed = revealedAnswers[ex.id];
                  const isCorrect = selected === ex.correctAnswer;

                  return (
                    <div key={ex.id} className="space-y-3 mt-3">
                      <p className="font-sans text-[14px] font-semibold text-[#2b2118]">
                        {ex.question}
                      </p>

                      {ex.options && (
                        <div className="space-y-2">
                          {ex.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectOption(ex.id, opt)}
                              className={`w-full text-left p-3 rounded-lg border font-sans text-[13px] transition cursor-pointer flex items-start gap-2.5 ${
                                selected === opt
                                  ? 'border-[#0d3e2e] bg-[#0d3e2e]/5 text-[#0d3e2e] font-semibold'
                                  : 'border-[#efe3cc] bg-white text-[#554a3f] hover:bg-[#fbf5e9]'
                              }`}
                            >
                              <span className="font-mono text-[11px] uppercase font-bold text-[#7a6a5a] mt-0.5">
                                {String.fromCharCode(65 + i)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Reveal Answer / Submit Feedback */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleReveal(ex.id)}
                          className="px-3 py-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] text-[#0d3e2e] font-sans text-[12px] font-semibold hover:bg-[#f6ede0] transition cursor-pointer flex items-center gap-1.5"
                        >
                          <HelpCircle size={14} />
                          <span>{revealed ? 'Hide Explanation' : 'Check Explanation'}</span>
                        </button>

                        {selected && (
                          <span
                            className={`font-mono text-[12px] font-bold ${
                              isCorrect ? 'text-emerald-700' : 'text-amber-800'
                            }`}
                          >
                            {isCorrect ? '✓ Correct Choice!' : 'Review the recommended standard:'}
                          </span>
                        )}
                      </div>

                      {revealed && (
                        <div className="mt-2.5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 font-sans text-[13px] text-emerald-950 leading-relaxed">
                          <p className="font-semibold text-emerald-900 mb-1">
                            Recommended Answer: {ex.correctAnswer}
                          </p>
                          <p>{ex.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer Action Bar */}
        <div className="mt-8 pt-4 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={category.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0d3e2e] bg-[#0d3e2e]/10 px-4 py-2.5 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#0d3e2e] hover:text-white transition cursor-pointer"
            >
              <span>Open Official Learning Portal</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleComplete(category.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-sans text-[13px] font-bold transition cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                  : 'bg-[#0d3e2e] text-white hover:bg-[#08261c]'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Lesson Complete'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#554a3f] hover:bg-[#fbf5e9] transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
