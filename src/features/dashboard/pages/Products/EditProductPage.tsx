import { useGetProductById } from "@/features/ecommerce/hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { ProductForm } from "../../components/ProductFrom";
import type { ProductRequest } from "@/features/ecommerce/types/product.types";

export const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductById(id || "");
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProduct();
  const handleSubmit = (values: ProductRequest) => {
    if (id) {
      mutate({ id, productData: values });
      navigate("/dashboard/productList");
    }
  };
  return (
    <ProductForm
      isPending={isPending}
      initialValues={data}
      onSubmit={handleSubmit}
      submitButtonText="Update Product"
      title="Update Product"
    />
  );
};
