// MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen px-4 py-5.25 lg:px-25 bg-white lg:py-6.25 flex-col">
      <Navbar className="fixed top-4 left-4 right-4 lg:top-6 lg:left-25 lg:right-25 z-50" />

      <main className="flex-1 pt-20 ">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground p-4 text-center mt-8">
        &copy; 2026 My Application. All rights reserved.
      </footer>
    </div>
  );
}
