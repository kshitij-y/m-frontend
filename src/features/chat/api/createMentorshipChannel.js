import { request } from "../../../api/request";

export async function createMentorshipChannel(mentorshipId) {
  return request.post("/chat/channel", {
    mentorshipId,
  });
}
