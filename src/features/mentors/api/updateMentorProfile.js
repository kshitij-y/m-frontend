import { request } from "../../../api/request";

export async function updateMentorProfile(data) {
  return request.put("/mentors/profile", data);
}