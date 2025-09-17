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
import { createBooking } from '@/lib/actions';
import { busRoutes, buses } from '@/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Bus, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const bookingSchema = z.object({
  fromStop: z.string().min(1, 'Please select a boarding stop.'),
  toStop: z.string().min(1, 'Please select a destination stop.'),
});

export default function BookTicketPage({
  params,
}: {
  params: { busId: string };
}) {
  const router = useRouter();
  const bus = buses.find((b) => b.id === params.busId);
  const route = busRoutes.find((r) => r.id === bus?.routeId);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fromStop: '',
      toStop: '',
    },
  });

  if (!bus || !route) {
    return <div>Bus not found</div>;
  }

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    try {
      const bookingId = await createBooking({ ...data, busId: bus.id });
      router.push(`/booking-confirmation/${bookingId}`);
    } catch (error) {
      console.error('Booking failed', error);
      // Here you would show a toast notification
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Book Your Ticket</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Route Details</CardTitle>
            <CardDescription>{route.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              <span>Bus Number: {bus.busNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Departure Time: {bus.startTime}</span>
            </div>
            <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Stops:</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{route.stops[0].name}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>{route.stops[route.stops.length - 1].name}</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Journey</CardTitle>
            <CardDescription>
              Choose your boarding and destination points.
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
                      <FormLabel>From</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a boarding stop" />
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
                      <FormLabel>To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a destination stop" />
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
                <Button type="submit" className="w-full">
                  Confirm Booking (Dummy Pay)
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
