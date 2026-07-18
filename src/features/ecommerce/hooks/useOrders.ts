import { queryClient } from "@/core/config/queryClient";
import { useAppDispatch } from "@/core/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrdersApi } from "../api/ordersApi";
import type { OrderRequest } from "../types/orders.types";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export const useAddOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (orderData: OrderRequest) => OrdersApi.addOrder(orderData),
    onSuccess: (data) => {
      toast.success(data.message || "Order placed successfully.");
      dispatch(clearCart());
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order.",
      );
    },
  });
};

export const useGetOrders = (
  customerId: string,
  pageNumber = 1,
  pageSize = 10,
) => {
  return useQuery({
    queryKey: ["orders", customerId, pageNumber, pageSize],
    queryFn: () => OrdersApi.getOrders(customerId, pageNumber, pageSize),
    enabled: !!customerId,
  });
};
