// src/features/mentors/hooks/useMyPlans.js

import { useQuery } from "@tanstack/react-query";

import { getMyPlansApi } from "../api/plans";

import { queryKeys } from "../../../query/queryKeys";

export const useMyPlans = () => {
  return useQuery({
    queryKey: queryKeys.mentors.myPlans,

    queryFn: async () => {
      const response =
        await getMyPlansApi();

      return response.data || [];
    },
  });
};