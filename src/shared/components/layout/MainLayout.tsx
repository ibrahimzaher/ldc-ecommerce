import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-lg font-bold">My Application</h1>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-primary text-primary-foreground p-4 text-center">
        &copy; 2024 My Application. All rights reserved.
      </footer>
    </div>
  );
}
