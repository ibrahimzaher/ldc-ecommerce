import { useAppSelector } from "@/core/store/store";
import { useMemo, useState } from "react";
import { ProductCard } from "@/features/ecommerce/components/ProductCard";
import { ProductPagination } from "@/features/ecommerce/pages/ProductList/components/PaginatorProduct";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { useGetProducts } from "../../hooks/useProducts";
import { ProductFilters } from "./components/FilterProducts";

export default function ProductListPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [priceFilter, setPriceFilter] = useState<[number, number] | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, error } = useGetProducts(
    user?.id || "",
    currentPage,
    pageSize,
  );
  const products = useMemo(() => data?.data?.items || [], [data]);
  const filteredProducts = useMemo(() => {
    if (!priceFilter) return products;
    return products.filter(
      (product) =>
        product.amount >= priceFilter[0] && product.amount <= priceFilter[1],
    );
  }, [products, priceFilter]);

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

  const totalCount = data?.data?.totalCount || 0;
  const totalPages = data?.data?.totalPages || 1;
  const handleApplyFilters = (priceRange: [number, number]) => {
    setPriceFilter(priceRange);
    setIsMobileSheetOpen(false);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="flex gap-8 relative">
        <div className="w-1/4 hidden lg:block border border-gray-100 rounded-[20px] p-6 h-fit bg-white sticky top-25">
          <ProductFilters onApplyFilters={handleApplyFilters} />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between flex-row items-center mb-4.5">
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                Products
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-xs md:text-sm text-gray-500">
                  Showing {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
                  Products
                </p>
                <div className="lg:hidden">
                  <Sheet
                    open={isMobileSheetOpen}
                    onOpenChange={setIsMobileSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <button className="bg-[#F0EEED] hover:bg-neutral-200 p-3 rounded-full text-black transition">
                        <SlidersHorizontal className="h-5 w-5" />
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      side="bottom"
                      className="rounded-t-[20px] px-6 pb-8 pt-6 max-h-[85vh] overflow-y-auto"
                    >
                      <SheetHeader className="hidden">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <ProductFilters
                        onApplyFilters={handleApplyFilters}
                        onCloseMobile={() => setIsMobileSheetOpen(false)}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
                {filteredProducts.map((product) => {
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
