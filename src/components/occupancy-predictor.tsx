
'use client';

import { predictBusOccupancy } from '@/ai/flows/predict-bus-occupancy';
import type { PredictBusOccupancyInput } from '@/ai/types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/lib/i18n/use-translation';
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
  const { t } = useTranslation();
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

    const generateMockOccupancy = () => {
      setOccupancy({ loading: true, prediction: null, error: null });
      // To prevent API quota errors, generate a mock prediction on the client.
      const mockOccupancy = Math.floor(Math.random() * (bus.totalSeats - 5)) + 5; // Random value between 5 and totalSeats
      const mockPrediction = {
        predictedOccupancy: mockOccupancy,
        confidence: 'High',
        reason: 'Mock data generated to avoid API rate limits.',
      };
      // Use a timeout to simulate network latency
      setTimeout(() => {
        setOccupancy({ loading: false, prediction: mockPrediction, error: null });
      }, 500);
    };

    generateMockOccupancy();
  }, [bus.id, route.id, bus.totalSeats, isClient]);

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
          <span>{t('occupancy.live_occupancy')}</span>
        </div>
        <span className="font-semibold">{predictedOccupancy} / {bus.totalSeats} {t('occupancy.onboard')}</span>
      </div>
      <Progress value={occupancyPercentage} indicatorClassName={progressColorClass} />
    </div>
  );
}
