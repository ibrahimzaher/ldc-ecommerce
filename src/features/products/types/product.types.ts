export interface ProductImage {
  productImageId: string;
  url: string;
}
export interface Product {
  id: string;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  productImages: ProductImage[];
  name: string;
  description: string;
  amount: number;
  type: string;
  stockQuantity: number;
  status: string;
}
export interface ProductsResponse {
  data: {
    items: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  statusCode: number;
  message: string;
}
