import { request } from "../../../api/request";

export async function updateMyProfile(data) {
  return request.put("/users/me", data);
}