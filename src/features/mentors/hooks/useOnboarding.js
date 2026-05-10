import { useQuery } from "@tanstack/react-query";

import { getOnboardingStatus } from "../api/onboardingApi";

import { queryKeys } from "../../../query/queryKeys";

export const useOnboarding = () => {
  return useQuery({
    queryKey: queryKeys.onboarding.status,
    queryFn: getOnboardingStatus,
  });
};