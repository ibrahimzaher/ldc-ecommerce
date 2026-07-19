import { axiosInstance } from "@/core/config/axiosInstance";
import type {
  OrderRequest,
  OrderResponse,
  OrdersResponse,
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
  ): Promise<OrdersResponse> => {
    const response = await axiosInstance.get(
      `/Order/getallorders/${customerId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data;
  },
};
