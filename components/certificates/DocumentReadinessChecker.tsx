'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Check,
  X,
  Plus,
} from 'lucide-react';
import {
  evaluateDocumentReadiness,
  EducationStage,
  ReadinessInputs,
  ReadinessRequirement,
  ALL_DOCUMENTS,
  DocumentItem,
} from '@/lib/certificates-data';

interface DocumentReadinessCheckerProps {
  onOpenDocModal: (doc: DocumentItem) => void;
  onNavigateTab: (tabId: string) => void;
}

export function DocumentReadinessChecker({
  onOpenDocModal,
  onNavigateTab,
}: DocumentReadinessCheckerProps) {
  // Input states
  const [educationLevel, setEducationLevel] = useState<EducationStage>('Class 12');
  const [purpose, setPurpose] = useState<ReadinessInputs['purpose']>('College admission');
  const [hasReservationClaim, setHasReservationClaim] = useState<boolean>(true);
  const [requiresIncomeCert, setRequiresIncomeCert] = useState<boolean>(true);
  const [requiresNativityCert, setRequiresNativityCert] = useState<boolean>(true);
  const [hasDisabilityBenefit, setHasDisabilityBenefit] = useState<boolean>(false);
  const [isFirstGraduateClaim, setIsFirstGraduateClaim] = useState<boolean>(false);
  const [isFreshAdmission, setIsFreshAdmission] = useState<boolean>(true);

  // Evaluated results
  const [requirements, setRequirements] = useState<ReadinessRequirement[]>([]);
  const [userCollectedMap, setUserCollectedMap] = useState<Record<string, boolean>>({});

  // Run evaluation
  const runEvaluation = () => {
    const inputs: ReadinessInputs = {
      educationLevel,
      purpose,
      hasReservationClaim,
      requiresIncomeCert,
      requiresNativityCert,
      hasDisabilityBenefit,
      isFirstGraduateClaim,
      isFreshAdmission,
    };
    const results = evaluateDocumentReadiness(inputs);
    setRequirements(results);

    // Initialize collected status from memory if not already set
    const initialMap: Record<string, boolean> = { ...userCollectedMap };
    results.forEach((r) => {
      if (initialMap[r.documentId] === undefined) {
        initialMap[r.documentId] = false;
      }
    });
    setUserCollectedMap(initialMap);
  };

  useEffect(() => {
    runEvaluation();
  }, [
    educationLevel,
    purpose,
    hasReservationClaim,
    requiresIncomeCert,
    requiresNativityCert,
    hasDisabilityBenefit,
    isFirstGraduateClaim,
    isFreshAdmission,
  ]);

  const toggleCollected = (docId: string) => {
    setUserCollectedMap((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const totalRequired = requirements.length;
  const mandatoryReqs = requirements.filter((r) => r.isMandatory);
  const collectedCount = requirements.filter((r) => userCollectedMap[r.documentId]).length;
  const mandatoryCollectedCount = mandatoryReqs.filter((r) => userCollectedMap[r.documentId]).length;

  const scorePercentage =
    totalRequired > 0 ? Math.round((collectedCount / totalRequired) * 100) : 0;

  const getDocItem = (docId: string): DocumentItem | undefined => {
    return ALL_DOCUMENTS.find((d) => d.id === docId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-5 sm:p-6 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider text-[#8c2f39] bg-[#8c2f39]/10 border border-[#8c2f39]/20 mb-1.5">
          <FileCheck size={12} /> HIGH-PRIORITY READINESS ENGINE
        </div>
        <h2 className="font-serif text-[22px] font-bold text-[#2b2118]">
          Student Document Readiness Checker
        </h2>
        <p className="font-sans text-[13px] text-[#7a6a5a]">
          Cross-evaluates education stages against specific student milestones. Check off what you possess to view your readiness percentage and instant procurement links for missing documents.
        </p>
      </div>

      {/* Input Configuration Panel */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs space-y-5">
        <h3 className="font-serif text-[17px] font-bold text-[#2b2118]">
          Step 1: Configure Your Scenario
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stage */}
          <div>
            <label className="block font-sans text-[12px] font-semibold text-[#5c4a3a] mb-1.5">
              Current Education Level
            </label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value as EducationStage)}
              className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[13px] text-[#2b2118] focus:outline-none focus:ring-1 focus:ring-[#8c2f39] focus:border-[#8c2f39]"
            >
              <option value="Class 10">Class 10 (SSLC)</option>
              <option value="Class 11">Class 11 (+1)</option>
              <option value="Class 12">Class 12 (+2)</option>
              <option value="ITI">ITI / Vocational</option>
              <option value="Diploma">Diploma</option>
              <option value="Polytechnic">Polytechnic</option>
              <option value="Undergraduate">Undergraduate (UG)</option>
              <option value="Postgraduate">Postgraduate (PG)</option>
              <option value="Completed Postgraduate">Completed Postgraduate / Graduate</option>
              <option value="Research Scholar">Ph.D / Research Scholar</option>
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block font-sans text-[12px] font-semibold text-[#5c4a3a] mb-1.5">
              Specific Purpose / Milestone
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as ReadinessInputs['purpose'])}
              className="w-full bg-white border border-[#efe3cc] rounded-xl px-3 py-2 font-sans text-[13px] text-[#2b2118] focus:outline-none focus:ring-1 focus:ring-[#8c2f39] focus:border-[#8c2f39]"
            >
              <option value="College admission">College Admission &amp; Counseling</option>
              <option value="Undergraduate admission">Undergraduate (UG) Degree Admission</option>
              <option value="Postgraduate admission">Postgraduate (PG) Admission</option>
              <option value="Diploma admission">Diploma / Polytechnic Admission</option>
              <option value="Scholarship application">Scholarship Application (State / NSP)</option>
              <option value="Competitive examination">Competitive Examination (TNPSC / UPSC)</option>
              <option value="Government job application">Government Job Application</option>
              <option value="Private employment">Private Sector Employment</option>
              <option value="Internship">Internship &amp; Apprenticeship</option>
              <option value="Higher education abroad">Study Abroad (Passport &amp; Attestation)</option>
              <option value="Fellowship">Fellowship Disbursement</option>
              <option value="Research admission">Ph.D Research Admission</option>
            </select>
          </div>
        </div>

        {/* Checkbox filters */}
        <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-[#efe3cc]">
          <label className="flex items-center gap-2 font-sans text-[12px] text-[#2b2118] cursor-pointer">
            <input
              type="checkbox"
              checked={hasReservationClaim}
              onChange={(e) => setHasReservationClaim(e.target.checked)}
              className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
            />
            <span>BC / MBC / SC / ST Reservation</span>
          </label>

          <label className="flex items-center gap-2 font-sans text-[12px] text-[#2b2118] cursor-pointer">
            <input
              type="checkbox"
              checked={requiresIncomeCert}
              onChange={(e) => setRequiresIncomeCert(e.target.checked)}
              className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
            />
            <span>Income Certificate (Fee Concession / Scholarship)</span>
          </label>

          <label className="flex items-center gap-2 font-sans text-[12px] text-[#2b2118] cursor-pointer">
            <input
              type="checkbox"
              checked={requiresNativityCert}
              onChange={(e) => setRequiresNativityCert(e.target.checked)}
              className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
            />
            <span>Nativity Proof (Tamil Nadu Domicile)</span>
          </label>

          <label className="flex items-center gap-2 font-sans text-[12px] text-[#2b2118] cursor-pointer">
            <input
              type="checkbox"
              checked={isFirstGraduateClaim}
              onChange={(e) => setIsFirstGraduateClaim(e.target.checked)}
              className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
            />
            <span>First Graduate in Family</span>
          </label>

          <label className="flex items-center gap-2 font-sans text-[12px] text-[#2b2118] cursor-pointer">
            <input
              type="checkbox"
              checked={hasDisabilityBenefit}
              onChange={(e) => setHasDisabilityBenefit(e.target.checked)}
              className="rounded text-[#8c2f39] focus:ring-[#8c2f39]"
            />
            <span>Benchmark Disability (UDID)</span>
          </label>
        </div>
      </div>

      {/* Results Header with Score Meter */}
      <div className="rounded-2xl border border-[#efe3cc] bg-[#fdfbf6] p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="font-mono text-[10px] font-bold text-[#8c2f39] uppercase tracking-wider">
              EVALUATED READINESS SCORE
            </span>
            <span
              className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                scorePercentage >= 80
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : scorePercentage >= 50
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {scorePercentage >= 80 ? 'Highly Prepared' : scorePercentage >= 50 ? 'In Progress' : 'Action Required'}
            </span>
          </div>
          <h3 className="font-serif text-[24px] font-bold text-[#2b2118]">
            {collectedCount} of {totalRequired} Documents Ready
          </h3>
          <p className="font-sans text-[13px] text-[#7a6a5a]">
            Mandatory Documents: <strong className="text-emerald-800 font-semibold">{mandatoryCollectedCount} / {mandatoryReqs.length}</strong> collected.
          </p>
        </div>

        {/* Circular / Bar meter */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-[#8c2f39] flex items-center justify-center bg-white shadow-2xs">
            <div className="text-center">
              <span className="font-serif text-[22px] font-bold text-[#8c2f39]">{scorePercentage}%</span>
              <span className="block font-mono text-[9px] text-[#7a6a5a] uppercase font-bold">Ready</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                const allTrue: Record<string, boolean> = {};
                requirements.forEach((r) => (allTrue[r.documentId] = true));
                setUserCollectedMap(allTrue);
              }}
              className="block w-full px-3 py-1.5 rounded-lg bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9] font-sans text-[12px] font-semibold transition shadow-2xs"
            >
              Mark All Ready
            </button>
            <button
              onClick={() => {
                const allFalse: Record<string, boolean> = {};
                requirements.forEach((r) => (allFalse[r.documentId] = false));
                setUserCollectedMap(allFalse);
              }}
              className="block w-full px-3 py-1.5 rounded-lg bg-white border border-[#efe3cc] text-[#7a6a5a] hover:bg-[#fbf5e9] font-sans text-[12px] transition shadow-2xs"
            >
              Clear Marks
            </button>
          </div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        <h4 className="font-serif text-[17px] font-bold text-[#2b2118] flex items-center justify-between">
          <span>Required Document Checklist &amp; Actions ({requirements.length})</span>
          <span className="font-sans text-[12px] font-normal text-[#7a6a5a]">
            Click checkbox to mark as possessed
          </span>
        </h4>

        <div className="space-y-3">
          {requirements.map((req) => {
            const isCollected = !!userCollectedMap[req.documentId];
            const docItem = getDocItem(req.documentId);

            return (
              <div
                key={req.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCollected
                    ? 'bg-[#fbf5e9] border-emerald-300'
                    : req.isMandatory
                    ? 'bg-white border-[#efe3cc] shadow-2xs'
                    : 'bg-white border-[#efe3cc]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleCollected(req.documentId)}
                    className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center transition border ${
                      isCollected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-[#efe3cc] bg-white hover:border-[#8c2f39]'
                    }`}
                    aria-label={`Toggle collected for ${req.documentName}`}
                  >
                    {isCollected && <Check size={14} className="stroke-[3]" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-serif text-[15px] font-bold ${isCollected ? 'text-[#7a6a5a] line-through' : 'text-[#2b2118]'}`}>
                        {req.documentName}
                      </span>
                      {req.isMandatory ? (
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Mandatory
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Conditional
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-[12px] text-[#5c4a3a]">{req.reason}</p>

                    <div className="font-sans text-[11px] text-[#7a6a5a] flex flex-wrap items-center gap-3 pt-1">
                      <span>Authority: <strong className="text-[#2b2118]">{req.issuingAuthority}</strong></span>
                      <span>Validity: <strong className="text-[#2b2118]">{req.validityGuidance}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {docItem && (
                    <button
                      onClick={() => onOpenDocModal(docItem)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9] font-sans text-[12px] font-semibold transition shadow-2xs"
                    >
                      View Details
                    </button>
                  )}

                  <a
                    href={req.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#8c2f39] hover:bg-[#6d1824] text-white font-sans text-[12px] font-bold flex items-center gap-1 transition shadow-2xs"
                  >
                    Apply / Obtain <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
