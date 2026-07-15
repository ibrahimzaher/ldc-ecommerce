import { useAppSelector } from "@/core/store/store";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: "admin" | "user";
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const user = useAppSelector((store) => store.auth.user);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles === "user" && user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (allowedRoles === "admin" && !user.isAdmin) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}
