import { serverEndPoint } from "./server.endpoint";

export async function testApi() {
  return serverEndPoint.get("/v1/test-endpoint")
}