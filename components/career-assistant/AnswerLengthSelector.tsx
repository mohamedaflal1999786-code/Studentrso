// components/career-assistant/AnswerLengthSelector.tsx
'use client';

import { AnswerLengthPreference } from '@/lib/ai/types';
import { AlignLeft, ListOrdered, Sparkles, FileText, Minimize2, Check } from 'lucide-react';

interface AnswerLengthSelectorProps {
  value: AnswerLengthPreference;
  onChange: (value: AnswerLengthPreference) => void;
}

export function AnswerLengthSelector({ value, onChange }: AnswerLengthSelectorProps) {
  const options: { id: AnswerLengthPreference; label: string; tooltip: string }[] = [
    { id: 'auto', label: 'Balanced', tooltip: 'Standard context-aware answer' },
    { id: 'detailed', label: 'In Detail', tooltip: 'Exhaustive background, tables & next steps' },
    { id: 'brief', label: 'Briefly', tooltip: 'Concise 2-4 bullet points without filler' },
    { id: 'one-sentence', label: '1 Sentence', tooltip: 'Single definitive sentence' },
    { id: 'step-by-step', label: 'Step by Step', tooltip: 'Numbered sequential instructions' },
    { id: 'beginner', label: 'Beginner', tooltip: 'Simple analogies with clear explanations' },
    { id: 'full-procedure', label: 'Full Procedure', tooltip: 'Complete statutory walkthrough' },
    { id: 'comparison', label: 'Compare Options', tooltip: 'Side-by-side Markdown comparison table' },
    { id: 'direct-only', label: 'Direct Answer', tooltip: 'Core conclusion with zero preamble' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] shrink-0 mr-1 flex items-center gap-1">
        <AlignLeft className="w-3.5 h-3.5 text-[#0d3e2e]" /> Length:
      </span>

      {options.map((opt) => {
        const isActive = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            title={opt.tooltip}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 flex items-center gap-1 ${
              isActive
                ? 'bg-[#0d3e2e] text-white shadow-xs'
                : 'bg-white text-[#7a6a5a] border border-[#efe3cc] hover:bg-[#fbf5e9] hover:text-[#2b2118]'
            }`}
          >
            {isActive && <Check className="w-3 h-3 text-white" />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
