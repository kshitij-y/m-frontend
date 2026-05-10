import { useQuery } from "@tanstack/react-query";

import { getCalendarStatus } from "../api/getCalendarStatus";

import { queryKeys } from "../../../query/queryKeys";

export const useCalendarStatus = () => {
  return useQuery({
    queryKey: queryKeys.calendar.status,
    queryFn: getCalendarStatus,
  });
};