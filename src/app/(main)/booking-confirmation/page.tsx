'use client';

// app/(main)/booking-confirmation/page.js
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function BookingPage() {
  return (
    <Suspense fallback={<p>Loading booking details...</p>}>
      <BookingClient />
    </Suspense>
  );
}



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n/use-translation";
import { Bus, Clock, Ticket, User, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const booking = {
    passengerName: searchParams.get('passengerName') || 'Passenger',
    bookingTime: searchParams.get('bookingTime') || new Date().toLocaleString(),
    busNumber: searchParams.get('busNumber') || 'N/A',
    routeName: searchParams.get('routeName') || 'N/A',
    fromStop: searchParams.get('fromStop') || 'N/A',
    toStop: searchParams.get('toStop') || 'N/A',
  };

  const bookingId = `booking-${Math.random().toString(36).substr(2, 9)}`;

  const qrData = JSON.stringify({
    bookingId,
    ...booking,
  });
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('booking_confirmation.title')}</h1>
        <p className="text-muted-foreground">{t('booking_confirmation.description')}</p>
      </div>
      <Card className="w-full max-w-md shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image src="/NMMTlogo.jpg" alt="NMMT Logo" width={32} height={32} className="rounded-sm" />
                <CardTitle className="text-xl">{t('booking_confirmation.eticket_title')}</CardTitle>
            </div>
            <Ticket className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 flex justify-center bg-gray-100 dark:bg-gray-800">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Image
                src={qrCodeUrl}
                alt="Booking QR Code"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
          </div>
          <Separator />
          <div className="p-6 space-y-4 text-sm">
             <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                        <p className="font-medium">{t('booking_confirmation.passenger_label')}</p>
                        <p className="text-muted-foreground">{booking.passengerName}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                        <p className="font-medium">{t('booking_confirmation.booking_time_label')}</p>
                        <p className="text-muted-foreground">{booking.bookingTime}</p>
                    </div>
                </div>
            </div>

            <Separator />
            
            <div className="flex items-start gap-3">
              <Bus className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{t('booking_confirmation.bus_route_label')}</p>
                <p className="text-muted-foreground">{booking.busNumber} - {booking.routeName}</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{t('booking_confirmation.journey_label')}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{booking.fromStop}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>{booking.toStop}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
