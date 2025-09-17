import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import ChatbotWidget from '@/components/chatbot-widget';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-svh flex-col">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
        <ChatbotWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}
