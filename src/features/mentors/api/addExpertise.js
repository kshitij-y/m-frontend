import { request } from "../../../api/request";

export async function addExpertise(data) {
  return request.post(
    "/mentors/expertise",
    data
  );
}