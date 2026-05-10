// src/features/mentors/api/expertise.js

import { request } from "../../../api/request";

export const addExpertiseApi = async (data) => {
  return request.post(
    "/mentors/expertise",
    data
  );
};

export const deleteExpertiseApi = async (
  expertiseId
) => {
  return request.delete(
    `/mentors/expertise/${expertiseId}`
  );
};

export const getMyExpertiseApi = async () => {
  return request.get(
    "/mentors/profile/me"
  );
};