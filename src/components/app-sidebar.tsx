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

const user = {
    name: "Passenger",
    email: "passenger@example.com",
    avatar: "https://picsum.photos/seed/user-avatar/80/80",
    role: "passenger",
};

export default function AppSidebar() {
  const pathname = usePathname();
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
          <span className="font-headline text-lg font-bold">NMMT Tracker</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip="Dashboard"
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/track')}
              tooltip="Live Map"
            >
              <Link href="/track/bus-1">
                <Map />
                <span>Live Map</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/booking-confirmation')}
              tooltip="My Tickets"
            >
              <Link href="/booking-confirmation?passengerName=Passenger&bookingTime=Tue%2C%20Jul%2023%2C%202024%2C%2010%3A30%20AM&busNumber=MH-43-1234&routeName=Route%2010%3A%20Vashi%20to%20CBD%20Belapur&fromStop=Vashi%20Bus%20Stn&toStop=Nerul%20LP">
                <Ticket />
                <span>My Tickets</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/customer-service')}
              tooltip="Support"
            >
              <Link href="/customer-service">
                <LifeBuoy />
                <span>Customer Service</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/contact-list')}
              tooltip="Contacts"
            >
              <Link href="/contact-list">
                <Phone />
                <span>Contact List</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/contact-roadmap')}
              tooltip="Roadmap"
            >
              <Link href="/contact-roadmap">
                <FileText />
                <span>Contact Roadmap</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/feedback')}
              tooltip="Feedback"
            >
              <Link href="/feedback">
                <MessageSquare />
                <span>Feedback</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user.role === 'admin' && (
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/admin')}
                tooltip="Admin"
              >
                <Link href="/admin/dashboard">
                  <ShieldCheck />
                  <span>Admin Panel</span>
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
