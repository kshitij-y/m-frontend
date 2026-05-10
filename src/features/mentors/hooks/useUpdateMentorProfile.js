import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateMentorProfile } from "../api/updateMentorProfile";
import { queryKeys } from "../../../query/queryKeys";

export function useUpdateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMentorProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.onboarding.status,
      });

      toast.success(
        "Mentor profile updated"
      );
    },

    onError: () => {
      toast.error(
        "Failed to update mentor profile"
      );
    },
  });
}