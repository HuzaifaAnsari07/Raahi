import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings } from "@/lib/data";
import { Bus, Clock, Ticket, User, MapPin } from "lucide-react";
import Image from "next/image";

export default function BookingConfirmationPage({ params }: { params: { bookingId: string } }) {
  const booking = bookings.find(b => b.id === params.bookingId);

  if (!booking) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Not Found</CardTitle>
          <CardDescription>We couldn't find a booking with that ID.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(booking.qrData)}`;

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your e-ticket is ready. Show this QR code to the conductor.</p>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground text-center p-4 rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Ticket /> E-Ticket
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-lg">
              <Image
                src={qrCodeUrl}
                alt="Booking QR Code"
                width={256}
                height={256}
                className="rounded-md"
              />
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div className="grid gap-0.5">
                <p className="font-medium">Passenger</p>
                <p className="text-muted-foreground">{booking.passengerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bus className="h-5 w-5 text-primary" />
              <div className="grid gap-0.5">
                <p className="font-medium">Bus & Route</p>
                <p className="text-muted-foreground">{booking.busNumber} - {booking.routeName}</p>
              </div>
            </div>
             <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="grid gap-0.5">
                <p className="font-medium">Journey</p>
                <p className="text-muted-foreground">{booking.fromStop} to {booking.toStop}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="grid gap-0.5">
                <p className="font-medium">Booking Time</p>
                <p className="text-muted-foreground">{booking.bookingTime}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
