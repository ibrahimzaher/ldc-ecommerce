import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authApi } from "../api/authApi";
import { useAppDispatch } from "@/core/store/store";
import { setUser } from "@/features/auth/store/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mutateLogin = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data, variables) => {
      console.log(variables.rememberMe);
      const storage = variables.rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      toast.success("Login successful", { duration: 1500 });
      navigate("/");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;

      console.log(
        err.response?.data?.message || "An error occurred during login.",
      );
      toast.error(
        err.response?.data?.message || "An error occurred during login.",
        { duration: 1500 },
      );
    },
  });
  const mutateRegister = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data, variables) => {
      console.log(variables.rememberMe);
      const storage = variables.rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      toast.success("Register successful", { duration: 1500 });
      navigate("/");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;

      console.log(
        err.response?.data?.message || "An error occurred during register.",
      );
      toast.error(
        err.response?.data?.message || "An error occurred during register.",
        { duration: 1500 },
      );
    },
  });
  return { mutateLogin, mutateRegister };
};
