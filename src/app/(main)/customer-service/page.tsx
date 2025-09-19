
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contacts, faqs } from '@/lib/data';
import { Mail, Phone, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { Button } from '@/components/ui/button';

export default function CustomerServicePage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('customer_service.title')}</h1>

      <Card className="border-destructive bg-destructive/10">
        <CardHeader className="flex flex-row items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
                <CardTitle>{t('customer_service.emergency_title')}</CardTitle>
                <CardDescription className="text-destructive">
                {t('customer_service.emergency_desc')}
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <Button variant="destructive" asChild className="text-lg">
                <a href="tel:1800220047">
                    <Phone className="mr-2 h-5 w-5" /> 1800-22-0047
                </a>
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('customer_service.contact_info_title')}</CardTitle>
            <CardDescription>
              {t('customer_service.contact_info_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map(contact => (
              <div key={contact.id} className="flex items-start justify-between rounded-lg border p-3">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.designation}</p>
                </div>
                <div className="flex items-center gap-3">
                   <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary">
                    <Mail className="h-5 w-5" />
                   </a>
                   <a href={`tel:${contact.mobile}`} className="text-muted-foreground hover:text-primary">
                    <Phone className="h-5 w-5" />
                   </a>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('customer_service.faq_title')}</CardTitle>
            <CardDescription>
              {t('customer_service.faq_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(faq => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
