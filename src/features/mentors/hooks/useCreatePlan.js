import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createPlan } from "../api/createPlan";

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-plans"],
      });

      toast.success("Plan created");
    },

    onError: () => {
      toast.error(
        "Failed to create plan"
      );
    },
  });
}