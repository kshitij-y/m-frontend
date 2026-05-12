import { request } from "../../../api/request";

export async function scheduleMentorship(id, data) {
  return request.patch(`/mentorships/${id}/schedule`, data);
}
