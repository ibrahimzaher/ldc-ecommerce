import ProtectedRoute from "@/core/guards/ProtectedRoute";
import PublicRoute from "@/core/guards/PublicRoute";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/Dashboard/DashboardPage";
import { AddProductPage } from "@/features/dashboard/pages/Products/AddProductPage";
import { ProductsPage } from "@/features/dashboard/pages/Products/ProductsPage";
import MainLayout from "@/features/ecommerce/layouts/MainLayout";
import { CartPage } from "@/features/ecommerce/pages/Cart/CartPage";
import { OrdersPage } from "@/features/ecommerce/pages/Orders/OrdersPage";
import ProductDetailsPage from "@/features/ecommerce/pages/ProductDetails/ProductDetailsPage";
import { productLoader } from "@/features/ecommerce/pages/ProductDetails/resolver/productLoader";
import ProductListPage from "@/features/ecommerce/pages/ProductList/ProductListPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles="user" />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/products",
            element: <ProductListPage />,
          },
          {
            path: "/products/:id",
            element: <ProductDetailsPage />,
            loader: productLoader,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
          {
            path: "/",
            element: <Navigate to="/products" replace />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles="admin" />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/productList",
            element: <ProductsPage />,
          },
          {
            path: "/dashboard/productList/addProduct",
            element: <AddProductPage />,
          },
        ],
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <h2 className="text-lg font-bold flex justify-center items-center bg-primary text-primary-foreground p-4 rounded-lg">
          Page Not Found
        </h2>
      </>
    ),
  },
]);
