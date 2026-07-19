import logo from "@/assets/images/logo.png";
import { useAppSelector } from "@/core/store/store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/shared/components/ui/button";
import CustomInput from "@/shared/components/ui/CustomInput";
import { cn } from "@/shared/lib/utils";
import { Menu, Package, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { logout } = useAuth();

  return (
    <nav
      className={cn(
        "bg-white border-gray-200 border-b px-4 py-5 rounded dark:bg-gray-900",
        className,
      )}
    >
      <div className="flex items-center gap-4 lg:gap-10 justify-between mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <img
            src={logo}
            className="h-6 sm:h-9 cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="relative w-full lg:block hidden">
          <CustomInput
            placeholder="Search for products..."
            className="px-10 rounded-2xl"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <button
            onClick={() => navigate("/orders")}
            className="p-2 text-gray-600 cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Package className="h-6 w-6" />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="p-2 cursor-pointer relative text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
            <ShoppingCart className="h-6 w-6" />
          </button>

          <Button variant="primary" className="py-2" onClick={logout}>
            Log Out
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => navigate("/cart")}
            className="p-2 relative text-gray-600 dark:text-gray-400"
          >
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1 font-medium">
            <li>
              <NavLink
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block py-2.5 px-3 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                    isActive && "bg-primary/10 text-primary font-semibold",
                  )
                }
              >
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block py-2.5 px-3 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                    isActive && "bg-primary/10 text-primary font-semibold",
                  )
                }
              >
                My Orders
              </NavLink>
            </li>

            <li className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="destructive"
                className="w-full justify-center py-2.5 rounded-lg mt-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
              >
                Log Out
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
