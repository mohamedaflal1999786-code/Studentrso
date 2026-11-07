// lib/ai/provider-router.ts
import {
  ChatMessage,
  StudentProfile,
  AnswerLengthPreference,
  AIProviderId,
  AIProviderStatus
} from './types';
import { generateGroundedResponse } from './grounded-knowledge-engine';

export function getAvailableProviders(): AIProviderStatus[] {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const groqKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here' ? process.env.GROQ_API_KEY : undefined;

  return [
    {
      id: 'grounded-engine',
      name: 'Student RSO Grounded Engine',
      isAvailable: true,
      model: 'TN-Statutory-v2.0',
      description: 'Built-in verified knowledge engine for Tamil Nadu and Indian curricula, admissions, and careers.',
      envKeyRequired: 'None (Built-in Active Engine)',
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      isAvailable: Boolean(geminiKey),
      model: 'gemini-1.5-flash',
      description: 'Google DeepMind flagship multimodal educational intelligence.',
      envKeyRequired: 'GEMINI_API_KEY',
    },
    {
      id: 'openai',
      name: 'OpenAI GPT-4o',
      isAvailable: Boolean(openaiKey),
      model: 'gpt-4o-mini',
      description: 'Advanced conversational reasoning with high instructional fidelity.',
      envKeyRequired: 'OPENAI_API_KEY',
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      isAvailable: Boolean(anthropicKey),
      model: 'claude-3-5-haiku-20241022',
      description: 'Nuanced academic research, synthesis, and writing assistance.',
      envKeyRequired: 'ANTHROPIC_API_KEY',
    },
    {
      id: 'groq',
      name: 'Groq Llama 3',
      isAvailable: Boolean(groqKey),
      model: 'llama-3.3-70b-versatile',
      description: 'Ultra-low-latency open-weight inference engine.',
      envKeyRequired: 'GROQ_API_KEY',
    },
  ];
}

export function selectActiveProvider(requestedProvider: AIProviderId = 'auto'): AIProviderId {
  if (requestedProvider !== 'auto' && requestedProvider !== 'grounded-engine') {
    const providers = getAvailableProviders();
    const match = providers.find((p) => p.id === requestedProvider);
    if (match && match.isAvailable) {
      return requestedProvider;
    }
  }

  // Auto-detection priority
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY) return 'gemini';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') return 'groq';

  // Reliable Grounded Knowledge Fallback
  return 'grounded-engine';
}

export function buildSystemPrompt(profile?: StudentProfile, lengthPref?: AnswerLengthPreference): string {
  const profileInfo = profile
    ? `STUDENT PROFILE:
- Current Education Level: ${profile.educationLevel || 'Not specified'}
- Stream / Subject: ${profile.streamOrSubject || 'Not specified'}
- Institution Type: ${profile.institutionType || 'Not specified'}
- State: ${profile.state || 'Tamil Nadu'}
- Career Interests: ${profile.careerInterests?.join(', ') || 'Not specified'}
- Preferred Learning Style: ${profile.preferredLearningStyle || 'Step-by-step'}
`
    : 'STUDENT PROFILE: Anonymous guest student in Tamil Nadu, India.\n';

  return `You are the Student RSO AI Career & Life Assistant, an international-grade, reliable, conversational educational guide serving students across Tamil Nadu and India.

${profileInfo}

CORE PRINCIPLES:
1. Cover the student's entire educational journey: Class 10 -> Class 11-12 -> Diploma/Polytechnic -> Undergraduate -> Postgraduate -> PhD/Research -> Career.
2. NEVER invent application deadlines, fees, eligibility rules, or official opportunities. Rely on official statutory bodies: UGC, AICTE, NTA, TNPSC, Anna University (TNEA), DME Tamil Nadu, UPSC, SSC, and DOTE.
3. Answer the student's ACTUAL question directly. Do not give generic motivational filler or say "That's a great question" at the beginning of responses.
4. STRICT LENGTH CONTROL:
   - If user asks for "in detail", provide an exhaustive, structured guide with headings and next steps.
   - If user asks for "briefly" or "brief", provide 2-4 focused bullet points.
   - If user asks for "in one sentence", return exactly ONE sentence.
   - If user asks for "step by step", format in numbered sequential steps.
   - If user asks for "explain like a beginner", use simple everyday terms and analogies.
   - If user asks to "compare", use Markdown comparison tables.
   - If user asks for "only the answer", output only the conclusion without introductory preamble.
5. In academic research questions (PhD/Masters), NEVER invent DOIs, authors, or citations. Guide on methodology, research gap identification, proposals, and UGC regulations honestly.
6. The default language is English. Only use another language if the student explicitly asks you to speak or explain in that language.`;
}

/**
 * Creates a streaming ReadableStream for the chat response
 */
export async function streamChatResponse(
  messages: ChatMessage[],
  profile?: StudentProfile,
  lengthPref: AnswerLengthPreference = 'auto',
  providerPreference: AIProviderId = 'auto'
): Promise<{ stream: ReadableStream; activeProvider: AIProviderId; activeModel: string }> {
  const activeProvider = selectActiveProvider(providerPreference);

  // 1. Live Google Gemini API Integration
  if (activeProvider === 'gemini') {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (key) {
      try {
        const stream = await callGeminiStreaming(key, messages, profile, lengthPref);
        return { stream, activeProvider: 'gemini', activeModel: 'gemini-1.5-flash' };
      } catch (err) {
        console.warn('Gemini stream failed, falling back to Grounded Engine:', err);
      }
    }
  }

  // 2. Live OpenAI API Integration
  if (activeProvider === 'openai') {
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      try {
        const stream = await callOpenAIStreaming(key, messages, profile, lengthPref);
        return { stream, activeProvider: 'openai', activeModel: 'gpt-4o-mini' };
      } catch (err) {
        console.warn('OpenAI stream failed, falling back to Grounded Engine:', err);
      }
    }
  }

  // 3. Live Groq API Integration
  if (activeProvider === 'groq') {
    const key = process.env.GROQ_API_KEY;
    if (key && key !== 'your_groq_api_key_here') {
      try {
        const stream = await callGroqStreaming(key, messages, profile, lengthPref);
        return { stream, activeProvider: 'groq', activeModel: 'llama-3.3-70b-versatile' };
      } catch (err) {
        console.warn('Groq stream failed, falling back to Grounded Engine:', err);
      }
    }
  }

  // 4. Grounded Knowledge Engine (Default & Fallback)
  const groundedResult = generateGroundedResponse(messages, profile, lengthPref);
  const stream = createSimulatedStream(groundedResult.content);

  return {
    stream,
    activeProvider: 'grounded-engine',
    activeModel: 'TN-Statutory-v2.0',
  };
}

/**
 * Calls Google Gemini Streaming endpoint
 */
async function callGeminiStreaming(
  apiKey: string,
  messages: ChatMessage[],
  profile?: StudentProfile,
  lengthPref?: AnswerLengthPreference
): Promise<ReadableStream> {
  const systemInstruction = buildSystemPrompt(profile, lengthPref);

  const contents = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok || !response.body) {
    throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  return new ReadableStream({
    async start(controller) {
      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch (e) {
                // Ignore parse errors on partial frames
              }
            }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

/**
 * Calls OpenAI Streaming endpoint
 */
async function callOpenAIStreaming(
  apiKey: string,
  messages: ChatMessage[],
  profile?: StudentProfile,
  lengthPref?: AnswerLengthPreference
): Promise<ReadableStream> {
  const systemPrompt = buildSystemPrompt(profile, lengthPref);

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
      stream: true,
      temperature: 0.5,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`OpenAI API error: ${response.status} ${await response.text()}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  return new ReadableStream({
    async start(controller) {
      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.choices?.[0]?.delta?.content;
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch (e) {
                // Ignore parse errors on partial chunks
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

/**
 * Calls Groq Streaming endpoint
 */
async function callGroqStreaming(
  apiKey: string,
  messages: ChatMessage[],
  profile?: StudentProfile,
  lengthPref?: AnswerLengthPreference
): Promise<ReadableStream> {
  const systemPrompt = buildSystemPrompt(profile, lengthPref);

  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
      stream: true,
      temperature: 0.5,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Groq API error: ${response.status} ${await response.text()}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  return new ReadableStream({
    async start(controller) {
      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.choices?.[0]?.delta?.content;
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch (e) {
                // Ignore
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

/**
 * Creates a simulated token stream from full text
 */
function createSimulatedStream(fullText: string): ReadableStream {
  const encoder = new TextEncoder();
  const words = fullText.split(' ');

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i += 3) {
        const chunk = words.slice(i, i + 3).join(' ') + (i + 3 < words.length ? ' ' : '');
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        // Small delay for natural streaming feeling
        await new Promise((r) => setTimeout(r, 12));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
}
