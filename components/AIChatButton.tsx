'use client';

import { Brain, Sparkles } from 'lucide-react';

interface AIChatButtonProps {
  onClick: () => void;
}

export function AIChatButton({ onClick }: AIChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8c2f39] to-[#6d1824] text-white shadow-xl shadow-[#8c2f39]/30 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#8c2f39]/15 sm:h-16 sm:w-16"
      aria-label="Open AI Career Assistant"
    >
      <Brain size={24} className="transition-transform group-hover:scale-110" />
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e0a526] opacity-60" />
        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e0a526] border-2 border-[#6d1824]">
          <Sparkles size={9} className="text-white" />
        </span>
      </span>
    </button>
  );
}
