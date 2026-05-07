import { useQuery } from "@tanstack/react-query";

import { getMentors } from "../api/getMentors";

import { queryKeys } from "../../../query/queryKeys";

export function useMentors() {
  return useQuery({
    queryKey: queryKeys.mentors.all,

    queryFn: async () => {
      const response = await getMentors();

      return response.data;
    },
  });
}