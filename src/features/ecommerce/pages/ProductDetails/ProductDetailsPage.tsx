import { Button } from "@/shared/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { renderStars } from "../../components/RenderStars";
import { useGetProductById } from "../../hooks/useProducts";
import { ProductImageGallery } from "./components/ProductImageGallery";
import ProductMayLike from "./components/ProductMayLike";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading, error } = useGetProductById(id);
  const product = useMemo(() => data?.data || null, [data]);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500 font-medium">
        Error loading product details. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  lg:gap-10 items-start">
        <ProductImageGallery images={product.productImages || []} />

        <div className="flex flex-col gap-4 justify-between h-full  lg:py-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-black tracking-tight">
              {product.name}{" "}
              {product.stockQuantity > 0 ? (
                ""
              ) : (
                <span className="text-red-500 ms-5 text-base font-normal">
                  Out of Stock
                </span>
              )}
            </h1>

            <div className="flex items-center gap-2">{renderStars(4.5)} </div>

            <div className="flex items-center gap-3 md:gap-4 my-1">
              <span className="text-2xl md:text-3xl font-bold text-black">
                ${product.amount.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed border-b border-gray-100 pb-6">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {product.stockQuantity > 0 ? (
            <div className="flex gap-4  items-center mt-4">
              <div className="bg-[#F0EEED] rounded-full px-5 py-3 flex items-center gap-5 shrink-0 select-none">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="text-black hover:text-neutral-600 transition p-1 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4.5 w-4.5" />
                </button>
                <span className="font-bold text-black text-base w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, Math.min(prev + 1, product.stockQuantity)),
                    )
                  }
                  className="text-black hover:text-neutral-600 transition p-1 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4.5 w-4.5" />
                </button>
              </div>

              <Button variant="primary" className="flex-1 rounded-full">
                Add to Cart
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <ProductMayLike />
    </>
  );
}
