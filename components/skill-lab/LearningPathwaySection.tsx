'use client';

import React from 'react';
import { CheckCircle2, Clock, ArrowRight, BookOpen, Award } from 'lucide-react';
import { PATHWAY_STAGES, PathwayStage, SKILL_CATEGORIES } from '@/lib/skill-lab-data';

interface LearningPathwaySectionProps {
  completedCategoryIds: string[];
  onSelectCategoryById: (categoryId: string) => void;
}

export function LearningPathwaySection({
  completedCategoryIds,
  onSelectCategoryById,
}: LearningPathwaySectionProps) {
  const totalStages = PATHWAY_STAGES.length;
  const completedStagesCount = PATHWAY_STAGES.filter((stage) =>
    stage.categoryIds.every((catId) => completedCategoryIds.includes(catId))
  ).length;

  const progressPercentage = Math.round((completedStagesCount / totalStages) * 100);

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-7 shadow-[0_4px_20px_rgba(43,33,24,0.05)]">
      {/* Top Banner & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#efe3cc]">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526] block mb-1">
            STRUCTURED 8-STAGE CURRICULUM ROADMAP
          </span>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
            From Campus Learner to Workplace Professional
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Follow this step-by-step pathway from basic English fluency to corporate placement readiness.
          </p>
        </div>

        {/* Progress Badge & Bar */}
        <div className="w-full sm:w-64 p-3.5 rounded-xl bg-white border border-[#efe3cc] shadow-2xs">
          <div className="flex items-center justify-between text-[12px] font-mono mb-1.5">
            <span className="font-bold text-[#0d3e2e]">Pathway Progress:</span>
            <span className="font-bold text-emerald-800">{completedStagesCount} / {totalStages} Stages ({progressPercentage}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#fbf5e9] overflow-hidden border border-[#efe3cc]">
            <div
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 8-Stage Timeline Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PATHWAY_STAGES.map((stage) => {
          const isStageComplete = stage.categoryIds.every((catId) =>
            completedCategoryIds.includes(catId)
          );
          const firstCatId = stage.categoryIds[0];
          const matchedCategory = SKILL_CATEGORIES.find((c) => c.id === firstCatId);

          return (
            <div
              key={stage.stageNumber}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all hover:shadow-sm ${
                isStageComplete
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-[#efe3cc] hover:border-[#d8c7ad]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#0d3e2e] text-white font-serif text-[15px] font-bold flex items-center justify-center shrink-0">
                    {stage.stageNumber}
                  </span>
                  <span className="font-mono text-[10px] text-[#7a6a5a] flex items-center gap-1">
                    <Clock size={11} /> {stage.recommendedDuration}
                  </span>
                </div>

                <h3 className="font-serif text-[16px] font-bold text-[#2b2118] leading-snug">
                  {stage.title}
                </h3>
                <p className="font-serif text-[12px] italic text-[#0d3e2e] mt-0.5 mb-2">
                  {stage.subtitle}
                </p>
                <p className="font-sans text-[12px] text-[#7a6a5a] leading-relaxed mb-3">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#efe3cc] space-y-2.5">
                <div className="font-sans text-[11px] text-[#554a3f] leading-snug">
                  <strong className="text-[#2b2118] block mb-0.5">Milestone Outcome:</strong>
                  {stage.milestoneOutcome}
                </div>

                {matchedCategory && (
                  <button
                    type="button"
                    onClick={() => onSelectCategoryById(matchedCategory.id)}
                    className="w-full py-2 px-3 rounded-lg bg-[#fbf5e9] hover:bg-[#0d3e2e] hover:text-white border border-[#d8c7ad] text-[#0d3e2e] font-sans text-[12px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isStageComplete ? 'Review Stage Lessons' : 'Start Stage Lessons'}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
