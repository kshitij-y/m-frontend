import { request } from "../../../api/request";

export async function completeSession(id) {
  return request.patch(`/sessions/${id}/complete`);
}
