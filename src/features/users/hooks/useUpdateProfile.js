import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateMyProfile } from "../api/updateMyProfile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-profile"],
      });

      toast.success("Profile updated");
    },

    onError: () => {
      toast.error("Failed to update profile");
    },
  });
}