// src/features/mentors/hooks/useAddExpertise.js

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { addExpertiseApi } from "../api/expertise";

import { queryKeys } from "../../../query/queryKeys";

export const useAddExpertise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpertiseApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          queryKeys.mentors.expertise,
      });

      queryClient.invalidateQueries({
        queryKey:
          queryKeys.onboarding.status,
      });

      toast.success("Expertise added");
    },

    onError: () => {
      toast.error(
        "Failed to add expertise"
      );
    },
  });
};