import { useQuery } from "@tanstack/react-query";

import { getMentorshipSessions } from "../api/getMentorshipSessions";

import { queryKeys } from "../../../query/queryKeys";

export function useMentorshipSessions(mentorshipId) {
  return useQuery({
    queryKey: queryKeys.sessions.byMentorship(mentorshipId),

    queryFn: async () => {
      const response = await getMentorshipSessions(mentorshipId);

      return response.data;
    },

    enabled: !!mentorshipId,
  });
}
