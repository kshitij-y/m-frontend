import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMentorship } from "../api/createMentorship";

import { queryKeys } from "../../../query/queryKeys";

export function useCreateMentorship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorship,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentorships.my,
      });
    },
  });
}