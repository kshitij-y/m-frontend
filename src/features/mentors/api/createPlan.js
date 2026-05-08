import { request } from "../../../api/request";

export async function createPlan(data) {
  return request.post(
    "/mentors/plans",
    data
  );
}