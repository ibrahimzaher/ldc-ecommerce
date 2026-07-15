import { useAppSelector } from "@/core/store/store";
import { useState } from "react";
import { ProductCard } from "@/shared/components/ui/ProductCard";
import { useGetProducts } from "../hooks/useProducts";
import { ProductPagination } from "@/features/products/components/ui/PaginatorProduct";

export default function ProductListPage() {
  const user = useAppSelector((state) => state.auth.user);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, error } = useGetProducts(
    user?.id || "",
    currentPage,
    pageSize,
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error loading products. Please try again later.
      </div>
    );

  const products = data?.data?.items || [];
  const totalCount = data?.data?.totalCount || 0;
  const totalPages = data?.data?.totalPages || 1;

  return (
    <>
      <div className="flex gap-8 relative">
        <div className="w-1/4 hidden md:block bg-gray-50"></div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between flex-row items-center mb-4.5">
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                Products
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
                Products
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
                {products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No products found.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
