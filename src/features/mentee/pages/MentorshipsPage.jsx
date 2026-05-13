import { useMemo } from "react";

import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

import { useUpcomingSessions } from "../../sessions/hooks/useUpcomingSessions";

import SectionHeader from "../components/SectionHeader";

import MentorshipOverviewCard from "../components/MentorshipOverviewCard";

import MentorshipItemCard from "../components/MentorshipItemCard";

import MentorshipSkeleton from "../components/MentorshipSkeleton";

import EmptyMentorshipState from "../components/EmptyMentorshipState";

import EmptyState from "../../../components/ui/EmptyState";

import UpcomingSessionsWidget from "../../sessions/components/UpcomingSessionsWidget";

export default function MyMentorshipsPage() {
  const {
    data: mentorships,
    isLoading,
    isError,
  } = useMyMentorships();

  const {
    data: upcomingSessions,
  } = useUpcomingSessions();

  const {
    activeMentorships,
    completedMentorships,
  } = useMemo(() => {
    const items =
      mentorships || [];

    return {
      activeMentorships:
        items.filter(
          (item) =>
            item.status ===
            "ACTIVE"
        ),

      completedMentorships:
        items.filter(
          (item) =>
            item.status ===
            "COMPLETED"
        ),
    };
  }, [mentorships]);

  const totalMentorships =
    (mentorships || []).length;

  const totalUpcoming =
    upcomingSessions?.length ||
    0;

  const totalSessionsAttended =
    completedMentorships.reduce(
      (acc, mentorship) => {
        return (
          acc +
          (mentorship
            ?.sessions?.filter(
              (session) =>
                session.status ===
                "COMPLETED"
            ).length || 0)
        );
      },
      0
    );

  return (
    <div className="space-y-8 pb-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 p-7 shadow-sm">
        {/* BG */}
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-slate-200/40 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 shadow-sm backdrop-blur">
              Mentorship Workspace
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
              My Mentorships
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Track active
              mentorships, upcoming
              mentor sessions, and
              your mentorship journey
              from one organized
              workspace.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Active
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {
                  activeMentorships.length
                }
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {
                  completedMentorships.length
                }
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Sessions Attended
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {
                  totalSessionsAttended
                }
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                Upcoming
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {totalUpcoming}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <MentorshipSkeleton
              key={`overview-${index}`}
            />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          title="Unable to load mentorships"
          description="Please try again in a moment."
        />
      ) : totalMentorships ===
        0 ? (
        <EmptyMentorshipState />
      ) : (
        <>
          {/* ACTIVE */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              title="Active mentorships"
              description="Stay on top of your ongoing mentorship relationships."
            />

            <div className="mt-6">
              {activeMentorships.length ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {activeMentorships.map(
                    (
                      mentorship
                    ) => (
                      <MentorshipItemCard
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
                  title="No active mentorships"
                  description="Once a mentorship starts, it will appear here."
                />
              )}
            </div>
          </section>

          {/* COMPLETED */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              title="Completed mentorships"
              description="Your completed mentorship journey and finished collaborations."
            />

            <div className="mt-6">
              {completedMentorships.length ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  {completedMentorships.map(
                    (
                      mentorship
                    ) => (
                      <MentorshipItemCard
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
                  title="No completed mentorships"
                  description="Finished mentorships will appear here."
                />
              )}
            </div>
          </section>

          {/* UPCOMING */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              title="Upcoming sessions"
              description="Your next scheduled mentorship sessions."
            />

            <div className="mt-6">
              <UpcomingSessionsWidget userRole="MENTEE" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}