import { request } from "../../../api/request";

export async function getMyPlans() {
  return request.get("/mentors/plans/me");
}