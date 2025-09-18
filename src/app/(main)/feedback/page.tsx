
'use client';
import FeedbackForm from "@/components/feedback-form";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function FeedbackPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('feedback.title')}</h1>
      <div className="max-w-2xl mx-auto w-full">
         <FeedbackForm />
      </div>
    </div>
  );
}
