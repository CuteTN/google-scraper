import { HttpHelper } from "../common/http-helper/http-helper";

const SERVER_URL = "http://localhost:5000";

export const serverEndPoint = new HttpHelper(SERVER_URL);