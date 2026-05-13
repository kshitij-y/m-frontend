import { request } from "../../../api/request";

export async function getMentorshipSessions(mentorshipId) {
  return request.get(`/sessions/mentorship/${mentorshipId}`);
}
