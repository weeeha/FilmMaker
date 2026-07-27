import {
  BarChart3Icon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const navItems = [
  { title: 'Dashboard', icon: HomeIcon, active: true },
  { title: 'Analytics', icon: BarChart3Icon },
  { title: 'Customers', icon: UsersIcon },
  { title: 'Settings', icon: SettingsIcon },
]

const chartData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6300 },
  { month: 'May', revenue: 5900 },
  { month: 'Jun', revenue: 7200 },
]

const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

const orders = [
  { id: '#3210', customer: 'Olivia Martin', status: 'Paid', amount: '$316.00' },
  { id: '#3209', customer: 'Ava Johnson', status: 'Pending', amount: '$242.00' },
  { id: '#3208', customer: 'Michael Chen', status: 'Paid', amount: '$837.00' },
  { id: '#3207', customer: 'Lisa Anderson', status: 'Refunded', amount: '$132.00' },
]

function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span className="px-2 py-1 text-sm font-semibold">Acme Inc</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.active}>
                      <a href="#">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="space-y-6 p-6">
          <PageHeader
            title="Overview"
            description="Your business at a glance."
            actions={<Button>Download report</Button>}
          />
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Total Revenue"
              value="$33,500.00"
              trend={12.5}
              hint="Trending up this month"
            />
            <StatCard
              label="New Customers"
              value="1,234"
              trend={-8}
              hint="Acquisition needs attention"
            />
            <StatCard
              label="Active Accounts"
              value="45,678"
              trend={4.5}
              hint="Strong user retention"
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>January – June</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="revenue"
                      fill="var(--color-revenue)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {order.customer}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Paid' ? 'secondary' : 'outline'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {order.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { DashboardPage }
