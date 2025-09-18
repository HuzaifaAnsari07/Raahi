
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { contacts } from '@/lib/data';
import { useTranslation } from '@/lib/i18n/use-translation';
import { Mail, Phone } from 'lucide-react';

export default function ContactListPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('contact_list.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('contact_list.card_title')}</CardTitle>
          <CardDescription>
            {t('contact_list.card_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">{t('contact_list.sr_no')}</TableHead>
                  <TableHead>{t('contact_list.name')}</TableHead>
                  <TableHead>{t('contact_list.designation')}</TableHead>
                  <TableHead>{t('contact_list.email')}</TableHead>
                  <TableHead>{t('contact_list.mobile')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.designation}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        {contact.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`tel:${contact.mobile}`}
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {contact.mobile}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
