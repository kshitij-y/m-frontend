import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { addExpertise } from "../api/addExpertise";

export function useAddExpertise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpertise,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });

      toast.success("Expertise added");
    },

    onError: () => {
      toast.error(
        "Failed to add expertise"
      );
    },
  });
}