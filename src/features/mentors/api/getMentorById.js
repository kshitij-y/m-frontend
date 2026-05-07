import { request } from "../../../api/request";

export async function getMentorById(id) {
  return request.get(`/mentors/${id}`);
}