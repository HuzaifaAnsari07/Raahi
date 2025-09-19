
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
  // Mocked response to avoid API quota errors.
  return {
    response:
      'The AI model quota has been exceeded. This is a mocked response.',
  };
}
