import type { User } from "@/features/auth/types/authResponse";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  user: User | null;
}
const storedUser =
  localStorage.getItem("user") ?? sessionStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
