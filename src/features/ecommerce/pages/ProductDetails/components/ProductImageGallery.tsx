import type { ProductImage } from "@/features/ecommerce/types/product.types";
import { useMemo, useState } from "react";

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = useMemo(
    () => images[activeImageIndex],
    [images, activeImageIndex],
  );

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-[20px] h-112.5 w-full flex items-center justify-center text-gray-400">
        No Images Available
      </div>
    );
  }

  return (
    <div className="flex  flex-col lg:flex-row-reverse gap-3 md:gap-4 w-full">
      <div className="flex-1 bg-[#F0EEED] rounded-[20px] aspect-square overflow-hidden flex items-center justify-center p-4">
        <img
          src={activeImage.url}
          alt={`Product Image ${activeImageIndex + 1}`}
          className="max-h-full max-w-full object-contain rounded-[20px] transition duration-300"
        />
      </div>

      <div className="flex  flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:w-37.5 shrink-0 scrollbar-none">
        {images.map((image, index) => {
          const isActive = index === activeImageIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`
                bg-[#F0EEED] rounded-[20px] aspect-square overflow-hidden flex items-center justify-center p-2 
                w-20 h-20 sm:w-25 sm:h-25 lg:w-full lg:h-auto shrink-0 transition border-2 
                ${isActive ? "border-black" : "border-transparent hover:border-neutral-300"}
              `}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={`Product Image ${index + 1}`}
                className="max-h-full max-w-full object-contain rounded-[12px]"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
