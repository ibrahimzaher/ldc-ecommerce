import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";

interface CategoryChartCardProps {
  categoryData: Array<{ category: string; sales: number }>;
  categoryConfig: ChartConfig;
}

export function CategoryChartCard({
  categoryData,
  categoryConfig,
}: CategoryChartCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-lg">Sales by Category</CardTitle>
        <CardDescription>Top performing product categories</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={categoryConfig} className="h-56 w-full">
          <BarChart
            data={categoryData}
            margin={{ right: 10, left: 10, bottom: 0, top: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
