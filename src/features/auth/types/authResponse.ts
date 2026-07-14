export interface User {
  id: string;
  isAdmin: boolean;
  createdOn: string;
  updatedOn: string;
  isDeleted: boolean;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
}
export interface AuthResponse {
  data: User;
  statusCode: number;
  message: string;
}
