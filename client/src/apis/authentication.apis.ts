import { serverEndPoint } from "./server.endpoint";

export async function signUpApi(username: string, password: string) {
  return serverEndPoint.post("/v1/users/sign-up", { username, password });
}

export async function signInApi(username: string, password: string) {
  return serverEndPoint.post("/v1/users/sign-in", { username, password });
}