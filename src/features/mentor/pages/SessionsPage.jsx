import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
} from "lucide-react";

import SessionStatsCard from "../components/SessionStatsCard";
import MentorshipRequestCard from "../components/MentorshipRequestCard";
import SessionCard from "../components/SessionCard";
import EmptySessionsState from "../components/EmptySessionsState";

import ScheduleSessionModal from "../components/ScheduleSessionModal";
import RescheduleSessionModal from "../components/RescheduleSessionModal";
import RejectRequestModal from "../components/RejectRequestModal";

import { useMyMentorships } from "../../mentorships/hooks/useMyMentorships";
import { useScheduleMentorship } from "../../mentorships/hooks/useScheduleMentorship";
import { useUpdateMentorshipStatus } from "../../mentorships/hooks/useUpdateMentorshipStatus";

import Skeleton from "../../../components/ui/Skeleton";

export default function MentorSessionsPage() {
  const [selectedMentorship, setSelectedMentorship] =
    useState(null);

  const [scheduleOpen, setScheduleOpen] =
    useState(false);

  const [rescheduleOpen, setRescheduleOpen] =
    useState(false);

  const [rejectOpen, setRejectOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useMyMentorships();

  const mentorships =
    data?.mentorships || [];

  const scheduleMutation =
    useScheduleMentorship();

  const statusMutation =
    useUpdateMentorshipStatus();

  // --------------------------------------------------
  // FILTERS
  // --------------------------------------------------

  const pendingRequests = useMemo(() => {
    return mentorships.filter(
      (item) => item.status === "PENDING"
    );
  }, [mentorships]);

  const upcomingSessions = useMemo(() => {
    return mentorships.filter((item) => {
      if (
        item.status !== "ACTIVE" ||
        !item.startDate
      ) {
        return false;
      }

      return (
        new Date(item.startDate) >
        new Date()
      );
    });
  }, [mentorships]);

  const completedSessions = useMemo(() => {
    return mentorships.filter((item) => {
      if (
        item.status !== "ACTIVE" ||
        !item.endDate
      ) {
        return false;
      }

      return (
        new Date(item.endDate) <
        new Date()
      );
    });
  }, [mentorships]);

  // --------------------------------------------------
  // ACTIONS
  // --------------------------------------------------

  const handleApprove = (
    mentorship
  ) => {
    setSelectedMentorship(
      mentorship
    );

    setScheduleOpen(true);
  };

  const handleReject = (
    mentorship
  ) => {
    setSelectedMentorship(
      mentorship
    );

    setRejectOpen(true);
  };

  const confirmReject =
    async () => {
      if (!selectedMentorship)
        return;

      try {
        await statusMutation.mutateAsync({
          id: selectedMentorship.id,
          status: "REJECTED",
        });

        toast.success(
          "Mentorship request rejected"
        );

        setRejectOpen(false);

        setSelectedMentorship(
          null
        );
      } catch (error) {
        toast.error(
          "Failed to reject request"
        );
      }
    };

  const handleSchedule =
    async (payload) => {
      if (!selectedMentorship)
        return;

      try {
        await scheduleMutation.mutateAsync(
          {
            id: selectedMentorship.id,
            payload,
          }
        );

        toast.success(
          "Session scheduled successfully"
        );

        setScheduleOpen(false);

        setSelectedMentorship(
          null
        );
      } catch (error) {
        toast.error(
          "Failed to schedule session"
        );
      }
    };

  const handleReschedule =
    (mentorship) => {
      setSelectedMentorship(
        mentorship
      );

      setRescheduleOpen(true);
    };

  const confirmReschedule =
    async (payload) => {
      if (!selectedMentorship)
        return;

      try {
        await scheduleMutation.mutateAsync(
          {
            id: selectedMentorship.id,
            payload,
          }
        );

        toast.success(
          "Session rescheduled"
        );

        setRescheduleOpen(false);

        setSelectedMentorship(
          null
        );
      } catch (error) {
        toast.error(
          "Failed to reschedule"
        );
      }
    };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

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

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (isError) {
    return (
      <EmptySessionsState
        title="Failed to load sessions"
        description="Please try again later."
      />
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Mentorship Sessions
        </h1>

        <p className="mt-2 text-slate-500">
          Manage mentorship
          requests, schedule
          meetings, and track
          mentorship activity.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-4">
        <SessionStatsCard
          title="Pending Requests"
          value={
            pendingRequests.length
          }
          icon={Clock3}
        />

        <SessionStatsCard
          title="Upcoming Sessions"
          value={
            upcomingSessions.length
          }
          icon={CalendarDays}
        />

        <SessionStatsCard
          title="Completed Sessions"
          value={
            completedSessions.length
          }
          icon={CheckCircle2}
        />

        <SessionStatsCard
          title="Active Mentees"
          value={
            mentorships.filter(
              (item) =>
                item.status ===
                "ACTIVE"
            ).length
          }
          icon={Users}
        />
      </div>

      {/* PENDING REQUESTS */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Pending Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Approve or reject
            mentorship requests.
          </p>
        </div>

        {pendingRequests.length >
        0 ? (
          <div className="grid gap-5">
            {pendingRequests.map(
              (mentorship) => (
                <MentorshipRequestCard
                  key={
                    mentorship.id
                  }
                  mentorship={
                    mentorship
                  }
                  onApprove={() =>
                    handleApprove(
                      mentorship
                    )
                  }
                  onReject={() =>
                    handleReject(
                      mentorship
                    )
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No pending requests"
            description="New mentorship requests will appear here."
          />
        )}
      </section>

      {/* UPCOMING SESSIONS */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Upcoming Sessions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled
            mentorship meetings.
          </p>
        </div>

        {upcomingSessions.length >
        0 ? (
          <div className="grid gap-5">
            {upcomingSessions.map(
              (mentorship) => (
                <SessionCard
                  key={
                    mentorship.id
                  }
                  mentorship={
                    mentorship
                  }
                  onReschedule={() =>
                    handleReschedule(
                      mentorship
                    )
                  }
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No upcoming sessions"
            description="Scheduled sessions will appear here."
          />
        )}
      </section>

      {/* COMPLETED */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Completed Sessions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Previously completed
            mentorship meetings.
          </p>
        </div>

        {completedSessions.length >
        0 ? (
          <div className="grid gap-5">
            {completedSessions.map(
              (mentorship) => (
                <SessionCard
                  key={
                    mentorship.id
                  }
                  mentorship={
                    mentorship
                  }
                  completed
                />
              )
            )}
          </div>
        ) : (
          <EmptySessionsState
            title="No completed sessions"
            description="Completed sessions will appear here."
          />
        )}
      </section>

      {/* MODALS */}

      <ScheduleSessionModal
        open={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);

          setSelectedMentorship(
            null
          );
        }}
        mentorship={
          selectedMentorship
        }
        onConfirm={
          handleSchedule
        }
        isLoading={
          scheduleMutation.isPending
        }
      />

      <RescheduleSessionModal
        open={rescheduleOpen}
        onClose={() => {
          setRescheduleOpen(false);

          setSelectedMentorship(
            null
          );
        }}
        mentorship={
          selectedMentorship
        }
        onConfirm={
          confirmReschedule
        }
        isLoading={
          scheduleMutation.isPending
        }
      />

      <RejectRequestModal
        open={rejectOpen}
        onClose={() => {
          setRejectOpen(false);

          setSelectedMentorship(
            null
          );
        }}
        onConfirm={confirmReject}
        isLoading={
          statusMutation.isPending
        }
      />
    </div>
  );
}