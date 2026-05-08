import { request } from "../../../api/request";

export async function updateMentorshipStatus(
  id,
  data
) {
  return request.patch(
    `/mentorships/${id}/status`,
    data
  );
}