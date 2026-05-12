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

export default function ProfileHeader({ profile }) {
  const joinedDate = formatDate(profile?.createdAt);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile?.name || "Profile avatar"}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-semibold text-indigo-700">
              {profile?.name?.charAt(0) || "M"}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {profile?.name || "Your profile"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {profile?.email}
            </p>
            {profile?.bio ? (
              <p className="mt-3 text-sm text-slate-600">
                {profile.bio}
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                Add a short bio to let mentors know more about you.
              </p>
            )}
            {joinedDate && (
              <p className="mt-2 text-xs text-slate-400">
                Joined {joinedDate}
              </p>
            )}
          </div>
        </div>

        <Link
          to="/mentee/profile/edit"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
