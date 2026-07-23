import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface Order {
  name: string;
  email: string;
  amount: string;
  status: string;
}

interface RecentOrdersCardProps {
  orders: Order[];
}

export function RecentOrdersCard({ orders }: RecentOrdersCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
        <CardDescription>Latest customer purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{order.name}</p>
                <p className="text-xs text-muted-foreground">{order.email}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-emerald-600">
                  {order.amount}
                </div>
                <span className="inline-block text-[10px] bg-secondary px-2 py-0.5 rounded-full mt-1">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
