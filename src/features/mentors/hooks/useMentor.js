import { useQuery } from "@tanstack/react-query";

import { getMentorById } from "../api/getMentorById";

import { queryKeys } from "../../../query/queryKeys";

export function useMentor(id) {
  return useQuery({
    queryKey: queryKeys.mentors.detail(id),

    queryFn: async () => {
      const response =
        await getMentorById(id);

      return response.data;
    },

    enabled: !!id,
  });
}