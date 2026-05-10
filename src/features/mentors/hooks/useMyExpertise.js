import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyExpertiseApi,
} from "../api/expertise";

import { queryKeys } from "../../../query/queryKeys";

export const useMyExpertise = () => {
  return useQuery({
    queryKey: queryKeys.mentors.expertise,

    queryFn: async () => {
      const response =
        await getMyExpertiseApi();

      return response.data?.expertise || [];
    },
  });
};