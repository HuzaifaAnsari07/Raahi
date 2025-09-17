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
import { ArrowRight, Bus, Clock } from 'lucide-react';
import Link from 'next/link';
import OccupancyPredictor from '@/components/occupancy-predictor';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Buses</h1>
        <p className="text-muted-foreground">
          Find your bus and track it in real-time.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buses.map((bus) => {
          const route = busRoutes.find((r) => r.id === bus.routeId);
          if (!route) return null;

          const from = route.stops[0].name;
          const to = route.stops[route.stops.length - 1].name;

          return (
            <Card key={bus.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{route.name}</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Bus className="h-4 w-4" />
                    <span>{bus.busNumber}</span>
                  </div>
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
                  <span>Departs at {bus.startTime}</span>
                </div>
                <OccupancyPredictor bus={bus} route={route} />
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline">
                  <Link href={`/track/${bus.id}`}>Track</Link>
                </Button>
                <Button asChild>
                  <Link href={`/book/${bus.id}`}>Book Ticket</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
