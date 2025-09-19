'use server';

import { ai } from '@/ai/genkit';
import { busRoutes, stops } from '@/lib/data';
import {
  AskChatbotInputSchema,
  AskChatbotOutputSchema,
  AskChatbotOutput,
  AskChatbotInput,
} from '@/ai/types';

export async function askChatbot(
  input: AskChatbotInput
): Promise<AskChatbotOutput> {
  return askChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askChatbotPrompt',
  input: { schema: AskChatbotInputSchema },
  output: { schema: AskChatbotOutputSchema },
  prompt: `You are a friendly and helpful chatbot for the NMMT (Navi Mumbai Municipal Transport) bus service. Your goal is to answer user questions about bus routes, schedules, and general information.

You MUST detect the language of the user's question and respond in the same language.

You have access to the following data about the bus service:

Bus Routes:
${JSON.stringify(busRoutes, null, 2)}

Stops:
${JSON.stringify(stops, null, 2)}

Use this data to answer user questions. Be concise and clear in your answers. If you don't know the answer, say so. Do not make up information.`,
});

const askChatbotFlow = ai.defineFlow(
  {
    name: 'askChatbotFlow',
    inputSchema: AskChatbotInputSchema,
    outputSchema: AskChatbotOutputSchema,
  },
  async (history) => {
    try {
      if (!history || history.length === 0) {
        return {
          response:
            "I'm having trouble connecting right now. Please try again later.",
        };
      }
      
      const { output } = await prompt(history);

      return {
        response:
          output?.response?.trim() ||
          "I'm having trouble connecting right now. Please try again later.",
      };
    } catch (err) {
      console.error('Chatbot error:', err);
      return {
        response:
          "I'm having trouble connecting right now. Please try again later.",
      };
    }
  }
);