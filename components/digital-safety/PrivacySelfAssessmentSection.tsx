'use client';

import React, { useState } from 'react';
import {
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  PRIVACY_ASSESSMENT_QUESTIONS,
  PrivacyQuestion,
} from '@/lib/digital-safety-data';

export function PrivacySelfAssessmentSection() {
  const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const totalQuestions = PRIVACY_ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(selectedChoices).length;

  function handleSelectOption(questionId: string, optionIndex: number) {
    setSelectedChoices((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleCalculate() {
    setIsCalculated(true);
  }

  function handleReset() {
    setSelectedChoices({});
    setIsCalculated(false);
  }

  // Calculate score: Each question offers max 2 points. Max score = 10 points.
  const totalPoints = Object.entries(selectedChoices).reduce(
    (sum, [qId, optionIdx]) => {
      const q = PRIVACY_ASSESSMENT_QUESTIONS.find((item) => item.id === qId);
      if (!q) return sum;
      return sum + (q.options[optionIdx]?.points || 0);
    },
    0
  );

  const maxPoints = totalQuestions * 2;
  const privacyScorePercentage = Math.round((totalPoints / maxPoints) * 100);

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe3cc] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#8c2f39]">
            <Lock size={13} /> PRIVACY AUDIT ENGINE
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1.5">
            Digital Privacy Self-Assessment
          </h2>
          <p className="font-sans text-[13.5px] text-[#7a6a5a]">
            Evaluate your vulnerability to credential stuffing, data brokers, SIM-swapping, and OSINT profiling.
          </p>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-[#efe3cc] bg-white p-2 text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#8c2f39] transition cursor-pointer"
            title="Reset Self-Assessment"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      {/* Privacy Guarantee Notice */}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] p-3 text-[#554a3f] font-sans text-[12px]">
        <Info size={15} className="text-[#8c2f39] shrink-0" />
        <span>
          <strong>Zero-Knowledge Guarantee:</strong> This assessment processes 100% locally inside your browser. No personal identification, email addresses, or responses are ever saved or transmitted over the network.
        </span>
      </div>

      {/* Questions List */}
      <div className="mt-6 space-y-6">
        {PRIVACY_ASSESSMENT_QUESTIONS.map((q, qIndex) => {
          const selectedIdx = selectedChoices[q.id];

          return (
            <div
              key={q.id}
              className="rounded-xl border border-[#efe3cc] bg-white p-5 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10.5px] font-bold uppercase text-[#8c2f39] tracking-wider">
                  QUESTION {qIndex + 1} • {q.category}
                </span>
                {selectedIdx !== undefined && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={11} /> Answered
                  </span>
                )}
              </div>

              <h3 className="font-sans text-[14.5px] font-bold text-[#2b2118] mb-3">
                {q.prompt}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedIdx === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border font-sans text-[13px] transition cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#8c2f39] bg-[#8c2f39]/5 text-[#8c2f39] font-medium shadow-xs'
                          : 'border-[#efe3cc] bg-white text-[#554a3f] hover:border-[#8c2f39]/40 hover:bg-[#fdfbf6]'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold mt-0.5 ${
                          isSelected
                            ? 'bg-[#8c2f39] text-white'
                            : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a]'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calculate Button */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="font-mono text-[12px] text-[#7a6a5a]">
          {answeredCount} of {totalQuestions} answered
        </span>

        <button
          type="button"
          disabled={answeredCount < totalQuestions}
          onClick={handleCalculate}
          className="rounded-xl bg-[#8c2f39] px-6 py-2.5 font-sans text-[13px] font-bold text-white transition hover:bg-[#6d1824] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
        >
          Generate Privacy Report &amp; Score
        </button>
      </div>

      {/* Report & Recommendations Result */}
      {isCalculated && (
        <div className="mt-8 rounded-2xl border border-[#efe3cc] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe3cc] pb-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                YOUR PRIVACY RESILIENCE RATING
              </span>
              <h3 className="font-serif text-[26px] font-bold text-[#2b2118] mt-1">
                Shield Score: {privacyScorePercentage}%
              </h3>
            </div>

            <div className="rounded-xl bg-[#fbf5e9] border border-[#efe3cc] px-4 py-2 text-center">
              <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                Total Defense Points
              </span>
              <span className="font-mono text-[20px] font-bold text-[#8c2f39]">
                {totalPoints} / {maxPoints}
              </span>
            </div>
          </div>

          <p className="font-sans text-[14px] leading-relaxed text-[#554a3f]">
            {privacyScorePercentage >= 80
              ? 'Excellent posture! Your digital perimeter is well-hardened against opportunistic attacks and credential harvesting.'
              : privacyScorePercentage >= 50
              ? 'Moderate defense. You have good instincts in some areas, but specific vulnerabilities expose you to impersonation or credential theft.'
              : 'Critical exposure risk detected. Several routine habits leave your accounts and personal data accessible to identity thieves.'}
          </p>

          {/* Tailored Recommendations */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2b2118]">
              TAILORED RECOMMENDATIONS BASED ON YOUR HABITS:
            </h4>

            {PRIVACY_ASSESSMENT_QUESTIONS.map((q) => {
              const selectedIdx = selectedChoices[q.id];
              if (selectedIdx === undefined) return null;
              const opt = q.options[selectedIdx];

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-4 ${
                    opt.points === 2
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                      : opt.points === 1
                      ? 'border-amber-200 bg-amber-50/50 text-amber-950'
                      : 'border-rose-200 bg-rose-50/50 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {opt.points === 2 ? (
                      <ShieldCheck size={16} className="text-emerald-700" />
                    ) : (
                      <AlertTriangle size={16} className={opt.points === 1 ? 'text-amber-700' : 'text-rose-700'} />
                    )}
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                      {q.category}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed">
                    {opt.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
