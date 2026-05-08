import { useQuery } from "@tanstack/react-query";

import { getMyPlans } from "../api/getMyPlans";

export function useMyPlans() {
  return useQuery({
    queryKey: ["mentor-plans"],

    queryFn: async () => {
      const response =
        await getMyPlans();

      return response.data;
    },
  });
}