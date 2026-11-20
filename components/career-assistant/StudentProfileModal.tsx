// components/career-assistant/StudentProfileModal.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  X,
  User,
  GraduationCap,
  BookOpen,
  Compass,
  Save,
  CheckCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { StudentProfile, EducationLevel } from '@/lib/ai/types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

export function StudentProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}: StudentProfileModalProps) {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const levels: EducationLevel[] = [
    'Class 10',
    'Class 11',
    'Class 12',
    'Diploma / Polytechnic',
    'ITI',
    'Undergraduate',
    'Postgraduate',
    'PhD / Research Scholar',
    'Graduate Job Seeker',
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  }

  function handleReset() {
    const empty: StudentProfile = {
      educationLevel: 'Undergraduate',
      currentCourse: '',
      streamOrSubject: '',
      institutionType: 'Government',
      state: 'Tamil Nadu',
      careerInterests: [],
      skills: [],
      educationGoals: '',
      preferredLearningStyle: 'Step-by-step',
    };
    setFormData(empty);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#efe3cc] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0d3e2e]/10 text-[#0d3e2e] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0d3e2e]">
                Student Learning Profile
              </h3>
              <p className="text-xs text-[#7a6a5a]">
                Optional personalization for tailored education and career guidance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7a6a5a] hover:text-[#2b2118] hover:bg-[#efe3cc]/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
          {/* Education Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              1. Current Education Stage
            </label>
            <select
              value={formData.educationLevel || 'Undergraduate'}
              onChange={(e) =>
                setFormData({ ...formData, educationLevel: e.target.value as EducationLevel })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Current Degree / Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                2. Degree / School Standard
              </label>
              <input
                type="text"
                placeholder="Enter degree or standard"
                value={formData.currentCourse || ''}
                onChange={(e) => setFormData({ ...formData, currentCourse: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                3. Stream / Core Subjects
              </label>
              <input
                type="text"
                placeholder="Enter stream or core subjects"
                value={formData.streamOrSubject || ''}
                onChange={(e) => setFormData({ ...formData, streamOrSubject: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
              />
            </div>
          </div>

          {/* Institution Type & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                4. Institution Type
              </label>
              <select
                value={formData.institutionType || 'Government'}
                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
              >
                <option value="Government">Government Institution</option>
                <option value="Government-Aided">Government-Aided College</option>
                <option value="Autonomous College">Autonomous College</option>
                <option value="Private University">Private / Deemed University</option>
                <option value="Other">Other Educational Setup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
                5. Home State
              </label>
              <input
                type="text"
                value={formData.state || 'Tamil Nadu'}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
              />
            </div>
          </div>

          {/* Preferred Learning Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              6. Preferred Explanation Style
            </label>
            <select
              value={formData.preferredLearningStyle || 'Step-by-step'}
              onChange={(e) =>
                setFormData({ ...formData, preferredLearningStyle: e.target.value as any })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            >
              <option value="Step-by-step">Step-by-Step with Sequential Steps</option>
              <option value="Visual & Examples">Concept-Driven with Practical Examples</option>
              <option value="Practical & Hands-on">Hands-On & Career Application Focused</option>
              <option value="Theoretical & Deep">Comprehensive Academic & Theoretical Depth</option>
            </select>
          </div>

          {/* Education Goals */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              7. Primary Goal
            </label>
            <input
              type="text"
              placeholder="Enter primary career or education goal"
              value={formData.educationGoals || ''}
              onChange={(e) => setFormData({ ...formData, educationGoals: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#0d3e2e]/30"
            />
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-3 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] flex items-start gap-2.5 text-[11px] text-[#7a6a5a]">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2b2118] block font-semibold">Strict Privacy Assurance</strong>
              Your profile is stored locally in your browser. It is never sold, shared with advertisers, or made accessible to other students.
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 pt-3 border-t border-[#efe3cc] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-xs font-semibold rounded-xl text-[#7a6a5a] hover:bg-[#efe3cc]/50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0d3e2e] text-white hover:bg-[#08261c] transition shadow-sm flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-300" /> Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
