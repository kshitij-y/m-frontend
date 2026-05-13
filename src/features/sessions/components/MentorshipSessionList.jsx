import { useState } from "react";

import { useMentorshipSessions } from "../hooks/useMentorshipSessions";
import { useCancelSession } from "../hooks/useCancelSession";
import { useCompleteSession } from "../hooks/useCompleteSession";

import SessionCard from "./SessionCard";
import ScheduleSessionModal from "./ScheduleSessionModal";
import RescheduleSessionModal from "./RescheduleSessionModal";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-3 w-24 rounded bg-slate-100" />
        </div>
        <div className="h-6 w-20 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function MentorshipSessionList({ mentorshipId, mentorshipStatus, userRole }) {
  const { data: sessions, isLoading, isError } = useMentorshipSessions(mentorshipId);

  const cancelMutation = useCancelSession();
  const completeMutation = useCompleteSession();

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [rescheduleSession, setRescheduleSession] = useState(null);

  const isMentor = userRole === "MENTOR";
  const isActive = mentorshipStatus === "ACTIVE";

  const handleReschedule = (session) => {
    setRescheduleSession(session);
  };

  const handleCancel = (session) => {
    cancelMutation.mutate({
      sessionId: session.id,
      mentorshipId,
    });
  };

  const handleComplete = (session) => {
    completeMutation.mutate({
      sessionId: session.id,
      mentorshipId,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-700">
          Could not load sessions
        </p>
        <p className="mt-1 text-xs text-red-500">
          Please try again later.
        </p>
      </div>
    );
  }

  const sorted = sessions
    ? [...sessions].sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    : [];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Sessions</h3>

        {isMentor && isActive && (
          <button
            type="button"
            onClick={() => setScheduleOpen(true)}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
          >
            Schedule Session
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-500">
            No sessions have been scheduled yet.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          {sorted.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              userRole={userRole}
              onReschedule={() => handleReschedule(session)}
              onCancel={() => handleCancel(session)}
              onComplete={() => handleComplete(session)}
            />
          ))}
        </div>
      )}

      <ScheduleSessionModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        mentorshipId={mentorshipId}
      />

      <RescheduleSessionModal
        isOpen={!!rescheduleSession}
        onClose={() => setRescheduleSession(null)}
        session={rescheduleSession}
      />
    </div>
  );
}
