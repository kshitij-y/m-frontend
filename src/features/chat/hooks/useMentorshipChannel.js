import { useMutation } from "@tanstack/react-query";

import { createMentorshipChannel } from "../api/createMentorshipChannel";

export function useMentorshipChannel() {
  return useMutation({
    mutationFn: async (mentorshipId) => {
      const response =
        await createMentorshipChannel(mentorshipId);
      return response.data;
    },
  });
}
