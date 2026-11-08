'use client';

import { useState, useEffect } from 'react';
import {
  X,
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { UserProfileData } from '@/lib/auth-service';
import { useAuth } from '@/lib/auth-context';

const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
  'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
  'Nagapattinam', 'Kanniyakumari', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
  'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli',
  'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
  'Viluppuram', 'Virudhunagar'
];

const STUDY_INTERESTS_OPTIONS = [
  'Engineering & Technology',
  'Medical & Health Sciences',
  'Arts, Humanities & Social Sciences',
  'Pure Sciences & Research',
  'Commerce, Management & Finance',
  'Agriculture & Veterinary',
  'Law & Public Policy',
  'Vocational & Skill Trades',
];

const CAREER_INTERESTS_OPTIONS = [
  'Higher Education & Competitive Exams',
  'Government & Civil Services',
  'Private Sector Employment',
  'Entrepreneurship & Startups',
  'Research & Academic Careers',
  'Internships & Apprenticeships',
];

const LEARNING_PREFERENCES_OPTIONS = [
  'Finding Scholarships',
  'Preparing for Competitive Examinations',
  'College Admissions',
  'Skill Building & Internships',
  'Official Government Certificates',
  'Digital Safety & Rights',
];

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  initialProfile?: Partial<UserProfileData> | null;
}

export function StudentOnboardingModal({ open, onClose, onSaved, initialProfile }: OnboardingModalProps) {
  const { user, profile, refresh } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  // Step A: Basic Information
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Chennai');

  // Step B: Educational Information
  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [course, setCourse] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [institutionName, setInstitutionName] = useState('');
  const [graduationYear, setGraduationYear] = useState<number>(new Date().getFullYear() + 2);
  const [academicPercentage, setAcademicPercentage] = useState<number | ''>('');
  const [cgpa, setCgpa] = useState<number | ''>('');

  // Step C: Study Interests
  const [studyInterests, setStudyInterests] = useState<string[]>([]);

  // Step D: Career Interests
  const [careerInterests, setCareerInterests] = useState<string[]>([]);

  // Step E: Financial & Statutory Criteria
  const [familyIncome, setFamilyIncome] = useState('Below ₹2,50,000');
  const [communityCategory, setCommunityCategory] = useState('General');
  const [studiedInGovtSchool, setStudiedInGovtSchool] = useState(false);
  const [isFirstGraduate, setIsFirstGraduate] = useState(false);
  const [isSingleGirlChild, setIsSingleGirlChild] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);

  // Step F: Learning Preferences
  const [learningPreferences, setLearningPreferences] = useState<string[]>([
    'Finding Scholarships',
    'Preparing for Competitive Examinations',
  ]);

  useEffect(() => {
    const p = initialProfile || profile;
    if (p) {
      if (p.full_name) setFullName(p.full_name);
      if (p.phone) setPhone(p.phone);
      if (p.date_of_birth) setDob(p.date_of_birth);
      if (p.state) setState(p.state);
      if (p.district) setDistrict(p.district);
      if (p.education_level) setEducationLevel(p.education_level);
      if (p.course) setCourse(p.course);
      if (p.specialization) setSpecialization(p.specialization);
      if (p.academic_year) setAcademicYear(p.academic_year);
      if (p.institution_name) setInstitutionName(p.institution_name);
      if (p.graduation_year) setGraduationYear(p.graduation_year);
      if (typeof p.academic_percentage === 'number') setAcademicPercentage(p.academic_percentage);
      if (typeof p.cgpa === 'number') setCgpa(p.cgpa);
      if (p.annual_family_income) setFamilyIncome(p.annual_family_income);
      if (p.community_category) setCommunityCategory(p.community_category);
      if (typeof p.studied_in_tn_govt_school === 'boolean') setStudiedInGovtSchool(p.studied_in_tn_govt_school);
      if (typeof p.is_first_graduate === 'boolean') setIsFirstGraduate(p.is_first_graduate);
      if (typeof p.is_single_girl_child === 'boolean') setIsSingleGirlChild(p.is_single_girl_child);
      if (typeof p.has_disability === 'boolean') setHasDisability(p.has_disability);
      if (Array.isArray(p.study_interests) && p.study_interests.length > 0) setStudyInterests(p.study_interests);
      if (Array.isArray(p.career_interests) && p.career_interests.length > 0) setCareerInterests(p.career_interests);
      if (Array.isArray(p.learning_preferences) && p.learning_preferences.length > 0) setLearningPreferences(p.learning_preferences);
    }
  }, [initialProfile, profile]);

  if (!open) return null;

  const STEPS = [
    { title: 'Basic Information', icon: User, code: 'A' },
    { title: 'Educational Background', icon: GraduationCap, code: 'B' },
    { title: 'Study Interests', icon: BookOpen, code: 'C' },
    { title: 'Career Goals', icon: Briefcase, code: 'D' },
    { title: 'Scholarship Eligibility', icon: Award, code: 'E' },
    { title: 'Learning Preferences', icon: Compass, code: 'F' },
  ];

  function toggleArrayItem(currentList: string[], item: string, setter: (val: string[]) => void) {
    if (currentList.includes(item)) {
      setter(currentList.filter((i) => i !== item));
    } else {
      setter([...currentList, item]);
    }
  }

  async function handleSaveAndComplete() {
    setBusy(true);
    setErrorMsg('');

    try {
      const payload: Partial<UserProfileData> = {
        full_name: fullName.trim(),
        phone: phone.trim() || undefined,
        date_of_birth: dob || undefined,
        state,
        district,
        education_level: educationLevel,
        course,
        specialization,
        academic_year: academicYear,
        institution_name: institutionName,
        graduation_year: typeof graduationYear === 'number' ? graduationYear : undefined,
        academic_percentage: typeof academicPercentage === 'number' ? academicPercentage : undefined,
        cgpa: typeof cgpa === 'number' ? cgpa : undefined,
        annual_family_income: familyIncome,
        community_category: communityCategory,
        studied_in_tn_govt_school: studiedInGovtSchool,
        is_first_graduate: isFirstGraduate,
        is_single_girl_child: isSingleGirlChild,
        has_disability: hasDisability,
        study_interests: studyInterests,
        career_interests: careerInterests,
        learning_preferences: learningPreferences,
        onboarding_completed: true,
      };

      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save onboarding details.');
      }

      await refresh();
      onClose();
      if (onSaved) onSaved();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error completing onboarding.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#fdfbf6] rounded-3xl border border-[#efe3cc] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#efe3cc] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <img
              src="/images/student-rso-emblem.png"
              alt="Student RSO Emblem"
              className="h-10 w-auto object-contain shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-[#2b2118]">Student Onboarding</span>
                <span className="text-[10px] font-mono uppercase bg-[#cfa052]/20 text-[#8c2f39] px-2 py-0.5 rounded font-bold">
                  Step {currentStep + 1} of 6
                </span>
              </div>
              <p className="text-xs text-[#7a6a5a]">
                Tailor your scholarship matches, entrance exams & opportunity recommendations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#f6ede0] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator Badges */}
        <div className="grid grid-cols-6 gap-1.5 mb-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const active = idx === currentStep;
            const completed = idx < currentStep;
            return (
              <button
                key={step.code}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
                  active
                    ? 'bg-[#8c2f39] text-white shadow-xs'
                    : completed
                    ? 'bg-[#f6ede0] text-[#8c2f39] border border-[#d8c7ad]'
                    : 'bg-white text-[#a09080] border border-[#efe3cc]'
                }`}
              >
                <Icon size={16} />
                <span className="text-[10px] font-mono font-bold mt-1">{step.code}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            STEP A: BASIC INFORMATION
        ======================================================== */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step A: Basic Information</h3>
              <p className="text-xs text-[#7a6a5a]">Confirm your verified identity and domicile in Tamil Nadu.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Ramanathan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Registered Email (Verified)</label>
                <input
                  type="email"
                  disabled
                  value={profile?.email || user?.email || 'student@studentrso.in'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#efe3cc] bg-gray-100 text-sm text-[#7a6a5a] cursor-not-allowed font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Contact Phone (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">District (Tamil Nadu)</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                >
                  {TN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP B: EDUCATIONAL BACKGROUND
        ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step B: Educational Background</h3>
              <p className="text-xs text-[#7a6a5a]">Used to match eligible scholarship tiers, exams and entrance tests.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Current Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                >
                  <option value="Class 10">Class 10 Secondary</option>
                  <option value="Class 11-12">Class 11–12 Higher Secondary</option>
                  <option value="Diploma">Diploma / Polytechnic</option>
                  <option value="Undergraduate">Undergraduate (B.E./B.Tech/B.Sc/B.Com/B.A.)</option>
                  <option value="Postgraduate">Postgraduate (M.E./M.Tech/M.Sc/MBA/MCA)</option>
                  <option value="PhD / Research">PhD / Doctoral Research Fellow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Course / Degree Program</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. B.E. Computer Science and Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Specialization / Department</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Artificial Intelligence & Data Systems"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Current Academic Year</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                >
                  <option value="1st Year">1st Year / Fresher</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Graduated">Graduated / Alumnus</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Institution / College Name</label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="e.g. Anna University, CEG Campus, Chennai"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Graduation Year</label>
                <input
                  type="number"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(parseInt(e.target.value) || 2026)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Academic CGPA (out of 10) or %</label>
                <input
                  type="number"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCgpa(parseFloat(e.target.value) || '')}
                  placeholder="e.g. 8.9"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP C: STUDY INTERESTS
        ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step C: Study Interests</h3>
              <p className="text-xs text-[#7a6a5a]">Select your fields of intellectual interest and target research areas.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STUDY_INTERESTS_OPTIONS.map((field) => {
                const selected = studyInterests.includes(field);
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() => toggleArrayItem(studyInterests, field, setStudyInterests)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                      selected
                        ? 'bg-[#8c2f39] text-white border-[#8c2f39] shadow-xs'
                        : 'bg-white text-[#2b2118] border-[#d8c7ad] hover:bg-[#f6ede0]'
                    }`}
                  >
                    <span>{field}</span>
                    {selected && <CheckCircle2 size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP D: CAREER GOALS
        ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step D: Career Interests</h3>
              <p className="text-xs text-[#7a6a5a]">What are your post-study ambitions and career pathways?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CAREER_INTERESTS_OPTIONS.map((c) => {
                const selected = careerInterests.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleArrayItem(careerInterests, c, setCareerInterests)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                      selected
                        ? 'bg-[#8c2f39] text-white border-[#8c2f39] shadow-xs'
                        : 'bg-white text-[#2b2118] border-[#d8c7ad] hover:bg-[#f6ede0]'
                    }`}
                  >
                    <span>{c}</span>
                    {selected && <CheckCircle2 size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            STEP E: SCHOLARSHIP & FINANCIAL ELIGIBILITY INDICATORS
        ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step E: Scholarship & Financial Eligibility</h3>
              <p className="text-xs text-[#7a6a5a]">
                Statutory indicators used to match Pudhumai Penn, Tamil Pudhalvan, First Graduate and Central welfare schemes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Annual Family Income</label>
                <select
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                >
                  <option value="Below ₹1,00,000">Below ₹1,00,000 / year</option>
                  <option value="Below ₹2,50,000">Below ₹2,50,000 / year (Standard Scheme Cap)</option>
                  <option value="₹2,50,000 to ₹5,00,000">₹2,50,000 to ₹5,00,000 / year</option>
                  <option value="₹5,00,000 to ₹8,00,000">₹5,00,000 to ₹8,00,000 / year (OBC/EWS Cap)</option>
                  <option value="Above ₹8,00,000">Above ₹8,00,000 / year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Community Category</label>
                <select
                  value={communityCategory}
                  onChange={(e) => setCommunityCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                >
                  <option value="OC">OC (Open Competition / General)</option>
                  <option value="BC">BC (Backward Classes)</option>
                  <option value="BCM">BCM (Backward Classes Muslim)</option>
                  <option value="MBC/DNC">MBC / DNC (Most Backward Classes & Denotified)</option>
                  <option value="SC">SC (Scheduled Castes)</option>
                  <option value="SCA">SCA (Scheduled Castes Arunthathiyar)</option>
                  <option value="ST">ST (Scheduled Tribes)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#d8c7ad] bg-white cursor-pointer hover:bg-[#f6ede0] transition">
                <input
                  type="checkbox"
                  checked={studiedInGovtSchool}
                  onChange={(e) => setStudiedInGovtSchool(e.target.checked)}
                  className="w-4 h-4 text-[#8c2f39] rounded accent-[#8c2f39]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2b2118]">Studied in Tamil Nadu Government School (Classes 6 to 12)</p>
                  <p className="text-[11px] text-[#7a6a5a]">
                    Qualifies for Pudhumai Penn / Tamil Pudhalvan (₹1,000/mo) and 7.5% preferential admission.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#d8c7ad] bg-white cursor-pointer hover:bg-[#f6ede0] transition">
                <input
                  type="checkbox"
                  checked={isFirstGraduate}
                  onChange={(e) => setIsFirstGraduate(e.target.checked)}
                  className="w-4 h-4 text-[#8c2f39] rounded accent-[#8c2f39]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2b2118]">First Graduate in Family</p>
                  <p className="text-[11px] text-[#7a6a5a]">
                    Qualifies for Tamil Nadu First Graduate tuition fee concession.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#d8c7ad] bg-white cursor-pointer hover:bg-[#f6ede0] transition">
                <input
                  type="checkbox"
                  checked={isSingleGirlChild}
                  onChange={(e) => setIsSingleGirlChild(e.target.checked)}
                  className="w-4 h-4 text-[#8c2f39] rounded accent-[#8c2f39]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2b2118]">Single Girl Child</p>
                  <p className="text-[11px] text-[#7a6a5a]">
                    Eligible for CBSE Single Girl Child and Indira Gandhi PG scholarships.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#d8c7ad] bg-white cursor-pointer hover:bg-[#f6ede0] transition">
                <input
                  type="checkbox"
                  checked={hasDisability}
                  onChange={(e) => setHasDisability(e.target.checked)}
                  className="w-4 h-4 text-[#8c2f39] rounded accent-[#8c2f39]"
                />
                <div className="text-xs">
                  <p className="font-semibold text-[#2b2118]">Differently-Abled Student (PwD / 40%+)</p>
                  <p className="text-[11px] text-[#7a6a5a]">
                    Unlocks Saksham scholarship and 5% statutory educational reservation.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP F: LEARNING PREFERENCES
        ======================================================== */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step F: Learning Preferences</h3>
              <p className="text-xs text-[#7a6a5a]">Customize which portal modules prioritize alerts on your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LEARNING_PREFERENCES_OPTIONS.map((item) => {
                const selected = learningPreferences.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayItem(learningPreferences, item, setLearningPreferences)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                      selected
                        ? 'bg-[#8c2f39] text-white border-[#8c2f39] shadow-xs'
                        : 'bg-white text-[#2b2118] border-[#d8c7ad] hover:bg-[#f6ede0]'
                    }`}
                  >
                    <span>{item}</span>
                    {selected && <CheckCircle2 size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
            {errorMsg}
          </div>
        )}

        {/* Navigation & Submission Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#efe3cc]">
          <button
            type="button"
            disabled={currentStep === 0 || busy}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-xs font-semibold text-[#2b2118] hover:bg-[#f6ede0] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={handleSaveAndComplete}
              className="px-6 py-2.5 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Building Dashboard...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Save and Create My Student Dashboard</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
