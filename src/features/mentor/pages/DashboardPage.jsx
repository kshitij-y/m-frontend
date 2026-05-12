import { useMemo } from "react";
import { Link } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useMyMentorProfile } from "../../mentors/hooks/useMyMentorProfile";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

import SectionHeader from "../../mentee/components/SectionHeader";

import DashboardStatCard from "../components/DashboardStatCard";
import MentorSessionCard from "../components/MentorSessionCard";
import ActiveMenteeCard from "../components/ActiveMenteeCard";
import DashboardSkeleton from "../components/DashboardSkeleton";

export default function MentorDashboardPage() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useMyProfile();

  const {
    data: mentorProfile,
    isLoading: profileLoading,
  } = useMyMentorProfile();

  const {
    data: mentorships,
    isLoading: mentorshipsLoading,
    isError: mentorshipsError,
  } = useMyMentorships();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const activeMentorships = useMemo(() => {
    const items = mentorships || [];
    return items.filter((item) => item.status === "ACTIVE");
  }, [mentorships]);

  const completedMentorships = useMemo(() => {
    const items = mentorships || [];
    return items.filter((item) => item.status === "COMPLETED");
  }, [mentorships]);

  const upcomingSessions = useMemo(() => {
    const now = new Date();
    return (mentorships || []).filter((item) => {
      if (!item.startDate) {
        return false;
      }
      const date = new Date(item.startDate);
      return date > now;
    });
  }, [mentorships]);

  const activePlans =
    mentorProfile?.mentorPlans?.filter((plan) => plan.isActive)
      .length || 0;

  if (userLoading || profileLoading) {
    return <DashboardSkeleton />;
  }

  if (userError || !user) {
    return (
      <EmptyState
        title="Unable to load dashboard"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            {greeting}, {user?.name || "there"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage mentorship sessions, mentees, and mentorship activity.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
          {today}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Active mentees"
          value={mentorshipsLoading ? "-" : activeMentorships.length}
        />
        <DashboardStatCard
          label="Upcoming sessions"
          value={mentorshipsLoading ? "-" : upcomingSessions.length}
        />
        <DashboardStatCard
          label="Active plans"
          value={profileLoading ? "-" : activePlans}
        />
        <DashboardStatCard
          label="Completed mentorships"
          value={mentorshipsLoading ? "-" : completedMentorships.length}
        />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Upcoming sessions"
          description="Your next scheduled mentorship sessions."
        />
        {mentorshipsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`mentor-session-skeleton-${index}`}
                className="h-52 w-full"
              />
            ))}
          </div>
        ) : mentorshipsError ? (
          <EmptyState
            title="Unable to load sessions"
            description="Please try again later."
          />
        ) : upcomingSessions.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingSessions.map((mentorship) => (
              <MentorSessionCard
                key={mentorship.id}
                mentorship={mentorship}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming sessions"
            description="Sessions will appear once you schedule them."
          />
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Active mentees"
          description="Current mentorship relationships in progress."
        />
        {mentorshipsLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={`mentor-mentee-skeleton-${index}`}
                className="h-52 w-full"
              />
            ))}
          </div>
        ) : mentorshipsError ? (
          <EmptyState
            title="Unable to load mentees"
            description="Please try again later."
          />
        ) : activeMentorships.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeMentorships.map((mentorship) => (
              <ActiveMenteeCard
                key={mentorship.id}
                mentorship={mentorship}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active mentees"
            description="Active mentorships will appear here."
          />
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Availability"
          description="Manage whether you are open to new mentees."
          action={
            <Link
              to="/mentor/profile/edit"
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              Edit Profile
            </Link>
          }
        />
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {mentorProfile?.isAvailable
                  ? "Accepting new mentees"
                  : "Not accepting new mentees"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Availability affects new bookings only.
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                mentorProfile?.isAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {mentorProfile?.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Recent chat"
          description="Your latest mentorship conversations."
        />
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6 text-sm text-slate-500">
          No recent conversations yet.
        </div>
      </section>
    </div>
  );
}
