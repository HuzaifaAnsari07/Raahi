// src/ai/flows/predict-bus-occupancy.ts
'use server';

/**
 * @fileOverview Predicts bus occupancy based on historical data and real-time information.
 *
 * - predictBusOccupancy - A function that predicts the bus occupancy.
 */

import {ai} from '@/ai/genkit';
import {
  PredictBusOccupancyInput,
  PredictBusOccupancyInputSchema,
  PredictBusOccupancyOutput,
  PredictBusOccupancyOutputSchema,
} from '@/ai/types';

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
