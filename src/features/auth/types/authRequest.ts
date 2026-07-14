export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "Active" | "InActive";
  confirmPassword: string;
  password: string;
  rememberMe: boolean;
}
