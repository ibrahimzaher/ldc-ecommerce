import { axiosInstance } from "@/core/config/axiosInstance";
import type {
  OrderRequest,
  OrderResponse,
  OrdersApiResponse,
} from "../types/orders.types";

export const OrdersApi = {
  addOrder: async (orderData: OrderRequest): Promise<OrderResponse> => {
    const response = await axiosInstance.post("/Order/addorder", orderData);
    return response.data;
  },
  getOrders: async (
    customerId: string,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<OrdersApiResponse> => {
    const response = await axiosInstance.get(
      `/Order/getallorders/${customerId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data;
  },
  getAllOrders: async ({
    pageNumber = 1,
    pageSize = 10,
  }: {
    pageNumber?: number;
    pageSize?: number;
  }): Promise<OrdersApiResponse> => {
    const response = await axiosInstance.get(
      `/Order/getallorders?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data;
  },
  deleteOrder: async (
    orderId: string,
  ): Promise<{ statusCode: number; message: string }> => {
    const response = await axiosInstance.delete(
      `/Order/deleteorder/${orderId}`,
    );
    return response.data;
  },
};
