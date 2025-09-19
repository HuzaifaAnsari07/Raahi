
'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/lib/i18n/use-translation';
import type { Bus, Route } from '@/lib/types';
import { Users } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function OccupancyPredictor({ bus }: { bus: Bus, route: Route }) {
  const { t } = useTranslation();

  // Basic validation to prevent division by zero or negative numbers
  if (!bus || bus.capacity <= 0 || bus.currentCount < 0) {
    return <Skeleton className="h-10 w-full" />;
  }

  // Ensure currentCount does not exceed capacity for display purposes
  const currentCount = Math.min(bus.currentCount, bus.capacity);
  const occupancyPercentage = (currentCount / bus.capacity) * 100;

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
        <span className="font-semibold">{currentCount} / {bus.capacity} {t('occupancy.onboard')}</span>
      </div>
      <Progress value={occupancyPercentage} indicatorClassName={progressColorClass} />
    </div>
  );
}
