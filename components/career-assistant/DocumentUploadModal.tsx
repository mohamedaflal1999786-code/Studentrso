// components/career-assistant/DocumentUploadModal.tsx
'use client';

import { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  FileCheck2,
  AlertCircle,
  Loader2,
  CheckCircle,
  FileSearch,
  ArrowRight
} from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentLoaded: (docName: string, docText: string) => void;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  onDocumentLoaded,
}: DocumentUploadModalProps) {
  const [docType, setDocType] = useState('Admission Notification');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const docTypes = [
    'Admission Notification',
    'Examination Brochure / Rules',
    'Syllabus & Blueprint Document',
    'Previous Year Question Paper',
    'Student Resume / CV Draft',
    'Academic Marksheet Summary',
    'Other Educational Notice',
  ];

  function handleFileChange(files: FileList | null) {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size exceeds 10MB limit. Please choose a smaller file.');
        return;
      }
      setSelectedFile(file);
      setErrorMsg('');
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      setErrorMsg('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentType', docType);

      const res = await fetch('/api/career-assistant/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload document');
      }

      onDocumentLoaded(data.fileName, data.extractedContent);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#fdfbf6] text-[#2b2118] border border-[#efe3cc] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#efe3cc] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8c2f39]/10 text-[#8c2f39] flex items-center justify-center">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#8c2f39]">
                Upload Document for Analysis
              </h3>
              <p className="text-xs text-[#7a6a5a]">
                Analyze eligibility, dates, and instructions from official notices or notes
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

        <div className="mt-5 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              1. Document Classification
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#8c2f39]/30"
            >
              {docTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a5a] mb-1.5">
              2. Select or Drop File (PDF, TXT, MD, Images up to 10MB)
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFileChange(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-[#8c2f39] bg-[#8c2f39]/5'
                  : selectedFile
                  ? 'border-emerald-500 bg-emerald-50/40'
                  : 'border-[#efe3cc] bg-white hover:border-[#8c2f39]/40 hover:bg-[#fbf5e9]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md,.json,image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />

              {selectedFile ? (
                <>
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-[#2b2118]">{selectedFile.name}</span>
                  <span className="text-[11px] text-[#7a6a5a]">
                    {(selectedFile.size / 1024).toFixed(1)} KB — Click to change file
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-[#8c2f39] mb-1" />
                  <span className="text-xs font-bold text-[#2b2118]">
                    Click to browse or drop file here
                  </span>
                  <span className="text-[11px] text-[#7a6a5a]">
                    Admission brochures, notifications, question papers, or resumes
                  </span>
                </>
              )}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-3 border-t border-[#efe3cc] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-[#efe3cc] text-[#2b2118] hover:bg-[#fbf5e9] transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedFile || isUploading}
              onClick={handleUpload}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Analyze Document <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
