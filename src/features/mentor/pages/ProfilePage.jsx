import { useMemo } from "react";

import EmptyState from "../../../components/ui/EmptyState";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useMyMentorProfile } from "../../mentors/hooks/useMyMentorProfile";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";
import { useCalendarStatus } from "../../calendar/hooks/useCalendarStatus";

import ProfileStatsCard from "../../mentee/components/ProfileStatsCard";

import MentorProfileHeader from "../components/MentorProfileHeader";
import MentorProfileSection from "../components/MentorProfileSection";
import MentorPlanCard from "../components/MentorPlanCard";
import MentorProfileSkeleton from "../components/MentorProfileSkeleton";

export default function MentorProfilePage() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useMyProfile();

  const {
    data: mentorProfile,
    isLoading: profileLoading,
    isError: profileError,
  } = useMyMentorProfile();

  const {
    data: mentorships,
    isLoading: mentorshipsLoading,
  } = useMyMentorships();

  const { data: calendarStatus } = useCalendarStatus({
    enabled: user?.role === "MENTOR",
  });

  const handleConnectCalendar = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    window.location.href = `${baseUrl}/calendar/google/connect`;
  };

  const stats = useMemo(() => {
    const items = mentorships || [];
    const active = items.filter((item) => item.status === "ACTIVE").length;
    const completed = items.filter(
      (item) => item.status === "COMPLETED"
    ).length;
    const activePlans =
      mentorProfile?.mentorPlans?.filter((plan) => plan.isActive).length || 0;

    return {
      active,
      completed,
      activePlans,
    };
  }, [mentorships, mentorProfile]);

  if (userLoading || profileLoading) {
    return <MentorProfileSkeleton />;
  }

  if (userError || !user) {
    return (
      <EmptyState
        title="Unable to load profile"
        description="Please try again later."
      />
    );
  }

  const expertise = mentorProfile?.expertise || [];
  const plans = mentorProfile?.mentorPlans || [];

  return (
    <div className="space-y-6">
      <MentorProfileHeader user={user} profile={mentorProfile} />

      <MentorProfileSection
        title="About"
        description="What mentees will see when viewing your profile."
      >
        <p className="text-sm leading-7 text-slate-600">
          {mentorProfile?.about ||
            "Share a detailed description of your mentorship approach and background."}
        </p>
      </MentorProfileSection>

      <MentorProfileSection
        title="Expertise"
        description="Your listed mentoring domains."
      >
        {expertise.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {expertise.map((item) => (
              <span
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {item.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
            Add expertise to help mentees understand your strengths.
          </div>
        )}
      </MentorProfileSection>

      <MentorProfileSection
        title="Mentorship plans"
        description="Your active and draft mentorship offerings."
      >
        {plans.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <MentorPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
            No mentorship plans created yet.
          </div>
        )}
      </MentorProfileSection>

      <section className="grid gap-4 md:grid-cols-3">
        <ProfileStatsCard
          label="Active mentees"
          value={mentorshipsLoading ? "-" : stats.active}
        />
        <ProfileStatsCard
          label="Completed mentorships"
          value={mentorshipsLoading ? "-" : stats.completed}
        />
        <ProfileStatsCard
          label="Active plans"
          value={profileError ? "-" : stats.activePlans}
        />
      </section>

      <MentorProfileSection
        title="Google Calendar"
        description="Manage your calendar connection for scheduling."
      >
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Google Calendar
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {calendarStatus?.connected ? "Connected" : "Not connected"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleConnectCalendar}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            {calendarStatus?.connected
              ? "Manage connection"
              : "Connect calendar"}
          </button>
        </div>
      </MentorProfileSection>

      <MentorProfileSection title="Security">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Change Password
        </button>
      </MentorProfileSection>
    </div>
  );
}
