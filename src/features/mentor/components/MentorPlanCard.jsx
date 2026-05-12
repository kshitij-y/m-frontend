const formatDuration = (duration) => {
  switch (duration) {
    case "THREE_MONTH":
      return "3 months";
    case "SIX_MONTH":
      return "6 months";
    case "TWELVE_MONTH":
      return "12 months";
    default:
      return "Custom";
  }
};

export default function MentorPlanCard({ plan }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {plan.title || "Mentorship plan"}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {plan.description || "Plan details will appear here."}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            plan.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {plan.isActive ? "Active" : "Paused"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Duration
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            {formatDuration(plan.duration)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Pricing
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            ₹{plan.price}
          </p>
        </div>
      </div>
    </div>
  );
}
