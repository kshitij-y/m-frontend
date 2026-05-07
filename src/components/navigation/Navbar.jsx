import { Bell } from "lucide-react";

import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user?.name}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 transition hover:bg-gray-100">
          <Bell size={22} />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
}