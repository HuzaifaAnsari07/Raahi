
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
  // Rule: Prevent currentCount from exceeding capacity.
  if (input.currentBookings >= input.capacity) {
    return {
      predictedOccupancy: input.capacity,
      confidence: 'High',
      reason: 'Bus is at full capacity based on current bookings.',
    };
  }
  return predictBusOccupancyFlow(input);
}

const predictBusOccupancyPrompt = ai.definePrompt({
  name: 'predictBusOccupancyPrompt',
  input: {schema: PredictBusOccupancyInputSchema},
  output: {schema: PredictBusOccupancyOutputSchema},
  prompt: `You are a bus occupancy prediction expert. Given the historical occupancy data, current bookings, bus capacity, route, day of the week, and time, predict the occupancy of the bus.

The predicted occupancy cannot exceed the bus's capacity.

Historical Occupancy Data: {{{historicalOccupancyData}}}
Current Bookings: {{{currentBookings}}}
Bus Capacity: {{{capacity}}}
Route ID: {{{routeId}}}
Day of Week: {{{dayOfWeek}}}
Current Time: {{{time}}}

Consider these factors and provide a predicted occupancy (number of seats filled), a confidence level (High, Medium, Low), and a reason for your prediction. The final predicted occupancy must not exceed the capacity.

Adhere to the following:
- Predicted occupancy must be a number and not exceed {{{capacity}}}.
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
    // Final check to ensure the model's prediction doesn't exceed capacity
    if (output && output.predictedOccupancy > input.capacity) {
        output.predictedOccupancy = input.capacity;
        output.reason = "Adjusted prediction to match bus capacity."
    }
    return output!;
  }
);
