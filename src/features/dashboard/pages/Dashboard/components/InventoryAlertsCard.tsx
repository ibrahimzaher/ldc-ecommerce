import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface StockItem {
  name: string;
  stock: number;
  category: string;
}

interface InventoryAlertsCardProps {
  lowStockProducts: StockItem[];
}

export function InventoryAlertsCard({
  lowStockProducts,
}: InventoryAlertsCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Inventory Alerts</CardTitle>
          <CardDescription>Products running low on stock</CardDescription>
        </div>
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2.5 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  {product.stock} left
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
