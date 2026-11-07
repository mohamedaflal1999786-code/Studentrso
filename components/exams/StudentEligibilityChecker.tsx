// components/exams/StudentEligibilityChecker.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Sparkles,
  GraduationCap,
  Award,
  CheckCircle2,
  AlertCircle,
  XCircle,
  IndianRupee,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Filter,
  Bookmark
} from 'lucide-react';
import {
  ExamRecord,
  EducationStage,
  EXAMINATIONS_DATABASE
} from '@/lib/exams-data';

interface StudentEligibilityCheckerProps {
  onSelectExam: (exam: ExamRecord) => void;
  onTrackExam: (exam: ExamRecord) => void;
  savedExamIds: string[];
}

export function StudentEligibilityChecker({
  onSelectExam,
  onTrackExam,
  savedExamIds,
}: StudentEligibilityCheckerProps) {
  // Inputs
  const [stage, setStage] = useState<string>('Class 12');
  const [stream, setStream] = useState<string>('Science (PCM)');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'Physics', 'Chemistry']);
  const [marksRange, setMarksRange] = useState<string>('60% - 74%');
  const [age, setAge] = useState<number>(18);
  const [isTnDomicile, setIsTnDomicile] = useState<boolean>(true);
  const [community, setCommunity] = useState<string>('BC');
  const [annualIncome, setAnnualIncome] = useState<string>('Below ₹2.5 Lakhs');

  const subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Accountancy',
    'Commerce',
    'Economics',
    'English',
    'Tamil',
  ];

  function toggleSubject(sub: string) {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  }

  // Evaluation logic
  const evaluationResults = useMemo(() => {
    const eligible: { exam: ExamRecord; fee: number; reason: string }[] = [];
    const potentiallyEligible: { exam: ExamRecord; fee: number; reason: string }[] = [];
    const ineligible: { exam: ExamRecord; reason: string }[] = [];

    const isReserved = ['SC', 'ST'].includes(community);

    for (const exam of EXAMINATIONS_DATABASE) {
      // 1. Domicile check for strict TN state exams
      if (exam.levelClassification === 'State-Level' && !isTnDomicile) {
        ineligible.push({
          exam,
          reason: 'Requires Tamil Nadu domicile / Nativity certificate as per state reservation norms.',
        });
        continue;
      }

      // 2. Stage check
      const matchesStage = exam.targetStages.some((st) => {
        if (stage === 'Class 12') return st === 'Class 12' || st === 'Class 11';
        return st === (stage as EducationStage);
      });

      if (!matchesStage) {
        ineligible.push({
          exam,
          reason: `Target education stage requirement mismatch (Requires: ${exam.targetStages.join(', ')}).`,
        });
        continue;
      }

      // 3. Subject / Stream relevance
      const fullQual = (exam.minimumQualification + ' ' + exam.eligibleStreams.join(' ')).toLowerCase();
      let streamMismatch = false;

      if (stream === 'Science (PCM)' && fullQual.includes('pcb only')) streamMismatch = true;
      if (stream === 'Commerce' && (fullQual.includes('pcm compulsory') || fullQual.includes('neet'))) streamMismatch = true;
      if (stream === 'Arts / Humanities' && (fullQual.includes('science compulsory') || fullQual.includes('jee'))) streamMismatch = true;

      if (streamMismatch) {
        ineligible.push({
          exam,
          reason: `Stream requirement not fulfilled (Requires specialized subject combination in qualifying exam).`,
        });
        continue;
      }

      // 4. Fee for user's community
      const applicableFee = isReserved ? exam.feeReservedInr : exam.feeGeneralInr;

      // 5. Categorize as Eligible vs Potentially Eligible
      const minMarksBelow50 = marksRange === 'Below 50%';
      if (minMarksBelow50 && (fullQual.includes('55%') || fullQual.includes('60%') || fullQual.includes('75%'))) {
        ineligible.push({
          exam,
          reason: 'Minimum qualifying examination percentage threshold (50% - 60%) not satisfied.',
        });
        continue;
      }

      if (exam.isGovernment && exam.levelClassification === 'State-Level') {
        eligible.push({
          exam,
          fee: applicableFee,
          reason: 'Meets academic stage, Tamil Nadu domicile eligibility, and qualifying subject stream.',
        });
      } else if (marksRange === '50% - 59%' && (fullQual.includes('60%') || fullQual.includes('75%'))) {
        potentiallyEligible.push({
          exam,
          fee: applicableFee,
          reason: 'Check specific institutional cutoff or relaxation for your community quota.',
        });
      } else {
        eligible.push({
          exam,
          fee: applicableFee,
          reason: 'All core minimum qualification, stage, and stream criteria fulfilled.',
        });
      }
    }

    return { eligible, potentiallyEligible, ineligible };
  }, [stage, stream, selectedSubjects, marksRange, age, isTnDomicile, community, annualIncome]);

  return (
    <div className="space-y-8 font-sans">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fbf5e9] to-[#efe3cc]/60 border border-[#efe3cc] p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 mb-3">
          <Sparkles className="w-4 h-4" /> Smart Eligibility Intelligence
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#8c2f39]">
          Student Examination Eligibility Finder
        </h2>
        <p className="text-sm text-stone-700 mt-2 max-w-3xl leading-relaxed">
          Input your current educational stage, subjects, percentage, age, and community to instantly evaluate
          which competitive tests, college admissions, and recruitment examinations you qualify for with exact fee calculations.
        </p>
      </div>

      {/* Interactive Questionnaire Form */}
      <div className="rounded-2xl bg-white border border-[#efe3cc] p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-serif font-bold text-[#8c2f39] flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> Your Academic & Profile Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stage */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              1. Current Education Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              <option value="Class 10">Class 10 (SSLC)</option>
              <option value="Class 12">Class 11 - 12 (HSC)</option>
              <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
              <option value="ITI">ITI Trade Certificate</option>
              <option value="Undergraduate">Undergraduate Degree</option>
              <option value="Postgraduate">Postgraduate Degree</option>
              <option value="Research / PhD">Research Scholar / PhD</option>
            </select>
          </div>

          {/* Stream */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              2. Academic Stream
            </label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              <option value="Science (PCM)">Science (Maths / Physics / Chemistry)</option>
              <option value="Science (PCB)">Science (Biology / Physics / Chemistry)</option>
              <option value="Commerce">Commerce & Accountancy</option>
              <option value="Arts / Humanities">Arts & Humanities</option>
              <option value="Vocational">Vocational / Applied</option>
              <option value="Engineering / Technology">Engineering & Technology</option>
              <option value="Medical / Paramedical">Medical / Paramedical</option>
              <option value="Any Stream">Any Recognized Stream</option>
            </select>
          </div>

          {/* Percentage */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              3. Aggregate Percentage / Grade
            </label>
            <select
              value={marksRange}
              onChange={(e) => setMarksRange(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              <option value="75% and above">75% and above (Distinction)</option>
              <option value="60% - 74%">60% - 74% (First Class)</option>
              <option value="50% - 59%">50% - 59% (Second Class)</option>
              <option value="Below 50%">Below 50% (Pass)</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              4. Current Age ({age} Years)
            </label>
            <input
              type="range"
              min={14}
              max={38}
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10))}
              className="w-full accent-[#8c2f39] cursor-pointer mt-2"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1">
              <span>14 yrs</span>
              <span className="font-bold text-[#8c2f39]">{age} yrs</span>
              <span>38 yrs</span>
            </div>
          </div>
        </div>

        {/* Second Row: Domicile, Community & Income */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              5. Tamil Nadu Domicile / Nativity
            </label>
            <div className="flex items-center gap-4 mt-2">
              <label className="inline-flex items-center gap-1.5 text-xs text-stone-800 cursor-pointer">
                <input
                  type="radio"
                  name="domicile"
                  checked={isTnDomicile}
                  onChange={() => setIsTnDomicile(true)}
                  className="accent-[#8c2f39]"
                />
                <span>Yes, Tamil Nadu Resident</span>
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs text-stone-800 cursor-pointer">
                <input
                  type="radio"
                  name="domicile"
                  checked={!isTnDomicile}
                  onChange={() => setIsTnDomicile(false)}
                  className="accent-[#8c2f39]"
                />
                <span>Other State</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              6. Community Reservation
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              <option value="General / OC">General / OC</option>
              <option value="BC">BC (Backward Classes)</option>
              <option value="BCM">BCM (Backward Classes Muslim)</option>
              <option value="MBC / DNC">MBC / DNC (Most Backward Classes)</option>
              <option value="SC">SC (Scheduled Castes)</option>
              <option value="ST">ST (Scheduled Tribes)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              7. Family Annual Income
            </label>
            <select
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#fdfbf6] border border-[#efe3cc] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              <option value="Below ₹2.5 Lakhs">Below ₹2.5 Lakhs (Full Concession & Scholarship)</option>
              <option value="₹2.5L - ₹8.0 Lakhs">₹2.5L - ₹8.0 Lakhs (OBC / EWS Quota eligible)</option>
              <option value="Above ₹8.0 Lakhs">Above ₹8.0 Lakhs (Creamy Layer)</option>
            </select>
          </div>
        </div>

        {/* Subjects Select */}
        <div className="pt-4 border-t border-stone-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
            8. Select Completed / Current Core Subjects
          </label>
          <div className="flex flex-wrap gap-2">
            {subjectOptions.map((sub) => {
              const active = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    active
                      ? 'bg-[#8c2f39] text-white border-[#8c2f39]'
                      : 'bg-[#fbf5e9] text-stone-700 border-[#efe3cc] hover:bg-[#efe3cc]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Category 1: Fully Eligible */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              ✓
            </span>
            <h3 className="text-xl font-serif font-bold text-emerald-900">
              Eligible Examinations ({evaluationResults.eligible.length})
            </h3>
            <span className="text-xs text-stone-500">
              — You meet all statutory eligibility criteria
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluationResults.eligible.map(({ exam, fee, reason }) => {
              const isSaved = savedExamIds.includes(exam.id);
              return (
                <div
                  key={exam.id}
                  className="rounded-2xl bg-white border border-emerald-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Eligible
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#efe3cc] text-stone-800">
                          {exam.levelClassification}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900">
                          {fee === 0 ? 'Free (₹0)' : `Your Fee: ₹${fee}`}
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
                      className="text-base font-serif font-bold text-[#8c2f39] hover:underline cursor-pointer"
                    >
                      {exam.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Authority: <strong>{exam.conductingAuthority}</strong>
                    </p>

                    <div className="mt-3 p-2.5 rounded-lg bg-[#fbf5e9] border border-[#efe3cc] text-xs">
                      <strong className="text-[#8c2f39] block mb-0.5">Opportunity Provided:</strong>
                      <span className="text-stone-800">{exam.linkedOpportunities.opportunityType} — {exam.linkedOpportunities.targetProgrammesOrPosts.slice(0, 2).join(', ')}</span>
                    </div>

                    <div className="mt-2 text-[11px] text-emerald-800">
                      <strong>Verification Note:</strong> {reason}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      Exam Date: <strong className="text-stone-800">{exam.importantDates.examinationDate}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectExam(exam)}
                      className="px-3 py-1.5 rounded-lg font-bold bg-[#8c2f39] text-white hover:bg-[#72262e] transition text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category 2: Potentially Eligible */}
        {evaluationResults.potentiallyEligible.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                !
              </span>
              <h3 className="text-xl font-serif font-bold text-amber-900">
                Potentially Eligible ({evaluationResults.potentiallyEligible.length})
              </h3>
              <span className="text-xs text-stone-500">
                — Specific threshold or relaxation applies
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evaluationResults.potentiallyEligible.map(({ exam, fee, reason }) => (
                <div
                  key={exam.id}
                  className="rounded-2xl bg-white border border-amber-200 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                        Conditional / Threshold Check
                      </span>
                      <span className="text-xs font-bold text-stone-700">Fee: ₹{fee}</span>
                    </div>
                    <h4
                      onClick={() => onSelectExam(exam)}
                      className="text-base font-serif font-bold text-[#8c2f39] hover:underline cursor-pointer"
                    >
                      {exam.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      <strong>Check:</strong> {reason}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      Req: {exam.minimumQualification}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectExam(exam)}
                      className="px-3 py-1.5 rounded-lg font-bold bg-[#8c2f39] text-white hover:bg-[#72262e] transition text-xs"
                    >
                      Check Criteria
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category 3: Ineligible with Clear Statutory Reasons */}
        <div className="space-y-4 pt-6 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm">
              ✕
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-800">
              Ineligible for Current Profile ({evaluationResults.ineligible.length})
            </h3>
            <span className="text-xs text-stone-500">
              — Clear statutory disqualification reasons explained
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
            {evaluationResults.ineligible.slice(0, 10).map(({ exam, reason }) => (
              <div
                key={exam.id}
                className="rounded-xl bg-[#fdfbf6] border border-[#efe3cc] p-3 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="font-semibold text-stone-900">{exam.title}</div>
                  <div className="text-red-800 mt-1 font-medium flex items-start gap-1">
                    <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                </div>
                <div className="mt-2 text-stone-500 text-[11px]">
                  Target Stages: {exam.targetStages.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
