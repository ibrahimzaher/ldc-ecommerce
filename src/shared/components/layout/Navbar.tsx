import { useState } from "react";
import logo from "@/assets/images/logo.png";
import CustomInput from "@/shared/components/ui/CustomInput";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className={cn(
        "bg-white border-gray-200 mb-5 border-b px-4 py-2.5 rounded dark:bg-gray-900",
        className,
      )}
    >
      <div className="flex items-center gap-10 justify-between mx-auto">
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

          <img src={logo} className="h-6 sm:h-9" alt="Logo" />
        </div>

        <div className="relative w-full lg:block hidden">
          <CustomInput
            placeholder="Search for products..."
            className="px-10 rounded-2xl"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          <ul className="flex flex-col gap-2 bg-gray-25 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-primary-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
