import FeedbackForm from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Submit Feedback</h1>
      <div className="max-w-2xl mx-auto w-full">
         <FeedbackForm />
      </div>
    </div>
  );
}
