
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Bus as BusIcon, Wifi } from 'lucide-react';
import OccupancyPredictor from '@/components/occupancy-predictor';
import Image from 'next/image';
import type { Bus, Route } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useTranslation } from '@/lib/i18n/use-translation';

type TrackBusClientProps = {
  bus: Bus;
  route: Route;
  busImage: ImagePlaceholder | undefined;
};

export default function TrackBusClient({ bus, route, busImage }: TrackBusClientProps) {
  const { t } = useTranslation();
  // Simulate real-time bus data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch new bus data here.
      // For this mock, we don't need to do anything.
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 h-[400px] lg:h-auto rounded-lg overflow-hidden relative">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.995,19.03,73.045,19.06&amp;layer=mapnik"
          className="rounded-lg"
        ></iframe>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background'>
                <BusIcon className='w-6 h-6 text-primary-foreground' />
            </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-background/80 p-2 rounded-lg text-xs shadow-md backdrop-blur-sm">
          Map data from © OpenStreetMap contributors.
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{route.name}</span>
              <Badge variant="secondary">Bus #{bus.busNumber}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {busImage && (
                <div className="aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={busImage.imageUrl}
                        alt={busImage.description}
                        width={600}
                        height={400}
                        className="object-cover"
                        data-ai-hint={busImage.imageHint}
                    />
                </div>
            )}
            <OccupancyPredictor bus={bus} route={route} />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary"/>
                    <span>{t('track_bus.on_time')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary"/>
                    <span>{t('track_bus.free_wifi')}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <BusIcon className="h-4 w-4 text-primary"/>
                    <span>{t('track_bus.ac')}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
