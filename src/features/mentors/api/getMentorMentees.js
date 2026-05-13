import { request } from "../../../api/request";

export async function getMentorMentees() {
  return request.get(
    "/mentors/mentees"
  );
}