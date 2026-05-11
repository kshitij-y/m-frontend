import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function SidebarItem({
  item,
  expanded,
}) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      title={expanded ? undefined : item.title}
      className={({ isActive }) =>
        clsx(
          "group flex h-12 items-center rounded-2xl px-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60",
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )
      }
    >
      <div className="flex w-full items-center gap-3 overflow-hidden">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <Icon size={20} />
        </div>

        <span
          className={clsx(
            "truncate text-sm font-medium transition-all duration-200",
            expanded
              ? "opacity-100"
              : "w-0 opacity-0"
          )}
        >
          {item.title}
        </span>
      </div>
    </NavLink>
  );
}