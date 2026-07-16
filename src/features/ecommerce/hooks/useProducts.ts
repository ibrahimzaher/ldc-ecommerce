import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/productsApi";

export const useGetProducts = (id: string, pageNumber = 1, pageSize = 9) => {
  return useQuery({
    queryKey: ["products", id, pageNumber, pageSize],

    queryFn: () => productsApi.getProducts({ id, pageNumber, pageSize }),

    enabled: !!id,
  });
};

export const useGetProductById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["productById", id],
    queryFn: () => productsApi.getProductById(id!),
    enabled: !!id,
  });
};
