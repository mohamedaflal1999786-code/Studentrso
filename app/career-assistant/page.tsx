// app/career-assistant/page.tsx
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  User,
  ShieldCheck,
  AlertCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from '@/components/AuthDialog';
import {
  ChatMessage,
  StudentProfile,
  ConversationSession
} from '@/lib/ai/types';

import { ChatInterface } from '@/components/career-assistant/ChatInterface';
import { CareerAssistantDiagnosticsModal } from '@/components/career-assistant/CareerAssistantDiagnosticsModal';

const CONVERSATIONS_STORAGE_KEY = 'student_rso_conversations_v3';
const PROFILE_STORAGE_KEY = 'student_rso_ai_profile_v3';

export interface ApiStatusData {
  configured: boolean;
  status: 'READY' | 'MISSING_KEY' | 'INVALID_KEY' | 'QUOTA_EXCEEDED' | 'UNAVAILABLE';
  message: string;
}

function CareerAssistantContent() {
  const { user, profile: authProfile } = useAuth();
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);

  // Auth Dialog
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Backend API Authentication Status
  const [apiStatus, setApiStatus] = useState<ApiStatusData>({
    configured: false,
    status: 'READY',
    message: 'Checking AI connection...',
  });

  // Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    educationLevel: 'Undergraduate',
    state: 'Tamil Nadu',
    preferredLearningStyle: 'Step-by-step',
  });

  // Conversations State
  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('default-conv');
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Check Backend AI API Status on Mount
  useEffect(() => {
    async function checkBackendStatus() {
      try {
        const res = await fetch('/api/career-assistant/status');
        const data = await res.json();
        if (data.status) {
          setApiStatus({
            configured: data.configured,
            status: data.status,
            message: data.message,
          });
        }
      } catch (err) {
        setApiStatus({
          configured: false,
          status: 'UNAVAILABLE',
          message: 'Unable to connect to the AI service. Please try again.',
        });
      }
    }
    checkBackendStatus();
  }, []);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        setStudentProfile(JSON.parse(savedProfile));
      }

      const savedConvs = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      if (savedConvs) {
        const parsed = JSON.parse(savedConvs) as ConversationSession[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          setActiveConvId(parsed[0].id);
          return;
        }
      }

      // Default initial session
      const initialConv: ConversationSession = {
        id: 'conv-' + Date.now(),
        title: 'New Conversation',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      setConversations([initialConv]);
      setActiveConvId(initialConv.id);
    } catch (e) {
      console.warn('Failed to parse saved assistant data:', e);
    }
  }, []);

  // Persist conversations
  function saveConversationsToStorage(updated: ConversationSession[]) {
    setConversations(updated);
    try {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // Active conversation helper
  const currentConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0] || {
      id: 'default-conv',
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

  // Start a fresh chat
  function handleNewConversation() {
    if (isStreaming) {
      handleStopStreaming();
    }
    const newConv: ConversationSession = {
      id: 'conv-' + Date.now(),
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    const updated = [newConv, ...conversations];
    saveConversationsToStorage(updated);
    setActiveConvId(newConv.id);
  }

  // Send Message directly to Gemini Backend
  async function handleSendMessage(promptText: string, attachedDocContext?: string) {
    if (!promptText.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: promptText.trim(),
      timestamp: new Date().toISOString(),
    };

    const currentMessages = currentConversation.messages;
    const nextMessages = [...currentMessages, userMessage];

    // Placeholder assistant message for live streaming
    const assistantMsgId = 'msg-ai-' + Date.now();
    const assistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isStreaming: true,
    };

    let updatedConv: ConversationSession = {
      ...currentConversation,
      title:
        currentConversation.title === 'New Conversation'
          ? promptText.slice(0, 36) + (promptText.length > 36 ? '...' : '')
          : currentConversation.title,
      updatedAt: new Date().toISOString(),
      messages: [...nextMessages, assistantMessage],
    };

    const nextConvs = conversations.map((c) => (c.id === activeConvId ? updatedConv : c));
    saveConversationsToStorage(nextConvs);

    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/career-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          profile: studentProfile,
          documentContext: attachedDocContext,
        }),
        signal: abortController.signal,
      });

      // If server returned an error (missing key, auth failed, quota exceeded)
      if (!response.ok) {
        let errorReason = 'Unable to connect to the AI service. Please try again.';
        try {
          const errData = await response.json();
          if (errData.error) errorReason = errData.error;
        } catch {
          // Keep default
        }

        updatedConv = {
          ...updatedConv,
          messages: updatedConv.messages.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: errorReason,
                  isStreaming: false,
                }
              : m
          ),
        };
        saveConversationsToStorage(
          conversations.map((c) => (c.id === activeConvId ? updatedConv : c))
        );
        return;
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No readable stream from server.');

        const decoder = new TextDecoder();
        let accumulatedText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  updatedConv = {
                    ...updatedConv,
                    messages: updatedConv.messages.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: accumulatedText, isStreaming: true }
                        : m
                    ),
                  };
                  setConversations((cur) =>
                    cur.map((c) => (c.id === activeConvId ? updatedConv : c))
                  );
                } else if (parsed.error) {
                  accumulatedText = parsed.error;
                }
              } catch (e) {
                // Ignore parse errors on partial stream chunks
              }
            }
          }
        }

        updatedConv = {
          ...updatedConv,
          messages: updatedConv.messages.map((m) =>
            m.id === assistantMsgId ? { ...m, content: accumulatedText, isStreaming: false } : m
          ),
        };
        saveConversationsToStorage(
          conversations.map((c) => (c.id === activeConvId ? updatedConv : c))
        );
      } else {
        const data = await response.json();
        const replyText = data.reply || data.error || 'Unable to connect to the AI service. Please try again.';
        updatedConv = {
          ...updatedConv,
          messages: updatedConv.messages.map((m) =>
            m.id === assistantMsgId ? { ...m, content: replyText, isStreaming: false } : m
          ),
        };
        saveConversationsToStorage(
          conversations.map((c) => (c.id === activeConvId ? updatedConv : c))
        );
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream generation aborted by user');
      } else {
        console.error('Error during live Gemini stream:', err);
        updatedConv = {
          ...updatedConv,
          messages: updatedConv.messages.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: 'Unable to connect to the AI service. Please try again.',
                  isStreaming: false,
                }
              : m
          ),
        };
        saveConversationsToStorage(
          conversations.map((c) => (c.id === activeConvId ? updatedConv : c))
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }

  function handleStopStreaming() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }

  function handleRetryMessage() {
    const msgs = currentConversation.messages;
    if (msgs.length === 0) return;

    const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    const trimmedMsgs = msgs[msgs.length - 1].role === 'assistant' ? msgs.slice(0, -1) : msgs;
    const updatedConv = {
      ...currentConversation,
      messages: trimmedMsgs.slice(0, -1),
    };

    saveConversationsToStorage(
      conversations.map((c) => (c.id === activeConvId ? updatedConv : c))
    );

    handleSendMessage(lastUserMsg.content);
  }

  // Ready status badge formatting
  const isReady = apiStatus.status === 'READY';
  const badgeDotColor =
    apiStatus.status === 'READY' ? 'bg-emerald-500' :
    apiStatus.status === 'MISSING_KEY' ? 'bg-amber-500' :
    apiStatus.status === 'QUOTA_EXCEEDED' ? 'bg-amber-500' : 'bg-red-500';

  const badgeText =
    apiStatus.status === 'READY' ? 'Ready' :
    apiStatus.status === 'MISSING_KEY' ? 'Not Configured' :
    apiStatus.status === 'INVALID_KEY' ? 'Auth Failed' :
    apiStatus.status === 'QUOTA_EXCEEDED' ? 'Limit Reached' : 'Unavailable';

  return (
    <div className="min-h-screen bg-[#fbf5e9] text-[#2b2118] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#efe3cc] bg-[#fdfbf6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#0d3e2e] hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Student RSO</span>
            </Link>
            <span className="text-[#efe3cc]">|</span>
            <span className="font-serif text-[17px] font-bold text-[#2b2118] hidden sm:inline">
              AI Student Career &amp; Life Assistant
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Autonomous System Diagnostics Trigger */}
            <button
              type="button"
              onClick={() => setDiagnosticsModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#efe3cc] bg-white px-3 py-1.5 font-mono text-[11px] text-[#7a6a5a] hover:bg-[#fbf5e9] transition cursor-pointer"
              title="Inspect AI Engine Status & Diagnostics"
            >
              <Activity size={13} className="text-emerald-700" />
              <span>Diagnostics</span>
            </button>

            {user ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efe3cc] bg-[#fbf5e9] px-3 py-1 font-sans text-[12px] font-semibold text-[#2b2118]">
                <User size={14} className="text-[#0d3e2e]" />
                {authProfile?.full_name || user.email?.split('@')[0]}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="rounded-lg bg-[#0d3e2e] px-3.5 py-1.5 font-sans text-[12px] font-bold text-white hover:bg-[#08261c] transition cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Assistant Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col">
        <ChatInterface
          messages={currentConversation.messages}
          isStreaming={isStreaming}
          onSendMessage={handleSendMessage}
          onStopStreaming={handleStopStreaming}
          onRetryMessage={handleRetryMessage}
          onNewChat={handleNewConversation}
          apiStatus={apiStatus}
        />
      </main>

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setAuthOpen(false)}
      />

      {/* Diagnostics Modal */}
      <CareerAssistantDiagnosticsModal
        isOpen={diagnosticsModalOpen}
        onClose={() => setDiagnosticsModalOpen(false)}
      />
    </div>
  );
}

export default function CareerAssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf5e9] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#0d3e2e] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg font-bold text-[#0d3e2e]">Loading AI Student Career &amp; Life Assistant...</p>
          </div>
        </div>
      }
    >
      <CareerAssistantContent />
    </Suspense>
  );
}
