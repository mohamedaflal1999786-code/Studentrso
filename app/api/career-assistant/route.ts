// app/api/career-assistant/route.ts
import { streamGeminiChatResponse, getGeminiApiKey, AttachmentPayload } from '@/lib/ai/gemini-service';
import { ChatMessage, StudentProfile } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      messages,
      profile,
      documentContext,
      attachment,
    }: {
      messages: ChatMessage[];
      profile?: StudentProfile;
      documentContext?: string;
      attachment?: AttachmentPayload;
    } = body;

    // 1. Validate Input Messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Message cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.content || !lastMessage.content.trim()) {
      return new Response(JSON.stringify({ error: 'Message cannot be empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Strict API Configuration Check
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'AI service is not configured. Please configure the Gemini API key on the server.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare attachment payload if passed directly or via documentContext
    let activeAttachment: AttachmentPayload | null = attachment || null;
    if (!activeAttachment && documentContext && documentContext.trim()) {
      activeAttachment = {
        name: 'Attached Document',
        content: documentContext.trim(),
        isImage: documentContext.startsWith('data:image/'),
      };
    }

    // 3. Dispatch Live Streaming Request to Google Gen AI SDK
    const { stream, model } = await streamGeminiChatResponse(messages, profile, activeAttachment);

    const wantsJson =
      body.stream === false ||
      (request.headers.get('accept')?.includes('application/json') &&
        !request.headers.get('accept')?.includes('text/event-stream'));

    if (wantsJson) {
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let fullReply = '';
      let streamErrorMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) fullReply += parsed.text;
              if (parsed.error) streamErrorMessage = parsed.error;
            } catch {
              // Ignore partial JSON frames
            }
          }
        }
      }

      if (streamErrorMessage && !fullReply) {
        return new Response(JSON.stringify({ error: streamErrorMessage }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ reply: fullReply, model }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-AI-Model': model,
        },
      });
    }

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-AI-Model': model,
      },
    });
  } catch (error: any) {
    console.error('Error in Gemini Assistant route:', error);

    const errorText = error?.message || 'Unable to connect to the AI service. Please try again.';
    const statusCode =
      errorText.includes('not configured') ? 503 :
      errorText.includes('authentication failed') ? 401 :
      errorText.includes('usage limit') ? 429 : 500;

    return new Response(
      JSON.stringify({
        error: errorText,
      }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
