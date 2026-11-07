// components/exams/SmartExamFinder.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Sparkles,
  GraduationCap,
  Award,
  Calendar,
  IndianRupee,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Filter,
  Bookmark,
  ExternalLink,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import {
  ExamRecord,
  EducationStage,
  EXAMINATIONS_DATABASE
} from '@/lib/exams-data';

interface SmartExamFinderProps {
  onSelectExam: (exam: ExamRecord) => void;
  onTrackExam: (exam: ExamRecord) => void;
  savedExamIds: string[];
}

export function SmartExamFinder({
  onSelectExam,
  onTrackExam,
  savedExamIds,
}: SmartExamFinderProps) {
  const [selectedStage, setSelectedStage] = useState<string>('Class 12');
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

  const stages: { value: string; label: string; desc: string }[] = [
    { value: 'Class 10', label: 'Class 10', desc: 'SSLC pass / appearing' },
    { value: 'Class 12', label: 'Class 11 - 12', desc: 'HSC / Intermediate' },
    { value: 'Diploma / Polytechnic', label: 'Diploma / Polytechnic', desc: 'Engineering & tech diplomas' },
    { value: 'ITI', label: 'ITI', desc: 'Industrial training trade certificate' },
    { value: 'Undergraduate', label: 'Undergraduate', desc: 'College students & degree holders' },
    { value: 'Postgraduate', label: 'Postgraduate', desc: 'Masters degree students & graduates' },
    { value: 'Research / PhD', label: 'Research / PhD', desc: 'Doctoral scholars & postgrads' },
  ];

  const goals = [
    { value: 'all', label: 'All Opportunities' },
    { value: 'Degree Admission', label: 'Degree & University Admission' },
    { value: 'Government Employment', label: 'Government Officer & Staff Recruitment' },
    { value: 'Scholarship / Cash Award', label: 'Scholarships & Merit Cash Awards' },
    { value: 'Research Fellowship', label: 'Doctoral Research Fellowship (₹37,000+/mo)' },
    { value: 'Private Trainee / Job', label: 'Private Corporate Trainee / IT Hiring' },
    { value: 'Apprenticeship', label: 'Statutory Apprenticeship (NATS)' },
  ];

  // Matched Examinations
  const matchedExams = useMemo(() => {
    return EXAMINATIONS_DATABASE.filter((exam) => {
      // 1. Stage filter
      if (selectedStage === 'Class 12') {
        if (!exam.targetStages.includes('Class 12') && !exam.targetStages.includes('Class 11')) {
          return false;
        }
      } else if (!exam.targetStages.includes(selectedStage as EducationStage)) {
        return false;
      }

      // 2. Goal filter
      if (selectedGoal !== 'all') {
        if (exam.linkedOpportunities.opportunityType !== selectedGoal) {
          return false;
        }
      }

      // 3. Free only
      if (freeOnly) {
        if (exam.feeType !== 'Free Application' && exam.feeGeneralInr > 0) {
          return false;
        }
      }

      // 4. Stream filter (simplified matching)
      if (selectedStream !== 'all') {
        const streamKeywords: Record<string, string[]> = {
          pcm: ['math', 'engineering', 'physics', 'pcm', 'science'],
          pcb: ['bio', 'medical', 'pharmacy', 'agri', 'veterinary', 'pcb', 'paramedical'],
          commerce: ['commerce', 'b.com', 'arts', 'management', 'any degree', 'all stream'],
          engineering: ['engineering', 'b.e.', 'b.tech', 'diploma'],
        };
        const keywords = streamKeywords[selectedStream] || [];
        const fullText = (
          exam.eligibleStreams.join(' ') +
          ' ' +
          exam.minimumQualification +
          ' ' +
          exam.title
        ).toLowerCase();

        const matchesStream =
          keywords.some((kw) => fullText.includes(kw)) ||
          fullText.includes('any graduate') ||
          fullText.includes('any degree') ||
          fullText.includes('all streams');

        if (!matchesStream) return false;
      }

      return true;
    });
  }, [selectedStage, selectedStream, selectedGoal, freeOnly]);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 mb-3">
          <Sparkles className="w-4 h-4" /> Personalized Discovery Engine
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#8c2f39]">
          Find My Exam Opportunities
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Select your current education stage and goals to uncover every examination you are eligible for,
          along with the exact admissions, government appointments, or scholarships they unlock.
        </p>

        {/* Wizard Controls */}
        <div className="mt-8 space-y-6">
          {/* Step 1: Select Stage */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
              Step 1: Your Current Education Stage
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {stages.map((st) => {
                const isSelected = selectedStage === st.value;
                return (
                  <button
                    key={st.value}
                    type="button"
                    onClick={() => setSelectedStage(st.value)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-[#8c2f39] text-white border-[#8c2f39] shadow-sm'
                        : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
                    }`}
                  >
                    <span className="block text-xs font-bold">{st.label}</span>
                    <span className={`block text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      {st.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3: Stream and Goal Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                Step 2: Stream / Background
              </label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
              >
                <option value="all">All Academic Streams</option>
                <option value="pcm">Science (Physics, Chemistry, Maths)</option>
                <option value="pcb">Science (Physics, Chemistry, Biology)</option>
                <option value="commerce">Commerce / Arts / Humanities</option>
                <option value="engineering">Engineering / Technical</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                Step 3: Primary Target Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
              >
                {goals.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#efe3cc] cursor-pointer hover:bg-stone-50 transition">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
                />
                <span className="text-xs font-semibold text-stone-800">
                  Free Application Only (₹0 Fee)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Matching Results Header */}
      <div className="flex items-center justify-between border-b border-[#efe3cc] pb-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Matching Examinations Found ({matchedExams.length})
          </h3>
          <p className="text-xs text-stone-600">
            Showing verified tests matching {selectedStage}
            {selectedStream !== 'all' ? ` in ${selectedStream.toUpperCase()}` : ''}
            {selectedGoal !== 'all' ? ` for ${selectedGoal}` : ''}.
          </p>
        </div>
      </div>

      {/* Results Cards */}
      {matchedExams.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#efe3cc] p-12 text-center shadow-sm">
          <HelpCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h4 className="text-lg font-serif font-bold text-stone-800">
            No examinations found for this combination
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Try choosing &apos;All Academic Streams&apos; or unchecking the free fee filter to view all opportunities for {selectedStage}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedStream('all');
              setSelectedGoal('all');
              setFreeOnly(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-[#8c2f39] text-white hover:bg-[#72262e] transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchedExams.map((exam) => {
            const isSaved = savedExamIds.includes(exam.id);
            return (
              <div
                key={exam.id}
                className="rounded-2xl bg-white border border-[#efe3cc] p-5 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        exam.isGovernment ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}>
                        {exam.isGovernment ? 'Government' : 'Private'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#efe3cc] text-stone-800">
                        {exam.levelClassification}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700">
                        {exam.feeGeneralInr === 0 ? 'Free Application' : `Fee: ₹${exam.feeGeneralInr}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onTrackExam(exam)}
                      className={`p-1.5 rounded-lg border transition shrink-0 ${
                        isSaved
                          ? 'bg-[#8c2f39] text-white border-[#8c2f39]'
                          : 'bg-[#fdfbf6] text-stone-600 border-[#efe3cc] hover:bg-[#fbf5e9]'
                      }`}
                      title={isSaved ? 'In your tracker' : 'Add to tracker'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h4
                    onClick={() => onSelectExam(exam)}
                    className="text-lg font-serif font-bold text-[#8c2f39] hover:underline cursor-pointer leading-snug"
                  >
                    {exam.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Authority: {exam.conductingAuthority}
                  </p>

                  {/* UNLOCKED OPPORTUNITY BOX */}
                  <div className="mt-4 rounded-xl bg-[#8c2f39]/5 border border-[#8c2f39]/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8c2f39] mb-1">
                      <Award className="w-3.5 h-3.5" /> What This Examination Unlocks
                    </div>
                    <div className="text-xs font-bold text-stone-900 mb-1">
                      {exam.linkedOpportunities.opportunityType}
                    </div>
                    <p className="text-xs text-stone-700 leading-snug">
                      {exam.linkedOpportunities.expectedOutcome}
                    </p>
                    {exam.linkedOpportunities.statutoryQuotaBenefit && (
                      <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200 font-medium">
                        Quota Benefit: {exam.linkedOpportunities.statutoryQuotaBenefit}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-stone-600 space-y-1">
                    <div>
                      <strong className="text-stone-800">Minimum Qualification:</strong> {exam.minimumQualification}
                    </div>
                    <div>
                      <strong className="text-stone-800">Age Limit:</strong> {exam.ageCriteria}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-stone-500">
                    Exam Date: <strong className="text-stone-800">{exam.importantDates.examinationDate}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectExam(exam)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8c2f39] text-white hover:bg-[#72262e] transition"
                    >
                      Opportunities & Syllabus &rarr;
                    </button>
                    <a
                      href={exam.officialApplicationPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                      title="Apply on Official Statutory Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
