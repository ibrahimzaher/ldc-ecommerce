import type { ProductRequest } from "@/features/ecommerce/types/product.types";
import { ProductForm } from "../../components/ProductFrom";
import { useAddProduct } from "../../hooks/useAddProduct";
import { useNavigate } from "react-router-dom";

export const AddProductPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddProduct();
  const handelSubmit = (data: ProductRequest) => {
    mutate(data);
    navigate("/dashboard/productList");
  };
  return (
    <ProductForm
      isPending={isPending}
      onSubmit={handelSubmit}
      title="General Information"
    />
  );
};
