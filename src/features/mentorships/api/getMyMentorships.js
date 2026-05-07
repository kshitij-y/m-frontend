import { request } from "../../../api/request";

export async function getMyMentorships() {
  return request.get("/mentorships/me");
}