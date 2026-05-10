

import { request } from "../../../api/request";

export const createPlanApi = async (
  data
) => {
  return request.post(
    "/mentors/plans",
    data
  );
};

export const updatePlanApi = async ({
  planId,
  data,
}) => {
  return request.put(
    `/mentors/plans/${planId}`,
    data
  );
};

export const deletePlanApi = async (
  planId
) => {
  return request.delete(
    `/mentors/plans/${planId}`
  );
};

export const getMyPlansApi = async () => {
  return request.get(
    "/mentors/plans/me"
  );
};