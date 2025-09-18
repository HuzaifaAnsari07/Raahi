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
import { Bus, Route } from '@/lib/types';
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

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fromStop: '',
      toStop: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    try {
      const bookingId = await createBooking({ ...data, busId: bus.id });
      toast({
        title: 'Booking Successful!',
        description: 'Redirecting to your e-ticket...',
      });
      router.push(`/booking-confirmation/${bookingId}`);
    } catch (error) {
      console.error('Booking failed', error);
      toast({
        variant: 'destructive',
        title: 'Booking Failed',
        description: 'There was an error creating your booking. Please try again.',
      });
    }
  };

  return (
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Confirming...' : 'Confirm Booking (Dummy Pay)'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
