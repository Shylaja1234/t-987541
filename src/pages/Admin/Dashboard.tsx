
import { useState, useEffect } from "react";
import PageTransition from "@/components/shared/PageTransition";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, LineChart, Line } from "recharts";
import { ArrowUpRight, Users, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";

// Mock data for the dashboard
const salesData = [
  { name: "Jan", sales: 4000, visitors: 2400 },
  { name: "Feb", sales: 3000, visitors: 1398 },
  { name: "Mar", sales: 2000, visitors: 9800 },
  { name: "Apr", sales: 2780, visitors: 3908 },
  { name: "May", sales: 1890, visitors: 4800 },
  { name: "Jun", sales: 2390, visitors: 3800 },
  { name: "Jul", sales: 3490, visitors: 4300 },
];

const profitData = [
  { name: "Jan", profit: 2500, loss: 0 },
  { name: "Feb", profit: 1800, loss: 0 },
  { name: "Mar", profit: 0, loss: 500 },
  { name: "Apr", profit: 1800, loss: 0 },
  { name: "May", profit: 900, loss: 0 },
  { name: "Jun", profit: 1500, loss: 0 },
  { name: "Jul", profit: 2000, loss: 0 },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 19550,
    totalProfit: 10500,
    totalVisitors: 26606,
    totalOrders: 256
  });

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your admin dashboard</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Sales</p>
                    <h3 className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</h3>
                    <p className="text-sm text-emerald-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      12% from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Profit</p>
                    <h3 className="text-2xl font-bold">${stats.totalProfit.toLocaleString()}</h3>
                    <p className="text-sm text-emerald-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      8% from last month
                    </p>
                  </div>
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Visitors</p>
                    <h3 className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</h3>
                    <p className="text-sm text-emerald-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      18% from last month
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                    <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                    <p className="text-sm text-emerald-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      5% from last month
                    </p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <ShoppingBag className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Sales & Visitors</CardTitle>
                <CardDescription>Monthly sales and visitor analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ChartContainer
                    config={{
                      sales: { label: "Sales", color: "#6366F1" },
                      visitors: { label: "Visitors", color: "#22C55E" },
                    }}
                  >
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="sales" name="Sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="visitors" name="Visitors" fill="var(--color-visitors)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss</CardTitle>
                <CardDescription>Monthly profit and loss analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ChartContainer
                    config={{
                      profit: { label: "Profit", color: "#22C55E" },
                      loss: { label: "Loss", color: "#EF4444" },
                    }}
                  >
                    <LineChart data={profitData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="var(--color-profit)" strokeWidth={2} />
                      <Line type="monotone" dataKey="loss" name="Loss" stroke="var(--color-loss)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest orders and user activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Order #{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm text-muted-foreground">
                          Customer purchased Product {Math.floor(Math.random() * 10) + 1}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 60) + 1} minutes ago
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default Dashboard;
