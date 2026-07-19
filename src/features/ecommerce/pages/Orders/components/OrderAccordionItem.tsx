import type { OrderResponse } from "@/features/ecommerce/types/orders.types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Calendar, DollarSign } from "lucide-react";

interface OrderAccordionItemProps {
  order: OrderResponse;
}

export const OrderAccordionItem = ({ order }: OrderAccordionItemProps) => {
  const formattedDate = new Date(order.createdOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <AccordionItem
      value={order.id}
      className="border border-gray-200 rounded-[20px] bg-white shadow-sm overflow-hidden transition-all duration-200"
    >
      <AccordionTrigger className="p-5 md:p-6 hover:no-underline hover:bg-gray-50/50 text-left [&[data-state=open]]:bg-gray-50/30">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mr-4">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 md:gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Order ID
              </p>
              <p className="font-mono font-bold text-sm text-gray-900">
                #{order.id.slice(0, 8)}...
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Date Placed
              </p>
              <p className="text-sm font-medium text-gray-700">
                {formattedDate}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="h-3 w-3" /> Total Amount
              </p>
              <p className="text-sm font-bold text-blue-600">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center border-t sm:border-t-0 pt-3 sm:pt-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              Success
            </span>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="bg-gray-50/50 border-t border-gray-100 p-5 md:p-6 space-y-4 pb-6">
        <h3 className="font-bold text-gray-900 text-sm tracking-wide uppercase">
          Items Ordered ({order.orderItems.length})
        </h3>

        <div className="divide-y divide-gray-100 bg-white border border-gray-200 rounded-xl overflow-hidden">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between text-sm gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  Product ID:{" "}
                  <span className="font-mono text-gray-500">
                    {item.productId.slice(0, 8)}...
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Quantity:{" "}
                  <span className="font-bold text-gray-700">
                    {item.quantity}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(item.cost * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  ${item.cost.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <div className="w-full sm:w-64 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-900">
                ${order.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT (14%):</span>
              <span className="font-medium text-gray-900">
                ${order.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-1.5 border-t border-gray-200">
              <span>Total:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
