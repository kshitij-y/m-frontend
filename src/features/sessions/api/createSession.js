import { request } from "../../../api/request";

export async function createSession({ mentorshipId, startTime, endTime }) {
  return request.post("/sessions", { mentorshipId, startTime, endTime });
}
