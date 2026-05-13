import { ArrowUpRight } from "lucide-react";

import { Link } from "react-router-dom";

const formatExperience = (
  years
) => {
  if (
    years === undefined ||
    years === null
  ) {
    return "Experience not listed";
  }

  return `${years}+ years experience`;
};

export default function MentorMatchCard({
  mentor,
}) {
  if (!mentor) {
    return null;
  }

  const profile =
    mentor?.mentorProfile;

  const expertise =
    profile?.expertise || [];

  return (
    <Link
      to={`/mentee/mentors/${mentor.id}`}
      className="group block rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          {mentor?.avatar ? (
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-semibold text-indigo-700">
              {mentor?.name?.charAt(
                0
              ) || "M"}
            </div>
          )}

          {/* INFO */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-700">
              {mentor?.name ||
                "Mentor"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {profile?.headline ||
                "Mentor"}
            </p>
          </div>
        </div>

        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-indigo-600" />
      </div>

      {/* ABOUT */}
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {profile?.about ||
          mentor?.bio ||
          "Experienced mentor ready to help you grow and achieve your learning goals."}
      </p>

      {/* EXPERTISE */}
      <div className="mt-5 flex flex-wrap gap-2">
        {expertise.length ? (
          expertise
            .slice(0, 4)
            .map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {item.name}
              </span>
            ))
        ) : (
          <span className="text-xs text-slate-400">
            Expertise not listed
          </span>
        )}
      </div>

      {/* EXPERIENCE */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Experience
          </span>

          <span className="font-semibold text-slate-900">
            {formatExperience(
              profile?.experienceYears
            )}
          </span>
        </div>
      </div>

      {/* MATCH REASON */}
      {mentor?.matchReason && (
        <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-700">
          {mentor.matchReason}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <p className="text-xs font-medium text-slate-400">
          AI recommended mentor
        </p>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
          View mentor

          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}