import { authApi } from "@/features/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["getAllCustomers", pageNumber, pageSize],
    queryFn: () => authApi.getAllCustomers({ pageNumber, pageSize }),
  });
};
