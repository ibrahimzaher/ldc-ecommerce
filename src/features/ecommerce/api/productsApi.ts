import { axiosInstance } from "@/core/config/axiosInstance";
import type {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  ProductsResponse,
} from "../types/product.types";

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
    id: string | undefined,
  ): Promise<{ data: Product; statusCode: number; message: string }> => {
    const response = await axiosInstance.get(`/Product/getproductbyid/${id}`);
    return response.data;
  },
  deleteProduct: async (
    id: string,
  ): Promise<{ statusCode: number; message: string }> => {
    const response = await axiosInstance.delete(`/Product/deleteproduct/${id}`);
    return response.data;
  },
  addProduct: async (
    productData: CreateProductRequest,
  ): Promise<CreateProductResponse> => {
    const response = await axiosInstance.post(
      `/Product/addproduct`,
      productData,
    );
    return response.data;
  },
};
