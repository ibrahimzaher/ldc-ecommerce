import { useAppSelector } from "@/core/store/store";
import { Accordion } from "@/shared/components/ui/accordion";
import { CustomPagination } from "@/shared/components/ui/CustomPagination";
import { Package } from "lucide-react";
import { useState } from "react";
import { useGetOrders } from "../../hooks/useOrders";
import { OrderAccordionItem } from "./components/OrderAccordionItem";

export const OrdersPage = () => {
  const userId = useAppSelector((state) => state.auth.user?.id || "");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useGetOrders(userId, page, pageSize);

  const orders = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Package className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Order History
        </h1>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center font-medium">
          Something went wrong while fetching your orders. Please try again.
        </div>
      )}

      {!isLoading && !isError && orders.length === 0 && (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-3xl bg-white">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium text-lg">
            You haven't placed any orders yet.
          </p>
        </div>
      )}

      {!isLoading && !isError && orders.length > 0 && (
        <>
          <Accordion type="multiple" className="space-y-4">
            {orders.map((order) => {
              return <OrderAccordionItem key={order.id} order={order} />;
            })}
          </Accordion>

          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </>
  );
};
