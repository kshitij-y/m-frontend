// src/features/mentors/hooks/useUpdatePlan.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updatePlanApi } from "../api/plans";

import { queryKeys } from "../../../query/queryKeys";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlanApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.mentors.myPlans,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.onboarding.status,
      });

      toast.success("Plan updated");
    },

    onError: () => {
      toast.error(
        "Failed to update plan"
      );
    },
  });
};