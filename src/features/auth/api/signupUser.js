import { request } from "../../../api/request";

export async function signupUser(data) {
  return request.post("/auth/signup", data);
}