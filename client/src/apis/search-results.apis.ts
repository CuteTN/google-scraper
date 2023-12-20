import { serverEndPoint } from "./server.endpoint";

export async function fetchSearchResultsApi(
  text: string,
  page: number,
  limit: number
) {
  return serverEndPoint.post("/v1/search-results/search", {
    text,
    page,
    limit,
  });
}
