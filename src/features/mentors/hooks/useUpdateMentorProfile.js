import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateMentorProfile } from "../api/updateMentorProfile";

export function useUpdateMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMentorProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
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