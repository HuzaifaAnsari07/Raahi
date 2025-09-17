import type { Stop, Route, Bus, Booking, Contact, Alert, FAQ } from './types';

export const stops: Stop[] = [
  { id: 'stop-1', name: 'Vashi Bus Stn', time: '08:00' },
  { id: 'stop-2', name: 'Turbhe Naka', time: '08:10' },
  { id: 'stop-3', name: 'Juinagar Stn', time: '08:20' },
  { id: 'stop-4', name: 'Nerul LP', time: '08:30' },
  { id: 'stop-5', name: 'CBD Belapur', time: '08:45' },
  { id: 'stop-6', name: 'Panvel', time: '09:15' },
  { id: 'stop-7', name: 'Thane Stn', time: '09:00' },
  { id: 'stop-8', name: 'Airoli', time: '08:40' },
];

export const busRoutes: Route[] = [
  {
    id: 'route-1',
    name: 'Route 10: Vashi to CBD Belapur',
    stops: [stops[0], stops[1], stops[2], stops[3], stops[4]],
  },
  {
    id: 'route-2',
    name: 'Route 22: Nerul to Panvel',
    stops: [stops[3], stops[4], stops[5]],
  },
  {
    id: 'route-3',
    name: 'Route 45: Vashi to Thane',
    stops: [stops[0], stops[7], stops[6]],
  },
   {
    id: 'route-4',
    name: 'Route 5B: CBD Belapur to Vashi',
    stops: [stops[4], stops[3], stops[2], stops[1], stops[0]],
  },
];

export const buses: Bus[] = [
  { id: 'bus-1', busNumber: 'MH-43-1234', routeId: 'route-1', startTime: '08:00', totalSeats: 50 },
  { id: 'bus-2', busNumber: 'MH-43-5678', routeId: 'route-2', startTime: '08:30', totalSeats: 50 },
  { id: 'bus-3', busNumber: 'MH-43-9012', routeId: 'route-3', startTime: '08:00', totalSeats: 50 },
  { id: 'bus-4', busNumber: 'MH-43-3456', routeId: 'route-4', startTime: '09:00', totalSeats: 50 },
  { id: 'bus-5', busNumber: 'MH-43-7890', routeId: 'route-1', startTime: '09:30', totalSeats: 50 },
  { id: 'bus-6', busNumber: 'MH-43-2109', routeId: 'route-2', startTime: '10:00', totalSeats: 50 },
];

export const bookings: Booking[] = [
    {
        id: 'booking-1',
        userId: 'user-1',
        busId: 'bus-1',
        busNumber: 'MH-43-1234',
        routeName: 'Route 10: Vashi to CBD Belapur',
        fromStop: 'Vashi Bus Stn',
        toStop: 'Nerul LP',
        bookingTime: 'Tue, Jul 23, 2024, 10:30 AM',
        passengerName: 'Jane Doe',
        qrData: '{"bookingId":"booking-1","bus":"MH-43-1234","route":"Route 10: Vashi to CBD Belapur","from":"Vashi Bus Stn","to":"Nerul LP","time":"Tue, Jul 23, 2024, 10:30 AM"}'
    }
];

export const contacts: Contact[] = [
  { id: '1', name: 'Mr. John Doe', designation: 'Transport Manager', email: 'manager@nmmt.com', mobile: '9876543210' },
  { id: '2', name: 'Ms. Jane Smith', designation: 'Customer Support Head', email: 'support@nmmt.com', mobile: '9876543211' },
  { id: '3', name: 'Mr. Alex Johnson', designation: 'Route In-charge (Vashi)', email: 'vashi.route@nmmt.com', mobile: '9876543212' },
  { id: '4', name: 'Ms. Priya Singh', designation: 'Route In-charge (Thane)', email: 'thane.route@nmmt.com', mobile: '9876543213' },
];

export const alerts: Alert[] = [
    { id: 'alert-1', message: 'Bus number MH-43-1234 on Route 10 is delayed by 15 minutes due to traffic.', type: 'warning' },
    { id: 'alert-2', message: 'Route 45 towards Thane will be diverted via Airoli Circle from 2 PM to 5 PM today.', type: 'danger' },
    { id: 'alert-3', message: 'Weekend special services are now available for all major routes. Check the schedule.', type: 'info' }
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Where is my bus right now?',
    answer: 'You can track your bus in real-time by clicking the "Track" button on the dashboard for your selected bus. This will open a live map showing the bus\'s current location.'
  },
  {
    id: 'faq-2',
    question: 'How do I book a ticket?',
    answer: 'On the dashboard, find your desired bus and click the "Book Ticket" button. You will be taken to a page where you can select your boarding and destination stops to confirm your booking.'
  },
  {
    id: 'faq-3',
    question: 'What is the helpline number?',
    answer: 'Our customer service helpline number is 9876543211. You can also find other contact details on our "Contact List" page.'
  },
  {
    id: 'faq-4',
    question: 'How can I give feedback?',
    answer: 'We value your feedback! Please visit the "Feedback" page from the sidebar menu to submit your comments or suggestions using our feedback form.'
  }
];
