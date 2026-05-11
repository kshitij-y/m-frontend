import { useMutation } from "@tanstack/react-query";

import { searchMentors } from "../api/searchMentors";

export function useAiMentorSearch() {
  return useMutation({
    mutationFn: async (prompt) => {
      const response = await searchMentors(prompt);
      return response.data;
    },
  });
}
