import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deletePlan } from "../api/deletePlan";

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor-plans"],
      });

      toast.success("Plan deleted");
    },

    onError: () => {
      toast.error(
        "Failed to delete plan"
      );
    },
  });
}