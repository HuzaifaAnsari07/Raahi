
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/lib/i18n/use-translation";
import Image from "next/image";

export default function ContactRoadmapPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('contact_roadmap.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('contact_roadmap.card_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="relative min-w-[1200px] h-[800px] flex-shrink-0">
              <Image
                src="/contact%20roadmap.png"
                alt="Organizational Chart"
                fill
                objectFit="contain"
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
