export type Stop = {
  id: string;
  name: string;
  time: string; // "HH:MM"
};

export type Route = {
  id: string;
  name: string;
  stops: Stop[];
};

export type Bus = {
  id: string;
  busNumber: string;
  routeId: string;
  startTime: string; // "HH:MM"
  totalSeats: number;
};

export type Booking = {
  id:string;
  userId: string;
  busId: string;
  busNumber: string;
  routeName: string;
  fromStop: string;
  toStop: string;
  bookingTime: string;
  passengerName: string;
  qrData: string;
};

export type UserRole = 'passenger' | 'admin';
