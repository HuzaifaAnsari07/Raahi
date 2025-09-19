
'use server';

/**
 * @fileOverview A chatbot AI agent that responds to user queries.
 *
 * - askChatbot - A function that handles the chatbot conversation.
 * - AskChatbotInput - The input type for the askChatbot function.
 * - AskChatbotOutput - The return type for the askChatbot function.
 */

import {ai} from '@/ai/genkit';
import {
  AskChatbotInput,
  AskChatbotOutput,
  AskChatbotOutputSchema,
} from '@/ai/types';

export async function askChatbot(
  input: AskChatbotInput
): Promise<AskChatbotOutput> {
  const llmResponse = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: {
      messages: input,
      system: `You are a helpful and friendly chatbot for the NMMT Raahi bus transport app. Your goal is to assist users with their questions about bus routes, schedules, and using the app.

      Keep your responses concise and to the point.

      You have access to the following information:
      - Bus Routes:
        - Route 10: Vashi to CBD Belapur
        - Route 22: Nerul to Panvel
        - Route 45: Vashi to Thane
        - Route 5B: CBD Belapur to Vashi
      - Key Features:
        - Users can track buses live on the map.
        - Users can book e-tickets directly in the app.
        - The app has a customer service section with FAQs and emergency contacts.
      
      When asked about something you don't know, politely say that you cannot provide that information.`,
    },
    output: {
      schema: AskChatbotOutputSchema,
    },
  });

  return (
    llmResponse.output || {
      response: "I'm sorry, I couldn't generate a response.",
    }
  );
}
