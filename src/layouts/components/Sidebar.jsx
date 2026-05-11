import { useMemo, useState } from "react";
import { Pin, PinOff } from "lucide-react";

import {
  mentorNavItems,
  menteeNavItems,
} from "../../utils/navigation";

import Logo from "../../components/ui/Logo";

import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

import useAuth from "../../hooks/useAuth";
import { useMyProfile } from "../../features/users/hooks/useMyProfile";

export default function Sidebar({
  isPinned,
  onPinnedChange,
}) {
  const { user } = useAuth();
  const { data: profile } = useMyProfile();

  const [isHovered, setIsHovered] =
    useState(false);
  const [localPinned, setLocalPinned] =
    useState(false);

  const pinned =
    typeof isPinned === "boolean"
      ? isPinned
      : localPinned;
  const setPinned =
    onPinnedChange || setLocalPinned;

  const isExpanded = pinned || isHovered;

  const role =
    profile?.role || user?.role;
  const navItems = useMemo(() => {
    return role === "MENTOR"
      ? mentorNavItems
      : menteeNavItems;
  }, [role]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed inset-y-0 left-0 z-40 hidden h-screen shrink-0 border-r border-slate-200 bg-white transition-[width] duration-300 ease-out lg:flex lg:flex-col ${isExpanded
        ? "w-[264px] shadow-sm"
        : "w-[88px]"
        }`}
    >
      {/* LOGO */}
      <div className="border-b border-slate-100 p-4">
        <div
          className={`flex items-center overflow-hidden ${isExpanded
              ? "justify-between"
              : "justify-center"
            }`}
        >
          <div className="overflow-hidden transition-all duration-200">
            {isExpanded ? (
              <Logo />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-[13px] font-semibold tracking-tight text-white shadow-sm">
                MC
              </div>
            )}
          </div>

          {isExpanded && (
            <button
              type="button"
              onClick={() => setPinned(!pinned)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              aria-label={
                pinned
                  ? "Unpin sidebar"
                  : "Pin sidebar"
              }
            >
              {pinned ? (
                <PinOff size={18} />
              ) : (
                <Pin size={18} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              expanded={isExpanded}
            />
          ))}
        </div>
      </nav>

      {/* PROFILE */}
      <div className="border-t border-slate-100 p-3">
        <SidebarProfile
          expanded={isExpanded}
          user={user}
          profile={profile}
        />
      </div>
    </aside>
  );
}