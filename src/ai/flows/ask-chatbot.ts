
'use server';

import { ai } from '@/ai/genkit';
import { busRoutes, stops } from '@/lib/data';
import {
  AskChatbotInputSchema,
  AskChatbotOutputSchema,
  AskChatbotOutput,
  AskChatbotInput,
} from '@/ai/types';

/**
 * Public entry
 */
export async function askChatbot(
  input: AskChatbotInput
): Promise<AskChatbotOutput> {
  return askChatbotFlow(input);
}

/**
 * Stronger prompt with site context + rules so the model answers accurately
 * and in the same language the user used.
 */
const prompt = ai.definePrompt({
  name: 'askChatbotPrompt',
  input: { schema: AskChatbotInputSchema },
  output: { schema: AskChatbotOutputSchema },
  prompt: `You are a professional, friendly chatbot for the "Panvel Smart Bus Tracking" website (NMMT-style service).
The website provides: ticket booking, live bus tracking, route info, schedules, and real-time passenger counts from on-bus cameras.
Use the provided Bus Routes and Stops data to answer user questions precisely.  Be concise, actionable and polite.

Important rules:
1) Detect the user's language and reply in the same language.  
2) Preserve proper nouns, ticket IDs, bus numbers, dates and numeric values exactly as-is.  
3) Maintain punctuation and simple formatting (line breaks). Do not add unrelated text.  
4) If the requested information is available in Bus Routes or Stops, answer using that data. If not available, say "I don't have that information" (in the user's language) and offer a short alternative (e.g., "You can check live tracking" or "Contact support").  
5) If the user asks how to perform a task (book ticket, track bus), return a short step-by-step instruction (1., 2., 3.).  
6) If the user's message is ambiguous or lacks essential details (e.g., "When is the bus?"), ask a single clarifying question in the same language.  
7) Output only the answer text (no JSON wrappers, no extra commentary).

Bus Routes:
${JSON.stringify(busRoutes, null, 2)}

Stops:
${JSON.stringify(stops, null, 2)}

Website context (for better answers):
- Site: Panvel Smart Bus Tracking
- Features: ticket booking, live bus tracking on map, passenger count per bus from onboard cameras, route schedules, contact/support.
- Tone: helpful, concise, slightly formal.

Now answer the user's question (make sure to follow rules above).`,
});

/**
 * Helper: try to extract the user's actual text/question from any input shape.
 * Supports:
 * - string input
 * - { message, text, question, query }
 * - { history: [...] } or { messages: [...] } where entries can be strings or objects with text/message/content
 */
function extractMessage(input: any): string | null {
  if (!input) return null;

  // Plain string
  if (typeof input === 'string') {
    return input.trim() || null;
  }

  // If it's an array of messages (some clients send array)
  if (Array.isArray(input)) {
    // take the last non-empty string/text
    for (let i = input.length - 1; i >= 0; i--) {
      const it = input[i];
      if (!it) continue;
      if (typeof it === 'string' && it.trim()) return it.trim();
      if (typeof it === 'object') {
        const candidate = it.message || it.text || it.content || it.userMessage;
        if (candidate && typeof candidate === 'string' && candidate.trim()) return candidate.trim();
      }
    }
    return null;
  }

  // Common direct properties
  const directProps = ['message', 'text', 'question', 'query', 'input', 'userMessage'];
  for (const p of directProps) {
    if (input[p] && typeof input[p] === 'string' && input[p].trim()) {
      return input[p].trim();
    }
  }

  // history/messages arrays on object
  const listProps = ['history', 'messages', 'conversation', 'chat'];
  for (const p of listProps) {
    const arr = input[p];
    if (Array.isArray(arr) && arr.length > 0) {
      // check last element
      const last = arr[arr.length - 1];
      if (!last) continue;
      if (typeof last === 'string' && last.trim()) return last.trim();
      if (typeof last === 'object') {
        return (last.message || last.text || last.content || null) as string | null;
      }
    }
  }

  // fallback: try JSON stringify of input (not ideal)
  return null;
}

/**
 * The main flow: normalizes input, augments with site-context (non-destructive),
 * calls the prompt with retries, and returns a clean response.
 */
const askChatbotFlow = ai.defineFlow(
  {
    name: 'askChatbotFlow',
    inputSchema: AskChatbotInputSchema,
    outputSchema: AskChatbotOutputSchema,
  },
  async (input) => {
    try {
      // Normalize and extract the user's message
      const messageText = extractMessage(input as any);

      if (!messageText) {
        // clearer, actionable message to the user (in default English)
        return {
          response:
            "I couldn't detect your question. Please type your question in the chat box and send it again.",
        };
      }

      // Augment the input with a guaranteed 'message' field and light site context.
      // Cast to any to avoid strict type errors if schema differs.
      const augmentedInput: any = {
        ...(input as any),
        message: messageText,
        // small context object we add for the model (non-sensitive)
        siteContext: {
          name: 'Panvel Smart Bus Tracking',
          features: [
            'ticket booking',
            'live bus tracking',
            'passenger counting via onboard cameras',
            'route & schedule lookup',
          ],
        },
      };

      // Try the model call with a simple retry (2 attempts)
      let lastError: any = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const { output } = await prompt(augmentedInput as any);
          const answer = output?.response?.trim();

          // Log minimal debug info (server-side)
          console.log(`[askChatbot] attempt=${attempt} message="${messageText}" answer="${answer ? answer.slice(0, 200) : 'EMPTY'}"`);

          if (answer && answer.length > 0) {
            return { response: answer };
          }

          // If answer empty, continue to retry once more
          lastError = new Error('Empty answer from model');
        } catch (err) {
          console.error(`[askChatbot] model call failed (attempt ${attempt}):`, err);
          lastError = err;
          // continue to retry
        }
      }

      // All attempts failed or empty response
      console.error('[askChatbot] All attempts failed:', lastError);
      return {
        response:
          "I'm having trouble getting an answer right now. Please try again in a moment or contact support.",
      };
    } catch (err) {
      console.error('Chatbot error (unexpected):', err);
      return {
        response:
          "I'm having trouble connecting right now. Please try again later.",
      };
    }
  }
);
