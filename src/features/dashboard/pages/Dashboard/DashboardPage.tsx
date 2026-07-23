import * as React from "react";

import { type ChartConfig } from "@/shared/components/ui/chart";
import { StatsGrid } from "./components/StatsGrid";
import { SalesChartCard } from "./components/SalesChartCard";
import { RecentOrdersCard } from "./components/RecentOrdersCard";
import { CategoryChartCard } from "./components/CategoryChartCard";
import { InventoryAlertsCard } from "./components/InventoryAlertsCard";

const salesData = [
  { date: "2026-06-01", revenue: 1200, orders: 200 },
  { date: "2026-06-05", revenue: 2100, orders: 800 },
  { date: "2026-06-10", revenue: 1800, orders: 1500 },
  { date: "2026-06-15", revenue: 3200, orders: 500 },
  { date: "2026-06-20", revenue: 2900, orders: 1500 },
  { date: "2026-06-25", revenue: 4100, orders: 1100 },
  { date: "2026-06-30", revenue: 3800, orders: 950 },
];

const chartConfig = {
  revenue: { label: "Revenue ($)", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
} satisfies ChartConfig;

const categoryData = [
  { category: "Electronics", sales: 4500 },
  { category: "Clothing", sales: 3200 },
  { category: "Home & Kitchen", sales: 2100 },
  { category: "Beauty", sales: 1500 },
  { category: "Sports", sales: 900 },
];

const categoryConfig = {
  sales: { label: "Sales ($)", color: "var(--chart-3)" },
} satisfies ChartConfig;

const recentSalesData = [
  {
    name: "Ahmed Mohammed",
    email: "ahmed@example.com",
    amount: "+$250.00",
    status: "Completed",
  },
  {
    name: "Sara Mahmoud",
    email: "sara@example.com",
    amount: "+$150.00",
    status: "Shipping",
  },
  {
    name: "Mahmoud Ibrahim",
    email: "mahmoud@example.com",
    amount: "+$350.00",
    status: "Completed",
  },
  {
    name: "Menna Ali",
    email: "menna@example.com",
    amount: "+$75.00",
    status: "Cancelled",
  },
];

const lowStockProducts = [
  { name: "Wireless Earbuds Pro", stock: 4, category: "Electronics" },
  { name: "Smart Watch Series 5", stock: 2, category: "Electronics" },
  { name: "Running Shoes X", stock: 5, category: "Sports" },
  { name: "Cotton Oversized Hoodie", stock: 3, category: "Clothing" },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState("30d");

  const filteredData = salesData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2026-06-30");
    let daysToSubtract = 30;

    if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl text-black md:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, here is what’s happening in your store today.
          </p>
        </div>
      </div>

      <StatsGrid />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <SalesChartCard
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          filteredData={filteredData}
          chartConfig={chartConfig}
        />
        <RecentOrdersCard orders={recentSalesData} />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <CategoryChartCard
          categoryData={categoryData}
          categoryConfig={categoryConfig}
        />
        <InventoryAlertsCard lowStockProducts={lowStockProducts} />
      </div>
    </div>
  );
}
