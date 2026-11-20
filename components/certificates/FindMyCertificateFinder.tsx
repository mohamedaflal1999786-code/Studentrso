'use client';

import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Building,
  FileText,
} from 'lucide-react';
import {
  ALL_DOCUMENTS,
  DocumentItem,
  EducationStage,
} from '@/lib/certificates-data';
import { CertificateCard } from './CertificateCard';

interface FindMyCertificateFinderProps {
  onOpenDocModal: (doc: DocumentItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function FindMyCertificateFinder({
  onOpenDocModal,
  onNavigateTab,
}: FindMyCertificateFinderProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [stage, setStage] = useState<EducationStage>('Class 12');
  const [purpose, setPurpose] = useState<string>('college_admission');
  const [category, setCategory] = useState<string>('bc');
  const [specialCriteria, setSpecialCriteria] = useState<{
    firstGraduate: boolean;
    lowIncome: boolean;
    disability: boolean;
  }>({
    firstGraduate: false,
    lowIncome: true,
    disability: false,
  });
  const [domicile, setDomicile] = useState<string>('native_tn');

  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setHasEvaluated(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setHasEvaluated(false);
  };

  // Determine matched documents based on answers
  const getMatchedDocuments = () => {
    const essentialIds: string[] = [];
    const recommendedIds: string[] = [];

    // Core Identity
    essentialIds.push('id-aadhaar');

    // Stage specific educational documents
    if (stage === 'Class 10') {
      essentialIds.push('school-transfer-certificate');
    } else if (stage === 'Class 11' || stage === 'Class 12') {
      essentialIds.push('school-sslc-marksheet');
      essentialIds.push('school-transfer-certificate');
      if (purpose === 'college_admission') {
        essentialIds.push('school-hsc-marksheet');
      }
    } else if (stage === 'Diploma' || stage === 'Polytechnic' || stage === 'ITI') {
      essentialIds.push('diploma-consolidated-marksheet');
      essentialIds.push('diploma-provisional-certificate');
      essentialIds.push('school-sslc-marksheet');
    } else if (stage === 'Undergraduate') {
      essentialIds.push('ug-degree-certificate');
      essentialIds.push('ug-provisional-certificate');
      essentialIds.push('school-hsc-marksheet');
      essentialIds.push('school-sslc-marksheet');
    } else if (stage === 'Postgraduate' || stage === 'Completed Postgraduate' || stage === 'Research Scholar') {
      essentialIds.push('pg-degree-certificate');
      essentialIds.push('ug-degree-certificate');
      essentialIds.push('school-hsc-marksheet');
      if (stage === 'Research Scholar') {
        essentialIds.push('pg-research-registration');
      }
    }

    // Community Certificate
    if (category !== 'oc') {
      essentialIds.push('rev-101-community');
      if (purpose === 'upsc_central_exam' || purpose === 'central_scholarship') {
        essentialIds.push('rev-115-obc-ncl');
      }
    }

    // Nativity Certificate
    if (purpose === 'college_admission' || purpose === 'state_scholarship' || purpose === 'tnpsc_state_exam') {
      if (domicile === 'native_tn') {
        essentialIds.push('rev-102-nativity');
      } else {
        recommendedIds.push('rev-116-residence');
      }
    }

    // Income Certificate
    if (specialCriteria.lowIncome || purpose === 'state_scholarship' || purpose === 'central_scholarship') {
      essentialIds.push('rev-103-income');
    }

    // First Graduate
    if (specialCriteria.firstGraduate && (purpose === 'college_admission' || stage === 'Class 12')) {
      essentialIds.push('rev-104-first-graduate');
    }

    // Disability
    if (specialCriteria.disability) {
      essentialIds.push('disability-udid-card');
    }

    // PAN Card for jobs/stipends
    if (purpose === 'private_job' || purpose === 'internship_stipend') {
      essentialIds.push('id-pan');
    }

    // Passport for abroad
    if (purpose === 'abroad_higher_studies') {
      essentialIds.push('id-passport');
    }

    // Retrieve documents
    const essentialDocs = ALL_DOCUMENTS.filter((d) => essentialIds.includes(d.id));
    const recommendedDocs = ALL_DOCUMENTS.filter(
      (d) => recommendedIds.includes(d.id) && !essentialIds.includes(d.id)
    );

    return { essentialDocs, recommendedDocs };
  };

  const { essentialDocs, recommendedDocs } = getMatchedDocuments();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Header Bar */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d3e2e] bg-[#0d3e2e]/10 border border-[#0d3e2e]/20 mb-1.5">
            <Compass size={12} /> 5-STEP SMART DECISION ENGINE
          </div>
          <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
            Find My Required Certificate
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Answer 5 quick questions about your education stage and immediate goal to discover exactly which certificates you need.
          </p>
        </div>

        {hasEvaluated && (
          <button
            onClick={handleReset}
            className="rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] text-[#2b2118] px-3.5 py-2 font-sans text-[12px] font-semibold transition flex items-center gap-1.5 self-start shadow-2xs"
          >
            <RotateCcw size={14} /> Start Over
          </button>
        )}
      </div>

      {!hasEvaluated ? (
        <div className="max-w-2xl mx-auto rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 sm:p-8 shadow-xs">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#7a6a5a] mb-2 font-medium">
              <span>Question {currentStep} of 5</span>
              <span>{currentStep * 20}% Completed</span>
            </div>
            <div className="w-full h-2 bg-[#efe3cc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d3e2e] transition-all duration-300"
                style={{ width: `${currentStep * 20}%` }}
              />
            </div>
          </div>

          {/* Question 1: Stage */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                1. What is your current educational stage?
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Select your present schooling or graduation level.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'Class 10', label: 'Class 10 (SSLC)' },
                  { id: 'Class 11', label: 'Class 11 (Higher Secondary +1)' },
                  { id: 'Class 12', label: 'Class 12 (Higher Secondary +2)' },
                  { id: 'ITI', label: 'ITI / Vocational Training' },
                  { id: 'Diploma', label: 'Diploma / Polytechnic' },
                  { id: 'Undergraduate', label: 'Undergraduate Degree (Arts/Science/Engg)' },
                  { id: 'Postgraduate', label: 'Postgraduate Degree (Master’s)' },
                  { id: 'Research Scholar', label: 'Research Scholar (Ph.D / Postdoc)' },
                  { id: 'Completed Postgraduate', label: 'Graduated / Looking for Jobs' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStage(item.id as EducationStage)}
                    className={`p-3.5 rounded-xl border text-left font-sans text-[12px] font-semibold transition ${
                      stage === item.id
                        ? 'bg-[#0d3e2e]/10 border-[#0d3e2e] text-[#0d3e2e] shadow-2xs'
                        : 'bg-white border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Purpose */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                2. What is your immediate purpose?
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                What are you preparing these documents for?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'college_admission', label: 'College Admissions / TNEA / Counseling' },
                  { id: 'state_scholarship', label: 'Tamil Nadu State Scholarship / Umang' },
                  { id: 'central_scholarship', label: 'National Scholarship Portal (NSP)' },
                  { id: 'tnpsc_state_exam', label: 'TNPSC / State Govt Recruitment' },
                  { id: 'upsc_central_exam', label: 'UPSC / SSC / Central Govt Exams' },
                  { id: 'private_job', label: 'Private Job / IT Sector Joining' },
                  { id: 'abroad_higher_studies', label: 'Study Abroad (Passport & Attestation)' },
                  { id: 'first_graduate_benefit', label: 'First Graduate Fee Waiver Benefit' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPurpose(item.id)}
                    className={`p-3.5 rounded-xl border text-left font-sans text-[12px] font-semibold transition ${
                      purpose === item.id
                        ? 'bg-[#0d3e2e]/10 border-[#0d3e2e] text-[#0d3e2e] shadow-2xs'
                        : 'bg-white border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Category */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                3. What is your reservation category?
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Required to determine Community and OBC-NCL certificate prerequisites.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'bc', label: 'Backward Classes (BC / BCM)' },
                  { id: 'mbc', label: 'Most Backward Classes / Denotified Communities (MBC / DNC)' },
                  { id: 'sc', label: 'Scheduled Castes (SC / SCA)' },
                  { id: 'st', label: 'Scheduled Tribes (ST)' },
                  { id: 'oc', label: 'Open Category / General (OC)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left font-sans text-[12px] font-semibold transition flex items-center justify-between ${
                      category === item.id
                        ? 'bg-[#0d3e2e]/10 border-[#0d3e2e] text-[#0d3e2e] shadow-2xs'
                        : 'bg-white border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {category === item.id && <CheckCircle2 size={16} className="text-[#0d3e2e]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Special Criteria */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                4. Do any of these special conditions apply to you?
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Toggle all that apply to receive tailored certificate requirements.
              </p>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#efe3cc] cursor-pointer hover:bg-[#fbf5e9] transition">
                  <input
                    type="checkbox"
                    checked={specialCriteria.firstGraduate}
                    onChange={(e) =>
                      setSpecialCriteria({ ...specialCriteria, firstGraduate: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#0d3e2e] focus:ring-[#0d3e2e]"
                  />
                  <div className="font-sans text-[12px]">
                    <strong className="text-[#2b2118] block font-semibold">First Graduate in Family</strong>
                    <span className="text-[#7a6a5a]">Neither parents nor elder siblings have attained a graduate degree.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#efe3cc] cursor-pointer hover:bg-[#fbf5e9] transition">
                  <input
                    type="checkbox"
                    checked={specialCriteria.lowIncome}
                    onChange={(e) =>
                      setSpecialCriteria({ ...specialCriteria, lowIncome: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#0d3e2e] focus:ring-[#0d3e2e]"
                  />
                  <div className="font-sans text-[12px]">
                    <strong className="text-[#2b2118] block font-semibold">Annual Family Income ≤ ₹2.5 Lakhs (or ≤ ₹8 Lakhs for OBC-NCL)</strong>
                    <span className="text-[#7a6a5a]">Eligible for post-matric fee concessions or Central NCL benefits.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#efe3cc] cursor-pointer hover:bg-[#fbf5e9] transition">
                  <input
                    type="checkbox"
                    checked={specialCriteria.disability}
                    onChange={(e) =>
                      setSpecialCriteria({ ...specialCriteria, disability: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#0d3e2e] focus:ring-[#0d3e2e]"
                  />
                  <div className="font-sans text-[12px]">
                    <strong className="text-[#2b2118] block font-semibold">Person with Benchmark Disability (PwD)</strong>
                    <span className="text-[#7a6a5a]">Eligible for UDID Card, special reservation quotas, and fee remissions.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Question 5: Domicile */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-[18px] font-bold text-[#2b2118]">
                5. What is your domicile and schooling background?
              </h3>
              <p className="font-sans text-[12px] text-[#7a6a5a]">
                Helps evaluate between Nativity (REV-102) vs Residence (REV-116).
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    id: 'native_tn',
                    title: 'Born in Tamil Nadu & Studied in Tamil Nadu',
                    desc: 'Permanent roots and continuous schooling in Tamil Nadu (Nativity REV-102 applies).',
                  },
                  {
                    id: 'native_outside_study_tn',
                    title: 'Born Outside Tamil Nadu, but Studied in Tamil Nadu (Class 8 to 12)',
                    desc: 'May require Certificate of True Residence (REV-116) or parental domicile proof.',
                  },
                  {
                    id: 'native_tn_study_outside',
                    title: 'Tamil Nadu Native, but Studied Outside the State',
                    desc: 'Requires Nativity Certificate along with parents native origin documents.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDomicile(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left font-sans text-[12px] transition flex flex-col gap-1 ${
                      domicile === item.id
                        ? 'bg-[#0d3e2e]/10 border-[#0d3e2e] text-[#2b2118] shadow-2xs'
                        : 'bg-white border-[#efe3cc] text-[#5c4a3a] hover:bg-[#fbf5e9]'
                    }`}
                  >
                    <strong className="font-semibold text-[#2b2118]">{item.title}</strong>
                    <span className="text-[#7a6a5a] text-[11px]">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-[#efe3cc] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] text-[#2b2118] font-sans text-[12px] font-semibold transition flex items-center gap-1.5 shadow-2xs"
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans text-[13px] font-bold shadow-xs transition flex items-center gap-1.5"
            >
              {currentStep === 5 ? (
                <>
                  <Sparkles size={14} /> Show My Matched Documents
                </>
              ) : (
                <>
                  Next Step <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results */
        <div className="space-y-6 animate-fade-in">
          {/* Summary Banner */}
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-bold text-[#0d3e2e] uppercase tracking-wider block">
                PERSONALIZED MATCHED REPORT
              </span>
              <h3 className="font-serif text-[22px] font-bold text-[#2b2118] mt-1">
                You Require {essentialDocs.length} Essential Certificates
              </h3>
              <p className="font-sans text-[13px] text-[#7a6a5a] mt-1">
                Based on your stage ({stage}) and purpose ({purpose.replace(/_/g, ' ')}).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab('readiness')}
                className="px-4 py-2.5 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white font-sans font-bold text-[13px] transition shadow-xs"
              >
                Launch Document Readiness Checker
              </button>
            </div>
          </div>

          {/* Essential Documents Grid */}
          <div className="space-y-3">
            <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" /> Mandatory &amp; Essential ({essentialDocs.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {essentialDocs.map((doc) => (
                <CertificateCard
                  key={doc.id}
                  document={doc}
                  onOpenDocModal={onOpenDocModal}
                />
              ))}
            </div>
          </div>

          {/* Recommended / Conditional */}
          {recommendedDocs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center gap-2">
                <FileText size={16} className="text-amber-700" /> Conditional / Secondary ({recommendedDocs.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recommendedDocs.map((doc) => (
                  <CertificateCard
                    key={doc.id}
                    document={doc}
                    onOpenDocModal={onOpenDocModal}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
