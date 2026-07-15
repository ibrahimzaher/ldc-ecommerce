import { useAppSelector } from "@/core/store/store";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const user = useAppSelector((store) => store.auth.user);

  if (user !== null) {
    if (user.isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}
