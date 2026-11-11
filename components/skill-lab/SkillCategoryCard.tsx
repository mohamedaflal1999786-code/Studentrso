'use client';

import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { SkillCategory } from '@/lib/skill-lab-data';
import { AppIcon } from '@/components/AppIcon';

interface SkillCategoryCardProps {
  category: SkillCategory;
  isCompleted?: boolean;
  onViewDetails: (category: SkillCategory) => void;
  onStartLearning: (category: SkillCategory) => void;
}

export function SkillCategoryCard({
  category,
  isCompleted = false,
  onViewDetails,
  onStartLearning,
}: SkillCategoryCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-[0_2px_12px_rgba(43,33,24,0.04)] transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Header: Badge, Stage, Completed check */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-[#8c2f39]/10 border border-[#8c2f39]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39]">
            {category.badge}
          </span>
          <span className="rounded-full bg-[#fbf5e9] border border-[#d8c7ad] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#554a3f]">
            CAT {category.number}
          </span>
          <span className="rounded-full bg-stone-100 border border-stone-200 px-2 py-0.5 font-mono text-[9px] text-stone-600 flex items-center gap-1">
            <Clock size={11} /> {category.estimatedMinutes} mins
          </span>
        </div>

        {isCompleted && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
            <CheckCircle2 size={12} /> COMPLETED
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="flex items-start gap-3 mt-1">
        <div className="w-10 h-10 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] flex items-center justify-center shrink-0 shadow-2xs">
          <AppIcon name={category.icon} className="text-[22px]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-[#2b2118]">
            {category.title}
          </h3>
          <p className="font-serif text-[13px] italic text-[#8c2f39] line-clamp-1 mt-0.5">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#7a6a5a] line-clamp-3 flex-1">
        {category.description}
      </p>

      {/* Learning Objectives Preview */}
      <div className="mt-4 pt-3 border-t border-[#efe3cc] space-y-1.5">
        <span className="font-mono text-[10px] font-bold uppercase text-[#2b2118] tracking-wider block mb-1.5">
          KEY LEARNING OBJECTIVES:
        </span>
        {category.learningObjectives.slice(0, 2).map((obj, i) => (
          <div key={i} className="flex items-start gap-1.5 font-sans text-[12px] text-[#554a3f]">
            <span className="text-[#e0a526] font-bold shrink-0 mt-0.5">✓</span>
            <span className="line-clamp-1">{obj}</span>
          </div>
        ))}
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-5 pt-3 border-t border-[#efe3cc] flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(category)}
          className="flex-1 rounded-lg bg-[#8c2f39] px-3.5 py-2 font-sans text-[13px] font-bold text-white transition-colors hover:bg-[#6d1824] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <BookOpen size={14} />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onStartLearning(category)}
          className="rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-2 font-sans text-[13px] font-semibold text-[#8c2f39] transition-colors hover:bg-[#f6ede0] cursor-pointer flex items-center justify-center gap-1"
          title="Open interactive exercises directly"
        >
          <span>Practice</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
