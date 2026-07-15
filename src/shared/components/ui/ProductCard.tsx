import placeholderImage from "@/assets/images/placeholder.png";
import type { Product } from "@/features/products/types/product.types";
const renderStars = (rating = 4.5) => {
  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 !== 0 && "½"}
      <span className="text-gray-400 text-xs ml-1">{rating}/5</span>
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

        <div className="mb-1">{renderStars()}</div>

        <div className="flex items-center gap-2">
          <p className="text-xl md:text-2xl font-bold text-black">
            ${product.amount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
