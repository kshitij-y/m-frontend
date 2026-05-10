import { request } from "../../../api/request";

export const getOnboardingStatus = async () => {
  const response = await request.get(
    "/mentors/onboarding-status"
  );

  return response.data;
};