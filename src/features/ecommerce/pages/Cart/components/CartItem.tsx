import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import placeholderImage from "@/assets/images/placeholder.png";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/ecommerce/store/cartSlice";
import type { CartItem as CartItemType } from "@/features/ecommerce/types/cart.types";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 py-2 items-start sm:items-center">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F0EEED] rounded-[12px] overflow-hidden flex-shrink-0">
        <img
          src={item.product.productImages?.[0]?.url || placeholderImage}
          alt={item.product.name}
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between w-full h-full sm:h-32 py-1">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg md:text-xl text-black leading-tight">
              {item.product.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-2">
              {item.product.description}
            </p>
          </div>
          <span className="font-bold text-xl sm:text-2xl mt-2 block">
            ${item.product.amount}
          </span>
        </div>

        <div className="flex sm:flex-col justify-between items-center sm:items-end mt-4 sm:mt-0">
          <button
            onClick={() => dispatch(removeFromCart(item.product.id))}
            className="text-red-500 hover:text-red-600 p-1 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 sm:py-2.5 gap-4">
            <button
              onClick={() => dispatch(decreaseQuantity(item.product.id))}
              className="text-black hover:opacity-70 transition-opacity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-sm sm:text-base min-w-[16px] text-center select-none">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                dispatch(addToCart({ product: item.product, quantity: 1 }))
              }
              disabled={item.quantity >= item.product.stockQuantity}
              className="text-black hover:opacity-70 disabled:opacity-20 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
