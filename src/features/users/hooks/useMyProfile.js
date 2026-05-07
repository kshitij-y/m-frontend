import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "../api/getMyProfile";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],

    queryFn: async () => {
      const response =
        await getMyProfile();

      return response.data;
    },
  });
}