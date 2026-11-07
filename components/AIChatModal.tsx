'use client';

import { useState, useRef, useEffect } from 'react';
import { Brain, Loader2, Send, X, Sparkles, GraduationCap, Briefcase, Award, FileText } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; content: string; isError?: boolean };

interface AIChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUGGESTED_QUESTIONS = [
  { icon: GraduationCap, text: 'What scholarships are available for engineering students?' },
  { icon: Briefcase, text: 'How do I prepare for UPSC while in college?' },
  { icon: Award, text: 'Which certifications boost my resume for IT jobs?' },
  { icon: FileText, text: 'Help me write a strong resume summary' },
];

export function AIChatModal({ open, onOpenChange }: AIChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  if (!open) return null;

  async function send(promptText: string) {
    const prompt = promptText.trim();
    if (!prompt || busy) return;
    setHasStarted(true);
    const next = [...messages, { role: 'user' as const, content: prompt }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/career-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ messages: next, stream: false }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((cur) => [
        ...cur,
        {
          role: 'assistant',
          content: data.reply || data.error || 'I could not answer that right now.',
          isError: !data.reply,
        },
      ]);
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          role: 'assistant',
          content: 'The assistant is temporarily unavailable. Please try again shortly.',
          isError: true,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4 sm:py-8">
      <div className="absolute inset-0 bg-[#2b2118]/60 backdrop-blur-md" onClick={() => onOpenChange(false)} />
      <div className="relative flex h-[100vh] sm:h-[min(720px,88vh)] w-full sm:max-w-[560px] flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-[#efe3cc] bg-[#fdfbf6] shadow-[0_24px_80px_rgba(43,33,24,0.3)] animate-slide-up">
        {/* Gradient strip */}
        <div className="h-1.5 bg-gradient-to-r from-[#8c2f39] via-[#b8543e] to-[#e0a526] shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#efe3cc] bg-gradient-to-b from-[#f6ede0] to-[#fdfbf6] px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8c2f39] to-[#6d1824] shadow-lg shadow-[#8c2f39]/20">
              <Brain size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e0a526]">
                <Sparkles size={12} /> AI-Powered
              </div>
              <h2 className="font-serif text-[20px] font-bold text-[#2b2118] leading-tight">Career Assistant</h2>
              <p className="text-[12px] text-[#7a6a5a]">Exploration guidance, not official eligibility advice.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href="/career-assistant"
              className="text-[11px] font-bold text-[#8c2f39] bg-white border border-[#efe3cc] hover:bg-[#fbf5e9] px-2.5 py-1.5 rounded-xl transition inline-flex items-center gap-1"
              title="Open full conversational AI assistant workspace"
            >
              <span>Full Workspace</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </a>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 text-[#7a6a5a] transition-colors hover:bg-[#fbf5e9] hover:text-[#8c2f39] cursor-pointer"
              aria-label="Close assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fbf5e9] p-4 sm:p-5">
          {!hasStarted && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6ede0] to-[#efe3cc] border border-[#efe3cc]">
                <Brain size={30} className="text-[#8c2f39]" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">How can I help you today?</h3>
              <p className="mt-1 text-[13px] text-[#7a6a5a] max-w-[320px]">
                Ask about scholarships, exams, career paths, resume tips, or any Student RSO service.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[400px]">
                {SUGGESTED_QUESTIONS.map((q, i) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => send(q.text)}
                      className="flex items-center gap-2.5 rounded-xl border border-[#efe3cc] bg-[#fdfbf6] px-3.5 py-3 text-left text-[12.5px] font-medium text-[#2b2118] transition hover:border-[#d8c7ad] hover:bg-[#f6ede0] hover:shadow-sm cursor-pointer group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f6ede0] border border-[#efe3cc] text-[#8c2f39] transition group-hover:bg-[#8c2f39] group-hover:text-white shrink-0">
                        <Icon size={15} />
                      </div>
                      <span className="leading-snug">{q.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={`${msg.role}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="mr-2 mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8c2f39] to-[#6d1824] shrink-0">
                  <Brain size={15} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13.5px] leading-[22px] ${
                  msg.role === 'user'
                    ? 'rounded-br-md bg-gradient-to-br from-[#8c2f39] to-[#6d1824] text-white shadow-md shadow-[#8c2f39]/15'
                    : msg.isError
                      ? 'rounded-bl-md border border-[#f0d8d8] bg-[#fdf0f0] text-[#8c2f39]'
                      : 'rounded-bl-md border border-[#efe3cc] bg-[#fdfbf6] text-[#2b2118] shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex items-center justify-start gap-2">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8c2f39] to-[#6d1824] shrink-0">
                <Brain size={15} className="text-white" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#efe3cc] bg-[#fdfbf6] px-4 py-3 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#8c2f39] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-[#b8543e] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-[#e0a526] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex gap-2.5 border-t border-[#efe3cc] bg-[#fdfbf6] p-3 sm:p-4 shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, careers, scholarships, exams..."
            className="h-12 flex-1 rounded-xl border border-[#d8c7ad] bg-[#fbf5e9] px-4 text-[14px] outline-none focus:border-[#8c2f39] focus:ring-2 focus:ring-[#8c2f39]/15 text-[#2b2118] placeholder:text-[#b0a596]"
          />
          <button
            disabled={busy || !input.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8c2f39] to-[#6d1824] text-white shadow-lg shadow-[#8c2f39]/20 transition hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
