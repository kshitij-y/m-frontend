import { LogOut } from "lucide-react";

import { useLogout } from "../../features/auth/hooks/useLogout";

export default function SidebarProfile({
  expanded,
  user,
  profile,
}) {
  const { mutate: logout, isPending } = useLogout();

  const displayName =
    profile?.name ||
    profile?.fullName ||
    user?.name ||
    user?.email ||
    "";
  const displayRole =
    profile?.role || user?.role || "";
  const avatarLetter =
    displayName
      ? displayName
          .trim()
          .charAt(0)
          .toUpperCase()
      : "?";

  return (
    <div>
      <div className="flex w-full items-center gap-3 rounded-2xl p-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
          {avatarLetter}
        </div>

        <div
          className={`min-w-0 overflow-hidden transition-all duration-200 ${
            expanded
              ? "opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          <p className="truncate text-sm font-semibold text-slate-900">
            {displayName}
          </p>

          <p className="truncate text-xs uppercase tracking-wide text-slate-500">
            {displayRole}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={() => logout()}
        className="mt-2 flex h-12 w-full items-center gap-3 rounded-2xl px-3 text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
        title={expanded ? undefined : "Logout"}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <LogOut size={20} />
        </div>

        <span
          className={`truncate text-sm font-medium transition-all duration-200 ${
            expanded
              ? "opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          {isPending ? "Logging out..." : "Logout"}
        </span>
      </button>
    </div>
  );
}