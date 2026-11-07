'use client';

import { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Info,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  ComprehensiveScholarship,
  EducationStage,
} from '@/lib/scholarships-data';
import {
  evaluateSchemeEligibility,
  ExtendedStudentProfile,
  MatchCategory,
  parseIncomeRangeToNumeric,
  SchemeEvaluationReport,
} from '@/lib/scholarship-matcher';

interface SmartEligibilityCheckerProps {
  programs: ComprehensiveScholarship[];
  profile: ExtendedStudentProfile;
  onUpdateProfile: (updated: ExtendedStudentProfile) => void;
  onSaveProfileToAccount: () => void;
  onViewDetails: (program: ComprehensiveScholarship) => void;
  onSwitchToRecommendations: () => void;
  onApplyOfficial?: (program: ComprehensiveScholarship) => void;
}

const allEducationStages: EducationStage[] = [
  'Class 10',
  'Class 11',
  'Class 12',
  'ITI',
  'Diploma',
  'Undergraduate',
  'Professional degree',
  'Integrated degree',
  'Postgraduate',
  'Completed UG',
  'Completed PG',
  'PhD',
  'Junior Research Fellowship',
  'Senior Research Fellowship',
  'Postdoctoral research',
];

const tnDistricts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode',
  'Vellore', 'Thanjavur', 'Dindigul', 'Kanchipuram', 'Tiruvallur', 'Cuddalore', 'Villupuram',
  'Nagapattinam', 'Namakkal', 'Dharmapuri', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga',
  'Virudhunagar', 'Theni', 'Thoothukudi', 'Kanniyakumari', 'Nilgiris', 'Karur', 'Perambalur',
  'Ariyalur', 'Tiruppur', 'Chengalpattu', 'Tenkasi', 'Ranipet', 'Tirupathur', 'Kallakurichi',
  'Mayiladuthurai',
];

export function SmartEligibilityChecker({
  programs,
  profile,
  onUpdateProfile,
  onSaveProfileToAccount,
  onViewDetails,
  onSwitchToRecommendations,
  onApplyOfficial,
}: SmartEligibilityCheckerProps) {
  const [filterResult, setFilterResult] = useState<string>('All');
  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  // Evaluate schemes through the rule engine
  const reports: SchemeEvaluationReport[] = programs.map((p) =>
    evaluateSchemeEligibility(p, profile)
  );

  const filteredReports = reports.filter((rep) => {
    if (filterResult === 'All') return true;
    return rep.status === filterResult;
  });

  const potentiallyCount = reports.filter((e) => e.status === 'POTENTIALLY ELIGIBLE').length;
  const moreInfoCount = reports.filter((e) => e.status === 'MORE INFORMATION REQUIRED').length;
  const mismatchCount = reports.filter((e) => e.status === 'DOES NOT MEET CONFIRMED CONDITIONS').length;
  const needVerificationCount = reports.filter((e) => e.status === 'SCHEME REQUIRES VERIFICATION').length;

  const handleFieldChange = <K extends keyof ExtendedStudentProfile>(
    field: K,
    value: ExtendedStudentProfile[K]
  ) => {
    const updated = { ...profile, [field]: value };
    if (field === 'incomeRange') {
      updated.annualFamilyIncome = parseIncomeRangeToNumeric(value as string);
    }
    onUpdateProfile(updated);
  };

  const handleSaveProfile = async () => {
    setSavingStatus('Saving...');
    try {
      await onSaveProfileToAccount();
      setSavingStatus('Profile Saved!');
      setTimeout(() => setSavingStatus(null), 2500);
    } catch {
      setSavingStatus('Saved locally');
      setTimeout(() => setSavingStatus(null), 2500);
    }
  };

  const isResearchOrCompletedStage =
    profile.educationStage === 'Completed UG' ||
    profile.educationStage === 'Completed PG' ||
    profile.educationStage === 'PhD' ||
    profile.educationStage === 'Junior Research Fellowship' ||
    profile.educationStage === 'Senior Research Fellowship' ||
    profile.educationStage === 'Postdoctoral research';

  return (
    <div className="space-y-8">
      {/* Disclaimer Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-amber-950 flex items-start gap-3">
        <Info size={20} className="shrink-0 text-amber-800 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold block text-amber-900">
            Advisory & Decision-Support Notice
          </strong>
          This Smart Eligibility Checker evaluates your profile against officially verified rules and circulars.
          It does not guarantee government approval, sanction or disbursement. All awards remain subject to final verification
          and scrutiny by the concerned government departments or philanthropic foundations.
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] items-start">
        {/* Form Column */}
        <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#8c2f39]" />
              <h2 className="font-serif text-[20px] font-bold text-[#2b2118]">
                Student Eligibility Profile
              </h2>
            </div>
            <button
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-[#fbf5e9] px-3 py-1.5 font-sans text-[12px] font-semibold text-[#8c2f39] hover:bg-[#f6ede0]"
            >
              <Save size={14} />
              {savingStatus || 'Save Profile'}
            </button>
          </div>
          <p className="font-sans text-[12px] text-[#7a6a5a] mb-5">
            Collects only minimal matching parameters. No Aadhaar OTPs, passwords, or confidential documents requested.
          </p>

          <div className="space-y-4">
            {/* 1. Education Stage (All 15 stages) */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Current Educational Stage *
              </label>
              <select
                value={profile.educationStage}
                onChange={(e) => handleFieldChange('educationStage', e.target.value as EducationStage | '')}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="">Select current stage...</option>
                <optgroup label="School Education">
                  <option value="Class 10">Class 10 (Secondary)</option>
                  <option value="Class 11">Class 11 (Higher Secondary 1st Year)</option>
                  <option value="Class 12">Class 12 (Higher Secondary 2nd Year)</option>
                </optgroup>
                <optgroup label="Technical & Higher Education">
                  <option value="ITI">ITI (Industrial Training)</option>
                  <option value="Diploma">Diploma (Polytechnic)</option>
                  <option value="Undergraduate">Undergraduate (Arts, Science, Commerce)</option>
                  <option value="Professional degree">Professional Degree (Engineering, Medicine, Law, Agri)</option>
                  <option value="Integrated degree">Integrated 5-Year Master Degree</option>
                  <option value="Postgraduate">Postgraduate (Master’s)</option>
                </optgroup>
                <optgroup label="Completed Education">
                  <option value="Completed UG">Completed UG (Seeking Master’s / Research)</option>
                  <option value="Completed PG">Completed PG (Seeking PhD / Postdoc / Fellowship)</option>
                </optgroup>
                <optgroup label="Doctoral & Advanced Research">
                  <option value="PhD">PhD (Doctoral Research Scholar)</option>
                  <option value="Junior Research Fellowship">Junior Research Fellowship (JRF)</option>
                  <option value="Senior Research Fellowship">Senior Research Fellowship (SRF)</option>
                  <option value="Postdoctoral research">Postdoctoral Research</option>
                </optgroup>
              </select>
            </div>

            {/* Course & Current Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                  Course / Discipline
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech / M.Sc / History"
                  value={profile.courseName}
                  onChange={(e) => handleFieldChange('courseName', e.target.value)}
                  className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                  Year of Study
                </label>
                <select
                  value={profile.courseYear}
                  onChange={(e) => handleFieldChange('courseYear', e.target.value)}
                  className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year / Fresh Entry</option>
                  <option value="2nd Year">2nd Year / Lateral Entry</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Completed">Degree Completed</option>
                </select>
              </div>
            </div>

            {/* Research & Entrance Exam Fields (Conditional for Completed / Research stages) */}
            {isResearchOrCompletedStage && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-3">
                <div className="flex items-center gap-1.5 font-serif text-[14px] font-bold text-blue-950">
                  <Award size={16} className="text-blue-700" />
                  Research & Competitive Eligibility Criteria
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-blue-900 mb-1">
                    PhD Registration Status
                  </label>
                  <select
                    value={profile.phdAdmissionStatus || ''}
                    onChange={(e) => handleFieldChange('phdAdmissionStatus', e.target.value as any)}
                    className="w-full rounded-lg border border-blue-300 bg-white px-3 py-1.5 font-sans text-[13px] text-[#2b2118] outline-none"
                  >
                    <option value="">Select admission status...</option>
                    <option value="Enrolled / Registered">Enrolled / Registered Full-Time in University</option>
                    <option value="Applied / Awaiting Admission">Applied / Awaiting Admission</option>
                    <option value="Not Enrolled">Not Enrolled</option>
                  </select>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-blue-900">
                    National Qualifying Exams Cleared:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[12px] text-blue-950">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.hasUgcNetJrf || false}
                        onChange={(e) => handleFieldChange('hasUgcNetJrf', e.target.checked)}
                        className="rounded accent-[#8c2f39]"
                      />
                      <span>UGC-NET / JRF Qualified</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.hasCsirNetJrf || false}
                        onChange={(e) => handleFieldChange('hasCsirNetJrf', e.target.checked)}
                        className="rounded accent-[#8c2f39]"
                      />
                      <span>CSIR-NET / JRF Qualified</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.hasGate || false}
                        onChange={(e) => handleFieldChange('hasGate', e.target.checked)}
                        className="rounded accent-[#8c2f39]"
                      />
                      <span>GATE Qualified</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.hasIcarExam || false}
                        onChange={(e) => handleFieldChange('hasIcarExam', e.target.checked)}
                        className="rounded accent-[#8c2f39]"
                      />
                      <span>ICAR-AICE / AIEEA Qualified</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Marks */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Previous Qualifying Marks (% or CGPA out of 10 converted)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="e.g. 78.5"
                value={profile.academicPercentage !== null ? profile.academicPercentage : ''}
                onChange={(e) => {
                  const val = e.target.value ? parseFloat(e.target.value) : null;
                  handleFieldChange('academicPercentage', val);
                }}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              />
            </div>

            {/* Income Range */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Annual Family Income (From All Sources) *
              </label>
              <select
                value={profile.incomeRange}
                onChange={(e) => handleFieldChange('incomeRange', e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="">Select income range...</option>
                <option value="Below ₹1 lakh">Below ₹1,00,000 / year (Antyodaya / BPL)</option>
                <option value="₹1–2.5 lakh">₹1,00,000 to ₹2,50,000 / year (Standard TN Welfare Ceiling)</option>
                <option value="₹2.5–5 lakh">₹2,50,000 to ₹5,00,000 / year</option>
                <option value="₹5–8 lakh">₹5,00,000 to ₹8,00,000 / year (EWS / Central Top-Class Ceiling)</option>
                <option value="Above ₹8 lakh">Above ₹8,00,000 / year</option>
              </select>
            </div>

            {/* Community Category */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                Community / Reservation Category *
              </label>
              <select
                value={profile.communityCategory}
                onChange={(e) => handleFieldChange('communityCategory', e.target.value)}
                className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
              >
                <option value="">Select category...</option>
                <option value="BC">BC (Backward Classes)</option>
                <option value="BCM">BCM (Backward Classes Muslim)</option>
                <option value="MBC">MBC (Most Backward Classes)</option>
                <option value="DNC">DNC (Denotified Communities)</option>
                <option value="SC">SC (Scheduled Castes)</option>
                <option value="SC(A)">SC(A) (Arunthathiyar)</option>
                <option value="ST">ST (Scheduled Tribes)</option>
                <option value="SCC">SCC (Scheduled Caste Converted Christians)</option>
                <option value="Minorities">Religious Minorities (Christian, Muslim, Sikh, Jain, etc.)</option>
                <option value="General">General / Open Competition</option>
              </select>
            </div>

            {/* District & Domicile */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                  Home District (TN)
                </label>
                <select
                  value={profile.district}
                  onChange={(e) => handleFieldChange('district', e.target.value)}
                  className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                >
                  <option value="">Select district</option>
                  {tnDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => handleFieldChange('gender', e.target.value)}
                  className="w-full rounded-xl border border-[#d8c7ad] bg-white px-3 py-2 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#8c2f39]"
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>
            </div>

            {/* Specific Scheme Qualifications Checkbox List */}
            <div className="rounded-xl border border-[#efe3cc] bg-[#fbf5e9] p-3.5 space-y-2 text-[13px]">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a6a5a]">
                Special Criteria Eligibility:
              </span>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.studiedInTnGovtSchool}
                  onChange={(e) => handleFieldChange('studiedInTnGovtSchool', e.target.checked)}
                  className="rounded accent-[#8c2f39]"
                />
                <span className="text-[#2b2118]">
                  Studied Class 6 to 12 in TN Government School (Pudhumai Penn / Tamil Pudhalvan)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.isFirstGenerationGraduate}
                  onChange={(e) => handleFieldChange('isFirstGenerationGraduate', e.target.checked)}
                  className="rounded accent-[#8c2f39]"
                />
                <span className="text-[#2b2118]">
                  First Generation Graduate in Family (TN Free Education / Fee Waiver)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasDisability}
                  onChange={(e) => handleFieldChange('hasDisability', e.target.checked)}
                  className="rounded accent-[#8c2f39]"
                />
                <span className="text-[#2b2118]">
                  Person with Benchmark Disability (PwD 40%+ UDID)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.isSingleGirlChild}
                  onChange={(e) => handleFieldChange('isSingleGirlChild', e.target.checked)}
                  className="rounded accent-[#8c2f39]"
                />
                <span className="text-[#2b2118]">
                  Single Girl Child (Only daughter in family)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
                  Smart Match Results ({reports.length} Schemes Analyzed)
                </h3>
                <p className="font-sans text-[12px] text-[#7a6a5a]">
                  Rule-based transparent evaluations based on your active inputs.
                </p>
              </div>

              <button
                onClick={onSwitchToRecommendations}
                className="inline-flex items-center gap-1 font-sans text-[12px] font-bold text-[#8c2f39] hover:underline"
              >
                <span>View Ranked Recommendations</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#efe3cc]">
              <button
                onClick={() => setFilterResult('All')}
                className={`rounded-lg px-2.5 py-1 font-sans text-[12px] font-semibold transition ${
                  filterResult === 'All'
                    ? 'bg-[#8c2f39] text-white'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] hover:bg-[#f6ede0]'
                }`}
              >
                All ({reports.length})
              </button>
              <button
                onClick={() => setFilterResult('POTENTIALLY ELIGIBLE')}
                className={`rounded-lg px-2.5 py-1 font-sans text-[12px] font-semibold transition ${
                  filterResult === 'POTENTIALLY ELIGIBLE'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Potentially Eligible ({potentiallyCount})
              </button>
              <button
                onClick={() => setFilterResult('MORE INFORMATION REQUIRED')}
                className={`rounded-lg px-2.5 py-1 font-sans text-[12px] font-semibold transition ${
                  filterResult === 'MORE INFORMATION REQUIRED'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                More Info Needed ({moreInfoCount})
              </button>
              <button
                onClick={() => setFilterResult('DOES NOT MEET CONFIRMED CONDITIONS')}
                className={`rounded-lg px-2.5 py-1 font-sans text-[12px] font-semibold transition ${
                  filterResult === 'DOES NOT MEET CONFIRMED CONDITIONS'
                    ? 'bg-stone-700 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Does Not Match ({mismatchCount})
              </button>
              <button
                onClick={() => setFilterResult('SCHEME REQUIRES VERIFICATION')}
                className={`rounded-lg px-2.5 py-1 font-sans text-[12px] font-semibold transition ${
                  filterResult === 'SCHEME REQUIRES VERIFICATION'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                }`}
              >
                Needs Verification ({needVerificationCount})
              </button>
            </div>
          </div>

          {/* Scheme Result Cards */}
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
            {filteredReports.map((rep) => {
              const isHigh = rep.status === 'POTENTIALLY ELIGIBLE';
              const isInfo = rep.status === 'MORE INFORMATION REQUIRED';
              const isMismatch = rep.status === 'DOES NOT MEET CONFIRMED CONDITIONS';

              return (
                <div
                  key={rep.program.id}
                  className={`rounded-2xl border p-5 transition shadow-xs ${
                    isHigh
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : isInfo
                      ? 'border-amber-300 bg-amber-50/20'
                      : isMismatch
                      ? 'border-[#efe3cc] bg-[#fdfbf6] opacity-80'
                      : 'border-blue-300 bg-blue-50/20'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded-full bg-[#f6ede0] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#8c2f39]">
                          {rep.program.category}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-sans text-[11px] font-bold inline-flex items-center gap-1 ${
                            isHigh
                              ? 'bg-emerald-100 text-emerald-900'
                              : isInfo
                              ? 'bg-amber-100 text-amber-900'
                              : isMismatch
                              ? 'bg-stone-200 text-stone-700'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {isHigh && <CheckCircle2 size={13} />}
                          {isInfo && <HelpCircle size={13} />}
                          {isMismatch && <XCircle size={13} />}
                          {rep.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-[17px] font-bold text-[#2b2118]">
                        {rep.program.name}
                      </h4>
                      <p className="font-sans text-[12px] text-[#7a6a5a]">{rep.program.provider}</p>
                    </div>

                    <span className="font-mono text-[10px] text-stone-500">
                      Cycle: {rep.academicYear}
                    </span>
                  </div>

                  {/* Exact Reasons Breakdown */}
                  <div className="mt-3 space-y-2 text-[12px]">
                    {/* Satisfied */}
                    {rep.satisfiedConditions.length > 0 && (
                      <div className="rounded-lg bg-emerald-100/60 p-2.5 text-emerald-950">
                        <span className="font-bold block mb-1">Criteria you meet:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {rep.satisfiedConditions.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Failed / Disqualifiers */}
                    {rep.failedConditions.length > 0 && (
                      <div className="rounded-lg bg-stone-100 p-2.5 text-stone-800">
                        <span className="font-bold block mb-1">Unmet conditions:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {rep.failedConditions.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Missing Information */}
                    {rep.missingInformation.length > 0 && (
                      <div className="rounded-lg bg-amber-100/70 p-2.5 text-amber-950">
                        <span className="font-bold block mb-1">Details to confirm:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {rep.missingInformation.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#efe3cc]">
                    <button
                      onClick={() => onViewDetails(rep.program)}
                      className="font-sans text-[12px] font-bold text-[#8c2f39] hover:underline"
                    >
                      View Full Details →
                    </button>

                    {onApplyOfficial && (
                      <button
                        onClick={() => onApplyOfficial(rep.program)}
                        className="inline-flex items-center gap-1 text-[12px] font-bold text-[#8c2f39] hover:underline"
                      >
                        <span>Apply on Official Website</span>
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
