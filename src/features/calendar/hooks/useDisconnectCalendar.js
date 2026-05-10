import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { disconnectCalendar } from "../api/disconnectCalendar";

import { queryKeys } from "../../../query/queryKeys";

export const useDisconnectCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disconnectCalendar,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.calendar.status,
      });

      toast.success("Calendar disconnected");
    },

    onError: () => {
      toast.error("Failed to disconnect calendar");
    },
  });
};