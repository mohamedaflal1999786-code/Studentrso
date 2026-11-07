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

export function getGeminiApiKey(): string | undefined {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!key || key === 'YOUR_ACTUAL_API_KEY' || key.trim() === '') {
    return undefined;
  }
  return key.trim();
}

/**
 * Verifies that the GEMINI_API_KEY exists and that an actual Gemini API request succeeds.
 * Returns the exact error message required if authentication or connection fails.
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

  // 2. Perform live SDK verification ping
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'Respond with OK',
      config: {
        maxOutputTokens: 10,
        temperature: 0.1,
      },
    });

    if (response && (response.text || response.candidates?.length)) {
      return {
        configured: true,
        status: 'READY',
        message: 'AI Student Career & Life Assistant is online and connected.',
        model: 'gemini-3.5-flash',
      };
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
 * Maps raw Gemini / network errors to the user's required verbatim error messages.
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
    : 'STUDENT CONTEXT: Student in Tamil Nadu, India exploring education and career decisions.';

  return `You are the AI Student Career & Life Assistant on the Student RSO platform.
Your mission is to provide high-quality, practical, accurate, and deeply helpful educational and career guidance to students across Tamil Nadu and India.

${profileContext}

CORE COVERAGE DOMAINS:
1. School Education: Class 10 stream selection, Class 11 and Class 12 board examinations, subject combinations, entrance preparation.
2. Diploma & Polytechnic: DOTE Tamil Nadu curricula, industrial trades, DOTE Lateral Entry to 2nd year B.E./B.Tech engineering (10% supernumerary quota, 45% qualifying criteria).
3. Undergraduate Education: TNEA single-window counselling, TNGASA Arts & Science admissions, MBBS/BDS via NEET, engineering branches, semester examinations, backlog clearing, laboratory records, campus recruitment.
4. Postgraduate Education: TANCET/GATE for M.E./M.Tech, MBA/MCA admissions, CUET-PG, university choice, dissertation planning.
5. PhD & Research: UGC Minimum Standards and Procedures for Award of Ph.D. Degree (55% master's requirement, 5% relaxation for SC/ST/OBC/differently-abled), UGC-NET, JRF fellowships, literature reviews, research methodologies, thesis formatting, plagiarism ceilings under UGC 2018 regulations.
6. Examinations: NEET, JEE, TNEA, TANCET, GATE, CUET, CAT, TNPSC Group 1/2/4, UPSC Civil Services, SSC CGL/CHSL, IBPS Banking, and Railway recruitment.
7. Scholarships: Post-Matric scholarships, Central Sector PM-USP, National Means-cum-Merit (NMMS), Tamil Nadu 7.5% government school preferential quota, Pudhumai Penn and Tamil Pudhalvan schemes.
8. Student Rights & Regulations: Inter-college transfer rules, attendance condonation, break-of-study re-entry, university fee refunds, anti-ragging redressal, Academic Bank of Credits (ABC) and APAAR mobility.
9. Student RSO Website: Module 01 (Scholarships), Module 02 (Safety & Rights), Module 03 (Certificates & Documents), Module 04 (Exams & Opportunities), Module 05 (AI Assistant), Module 06 (Admissions & Continuity), Module 07 (Academic Support & Learning).

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
 * Never uses simulated or mock responses.
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

  let geminiStream: any;
  const targetModel = 'gemini-3.5-flash';

  try {
    geminiStream = await ai.models.generateContentStream({
      model: targetModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  } catch (apiError: any) {
    const status = mapGeminiErrorToStatus(apiError);
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
    model: targetModel,
  };
}
