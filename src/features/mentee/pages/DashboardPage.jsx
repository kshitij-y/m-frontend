import { useMemo } from "react";
import { useSelector } from "react-redux";

import SectionHeader from "../components/SectionHeader";
import SessionCard from "../components/SessionCard";
import MentorshipCard from "../components/MentorshipCard";
import EmptyState from "../../../components/ui/EmptyState";
import Skeleton from "../../../components/ui/Skeleton";
import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";

export default function MenteeDashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const { data: mentorships, isLoading, isError } =
    useMyMentorships();


  const activeMentorships = useMemo(() => {
    if (!mentorships?.length) {
      return [];
    }

    return mentorships.filter((mentorship) =>
      ["ACTIVE", "PENDING"].includes(
        mentorship.status
      )
    );
  }, [mentorships]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  const userName = user?.name || "there";
  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Good evening, {userName}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track mentorships, sessions, and mentor activity from one place.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
          {today}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Upcoming sessions"
          description="Your next mentor sessions with quick access to join."
        />
        {isLoading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`session-skeleton-${index}`}
                className="h-52 w-full"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming sessions"
            description="Sessions will appear here once your mentor schedules them."
          />
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Active mentorships"
          description="Keep momentum on your most important mentorships."
        />
        {isLoading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={`mentorship-skeleton-${index}`}
                className="h-52 w-full"
              />
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            title="Unable to load mentorships"
            description="We could not fetch your mentorships. Please try again soon."
          />
        ) : activeMentorships.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {activeMentorships.map((mentorship) => (
              <MentorshipCard
                key={mentorship.id}
                mentorship={mentorship}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active mentorships"
            description="When you start a mentorship, it will show up here."
          />
        )}
      </section>

      
    </div>
  );
}
