// src/features/mentors/api/createMentorProfile.js

import { request } from "../../../api/request";

export const createMentorProfile = async (
  data
) => {
  return request.post(
    "/mentors/profile",
    data
  );
};