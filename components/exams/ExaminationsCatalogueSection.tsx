// components/exams/ExaminationsCatalogueSection.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  Award,
  Calendar,
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  ExternalLink,
  BookOpen,
  ArrowUpDown,
  CheckCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import {
  ExamRecord,
  ExamCategoryKey,
  EducationStage,
  FeeClassification,
  EXAMINATIONS_DATABASE,
  MAIN_EXAM_SECTIONS
} from '@/lib/exams-data';

interface ExaminationsCatalogueSectionProps {
  categoryKey?: ExamCategoryKey | 'all';
  onSelectExam: (exam: ExamRecord) => void;
  onTrackExam: (exam: ExamRecord) => void;
  savedExamIds: string[];
}

export function ExaminationsCatalogueSection({
  categoryKey = 'all',
  onSelectExam,
  onTrackExam,
  savedExamIds,
}: ExaminationsCatalogueSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedFee, setSelectedFee] = useState<string>('all');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'fee-asc'>('default');

  // Category Metadata for display
  const currentCategoryMeta = useMemo(() => {
    if (categoryKey === 'all') {
      return {
        label: 'All Examinations & Opportunities',
        shortDescription: 'Verified state, central, national and institutional examinations across Tamil Nadu.',
      };
    }
    return MAIN_EXAM_SECTIONS.find((s) => s.key === categoryKey) || {
      label: 'Examinations',
      shortDescription: 'Verified examinations and admission pathways.',
    };
  }, [categoryKey]);

  // Stage options
  const stageOptions: { label: string; value: string }[] = [
    { label: 'All Stages', value: 'all' },
    { label: 'Class 10', value: 'Class 10' },
    { label: 'Class 11 - 12', value: 'Class 12' },
    { label: 'Diploma / Polytechnic', value: 'Diploma / Polytechnic' },
    { label: 'ITI', value: 'ITI' },
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Postgraduate', value: 'Postgraduate' },
    { label: 'Research / PhD', value: 'Research / PhD' },
  ];

  // Filtered examinations
  const filteredExams = useMemo(() => {
    return EXAMINATIONS_DATABASE.filter((exam) => {
      // 1. Category check with intelligent mapping
      if (categoryKey !== 'all') {
        if (categoryKey === 'govt-exams') {
          if (!exam.isGovernment && !exam.categories.includes('govt-exams')) return false;
        } else if (categoryKey === 'private-exams') {
          if (exam.isGovernment && !exam.categories.includes('private-exams')) return false;
        } else if (categoryKey === 'state-level') {
          if (exam.levelClassification !== 'State-Level' && !exam.categories.includes('state-level')) return false;
        } else if (categoryKey === 'central-govt') {
          if (exam.levelClassification !== 'Central Government' && !exam.categories.includes('central-govt')) return false;
        } else if (categoryKey === 'national-entrance') {
          if (exam.levelClassification !== 'National Entrance' && !exam.categories.includes('national-entrance')) return false;
        } else if (categoryKey === 'private-univ-entrance') {
          if (exam.levelClassification !== 'Private University / Institutional' && !exam.categories.includes('private-univ-entrance')) return false;
        } else if (categoryKey === 'pg-research') {
          const isPg = exam.categories.includes('pg-research') ||
            exam.targetStages.includes('Postgraduate') ||
            exam.targetStages.includes('Research / PhD');
          if (!isPg) return false;
        } else {
          if (!exam.categories.includes(categoryKey as ExamCategoryKey)) {
            return false;
          }
        }
      }

      // 2. Stage check
      if (selectedStage !== 'all') {
        if (selectedStage === 'Class 12') {
          if (!exam.targetStages.includes('Class 12') && !exam.targetStages.includes('Class 11')) {
            return false;
          }
        } else if (!exam.targetStages.includes(selectedStage as EducationStage)) {
          return false;
        }
      }

      // 3. Fee check
      if (selectedFee === 'free') {
        if (exam.feeType !== 'Free Application' && exam.feeGeneralInr > 0) {
          return false;
        }
      } else if (selectedFee === 'paid') {
        if (exam.feeGeneralInr === 0 && exam.feeType === 'Free Application') {
          return false;
        }
      }

      // 4. Authority check
      if (selectedAuthority === 'state') {
        if (exam.levelClassification !== 'State-Level') return false;
      } else if (selectedAuthority === 'central') {
        if (exam.levelClassification !== 'Central Government') return false;
      } else if (selectedAuthority === 'national') {
        if (exam.levelClassification !== 'National Entrance') return false;
      } else if (selectedAuthority === 'private') {
        if (exam.isGovernment) return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = exam.title.toLowerCase().includes(q);
        const matchesShort = exam.shortCode.toLowerCase().includes(q);
        const matchesAuth = exam.conductingAuthority.toLowerCase().includes(q);
        const matchesPosts = exam.linkedOpportunities.targetProgrammesOrPosts.some((p) =>
          p.toLowerCase().includes(q)
        );
        const matchesMinQual = exam.minimumQualification.toLowerCase().includes(q);
        if (!matchesTitle && !matchesShort && !matchesAuth && !matchesPosts && !matchesMinQual) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'fee-asc') {
        return a.feeGeneralInr - b.feeGeneralInr;
      }
      return 0;
    });
  }, [categoryKey, selectedStage, selectedFee, selectedAuthority, searchQuery, sortBy]);

  return (
    <div className="space-y-6 font-sans">
      {/* Category Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/50 border border-[#efe3cc] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d3e2e]/10 text-[#0d3e2e] border border-[#0d3e2e]/20 mb-2">
              <Award className="w-3.5 h-3.5" /> Verified Examination Catalogue
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d3e2e]">
              {currentCategoryMeta.label}
            </h2>
            <p className="text-sm text-stone-700 mt-1 max-w-3xl font-sans">
              {currentCategoryMeta.shortDescription}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-serif font-bold text-[#0d3e2e]">
              {filteredExams.length}
            </span>
            <span className="text-xs text-stone-600 block">Verified Tests</span>
          </div>
        </div>

        {/* Search & Filters Row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exam, syllabus, degree..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            />
          </div>

          {/* Stage Filter */}
          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              {stageOptions.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Filter */}
          <div>
            <select
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              <option value="all">All Fee Structures</option>
              <option value="free">Free / Nominal Fee Only</option>
              <option value="paid">Standard Application Fee</option>
            </select>
          </div>

          {/* Authority Filter */}
          <div>
            <select
              value={selectedAuthority}
              onChange={(e) => setSelectedAuthority(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-white border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              <option value="all">All Conducting Bodies</option>
              <option value="state">Tamil Nadu State Government</option>
              <option value="central">Central Government Agencies</option>
              <option value="national">National Entrance Boards</option>
              <option value="private">Private Universities / Tests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredExams.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#efe3cc] p-12 text-center shadow-sm">
          <HelpCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            No examinations match your current filter
          </h3>
          <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
            Try adjusting your stage, authority, or fee filter, or clear your search keyword to view all verified examinations.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedStage('all');
              setSelectedFee('all');
              setSelectedAuthority('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0d3e2e] text-white hover:bg-[#061d15] transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredExams.map((exam) => {
            const isSaved = savedExamIds.includes(exam.id);
            return (
              <div
                key={exam.id}
                className="rounded-2xl bg-white border border-[#efe3cc] p-5 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges & Tracker Bookmark */}
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
                  <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                    Authority: <strong>{exam.conductingAuthority}</strong>
                  </p>

                  {/* CORE PIPELINE FEATURE: Linked Opportunity Box */}
                  <div className="mt-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0d3e2e] mb-1">
                      <Award className="w-3.5 h-3.5" /> What Opportunity Does This Examination Provide?
                    </div>
                    <div className="text-xs font-semibold text-stone-900 mb-1">
                      {exam.linkedOpportunities.opportunityType}:
                    </div>
                    <ul className="text-xs text-stone-700 space-y-1 line-clamp-2">
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

                  {/* Eligibility & Exam Mode Snippet */}
                  <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                    <div>
                      <strong className="text-stone-800">Eligibility:</strong> {exam.minimumQualification}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {exam.targetStages.map((st) => (
                        <span key={st} className="px-1.5 py-0.5 rounded text-[10px] bg-stone-100 text-stone-700">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Important Dates & Actions */}
                <div className="mt-5 pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0d3e2e]" />
                      Exam Date: <strong className="text-stone-800">{exam.importantDates.examinationDate}</strong>
                    </span>
                    <span>
                      Mode: <strong className="text-stone-800">{exam.examinationMode}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
