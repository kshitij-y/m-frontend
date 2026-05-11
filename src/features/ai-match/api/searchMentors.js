import { request } from "../../../api/request";

export async function searchMentors(prompt) {
  return request.post("/ai/mentor-search", {
    prompt,
  });
}
