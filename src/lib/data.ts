import type { Stop, Route, Bus, Booking } from './types';

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
