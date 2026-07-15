import { axiosInstance } from "@/core/config/axiosInstance";
import type { Product, ProductsResponse } from "../types/product.types";

export const productsApi = {
  getProducts: async ({
    id,
    pageNumber = 1,
    pageSize = 9,
  }: {
    id: string;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<ProductsResponse> => {
    const response = await axiosInstance.get(
      `/Product/getallproducts/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data;
  },
  getProductById: async (
    id: string,
  ): Promise<{ data: Product; statusCode: number; message: string }> => {
    const response = await axiosInstance.get(`/Product/getproductbyid/${id}`);
    return response.data;
  },
};
