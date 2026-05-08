import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateMentorshipStatus } from "../api/updateMentorshipStatus";

import { queryKeys } from "../../../query/queryKeys";

export function useUpdateMentorshipStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      updateMentorshipStatus(id, {
        status,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorships.my,
      });

      toast.success(
        "Mentorship status updated"
      );
    },

    onError: () => {
      toast.error(
        "Failed to update status"
      );
    },
  });
}