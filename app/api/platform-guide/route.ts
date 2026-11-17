// app/api/platform-guide/route.ts
// API route for Universal Student RSO Brain Guide Chatbot with Tamil & English support
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey, MODEL_CANDIDATES } from '@/lib/ai/gemini-service';
import { generatePlatformGuideAnswer, isTamilQuery } from '@/lib/platform-guide-engine';

export const dynamic = 'force-dynamic';

const SYSTEM_INSTRUCTION = `You are the official Student RSO Brain Guide (மாணவர் RSO வழிகாட்டி) — an intelligent, friendly AI assistant embedded across all 11 pages of the Student RSO portal (Rights, Services & Opportunities).

Student RSO provides 10 key modules for students:
• Module 01: Scholarship Hub (/scholarships) - TN & Central NSP scholarships, eligibility checks, application tracking & renewals.
• Module 02: Safety & Grievance (/safety) - Anti-ragging (1800-180-5522), police emergency (112), cybercrime (1930), women helpline (181), UGC e-Samadhaan.
• Module 03: Certificate & Document Service (/certificates) - Community, Income, First Graduate, Nativity certificates via TN e-Sevai, and DigiLocker rules.
• Module 04: Exams & Opportunity Hub (/exams) - 56+ exams: TNPSC, NEET, JEE, UPSC, SSC, IBPS, TNEA, GATE, CUET.
• Module 05: AI Career Assistant (/career-assistant) - Educational roadmaps from Class 10 to PhD across 7 evaluation parameters.
• Module 06: Student Admission & Continuity (/admissions) - TNEA engineering, TNGASA, transfers, break-of-study re-entry, APAAR / ABC credit bank.
• Module 07: Academic Support & Learning Centre (/academic-support) - SWAYAM, NPTEL, DIKSHA, NCERT, study skills, remedial learning.
• Module 08: Internship, Skill & Employment Exchange (/internships) - AICTE internships, NATS/NAPS apprenticeships, TN Velaivaaippu employment exchange.
• Module 09: Language, Soft-Skills & Confidence Lab (/skill-lab) - Spoken English workout, placement interview prep, GD, resume writing, Naan Mudhalvan.
• Module 10: Digital Safety & Cyber-Wellness Shield (/digital-safety) - Online safety, cyberbullying defense, scam helpline 1930, device security.
• Student Dashboard (/dashboard) - Personalized opportunity tracker, bookmarks, 6-step profile ("Save & Complete Profile").

LANGUAGE RULES:
1. If the user asks in Tamil (Tamil script or Tanglish like 'eppadi apply pandrathu', 'vanakkam', 'enna irukku'), reply in warm, simple, encouraging Tamil (தமிழ்).
2. If the user asks in English, reply in concise, clear, student-friendly English.
3. Keep responses compact and direct (2 to 4 bullet points or short paragraphs) because it displays in a small mobile-friendly chatbot window and will be read aloud by the inbuilt Voice Assistant.
4. Mention the relevant module name and path (e.g. Module 01: Scholarships at /scholarships) so the student knows where to go.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
    const requestedLang = body.language === 'ta' || body.language === 'en' ? body.language : undefined;

    if (!rawMessage) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const detectedLang: 'en' | 'ta' = requestedLang || (isTamilQuery(rawMessage) ? 'ta' : 'en');
    const apiKey = getGeminiApiKey();

    // 1. Try Gemini AI if API key is present
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        // Add short history if available
        if (Array.isArray(body.history)) {
          for (const item of body.history.slice(-4)) {
            if (item.content && (item.role === 'user' || item.role === 'assistant')) {
              contents.push({
                role: item.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: String(item.content) }],
              });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: rawMessage }],
        });

        // Try primary model candidate
        const response = await ai.models.generateContent({
          model: MODEL_CANDIDATES[0] || 'gemini-flash-lite-latest',
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        });

        const replyText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText && replyText.trim()) {
          const finalLang = isTamilQuery(replyText) || detectedLang === 'ta' ? 'ta' : 'en';
          const deterministic = generatePlatformGuideAnswer(rawMessage, finalLang);
          return NextResponse.json({
            reply: replyText.trim(),
            language: finalLang,
            suggestedRoutes: deterministic.suggestedRoutes,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini platform-guide call failed, falling back to deterministic knowledge engine:', geminiError?.message);
      }
    }

    // 2. Fallback to resilient deterministic platform guide engine
    const answer = generatePlatformGuideAnswer(rawMessage, detectedLang);
    return NextResponse.json(answer);
  } catch (error: any) {
    console.error('Platform guide error:', error);
    return NextResponse.json(
      {
        reply: 'Sorry, I encountered a temporary problem. You can explore the modules above or ask again!',
        language: 'en',
      },
      { status: 500 }
    );
  }
}
