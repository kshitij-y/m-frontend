import { Link } from "react-router-dom";

const statusStyles = {
  ACTIVE: "border-emerald-100 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-100 bg-amber-50 text-amber-700",
  COMPLETED: "border-slate-200 bg-slate-100 text-slate-600",
  CANCELLED: "border-slate-200 bg-slate-100 text-slate-600",
};

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

export default function MentorshipItemCard({ mentorship }) {
  const mentor = mentorship?.mentorProfile?.user;
  const profile = mentorship?.mentorProfile;
  const plan = mentorship?.mentorPlan;

  const status = mentorship?.status || "ACTIVE";
  const statusLabel = status
    ? status.charAt(0) + status.slice(1).toLowerCase()
    : "Unknown";

  const expertise =
    profile?.expertise?.map(
      (item) => item.expertise?.name || item.name
    ) || [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-semibold text-indigo-700">
            {mentor?.name?.charAt(0) || "M"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {mentor?.name || "Mentor"}
            </p>
            <p className="text-xs text-slate-500">
              {profile?.headline || "Mentor"}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            statusStyles[status] ||
            "border-slate-200 bg-slate-100 text-slate-600"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {expertise.length ? (
          expertise.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">
            Expertise not listed
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Started
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatDate(mentorship?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Plan
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {plan?.title || plan?.duration || "Plan"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Next session
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatDate(mentorship?.startDate)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Session status
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {statusLabel}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/mentee/chat"
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
        >
          Open Chat
        </Link>
        <Link
          to={`/mentee/mentors/${mentor?.id}`}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          View Mentor
        </Link>
        <button
          type="button"
          disabled
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-400"
        >
          View Sessions
        </button>
      </div>
    </div>
  );
}
