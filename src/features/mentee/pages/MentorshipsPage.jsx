import { useMemo } from "react";

import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

import SectionHeader from "../components/SectionHeader";
import MentorshipOverviewCard from "../components/MentorshipOverviewCard";
import MentorshipItemCard from "../components/MentorshipItemCard";
import MentorshipSessionCard from "../components/MentorshipSessionCard";
import MentorshipSkeleton from "../components/MentorshipSkeleton";
import EmptyMentorshipState from "../components/EmptyMentorshipState";
import EmptyState from "../../../components/ui/EmptyState";

export default function MyMentorshipsPage() {
  const {
    data: mentorships,
    isLoading,
    isError,
  } = useMyMentorships();

  const { activeMentorships, pendingMentorships, completedMentorships } =
    useMemo(() => {
      const items = mentorships || [];
      return {
        activeMentorships: items.filter(
          (item) => item.status === "ACTIVE"
        ),
        pendingMentorships: items.filter(
          (item) => item.status === "PENDING"
        ),
        completedMentorships: items.filter(
          (item) => item.status === "COMPLETED"
        ),
      };
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

  const totalMentorships = (mentorships || []).length;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold text-slate-900">
          My Mentorships
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your mentorship relationships, sessions, and mentor activity.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <MentorshipSkeleton key={`overview-${index}`} />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          title="Unable to load mentorships"
          description="Please try again in a moment."
        />
      ) : totalMentorships === 0 ? (
        <EmptyMentorshipState />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <MentorshipOverviewCard
              title="Active"
              count={activeMentorships.length}
              subtitle="Currently in progress"
            />
            <MentorshipOverviewCard
              title="Pending"
              count={pendingMentorships.length}
              subtitle="Awaiting confirmation"
            />
            <MentorshipOverviewCard
              title="Completed"
              count={completedMentorships.length}
              subtitle="Finished mentorships"
            />
          </section>

          <section className="space-y-4">
            <SectionHeader
              title="Active mentorships"
              description="Stay on top of your ongoing mentorships."
            />
            {activeMentorships.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {activeMentorships.map((mentorship) => (
                  <MentorshipItemCard
                    key={mentorship.id}
                    mentorship={mentorship}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No active mentorships"
                description="Once a mentorship starts, it will appear here."
              />
            )}
          </section>

          <section className="space-y-4">
            <SectionHeader
              title="Pending mentorships"
              description="Mentorships that are awaiting confirmation."
            />
            {pendingMentorships.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {pendingMentorships.map((mentorship) => (
                  <MentorshipItemCard
                    key={mentorship.id}
                    mentorship={mentorship}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No pending mentorships"
                description="You have no pending mentorship requests."
              />
            )}
          </section>

          <section className="space-y-4">
            <SectionHeader
              title="Completed mentorships"
              description="Your finished mentorship relationships."
            />
            {completedMentorships.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {completedMentorships.map((mentorship) => (
                  <MentorshipItemCard
                    key={mentorship.id}
                    mentorship={mentorship}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No completed mentorships"
                description="Complete a mentorship to see it archived here."
              />
            )}
          </section>

          <section className="space-y-4">
            <SectionHeader
              title="Upcoming sessions"
              description="Your next scheduled mentorship sessions."
            />
            {upcomingSessions.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {upcomingSessions.map((mentorship) => (
                  <MentorshipSessionCard
                    key={mentorship.id}
                    mentorship={mentorship}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming sessions"
                description="Upcoming sessions will show here when scheduled."
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
