import { request } from "../../../api/request";

export async function deleteExpertise(id) {
  return request.delete(
    `/mentors/expertise/${id}`
  );
}