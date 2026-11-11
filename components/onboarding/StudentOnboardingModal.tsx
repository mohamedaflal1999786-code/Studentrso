'use client';

import { useState, useEffect, useRef } from 'react';
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
  Camera,
  Trash2,
} from 'lucide-react';
import { UserProfileData } from '@/lib/auth-service';
import { useAuth } from '@/lib/auth-context';
import { validateImageFile, processAvatarFile } from '@/lib/image-utils';

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
  const [gender, setGender] = useState<'Male' | 'Female' | 'Transgender' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Chennai');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Step B: Educational Information
  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [course, setCourse] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [institutionName, setInstitutionName] = useState('');
  const [graduationYear, setGraduationYear] = useState<number | ''>('');
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
      if (p.gender) setGender(p.gender as any);
      if (p.avatar_url) setAvatarUrl(p.avatar_url);
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
    { title: 'Basic Information', icon: User, code: '1' },
    { title: 'Educational Background', icon: GraduationCap, code: '2' },
    { title: 'Study Interests', icon: BookOpen, code: '3' },
    { title: 'Career Goals', icon: Briefcase, code: '4' },
    { title: 'Scholarship Eligibility', icon: Award, code: '5' },
    { title: 'Learning Preferences', icon: Compass, code: '6' },
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
        gender,
        avatar_url: avatarUrl ? avatarUrl : null,
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
      if (typeof window !== 'undefined' && window.location.search.includes('onboarding=')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
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
              src="/images/student-rso-emblem.jpg"
              alt="Student RSO Emblem"
              width={51}
              height={40}
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
            STEP 1: BASIC INFORMATION
        ======================================================== */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 1: Basic Information</h3>
              <p className="text-xs text-[#7a6a5a]">Confirm your verified identity and domicile in Tamil Nadu.</p>
            </div>

            {/* Profile Picture Uploader (Max 2MB) */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#f6ede0]/60 border border-[#efe3cc]">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAvatarError('');
                  const validation = validateImageFile(file);
                  if (!validation.valid) {
                    setAvatarError(validation.error || 'Please select an image under 2MB.');
                    if (avatarInputRef.current) avatarInputRef.current.value = '';
                    return;
                  }
                  setUploadingAvatar(true);
                  try {
                    const dataUrl = await processAvatarFile(file);
                    setAvatarUrl(dataUrl);
                  } catch (err) {
                    setAvatarError(err instanceof Error ? err.message : 'Failed to process photo.');
                  } finally {
                    setUploadingAvatar(false);
                    if (avatarInputRef.current) avatarInputRef.current.value = '';
                  }
                }}
              />
              <div className="relative group shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Preview"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8c2f39] shadow-xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#d8c7ad] flex items-center justify-center text-[#7a6a5a]">
                    <User size={24} />
                  </div>
                )}
                <button
                  type="button"
                  disabled={uploadingAvatar}
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#8c2f39] text-white hover:bg-[#6d1824] shadow-xs cursor-pointer"
                  title="Upload profile picture (Max 2MB)"
                >
                  {uploadingAvatar ? <Loader2 size={11} className="animate-spin" /> : <Camera size={11} />}
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-[#2b2118]">Profile Picture</span>
                <span className="block text-[11px] text-[#7a6a5a]">Max 2MB • JPG, PNG, WEBP</span>
                {avatarError ? (
                  <span className="block text-[11px] font-semibold text-red-600 mt-0.5">{avatarError}</span>
                ) : avatarUrl ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <button
                      type="button"
                      disabled={uploadingAvatar}
                      onClick={() => avatarInputRef.current?.click()}
                      className="text-[11px] font-mono font-bold text-[#8c2f39] hover:underline cursor-pointer"
                    >
                      Change Photo
                    </button>
                    <span className="text-[#efe3cc]">•</span>
                    <button
                      type="button"
                      disabled={uploadingAvatar}
                      onClick={() => setAvatarUrl('')}
                      className="text-[11px] font-mono font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Trash2 size={11} />
                      <span>Delete</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={uploadingAvatar}
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-[11px] font-mono font-bold text-[#8c2f39] hover:underline mt-0.5 cursor-pointer block"
                  >
                    Upload Profile Picture (Max 2MB)
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2b2118] mb-1">Gender (Used for Scheme Matching)</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] focus:ring-2 focus:ring-[#8c2f39]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender / Other</option>
                </select>
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
                  placeholder="Enter 10-digit mobile number"
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
            STEP 2: EDUCATIONAL BACKGROUND
        ======================================================== */}
        {/* ========================================================
            STEP 2: EDUCATIONAL BACKGROUND (DYNAMIC ADAPTIVE FOR SCHOOL, DIPLOMA, UG, PG, FINISHED)
        ======================================================== */}
        {currentStep === 1 && (() => {
          const isSchool =
            educationLevel === 'Class 10' ||
            educationLevel === 'Class 11' ||
            educationLevel === 'Class 12' ||
            educationLevel === 'Class 11-12' ||
            educationLevel.includes('Class') ||
            educationLevel.includes('School');

          const isDiploma = educationLevel === 'Diploma';
          const isGraduated = educationLevel === 'Completed Studies';

          return (
            <div className="space-y-4">
              <div className="border-b border-[#efe3cc] pb-2">
                <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 2: Educational Background</h3>
                <p className="text-xs text-[#7a6a5a]">
                  {isSchool
                    ? 'School information used to match Tamil Nadu board schemes, Pudhumai Penn/Tamil Pudhalvan, and entrance tests.'
                    : isDiploma
                    ? 'Polytechnic & trade details used to match lateral entry, state apprenticeships, and scholarships.'
                    : isGraduated
                    ? 'Completed degree details used to match competitive examinations (TNPSC, UPSC, GATE) and employment tracks.'
                    : 'College & degree details used to match eligible scholarships, exams, internships, and single-window admissions.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Education Level Selector */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    Current Education Level / Student Category
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => {
                      const newLevel = e.target.value;
                      setEducationLevel(newLevel);
                      if (newLevel.includes('Class 10')) {
                        if (!course) setCourse('Tamil Nadu State Board (English Medium)');
                        if (!specialization) setSpecialization('Class 10 (SSLC All Subjects)');
                        if (!academicYear) setAcademicYear('Currently Studying');
                      } else if (newLevel.includes('Class 11') || newLevel.includes('Class 12')) {
                        if (!course) setCourse('Tamil Nadu State Board (English Medium)');
                        if (!academicYear) setAcademicYear('Currently Studying');
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118] font-medium"
                  >
                    <optgroup label="School Education">
                      <option value="Class 10">Class 10 (Secondary / SSLC)</option>
                      <option value="Class 11">Class 11 (Higher Secondary - 1st Year)</option>
                      <option value="Class 12">Class 12 (Higher Secondary - 2nd Year)</option>
                    </optgroup>
                    <optgroup label="Vocational & Diploma">
                      <option value="Diploma">Diploma / Polytechnic / ITI</option>
                    </optgroup>
                    <optgroup label="Higher Education">
                      <option value="Undergraduate">Undergraduate (B.E. / B.Tech / B.Sc / B.Com / B.A. / MBBS / Law)</option>
                      <option value="Postgraduate">Postgraduate (M.E. / M.Tech / M.Sc / MBA / MCA / M.Com)</option>
                      <option value="PhD / Research">PhD / Doctoral Research Fellow</option>
                    </optgroup>
                    <optgroup label="Completed Studies">
                      <option value="Completed Studies">Completed Studies / Competitive Exam Aspirant</option>
                    </optgroup>
                  </select>
                </div>

                {/* 2. School / College / Institution Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    {isSchool
                      ? 'School Name'
                      : isDiploma
                      ? 'Polytechnic / ITI Institution Name'
                      : isGraduated
                      ? 'College / University Graduated From'
                      : 'Institution / College Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder={
                      isSchool
                        ? 'Enter school name'
                        : isDiploma
                        ? 'Enter polytechnic or ITI institution name'
                        : isGraduated
                        ? 'Enter college or university graduated from'
                        : 'Enter college or institution name'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                  />
                </div>

                {/* 3. Program / Board */}
                <div>
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    {isSchool
                      ? 'School Board & Medium'
                      : isDiploma
                      ? 'Diploma Course / ITI Trade'
                      : isGraduated
                      ? 'Highest Degree Completed'
                      : 'Course / Degree Program'}
                  </label>
                  {isSchool ? (
                    <select
                      value={course || 'Tamil Nadu State Board (English Medium)'}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    >
                      <option value="Tamil Nadu State Board (English Medium)">Tamil Nadu State Board (English Medium)</option>
                      <option value="Tamil Nadu State Board (Tamil Medium)">Tamil Nadu State Board (Tamil Medium)</option>
                      <option value="CBSE (Central Board)">CBSE (Central Board)</option>
                      <option value="ICSE / ISC">ICSE / ISC</option>
                      <option value="Matriculation Board">Matriculation Board</option>
                      <option value="Other Recognized Board">Other Recognized Board</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder={
                        isDiploma
                          ? 'Enter diploma course or ITI trade'
                          : isGraduated
                          ? 'Enter degree completed'
                          : 'Enter course or degree program'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    />
                  )}
                </div>

                {/* 4. Stream / Department / Specialization */}
                <div>
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    {isSchool
                      ? educationLevel === 'Class 10'
                        ? 'Standard'
                        : 'Higher Secondary Stream / Group'
                      : isDiploma
                      ? 'Branch / Department'
                      : isGraduated
                      ? 'Target Career / Exam Goal'
                      : 'Specialization / Department'}
                  </label>
                  {isSchool && educationLevel === 'Class 10' ? (
                    <input
                      type="text"
                      disabled
                      value="Class 10 (SSLC All Subjects)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#efe3cc] bg-gray-50 text-sm text-[#7a6a5a]"
                    />
                  ) : isSchool ? (
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    >
                      <option value="">Select Higher Secondary Group...</option>
                      <option value="Bio-Maths (Physics, Chemistry, Biology, Mathematics)">Group 1: Bio-Maths (Physics, Chemistry, Biology, Maths)</option>
                      <option value="Computer-Maths (Physics, Chemistry, Maths, Computer Science)">Group 2: Comp-Maths (Physics, Chemistry, Maths, CS)</option>
                      <option value="Pure Science (Physics, Chemistry, Botany, Zoology)">Group 3: Pure Science (Physics, Chemistry, Botany, Zoology)</option>
                      <option value="Commerce with Business Mathematics">Group 4: Commerce with Business Maths & Accountancy</option>
                      <option value="Commerce with Computer Applications">Group 5: Commerce with Computer Applications</option>
                      <option value="Arts / Humanities / History">Group 6: Arts / Humanities / History</option>
                      <option value="Vocational Stream">Vocational Stream</option>
                    </select>
                  ) : isGraduated ? (
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    >
                      <option value="">Select Target Aspiration...</option>
                      <option value="TNPSC / State Civil Services Aspirant">TNPSC / State Public Service Exams</option>
                      <option value="UGC-NET / CSIR / Research Fellow">UGC-NET / CSIR JRF / Research</option>
                      <option value="GATE / Postgraduate Engineering">GATE / Higher Studies Entrance</option>
                      <option value="Banking / SSC / Railways Exams">Banking / SSC / RRB Exams</option>
                      <option value="Placement / Industry IT & Core Employment">Industry Placement & Core Employment</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Enter department or specialization"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    />
                  )}
                </div>

                {/* 5. Current Academic Year / Status */}
                <div>
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    {isSchool ? 'Current Academic Status' : 'Current Academic Year'}
                  </label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                  >
                    {isSchool ? (
                      <>
                        <option value="Currently Studying">Currently Studying</option>
                        <option value="Appearing for Board Exams (2026)">Appearing for Board Exams (2026)</option>
                        <option value="Passed / Awaiting Admissions">Passed / Awaiting College Admissions</option>
                      </>
                    ) : isDiploma ? (
                      <>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year (Final Year)</option>
                        <option value="Graduated">Completed / Passed Out</option>
                      </>
                    ) : isGraduated ? (
                      <>
                        <option value="Graduated">Graduated / Passed Out</option>
                        <option value="Full-time Aspirant">Full-time Exam Aspirant</option>
                        <option value="Employed & Upskilling">Employed & Upskilling</option>
                      </>
                    ) : (
                      <>
                        <option value="1st Year">1st Year / Fresher</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year">Final Year</option>
                        <option value="Graduated">Graduated / Alumnus</option>
                      </>
                    )}
                  </select>
                </div>

                {/* 6. Board Exam / Passing / Graduation Year (NO sticky default!) */}
                <div>
                  <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                    {isSchool
                      ? 'Board Exam / Completion Year'
                      : isGraduated
                      ? 'Year of Graduation / Passing'
                      : 'Expected Graduation Year'}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={graduationYear}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '');
                      setGraduationYear(clean ? parseInt(clean, 10) : '');
                    }}
                    placeholder="YYYY"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                  />
                  <span className="block text-[10px] text-[#7a6a5a] mt-0.5">
                    Enter the 4-digit year (leave empty or type your year)
                  </span>
                </div>

                {/* 7. Academic Performance: Percentage for School, CGPA/% for Higher Ed */}
                {isSchool ? (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#2b2118] mb-1">
                      Marks Percentage (%) (Previous Class / Term Exam)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={academicPercentage}
                      onChange={(e) => setAcademicPercentage(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      placeholder="Percentage (%)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                    />
                    <span className="block text-[10px] text-[#7a6a5a] mt-0.5">
                      Enter your overall percentage out of 100%
                    </span>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#2b2118] mb-1">Academic CGPA (out of 10)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        placeholder="CGPA (out of 10.0)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2b2118] mb-1">Percentage Equivalent (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={academicPercentage}
                        onChange={(e) => setAcademicPercentage(e.target.value === '' ? '' : parseFloat(e.target.value))}
                        placeholder="Percentage (%)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-sm text-[#2b2118]"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}

        {/* ========================================================
            STEP 3: STUDY INTERESTS
        ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 3: Study Interests</h3>
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
            STEP 4: CAREER GOALS
        ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 4: Career Interests</h3>
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
            STEP 5: SCHOLARSHIP & FINANCIAL ELIGIBILITY INDICATORS
        ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 5: Scholarship & Financial Eligibility</h3>
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
            STEP 6: LEARNING PREFERENCES
        ======================================================== */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="border-b border-[#efe3cc] pb-2">
              <h3 className="font-serif font-bold text-base text-[#2b2118]">Step 6: Learning Preferences</h3>
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
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#efe3cc] flex-wrap gap-2.5">
          {currentStep > 0 ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 rounded-xl border border-[#d8c7ad] bg-white text-xs font-semibold text-[#2b2118] hover:bg-[#f6ede0] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              disabled={busy}
              onClick={handleSaveAndComplete}
              className="px-4 py-2.5 rounded-xl border-2 border-[#8c2f39] text-[#8c2f39] bg-white hover:bg-[#f6ede0] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-2xs"
              title="Save current details to your profile"
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
              <span>Save Details</span>
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
                className="px-5 py-2.5 rounded-xl bg-[#8c2f39] text-white text-xs font-bold hover:bg-[#6d1824] shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                <span>Save & Complete Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
