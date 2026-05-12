import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatExperience = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Experience not set";
  }

  const years = Number(value);
  if (Number.isNaN(years)) {
    return "Experience not set";
  }

  return `${years} year${years === 1 ? "" : "s"} experience`;
};

export default function MentorProfileHeader({ user, profile }) {
  const joinedDate = formatDate(user?.createdAt);
  const availabilityLabel = profile?.isAvailable
    ? "Available for mentorship"
    : "Not accepting new mentees";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.name || "Mentor avatar"}
              className="h-20 w-20 rounded-3xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-2xl font-semibold text-indigo-700">
              {user?.name?.charAt(0) || "M"}
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {user?.name || "Your mentor profile"}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  profile?.isAvailable
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {availabilityLabel}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {profile?.headline || "Mentor"}
            </p>

            <p className="mt-4 max-w-2xl text-sm text-slate-600">
              {profile?.about ||
                "Add a short mentor bio to describe your experience and mentoring style."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <span>{formatExperience(profile?.experienceYears)}</span>
              {joinedDate && <span>Joined {joinedDate}</span>}
            </div>
          </div>
        </div>

        <Link
          to="/mentor/profile/edit"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
}
