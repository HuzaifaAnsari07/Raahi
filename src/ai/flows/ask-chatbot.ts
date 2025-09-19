
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
  // Check if input is empty or invalid
  if (!input || input.length === 0 || !input[input.length - 1].content[0].text) {
    return {
      response: "I didn't receive a question. Please try again.",
    };
  }

  const history = input.slice(0, -1);
  const lastUserMessage = input[input.length - 1];

  try {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: lastUserMessage.content[0].text,
      history: history,
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
    });

    return {
      response: llmResponse.text,
    };
  } catch (error) {
    console.error('Error calling AI:', error);
    return {
      response: "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.",
    };
  }
}
