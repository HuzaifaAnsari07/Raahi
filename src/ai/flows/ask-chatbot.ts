
'use server';

/**
 * @fileOverview A chatbot that can answer questions about the NMMT bus service.
 * - askChatbot - A function that handles the chatbot conversation.
 * - AskChatbotInput - The input type for the askChatbot function.
 * - AskChatbotOutput - The return type for the askChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {busRoutes, stops} from '@/lib/data';

const AskChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  history: z
    .array(z.object({role: z.enum(['user', 'model']), content: z.array(z.object({text: z.string()}))}))
    .optional()
    .describe('The conversation history.'),
});
export type AskChatbotInput = z.infer<typeof AskChatbotInputSchema>;

const AskChatbotOutputSchema = z.object({
  response: z
    .string()
    .describe('The chatbot response to the user message.'),
});
export type AskChatbotOutput = z.infer<typeof AskChatbotOutputSchema>;

export async function askChatbot(
  input: AskChatbotInput
): Promise<AskChatbotOutput> {
  return askChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askChatbotPrompt',
  input: {schema: AskChatbotInputSchema},
  output: {schema: AskChatbotOutputSchema},
  system: `You are a friendly and helpful chatbot for the NMMT (Navi Mumbai Municipal Transport) bus service. Your goal is to answer user questions about bus routes, schedules, and general information.

You MUST detect the language of the user's question and respond in the same language.

You have access to the following data about the bus service:

Bus Routes:
${JSON.stringify(busRoutes, null, 2)}

Stops:
${JSON.stringify(stops, null, 2)}

Use this data to answer user questions. Be concise and clear in your answers. If you don't know the answer, say so. Do not make up information.
`,
});

const askChatbotFlow = ai.defineFlow(
  {
    name: 'askChatbotFlow',
    inputSchema: AskChatbotInputSchema,
    outputSchema: AskChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
