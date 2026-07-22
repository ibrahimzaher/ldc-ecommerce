import { axiosInstance } from "@/core/config/axiosInstance";
import type {
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/authRequest";
import type {
  AuthResponse,
  GetAllCustomersResponse,
} from "../types/authResponse";

export const authApi = {
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/Customer/login", {
      email: request.email,
      password: request.password,
    });
    return response.data;
  },
  register: async (request: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/Customer/register", {
      name: request.name,
      address: request.address,
      phone: request.phone,
      email: request.email,
      status: request.status,
      password: request.password,
    });
    return response.data;
  },
  getAllCustomers: async ({
    pageNumber = 1,
    pageSize = 10,
  }: {
    pageNumber: number;
    pageSize: number;
  }): Promise<GetAllCustomersResponse> => {
    const response = await axiosInstance.get(
      "/Customer/getAllCustomers?pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize,
    );
    return response.data;
  },
};
