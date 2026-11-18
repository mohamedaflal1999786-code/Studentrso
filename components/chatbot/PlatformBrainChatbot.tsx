// components/chatbot/PlatformBrainChatbot.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Brain,
  X,
  Minus,
  Send,
  Mic,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Loader2,
  ChevronRight,
  Languages,
} from 'lucide-react';
import { isTamilQuery, sanitizeHumanText } from '@/lib/platform-guide-engine';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'en' | 'ta';
  timestamp: string;
  suggestedRoutes?: Array<{ label: string; url: string }>;
  isTranslating?: boolean;
}

const STARTER_CHIPS_EN = [
  { label: 'Platform Overview', query: 'Explain how Student RSO website works and what services are offered' },
  { label: 'Scholarship Hub (M01)', query: 'What scholarships are available in Module 01 and how do I apply?' },
  { label: 'Safety & 112 (M02)', query: 'How does the Safety and Anti-Ragging grievance system work?' },
  { label: 'e-Sevai Certificates (M03)', query: 'How to apply for Community and First Graduate certificates?' },
  { label: 'Exams Hub (M04)', query: 'Tell me about TNPSC, NEET, JEE and central competitive exams' },
  { label: 'AI Career Mentor (M05)', query: 'How does AI Career Assistant evaluate Class 10 to PhD students?' },
  { label: 'Admissions Centre (M06)', query: 'Explain TNEA counselling, college transfers, and break of study rules' },
  { label: 'Internships & Jobs (M08)', query: 'How to find verified government internships and statutory apprenticeships?' },
  { label: 'Digital Safety (M10)', query: 'What is Module 10 Digital Safety and the 1930 cyber fraud helpline?' },
];

const STARTER_CHIPS_TA = [
  { label: 'தளம் பற்றி', query: 'Student RSO தளம் என்னென்ன 10 சேவைகளை வழங்குகிறது?' },
  { label: 'உதவித்தொகை (M01)', query: 'தமிழ்நாடு அரசு மற்றும் NSP உதவித்தொகை பெறுவது எப்படி?' },
  { label: 'பாதுகாப்பு & 112 (M02)', query: 'ராகிங் மற்றும் மாணவர் அவசர உதவி எண்கள் என்னென்ன?' },
  { label: 'சான்றிதழ்கள் (M03)', query: 'சாதி மற்றும் முதல் பட்டதாரி சான்றிதழ் இ-சேவை மூலம் பெறுவது எப்படி?' },
  { label: 'தேர்வுகள் (M04)', query: 'TNPSC, NEET தேர்வுகள் மற்றும் போட்டித் தேர்வுகள் விவரம்' },
  { label: 'AI தொழில் வழிகாட்டி (M05)', query: '10-ஆம் வகுப்பு முதல் PhD வரை AI வழிகாட்டல் முறை எப்படி செயல்படுகிறது?' },
  { label: 'சேர்க்கை மையம் (M06)', query: 'TNEA கலந்தாய்வு மற்றும் கல்லூரி இடமாற்ற விதிகள் என்ன?' },
  { label: 'பயிற்சி & வேலை (M08)', query: 'இன்டர்ன்ஷிப் மற்றும் வேலைவாய்ப்பு அலுவலக பதிவு முறை' },
  { label: 'டிஜிட்டல் பாதுகாப்பு (M10)', query: 'சைபர் மோசடி தடுப்பு மற்றும் 1930 உதவி எண் பற்றி கூறுக' },
];

export function PlatformBrainChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceOutEnabled, setVoiceOutEnabled] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Movable button coordinate state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragJustEndedRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // ---------------------------------------------------------------------------
  // 1. POSITION INITIALIZATION & PERSISTENCE (Movable across all 11 pages)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPos = () => {
      try {
        const saved = localStorage.getItem('studentrso_brain_pos');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
            const clampedX = Math.max(12, Math.min(window.innerWidth - 68, parsed.x));
            const clampedY = Math.max(12, Math.min(window.innerHeight - 68, parsed.y));
            setPosition({ x: clampedX, y: clampedY });
            return;
          }
        }
      } catch {}
      // Default to comfortable bottom right
      setPosition({ x: window.innerWidth - 76, y: window.innerHeight - 84 });
    };

    initPos();
    window.addEventListener('resize', initPos);
    return () => window.removeEventListener('resize', initPos);
  }, []);

  // Universal Pointer Drag Handler (Optimized for laptops, touchpads, mice, and mobile touchscreens)
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return; // Only primary mouse button / touch

    const startX = e.clientX;
    const startY = e.clientY;
    const initX = position?.x ?? (window.innerWidth - 76);
    const initY = position?.y ?? (window.innerHeight - 84);
    let hasMoved = false;

    const onMove = (moveEv: PointerEvent) => {
      const deltaX = moveEv.clientX - startX;
      const deltaY = moveEv.clientY - startY;
      const distance = Math.hypot(deltaX, deltaY);

      // 12px threshold ensures laptop trackpad clicks are NEVER mistaken for a drag
      if (!hasMoved && distance > 12) {
        hasMoved = true;
        setIsDragging(true);
      }

      if (hasMoved) {
        const nextX = Math.max(12, Math.min(window.innerWidth - 68, initX + deltaX));
        const nextY = Math.max(12, Math.min(window.innerHeight - 68, initY + deltaY));
        setPosition({ x: nextX, y: nextY });
      }
    };

    const onUp = (upEv: PointerEvent) => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);

      setIsDragging(false);

      if (hasMoved) {
        dragJustEndedRef.current = true;
        setTimeout(() => {
          dragJustEndedRef.current = false;
        }, 120);

        const deltaX = upEv.clientX - startX;
        const deltaY = upEv.clientY - startY;
        const finalX = Math.max(12, Math.min(window.innerWidth - 68, initX + deltaX));
        const finalY = Math.max(12, Math.min(window.innerHeight - 68, initY + deltaY));
        try {
          localStorage.setItem('studentrso_brain_pos', JSON.stringify({ x: finalX, y: finalY }));
        } catch {}
      } else {
        // Clean tap/click on laptop or mobile: toggle open/close
        if (isOpen) {
          stopSpeaking();
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  // ---------------------------------------------------------------------------
  // 2. SPEECH RECOGNITION & SYNTHESIS SETUP
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setVoiceNotice(
            language === 'ta'
              ? 'கேட்கிறது... தமிழில் பேசுங்கள் (Listening in Tamil...)'
              : 'Listening... speak now in English'
          );
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) {
            setInputValue(transcript);
            setVoiceNotice(null);
            if (isTamilQuery(transcript)) {
              setLanguage('ta');
            }
          }
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setVoiceNotice(
              language === 'ta'
                ? 'மைக் அனுமதி மறுக்கப்பட்டுள்ளது (Microphone permission denied).'
                : 'Microphone permission denied. Please allow microphone in browser.'
            );
          } else {
            setVoiceNotice(null);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [language]);

  // Initial welcome message (clean human format, zero asterisks)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'msg-welcome',
        role: 'assistant',
        language: language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content:
          language === 'ta'
            ? sanitizeHumanText(`வணக்கம்! நான் உங்கள் Student RSO வழிகாட்டி.

இந்த இணையதளம் மாணவர்களுக்கான 10 முக்கிய சேவைகளை ஒரே இடத்தில் வழங்குகிறது:
• உதவித்தொகை (Scholarships) மற்றும் விண்ணப்ப கண்காணிப்பு
• பாதுகாப்பு, ராகிங் எதிர்ப்பு மற்றும் 112 அவசர உதவி எண்கள்
• இ-சேவை சான்றிதழ்கள் (சாதி, வருமானம், முதல் பட்டதாரி)
• 56+ அரசு மற்றும் போட்டித் தேர்வுகள் (TNPSC, NEET, JEE)
• 10-ஆம் வகுப்பு முதல் PhD வரை AI தொழில் மற்றும் கல்வி வழிகாட்டி
• மாணவர் சேர்க்கை, கல்லூரி இடமாற்றம் மற்றும் கல்வி தொடர்ச்சி
• SWAYAM மற்றும் NCERT இலவச கல்விப் பாடங்கள்
• அரசு இன்டர்ன்ஷிப் மற்றும் வேலைவாய்ப்பு அலுவலக பதிவு
• ஆங்கில பேச்சுத்திறன் மற்றும் நேர்முகத் தேர்வு பயிற்சி
• டிஜிட்டல் பாதுகாப்பு மற்றும் 1930 சைபர் மோசடி உதவி

நீங்கள் எதைப்பற்றி தெரிந்து கொள்ள விரும்புகிறீர்கள்? தமிழில் பேச மைக் பட்டனை அழுத்தலாம் அல்லது கீழே தட்டச்சு செய்யலாம்!`)
            : sanitizeHumanText(`Welcome to Student RSO Brain Guide!

I am your unified human-format guide across all 10 platform modules:
• Module 01: Scholarship Hub, eligibility matching and renewal alerts
• Module 02: Safety & Anti-Ragging reporting, with 24/7 emergency helplines
• Module 03: e-Sevai revenue certificates (Community, Income, First Graduate)
• Module 04: Exams & Opportunity Hub (TNPSC, NEET, JEE, UPSC, 56+ exams)
• Module 05: Autonomous Career Assistant evaluating Class 10 to PhD
• Module 06: Admissions, transfers, and break of study re-entry
• Module 07: Academic Support with SWAYAM, NPTEL, and NCERT materials
• Module 08: Verified government internships, NATS, and TN Velaivaaippu
• Module 09: Language and Soft-Skills Lab for interview prep
• Module 10: Digital Safety Shield and 1930 cyber fraud helpline

Tap the microphone to speak with me or type your question below!`),
        suggestedRoutes: [
          { label: language === 'ta' ? 'உதவித்தொகை (M01)' : 'Scholarships (M01)', url: '/scholarships' },
          { label: language === 'ta' ? 'பாதுகாப்பு & 112 (M02)' : 'Safety & 112 (M02)', url: '/safety' },
          { label: language === 'ta' ? 'சான்றிதழ்கள் (M03)' : 'Certificates (M03)', url: '/certificates' },
          { label: language === 'ta' ? 'தேர்வுகள் (M04)' : 'Exams Hub (M04)', url: '/exams' },
        ],
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, messages.length, language]);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, voiceNotice]);

  // ---------------------------------------------------------------------------
  // 3. TEXT-TO-SPEECH (SPEECH SYNTHESIS)
  // ---------------------------------------------------------------------------
  const speakText = useCallback((text: string, msgLang: 'en' | 'ta', messageId?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    // Clean all special characters for natural voice reading
    const clean = sanitizeHumanText(text)
      .replace(/[•–—]/g, ', ')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const isTa = msgLang === 'ta' || isTamilQuery(clean);
    utterance.lang = isTa ? 'ta-IN' : 'en-IN';
    utterance.rate = isTa ? 0.95 : 1.0;
    utterance.pitch = 1.0;

    const voices = synth.getVoices();
    if (isTa) {
      const tamilVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('ta') ||
          v.name.toLowerCase().includes('tamil') ||
          v.name.toLowerCase().includes('india')
      );
      if (tamilVoice) utterance.voice = tamilVoice;
    } else {
      const engVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('en-in') ||
          v.lang.toLowerCase().includes('en_in') ||
          v.lang.toLowerCase().includes('en-us')
      );
      if (engVoice) utterance.voice = engVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (messageId) setActiveSpeakingId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    };

    synth.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    }
  }, []);

  // Toggle Voice Input (Microphone)
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setVoiceNotice('Voice input is not supported in this browser. Please type your question.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceNotice(null);
    } else {
      stopSpeaking();
      recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // 4. PER-MESSAGE AUTO TRANSLATE (TEXT & VOICE IN BOTH DIRECTIONS)
  // ---------------------------------------------------------------------------
  const handleTranslateMessage = async (msgId: string) => {
    const targetMsg = messages.find((m) => m.id === msgId);
    if (!targetMsg || targetMsg.isTranslating) return;

    const nextLang: 'en' | 'ta' = targetMsg.language === 'en' ? 'ta' : 'en';

    // Mark as translating
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, isTranslating: true } : m))
    );

    try {
      const res = await fetch('/api/platform-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'translate',
          text: targetMsg.content,
          targetLanguage: nextLang,
        }),
      });

      if (!res.ok) throw new Error('Translation failed');

      const data = await res.json();
      const cleanReply = sanitizeHumanText(data.reply);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? {
                ...m,
                content: cleanReply,
                language: nextLang,
                isTranslating: false,
              }
            : m
        )
      );

      // If voice out enabled, read out translated version
      if (voiceOutEnabled) {
        speakText(cleanReply, nextLang, msgId);
      }
    } catch (err) {
      console.error('Translation error:', err);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, isTranslating: false } : m))
      );
    }
  };

  // ---------------------------------------------------------------------------
  // 5. SEND MESSAGE HANDLER
  // ---------------------------------------------------------------------------
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    // Detect language preference from query or active selector
    const queryLang: 'en' | 'ta' = isTamilQuery(text) ? 'ta' : language;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      language: queryLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setVoiceNotice(null);
    stopSpeaking();

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/platform-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: queryLang,
          history: historyPayload,
        }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      const botMessageId = `bot-${Date.now()}`;
      const cleanContent = sanitizeHumanText(data.reply);
      const resLang = data.language || queryLang;

      const botMessage: ChatMessage = {
        id: botMessageId,
        role: 'assistant',
        language: resLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: cleanContent,
        suggestedRoutes: data.suggestedRoutes,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (voiceOutEnabled) {
        speakText(cleanContent, resLang, botMessageId);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        language: queryLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content:
          queryLang === 'ta'
            ? sanitizeHumanText(`மன்னிக்கவும்! பதிலளிப்பதில் சிறிய பிழை ஏற்பட்டுள்ளது. கீழேயுள்ள வழிகளில் உங்கள் தேவையை தேர்வு செய்யலாம்:`)
            : sanitizeHumanText(`Sorry, I encountered a temporary problem. You can explore the direct module links below:`),
        suggestedRoutes: [
          { label: 'Scholarships (M01)', url: '/scholarships' },
          { label: 'Safety & 112 (M02)', url: '/safety' },
          { label: 'Certificates (M03)', url: '/certificates' },
          { label: 'Exams Hub (M04)', url: '/exams' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([]);
    setInputValue('');
  };

  // Compute smart dialog placement relative to movable button
  const getDialogStyle = (): React.CSSProperties => {
    if (typeof window === 'undefined') {
      return { bottom: '20px', right: '20px' };
    }

    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      return {
        position: 'fixed',
        bottom: '12px',
        left: '12px',
        right: '12px',
        zIndex: 9999,
      };
    }

    const currX = position?.x ?? (window.innerWidth - 76);
    const currY = position?.y ?? (window.innerHeight - 84);

    const dialogWidth = 380;
    const dialogHeight = 540;

    let left = currX > window.innerWidth / 2 ? currX - dialogWidth + 56 : currX;
    let top = currY > window.innerHeight / 2 ? currY - dialogHeight - 12 : currY + 64;

    left = Math.max(16, Math.min(window.innerWidth - dialogWidth - 16, left));
    top = Math.max(16, Math.min(window.innerHeight - dialogHeight - 16, top));

    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 9999,
    };
  };

  return (
    <>
      {/* =========================================================================
          1. MOVABLE BRAIN THEME BUTTON (Freely draggable across all pages, clean icon)
      ========================================================================= */}
      <div
        style={
          position
            ? {
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 9998,
                touchAction: 'none',
              }
            : {
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9998,
                touchAction: 'none',
              }
        }
        className="select-none flex items-center justify-center"
      >
        <button
          type="button"
          onPointerDown={handlePointerDown}
          onClick={() => {
            if (dragJustEndedRef.current) return;
            if (isOpen) {
              stopSpeaking();
              setIsOpen(false);
            } else {
              setIsOpen(true);
            }
          }}
          className={`group relative flex items-center justify-center rounded-full transition-all duration-200 shadow-xl select-none cursor-pointer ${
            isDragging ? 'cursor-grabbing scale-105 shadow-2xl' : 'cursor-grab hover:scale-105'
          } ${
            isOpen
              ? 'w-12 h-12 bg-[#2b2118] text-[#fffdf9] hover:bg-[#8c2f39]'
              : 'w-14 h-14 bg-gradient-to-br from-[#8c2f39] via-[#6d1824] to-[#4a0e17] text-white ring-4 ring-[#e09f3e]/35 hover:ring-[#e09f3e]/60'
          }`}
          aria-label={isOpen ? 'Close Brain Guide' : 'Open Brain Guide'}
          title="Student RSO Brain Guide — Click to open, drag to reposition"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <div className="relative flex items-center justify-center pointer-events-none">
              <Brain size={26} className="text-[#e09f3e] transition-transform group-hover:rotate-6" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* =========================================================================
          2. COMPACT FLOATING CHATBOT WINDOW (Human-formatted, Zero Asterisks)
      ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Student RSO Brain Guide"
          style={getDialogStyle()}
          className="w-[94vw] sm:w-[380px] h-[530px] max-h-[82vh] flex flex-col rounded-2xl shadow-2xl border border-[#d8c7ad] bg-[#fffdf9] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-3 bg-gradient-to-r from-[#8c2f39] to-[#6d1824] text-white border-b border-[#a63d48]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <Brain size={18} className="text-[#e09f3e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm tracking-wide leading-tight">Brain Guide</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/25 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-[#f6ede0] leading-none mt-0.5">
                  Universal Guide • தமிழ் & English
                </p>
              </div>
            </div>

            {/* Header controls: Distinct 2-button Language Selector, Voice, Clear, Minimize */}
            <div className="flex items-center gap-1.5">
              {/* Segmented Language Selector (Completely eliminates inverted/opposite confusion) */}
              <div className="flex items-center rounded-lg bg-black/25 p-0.5 border border-white/20">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    stopSpeaking();
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#e09f3e] text-[#2b2118] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                  title="Answer in English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('ta');
                    stopSpeaking();
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                    language === 'ta'
                      ? 'bg-[#e09f3e] text-[#2b2118] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                  title="தமிழில் பதிலளிக்க"
                >
                  தமிழ்
                </button>
              </div>

              {/* Voice Read-Aloud Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setVoiceOutEnabled(!voiceOutEnabled);
                }}
                className={`p-1.5 rounded-lg transition text-xs cursor-pointer border ${
                  voiceOutEnabled
                    ? 'bg-[#e09f3e] text-[#2b2118] border-[#e09f3e] font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20 border-white/15'
                }`}
                title={voiceOutEnabled ? 'Voice Output ON (Click to Mute)' : 'Voice Output OFF (Click to Listen)'}
              >
                {voiceOutEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              {/* Clear Chat */}
              <button
                type="button"
                onClick={clearChat}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer border border-white/15 transition"
                title="Restart Chat"
              >
                <RotateCcw size={14} />
              </button>

              {/* Minimize */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer border border-white/15 transition"
                title="Close"
              >
                <Minus size={15} />
              </button>
            </div>
          </div>

          {/* Voice Listening Active Banner */}
          {voiceNotice && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8c2f39]/10 border-b border-[#8c2f39]/20 text-[11px] text-[#8c2f39] font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>{voiceNotice}</span>
            </div>
          )}

          {/* Active Speaking Indicator */}
          {isSpeaking && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#e09f3e]/20 border-b border-[#e09f3e]/30 text-[11px] text-[#2b2118] font-semibold">
              <div className="flex items-center gap-1.5">
                <Volume2 size={13} className="text-[#8c2f39] animate-bounce" />
                <span>Speaking response aloud...</span>
              </div>
              <button
                type="button"
                onClick={stopSpeaking}
                className="text-[10px] text-[#8c2f39] font-bold underline cursor-pointer"
              >
                Stop
              </button>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#fffdf9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-[#8c2f39] text-white rounded-br-xs font-medium'
                      : 'bg-white text-[#2b2118] border border-[#efe3cc] rounded-bl-xs'
                  }`}
                >
                  {/* Assistant Header with Language & Controls */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#efe3cc]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8c2f39]">
                        <Brain size={13} className="text-[#8c2f39]" />
                        <span>Student RSO Guide</span>
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-[#f6ede0] text-[#92400e] font-mono">
                          {msg.language === 'ta' ? 'தமிழ்' : 'English'}
                        </span>
                      </div>

                      {/* Top Right Action: Listen */}
                      <button
                        type="button"
                        onClick={() => {
                          if (activeSpeakingId === msg.id && isSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.content, msg.language, msg.id);
                          }
                        }}
                        className="flex items-center gap-1 text-[10.5px] text-[#7a6a5a] hover:text-[#8c2f39] font-semibold transition cursor-pointer"
                        title={msg.language === 'ta' ? 'கேளுங்கள்' : 'Listen'}
                      >
                        <Volume2
                          size={12}
                          className={activeSpeakingId === msg.id && isSpeaking ? 'text-[#8c2f39] animate-pulse' : ''}
                        />
                        <span>{activeSpeakingId === msg.id && isSpeaking ? 'Stop' : msg.language === 'ta' ? 'கேள்' : 'Listen'}</span>
                      </button>
                    </div>
                  )}

                  {/* Clean Human-Formatted Content (Zero Asterisks Guaranteed) */}
                  <div className="space-y-1.5 text-[12px] leading-relaxed text-[#2b2118]">
                    {sanitizeHumanText(msg.content)
                      .split('\n\n')
                      .map((para, idx) => (
                        <p key={idx} className="whitespace-pre-wrap">
                          {para}
                        </p>
                      ))}
                  </div>

                  {/* Bottom Action Bar: Instant Auto-Translate Button */}
                  {msg.role === 'assistant' && (
                    <div className="mt-2.5 pt-2 border-t border-[#efe3cc] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleTranslateMessage(msg.id)}
                        disabled={msg.isTranslating}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f6ede0] hover:bg-[#efe3cc] text-[#8c2f39] text-[10.5px] font-bold border border-[#d8c7ad] transition cursor-pointer"
                        title="Translate text & voice / மொழிபெயர்"
                      >
                        {msg.isTranslating ? (
                          <Loader2 size={11} className="animate-spin text-[#8c2f39]" />
                        ) : (
                          <Languages size={11} className="text-[#8c2f39]" />
                        )}
                        <span>
                          {msg.isTranslating
                            ? 'Translating...'
                            : msg.language === 'en'
                            ? 'Translate to தமிழ்'
                            : 'Translate to English'}
                        </span>
                      </button>

                      <span className="text-[9px] text-[#9a8a7a]">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Clean International Suggested Module Action Pills (Zero raw markdown bracket links) */}
                  {msg.suggestedRoutes && msg.suggestedRoutes.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#efe3cc] flex flex-wrap gap-1.5">
                      {msg.suggestedRoutes.map((rt, rIdx) => (
                        <Link
                          key={rIdx}
                          href={rt.url}
                          onClick={() => {
                            stopSpeaking();
                            if (window.innerWidth < 640) setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f6ede0] text-[#8c2f39] hover:bg-[#8c2f39] hover:text-white transition text-[10.5px] font-bold border border-[#d8c7ad]"
                        >
                          <span>{rt.label}</span>
                          <ChevronRight size={11} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <span className="text-[9px] text-[#9a8a7a] mt-0.5 px-1">{msg.timestamp}</span>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#efe3cc] w-fit text-xs text-[#7a6a5a]">
                <Loader2 size={14} className="animate-spin text-[#8c2f39]" />
                <span className="font-serif italic">
                  {language === 'ta' ? 'பதிலளிக்கிறது...' : 'Thinking...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="px-3 py-2 bg-[#f6ede0] border-t border-[#efe3cc] overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 w-max">
              {(language === 'ta' ? STARTER_CHIPS_TA : STARTER_CHIPS_EN).map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-2.5 py-1 rounded-full bg-white text-[#2b2118] hover:bg-[#8c2f39] hover:text-white border border-[#d8c7ad] text-[10.5px] font-medium transition cursor-pointer shadow-2xs whitespace-nowrap"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-white border-t border-[#efe3cc]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              {/* Inbuilt Microphone Voice Input Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition cursor-pointer shrink-0 border ${
                  isListening
                    ? 'bg-red-600 text-white border-red-700 animate-pulse'
                    : 'bg-[#f6ede0] text-[#8c2f39] hover:bg-[#8c2f39] hover:text-white border-[#d8c7ad]'
                }`}
                title={
                  isListening
                    ? 'Listening... Click to stop'
                    : language === 'ta'
                    ? 'தமிழில் பேச கிளிக் செய்யவும் (Voice Input in Tamil)'
                    : 'Click to speak in English (Voice Input)'
                }
                aria-label="Voice Input Microphone"
              >
                <Mic size={17} />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'Student RSO பற்றி எதையும் கேட்கலாம்...'
                    : 'Ask about any module, safety, or scholarships...'
                }
                className="flex-1 bg-[#fffdf9] border border-[#d8c7ad] rounded-xl px-3 py-2 text-xs text-[#2b2118] focus:outline-none focus:ring-2 focus:ring-[#8c2f39] transition"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#8c2f39] hover:bg-[#6d1824] disabled:opacity-40 disabled:cursor-not-allowed text-white transition cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
