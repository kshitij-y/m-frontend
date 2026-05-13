import { useQuery } from "@tanstack/react-query";

import { getUpcomingSessions } from "../api/getUpcomingSessions";

import { queryKeys } from "../../../query/queryKeys";

export function useUpcomingSessions() {
  return useQuery({
    queryKey: queryKeys.sessions.upcoming,

    queryFn: async () => {
      const response = await getUpcomingSessions();

      return response.data;
    },
  });
}
