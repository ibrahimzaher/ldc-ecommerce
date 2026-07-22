import { authApi } from "@/features/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.deleteCustomer,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["getAllCustomers"] });
    },
    onError: () => {
      toast.error("Failed to delete customer. Please try again.");
    },
  });
};
