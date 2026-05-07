import { request } from "../../../api/request";

export async function loginUser(data) {
  return request.post("/auth/login", data);
}