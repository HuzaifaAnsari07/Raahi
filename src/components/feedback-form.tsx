
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitFeedback } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  busNumber: z.string().optional(),
  message: z.string().min(10, 'Feedback message must be at least 10 characters.'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null);
  const { t } = useTranslation();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      busNumber: '',
      message: '',
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    const result = await submitFeedback(data);
    setSubmissionStatus(result);
    if (result.success) {
      form.reset();
    }
  };

  if (submissionStatus?.success) {
    return (
       <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-800 dark:text-green-200">
        <CheckCircle className="h-4 w-4 !text-green-500" />
        <AlertTitle>{t('feedback.success_title')}</AlertTitle>
        <AlertDescription>{t('feedback.success_message')}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('feedback.card_title')}</CardTitle>
        <CardDescription>
          {t('feedback.card_desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback.name_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback.email_label')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="busNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback.bus_number_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder="MH-43-1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('feedback.message_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you think..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? t('feedback.submitting_button') : t('feedback.submit_button')}
            </Button>
            {submissionStatus && !submissionStatus.success && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submissionStatus.message}</AlertDescription>
                </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
