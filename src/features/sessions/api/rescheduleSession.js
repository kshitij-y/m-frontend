import { request } from "../../../api/request";

export async function rescheduleSession(id, { startTime, endTime }) {
  return request.patch(`/sessions/${id}/reschedule`, { startTime, endTime });
}
