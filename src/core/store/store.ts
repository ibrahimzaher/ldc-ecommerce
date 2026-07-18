import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../../features/auth/store/authSlice";
import { CartSlice } from "@/features/ecommerce/store/cartSlice";
export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    cart: CartSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
