import { request } from "../../../api/request";

export async function cancelSession(id) {
  return request.patch(`/sessions/${id}/cancel`);
}
