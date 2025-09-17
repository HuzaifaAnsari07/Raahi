'use client';

import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { alerts } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cva } from 'class-variance-authority';
import type { Alert as AlertType } from '@/lib/types';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  "border-l-4",
  {
    variants: {
      variant: {
        info: "border-blue-500 bg-blue-500/10 text-blue-800 dark:text-blue-200",
        warning: "border-yellow-500 bg-yellow-500/10 text-yellow-800 dark:text-yellow-200",
        danger: "border-red-500 bg-red-500/10 text-red-800 dark:text-red-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

export default function AlertsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || alerts.length === 0) {
    return null;
  }

  const getVariant = (type: AlertType['type']) => {
    return type;
  }

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {alerts.map((alert) => (
            <CarouselItem key={alert.id}>
              <Alert className={cn(alertVariants({ variant: getVariant(alert.type) }))}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Latest Update</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </CarouselItem>
          ))}
        </CarouselContent>
        {alerts.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>
       <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-muted-foreground/20"
          aria-label="Dismiss alerts"
        >
          <X className="h-4 w-4" />
        </button>
    </div>
  );
}
