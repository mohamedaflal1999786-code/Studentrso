// components/career-assistant/ChatInterface.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Square,
  Sparkles,
  Paperclip,
  Copy,
  Check,
  RotateCcw,
  User,
  FileText,
  X,
  ExternalLink,
  Loader2,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { ChatMessage } from '@/lib/ai/types';
import { ApiStatusData } from '@/app/career-assistant/page';

interface AttachedDocument {
  name: string;
  content: string;
  size?: number;
  type?: string;
  isImage?: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (text: string, attachedDocContext?: string) => void;
  onStopStreaming: () => void;
  onRetryMessage: () => void;
  onNewChat: () => void;
  apiStatus?: ApiStatusData;
}

const STARTER_QUESTIONS = [
  'What career options are best after Class 12 Science?',
  'How can I prepare for government examinations?',
  'What scholarships are available for undergraduate students?',
  'Can I change my course after completing the first year of college?',
  'How do I become a civil servant or public administrator?',
  'What features are available on the Student RSO website?',
];

const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function ChatInterface({
  messages,
  isStreaming,
  onSendMessage,
  onStopStreaming,
  onRetryMessage,
  onNewChat,
  apiStatus,
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedDoc, setAttachedDoc] = useState<AttachedDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if ((!inputText.trim() && !attachedDoc) || isStreaming) return;

    const messageText = inputText.trim() || (attachedDoc ? `Please analyze the attached file: ${attachedDoc.name}` : '');
    const docContext = attachedDoc?.content;

    setInputText('');
    setAttachedDoc(null);
    setUploadError(null);

    onSendMessage(messageText, docContext);
  }

  function handleCopyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so the same file can be selected again if needed
    e.target.value = '';
    setUploadError(null);

    // Validate extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setUploadError(`Unsupported file format "${ext}". Supported formats are: Images (JPG, JPEG, PNG, WEBP), Documents (PDF, DOC, DOCX), and Presentations (PPT, PPTX).`);
      return;
    }

    // Validate file size (10 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the maximum 10 MB limit.`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/career-assistant/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to process document');
      }

      const isImg = ['jpg', 'jpeg', 'png', 'webp'].includes(ext.replace('.', ''));

      setAttachedDoc({
        name: data.fileName || file.name,
        content: data.extractedContent || '',
        size: data.fileSize || file.size,
        type: data.documentType,
        isImage: isImg,
      });
    } catch (err: any) {
      console.error('File upload error:', err);
      setUploadError(err.message || 'Error processing attachment. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  // Markdown rendering helper
  function renderMarkdownText(content: string) {
    const lines = content.split('\n');
    let inTable = false;
    let tableRows: string[][] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      // Table check
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        const cells = line
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        if (!cells.every((c) => c.match(/^:?-+:?$/))) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        inTable = false;
        if (tableRows.length > 0) {
          const header = tableRows[0];
          const body = tableRows.slice(1);
          elements.push(
            <div key={`table-${idx}`} className="my-3 overflow-x-auto rounded-xl border border-[#efe3cc] bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fbf5e9] text-[#2b2118] border-b border-[#efe3cc] font-bold">
                  <tr>
                    {header.map((h, i) => (
                      <th key={i} className="py-2.5 px-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe3cc]/50">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#fbf5e9]/40">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2 px-3 text-[#2b2118]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          tableRows = [];
        }
      }

      // Code blocks
      if (line.startsWith('```')) {
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={idx} className="font-serif text-base font-bold text-[#8c2f39] mt-3.5 mb-1.5">
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h3 key={idx} className="font-serif text-lg font-bold text-[#8c2f39] mt-4 mb-2">
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h2 key={idx} className="font-serif text-xl font-bold text-[#8c2f39] mt-5 mb-2.5">
            {line.replace('# ', '')}
          </h2>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-xs sm:text-sm text-[#2b2118] leading-relaxed my-0.5">
            {formatBold(line.slice(2))}
          </li>
        );
      } else if (line.match(/^\d+\.\s/)) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-xs sm:text-sm text-[#2b2118] leading-relaxed my-0.5">
            {formatBold(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={idx} className="my-3 border-[#efe3cc]" />);
      } else if (line.trim()) {
        elements.push(
          <p key={idx} className="text-xs sm:text-sm text-[#2b2118] leading-relaxed mb-2.5">
            {formatBold(line)}
          </p>
        );
      }
    });

    if (inTable && tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);
      elements.push(
        <div key="table-end" className="my-3 overflow-x-auto rounded-xl border border-[#efe3cc] bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fbf5e9] text-[#2b2118] border-b border-[#efe3cc] font-bold">
              <tr>
                {header.map((h, i) => (
                  <th key={i} className="py-2.5 px-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efe3cc]/50">
              {body.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#fbf5e9]/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 text-[#2b2118]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
  }

  function formatBold(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#2b2118]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8c2f39] underline font-semibold hover:text-[#6d1824] inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
      return part;
    });
  }

  const isConfigured = apiStatus ? apiStatus.status === 'READY' : true;

  return (
    <div className="flex-1 flex flex-col h-[78vh] min-h-[600px] bg-white rounded-2xl sm:rounded-3xl border border-[#efe3cc] shadow-2xs overflow-hidden font-sans">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.ppt,.pptx"
        className="hidden"
      />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#fdfbf6]/40">
        {messages.length === 0 ? (
          /* Welcome Section */
          <div className="max-w-3xl mx-auto space-y-6 pt-6 pb-8">
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#efe3cc] p-6 sm:p-8 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#8c2f39] text-white flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2b2118]">
                Your Education and Career Journey Starts Here.
              </h2>
              <p className="text-xs sm:text-sm text-[#7a6a5a] max-w-xl mx-auto leading-relaxed">
                Ask anything about your education, career, examinations, scholarships, admissions and future opportunities. Get clear, practical and reliable guidance.
              </p>
            </div>

            {/* Suggested Starter Questions */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[#7a6a5a] uppercase tracking-wider px-1">
                Suggested Questions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STARTER_QUESTIONS.map((question, qIdx) => (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => onSendMessage(question)}
                    className="p-3.5 rounded-xl border border-[#efe3cc] bg-white hover:bg-[#fbf5e9] hover:border-[#8c2f39]/50 text-left transition group cursor-pointer shadow-2xs"
                  >
                    <p className="text-xs sm:text-sm font-semibold text-[#2b2118] group-hover:text-[#8c2f39] transition">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Conversation Messages */
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#8c2f39] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-2xs transition ${
                    isUser
                      ? 'bg-[#8c2f39] text-white rounded-tr-sm'
                      : 'bg-white border border-[#efe3cc] text-[#2b2118] rounded-tl-sm'
                  }`}
                >
                  {isUser ? (
                    <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  ) : (
                    <div>
                      <div className="prose prose-sm max-w-none">
                        {renderMarkdownText(msg.content)}
                      </div>

                      {/* Bottom Message Actions */}
                      <div className="mt-3 pt-2.5 border-t border-[#efe3cc]/70 flex items-center justify-end text-[11px] text-[#7a6a5a]">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.content, msg.id)}
                            className="p-1 hover:text-[#8c2f39] transition flex items-center gap-1 cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-700" />
                                <span className="text-emerald-700 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={onRetryMessage}
                            className="p-1 hover:text-[#8c2f39] transition flex items-center gap-1 cursor-pointer"
                            title="Regenerate answer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retry</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-[#8c2f39] flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Streaming / Typing Indicator */}
        {isStreaming && (
          <div className="flex gap-3 items-center text-xs text-[#7a6a5a]">
            <div className="w-8 h-8 rounded-xl bg-[#8c2f39] text-white flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#efe3cc] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#8c2f39] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#8c2f39] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#8c2f39] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-serif text-[#8c2f39] font-medium">Assistant is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[#efe3cc] bg-[#fdfbf6] p-3 sm:p-4 space-y-2">
        {/* API Authentication Status Banner (when disconnected / unconfigured) */}
        {apiStatus && !isConfigured && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 shadow-2xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{apiStatus.message}</span>
            </div>
          </div>
        )}

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{uploadError}</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="p-1 hover:text-red-950 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Uploading Status */}
        {isUploading && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#fbf5e9] border border-[#efe3cc] text-xs text-[#7a6a5a]">
            <Loader2 className="w-4 h-4 animate-spin text-[#8c2f39]" />
            <span>Analyzing file for AI assistant context...</span>
          </div>
        )}

        {/* Attached Document Preview Chip */}
        {attachedDoc && !isUploading && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <span className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="truncate">
                Attached: <strong>{attachedDoc.name}</strong>
                {attachedDoc.size ? ` (${(attachedDoc.size / 1024).toFixed(0)} KB)` : ''}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setAttachedDoc(null)}
              className="p-1 hover:text-red-700 transition cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Text Input Row */}
        <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-[#efe3cc] p-2 focus-within:ring-2 focus-within:ring-[#8c2f39]/20 focus-within:border-[#8c2f39] shadow-2xs">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2.5 rounded-xl text-[#7a6a5a] hover:text-[#8c2f39] hover:bg-[#fbf5e9] transition shrink-0 cursor-pointer disabled:opacity-50"
            title="Attach document or image (JPG, PNG, PDF, DOCX, PPTX up to 10MB)"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              !isConfigured
                ? apiStatus?.message || 'AI service not configured.'
                : 'Ask anything about your education, career, examinations, scholarships or admissions...'
            }
            className="w-full resize-none bg-transparent text-xs sm:text-sm text-[#2b2118] placeholder-[#7a6a5a]/70 focus:outline-none max-h-32 py-2.5"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              className="p-2.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition shrink-0 cursor-pointer shadow-xs"
              title="Stop response"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={(!inputText.trim() && !attachedDoc) || isUploading}
              className="p-2.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-xs cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
