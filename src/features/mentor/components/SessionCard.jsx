import { Link } from "react-router-dom";

const statusStyles = {
  ACTIVE: "border-emerald-100 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-100 bg-amber-50 text-amber-700",
  COMPLETED: "border-slate-200 bg-slate-100 text-slate-600",
  CANCELLED: "border-slate-200 bg-slate-100 text-slate-600",
};

const formatDateTime = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function SessionCard({
  mentorship,
  onReschedule,
}) {
  const mentee = mentorship?.mentee;
  const status = mentorship?.status || "ACTIVE";
  const statusLabel = status
    ? status.charAt(0) + status.slice(1).toLowerCase()
    : "Unknown";

  const meetLink = mentorship?.googleMeetLink;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-xs font-semibold text-indigo-700">
            {mentee?.name?.charAt(0) || "M"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {mentee?.name || "Mentee"}
            </p>
            <p className="text-xs text-slate-500">
              {mentorship?.mentorPlan?.title || "Mentorship session"}
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

      <div className="mt-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">
          {formatDateTime(mentorship?.startDate)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Duration: {mentorship?.mentorPlan?.duration || "Not set"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {meetLink ? (
          <a
            href={meetLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
          >
            Join Session
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-400"
          >
            Join Session
          </button>
        )}

        <Link
          to="/mentor/chat"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          Open Chat
        </Link>

        <button
          type="button"
          onClick={onReschedule}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          Reschedule
        </button>

        <Link
          to="/mentor/sessions"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
