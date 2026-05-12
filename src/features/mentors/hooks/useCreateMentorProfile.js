import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createMentorProfile } from "../api/createMentorProfile";
import { queryKeys } from "../../../query/queryKeys";

export function useCreateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.onboarding.status,
      });

      toast.success("Mentor profile created");
    },

    onError: () => {
      toast.error("Failed to create mentor profile");
    },
  });
}
