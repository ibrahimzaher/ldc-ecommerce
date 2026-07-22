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

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  cost: number;
}

export interface Order {
  id: string;
  customerId: string;
  tax: number;
  isDeleted: boolean;
  amount: number;
  totalAmount: number;
  updatedOn: string;
  createdOn: string;
  orderItems: OrderItem[];
}

export interface OrdersPaginationData {
  items: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface OrdersApiResponse {
  data: OrdersPaginationData;
  statusCode: number;
  message: string;
}
