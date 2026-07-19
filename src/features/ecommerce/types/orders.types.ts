export interface OrderItemRequest {
  productId: string;
  quantity: number;
}
export interface OrderRequest {
  customerId: string;
  orderItems: OrderItemRequest[];
}
export interface OrderItemResponse {
  id: string;
  productId: string;
  quantity: number;
  cost: number;
}
export interface OrderResponse {
  id: string;
  customerId: string;
  tax: number;
  amount: number;
  totalAmount: number;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  orderItems: OrderItemResponse[];
  statusCode: number;
  message: string;
}

export interface OrdersPaginationData {
  items: OrderResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface OrdersResponse {
  data: OrdersPaginationData;
  statusCode: number;
  message: string;
}
