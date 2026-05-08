import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deleteExpertise } from "../api/deleteExpertise";

export function useDeleteExpertise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpertise,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });

      toast.success(
        "Expertise removed"
      );
    },

    onError: () => {
      toast.error(
        "Failed to remove expertise"
      );
    },
  });
}