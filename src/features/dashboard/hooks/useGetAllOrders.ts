import { OrdersApi } from "@/features/ecommerce/api/ordersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders = ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["orders", pageNumber, pageSize],
    queryFn: () => OrdersApi.getAllOrders({ pageNumber, pageSize }),
  });
};
