'use client';

import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  PlusCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ComprehensiveScholarship } from '@/lib/scholarships-data';
import {
  ExtendedStudentProfile,
  rankSmartRecommendations,
  SchemeEvaluationReport,
} from '@/lib/scholarship-matcher';

interface PersonalisedRecommendationsProps {
  programs: ComprehensiveScholarship[];
  profile: ExtendedStudentProfile;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onViewDetails: (program: ComprehensiveScholarship) => void;
  onTrackApplication: (program: ComprehensiveScholarship) => void;
  onOpenEligibilityChecker: () => void;
  onApplyOfficial?: (program: ComprehensiveScholarship) => void;
}

export function PersonalisedRecommendations({
  programs,
  profile,
  bookmarkedIds,
  onToggleBookmark,
  onViewDetails,
  onTrackApplication,
  onOpenEligibilityChecker,
  onApplyOfficial,
}: PersonalisedRecommendationsProps) {
  const evaluations: SchemeEvaluationReport[] = rankSmartRecommendations(programs, profile);

  // Recommendations prioritized: 'POTENTIALLY ELIGIBLE' and 'MORE INFORMATION REQUIRED'
  const recommendedList = evaluations.filter(
    (ev) => ev.status === 'POTENTIALLY ELIGIBLE' || ev.status === 'MORE INFORMATION REQUIRED'
  );

  const isProfileEmpty = !profile.educationStage && !profile.communityCategory && !profile.incomeRange;

  if (isProfileEmpty) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d8c7ad] bg-[#fdfbf6] p-10 text-center">
        <Sparkles size={36} className="mx-auto text-[#0d3e2e] mb-3" />
        <h3 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Complete Your Student Profile First
        </h3>
        <p className="mx-auto mt-2 max-w-lg font-sans text-[14px] leading-relaxed text-[#7a6a5a]">
          To generate personalised scholarship recommendations, provide your current education stage,
          community category, and family income range in the eligibility checker.
        </p>
        <button
          onClick={onOpenEligibilityChecker}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0d3e2e] px-5 py-3 font-sans text-[14px] font-bold text-white hover:bg-[#08261c] shadow-xs"
        >
          <span>Fill Eligibility Profile</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
            <Sparkles size={15} /> MATCHING ENGINE
          </div>
          <h2 className="font-serif text-[24px] font-bold text-[#2b2118] mt-1">
            Personalised Scholarship Recommendations
          </h2>
          <p className="mt-1 font-sans text-[13px] text-[#7a6a5a]">
            Matched against your current profile: {profile.educationStage || 'Education Stage'} ·{' '}
            {profile.communityCategory || 'Category'} · {profile.incomeRange || 'Income Range'}
          </p>
        </div>

        <button
          onClick={onOpenEligibilityChecker}
          className="rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-4 py-2 font-sans text-[13px] font-semibold text-[#0d3e2e] hover:bg-[#f6ede0]"
        >
          Edit Profile Criteria
        </button>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendedList.length === 0 ? (
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-8 text-center text-[#7a6a5a]">
            <p>No active recommendations currently matching the selected criteria. Try adjusting your income or stage in the checker.</p>
          </div>
        ) : (
          recommendedList.map((ev) => {
            const isSaved = bookmarkedIds.includes(ev.program.id);
            const isHighConfidence = ev.status === 'POTENTIALLY ELIGIBLE';

            return (
              <div
                key={ev.program.id}
                className={`rounded-2xl border p-6 transition shadow-xs ${
                  isHighConfidence
                    ? 'border-emerald-200 bg-white'
                    : 'border-[#efe3cc] bg-[#fdfbf6]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#f6ede0] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e]">
                        {ev.program.category}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold ${
                          isHighConfidence
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isHighConfidence ? (
                          <>
                            <CheckCircle2 size={13} /> High Match
                          </>
                        ) : (
                          <>
                            <HelpCircle size={13} /> Review Criteria
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[11px] text-emerald-800 font-semibold flex items-center gap-1 ml-2">
                        <ShieldCheck size={13} /> {ev.verificationDate}
                      </span>
                    </div>

                    <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
                      {ev.program.name}
                    </h3>
                    <p className="font-sans text-[13px] text-[#7a6a5a]">
                      {ev.program.provider}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(ev.program.id)}
                      aria-label="Save bookmark"
                      className={`rounded-lg p-2.5 transition ${
                        isSaved ? 'bg-[#0d3e2e]/10 text-[#0d3e2e]' : 'text-[#7a6a5a] hover:bg-[#f6ede0]'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                    <button
                      onClick={() => onTrackApplication(ev.program)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#0d3e2e] bg-[#0d3e2e]/10 px-3.5 py-2 font-sans text-[13px] font-bold text-[#0d3e2e] hover:bg-[#0d3e2e] hover:text-white"
                    >
                      <PlusCircle size={15} />
                      Track
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-3 font-sans text-[14px] leading-[22px] text-[#554a3f]">
                  {ev.program.summary}
                </p>

                {/* Why It Matches */}
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-900 block mb-2">
                    Why this scheme matches your profile:
                  </span>
                  <ul className="space-y-1 text-[13px] text-emerald-950">
                    {ev.satisfiedConditions.length > 0 ? (
                      ev.satisfiedConditions.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-700" />
                          <span>{w}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[13px] text-emerald-800">
                        Matches confirmed educational criteria and residency for Tamil Nadu students.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Missing Eligibility Information */}
                {ev.missingInformation.length > 0 && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-2">
                      Missing or pending criteria to double-check:
                    </span>
                    <ul className="space-y-1 text-[13px] text-amber-950">
                      {ev.missingInformation.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-700" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Required Documents List */}
                <div className="mt-4 pt-3 border-t border-[#efe3cc]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] block mb-2">
                    Required Documents Checklist:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ev.requiredDocuments.map((doc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-md border border-[#efe3cc] bg-[#fbf5e9] px-2.5 py-1 text-[11px] text-[#554a3f]"
                      >
                        <FileCheck2 size={12} className="text-[#0d3e2e]" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#efe3cc]">
                  <button
                    onClick={() => onViewDetails(ev.program)}
                    className="font-sans text-[13px] font-bold text-[#0d3e2e] hover:underline"
                  >
                    View Complete Scheme Rules →
                  </button>

                  {onApplyOfficial ? (
                    <button
                      onClick={() => onApplyOfficial(ev.program)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] shadow-xs"
                    >
                      <span>Apply on Official Website</span>
                      <ExternalLink size={14} />
                    </button>
                  ) : (
                    <a
                      href={ev.officialApplicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0d3e2e] px-4 py-2 font-sans text-[13px] font-bold text-white hover:bg-[#08261c] shadow-xs"
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
