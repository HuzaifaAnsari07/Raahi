
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { stops } from '@/lib/data';
import { useTranslation } from '@/lib/i18n/use-translation';
import type { Bus, Route } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  fromStop: z.string().min(1, 'Please select a boarding stop.'),
  toStop: z.string().min(1, 'Please select a destination stop.'),
});

export default function BookTicketForm({
  bus,
  route,
}: {
  bus: Bus;
  route: Route;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fromStop: '',
      toStop: '',
    },
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    const fromStop = stops.find((s) => s.id === data.fromStop);
    const toStop = stops.find((s) => s.id === data.toStop);

    if (!fromStop || !toStop) {
      toast({
        variant: 'destructive',
        title: 'Invalid Stops',
        description: 'Please select valid boarding and destination stops.',
      });
      return;
    }

    const bookingDetails = {
      passengerName: 'Passenger', // Mock data
      bookingTime: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      busNumber: bus.busNumber,
      routeName: route.name,
      fromStop: fromStop.name,
      toStop: toStop.name,
    };

    const queryParams = new URLSearchParams(bookingDetails);
    
    toast({
      title: 'Booking Successful!',
      description: 'Redirecting to your e-ticket...',
    });
    
    router.push(`/booking-confirmation?${queryParams.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('book_ticket.select_journey_title')}</CardTitle>
        <CardDescription>
          {t('book_ticket.select_journey_desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fromStop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('book_ticket.from_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('book_ticket.from_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {route.stops.map((stop) => (
                        <SelectItem key={stop.id} value={stop.id}>
                          {stop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toStop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('book_ticket.to_label')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('book_ticket.to_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {route.stops.map((stop) => (
                        <SelectItem key={stop.id} value={stop.id}>
                          {stop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? t('book_ticket.confirming_button') : t('book_ticket.confirm_button')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
