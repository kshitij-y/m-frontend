import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { scheduleMentorship } from "../api/scheduleMentorship";

import { queryKeys } from "../../../query/queryKeys";

export function useScheduleMentorship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => scheduleMentorship(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorships.my,
      });

      toast.success("Session scheduled");
    },

    onError: () => {
      toast.error("Failed to schedule session");
    },
  });
}
