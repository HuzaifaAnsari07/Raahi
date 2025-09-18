
'use client';

import BookTicketForm from '@/components/book-ticket-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { busRoutes, buses } from '@/lib/data';
import { useTranslation } from '@/lib/i18n/use-translation';
import { ArrowRight, Bus, Clock } from 'lucide-react';

export default function BookTicketPage({
  params,
}: {
  params: { busId: string };
}) {
  const { t } = useTranslation();
  const bus = buses.find((b) => b.id === params.busId);
  const route = busRoutes.find((r) => r.id === bus?.routeId);

  if (!bus || !route) {
    return <div>Bus not found</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('book_ticket.title')}</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('book_ticket.route_details_title')}</CardTitle>
            <CardDescription>{route.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              <span>{t('book_ticket.bus_number')}: {bus.busNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{t('book_ticket.departure_time')}: {bus.startTime}</span>
            </div>
            <div className="mt-4 space-y-2">
                <h4 className="font-semibold">{t('book_ticket.stops')}:</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{route.stops[0].name}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>{route.stops[route.stops.length - 1].name}</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <BookTicketForm bus={bus} route={route} />
      </div>
    </div>
  );
}
