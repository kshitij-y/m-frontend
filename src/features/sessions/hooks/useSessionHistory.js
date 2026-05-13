// hooks/useSessionHistory.js

import { useQuery } from "@tanstack/react-query";

import { getSessionHistory } from "../api/getSessionHistory";

import { queryKeys } from "../../../query/queryKeys";

export function useSessionHistory() {
  return useQuery({
    queryKey:
      queryKeys.sessions.history,

    queryFn: async () => {
      const response =
        await getSessionHistory();

      return response.data || [];
    },
  });
}