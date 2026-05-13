import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";

import { useMyProfile } from "../../users/hooks/useMyProfile";
import { useMyMentorProfile } from "../../mentors/hooks/useMyMentorProfile";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

import { useUpcomingSessions } from "../../sessions/hooks/useUpcomingSessions";

import { useCancelSession } from "../../sessions/hooks/useCancelSession";

import { useCompleteSession } from "../../sessions/hooks/useCompleteSession";

import SectionHeader from "../../mentee/components/SectionHeader";

// import DashboardStatCard from "../components/DashboardStatCard";

import ActiveMenteeCard from "../components/ActiveMenteeCard";

import DashboardSkeleton from "../components/DashboardSkeleton";

import UpcomingSessionsWidget from "../../sessions/components/UpcomingSessionsWidget";

import RescheduleSessionModal from "../../sessions/components/RescheduleSessionModal";

export default function MentorDashboardPage() {
  const [
    selectedSession,
    setSelectedSession,
  ] = useState(null);

  const [
    rescheduleOpen,
    setRescheduleOpen,
  ] = useState(false);

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

  const {
    data: sessions,
  } = useUpcomingSessions();

  const cancelMutation =
    useCancelSession();

  const completeMutation =
    useCompleteSession();

  const handleCancel = (
    session
  ) => {
    cancelMutation.mutate({
      sessionId: session.id,

      mentorshipId:
        session.mentorshipId,
    });
  };

  const handleComplete = (
    session
  ) => {
    completeMutation.mutate({
      sessionId: session.id,

      mentorshipId:
        session.mentorshipId,
    });
  };

  const handleReschedule = (
    session
  ) => {
    setSelectedSession(session);

    setRescheduleOpen(true);
  };

  const greeting = (() => {
    const hour =
      new Date().getHours();

    if (hour < 12)
      return "Good morning";

    if (hour < 18)
      return "Good afternoon";

    return "Good evening";
  })();

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  const activeMentorships =
    useMemo(() => {
      const items =
        mentorships || [];

      return items.filter(
        (item) =>
          item.status ===
          "ACTIVE"
      );
    }, [mentorships]);

  const completedMentorships =
    useMemo(() => {
      const items =
        mentorships || [];

      return items.filter(
        (item) =>
          item.status ===
          "COMPLETED"
      );
    }, [mentorships]);

  const activePlans =
    mentorProfile?.mentorPlans?.filter(
      (plan) => plan.isActive
    ).length || 0;

  if (
    userLoading ||
    profileLoading
  ) {
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
    <div className="space-y-10 pb-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50/60 p-8 shadow-sm">
        {/* BACKGROUND */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-slate-200/40 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 shadow-sm backdrop-blur">
              Mentor Workspace
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              {greeting},{" "}
              {user?.name ||
                "there"}
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Manage mentorship
              sessions, track mentee
              progress, organize
              meetings, and keep your
              mentorship workflow
              structured throughout
              the week.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {today}
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                {sessions?.length || 0}{" "}
                upcoming sessions
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid w-full max-w-sm grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Active Mentees
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {
                  activeMentorships.length
                }
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Active Plans
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {activePlans}
              </h3>
            </div>

            <div className="col-span-2 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Mentor
                    Availability
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {mentorProfile?.isAvailable
                      ? "Accepting new mentees"
                      : "Unavailable"}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    mentorProfile?.isAvailable
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {mentorProfile?.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      {/* <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Active mentees"
          value={
            mentorshipsLoading
              ? "-"
              : activeMentorships.length
          }
        />

        <DashboardStatCard
          label="Upcoming sessions"
          value={
            sessions?.length || 0
          }
        />

        <DashboardStatCard
          label="Active plans"
          value={
            profileLoading
              ? "-"
              : activePlans
          }
        />

        <DashboardStatCard
          label="Completed mentorships"
          value={
            mentorshipsLoading
              ? "-"
              : completedMentorships.length
          }
        />
      </section> */}

      {/* UPCOMING SESSIONS */}
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Upcoming sessions"
          description="Your next scheduled mentorship sessions."
        />

        <div className="mt-6">
          <UpcomingSessionsWidget
            userRole="MENTOR"
            onReschedule={
              handleReschedule
            }
            onCancel={
              handleCancel
            }
            onComplete={
              handleComplete
            }
          />
        </div>
      </section>

      {/* ACTIVE MENTEES */}
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Active mentees"
          description="Current mentorship relationships in progress."
        />

        <div className="mt-6">
          {mentorshipsLoading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({
                length: 3,
              }).map(
                (_, index) => (
                  <Skeleton
                    key={`mentor-mentee-skeleton-${index}`}
                    className="h-56 w-full rounded-3xl"
                  />
                )
              )}
            </div>
          ) : mentorshipsError ? (
            <EmptyState
              title="Unable to load mentees"
              description="Please try again later."
            />
          ) : activeMentorships.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeMentorships.map(
                (
                  mentorship
                ) => (
                  <ActiveMenteeCard
                    key={
                      mentorship.id
                    }
                    mentorship={
                      mentorship
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              title="No active mentees"
              description="Active mentorships will appear here."
            />
          )}
        </div>
      </section>

      {/* AVAILABILITY */}
      {/* <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
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

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900">
                {mentorProfile?.isAvailable
                  ? "Accepting new mentees"
                  : "Not accepting new mentees"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Availability affects
                new bookings only.
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                mentorProfile?.isAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {mentorProfile?.isAvailable
                ? "Available"
                : "Unavailable"}
            </span>
          </div>
        </div>
      </section> */}

      {/* RESCHEDULE MODAL */}
      <RescheduleSessionModal
        isOpen={rescheduleOpen}
        onClose={() => {
          setRescheduleOpen(false);

          setSelectedSession(
            null
          );
        }}
        session={selectedSession}
      />
    </div>
  );
}