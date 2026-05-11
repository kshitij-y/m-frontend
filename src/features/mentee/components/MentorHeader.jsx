export default function MentorHeader({ mentor }) {
  const profile = mentor?.mentorProfile;
  const isAvailable = profile?.isAvailable;
  const experience = profile?.experienceYears;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-2xl font-semibold text-indigo-700">
            {mentor?.name?.charAt(0) || "M"}
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {mentor?.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {profile?.headline || "Mentor"}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              {profile?.about || "No bio available."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                Rating unavailable
              </span>
              {experience ? (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {experience} yrs experience
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <span
            className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold ${
              isAvailable
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-100 text-slate-600"
            }`}
          >
            {isAvailable
              ? "Available for mentorship"
              : "Not accepting new mentees"}
          </span>
        </div>
      </div>
    </div>
  );
}
