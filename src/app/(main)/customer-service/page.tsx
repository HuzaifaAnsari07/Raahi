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
import { Mail, Phone } from 'lucide-react';
import FeedbackForm from '@/components/feedback-form';

export default function CustomerServicePage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Customer Service</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact List */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Reach out to our team for any assistance.
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

        {/* Feedback Form */}
        <div className="row-span-2">
          <FeedbackForm />
        </div>

        {/* FAQ Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions.
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
