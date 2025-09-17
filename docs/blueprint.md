# **App Name**: NMMT Tracker

## Core Features:

- Authentication: Allow passengers to log in and register via Firebase Authentication, distinguishing passenger and admin roles.
- Homepage: Display a list of available buses with details such as route, timings, and bus number based on uploaded timetable data.
- Real-Time Bus Tracking: Integrate Google Maps API to show live bus locations; each bus will have a 'Track' button that opens a map with a real-time bus marker.
- Occupancy Prediction: Use an LLM tool that incorporates historical occupancy data to generate a real-time occupancy prediction.
- Ticket Booking: Enable users to select a bus, pick boarding and destination points, and generate a booking receipt or QR code.
- Admin Dashboard: Allow admins to upload and update the bus timetable and view total bookings. Display dummy data representing occupancy.
- QR Code Generation: Generate QR codes upon succesful bookings.

## Style Guidelines:

- Primary color: A saturated blue (#2962FF) to reflect trust and efficiency, crucial for a transportation service. The high saturation adds a sense of energy to the otherwise calm blue, without being tiring to the eye.
- Background color: A very light blue (#F0F5FF), nearly white, to provide a clean and uncluttered backdrop that enhances readability and focuses user attention on the key information.
- Accent color: A vibrant purple (#9F00FF), for interactive elements and calls to action. Its higher brightness and saturation helps it to stand out without clashing.
- Font: 'PT Sans' (sans-serif) for both body and headline. A humanist sans-serif, it's both modern and a little warm, lending itself to a transport context.
- Simple, geometric icons to represent bus routes, stops, and other transport-related information. Follow the design of the Chalo App to maintain a familiar user experience.
- Minimalist layout with a focus on clear information hierarchy, similar to the Chalo App. Use of whitespace to avoid clutter and improve readability.
- Subtle transitions and animations for interactive elements, such as bus tracking updates, to provide a smooth and engaging user experience.