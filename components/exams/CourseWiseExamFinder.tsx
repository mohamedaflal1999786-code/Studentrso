// components/exams/CourseWiseExamFinder.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  GraduationCap,
  Award,
  Filter,
  Search,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  IndianRupee,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  ExamRecord,
  CourseDiscipline,
  COURSE_DISCIPLINES_LIST,
  EXAMINATIONS_DATABASE
} from '@/lib/exams-data';

interface CourseWiseExamFinderProps {
  onSelectExam: (exam: ExamRecord) => void;
  onTrackExam: (exam: ExamRecord) => void;
  savedExamIds: string[];
}

export function CourseWiseExamFinder({
  onSelectExam,
  onTrackExam,
  savedExamIds,
}: CourseWiseExamFinderProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<CourseDiscipline>('Engineering');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGovt, setFilterGovt] = useState<'all' | 'govt' | 'private'>('all');
  const [filterFreeOnly, setFilterFreeOnly] = useState(false);
  const [filterConcessionOnly, setFilterConcessionOnly] = useState(false);

  // Find current discipline info
  const currentDisciplineInfo = useMemo(() => {
    return COURSE_DISCIPLINES_LIST.find((d) => d.id === selectedDiscipline) || COURSE_DISCIPLINES_LIST[0];
  }, [selectedDiscipline]);

  // Filtered exams for selected discipline
  const matchedExams = useMemo(() => {
    return EXAMINATIONS_DATABASE.filter((exam) => {
      // 1. Discipline check
      const matchesDiscipline = exam.courseDisciplines && exam.courseDisciplines.includes(selectedDiscipline);
      if (!matchesDiscipline) return false;

      // 2. Govt / Private
      if (filterGovt === 'govt' && !exam.isGovernment) return false;
      if (filterGovt === 'private' && exam.isGovernment) return false;

      // 3. Free only
      if (filterFreeOnly && exam.feeGeneralInr > 0 && exam.feeType !== 'Free Application') {
        return false;
      }

      // 4. Concession only (Reserved fee is 0 or substantially discounted)
      if (filterConcessionOnly) {
        const hasConcession = exam.feeReservedInr < exam.feeGeneralInr || exam.feeReservedInr === 0;
        if (!hasConcession) return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = exam.title.toLowerCase().includes(q);
        const matchesShort = exam.shortCode.toLowerCase().includes(q);
        const matchesAuth = exam.conductingAuthority.toLowerCase().includes(q);
        const matchesPrograms = exam.linkedOpportunities.targetProgrammesOrPosts.some((p) =>
          p.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesShort && !matchesAuth && !matchesPrograms) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDiscipline, filterGovt, filterFreeOnly, filterConcessionOnly, searchQuery]);

  // Count per discipline
  const disciplineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of COURSE_DISCIPLINES_LIST) {
      counts[d.id] = EXAMINATIONS_DATABASE.filter((e) => e.courseDisciplines?.includes(d.id)).length;
    }
    return counts;
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 mb-3">
          <GraduationCap className="w-4 h-4" /> 26 Academic & Professional Disciplines
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0d3e2e]">
          Course-Wise Entrance Examination Finder
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Select your target degree or professional field to instantly inspect every entrance examination,
          state single-window admission process, and competitive test that qualifies you for that discipline.
        </p>

        {/* Global Search and Toggles */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exams within discipline (e.g. TNEA, NEET, B.E., MBBS)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterGovt}
              onChange={(e) => setFilterGovt(e.target.value as any)}
              className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              <option value="all">All Examinations</option>
              <option value="govt">Government Only</option>
              <option value="private">Private / Institutional Only</option>
            </select>

            <button
              type="button"
              onClick={() => setFilterFreeOnly(!filterFreeOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                filterFreeOnly
                  ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                  : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
              }`}
            >
              Free to Apply
            </button>

            <button
              type="button"
              onClick={() => setFilterConcessionOnly(!filterConcessionOnly)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                filterConcessionOnly
                  ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                  : 'bg-white text-stone-800 border-[#efe3cc] hover:bg-[#fbf5e9]'
              }`}
            >
              TN Concession (SC/ST/PwD)
            </button>
          </div>
        </div>
      </div>

      {/* 26 Disciplines Horizontal Scroll / Grid Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-600">
          <span>Choose Target Discipline ({COURSE_DISCIPLINES_LIST.length})</span>
          <span className="text-[#0d3e2e]">Selected: {selectedDiscipline}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-60 overflow-y-auto p-1 border border-[#efe3cc] rounded-2xl bg-[#fdfbf6]">
          {COURSE_DISCIPLINES_LIST.map((disc) => {
            const isSelected = selectedDiscipline === disc.id;
            const count = disciplineCounts[disc.id] || 0;
            return (
              <button
                key={disc.id}
                type="button"
                onClick={() => setSelectedDiscipline(disc.id)}
                className={`p-2.5 rounded-xl text-left border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0d3e2e] text-white border-[#0d3e2e] shadow-sm'
                    : 'bg-white text-stone-800 border-[#efe3cc] hover:border-[#0d3e2e]/40 hover:bg-[#fbf5e9]'
                }`}
              >
                <div className="text-xs font-semibold line-clamp-1">{disc.id}</div>
                <div className="mt-1 flex items-center justify-between text-[11px] opacity-80">
                  <span>{count} tests</span>
                  {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Discipline Info Banner */}
      <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#0d3e2e]">
            Discipline Overview
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
            {currentDisciplineInfo.id}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            {currentDisciplineInfo.desc}
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-serif font-bold text-[#0d3e2e]">
            {matchedExams.length}
          </span>
          <span className="text-xs text-stone-500 block">Available Examinations</span>
        </div>
      </div>

      {/* Results Cards Grid */}
      {matchedExams.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#efe3cc] p-12 text-center shadow-sm">
          <GraduationCap className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            No examinations match this specific filter
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Try switching off the Free or Concession filter, or search with different keywords to explore all tests for {selectedDiscipline}.
          </p>
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
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        exam.isGovernment ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}>
                        {exam.isGovernment ? 'Government' : 'Private'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#efe3cc] text-stone-800">
                        {exam.levelClassification}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        exam.feeGeneralInr === 0 ? 'bg-emerald-100 text-emerald-900 font-bold' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {exam.feeGeneralInr === 0 ? 'Free Application' : `Fee: ₹${exam.feeGeneralInr}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onTrackExam(exam)}
                      className={`p-1.5 rounded-lg border transition shrink-0 ${
                        isSaved
                          ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                          : 'bg-[#fdfbf6] text-stone-600 border-[#efe3cc] hover:bg-[#fbf5e9]'
                      }`}
                      title={isSaved ? 'In your tracker' : 'Add to tracker'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Authority */}
                  <h3
                    onClick={() => onSelectExam(exam)}
                    className="text-lg font-serif font-bold text-[#0d3e2e] hover:underline cursor-pointer leading-snug"
                  >
                    {exam.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Authority: <strong className="text-stone-800">{exam.conductingAuthority}</strong>
                  </p>

                  {/* Unlocks Opportunity Box */}
                  <div className="mt-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e] mb-1">
                      <Award className="w-3.5 h-3.5" /> What Opportunity Does This Examination Provide?
                    </div>
                    <div className="text-xs font-semibold text-stone-900 mb-1">
                      {exam.linkedOpportunities.opportunityType}:
                    </div>
                    <ul className="text-xs text-stone-700 space-y-1">
                      {exam.linkedOpportunities.targetProgrammesOrPosts.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#0d3e2e] font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    {exam.linkedOpportunities.statutoryQuotaBenefit && (
                      <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200 font-medium">
                        Quota: {exam.linkedOpportunities.statutoryQuotaBenefit}
                      </div>
                    )}
                  </div>

                  {/* Minimum Qualification */}
                  <div className="mt-3 text-xs text-stone-600">
                    <strong className="text-stone-800">Minimum Qualification:</strong> {exam.minimumQualification}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectExam(exam)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-[#0d3e2e] text-white hover:bg-[#061d15] transition text-center shadow-sm"
                  >
                    View Opportunities & Syllabus
                  </button>
                  <a
                    href={exam.officialApplicationPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                    title="Apply on Official Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
