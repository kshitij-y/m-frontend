const formatPricing = (plans = []) => {
  if (!plans.length) {
    return "Pricing not set";
  }

  const prices = plans
    .filter((plan) => plan.isActive)
    .map((plan) => plan.price)
    .sort((a, b) => a - b);

  if (!prices.length) {
    return "Pricing not set";
  }

  return `From $${prices[0]}`;
};

export default function MentorMatchCard({ mentor }) {
  const profile = mentor?.mentorProfile;
  const expertise = profile?.expertise || [];
  const plans = profile?.mentorPlans || [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {mentor?.avatar ? (
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-semibold text-indigo-700">
              {mentor?.name?.charAt(0)}
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mentor?.name}
            </h3>
            <p className="text-sm text-slate-500">
              {profile?.headline || "Mentor"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {formatPricing(plans)}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-slate-600">
        {profile?.about || mentor?.bio || "No bio yet."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {expertise.slice(0, 4).map((item) => (
          <span
            key={item.id}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {item.name}
          </span>
        ))}
      </div>

      {mentor?.matchReason && (
        <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-xs font-medium text-indigo-700">
          {mentor.matchReason}
        </div>
      )}
    </div>
  );
}
