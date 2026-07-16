import placeholderImage from "@/assets/images/placeholder.png";
import type { Product } from "@/features/ecommerce/types/product.types";
import { Star, StarHalf } from "lucide-react";
const renderStars = (rating = 4.5) => {
  const totalStars = 5;
  const fullStarsCount = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-[#FFC107]">
        {" "}
        {Array.from({ length: totalStars }).map((_, index) => {
          const starNumber = index + 1;

          if (starNumber <= fullStarsCount) {
            return (
              <Star
                key={index}
                className="h-4 w-4 fill-current stroke-current"
              />
            );
          } else if (starNumber === fullStarsCount + 1 && hasHalfStar) {
            return (
              <StarHalf
                key={index}
                className="h-4 w-4 fill-current stroke-current"
              />
            );
          } else {
            return (
              <Star
                key={index}
                className="h-4 w-4 text-gray-200 fill-gray-100 stroke-gray-300"
              />
            );
          }
        })}
      </div>

      <span className="text-black text-xs font-medium ml-1.5 mt-0.5">
        {rating}
        <span className="text-gray-400 font-normal">/5</span>
      </span>
    </div>
  );
};

export const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0].url
      : placeholderImage;
  return (
    <div
      key={product.id}
      className="group cursor-pointer flex flex-col items-start"
    >
      <div className="bg-gray-25 rounded-[20px] aspect-square w-full overflow-hidden flex items-center justify-center relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain rounded-[20px]  group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="flex flex-col gap-1 w-full px-1 mt-2">
        <h2 className="text-sm md:text-base font-bold text-black truncate mb-1">
          {product.name}
        </h2>

        <div className="mb-1">{renderStars(4.5)}</div>

        <div className="flex items-center gap-2">
          <p className="text-xl md:text-2xl font-bold text-black">
            ${product.amount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
