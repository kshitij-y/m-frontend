import { request } from "../../../api/request";

export async function createMentorship(data) {
  return request.post("/mentorships", data);
}