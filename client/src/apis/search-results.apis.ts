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

export async function fetchSearchResultHtmlByIdApi(id: string) {
  if (!id) return Promise.reject("ID is required.");
  return serverEndPoint.get(`/v1/search-results/html/${id}`);
}

export async function uploadCsvOfKeywordsApi(csvFile: File) {
  const formData = new FormData();
  formData.set("file", csvFile);
  return serverEndPoint.post("/v1/search-results/upload-csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
