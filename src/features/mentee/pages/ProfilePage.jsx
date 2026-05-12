import { useMemo } from "react";

import EmptyState from "../../../components/ui/EmptyState";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";
import { useCalendarStatus } from "../../calendar/hooks/useCalendarStatus";

import ProfileHeader from "../components/ProfileHeader";
import ProfileStatsCard from "../components/ProfileStatsCard";
import ProfileSection from "../components/ProfileSection";
import ProfileSkeleton from "../components/ProfileSkeleton";

export default function MenteeProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useMyProfile();

  const {
    data: mentorships,
    isLoading: mentorshipsLoading,
  } = useMyMentorships();

  const isMentor = profile?.role === "MENTOR";
  const { data: calendarStatus } = useCalendarStatus({
    enabled: isMentor,
  });

  const handleConnectCalendar = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    window.location.href =
      `${baseUrl}/calendar/google/connect`;
  };

  const stats = useMemo(() => {
    const items = mentorships || [];
    return {
      active: items.filter((item) => item.status === "ACTIVE").length,
      completed: items.filter((item) => item.status === "COMPLETED").length,
      sessions: 0,
    };
  }, [mentorships]);

  const latestMentorship = useMemo(() => {
    if (!mentorships?.length) {
      return null;
    }

    return [...mentorships]
      .sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )
      .at(0);
  }, [mentorships]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !profile) {
    return (
      <EmptyState
        title="Unable to load profile"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <ProfileSection
        title="About"
        description="Your mentorship preferences and focus areas."
      >
        <div className="space-y-4 text-sm text-slate-600">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Bio
            </p>
            <p className="mt-1">
              {profile.bio || "Add a short bio to personalize your profile."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Interests
            </p>
            <p className="mt-1">
              {profile.interests || "Share your interests to guide matching."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Goals
            </p>
            <p className="mt-1">
              {profile.goals || "Define goals to help mentors support you."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Learning focus
            </p>
            <p className="mt-1">
              {profile.learningFocus || "Highlight what you are focusing on."}
            </p>
          </div>
        </div>
      </ProfileSection>

      <section className="grid gap-4 md:grid-cols-3">
        <ProfileStatsCard
          label="Active mentorships"
          value={mentorshipsLoading ? "-" : stats.active}
        />
        <ProfileStatsCard
          label="Completed mentorships"
          value={mentorshipsLoading ? "-" : stats.completed}
        />
        <ProfileStatsCard
          label="Total sessions"
          value={mentorshipsLoading ? "-" : stats.sessions}
          helper="Sessions will appear once scheduling is enabled."
        />
      </section>

      <ProfileSection
        title="Connected services"
        description="Manage your connected tools and integrations."
      >
        {isMentor ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Google Calendar
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {calendarStatus?.connected
                  ? "Connected"
                  : "Not connected"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleConnectCalendar}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {calendarStatus?.connected
                ? "Connected"
                : "Connect Google Calendar"}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Calendar sync is managed by your mentor.
          </div>
        )}
      </ProfileSection>

      <ProfileSection
        title="Recent activity"
        description="A quick look at your latest mentorship activity."
      >
        {latestMentorship ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Latest mentorship started on {new Date(latestMentorship.createdAt).toLocaleDateString("en-US")}.
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            No mentorship activity yet.
          </div>
        )}
      </ProfileSection>

      <ProfileSection title="Security">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Change Password
        </button>
      </ProfileSection>
    </div>
  );
}
