// MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen px-4 lg:px-25 bg-white  flex-col">
      <Navbar className="fixed  left-4 right-4  lg:left-25 lg:right-25 z-50" />
      <main className="flex-1 pt-24 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
