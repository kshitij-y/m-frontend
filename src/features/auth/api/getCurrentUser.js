import { request } from "../../../api/request";

export async function getCurrentUser() {
  return request.get("/auth/me");
}