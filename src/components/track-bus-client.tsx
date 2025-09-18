'use client';

import { useState, useEffect } from 'react';
import Map from '@/components/map';
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

type TrackBusClientProps = {
  bus: Bus;
  route: Route;
  busImage: ImagePlaceholder | undefined;
};

export default function TrackBusClient({ bus, route, busImage }: TrackBusClientProps) {
  // Simulate real-time bus position
  const [busPosition, setBusPosition] = useState({ lat: 19.076, lng: 72.8777 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 h-[400px] lg:h-auto rounded-lg overflow-hidden">
        <Map busPosition={busPosition} />
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
                    <span>On Time</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary"/>
                    <span>Free WiFi</span>
                </div>
                 <div className="flex items-center gap-2">
                    <BusIcon className="h-4 w-4 text-primary"/>
                    <span>AC</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
