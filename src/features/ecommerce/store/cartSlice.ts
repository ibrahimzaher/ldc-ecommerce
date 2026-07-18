import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { CartItem, CartState } from "../types/cart.types";

const getStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user") ? localStorage : sessionStorage;
  }
  return localStorage;
};

const currentStorage = getStorage();
const initialCartItems = currentStorage.getItem("cartItems")
  ? JSON.parse(currentStorage.getItem("cartItems") as string)
  : [];

export const initialCartState: CartState = {
  items: initialCartItems,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const maxQuantity = newItem.product.stockQuantity;

      const existingItem = state.items.find(
        (i) => i.product.id === newItem.product.id,
      );

      if (existingItem) {
        const totalQuantity = existingItem.quantity + newItem.quantity;

        if (totalQuantity > maxQuantity) {
          existingItem.quantity = maxQuantity;
          toast.error(
            `Quantity exceeds stock limit. Set to maximum available: ${maxQuantity}`,
          );
        } else {
          existingItem.quantity = totalQuantity;
          toast.success("Item quantity updated successfully.");
        }
      } else {
        if (newItem.quantity > maxQuantity) {
          newItem.quantity = maxQuantity;
          toast.error(
            `Quantity exceeds stock limit. Set to maximum available: ${maxQuantity}`,
          );
        }
        state.items.push(newItem);
        toast.success("Item added to cart successfully.");
      }

      getStorage().setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find((i) => i.product.id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          toast.success("Item quantity decreased successfully.");
        } else {
          state.items = state.items.filter((i) => i.product.id !== productId);
          toast.info("Item removed from cart.");
        }
        getStorage().setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      getStorage().setItem("cartItems", JSON.stringify(state.items));
      toast.info("Item removed from cart.");
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
