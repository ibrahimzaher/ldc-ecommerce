import { productsApi } from "@/features/ecommerce/api/productsApi";
import type { ProductRequest } from "@/features/ecommerce/types/product.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface UpdateProductVariables {
  id: string;
  productData: ProductRequest;
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, productData }: UpdateProductVariables) =>
      productsApi.updateProduct(id, productData),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to update product. Please try again.");
    },
  });
};
