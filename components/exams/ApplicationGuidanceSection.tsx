// components/exams/ApplicationGuidanceSection.tsx
'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle2, FileText, ArrowRight, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

export function ApplicationGuidanceSection() {
  const [activeStepTab, setActiveStepTab] = useState<'tnea' | 'medical' | 'tngasa' | 'polytechnic'>('tnea');

  const guidanceWorkflows = {
    tnea: {
      title: 'TNEA Engineering Single Window Counselling Process',
      authority: 'Directorate of Technical Education (DOTE), Tamil Nadu',
      portal: 'https://www.tneaonline.org/',
      summary: '100% online merit-based counselling without any written entrance test. Your Class 12 PCM marks are normalized to a cutoff of 200.',
      formula: 'Cutoff Calculation = Maths (out of 100) + [Physics / 2] (out of 50) + [Chemistry / 2] (out of 50) = 200 Marks Total',
      steps: [
        {
          step: '1. Online Registration & Profile Creation',
          desc: 'Visit tneaonline.org right after Class 12 results release. Register using a mobile number and email. Pay registration fee (₹500 for General/BC/MBC, ₹250 for SC/ST).',
        },
        {
          step: '2. Certificate Upload',
          desc: 'Upload scanned copies of Class 10 & 12 marksheets, Transfer Certificate, Permanent Community Certificate, Nativity Certificate (if applicable), and First Graduate certificate.',
        },
        {
          step: '3. Online Certificate Verification (TFC)',
          desc: 'TNEA Facilitation Centres (TFCs) verify documents online without requiring physical visits unless flagged for discrepancies.',
        },
        {
          step: '4. Random Number & Rank List Publication',
          desc: 'A unique 10-digit random number is generated as a tie-breaker. The overall and communal rank list is published in early July.',
        },
        {
          step: '5. Choice Filling (Four Rounds)',
          desc: 'Students are divided into 4 rounds based on general rank. Each round has 3 days for choice filling. You can add hundreds of college-branch choices in order of preference.',
        },
        {
          step: '6. Tentative Allotment & Confirmation',
          desc: 'Accept and Join, Accept and Upward, Decline and Upward, or Decline and Quit. If upgraded, higher choices in your submitted list will be evaluated in the next stage.',
        },
        {
          step: '7. Provisional Allotment & College Reporting',
          desc: 'Download your provisional allotment order and report to the allotted college within the stipulated deadline with original documents.',
        },
      ],
    },
    medical: {
      title: 'Tamil Nadu Medical Selection (MBBS / BDS Counselling)',
      authority: 'Directorate of Medical Education & Research (DMER), Tamil Nadu',
      portal: 'https://tnmedicalselection.net/',
      summary: '85% State Quota counselling across 38 Government Medical Colleges and Government Quota in Self-Financing Medical Colleges based on NEET UG score.',
      formula: 'Rank determined strictly by All India NEET UG score (out of 720). Separate merit lists published for Government Quota (92.5%) and Government School (7.5%) Quota.',
      steps: [
        {
          step: '1. Application Submission on Official DME Portal',
          desc: 'Apply online at tnmedicalselection.net with your NEET UG roll number and application number.',
        },
        {
          step: '2. In-Person Special Verification (For 7.5% Govt School & Special Categories)',
          desc: 'Physically disabled, sports quota, and government school 7.5% quota bonafide verification conducted by the Selection Committee.',
        },
        {
          step: '3. State Merit List Publication',
          desc: 'Overall rank list and 7.5% school rank lists released with category-wise cutoffs.',
        },
        {
          step: '4. Online Choice Filling & Locking',
          desc: 'Candidates select government and self-financing medical colleges in order of preference. Security deposit applicable for private colleges.',
        },
        {
          step: '5. Seat Allotment & Document Handover',
          desc: 'Download allotment order and submit original documents at the assigned college before the deadline.',
        },
      ],
    },
    tngasa: {
      title: 'TNGASA Government Arts & Science Online Admissions',
      authority: 'Directorate of Collegiate Education (TNDCE)',
      portal: 'https://tngasa.in/',
      summary: 'Single portal application for 164+ Tamil Nadu Government Arts & Science colleges. One application fee covers multiple colleges and programmes.',
      formula: 'Merit cutoff calculated out of 400 (4 core subjects excluding language) or subject-specific ranking depending on the applied major.',
      steps: [
        {
          step: '1. Single Online Application Form',
          desc: 'Register at tngasa.in. Pay ₹50 registration fee (₹2 for SC/ST). Fill personal, reservation, and marks details.',
        },
        {
          step: '2. College & Course Choice Selection',
          desc: 'Select preferred government colleges across your district or statewide. Add multiple departments (e.g. B.Sc Computer Science, B.Com, B.A. English) in one submission.',
        },
        {
          step: '3. College-Wise Rank List & Counselling Calls',
          desc: 'Each college publishes its own rank list based on student submissions. Counselling conducted in phase 1 (Special quota) and phase 2 (General merit).',
        },
        {
          step: '4. Direct Admission Confirmation',
          desc: 'Free tuition for girls, SC/ST, and Pudhumai Penn / Tamil Pudhalvan beneficiaries (₹1,000 monthly allowance automatically mapped).',
        },
      ],
    },
    polytechnic: {
      title: 'DOTE Government Polytechnic Single Window Process',
      authority: 'Directorate of Technical Education (DOTE)',
      portal: 'https://dte.tn.gov.in/',
      summary: 'Direct admission to 3-Year Diploma in Engineering following Class 10 (SSLC) or 2-Year Lateral Entry following Class 12 / ITI.',
      formula: 'Class 10 Total Marks (out of 500) converted directly to merit ranking.',
      steps: [
        {
          step: '1. Online Registration at dte.tn.gov.in',
          desc: 'Register online following SSLC results announcement. Enter Class 10 subject marks and community details.',
        },
        {
          step: '2. District Facilitation Centre Verification',
          desc: 'Certificates verified online by designated government polytechnic centres in every district.',
        },
        {
          step: '3. Single Window Seat Allotment',
          desc: 'Seat allotment issued according to communal quota. Annual tuition fee capped at ₹2,680 across all Tamil Nadu government polytechnics.',
        },
      ],
    },
  };

  const currentWorkflow = guidanceWorkflows[activeStepTab];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8c2f39]/10 text-[#8c2f39] border border-[#8c2f39]/20 font-mono text-[11px] font-bold mb-2">
            STEP-BY-STEP ADMISSION PLAYBOOK
          </div>
          <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#2b2118]">
            Tamil Nadu Counselling &amp; Admission Guidance
          </h2>
          <p className="font-sans text-[13px] text-[#7a6a5a] mt-1 max-w-3xl leading-relaxed">
            Understand how Tamil Nadu single-window admissions function, how merit cutoffs are computed, and how to navigate online choice filling without paying commercial brokers or commission agents.
          </p>
        </div>

        {/* Workflow Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#efe3cc] font-sans text-[12px]">
          <button
            onClick={() => setActiveStepTab('tnea')}
            className={`px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
              activeStepTab === 'tnea'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'bg-[#fbf5e9] text-[#2b2118] border border-[#efe3cc] hover:bg-[#f6ede0]'
            }`}
          >
            TNEA Engineering (BE/BTech)
          </button>
          <button
            onClick={() => setActiveStepTab('medical')}
            className={`px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
              activeStepTab === 'medical'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'bg-[#fbf5e9] text-[#2b2118] border border-[#efe3cc] hover:bg-[#f6ede0]'
            }`}
          >
            TN Medical Selection (MBBS/BDS)
          </button>
          <button
            onClick={() => setActiveStepTab('tngasa')}
            className={`px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
              activeStepTab === 'tngasa'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'bg-[#fbf5e9] text-[#2b2118] border border-[#efe3cc] hover:bg-[#f6ede0]'
            }`}
          >
            TNGASA Arts &amp; Science (164+ Govt Colleges)
          </button>
          <button
            onClick={() => setActiveStepTab('polytechnic')}
            className={`px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
              activeStepTab === 'polytechnic'
                ? 'bg-[#8c2f39] text-white shadow-xs'
                : 'bg-[#fbf5e9] text-[#2b2118] border border-[#efe3cc] hover:bg-[#f6ede0]'
            }`}
          >
            DOTE Polytechnic (Diploma)
          </button>
        </div>
      </div>

      {/* Selected Workflow Display */}
      <div className="rounded-2xl border border-[#efe3cc] bg-white p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#efe3cc]">
          <div>
            <h3 className="font-serif text-[20px] font-bold text-[#2b2118]">
              {currentWorkflow.title}
            </h3>
            <span className="text-[12px] font-sans text-[#7a6a5a]">
              Conducted by: <strong>{currentWorkflow.authority}</strong>
            </span>
          </div>

          <a
            href={currentWorkflow.portal}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold shadow-xs transition inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Open Official Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Formula / Cutoff Box */}
        <div className="p-4 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] space-y-1.5 text-[12px] font-sans">
          <span className="font-mono text-[11px] font-bold text-[#8c2f39] uppercase block">
            Official Cutoff &amp; Merit Formula:
          </span>
          <p className="font-mono font-semibold text-[#2b2118]">{currentWorkflow.formula}</p>
          <p className="text-[#5c4a3a] leading-relaxed pt-1">{currentWorkflow.summary}</p>
        </div>

        {/* Steps Progression */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif text-[16px] font-bold text-[#2b2118]">
            Sequential Application Procedure:
          </h4>
          <div className="space-y-3">
            {currentWorkflow.steps.map((st, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#efe3cc] bg-[#fdfbf6] hover:bg-white transition space-y-1 text-[12px] font-sans"
              >
                <div className="font-serif font-bold text-[14px] text-[#8c2f39]">
                  {st.step}
                </div>
                <p className="text-[#2b2118] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
