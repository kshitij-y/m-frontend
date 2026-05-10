import { Link } from "react-router-dom";

export default function MentorCard({ mentor }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
          {mentor?.name?.charAt(0)}
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            {mentor?.name}
          </h3>

          <p className="text-sm text-gray-500">
            {mentor?.mentorProfile?.headline ||
              "Mentor"}
          </p>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm text-gray-600">
        {mentor?.mentorProfile?.about ||
          "No bio available yet."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {mentor?.mentorProfile?.expertise
          ?.slice(0, 3)
          .map((item) => (
          <span
            key={item.id}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            {item.name}
          </span>
        ))}
      </div>

      <Link
        to={`/mentors/${mentor.id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        View Profile
      </Link>
    </div>
  );
}