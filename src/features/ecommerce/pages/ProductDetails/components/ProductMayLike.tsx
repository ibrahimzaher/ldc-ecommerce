import { useAppSelector } from "@/core/store/store";
import { ProductCard } from "@/features/ecommerce/components/ProductCard";
import { useGetProducts } from "@/features/ecommerce/hooks/useProducts";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductMayLike() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProducts(user?.id || "", 1, 4);
  const products = useMemo(
    () => productsData?.data?.items || [],
    [productsData],
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }
  return (
    <div className="mt-10">
      <h2 className="text-2xl md:text-4xl font-bold my-8 text-center">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            onClick={() => navigate(`/products/${product.id}`)}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
