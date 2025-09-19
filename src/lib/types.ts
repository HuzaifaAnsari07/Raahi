
export type Stop = {
  id: string;
  name: string;
  time: string; // "HH:MM"
  lat: number;
  lng: number;
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
  capacity: number;
  currentCount: number;
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

export type Contact = {
  id: string;
  name: string;
  designation: string;
  email: string;
  mobile: string;
};

export type Alert = {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};
