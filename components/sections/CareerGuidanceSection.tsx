'use client';

import { careerParams } from '@/lib/data';
import { AppIcon } from '@/components/AppIcon';

interface CareerGuidanceSectionProps {
  onOpenAIChat: () => void;
}

export function CareerGuidanceSection({ onOpenAIChat }: CareerGuidanceSectionProps) {
  return (
    <section id="ai-career-assistant" className="w-full bg-[#fbf5e9] py-10 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[12px] text-[#92400e] font-bold tracking-wider uppercase">CAREER GUIDANCE</span>
            <div className="w-8 h-0.5 bg-[#92400e]" />
          </div>
          <h2 className="font-serif text-[26px] sm:text-[36px] leading-[32px] sm:leading-[44px] text-[#2b2118] mt-2 mb-4 font-bold">
            AI Career Assistant: <span className="italic text-[#0d3e2e]">Make your next education decision clearer.</span>
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#524336] leading-relaxed">
            Explore possible education pathways based on your subjects, academic performance, interests, preferred
            career, budget, location and government/private preference.
          </p>
        </div>

        <div className="bg-[#fdfbf6] border border-[#efe3cc] p-4 sm:p-6 lg:p-8 rounded-xl">
          <span className="font-mono text-[12px] text-[#92400e] font-bold block mb-4 uppercase">
            EVALUATION PARAMETERS SIMULATOR
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {careerParams.map((param) => (
              <div key={param.number} className="p-3 bg-[#fbf5e9] border border-[#efe3cc] rounded-lg">
                <span className="font-mono text-[11px] text-[#92400e] font-bold block">PARAM {param.number}</span>
                <span className="font-sans text-[16px] text-[#2b2118] font-bold">{param.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-[#524336]">
              <AppIcon name="info" className="text-[20px] text-[#92400e]" />
              <span className="font-sans text-[13px]">Tell us about your goals. We'll help you explore possible pathways.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href="/career-assistant"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>Launch AI Career Assistant</span>
                <AppIcon name="psychology" className="text-[16px]" />
              </a>
              <button
                onClick={onOpenAIChat}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#fbf5e9] hover:bg-[#f6ede0] border border-[#d8c7ad] text-[#0d3e2e] font-sans text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Quick Q&amp;A Modal</span>
                <AppIcon name="chat" className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-[#f6ede0] border border-[#efe3cc] rounded-lg font-sans text-[13px] text-[#524336]">
          <strong className="text-[#2b2118] font-semibold">Decision Disclaimer:</strong> AI guidance is for exploration
          and decision support. Official eligibility and admission requirements should always be confirmed with the
          relevant institution or official authority.
        </div>
      </div>
    </section>
  );
}
