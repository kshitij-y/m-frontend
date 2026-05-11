const durationLabels = {
  THREE_MONTH: "3 months",
  SIX_MONTH: "6 months",
  TWELVE_MONTH: "12 months",
};

const planFeatures = [
  "Goal alignment session",
  "Weekly mentor check-ins",
  "Personalized resources",
];

export default function MentorPlanCard({
  plan,
  disabled,
  onSelect,
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          {plan.title || "Mentorship Plan"}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {plan.description || "Build momentum with focused mentorship."}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Duration
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {durationLabels[plan.duration] || "Custom"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Pricing
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            ${plan.price}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Included
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {planFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onSelect}
        className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Book Mentorship
      </button>
    </div>
  );
}
