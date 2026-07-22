import { OrdersApi } from "@/features/ecommerce/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OrdersApi.deleteOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });
};
