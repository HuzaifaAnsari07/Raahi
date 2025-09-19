
'use client';

import AlertsBanner from '@/components/alerts-banner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buses, busRoutes } from '@/lib/data';
import { ArrowRight, Bus, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import OccupancyPredictor from '@/components/occupancy-predictor';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { Route as RouteType } from '@/lib/types';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (routeId: string) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.includes(routeId);
      if (isFavorite) {
        toast({ title: "Route removed from favorites." });
        return prevFavorites.filter(id => id !== routeId);
      } else {
        toast({ title: "Route added to favorites!" });
        return [...prevFavorites, routeId];
      }
    });
  };

  const favoriteRoutes = busRoutes.filter(route => favorites.includes(route.id));
  
  // Find the next available bus for each favorite route
  const favoriteBuses = favoriteRoutes
    .map(route => {
      return buses.find(bus => bus.routeId === route.id);
    })
    .filter((bus): bus is NonNullable<typeof bus> => bus !== undefined);


  return (
    <div className="flex flex-col gap-8">
      <AlertsBanner />

      {favoriteBuses.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Favorite Routes</h2>
            <p className="text-muted-foreground">
              Your daily routes, just a click away.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteBuses.map((bus) => {
              const route = busRoutes.find((r) => r.id === bus.routeId);
              if (!route) return null;

              const from = route.stops[0].name;
              const to = route.stops[route.stops.length - 1].name;
              const isFavorite = favorites.includes(route.id);

              return (
                <Card key={bus.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{route.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleFavorite(route.id)}
                        aria-label="Toggle Favorite"
                      >
                        <Star className={cn("h-5 w-5 text-muted-foreground", isFavorite && "fill-yellow-400 text-yellow-500")} />
                      </Button>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2">
                      <span>{from}</span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      <span>{to}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{t('dashboard.departs_at')} {bus.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Bus className="h-4 w-4" />
                        <span>{bus.busNumber}</span>
                      </div>
                    <OccupancyPredictor bus={bus} route={route} />
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline">
                      <Link href={`/track/${bus.id}`}>{t('dashboard.track_button')}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/book/${bus.id}`}>{t('dashboard.book_ticket_button')}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
           <Separator />
        </div>
      )}


      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buses.map((bus) => {
          const route = busRoutes.find((r) => r.id === bus.routeId);
          if (!route) return null;

          const from = route.stops[0].name;
          const to = route.stops[route.stops.length - 1].name;
          const isFavorite = favorites.includes(route.id);

          return (
            <Card key={bus.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{route.name}</span>
                   <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(route.id)}
                      aria-label="Toggle Favorite"
                    >
                      <Star className={cn("h-5 w-5 text-muted-foreground", isFavorite && "fill-yellow-400 text-yellow-500")} />
                    </Button>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-2">
                  <span>{from}</span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  <span>{to}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{t('dashboard.departs_at')} {bus.startTime}</span>
                </div>
                 <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Bus className="h-4 w-4" />
                    <span>{bus.busNumber}</span>
                  </div>
                <OccupancyPredictor bus={bus} route={route} />
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href={`/track/${bus.id}`}>{t('dashboard.track_button')}</Link>
                </Button>
                <Button asChild>
                  <Link href={`/book/${bus.id}`}>{t('dashboard.book_ticket_button')}</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
