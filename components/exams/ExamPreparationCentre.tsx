// components/exams/ExamPreparationCentre.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { EXAMINATIONS_DATABASE, ExamRecord } from '@/lib/exams-data';

interface ExamPreparationCentreProps {
  onSelectExam: (exam: ExamRecord) => void;
}

export function ExamPreparationCentre({ onSelectExam }: ExamPreparationCentreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');

  const filteredExams = useMemo(() => {
    return EXAMINATIONS_DATABASE.filter((exam) => {
      if (selectedStage !== 'all') {
        if (!exam.targetStages.includes(selectedStage as any)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = exam.title.toLowerCase().includes(q);
        const matchesShort = exam.shortCode.toLowerCase().includes(q);
        const matchesSyllabus = exam.preparation.syllabusRoadmap.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesShort && !matchesSyllabus) return false;
      }
      return true;
    });
  }, [searchQuery, selectedStage]);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 mb-3">
          <BookOpen className="w-4 h-4" /> Official Examination Blueprints
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0d3e2e]">
          Exam Preparation & Official Syllabi
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Access verified exam patterns, subject weightage, duration, marking schemes, and official syllabus links
          sourced directly from government gazettes and statutory university authorities.
        </p>

        {/* Filter Row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam name or syllabus topic..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            />
          </div>

          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              <option value="all">All Education Stages</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 11 - 12</option>
              <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
              <option value="ITI">ITI</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Research / PhD">Research / PhD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Syllabus Blueprints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => {
          const prep = exam.preparation;
          return (
            <div
              key={exam.id}
              className="rounded-2xl bg-white border border-[#efe3cc] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#fbf5e9] text-[#0d3e2e] border border-[#efe3cc]">
                    {exam.shortCode}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {exam.examinationMode}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectExam(exam)}
                  className="text-lg font-serif font-bold text-[#0d3e2e] hover:underline cursor-pointer leading-snug"
                >
                  {exam.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Authority: {exam.conductingAuthority}
                </p>

                {/* Duration & Marking Schemas */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                    <span className="text-stone-500 block text-[11px]">Duration:</span>
                    <strong className="text-stone-900 font-semibold">
                      {prep.durationMinutes > 0 ? `${prep.durationMinutes} Minutes` : 'Merit Calculation'}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc]">
                    <span className="text-stone-500 block text-[11px]">Negative Marking:</span>
                    <strong className="text-stone-900 font-semibold">{prep.negativeMarking}</strong>
                  </div>
                </div>

                <div className="mt-3 text-xs text-stone-700">
                  <strong className="text-stone-900 block mb-0.5">Scoring Scheme:</strong>
                  <p className="leading-relaxed">{prep.markingScheme}</p>
                </div>

                {/* Syllabus Roadmap */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <strong className="text-xs uppercase tracking-wider text-stone-700 block mb-2">
                    Official Syllabus Roadmap:
                  </strong>
                  <div className="space-y-1.5">
                    {prep.syllabusRoadmap.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Focus Areas */}
                {prep.recommendedFocus && prep.recommendedFocus.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <strong className="text-amber-950 block mb-1">Recommended Preparation Focus:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-900">
                      {prep.recommendedFocus.map((f, idx) => (
                        <li key={idx} className="leading-snug">{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectExam(exam)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0d3e2e] text-white hover:bg-[#061d15] transition"
                >
                  View Opportunities & Details &rarr;
                </button>
                {exam.officialSyllabusUrl && (
                  <a
                    href={exam.officialSyllabusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800 hover:bg-stone-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Official Syllabus Link
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
