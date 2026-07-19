import { queryClient } from "@/core/config/queryClient";
import { productsApi } from "@/features/ecommerce/api/productsApi";
import type { LoaderFunctionArgs } from "react-router-dom";

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Error("Product ID is required");
  }
  return await queryClient.ensureQueryData({
    queryKey: ["productById", id],
    queryFn: () => productsApi.getProductById(id).then((res) => res.data),
  });
};
