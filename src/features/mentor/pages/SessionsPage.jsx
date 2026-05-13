import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import SessionStatsCard from "../components/SessionStatsCard";
import EmptySessionsState from "../components/EmptySessionsState";

import SessionCard from "../../sessions/components/SessionCard";
import ScheduleSessionModal from "../../sessions/components/ScheduleSessionModal";
import RescheduleSessionModal from "../../sessions/components/RescheduleSessionModal";

import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";
import { useUpcomingSessions } from "../../sessions/hooks/useUpcomingSessions";
import { useCancelSession } from "../../sessions/hooks/useCancelSession";
import { useCompleteSession } from "../../sessions/hooks/useCompleteSession";
import { useMentorMentees } from "../../mentors/hooks/useMentorMentees";
import { useSessionHistory } from "../../sessions/hooks/useSessionHistory";

import Skeleton from "../../../components/ui/Skeleton";

function isToday(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isTomorrow(dateString) {
  const date = new Date(dateString);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

function isThisWeek(dateString) {
  const date = new Date(dateString);

  const now = new Date();

  const startOfToday =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

  const endOfWeek =
    new Date(startOfToday);

  endOfWeek.setDate(
    startOfToday.getDate() + 7
  );

  return (
    date >= startOfToday &&
    date <= endOfWeek
  );
}




export default function MentorSessionsPage() {
  const [selectedSession, setSelectedSession] =
    useState(null);

  const [scheduleOpen, setScheduleOpen] =
    useState(false);

  const [rescheduleOpen, setRescheduleOpen] =
    useState(false);

  const {
    data,
    isLoading: mentorshipsLoading,
    isError: mentorshipsError,
  } = useMyMentorships();

  const {
    data: upcomingSessionsData,
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useUpcomingSessions();

  const {
    data: mentorMentees = [],
  } = useMentorMentees();

  const mentorships =
    data?.mentorships || [];

  const upcomingSessions = useMemo(() => {
    if (!upcomingSessionsData)
      return [];

    return [...upcomingSessionsData].sort(
      (a, b) =>
        new Date(a.startTime) -
        new Date(b.startTime)
    );
  }, [upcomingSessionsData]);

  const todaySessions = useMemo(() => {
    return upcomingSessions.filter(
      (session) =>
        isToday(session.startTime)
    );
  }, [upcomingSessions]);

  const tomorrowSessions = useMemo(() => {
    return upcomingSessions.filter(
      (session) =>
        isTomorrow(session.startTime)
    );
  }, [upcomingSessions]);

  const thisWeekSessions = useMemo(() => {
    return upcomingSessions.filter(
      (session) =>
        !isToday(session.startTime) &&
        !isTomorrow(
          session.startTime
        ) &&
        isThisWeek(session.startTime)
    );
  }, [upcomingSessions]);


  const {
    data: sessionHistory = [],
    isLoading: historyLoading,
    isError: historyError,
  } = useSessionHistory();

  const completedSessions =
    sessionHistory.filter(
      (session) =>
        session.status === "COMPLETED"
    );

  const cancelledSessions =
    sessionHistory.filter(
      (session) =>
        session.status === "CANCELLED"
    );

  const missedSessions =
    sessionHistory.filter(
      (session) =>
        session.status === "MISSED"
    );

  const totalHours = useMemo(() => {
    return upcomingSessions.reduce(
      (acc, session) => {
        const start = new Date(
          session.startTime
        );

        const end = new Date(
          session.endTime
        );

        const hours =
          (end.getTime() -
            start.getTime()) /
          (1000 * 60 * 60);

        return acc + hours;
      },
      0
    );
  }, [upcomingSessions]);

  const cancelMutation =
    useCancelSession();

  const completeMutation =
    useCompleteSession();

  const handleReschedule = (
    session
  ) => {
    setSelectedSession(session);
    setRescheduleOpen(true);
  };

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

  const isLoading =
    mentorshipsLoading ||
    sessionsLoading ||
    historyLoading;

  const isError =
    mentorshipsError ||
    sessionsError ||
    historyError;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-32 rounded-3xl"
            />
          ))}
        </div>

        <Skeleton className="h-96 rounded-3xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptySessionsState
        title="Failed to load sessions"
        description="Please try again later."
      />
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* HERO */}
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Mentor Workspace
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Manage your mentorship
              sessions
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Track upcoming
              mentorship meetings,
              reschedule sessions,
              manage mentoring
              activity, and stay
              organized throughout
              the week.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setScheduleOpen(true)
            }
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Schedule Session
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SessionStatsCard
          label="Upcoming Sessions"
          value={
            upcomingSessions.length
          }
          helper="Scheduled mentorship meetings"
          icon={CalendarDays}
        />

        <SessionStatsCard
          label="Sessions Today"
          value={todaySessions.length}
          helper="Meetings happening today"
          icon={Clock3}
        />

        <SessionStatsCard
          label="Mentorship Hours"
          value={`${Math.round(
            totalHours
          )}h`}
          helper="Upcoming booked session time"
          icon={CheckCircle2}
        />

        <SessionStatsCard
          label="Active Mentees"
          value={mentorMentees.length}
          helper="Currently active mentees"
          icon={Users}
        />
      </section>

      {/* TODAY */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Today
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled
            sessions for today.
          </p>
        </div>

        {todaySessions.length >
          0 ? (
          <div className="grid gap-5">
            {todaySessions.map(
              (session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  userRole="MENTOR"
                  onReschedule={() =>
                    handleReschedule(
                      session
                    )
                  }
                  onCancel={() =>
                    handleCancel(session)
                  }
                  onComplete={() =>
                    handleComplete(
                      session
                    )
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No sessions today"
            description="Your upcoming sessions for today will appear here."
          />
        )}
      </section>

      {/* TOMORROW */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Tomorrow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sessions planned for
            tomorrow.
          </p>
        </div>

        {tomorrowSessions.length >
          0 ? (
          <div className="grid gap-5">
            {tomorrowSessions.map(
              (session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  userRole="MENTOR"
                  onReschedule={() =>
                    handleReschedule(
                      session
                    )
                  }
                  onCancel={() =>
                    handleCancel(session)
                  }
                  onComplete={() =>
                    handleComplete(
                      session
                    )
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No sessions tomorrow"
            description="Upcoming mentorship meetings for tomorrow will appear here."
          />
        )}
      </section>

      {/* THIS WEEK */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            This Week
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upcoming mentorship
            activity this week.
          </p>
        </div>

        {thisWeekSessions.length >
          0 ? (
          <div className="grid gap-5">
            {thisWeekSessions.map(
              (session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  userRole="MENTOR"
                  onReschedule={() =>
                    handleReschedule(
                      session
                    )
                  }
                  onCancel={() =>
                    handleCancel(session)
                  }
                  onComplete={() =>
                    handleComplete(
                      session
                    )
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No sessions this week"
            description="Your remaining weekly schedule will appear here."
          />
        )}
      </section>

      {/* COMPLETED */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Completed Sessions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sessions that were
            completed successfully.
          </p>
        </div>

        {completedSessions.length >
          0 ? (
          <div className="grid gap-5">
            {completedSessions.map(
              (session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  userRole="MENTOR"
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No completed sessions"
            description="Completed mentorship sessions will appear here."
          />
        )}
      </section>

      <ScheduleSessionModal
        isOpen={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);
        }}
        mentorships={mentorMentees}
      />

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