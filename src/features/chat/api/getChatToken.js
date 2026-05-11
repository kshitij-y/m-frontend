import { request } from "../../../api/request";

export async function getChatToken() {
  return request.get("/chat/token");
}
