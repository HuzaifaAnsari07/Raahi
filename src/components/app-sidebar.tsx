
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Ticket,
  Map,
  ShieldCheck,
  User,
  FileText,
  LifeBuoy,
  Phone,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/use-translation';

const user = {
    name: "Passenger",
    email: "passenger@example.com",
    avatar: "https://picsum.photos/seed/user-avatar/80/80",
    role: "passenger",
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground">
            <Image
              src="/NMMTlogo.jpg"
              alt="NMMT Logo"
              width={32}
              height={32}
              className="h-6 w-6 rounded-sm"
            />
          </div>
          <span className="font-headline text-lg font-bold">NMMT Raahi</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip={t('sidebar.dashboard')}
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>{t('sidebar.dashboard')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/track')}
              tooltip={t('sidebar.live_map')}
            >
              <Link href="/track/bus-1">
                <Map />
                <span>{t('sidebar.live_map')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/booking-confirmation')}
              tooltip={t('sidebar.my_tickets')}
            >
              <Link href="/booking-confirmation?passengerName=Passenger&bookingTime=Tue%2C%20Jul%2023%2C%202024%2C%2010%3A30%20AM&busNumber=MH-43-1234&routeName=Route%2010%3A%20Vashi%20to%20CBD%20Belapur&fromStop=Vashi%20Bus%20Stn&toStop=Nerul%20LP">
                <Ticket />
                <span>{t('sidebar.my_tickets')}</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/customer-service')}
              tooltip={t('sidebar.customer_service')}
            >
              <Link href="/customer-service">
                <LifeBuoy />
                <span>{t('sidebar.customer_service')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/contact-list')}
              tooltip={t('sidebar.contact_list')}
            >
              <Link href="/contact-list">
                <Phone />
                <span>{t('sidebar.contact_list')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/contact-roadmap')}
              tooltip={t('sidebar.contact_roadmap')}
            >
              <Link href="/contact-roadmap">
                <FileText />
                <span>{t('sidebar.contact_roadmap')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/feedback')}
              tooltip={t('sidebar.feedback')}
            >
              <Link href="/feedback">
                <MessageSquare />
                <span>{t('sidebar.feedback')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user.role === 'admin' && (
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/admin')}
                tooltip={t('sidebar.admin_panel')}
              >
                <Link href="/admin/dashboard">
                  <ShieldCheck />
                  <span>{t('sidebar.admin_panel')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
            <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{user.name}</span>
                <span className="text-muted-foreground">{user.email}</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
