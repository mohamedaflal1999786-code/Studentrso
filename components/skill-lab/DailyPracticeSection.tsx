'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Volume2,
  Copy,
  Check,
  MessageSquare,
  Award,
  Users,
  Mic,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { getDailyPracticeItem, DailyCommunicationItem } from '@/lib/skill-lab-data';

export function DailyPracticeSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'word' | 'sentence' | 'conversation' | 'interview' | 'gd' | 'speech' | 'tip'
  >('word');

  const dailyItem: DailyCommunicationItem = getDailyPracticeItem();
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  function handleCopy(text: string, key: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }

  const tabs = [
    { id: 'word', label: '1. Word of the Day', icon: <BookOpen size={14} /> },
    { id: 'sentence', label: '2. Sentence / Idiom', icon: <Sparkles size={14} /> },
    { id: 'conversation', label: '3. Daily Conversation', icon: <MessageSquare size={14} /> },
    { id: 'interview', label: '4. Interview Question', icon: <Award size={14} /> },
    { id: 'gd', label: '5. GD Topic', icon: <Users size={14} /> },
    { id: 'speech', label: '6. 2-Min Speech Prompt', icon: <Mic size={14} /> },
    { id: 'tip', label: '7. Pro Tip', icon: <Lightbulb size={14} /> },
  ];

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-7 shadow-[0_4px_20px_rgba(43,33,24,0.05)]">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#efe3cc]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
              DAILY COMMUNICATION DEVELOPMENT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
              UPDATES DAILY
            </span>
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
            Today&apos;s 15-Minute Spoken English &amp; Interview Workout
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Consistent 15-minute daily practice builds lasting communication confidence without stress.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] font-mono text-[11px] text-[#554a3f]">
          <Calendar size={14} className="text-[#8c2f39]" />
          <span>{todayFormatted}</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#efe3cc]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 font-sans text-[12px] sm:text-[13px] font-semibold transition cursor-pointer ${
                isActive
                  ? 'bg-[#8c2f39] text-white shadow-xs'
                  : 'text-[#7a6a5a] hover:bg-[#f6ede0] hover:text-[#2b2118]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Word of the Day */}
      {activeTab === 'word' && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 rounded-xl bg-white p-5 border border-[#efe3cc]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="font-mono text-[11px] text-[#8c2f39] font-bold uppercase tracking-wider">
                  {dailyItem.wordOfTheDay.partOfSpeech}
                </span>
                <h3 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#2b2118] leading-tight">
                  {dailyItem.wordOfTheDay.word}
                </h3>
                <span className="font-mono text-[13px] text-[#7a6a5a]">
                  {dailyItem.wordOfTheDay.phonetic}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(dailyItem.wordOfTheDay.word, 'word')}
                className="p-2 rounded-lg border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#8c2f39] transition cursor-pointer"
                title="Copy word"
              >
                {copiedKey === 'word' ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
              </button>
            </div>

            <p className="font-sans text-[15px] text-[#2b2118] font-medium mt-2">
              {dailyItem.wordOfTheDay.definition}
            </p>

            <div className="mt-3 p-3 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
              <span className="font-mono text-[10px] uppercase font-bold text-[#8c2f39] block mb-1">
                TAMIL CONTEXTUAL MEANING / பயன்பாட்டுப் பொருள்:
              </span>
              <p className="font-sans text-[13px] text-[#554a3f]">
                {dailyItem.wordOfTheDay.tamilContextMeaning}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#efe3cc]">
              <span className="font-mono text-[10px] uppercase font-bold text-[#7a6a5a] block mb-1">
                PROFESSIONAL USAGE EXAMPLE:
              </span>
              <p className="font-serif italic text-[14px] text-[#2b2118]">
                &ldquo;{dailyItem.wordOfTheDay.exampleSentence}&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#fbf5e9] p-5 border border-[#efe3cc] flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase font-bold text-[#e0a526] block mb-2">
                SYNONYMS TO REMEMBER:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dailyItem.wordOfTheDay.synonyms.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#efe3cc] font-sans text-[12px] font-semibold text-[#2b2118]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#efe3cc]">
              <span className="font-mono text-[11px] font-bold text-[#8c2f39] block mb-1">
                PRACTICE CHALLENGE:
              </span>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Use <strong>{dailyItem.wordOfTheDay.word}</strong> in a sentence describing your academic project today!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sentence / Idiom */}
      {activeTab === 'sentence' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[11px] font-bold text-[#e0a526] uppercase">
                COMMON WORKPLACE IDIOM / PHRASE
              </span>
              <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#2b2118]">
                &ldquo;{dailyItem.sentenceOfTheDay.phrase}&rdquo;
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(dailyItem.sentenceOfTheDay.phrase, 'sentence')}
              className="p-2 rounded-lg border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9] transition cursor-pointer"
            >
              {copiedKey === 'sentence' ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
            </button>
          </div>

          <p className="font-sans text-[15px] text-[#2b2118]">
            <strong>Meaning:</strong> {dailyItem.sentenceOfTheDay.meaning}
          </p>

          <div className="p-4 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="font-mono text-[11px] uppercase font-bold text-[#8c2f39] block mb-1">
              HOW TO USE IN MEETINGS / EMAILS:
            </span>
            <p className="font-sans text-[14px] text-[#2b2118] font-medium">
              {dailyItem.sentenceOfTheDay.workplaceUsage}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
            <span className="font-mono text-[10px] uppercase font-bold text-amber-900 block mb-1">
              COMMON MISTAKE TO AVOID:
            </span>
            <p className="font-sans text-[12px] text-amber-950">
              {dailyItem.sentenceOfTheDay.commonMistakeToAvoid}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Daily Conversation */}
      {activeTab === 'conversation' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-4">
          <div>
            <span className="font-mono text-[11px] font-bold text-[#8c2f39] uppercase">
              REALISTIC STUDENT SCENARIO
            </span>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              {dailyItem.dailyConversation.scenario}
            </h3>
            <p className="font-sans text-[13px] text-[#7a6a5a] mt-0.5">
              {dailyItem.dailyConversation.context}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {dailyItem.dailyConversation.dialogue.map((line, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 text-[13px] ${
                  line.speaker === 'Student' || line.speaker === 'Junior Developer' || line.speaker === 'Candidate'
                    ? 'bg-[#8c2f39]/5 border-[#8c2f39]/20'
                    : 'bg-[#fbf5e9] border-[#efe3cc]'
                }`}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39] sm:w-36 shrink-0 mt-0.5">
                  {line.speaker}:
                </span>
                <span className="font-sans text-[#2b2118] leading-relaxed flex-1">
                  &ldquo;{line.text}&rdquo;
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 font-sans text-[13px] text-emerald-950">
            <strong className="text-emerald-900 block mb-0.5">Key Communication Takeaway:</strong>
            {dailyItem.dailyConversation.keyTakeaway}
          </div>
        </div>
      )}

      {/* Tab 4: Interview Question */}
      {activeTab === 'interview' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-4">
          <div>
            <span className="font-mono text-[11px] font-bold text-[#e0a526] uppercase">
              INTERVIEW QUESTION OF THE DAY
            </span>
            <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#2b2118]">
              &ldquo;{dailyItem.interviewQuestionOfTheDay.question}&rdquo;
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block mb-1">
                WHAT THE INTERVIEWER IS REALLY TESTING:
              </span>
              <p className="font-sans text-[13px] text-[#554a3f] leading-relaxed">
                {dailyItem.interviewQuestionOfTheDay.interviewerIntent}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
              <span className="font-mono text-[11px] font-bold uppercase text-[#e0a526] block mb-1">
                WINNING RESPONSE STRATEGY:
              </span>
              <p className="font-sans text-[13px] text-[#554a3f] leading-relaxed">
                {dailyItem.interviewQuestionOfTheDay.winningStrategy}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-[#8c2f39]/20">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39]">
                MODEL SAMPLE RESPONSE (ADAPT TO YOUR EXPERIENCE):
              </span>
              <button
                type="button"
                onClick={() => handleCopy(dailyItem.interviewQuestionOfTheDay.sampleAnswer, 'interview-ans')}
                className="text-xs text-[#8c2f39] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'interview-ans' ? <Check size={13} /> : <Copy size={13} />}
                <span>Copy Script</span>
              </button>
            </div>
            <p className="font-sans text-[13px] leading-relaxed text-[#2b2118] whitespace-pre-line">
              {dailyItem.interviewQuestionOfTheDay.sampleAnswer}
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Group Discussion Topic */}
      {activeTab === 'gd' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] font-bold text-[#8c2f39] uppercase">
                GD THEME: {dailyItem.groupDiscussionTopic.category}
              </span>
              <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
                {dailyItem.groupDiscussionTopic.topic}
              </h3>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block mb-1">
              POWERFUL OPENING STATEMENT:
            </span>
            <p className="font-serif italic text-[14px] text-[#2b2118]">
              {dailyItem.groupDiscussionTopic.openingStatement}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <span className="font-mono text-[11px] font-bold uppercase text-emerald-900 block mb-2">
                ARGUMENTS IN FAVOR (FOR):
              </span>
              <ul className="space-y-1.5 font-sans text-[12px] text-emerald-950">
                {dailyItem.groupDiscussionTopic.pointsInFavor.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-emerald-700">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
              <span className="font-mono text-[11px] font-bold uppercase text-amber-900 block mb-2">
                ARGUMENTS AGAINST (COUNTERPOINTS):
              </span>
              <ul className="space-y-1.5 font-sans text-[12px] text-amber-950">
                {dailyItem.groupDiscussionTopic.pointsAgainst.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-700">-</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="font-sans text-[13px] text-[#554a3f] pt-2 border-t border-[#efe3cc]">
            <strong>Recommended Conclusion:</strong> {dailyItem.groupDiscussionTopic.conclusionSuggestion}
          </p>
        </div>
      )}

      {/* Tab 6: Speech Prompt */}
      {activeTab === 'speech' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-4">
          <div>
            <span className="font-mono text-[11px] font-bold text-[#e0a526] uppercase">
              2-MINUTE IMPROMPTU / PREPARED SPEECH TOPIC
            </span>
            <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#2b2118]">
              {dailyItem.publicSpeakingTopic.topic}
            </h3>
            <span className="font-mono text-[11px] text-[#7a6a5a]">
              Recommended Speaking Duration: {dailyItem.publicSpeakingTopic.timeLimit}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#8c2f39]/5 border border-[#8c2f39]/20">
            <span className="font-mono text-[11px] font-bold uppercase text-[#8c2f39] block mb-1">
              ENGAGING OPENING HOOK IDEA:
            </span>
            <p className="font-serif italic text-[14px] text-[#2b2118]">
              {dailyItem.publicSpeakingTopic.hookIdea}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <span className="font-mono text-[11px] font-bold uppercase text-[#7a6a5a] block mb-1">
              RECOMMENDED 3-STEP SPEECH STRUCTURE:
            </span>
            {dailyItem.publicSpeakingTopic.structureGuide.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] font-sans text-[#2b2118]">
                <span className="w-5 h-5 rounded-full bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Pro Tip */}
      {activeTab === 'tip' && (
        <div className="mt-5 rounded-xl bg-white p-5 sm:p-6 border border-[#efe3cc] space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#e0a526]">lightbulb</span>
            <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
              {dailyItem.proCommunicationTip.title}
            </h3>
          </div>
          <p className="font-sans text-[15px] text-[#2b2118] leading-relaxed">
            {dailyItem.proCommunicationTip.tip}
          </p>
          <div className="mt-4 p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
            <span className="font-mono text-[11px] uppercase font-bold text-[#8c2f39] block mb-1">
              WORKPLACE APPLICATION:
            </span>
            <p className="font-sans text-[13px] text-[#554a3f] leading-relaxed">
              {dailyItem.proCommunicationTip.workplaceApplication}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
