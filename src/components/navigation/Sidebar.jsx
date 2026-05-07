import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  mentorNavItems,
  menteeNavItems,
} from "../../utils/navigation";

import { LogOut } from "lucide-react";

import { useLogout } from "../../features/auth/hooks/useLogout";

export default function Sidebar() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const { mutate: logout, isPending } = useLogout();

  const navItems =
    user?.role === "MENTOR"
      ? mentorNavItems
      : menteeNavItems;

  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white">
      <div className="flex h-20 items-center border-b border-gray-200 px-6">
        <h1 className="text-3xl font-bold tracking-tight">
          MentorConnect
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200

                ${isActive
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                }
              `
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4 space-y-4">
        <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-semibold">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role}
            </p>
          </div>
        </div>

        <button
          disabled={isPending}
          onClick={() => logout()}
          className="
      flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
        >
          <LogOut size={18} />

          {isPending
            ? "Logging out..."
            : "Logout"}
        </button>
      </div>
    </aside>
  );
}