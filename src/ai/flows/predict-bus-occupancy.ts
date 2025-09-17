// src/ai/flows/predict-bus-occupancy.ts
'use server';

/**
 * @fileOverview Predicts bus occupancy based on historical data and real-time information.
 *
 * - predictBusOccupancy - A function that predicts the bus occupancy.
 * - PredictBusOccupancyInput - The input type for the predictBusOccupancy function.
 * - PredictBusOccupancyOutput - The return type for the predictBusOccupancy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictBusOccupancyInputSchema = z.object({
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

const PredictBusOccupancyOutputSchema = z.object({
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

export async function predictBusOccupancy(
  input: PredictBusOccupancyInput
): Promise<PredictBusOccupancyOutput> {
  return predictBusOccupancyFlow(input);
}

const predictBusOccupancyPrompt = ai.definePrompt({
  name: 'predictBusOccupancyPrompt',
  input: {schema: PredictBusOccupancyInputSchema},
  output: {schema: PredictBusOccupancyOutputSchema},
  prompt: `You are a bus occupancy prediction expert. Given the historical occupancy data, current bookings, route, day of the week, and time, predict the occupancy of the bus.

Historical Occupancy Data: {{{historicalOccupancyData}}}
Current Bookings: {{{currentBookings}}}
Route ID: {{{routeId}}}
Day of Week: {{{dayOfWeek}}}
Current Time: {{{time}}}

Consider these factors and provide a predicted occupancy (number of seats filled), a confidence level (High, Medium, Low), and a reason for your prediction.

Adhere to the following:
- Predicted occupancy must be a number.
- Confidence must be High, Medium, or Low.
- Reason must be concise and explain the prediction.

Output must be JSON.`,
});

const predictBusOccupancyFlow = ai.defineFlow(
  {
    name: 'predictBusOccupancyFlow',
    inputSchema: PredictBusOccupancyInputSchema,
    outputSchema: PredictBusOccupancyOutputSchema,
  },
  async input => {
    const {output} = await predictBusOccupancyPrompt(input);
    return output!;
  }
);
