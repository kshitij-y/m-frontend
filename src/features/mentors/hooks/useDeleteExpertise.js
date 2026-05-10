// src/features/mentors/hooks/useDeleteExpertise.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deleteExpertiseApi } from "../api/expertise";

import { queryKeys } from "../../../query/queryKeys";

export const useDeleteExpertise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpertiseApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.mentors.expertise,
      });

      // queryClient.invalidateQueries({
      //   queryKey:
      //     queryKeys.onboarding.status,
      // });

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
};