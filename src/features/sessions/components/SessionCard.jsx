import SessionStatusBadge from "./SessionStatusBadge";

const formatDateTime = (value) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function SessionCard({
  session,
  userRole,
  onReschedule,
  onCancel,
  onComplete,
}) {
  const { startTime, endTime, status, googleMeetLink } = session;

  const isScheduled = status === "SCHEDULED";
  const isMentor = userRole === "MENTOR";
  const isTerminal =
    status === "COMPLETED" || status === "CANCELLED" || status === "MISSED";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-slate-600">
          <p className="font-semibold text-slate-900">
            {formatDateTime(startTime)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            to {formatDateTime(endTime)}
          </p>
        </div>
        <SessionStatusBadge status={status} />
      </div>

      {!isTerminal && (
        <div className="mt-4 flex flex-wrap gap-2">
          {googleMeetLink && (
            <a
              href={googleMeetLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              Join Session
            </a>
          )}

          {isMentor && isScheduled && (
            <>
              <button
                type="button"
                onClick={onReschedule}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Reschedule
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onComplete}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-green-200 hover:text-green-600"
              >
                Complete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
