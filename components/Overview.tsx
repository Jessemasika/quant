"use client";

import { useClients } from "../contexts/ClientContext";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo } from "react";

export function Overview() {
  const { clients } = useClients();

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const activeClients = clients.filter((c) => c.status === "active").length;
  const totalRoyalties = clients.reduce(
    (sum, client) => sum + (client.revenue * client.royaltyRate) / 100,
    0
  );

  const avgRoyaltyRate =
    clients.length > 0
      ? clients.reduce((sum, client) => sum + client.royaltyRate, 0) / clients.length
      : 0;

  const revenueData = useMemo(
    () => [
      { id: "jan", month: "Jan", revenue: 65000 },
      { id: "feb", month: "Feb", revenue: 75000 },
      { id: "mar", month: "Mar", revenue: 85000 },
      { id: "apr", month: "Apr", revenue: 95000 },
      { id: "may", month: "May", revenue: 110000 },
      { id: "jun", month: "Jun", revenue: totalRevenue },
    ],
    [totalRevenue]
  );

  const topClients = useMemo(
    () =>
      [...clients]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map((client) => ({
          id: client.id,
          name: client.company,
          revenue: client.revenue,
        })),
    [clients]
  );

  const statusData = useMemo(
    () => [
      {
        id: "active",
        name: "Active",
        value: clients.filter((c) => c.status === "active").length,
        color: "var(--chart-1)",
      },
      {
        id: "pending",
        name: "Pending",
        value: clients.filter((c) => c.status === "pending").length,
        color: "var(--chart-2)",
      },
      {
        id: "inactive",
        name: "Inactive",
        value: clients.filter((c) => c.status === "inactive").length,
        color: "var(--chart-3)",
      },
    ],
    [clients]
  );

  const stats = [
    {
      title: "Total Revenue",
      value: `Ksh ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      bgColor: "bg-(--chart-5)",
      iconColor: "text-(--chart-1)",
    },
    {
      title: "Active Clients",
      value: activeClients,
      icon: Users,
      change: "+3",
      bgColor: "bg-(--chart-2)",
      iconColor: "text-(--chart-2)",
    },
    {
      title: "Total Royalties",
      value: `Ksh ${totalRoyalties.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: TrendingUp,
      change: "+8.2%",
      bgColor: "bg-(--chart-3)",
      iconColor: "text-(--chart-3)",
    },
    {
      title: "Avg Royalty Rate",
      value: `${avgRoyaltyRate.toFixed(1)}%`,
      icon: Activity,
      change: "+0.5%",
      bgColor: "bg-(--chart-4)",
      iconColor: "text-(--chart-4)",
    },
  ];

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-8 bg-(--color-background) text-(--color-foreground) min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Company Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-(--color-accent) text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm mb-1">
                {stat.title}
              </h3>
              <p className="text-xl sm:text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-foreground)" />
                <YAxis stroke="var(--color-foreground)" />
                <Tooltip
                  formatter={(value: any) => `Ksh ${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  fill="var(--chart-1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors">
          <h2 className="text-lg font-semibold mb-4">Client Status Distribution</h2>
          <div className="h-56 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="p-4 sm:p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors">
        <h2 className="text-lg font-semibold mb-4">Top Clients by Revenue</h2>
        <div className="h-56 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topClients}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-foreground)" />
              <YAxis stroke="var(--color-foreground)" />
              <Tooltip
                formatter={(value: any) => `Ksh ${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />
              <Bar dataKey="revenue" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
