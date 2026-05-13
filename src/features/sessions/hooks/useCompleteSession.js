import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { completeSession } from "../api/completeSession";

import { queryKeys } from "../../../query/queryKeys";

export function useCompleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }) => completeSession(sessionId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sessions.upcoming,
      });

      if (variables.mentorshipId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sessions.byMentorship(variables.mentorshipId),
        });
      }

      toast.success("Session completed successfully");
    },

    onError: () => {
      toast.error("Failed to complete session");
    },
  });
}
