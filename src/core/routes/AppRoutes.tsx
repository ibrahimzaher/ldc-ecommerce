import { LoginPage } from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProductListPage from "@/features/products/pages/ProductListPage";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import MainLayout from "@/shared/components/layout/MainLayout";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import PublicRoute from "@/shared/components/PublicRoute";
import { Navigate, Route, Routes } from "react-router-dom";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles="user" />}>
        <Route element={<MainLayout />}>
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles="admin" />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <h2 className="text-lg font-bold flex justify-center items-center bg-primary text-primary-foreground p-4 rounded-lg">
              Page Not Found
            </h2>
          </>
        }
      />
    </Routes>
  );
}
