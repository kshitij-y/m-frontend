import { Link } from "react-router-dom";

export default function EmptyMentorshipState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <span className="text-lg font-semibold">M</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        You haven’t started any mentorships yet.
      </h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Discover mentors that match your goals and start your first mentorship journey.
      </p>
      <Link
        to="/mentee/mentors"
        className="mt-4 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Find Mentors
      </Link>
    </div>
  );
}
