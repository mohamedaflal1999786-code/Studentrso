// components/chatbot/PlatformBrainChatbot.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Brain,
  MessageSquare,
  X,
  Minus,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Loader2,
  Check,
  ChevronRight,
  Info,
} from 'lucide-react';
import { isTamilQuery } from '@/lib/platform-guide-engine';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'en' | 'ta';
  timestamp: string;
  suggestedRoutes?: Array<{ label: string; url: string }>;
}

const STARTER_CHIPS_EN = [
  { label: '💡 How this website works', query: 'Explain how Student RSO website works and what features are available' },
  { label: '🎓 Scholarships (M01)', query: 'What scholarships are available in Module 01 and how to apply?' },
  { label: '🚨 Safety & 112 (M02)', query: 'How does the Safety & Anti-Ragging grievance system work?' },
  { label: '📜 e-Sevai Certificates (M03)', query: 'How to apply for Community and First Graduate certificates?' },
  { label: '📝 Exams & Admissions (M04/06)', query: 'Tell me about TNPSC, NEET, JEE and college admissions guidance' },
  { label: '💼 Internships (M08)', query: 'How to find verified internships and employment exchange?' },
];

const STARTER_CHIPS_TA = [
  { label: '💡 இந்த தளம் பற்றி', query: 'இந்த Student RSO இணையதளம் என்னென்ன வசதிகளை வழங்குகிறது?' },
  { label: '🎓 உதவித்தொகை (M01)', query: 'தமிழ்நாடு அரசு மற்றும் NSP உதவித்தொகை எப்படி விண்ணப்பிப்பது?' },
  { label: '🚨 ராகிங் & 112 (M02)', query: 'ராகிங் மற்றும் மாணவர் அவசர உதவி எண்கள் என்னென்ன?' },
  { label: '📜 சான்றிதழ்கள் (M03)', query: 'சாதி மற்றும் முதல் பட்டதாரி சான்றிதழ் இ-சேவை மூலம் பெறுவது எப்படி?' },
  { label: '📝 தேர்வுகள் & சேர்க்கை', query: 'TNPSC, NEET தேர்வுகள் மற்றும் கல்லூரி சேர்க்கை வழிகாட்டல்' },
  { label: '💼 வேலை & பயிற்சி (M08)', query: 'இன்டர்ன்ஷிப் மற்றும் வேலைவாய்ப்பு அலுவலக பதிவு முறை' },
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Synthesis and Speech Recognition client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }

      // Check SpeechRecognition support
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
            // Detect language from transcript
            if (isTamilQuery(transcript)) {
              setLanguage('ta');
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
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

  // Initial welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeEn: ChatMessage = {
        id: 'msg-welcome-en',
        role: 'assistant',
        language: 'en',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Welcome to **Student RSO Brain Guide**! 🧠\n\nI am your unified AI voice & chat assistant for all 10 modules and the entire portal. I can explain any service, guide you through scholarships, anti-ragging help, e-Sevai certificates, exams, and admissions.\n\n✨ **Voice Assistant:** Tap the microphone to talk to me in **English** or **தமிழ் (Tamil)**!`,
        suggestedRoutes: [
          { label: '🎓 Scholarships (M01)', url: '/scholarships' },
          { label: '🚨 Safety & 112 (M02)', url: '/safety' },
          { label: '📜 e-Sevai Certificates (M03)', url: '/certificates' },
          { label: '📝 Exams Hub (M04)', url: '/exams' },
        ],
      };
      setMessages([welcomeEn]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, voiceNotice]);

  // Text-To-Speech (Speech Synthesis) for Tamil and English
  const speakText = useCallback(
    (text: string, msgLang: 'en' | 'ta', messageId?: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop any active speech

      // Clean markdown characters for pleasant listening
      const cleanText = text
        .replace(/[*_#`[\]()]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/•/g, ', ')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const isTa = msgLang === 'ta' || isTamilQuery(cleanText);
      utterance.lang = isTa ? 'ta-IN' : 'en-IN';
      utterance.rate = isTa ? 0.95 : 1.0;
      utterance.pitch = 1.0;

      // Select voice if available
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
    },
    []
  );

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

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    // Detect language
    const queryLang: 'en' | 'ta' = isTamilQuery(text) ? 'ta' : language;
    if (queryLang !== language) {
      setLanguage(queryLang);
    }

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

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botMessageId = `bot-${Date.now()}`;
      const botMessage: ChatMessage = {
        id: botMessageId,
        role: 'assistant',
        language: data.language || queryLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.reply,
        suggestedRoutes: data.suggestedRoutes,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Speak response if voice-out is toggled ON
      if (voiceOutEnabled) {
        speakText(data.reply, data.language || queryLang, botMessageId);
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
            ? 'மன்னிக்கவும்! பதிலளிப்பதில் சிறிய பிழை ஏற்பட்டுள்ளது. கீழேயுள்ள வழிகளில் உங்கள் தேவையை தேர்வு செய்யலாம்.'
            : 'Sorry, I encountered a temporary problem. You can explore the direct module links below:',
        suggestedRoutes: [
          { label: '🎓 Scholarships (M01)', url: '/scholarships' },
          { label: '🚨 Safety & 112 (M02)', url: '/safety' },
          { label: '📜 e-Sevai Certificates (M03)', url: '/certificates' },
          { label: '📝 Exams Hub (M04)', url: '/exams' },
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

  return (
    <>
      {/* =========================================================================
          1. FLOATING BRAIN THEME BUTTON (Visible across all 11 pages)
      ========================================================================= */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8c2f39] text-[#fffdf9] text-xs font-semibold shadow-lg border border-[#e09f3e]/40 animate-bounce">
            <Sparkles size={13} className="text-[#e09f3e]" />
            <span>Brain Guide • தமிழ் & English</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              stopSpeaking();
              setIsOpen(false);
            } else {
              setIsOpen(true);
            }
          }}
          className={`group relative flex items-center justify-center rounded-full transition-all duration-300 shadow-xl cursor-pointer ${
            isOpen
              ? 'w-12 h-12 bg-[#2b2118] text-[#fffdf9] hover:bg-[#8c2f39]'
              : 'w-14 h-14 bg-gradient-to-br from-[#8c2f39] via-[#6d1824] to-[#4a0e17] text-white hover:scale-105 hover:shadow-2xl ring-4 ring-[#e09f3e]/30'
          }`}
          aria-label={isOpen ? 'Close Student RSO Brain Guide' : 'Open Student RSO Brain Guide'}
          title="Student RSO Brain Guide (All-Modules Voice & Chat Assistant)"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <div className="relative flex items-center justify-center">
              <Brain size={26} className="text-[#e09f3e] transition-transform group-hover:rotate-6" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* =========================================================================
          2. COMPACT FLOATING CHATBOT WINDOW (Small size, responsive)
      ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Student RSO Brain Guide"
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-[94vw] sm:w-[380px] h-[530px] max-h-[82vh] flex flex-col rounded-2xl shadow-2xl border border-[#d8c7ad] bg-[#fffdf9] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-3 bg-gradient-to-r from-[#8c2f39] to-[#6d1824] text-white border-b border-[#a63d48]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <Brain size={18} className="text-[#e09f3e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm tracking-wide leading-tight">Brain Guide</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-[#f6ede0] leading-none mt-0.5">
                  All 11 Modules • தமிழ் & English
                </p>
              </div>
            </div>

            {/* Header controls: Language, Voice Output, Clear, Minimize */}
            <div className="flex items-center gap-1">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => {
                  const nextLang = language === 'en' ? 'ta' : 'en';
                  setLanguage(nextLang);
                  stopSpeaking();
                }}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition flex items-center gap-1 cursor-pointer border border-white/15"
                title="Switch Language / மொழி மாற்றம்"
              >
                <span>{language === 'en' ? 'EN' : 'தமிழ்'}</span>
              </button>

              {/* Voice Output Read-Aloud Toggle */}
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
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#fffdf9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-[#8c2f39] text-white rounded-br-xs'
                      : 'bg-white text-[#2b2118] border border-[#efe3cc] rounded-bl-xs'
                  }`}
                >
                  {/* Assistant Icon header */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#efe3cc]">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#8c2f39]">
                        <Brain size={13} className="text-[#8c2f39]" />
                        <span>Student RSO Guide</span>
                      </div>

                      {/* Listen / Speak Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (activeSpeakingId === msg.id && isSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.content, msg.language, msg.id);
                          }
                        }}
                        className="flex items-center gap-1 text-[10px] text-[#7a6a5a] hover:text-[#8c2f39] font-semibold transition cursor-pointer"
                        title="Listen to this reply (கேளுங்கள்)"
                      >
                        <Volume2
                          size={12}
                          className={activeSpeakingId === msg.id && isSpeaking ? 'text-[#8c2f39] animate-pulse' : ''}
                        />
                        <span>{activeSpeakingId === msg.id && isSpeaking ? 'Stop' : 'Listen'}</span>
                      </button>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap space-y-1">
                    {msg.content.split('\n\n').map((para, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Clickable Suggested Module Routes */}
                  {msg.suggestedRoutes && msg.suggestedRoutes.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#efe3cc] flex flex-wrap gap-1.5">
                      {msg.suggestedRoutes.map((rt, rIdx) => (
                        <Link
                          key={rIdx}
                          href={rt.url}
                          onClick={() => {
                            stopSpeaking();
                            // Keep chatbot window state or minimize on navigation if screen is narrow
                            if (window.innerWidth < 640) setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#8c2f39]/10 text-[#8c2f39] hover:bg-[#8c2f39] hover:text-white transition text-[11px] font-bold border border-[#8c2f39]/20"
                        >
                          <span>{rt.label}</span>
                          <ChevronRight size={12} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-[#9a8a7a] mt-0.5 px-1">{msg.timestamp}</span>
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

          {/* Chat Input Bar */}
          <div className="p-2.5 bg-white border-t border-[#efe3cc]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              {/* Inbuilt Voice Input Microphone Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-xl transition cursor-pointer shrink-0 border ${
                  isListening
                    ? 'bg-red-600 text-white border-red-700 animate-pulse ring-2 ring-red-400'
                    : 'bg-[#f6ede0] text-[#8c2f39] hover:bg-[#8c2f39] hover:text-white border-[#d8c7ad]'
                }`}
                title={
                  isListening
                    ? 'Listening... Tap to stop'
                    : language === 'ta'
                    ? 'தமிழில் பேச மைக் அழுத்தவும் (Tap for Tamil Voice)'
                    : 'Voice Assistant: Tap to speak in English'
                }
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'Student RSO பற்றி கேட்கவும்...'
                    : 'Ask anything about Student RSO...'
                }
                className="flex-1 px-3 py-2 rounded-xl border border-[#d8c7ad] bg-[#fffdf9] text-xs text-[#2b2118] placeholder:text-[#9a8a7a] outline-none focus:border-[#8c2f39] focus:ring-1 focus:ring-[#8c2f39]"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-xs"
                title="Send Message"
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
