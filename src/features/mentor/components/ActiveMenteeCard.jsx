import {
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "Not scheduled";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};

export default function ActiveMenteeCard({
  mentorship,
}) {
  const mentee =
    mentorship?.mentee;

  const plan =
    mentorship?.mentorPlan;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg">
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-base font-bold text-indigo-700">
            {mentee?.avatar ? (
              <img
                src={mentee.avatar}
                alt={mentee.name}
                className="h-full w-full object-cover"
              />
            ) : (
              mentee?.name?.charAt(
                0
              ) || "M"
            )}
          </div>

          {/* INFO */}
          <div>
            <p className="text-base font-semibold text-slate-900">
              {mentee?.name ||
                "Mentee"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {plan?.title ||
                "Mentorship Plan"}
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Active
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Started
          </div>

          <span className="font-medium text-slate-900">
            {formatDate(
              mentorship?.createdAt
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Ends
          </div>

          <span className="font-medium text-slate-900">
            {formatDate(
              mentorship?.endDate
            )}
          </span>
        </div>
      </div>
    </div>
  );
}