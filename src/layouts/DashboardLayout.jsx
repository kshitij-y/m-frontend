import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";

export default function DashboardLayout() {
  const [isPinned, setIsPinned] =
    useState(false);

  const collapsedWidth = 88;
  const expandedWidth = 264;
  const sidebarOffset = isPinned
    ? expandedWidth
    : collapsedWidth;

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{
        "--sidebar-offset": `${sidebarOffset}px`,
      }}
    >
      <Sidebar
        isPinned={isPinned}
        onPinnedChange={setIsPinned}
      />

      <main className="min-h-screen transition-[padding] duration-300 lg:pl-[var(--sidebar-offset)]">
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}