import { request } from "../../../api/request";

export async function getCalendarStatus() {
  return request.get("/calendar/status");
}
