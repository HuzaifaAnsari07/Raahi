
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { busRoutes, buses, bookings } from '@/lib/data';
import {
  BarChart,
  BookUser,
  Bus,
  Users,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, CartesianGrid, XAxis, YAxis, BarChart as RechartsBarChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/use-translation';

const chartData = [
  { route: "Route 10", occupancy: 35, fill: "var(--color-chart-1)" },
  { route: "Route 22", occupancy: 42, fill: "var(--color-chart-2)" },
  { route: "Route 45", occupancy: 28, fill: "var(--color-chart-1)" },
  { route: "Route 5B", occupancy: 48, fill: "var(--color-chart-2)" },
  { route: "Route 61", occupancy: 31, fill: "var(--color-chart-1)" },
  { route: "Route C-12", occupancy: 25, fill: "var(--color-chart-1)" },
];

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "hsl(var(--chart-1))",
  },
};

export default function AdminDashboardPage() {
  const totalBookings = bookings.length;
  const totalBuses = buses.length;
  const totalRoutes = busRoutes.length;
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Selected",
        description: `${file.name} is ready for upload. (This is a mock action)`,
      });
      // In a real app, you would handle the file upload here.
    }
  };
  
  const handleEditClick = (routeId: string) => {
    toast({
        title: "Redirecting...",
        description: `Navigating to edit page for route ${routeId}. (This is a mock action)`,
    });
    // In a real app, you would navigate to an actual edit page
    // router.push(`/admin/timetable/edit/${routeId}`);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('admin.dashboard_title')}</h1>
      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">{t('admin.analytics_tab')}</TabsTrigger>
          <TabsTrigger value="timetable">{t('admin.timetable_tab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.total_bookings')}
                </CardTitle>
                <BookUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                  {t('admin.from_last_month')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.active_buses')}
                </CardTitle>
                <Bus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBuses}</div>
                <p className="text-xs text-muted-foreground">
                  {t('admin.across_routes', { totalRoutes })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('admin.passenger_traffic')}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+1,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('admin.avg_occupancy_title')}</CardTitle>
              <CardDescription>
                {t('admin.avg_occupancy_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                 <RechartsBarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="route"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 10)}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="occupancy" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timetable" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{t('admin.bus_routes_title')}</CardTitle>
                <CardDescription>{t('admin.bus_routes_desc')}</CardDescription>
              </div>
              <Button onClick={handleUploadClick}>{t('admin.upload_timetable_button')}</Button>
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.route_id_header')}</TableHead>
                      <TableHead>{t('admin.route_name_header')}</TableHead>
                      <TableHead>{t('admin.stops_count_header')}</TableHead>
                      <TableHead>{t('admin.actions_header')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {busRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.id}</TableCell>
                        <TableCell>{route.name}</TableCell>
                        <TableCell>{route.stops.length}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(route.id)}>{t('admin.edit_button')}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
