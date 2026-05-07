import { useQuery } from "@tanstack/react-query";

import { getMentorPlans } from "../api/getMentorPlans";

import { queryKeys } from "../../../query/queryKeys";

export function useMentorPlans(id) {
  return useQuery({
    queryKey: queryKeys.mentors.plans(id),

    queryFn: async () => {
      const response =
        await getMentorPlans(id);

      return response.data;
    },

    enabled: !!id,
  });
}