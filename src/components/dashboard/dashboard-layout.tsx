import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 ml-0">
        <Outlet />
      </main>
    </div>
  );
}
