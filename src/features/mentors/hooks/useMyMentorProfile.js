import { useQuery } from "@tanstack/react-query";

import { getMyMentorProfile } from "../api/getMyMentorProfile";

export function useMyMentorProfile() {
  return useQuery({
    queryKey: ["mentor-profile"],

    queryFn: async () => {
      const response =
        await getMyMentorProfile();

      return response.data;
    },
  });
}