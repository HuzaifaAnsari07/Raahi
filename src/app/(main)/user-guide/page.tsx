
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
} from '@/components/ui/accordion';
import { useTranslation } from '@/lib/i18n/use-translation';
import { BookOpenCheck, Bus, MessageSquare, Ticket } from 'lucide-react';

const guideItems = [
  {
    id: 'guide-1',
    icon: Bus,
    titleKey: 'user_guide.track_bus_title',
    contentKey: 'user_guide.track_bus_content',
  },
  {
    id: 'guide-2',
    icon: Ticket,
    titleKey: 'user_guide.book_ticket_title',
    contentKey: 'user_guide.book_ticket_content',
  },
  {
    id: 'guide-3',
    icon: MessageSquare,
    titleKey: 'user_guide.use_chatbot_title',
    contentKey: 'user_guide.use_chatbot_content',
  },
];

export default function UserGuidePage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <BookOpenCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">{t('user_guide.title')}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('user_guide.card_title')}</CardTitle>
          <CardDescription>{t('user_guide.card_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {guideItems.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{t(item.titleKey)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 text-muted-foreground">
                  {t(item.contentKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
