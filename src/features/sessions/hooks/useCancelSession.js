import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { cancelSession } from "../api/cancelSession";

import { queryKeys } from "../../../query/queryKeys";

export function useCancelSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }) => cancelSession(sessionId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sessions.upcoming,
      });

      if (variables.mentorshipId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sessions.byMentorship(variables.mentorshipId),
        });
      }

      toast.success("Session cancelled successfully");
    },

    onError: () => {
      toast.error("Failed to cancel session");
    },
  });
}
