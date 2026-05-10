import { request } from "../../../api/request";

export async function signupUser(data) {
  console.log("API CALLED");
  return request.post("/auth/signup", data);
}