import { request } from "../../../api/request";

export async function getMentorPlans(id) {
  return request.get(`/mentors/${id}/plans`);
}