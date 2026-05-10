import { request } from "../../../api/request";

export async function disconnectCalendar() {
  return request.delete("/calendar/disconnect");
}
