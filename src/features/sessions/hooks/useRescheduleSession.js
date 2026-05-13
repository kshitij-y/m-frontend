import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { rescheduleSession } from "../api/rescheduleSession";

import { queryKeys } from "../../../query/queryKeys";

export function useRescheduleSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, startTime, endTime }) =>
      rescheduleSession(sessionId, { startTime, endTime }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sessions.upcoming,
      });

      if (variables.mentorshipId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sessions.byMentorship(variables.mentorshipId),
        });
      }

      toast.success("Session rescheduled successfully");
    },

    onError: () => {
      toast.error("Failed to reschedule session");
    },
  });
}
