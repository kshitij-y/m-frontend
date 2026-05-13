
import {
  CalendarDays,
  Clock3,
  User2,
} from "lucide-react";

import { useUpcomingSessions } from "../hooks/useUpcomingSessions";

import SessionCard from "./SessionCard";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-200" />

          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-3 w-24 rounded bg-slate-100" />
          </div>
        </div>

        <div className="h-6 w-20 rounded-full bg-slate-200" />
      </div>

      <div className="mt-5 h-24 rounded-2xl bg-slate-100" />
    </div>
  );
}

export default function UpcomingSessionsWidget({
  userRole,
  onReschedule,
  onCancel,
  onComplete,
}) {
  const {
    data: sessions,
    isLoading,
    isError,
  } = useUpcomingSessions();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <CalendarDays className="h-6 w-6" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-900">
          Could not load sessions
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Something went wrong
          while loading upcoming
          mentorship sessions.
        </p>
      </div>
    );
  }

  if (
    !sessions ||
    sessions.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
          <Clock3 className="h-7 w-7" />
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-slate-900">
          No upcoming sessions
        </h3>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
          Upcoming mentorship
          meetings will appear here
          once sessions are
          scheduled.
        </p>
      </div>
    );
  }

  const sorted = [...sessions]
    .sort(
      (a, b) =>
        new Date(a.startTime) -
        new Date(b.startTime)
    )
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* SESSIONS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((session) => {
          const mentee =
            session?.mentorship
              ?.mentee;

          return (
            <div
              key={session.id}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* TOP */}
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-indigo-100 text-sm font-bold text-indigo-700">
                      {mentee?.avatar ? (
                        <img
                          src={
                            mentee.avatar
                          }
                          alt={
                            mentee.name
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        mentee?.name?.charAt(
                          0
                        ) || "M"
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <User2 className="h-4 w-4 text-slate-400" />

                        <p className="text-sm font-semibold text-slate-900">
                          {mentee?.name ||
                            "Mentee"}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Upcoming
                        mentorship
                        session
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Scheduled
                  </div>
                </div>
              </div>

              {/* CARD */}
              <div className="p-5">
                <SessionCard
                  session={session}
                  userRole={userRole}
                  onReschedule={
                    onReschedule
                      ? () =>
                        onReschedule(
                          session
                        )
                      : undefined
                  }
                  onCancel={
                    onCancel
                      ? () =>
                        onCancel(
                          session
                        )
                      : undefined
                  }
                  onComplete={
                    onComplete
                      ? () =>
                        onComplete(
                          session
                        )
                      : undefined
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}