import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function MentorshipRequestCard({
  mentorship,
  onApprove,
  onReject,
  isUpdating,
}) {
  const mentee = mentorship?.mentee;
  const plan = mentorship?.mentorPlan;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-semibold text-indigo-700">
              {mentee?.name?.charAt(0) || "M"}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {mentee?.name || "Mentee"}
              </p>
              <p className="text-xs text-slate-500">
                {plan?.title || "Mentorship plan"}
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <div className="flex items-center justify-between gap-6">
              <span>Requested</span>
              <span className="font-medium text-slate-900">
                {formatDate(mentorship?.createdAt)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span>Duration</span>
              <span className="font-medium text-slate-900">
                {plan?.duration || "Not set"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            No message provided.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onApprove}
            disabled={isUpdating}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={onReject}
            disabled={isUpdating}
            className="rounded-2xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reject
          </button>
          <Link
            to="/mentor/profile"
            className="rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
