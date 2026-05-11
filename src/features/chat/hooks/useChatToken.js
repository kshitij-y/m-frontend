import { useQuery } from "@tanstack/react-query";

import { getChatToken } from "../api/getChatToken";
import { queryKeys } from "../../../query/queryKeys";

export function useChatToken(enabled) {
  return useQuery({
    queryKey: queryKeys.chat.token,
    queryFn: async () => {
      const response = await getChatToken();
      return response.data;
    },
    enabled,
  });
}
