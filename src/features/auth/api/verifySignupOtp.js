import { request } from "../../../api/request";

export async function verifySignupOtp(data) {
  return request.post("/auth/verify-signup-otp", data);
}