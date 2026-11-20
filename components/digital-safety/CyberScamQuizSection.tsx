'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  CYBER_SCAM_QUIZ_QUESTIONS,
  QuizQuestion,
} from '@/lib/digital-safety-data';

export function CyberScamQuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<
    { questionId: number; selected: number; isCorrect: boolean }[]
  >([]);

  const currentQ: QuizQuestion = CYBER_SCAM_QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = CYBER_SCAM_QUIZ_QUESTIONS.length;

  function handleSelectOption(index: number) {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  }

  function handleSubmitAnswer() {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    if (isCorrect) {
      setUserScore((prev) => prev + 1);
    }
    setAnswersHistory((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: selectedOption, isCorrect },
    ]);
    setIsAnswerSubmitted(true);
  }

  function handleNextQuestion() {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
  }

  const progressPercentage = Math.round(
    ((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / totalQuestions) * 100
  );

  return (
    <section className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe3cc] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6ede0] border border-[#d8c7ad] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e]">
            <Sparkles size={13} /> INTERACTIVE SIMULATOR
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118] mt-1.5">
            10-Question Cyber Scam Awareness Quiz
          </h2>
          <p className="font-sans text-[13.5px] text-[#7a6a5a]">
            Test your real-world fraud detection reflexes with scenarios commonly encountered by college students.
          </p>
        </div>

        {!quizFinished && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-mono text-[11px] font-bold text-[#7a6a5a] block uppercase">
                Score
              </span>
              <span className="font-mono text-[18px] font-bold text-[#0d3e2e]">
                {userScore} / {totalQuestions}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="rounded-lg border border-[#efe3cc] bg-white p-2 text-[#7a6a5a] hover:bg-[#fbf5e9] hover:text-[#0d3e2e] transition cursor-pointer"
              title="Restart Quiz"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!quizFinished && (
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between font-mono text-[11px] text-[#7a6a5a]">
            <span>
              Scenario {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span>{progressPercentage}% Completed</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#efe3cc]">
            <div
              className="h-full bg-[#0d3e2e] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Quiz Body */}
      {!quizFinished ? (
        <div className="mt-6 space-y-6">
          {/* Scenario Prompt */}
          <div className="rounded-xl border border-[#efe3cc] bg-white p-5 shadow-xs">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e] block mb-2">
              REAL-WORLD STUDENT SCENARIO:
            </span>
            <p className="font-serif text-[16px] sm:text-[18px] font-medium leading-relaxed text-[#2b2118]">
              {currentQ.scenario}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQ.correctOptionIndex;

              let btnClasses =
                'w-full text-left p-4 rounded-xl border font-sans text-[13.5px] transition cursor-pointer flex items-start gap-3 ';

              if (!isAnswerSubmitted) {
                btnClasses += isSelected
                  ? 'border-[#0d3e2e] bg-[#0d3e2e]/5 text-[#0d3e2e] font-medium shadow-xs'
                  : 'border-[#efe3cc] bg-white text-[#2b2118] hover:border-[#0d3e2e]/50 hover:bg-[#fdfbf6]';
              } else {
                if (isCorrectOption) {
                  btnClasses += 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                } else if (isSelected && !isCorrectOption) {
                  btnClasses += 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  btnClasses += 'border-[#efe3cc] bg-white/60 text-[#7a6a5a] opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={btnClasses}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                      isAnswerSubmitted && isCorrectOption
                        ? 'bg-emerald-700 text-white'
                        : isAnswerSubmitted && isSelected && !isCorrectOption
                        ? 'bg-rose-700 text-white'
                        : isSelected
                        ? 'bg-[#0d3e2e] text-white'
                        : 'bg-[#fbf5e9] border border-[#efe3cc] text-[#7a6a5a]'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Banner */}
          {isAnswerSubmitted && (
            <div
              className={`rounded-xl border p-5 ${
                selectedOption === currentQ.correctOptionIndex
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                  : 'border-rose-200 bg-rose-50 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-mono text-[12px] font-bold">
                {selectedOption === currentQ.correctOptionIndex ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    <span className="text-emerald-800">CORRECT DECISION</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-rose-700" />
                    <span className="text-rose-800">INCORRECT / HIGH VULNERABILITY</span>
                  </>
                )}
              </div>

              <p className="font-sans text-[13.5px] leading-relaxed mb-3">
                {currentQ.explanation}
              </p>

              <div className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 font-mono text-[11px] font-bold border border-current/20">
                <ShieldCheck size={14} />
                <span>{currentQ.criticalTakeaway}</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="rounded-xl bg-[#0d3e2e] px-6 py-2.5 font-sans text-[13px] font-bold text-white transition hover:bg-[#08261c] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-6 py-2.5 font-sans text-[13px] font-bold text-white transition hover:bg-[#08261c] shadow-xs cursor-pointer"
              >
                <span>
                  {currentQuestionIndex + 1 === totalQuestions
                    ? 'View Final Results'
                    : 'Next Scenario'}
                </span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished View */
        <div className="mt-8 text-center space-y-6 py-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] text-[#0d3e2e] shadow-inner">
            <Award size={36} />
          </div>

          <div>
            <h3 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#2b2118]">
              Quiz Completed!
            </h3>
            <p className="font-serif text-[16px] italic text-[#0d3e2e] mt-1">
              {userScore >= 9
                ? 'Cyber Shield Master — You possess elite scam detection instincts!'
                : userScore >= 7
                ? 'Alert Defender — Strong instincts with minor blind spots.'
                : 'Vulnerable Defender — Review the practical guides above to strengthen your safety.'}
            </p>
          </div>

          <div className="inline-block rounded-2xl border border-[#efe3cc] bg-white px-8 py-5 shadow-sm">
            <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#7a6a5a] block">
              FINAL SCORE
            </span>
            <span className="font-serif text-[42px] font-bold text-[#0d3e2e] leading-tight">
              {userScore}
            </span>
            <span className="font-serif text-[22px] text-[#7a6a5a]"> / {totalQuestions}</span>
            <span className="font-sans text-[12px] text-[#7a6a5a] block mt-1">
              ({Math.round((userScore / totalQuestions) * 100)}% Accuracy)
            </span>
          </div>

          {/* Golden Rules Summary */}
          <div className="mx-auto max-w-xl text-left rounded-xl bg-[#fbf5e9] p-5 border border-[#efe3cc]">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2b2118] mb-2 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#0d3e2e]" />
              <span>KEY CYBER DEFENSE PRINCIPLES TO REMEMBER</span>
            </h4>
            <ul className="space-y-1.5 font-sans text-[12.5px] text-[#554a3f]">
              <li>• UPI PIN is strictly for sending money, never receiving it.</li>
              <li>• Indian police or courts NEVER place citizens under "digital arrest" via video calls.</li>
              <li>• Never install modded APKs or grant Accessibility permissions to untrusted apps.</li>
              <li>• Dial 1930 immediately within the Golden Hour for any fraudulent debits.</li>
            </ul>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-6 py-2.5 font-sans text-[13px] font-bold text-white transition hover:bg-[#08261c] shadow-xs cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
