import { request } from "../../../api/request";

export async function getUpcomingSessions() {
  return request.get("/sessions/upcoming");
}
