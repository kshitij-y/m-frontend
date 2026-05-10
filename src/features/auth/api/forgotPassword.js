import { request } from "../../../api/request";

export async function forgotPassword(data) {
  return request.post("/auth/forgot-password", data);
}