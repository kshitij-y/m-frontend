import { request } from "../../../api/request";

export async function deletePlan(id) {
  return request.delete(
    `/mentors/plans/${id}`
  );
}