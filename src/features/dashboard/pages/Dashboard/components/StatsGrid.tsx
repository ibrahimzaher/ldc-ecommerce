import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-emerald-500 flex items-center mt-1">
            +20.1% from last month <ArrowUpRight className="h-3 w-3 ml-1" />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">+2,350</div>
          <p className="text-xs text-emerald-500 flex items-center mt-1">
            +180 this week <ArrowUpRight className="h-3 w-3 ml-1" />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">+12,234</div>
          <p className="text-xs text-emerald-500 flex items-center mt-1">
            +19% from previous period <ArrowUpRight className="h-3 w-3 ml-1" />
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">3.24%</div>
          <p className="text-xs text-emerald-500 flex items-center mt-1">
            +0.4% conversion boost <ArrowUpRight className="h-3 w-3 ml-1" />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
