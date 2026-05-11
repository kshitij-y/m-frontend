const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-100",
  PENDING: "bg-amber-50 text-amber-700 border-amber-100",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
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

export default function MentorshipCard({ mentorship }) {
  const mentor = mentorship?.mentorProfile?.user;
  const expertise =
    mentorship?.mentorProfile?.expertise || [];
  const statusLabel =
    mentorship?.status
      ? mentorship.status.charAt(0) +
        mentorship.status.slice(1).toLowerCase()
      : "Unknown";

  const badgeClass =
    statusStyles[mentorship?.status] ||
    "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
            {mentor?.name?.charAt(0) || "M"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {mentor?.name || "Mentor"}
            </p>
            <p className="text-xs text-slate-500">
              {expertise.length
                ? expertise
                    .map(
                      (item) =>
                        item.expertise?.name || item.name
                    )
                    .slice(0, 3)
                    .join(" · ")
                : "Expertise not set"}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Active since</span>
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
        <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500">
          Open Chat
        </button>
        <button className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
          View Mentor
        </button>
      </div>
    </div>
  );
}
