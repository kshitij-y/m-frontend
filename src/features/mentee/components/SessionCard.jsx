const statusStyles = {
  upcoming: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  completed: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function SessionCard({ session }) {
  const badgeClass =
    statusStyles[session.status] ||
    "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-semibold text-indigo-700">
            {session.mentorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {session.mentorName}
            </p>
            <p className="text-xs text-slate-500">
              {session.expertise}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {session.statusLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Date</span>
          <span className="font-medium text-slate-900">
            {session.date}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time</span>
          <span className="font-medium text-slate-900">
            {session.time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Duration</span>
          <span className="font-medium text-slate-900">
            {session.duration}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500">
          Join Session
        </button>
        <button className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
          View Details
        </button>
      </div>
    </div>
  );
}
