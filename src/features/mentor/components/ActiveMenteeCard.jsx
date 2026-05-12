import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function ActiveMenteeCard({ mentorship }) {
  const mentee = mentorship?.mentee;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
            {mentee?.name?.charAt(0) || "M"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {mentee?.name || "Mentee"}
            </p>
            <p className="text-xs text-slate-500">
              {mentorship?.mentorPlan?.title || "Mentorship plan"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Started</span>
          <span className="font-medium text-slate-900">
            {formatDate(mentorship?.createdAt)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Next session</span>
          <span className="font-medium text-slate-900">
            {formatDate(mentorship?.startDate)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/mentor/chat"
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
        >
          Open Chat
        </Link>
        <Link
          to="/mentor/sessions"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          View Mentorship
        </Link>
      </div>
    </div>
  );
}
