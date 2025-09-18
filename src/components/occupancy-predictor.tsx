
'use client';

import { predictBusOccupancy, PredictBusOccupancyInput } from '@/ai/flows/predict-bus-occupancy';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { Bus, Route } from '@/lib/types';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';

type OccupancyState = {
  loading: boolean;
  prediction: {
    predictedOccupancy: number;
    confidence: string;
    reason: string;
  } | null;
  error: string | null;
};

export default function OccupancyPredictor({ bus, route }: { bus: Bus, route: Route }) {
  const [occupancy, setOccupancy] = useState<OccupancyState>({
    loading: true,
    prediction: null,
    error: null,
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchOccupancy = async () => {
      setOccupancy({ loading: true, prediction: null, error: null });
      try {
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
        
        const input: PredictBusOccupancyInput = {
          routeId: route.id,
          time: currentTime,
          dayOfWeek: dayOfWeek,
          historicalOccupancyData: 'Normally 70% full during this time, but lighter on weekends.',
          currentBookings: Math.floor(Math.random() * 10) + 5, // Dummy data generated on client
        };

        const prediction = await predictBusOccupancy(input);
        setOccupancy({ loading: false, prediction, error: null });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Failed to predict occupancy.';
        setOccupancy({ loading: false, prediction: null, error: errorMessage });
      }
    };

    fetchOccupancy();
  }, [bus.id, route.id, isClient]);

  if (!isClient || occupancy.loading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (occupancy.error || !occupancy.prediction) {
    return <div className="text-sm text-destructive">{occupancy.error || 'Could not load occupancy.'}</div>;
  }

  const { predictedOccupancy } = occupancy.prediction;
  const occupancyPercentage = (predictedOccupancy / bus.totalSeats) * 100;

  const getOccupancyColor = () => {
    if (occupancyPercentage > 80) return 'bg-destructive';
    if (occupancyPercentage > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const progressColorClass = getOccupancyColor();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center font-medium">
          <Users className="mr-2 h-4 w-4 text-primary" />
          <span>Live Occupancy</span>
        </div>
        <span className="font-semibold">{predictedOccupancy} / {bus.totalSeats} seats</span>
      </div>
      <Progress value={occupancyPercentage} indicatorClassName={progressColorClass} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>AI Prediction</span>
        <Badge variant={occupancy.prediction.confidence === 'High' ? 'default' : 'secondary'}>
          {occupancy.prediction.confidence} Confidence
        </Badge>
      </div>
    </div>
  );
}
