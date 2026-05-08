import { request } from "../../../api/request";

export async function getMyMentorProfile() {
  return request.get("/mentors/profile/me");
}