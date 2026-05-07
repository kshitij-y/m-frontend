import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}