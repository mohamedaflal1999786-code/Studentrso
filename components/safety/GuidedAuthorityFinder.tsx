'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  PhoneCall,
  RefreshCw,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  GuidedFinderInputs,
  GuidedFinderResult,
  evaluateSafetyAuthority,
  SafetyCategoryCode,
} from '@/lib/safety-data';

export function GuidedAuthorityFinder() {
  const [issueType, setIssueType] = useState<SafetyCategoryCode | 'unclear'>('ragging');
  const [incidentLocation, setIncidentLocation] = useState<'school' | 'college' | 'university' | 'hostel' | 'workplace' | 'online'>('college');
  const [immediateDanger, setImmediateDanger] = useState<boolean>(false);
  const [natureOrGround, setNatureOrGround] = useState<string>('General Student Grievance');
  const [isMinor, setIsMinor] = useState<boolean>(false);
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const inputs: GuidedFinderInputs = {
    issueType,
    incidentLocation,
    immediateDanger,
    natureOrGround,
    isMinor,
  };

  const result: GuidedFinderResult = evaluateSafetyAuthority(inputs);

  const handleReset = () => {
    setIssueType('ragging');
    setIncidentLocation('college');
    setImmediateDanger(false);
    setNatureOrGround('General Student Grievance');
    setIsMinor(false);
    setEvaluated(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#e0a526]">
          <Sparkles size={14} /> DECISION SUPPORT ENGINE
        </div>
        <h3 className="font-serif text-[24px] font-bold text-[#2b2118]">
          Guided Official Reporting Authority Finder
        </h3>
        <p className="font-sans text-[13px] text-[#7a6a5a] max-w-3xl leading-relaxed">
          Answer 5 quick, objective questions to identify the specific statutory reporting authority, official complaint
          portal, and emergency helpline tailored to your situation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Input Questions Form */}
        <div className="rounded-2xl border border-[#efe3cc] bg-white p-6 shadow-xs space-y-5">
          <h4 className="font-serif text-[18px] font-bold text-[#2b2118] pb-3 border-b border-[#efe3cc] flex items-center justify-between">
            <span>Student Assessment Questions</span>
            <button
              onClick={handleReset}
              className="font-sans text-[12px] font-semibold text-[#0d3e2e] hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw size={12} />
              <span>Reset</span>
            </button>
          </h4>

          {/* Q1: Issue Type */}
          <div className="space-y-1.5">
            <label className="font-sans text-[13px] font-bold text-[#2b2118] block">
              1. What type of issue are you facing?
            </label>
            <select
              value={issueType}
              onChange={(e) => {
                setIssueType(e.target.value as any);
                setEvaluated(true);
              }}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
            >
              <option value="ragging">Ragging / Senior Intimidation</option>
              <option value="bullying">Bullying / Peer Harassment</option>
              <option value="harassment">Harassment / Sexual or Gender Harassment</option>
              <option value="discrimination">Caste / Community / Disability Discrimination</option>
              <option value="staff-misconduct">Staff Misconduct / Certificate Withholding</option>
              <option value="threats-intimidation">Threats / Physical Intimidation</option>
              <option value="unfair-treatment">Unfair Academic / Examination Treatment</option>
              <option value="cyberbullying">Cyberbullying / Online Harassment / Scam</option>
              <option value="child-protection">Minor Protection / School Safety Issue</option>
              <option value="other-concerns">Hostel, Campus Welfare &amp; Public Grievance</option>
              <option value="unclear">Not sure / Unclear</option>
            </select>
          </div>

          {/* Q2: Location */}
          <div className="space-y-1.5">
            <label className="font-sans text-[13px] font-bold text-[#2b2118] block">
              2. Where is this incident taking place?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  ['college', 'College Campus'],
                  ['university', 'University'],
                  ['hostel', 'Hostel / Mess'],
                  ['school', 'School'],
                  ['online', 'Online / Social Media'],
                  ['workplace', 'Work / Internship'],
                ] as const
              ).map(([val, label]) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => {
                    setIncidentLocation(val);
                    setEvaluated(true);
                  }}
                  className={`rounded-lg border p-2 text-center font-sans text-[12px] font-semibold transition ${
                    incidentLocation === val
                      ? 'bg-[#0d3e2e] text-white border-[#0d3e2e]'
                      : 'bg-[#fbf5e9] text-[#7a6a5a] border-[#efe3cc] hover:bg-[#f6ede0]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Immediate Danger */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-red-50/60 border border-red-200">
            <label className="font-sans text-[13px] font-bold text-red-950 block">
              3. Is anyone in immediate physical danger right now?
            </label>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  setImmediateDanger(true);
                  setEvaluated(true);
                }}
                className={`flex-1 rounded-lg py-2 font-sans text-[13px] font-bold transition ${
                  immediateDanger
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-red-700 border border-red-200 hover:bg-red-100'
                }`}
              >
                Yes, Immediate Danger
              </button>
              <button
                type="button"
                onClick={() => {
                  setImmediateDanger(false);
                  setEvaluated(true);
                }}
                className={`flex-1 rounded-lg py-2 font-sans text-[13px] font-bold transition ${
                  !immediateDanger
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-white text-[#7a6a5a] border border-[#efe3cc] hover:bg-[#fbf5e9]'
                }`}
              >
                No Active Violence
              </button>
            </div>
          </div>

          {/* Q4: Specific Nature/Ground */}
          <div className="space-y-1.5">
            <label className="font-sans text-[13px] font-bold text-[#2b2118] block">
              4. Specific ground or context involved:
            </label>
            <select
              value={natureOrGround}
              onChange={(e) => {
                setNatureOrGround(e.target.value);
                setEvaluated(true);
              }}
              className="w-full rounded-xl border border-[#d8c7ad] bg-white p-2.5 font-sans text-[13px] text-[#2b2118] outline-none focus:border-[#0d3e2e]"
            >
              <option value="General Student Grievance">General Student / Campus Grievance</option>
              <option value="Caste Discrimination (SC/ST/BC)">Caste Discrimination / Atrocities (SC/ST/BC)</option>
              <option value="Gender Harassment / Sexual Misconduct">Gender Harassment / Sexual Misconduct</option>
              <option value="Disability Discrimination (PwD)">Disability Bias / Barrier Access (PwD)</option>
              <option value="State Welfare / State Government Hostel">State Welfare Hostel / TN State Directorate</option>
              <option value="Online Financial Cyber Fraud">Online Financial Fraud / Fake Fees / OTP Scam</option>
              <option value="Examination / Degree Issue">Examination Revaluation / Degree Withholding</option>
            </select>
          </div>

          {/* Q5: Minor Under 18 */}
          <div className="space-y-1.5">
            <label className="font-sans text-[13px] font-bold text-[#2b2118] block">
              5. Is the affected student below 18 years of age (Minor)?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMinor(true);
                  setEvaluated(true);
                }}
                className={`flex-1 rounded-lg py-2 font-sans text-[13px] font-semibold transition ${
                  isMinor
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] border border-[#efe3cc] hover:bg-[#f6ede0]'
                }`}
              >
                Yes (Below 18)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMinor(false);
                  setEvaluated(true);
                }}
                className={`flex-1 rounded-lg py-2 font-sans text-[13px] font-semibold transition ${
                  !isMinor
                    ? 'bg-[#0d3e2e] text-white shadow-xs'
                    : 'bg-[#fbf5e9] text-[#7a6a5a] border border-[#efe3cc] hover:bg-[#f6ede0]'
                }`}
              >
                No (18 or older)
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Assessment Results */}
        <div className="space-y-5">
          {result.isEmergency && (
            <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-red-700 font-mono text-[12px] font-bold uppercase">
                <AlertTriangle size={18} /> CRITICAL EMERGENCY PROTOCOL
              </div>
              <h4 className="font-serif text-[20px] font-bold text-red-950">
                Contact Emergency Police Services at 112
              </h4>
              <p className="font-sans text-[13px] text-red-900 leading-relaxed">
                {result.emergencyNotice}
              </p>
              <a
                href="tel:112"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 font-sans text-[14px] font-bold shadow-md transition"
              >
                <PhoneCall size={18} />
                <span>Call 112 Immediately</span>
              </a>
            </div>
          )}

          {/* Primary Recommended Authority Card */}
          <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#efe3cc]">
              <span className="font-mono text-[11px] font-bold uppercase text-[#0d3e2e] bg-[#f6ede0] px-3 py-1 rounded-full border border-[#d8c7ad]">
                RECOMMENDED OFFICIAL AUTHORITY
              </span>
              <span className="font-mono text-[10px] text-[#5e8b7e] font-semibold">
                Statutory Match
              </span>
            </div>

            <div>
              <h4 className="font-serif text-[22px] font-bold text-[#2b2118]">
                {result.primaryAuthority.name}
              </h4>
              <span className="font-mono text-[11px] text-[#e0a526] font-bold uppercase block mt-0.5">
                {result.primaryAuthority.classification}
              </span>
            </div>

            {/* Why This Authority Is Recommended */}
            <div className="rounded-xl bg-white border border-[#efe3cc] p-4 space-y-1.5 text-[13px]">
              <strong className="text-[#2b2118] font-serif block font-bold">
                Why this authority is recommended:
              </strong>
              <p className="font-sans text-[#554a3f] leading-relaxed">
                {result.reason}
              </p>
            </div>

            {/* Jurisdiction Note */}
            <div className="rounded-lg bg-[#fbf5e9] border border-[#efe3cc] p-3 text-[12px] font-sans text-[#7a6a5a]">
              <strong className="text-[#2b2118] font-semibold">Jurisdiction Scope: </strong>
              {result.jurisdictionNote}
            </div>

            {/* Recommended Steps */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[11px] font-bold uppercase text-[#2b2118] block">
                Recommended Procedural Steps:
              </span>
              <div className="space-y-1.5">
                {result.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[12px] text-[#554a3f]">
                    <CheckCircle2 size={14} className="text-[#5e8b7e] mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Official Action */}
            <div className="pt-3 border-t border-[#efe3cc] space-y-2">
              <a
                href={result.primaryAuthority.complaintUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d3e2e] hover:bg-[#08261c] text-white py-2.5 font-sans text-[13px] font-bold shadow-2xs transition"
              >
                <span>Access Official Complaint Page</span>
                <ExternalLink size={14} />
              </a>

              {result.relevantHelplines.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.relevantHelplines.map((hl, idx) => (
                    <a
                      key={idx}
                      href={hl.telUrl}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c7ad] bg-white px-3 py-1.5 font-mono text-[12px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0]"
                    >
                      <PhoneCall size={12} />
                      <span>{hl.name}: {hl.number}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Secondary Escalation Authority if available */}
          {result.secondaryEscalationAuthority && (
            <div className="rounded-xl border border-[#efe3cc] bg-white p-4 space-y-2 text-[12px]">
              <span className="font-mono text-[10px] font-bold uppercase text-[#7a6a5a] block">
                Secondary / Alternative Statutory Escalation:
              </span>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <strong className="text-[#2b2118] font-serif text-[14px] block font-bold">
                    {result.secondaryEscalationAuthority.name}
                  </strong>
                  <span className="font-sans text-[#7a6a5a]">
                    {result.secondaryEscalationAuthority.purpose}
                  </span>
                </div>
                <a
                  href={result.secondaryEscalationAuthority.complaintUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#fbf5e9] border border-[#d8c7ad] px-3 py-1.5 font-sans text-[12px] font-bold text-[#0d3e2e] hover:bg-[#f6ede0] shrink-0 inline-flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-3 text-center text-[11px] text-[#7a6a5a] font-sans">
            Disclaimer: This decision finder assists students in locating genuine authorities based on published regulations.
            It does not constitute legal counsel, does not determine legal jurisdiction conclusively, and does not automatically submit complaints.
          </div>
        </div>
      </div>
    </div>
  );
}
