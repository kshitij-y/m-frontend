import { request } from "../../../api/request";

export async function resetPassword(data) {
  return request.post("/auth/reset-password", data);
}