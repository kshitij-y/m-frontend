import { Link } from "react-router-dom";

const formatPrice = (plans = []) => {
  const activePlans = plans.filter(
    (plan) => plan.isActive
  );

  if (!activePlans.length) {
    return "Pricing not set";
  }

  const prices = activePlans
    .map((plan) => plan.price)
    .filter((price) => price !== undefined)
    .sort((a, b) => a - b);

  if (!prices.length) {
    return "Pricing not set";
  }

  if (prices.length === 1) {
    return `$${prices[0]}`;
  }

  return `$${prices[0]} - $${prices[prices.length - 1]}`;
};

export default function MentorCard({ mentor }) {
  const profile = mentor?.mentorProfile;
  const expertise = profile?.expertise || [];
  const availability = profile?.isAvailable;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-semibold text-indigo-700">
            {mentor?.name?.charAt(0) || "M"}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mentor?.name}
            </h3>
            <p className="text-sm text-slate-500">
              {profile?.headline || "Mentor"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Rating unavailable
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            availability
              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-100 text-slate-600"
          }`}
        >
          {availability
            ? "Available for mentorship"
            : "Not accepting mentees"}
        </span>
      </div>

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

      <p className="mt-4 line-clamp-3 text-sm text-slate-600">
        {profile?.about || "No bio available yet."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Pricing
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatPrice(profile?.mentorPlans || [])}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Experience
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {profile?.experienceYears
              ? `${profile.experienceYears} yrs`
              : "Not set"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to={`/mentee/mentors/${mentor.id}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          View Mentor
        </Link>
      </div>
    </div>
  );
}