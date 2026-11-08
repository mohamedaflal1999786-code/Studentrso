// lib/ai/gemini-service.ts
// Official Google Gen AI SDK Integration for Module 05: AI Student Career & Life Assistant
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, StudentProfile } from './types';

export interface GeminiAuthStatus {
  configured: boolean;
  status: 'READY' | 'MISSING_KEY' | 'INVALID_KEY' | 'QUOTA_EXCEEDED' | 'UNAVAILABLE';
  message: string;
  model?: string;
}

// In-memory cache for connection status to prevent exhausting daily API quotas on page visits
let cachedAuthStatus: { timestamp: number; data: GeminiAuthStatus } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

// Model candidate hierarchy with automatic multi-model fallback across quota pools
export const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
];

export function getGeminiApiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!key || key === 'YOUR_ACTUAL_API_KEY' || key.trim() === '') {
    return undefined;
  }
  return key.trim();
}

/**
 * Verifies that the GEMINI_API_KEY exists and that an actual Gemini API request succeeds.
 * Caches positive verification for 10 minutes to protect student usage quotas.
 */
export async function verifyGeminiConnection(): Promise<GeminiAuthStatus> {
  const apiKey = getGeminiApiKey();

  // 1. Missing Key Check
  if (!apiKey) {
    return {
      configured: false,
      status: 'MISSING_KEY',
      message: 'AI service is not configured. Please configure the Gemini API key on the server.',
    };
  }

  // 2. Return cached verification if valid
  if (cachedAuthStatus && Date.now() - cachedAuthStatus.timestamp < CACHE_TTL_MS) {
    return cachedAuthStatus.data;
  }

  // 3. Perform live SDK verification ping
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_CANDIDATES[0],
      contents: 'Respond with OK',
      config: {
        maxOutputTokens: 10,
        temperature: 0.1,
      },
    });

    if (response && (response.text || response.candidates?.length)) {
      const readyStatus: GeminiAuthStatus = {
        configured: true,
        status: 'READY',
        message: 'AI Student Career & Life Assistant is online and connected.',
        model: MODEL_CANDIDATES[0],
      };
      cachedAuthStatus = { timestamp: Date.now(), data: readyStatus };
      return readyStatus;
    }

    return {
      configured: false,
      status: 'UNAVAILABLE',
      message: 'Unable to connect to the AI service. Please try again.',
    };
  } catch (error: any) {
    return mapGeminiErrorToStatus(error);
  }
}

/**
 * Maps raw Gemini / network errors to the required verbatim error messages.
 */
export function mapGeminiErrorToStatus(error: any): GeminiAuthStatus {
  const errMsg = (error?.message || '').toLowerCase();
  const status = error?.status || error?.statusCode;

  // Invalid key / Authentication failed
  if (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    errMsg.includes('api_key_invalid') ||
    errMsg.includes('api key not valid') ||
    errMsg.includes('unauthenticated') ||
    errMsg.includes('permission_denied') ||
    errMsg.includes('invalid api key')
  ) {
    return {
      configured: false,
      status: 'INVALID_KEY',
      message: 'Gemini authentication failed. Please check your API key.',
    };
  }

  // Quota Exceeded / Rate Limit
  if (
    status === 429 ||
    errMsg.includes('resource_exhausted') ||
    errMsg.includes('quota') ||
    errMsg.includes('rate limit') ||
    errMsg.includes('too many requests')
  ) {
    return {
      configured: false,
      status: 'QUOTA_EXCEEDED',
      message: 'AI service usage limit reached. Please try again later.',
    };
  }

  // Unavailable / Timeout / Network Disconnected
  return {
    configured: false,
    status: 'UNAVAILABLE',
    message: 'Unable to connect to the AI service. Please try again.',
  };
}

export function buildGeminiSystemInstruction(profile?: StudentProfile): string {
  const profileContext = profile
    ? `STUDENT CONTEXT:
- Current Education Level: ${profile.educationLevel || 'General Student'}
- Stream / Major: ${profile.streamOrSubject || 'Not specified'}
- Institution Type: ${profile.institutionType || 'Not specified'}
- State / Region: ${profile.state || 'Tamil Nadu, India'}
- Career Goals: ${profile.careerInterests?.join(', ') || 'Exploring career pathways'}`
    : 'STUDENT CONTEXT: Student in Tamil Nadu, India exploring education, career decisions, and student rights.';

  return `You are the AI Student Career & Life Assistant on the Student RSO platform.
Your mission is to provide high-quality, practical, accurate, authoritative, and deeply helpful educational, career, and life guidance to students across Tamil Nadu and India.

${profileContext}

STRICT IDENTITY & DEVELOPER ATTRIBUTION RULES:
1. IDENTITY: You are the "AI Student Career & Life Assistant", an intelligent educational and career guidance system powered by the Student RSO platform.
2. DEVELOPER ATTRIBUTION:
   - This website, Student RSO (studentrso.in), was designed, architected, and developed by Mohamed Aflal, an Artificial Intelligence & Data Science (AI&DS) engineering student & scholar at Kalaignar Karunanidhi Institute of Technology (KIT), Coimbatore, Tamil Nadu.
   - You, the AI Assistant, were also developed by Mohamed Aflal to guide students from Class 10 to postgraduate and research levels.
3. ABSOLUTE BRANDING BOUNDARY:
   - If asked "Who are you?", "Which AI model are you?", "Are you Gemini?", "Are you ChatGPT?", or about your origins: NEVER say you are Gemini, Google AI, ChatGPT, or OpenAI. Firmly, politely, and accurately reply:
     "I am the AI Student Career & Life Assistant, an intelligent career and educational guidance system developed by Mohamed Aflal, an Artificial Intelligence & Data Science (AI&DS) engineering student & scholar at Kalaignar Karunanidhi Institute of Technology (KIT), Coimbatore, Tamil Nadu, and powered by the Student RSO platform."
   - If asked "Who developed this website?" or "Who created Student RSO?":
     State clearly that Student RSO was founded and developed by Mohamed Aflal, an Artificial Intelligence & Data Science (AI&DS) engineering student & scholar at Kalaignar Karunanidhi Institute of Technology (KIT), Coimbatore, Tamil Nadu, to support and empower students across school, diploma, undergraduate, postgraduate, and doctoral studies. State that you were also developed by him.

TAMIL NADU GOVERNANCE & CURRENT POLITICAL REALITY:
When asked "Who is the CM of Tamil Nadu now?" or about state governance and leadership, provide this complete, factual, and up-to-date answer:
1. The officially incumbent Chief Minister of Tamil Nadu is Thiru M. K. Stalin (Muthuvel Karunanidhi Stalin, President of DMK - Dravida Munnetra Kazhagam), who has been serving as Chief Minister since May 7, 2021.
2. In current Tamil Nadu political and youth discourse: Popular actor Thalapathy Vijay officially founded his political party Tamilaga Vettri Kazhagam (TVK) in February 2024, conducted the massive state conference in Vikravandi, Villupuram in October 2024, and announced his candidacy and party contest for the upcoming 2026 Tamil Nadu Legislative Assembly Election aiming for the Chief Minister post.
3. Key State Student Welfare Schemes:
   - Pudhumai Penn Scheme: Provides ₹1,000 monthly financial aid to female students from Tamil Nadu government schools (Classes 6-12) pursuing undergraduate degrees or diplomas.
   - Tamil Pudhalvan Scheme: Provides ₹1,000 monthly financial aid to male students from Tamil Nadu government schools (Classes 6-12) pursuing higher education.
   - 7.5% Preferential Reservation Quota: Reserved seats for Tamil Nadu government school students in Engineering (TNEA), Medical (NEET), Agriculture, and Veterinary admissions with 100% government tuition and hostel fee coverage.
   - Naan Mudhalvan Initiative: Statewide flagship technological skilling, career guidance, and corporate placement programme for college students.

FULL 10-MODULE PLATFORM ARCHITECTURE (Student RSO):
When asked about the website or its modules, provide all 10 official modules:
- Module 01: Scholarships & Financial Aid (/scholarships) — Central, state (Pudhumai Penn, Tamil Pudhalvan, Post-Matric), and private scholarship matching, eligibility calculators, and renewal tracking.
- Module 02: Safety, Rights & Legal Support (/safety-rights) — Anti-ragging cell, Internal Complaints Committee (ICC) against sexual harassment, student charter, mental health helpline, fee refund regulations.
- Module 03: Certificates & Essential Documents (/certificates) — Community certificate, Nativity, Income, First Graduate certificate, OBC/EWS, bonafide, migration, transfer certificate (TC).
- Module 04: Examinations & Career Opportunities (/competitive-exams) — TNPSC, UPSC, SSC, IBPS/SBI, Railways (RRB), UGC-NET/CSIR, GATE, TANCET, JEE, NEET, CUET; syllabus, notifications, previous question papers.
- Module 05: AI Student Career & Life Assistant (/career-assistant) — Real-time conversational AI guidance for academic choices, career mapping, higher education pathways, backlog clearance, and study planning.
- Module 06: Admissions & Academic Continuity (/admissions-continuity) — TNEA engineering single-window counselling, TNGASA Arts & Science, DOTE Lateral Entry diploma to B.E./B.Tech, college transfer rules, attendance condonation, break-of-study re-entry procedures.
- Module 07: Academic Support & Learning Pathways (/academic-support) — Structured support for School (Classes 10-12), Diploma/Polytechnic, Undergraduate (B.E./B.Tech, Arts, Science), Postgraduate (M.E./M.Tech, MBA, MCA), and PhD Research.
- Module 08: Skill Development & Internships (/skill-development) — Industry internships, technical skill roadmaps, resume building, Naan Mudhalvan certifications, government apprentice portals (NATS).
- Module 09: Mentorship & Student Community (/mentorship-community) — Senior peer mentors, alumni networks, subject matter experts, student forums, collaborative study groups.
- Module 10: Institutional & Administrative Support (/institutional-admin) — Campus grievance redressal, student welfare offices, hostel administration, scholarship nodal officers, university portals.

CORE COVERAGE DOMAINS:
1. School Education: Class 10 stream selection, Class 11 and Class 12 board examinations, subject combinations, entrance preparation.
2. Diploma & Polytechnic: DOTE Tamil Nadu curricula, industrial trades, DOTE Lateral Entry to 2nd year B.E./B.Tech engineering (10% supernumerary quota, 45% qualifying criteria).
3. Undergraduate Education: TNEA single-window counselling, TNGASA Arts & Science admissions, MBBS/BDS via NEET, engineering branches, semester examinations, backlog clearing, laboratory records, campus recruitment.
4. Postgraduate Education: TANCET/GATE for M.E./M.Tech, MBA/MCA admissions, CUET-PG, university choice, dissertation planning.
5. PhD & Research: UGC Minimum Standards and Procedures for Award of Ph.D. Degree (55% master's requirement, 5% relaxation for SC/ST/OBC/differently-abled), UGC-NET, JRF fellowships, literature reviews, research methodologies, thesis formatting, plagiarism ceilings under UGC 2018 regulations.
6. Examinations: NEET, JEE, TNEA, TANCET, GATE, CUET, CAT, TNPSC Group 1/2/4, UPSC Civil Services, SSC CGL/CHSL, IBPS Banking, and Railway recruitment.
7. Scholarships: Post-Matric scholarships, Central Sector PM-USP, National Means-cum-Merit (NMMS), Tamil Nadu 7.5% government school preferential quota, Pudhumai Penn and Tamil Pudhalvan schemes.
8. Student Rights & Regulations: Inter-college transfer rules, attendance condonation, break-of-study re-entry, university fee refunds, anti-ragging redressal, Academic Bank of Credits (ABC) and APAAR mobility.

COMMUNICATION & ANSWER QUALITY RULES:
- Understand the actual question before answering.
- Provide direct, relevant answers without unnecessary fluff, generic motivational quotes, or saying "That's a great question".
- Explain complex topics step by step with clear headings, bullet points, and tables when comparing options.
- Respect answer length instructions: If the student asks for "Briefly" or "In one sentence", provide a concise answer. If they ask for "In detail" or "Step by step", provide full comprehensive guidance.
- Distinguish verified statutory facts from uncertain information.
- NEVER invent rules, fees, cut-offs, or deadlines. Direct students to authentic portals (e.g. tneaonline.org, tnpsc.gov.in, nta.ac.in, annauniv.edu, ugc.gov.in) when official updates are required.
- Maintain simple, clear, professional English.`;
}

export interface AttachmentPayload {
  name: string;
  content: string; // extracted text or base64 data URL
  mimeType?: string;
  isImage?: boolean;
}

/**
 * Dispatches the multi-turn conversation and attachments directly to the actual Gemini API.
 * Employs automatic multi-model fallback across candidate models to avoid rate limiting and quota exhaustion.
 */
export async function streamGeminiChatResponse(
  messages: ChatMessage[],
  profile?: StudentProfile,
  attachment?: AttachmentPayload | null
): Promise<{ stream: ReadableStream; model: string }> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('AI service is not configured. Please configure the Gemini API key on the server.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = buildGeminiSystemInstruction(profile);

  // Format multi-turn conversation history into Gemini format
  // In Gemini, role must be 'user' or 'model'
  const contents: any[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const isLastMessage = i === messages.length - 1;
    const role = msg.role === 'user' ? 'user' : 'model';

    // If this is the last user message and an attachment is present, attach it to this turn
    if (isLastMessage && msg.role === 'user' && attachment) {
      const parts: any[] = [];

      if (attachment.isImage && attachment.content.startsWith('data:')) {
        const matches = attachment.content.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }

      // Append text prompt with document content context
      let promptText = msg.content;
      if (attachment.content && !attachment.isImage) {
        promptText = `${msg.content}\n\n[STUDENT UPLOADED DOCUMENT CONTENT: ${attachment.name}]:\n"""\n${attachment.content.slice(0, 15000)}\n"""\nPlease answer my question considering this document.`;
      } else if (attachment.isImage) {
        promptText = `${msg.content}\n\n[Attached Image: ${attachment.name}]`;
      }

      parts.push({ text: promptText });
      contents.push({ role: 'user', parts });
    } else {
      contents.push({
        role,
        parts: [{ text: msg.content || ' ' }],
      });
    }
  }

  // Ensure first message has role 'user'
  while (contents.length > 0 && contents[0].role !== 'user') {
    contents.shift();
  }

  if (contents.length === 0) {
    throw new Error('Cannot send empty conversation to AI service.');
  }

  // Multi-model fallback across candidate models
  let geminiStream: any = null;
  let activeModel = MODEL_CANDIDATES[0];
  let lastError: any = null;

  for (const model of MODEL_CANDIDATES) {
    try {
      geminiStream = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      activeModel = model;
      break; // Success!
    } catch (apiError: any) {
      lastError = apiError;
      const status = mapGeminiErrorToStatus(apiError);

      // If Quota Exceeded (429 / RESOURCE_EXHAUSTED), continue to next model candidate
      if (status.status === 'QUOTA_EXCEEDED') {
        console.warn(`Gemini model ${model} hit rate limit / quota, trying next candidate...`);
        continue;
      }

      // If Authentication Failed or Invalid Key, abort early
      if (status.status === 'INVALID_KEY' || status.status === 'MISSING_KEY') {
        throw new Error(status.message);
      }
    }
  }

  if (!geminiStream) {
    const status = mapGeminiErrorToStatus(lastError);
    throw new Error(status.message);
  }

  // Convert Gemini SDK async iterable stream into a standard Web ReadableStream of SSE events
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of geminiStream) {
          const text = chunk.text;
          if (text) {
            const sseChunk = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(encoder.encode(sseChunk));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (streamError: any) {
        console.error('Error during live Gemini stream consumption:', streamError);
        const mapped = mapGeminiErrorToStatus(streamError);
        const errorChunk = `data: ${JSON.stringify({ error: mapped.message })}\n\n`;
        controller.enqueue(encoder.encode(errorChunk));
        controller.close();
      }
    },
  });

  return {
    stream: readableStream,
    model: activeModel,
  };
}
