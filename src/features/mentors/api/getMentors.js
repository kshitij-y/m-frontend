import { request } from "../../../api/request";

export async function getMentors() {
  return request.get("/mentors");
}