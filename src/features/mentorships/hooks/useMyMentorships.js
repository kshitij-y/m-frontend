import { useQuery } from "@tanstack/react-query";

import { getMyMentorships } from "../api/getMyMentorships";

import { queryKeys } from "../../../query/queryKeys";

export function useMyMentorships() {
  return useQuery({
    queryKey: queryKeys.mentorships.my,

    queryFn: async () => {
      const response =
        await getMyMentorships();

      return response.data;
    },
  });
}