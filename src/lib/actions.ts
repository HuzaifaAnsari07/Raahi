'use server';

import { z } from 'zod';
import { bookings, buses, busRoutes, stops } from './data';
import { redirect } from 'next/navigation';

const bookingSchema = z.object({
  busId: z.string(),
  fromStop: z.string(),
  toStop: z.string(),
});

export async function createBooking(data: z.infer<typeof bookingSchema>) {
  // This function is no longer used for the primary booking flow to avoid "Booking not found" errors
  // in a stateless mock environment. The logic has been moved to the client-side in `book-ticket-form.tsx`.
  // It is kept here for reference or future database integration.
  
  const validatedData = bookingSchema.parse(data);
  const bus = buses.find((b) => b.id === validatedData.busId);
  const route = busRoutes.find((r) => r.id === bus?.routeId);
  const fromStop = stops.find((s) => s.id === validatedData.fromStop);
  const toStop = stops.find((s) => s.id === validatedData.toStop);

  if (!bus || !route || !fromStop || !toStop) {
    throw new Error('Invalid booking details');
  }

  const newBookingId = `booking-${bookings.length + 1}`;
  const bookingTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const newBooking = {
    id: newBookingId,
    userId: 'user-1', // Mock user
    busId: bus.id,
    busNumber: bus.busNumber,
    routeName: route.name,
    fromStop: fromStop.name,
    toStop: toStop.name,
    bookingTime: bookingTime,
    passengerName: "Passenger", // Mock data
    qrData: JSON.stringify({
        bookingId: newBookingId,
        bus: bus.busNumber,
        route: route.name,
        from: fromStop.name,
        to: toStop.name,
        time: bookingTime,
    }),
  };
  
  // In a real app, you would save this to Firestore
  bookings.push(newBooking);

  return newBookingId;
}

const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  busNumber: z.string().optional(),
  message: z.string().min(10, 'Feedback message must be at least 10 characters.'),
});

export async function submitFeedback(data: z.infer<typeof feedbackSchema>) {
  const validatedData = feedbackSchema.parse(data);

  // In a real app, you would save this to the 'feedback' collection in Firestore
  console.log('New feedback submitted:', validatedData);

  return { success: true, message: 'Thank you for your feedback!' };
}
