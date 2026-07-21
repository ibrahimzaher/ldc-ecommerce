import logo from "@/assets/images/logo.png";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/components/ui/button";
import DynamicBreadcrumb from "@/shared/components/ui/DynamicBreadCrumb";
import {
  LayoutGrid,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
export default function DashboardLayout() {
  const { logout } = useAuth();
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center justify-center lg:justify-between p-2.5 lg:px-3 lg:py-2.5 rounded-xl font-medium text-sm transition-colors ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700 font-sans overflow-hidden">
      <aside className="w-16 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-3 lg:p-4 shrink-0 transition-all duration-300">
        <div>
          <img
            src={logo}
            alt="Logo"
            className=" mb-6 w-full lg:w-1/2 h-5 lg:h-auto"
          />

          <nav className="space-y-2">
            <NavLink to="/dashboard" end className={getNavLinkClass}>
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5" />
                <span className="hidden lg:inline">Dashboard</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/productList" className={getNavLinkClass}>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden lg:inline">Products</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/orders" className={getNavLinkClass}>
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline">Orders</span>
              </div>
            </NavLink>

            <NavLink to="/dashboard/customers" className={getNavLinkClass}>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="hidden lg:inline">Customers</span>
              </div>
            </NavLink>
          </nav>
        </div>

        <Button
          variant={"destructive"}
          className="w-full justify-center lg:justify-start gap-3"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <DynamicBreadcrumb className="text-primary hover:text-primary-600 font-medium" />
        <Outlet />
      </main>
    </div>
  );
}
