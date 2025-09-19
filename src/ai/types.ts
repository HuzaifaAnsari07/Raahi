/**
 * @fileOverview Defines the types and schemas for AI flows.
 */

import {z} from 'genkit';

// ask-chatbot types
export const AskChatbotInputSchema = z
  .array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  )
  .describe('The conversation history.');
export type AskChatbotInput = z.infer<typeof AskChatbotInputSchema>;

export const AskChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AskChatbotOutput = z.infer<typeof AskChatbotOutputSchema>;

// predict-bus-occupancy types
export const PredictBusOccupancyInputSchema = z.object({
  routeId: z.string().describe('The ID of the bus route.'),
  time: z.string().describe('The current time in HH:mm format.'),
  dayOfWeek: z.string().describe('The current day of the week.'),
  historicalOccupancyData: z
    .string()
    .describe(
      'Historical occupancy data for the route, time, and day of the week.'
    ),
  currentBookings: z.number().describe('The number of current bookings.'),
});
export type PredictBusOccupancyInput = z.infer<
  typeof PredictBusOccupancyInputSchema
>;

export const PredictBusOccupancyOutputSchema = z.object({
  predictedOccupancy: z
    .number()
    .describe('The predicted occupancy of the bus (number of seats filled).'),
  confidence: z
    .string()
    .describe(
      'A confidence level for the prediction (e.g., High, Medium, Low)'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation of why the occupancy is predicted to be at this level.'
    ),
});
export type PredictBusOccupancyOutput = z.infer<
  typeof PredictBusOccupancyOutputSchema
>;
