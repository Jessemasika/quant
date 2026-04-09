"use client";

import { useClients } from "@/contexts/ClientContext";
import { DollarSign, TrendingUp, Percent, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useMemo } from "react";

export default function Royalties() {
  const { clients } = useClients();

  const royaltyData = clients
    .map((client) => ({
      id: client.id,
      name: client.name,
      company: client.company,
      revenue: client.revenue,
      royaltyRate: client.royaltyRate,
      royaltyAmount: (client.revenue * client.royaltyRate) / 100,
      status: client.status,
    }))
    .sort((a, b) => b.royaltyAmount - a.royaltyAmount);

  const totalRoyalties = royaltyData.reduce(
    (sum, item) => sum + item.royaltyAmount,
    0
  );

  const avgRoyaltyRate =
    royaltyData.length > 0
      ? royaltyData.reduce((sum, item) => sum + item.royaltyRate, 0) /
        royaltyData.length
      : 0;

  const activeRoyalties = royaltyData
    .filter((item) => item.status === "active")
    .reduce((sum, item) => sum + item.royaltyAmount, 0);

  const monthlyData = useMemo(
    () => [
      { month: "Jan", royalties: 8500 },
      { month: "Feb", royalties: 9200 },
      { month: "Mar", royalties: 10100 },
      { month: "Apr", royalties: 11500 },
      { month: "May", royalties: 12800 },
      { month: "Jun", royalties: totalRoyalties },
    ],
    [totalRoyalties]
  );

  const topEarners = useMemo(
    () =>
      royaltyData.slice(0, 6).map((item) => ({
        name: item.company,
        amount: item.royaltyAmount,
      })),
    [royaltyData]
  );

  const stats = [
    {
      title: "Total Royalties",
      value: `Ksh ${totalRoyalties.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: DollarSign,
      change: "+15.3%",
      bgColor: "bg-(--chart-1)",
      iconColor: "text-(--chart-1)",
    },
    {
      title: "Active Client Royalties",
      value: `Ksh ${activeRoyalties.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: TrendingUp,
      change: "+12.8%",
      bgColor: "bg-(--chart-2)",
      iconColor: "text-(--chart-2)",
    },
    {
      title: "Average Royalty Rate",
      value: `${avgRoyaltyRate.toFixed(1)}%`,
      icon: Percent,
      change: "+0.5%",
      bgColor: "bg-(--chart-3)",
      iconColor: "text-(--chart-3)",
    },
    {
      title: "This Month",
      value: `Ksh ${totalRoyalties.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: Calendar,
      change: "+8.2%",
      bgColor: "bg-(--chart-4)",
      iconColor: "text-(--chart-4)",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="p-8 bg-(--color-background) text-(--color-foreground) min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Royalties Overview</h1>
        <p className="text-muted-foreground">
          Track and manage royalty payments from all clients
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-(--color-accent) text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Royalties Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-foreground)" />
              <YAxis stroke="var(--color-foreground)" />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? `Ksh ${value.toLocaleString()}`
                    : value ?? ""
                }
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="royalties"
                stroke="var(--primary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-xl border border-(--color-border) bg-(--color-card) transition-colors">
          <h2 className="text-lg font-semibold mb-4">
            Top Royalty Earners
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topEarners} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-foreground)" />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                stroke="var(--color-foreground)"
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? `Ksh ${value.toLocaleString()}`
                    : value ?? ""
                }
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />
              <Bar dataKey="amount" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-(--color-border) bg-(--color-card) overflow-x-auto transition-colors">
        <table className="w-full">
          <thead className="bg-(--color-muted)">
            <tr>
              {[
                "Client",
                "Company",
                "Revenue",
                "Royalty Rate",
                "Royalty Amount",
                "Status",
              ].map((th) => (
                <th
                  key={th}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border)">
            {royaltyData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-(--color-hover) transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm">{item.company}</td>
                <td className="px-6 py-4 text-sm">
                  Ksh {item.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {item.royaltyRate}%
                </td>
                <td className="px-6 py-4 text-sm text-(--color-accent) font-semibold">
                  Ksh{" "}
                  {item.royaltyAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
