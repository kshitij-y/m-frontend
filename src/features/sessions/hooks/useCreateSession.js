import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createSession } from "../api/createSession";

import { queryKeys } from "../../../query/queryKeys";

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mentorshipId, startTime, endTime }) =>
      createSession({ mentorshipId, startTime, endTime }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sessions.upcoming,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.sessions.byMentorship(variables.mentorshipId),
      });

      toast.success("Session scheduled successfully");
    },

    onError: () => {
      toast.error("Failed to schedule session");
    },
  });
}
