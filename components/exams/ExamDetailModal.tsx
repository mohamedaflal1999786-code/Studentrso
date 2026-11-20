// components/exams/ExamDetailModal.tsx
'use client';

import { useEffect } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  IndianRupee,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
  AlertCircle,
  Bookmark,
  FileText,
  Briefcase,
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { ExamRecord } from '@/lib/exams-data';

interface ExamDetailModalProps {
  exam: ExamRecord | null;
  onClose: () => void;
  onTrackExam?: (exam: ExamRecord) => void;
  isSaved?: boolean;
}

export function ExamDetailModal({
  exam,
  onClose,
  onTrackExam,
  isSaved = false,
}: ExamDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!exam) return null;

  const { linkedOpportunities, preparation, importantDates } = exam;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 border-b border-[#efe3cc] pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                exam.isGovernment ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-purple-100 text-purple-800 border border-purple-300'
              }`}>
                {exam.isGovernment ? 'Government Examination' : 'Private / Institutional Exam'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#efe3cc] text-[#2b2118]">
                {exam.levelClassification}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Statutory Authority
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d3e2e] leading-tight">
              {exam.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              Conducting Authority: <strong className="text-stone-900 font-semibold">{exam.conductingAuthority}</strong> ({exam.authorityType})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onTrackExam && (
              <button
                type="button"
                onClick={() => onTrackExam(exam)}
                className={`p-2 rounded-xl border transition ${
                  isSaved
                    ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                    : 'bg-white text-stone-700 border-[#efe3cc] hover:bg-[#fbf5e9]'
                }`}
                title={isSaved ? 'Saved to Tracker' : 'Add to Application Tracker'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-200/50 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body: 22 Structured Fields */}
        <div className="mt-6 space-y-6 text-sm font-sans">
          {/* FIELD 22: WHAT OPPORTUNITY DOES THIS EXAMINATION PROVIDE? (PROMINENT HIGHLIGHT) */}
          <div className="rounded-2xl bg-[#0d3e2e]/5 border-2 border-[#0d3e2e]/30 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d3e2e] mb-2">
              <Award className="w-5 h-5" /> What Opportunity Does This Examination Provide?
            </div>
            <div className="text-lg font-serif font-bold text-[#0d3e2e] mb-1">
              Unlocks: {linkedOpportunities.opportunityType}
            </div>
            <p className="text-stone-800 text-sm leading-relaxed mb-4">
              {linkedOpportunities.expectedOutcome}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#0d3e2e]/15 text-xs">
              <div>
                <strong className="text-stone-900 block mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  Target Degrees / Appointed Government Posts:
                </strong>
                <ul className="list-disc list-inside space-y-1 text-stone-700">
                  {linkedOpportunities.targetProgrammesOrPosts.map((post, idx) => (
                    <li key={idx} className="leading-snug">{post}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-stone-900 block mb-1.5 font-bold uppercase tracking-wider text-[11px]">
                  Participating Colleges / Recruiting Bodies:
                </strong>
                <p className="text-stone-700 leading-snug">
                  {linkedOpportunities.participatingBodies}
                </p>

                {linkedOpportunities.statutoryQuotaBenefit && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                    <strong className="block text-amber-900 font-bold mb-0.5">Statutory Quota / Special Benefit:</strong>
                    {linkedOpportunities.statutoryQuotaBenefit}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Purpose & Who Can Apply */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0d3e2e]" /> Statutory Purpose
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {exam.purpose}
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#0d3e2e]" /> Who Can Apply
              </h4>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {exam.whoCanApply}
              </p>
            </div>
          </div>

          {/* Section 3: Minimum Eligibility, Streams, Age & Reservation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Minimum Qualification
                </span>
                <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
                  {exam.minimumQualification}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Eligible Academic Streams & Subjects
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exam.eligibleStreams.map((st) => (
                    <span key={st} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fbf5e9] text-[#0d3e2e] border border-[#efe3cc]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Mapped Academic Disciplines (26 Fields)
                </span>
                <div className="flex flex-wrap gap-1">
                  {exam.courseDisciplines.map((d) => (
                    <span key={d} className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-700">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Age Criteria & Relaxations
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {exam.ageCriteria}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Reservation & Community Norms
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {exam.reservationSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Exam Pattern, Duration, Negative Marking & Syllabus */}
          <div className="rounded-2xl bg-white border border-[#efe3cc] p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0d3e2e]" /> Examination Pattern & Syllabus Roadmap
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Examination Mode</span>
                <strong className="text-stone-900 text-sm">{exam.examinationMode}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Duration</span>
                <strong className="text-stone-900 text-sm">
                  {preparation.durationMinutes > 0 ? `${preparation.durationMinutes} Minutes` : 'Normalized Score / Merit'}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Marking & Negative Mark</span>
                <strong className="text-stone-900 text-sm">{preparation.negativeMarking}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
              <strong className="text-stone-900">Format Description:</strong> {exam.examFormatDescription}
            </p>

            <div className="border-t border-stone-100 pt-3">
              <strong className="text-xs uppercase tracking-wider text-stone-600 block mb-2">
                Core Syllabus Roadmap:
              </strong>
              <div className="space-y-1.5">
                {preparation.syllabusRoadmap.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Application Fee & Concession Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-[#0d3e2e]" /> Application Fee Structure
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">General / OC / OBC Fee:</span>
                  <span className="font-bold text-stone-900">
                    {exam.feeGeneralInr === 0 ? 'Free (₹0)' : `₹${exam.feeGeneralInr}`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Reserved (SC/ST/PwD/Women):</span>
                  <span className="font-bold text-emerald-700">
                    {exam.feeReservedInr === 0 ? 'Exempted / Free (₹0)' : `₹${exam.feeReservedInr}`}
                  </span>
                </div>
                <p className="text-xs text-stone-600 pt-1 leading-relaxed">
                  {exam.feeDescription}
                </p>
                {exam.hasFeeConcession && exam.feeConcessionDetails && (
                  <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                    <strong>Fee Concession:</strong> {exam.feeConcessionDetails}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0d3e2e]" /> Scholarship / Stipend Linked
              </h4>
              {exam.hasScholarship && exam.scholarshipDetails ? (
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs sm:text-sm">
                  <strong className="block text-purple-900 font-bold mb-1">
                    Statutory Stipend / Fellowship Available:
                  </strong>
                  {exam.scholarshipDetails}
                </div>
              ) : (
                <p className="text-xs text-stone-600 leading-relaxed">
                  Standard state government post-matric scholarship schemes (e.g. TN BC/MBC, SC/ST, Pudhumai Penn, 7.5% Govt School Fee Waiver) apply automatically upon admission via single window counselling.
                </p>
              )}
            </div>
          </div>

          {/* Section 6: Selection Steps & Procedures */}
          <div className="rounded-2xl bg-[#fbf5e9] border border-[#efe3cc] p-5 sm:p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0d3e2e]" /> Next Steps After Taking the Examination
            </h4>
            <div className="space-y-2">
              {linkedOpportunities.selectionStepsAfterExam.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                  <span className="w-5 h-5 rounded-full bg-[#0d3e2e] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Important Dates Timeline */}
          <div className="rounded-2xl bg-white border border-[#efe3cc] p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0d3e2e]" /> Verified Timeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Application Window</span>
                <strong className="text-stone-900 block leading-tight">{importantDates.applicationOpening} to {importantDates.applicationDeadline}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Admit Card</span>
                <strong className="text-stone-900 block leading-tight">{importantDates.admitCardRelease}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Exam Date</span>
                <strong className="text-[#0d3e2e] block leading-tight font-bold">{importantDates.examinationDate}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#efe3cc]">
                <span className="text-stone-500 block mb-1">Result Declaration</span>
                <strong className="text-stone-900 block leading-tight">{importantDates.resultDeclaration}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer: Statutory Portal & Syllabus Links */}
        <div className="mt-8 pt-5 border-t border-[#efe3cc] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Last verified with statutory notification: {exam.lastVerified}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {exam.officialSyllabusUrl && (
              <a
                href={exam.officialSyllabusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition"
              >
                <BookOpen className="w-3.5 h-3.5" /> Official Syllabus
              </a>
            )}

            {exam.officialNotificationUrl && (
              <a
                href={exam.officialNotificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Official Notification
              </a>
            )}

            <a
              href={exam.officialApplicationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#0d3e2e] text-white hover:bg-[#061d15] transition shadow-md"
            >
              Apply on Official Statutory Portal <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
