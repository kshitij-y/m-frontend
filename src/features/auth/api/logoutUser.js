import { request } from "../../../api/request";

export async function logoutUser() {
  return request.post("/auth/logout");
}