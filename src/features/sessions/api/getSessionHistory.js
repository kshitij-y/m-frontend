// api/getSessionHistory.js

import { request } from "../../../api/request";

export async function getSessionHistory() {
  return request.get(
    "/sessions/history"
  );
}