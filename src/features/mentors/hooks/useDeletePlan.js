// src/features/mentors/hooks/useDeletePlan.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deletePlanApi } from "../api/plans";

import { queryKeys } from "../../../query/queryKeys";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlanApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.mentors.myPlans,
      });

      // queryClient.invalidateQueries({
      //   queryKey:
      //     queryKeys.onboarding.status,
      // });

      toast.success("Plan deleted");
    },

    onError: () => {
      toast.error(
        "Failed to delete plan"
      );
    },
  });
};