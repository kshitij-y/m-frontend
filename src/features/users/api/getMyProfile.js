import { request } from "../../../api/request";

export async function getMyProfile() {
  return request.get("/users/me");
}