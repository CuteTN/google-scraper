import { TokenService } from "../common/authentication/token.service";
import { HttpHelper } from "../common/http-helper/http-helper";
import { SERVER_URL } from "../configs.constants";

export const serverEndPoint = new HttpHelper(SERVER_URL);

serverEndPoint.setRequestInterceptor((params) => {
  let token = TokenService.accessToken;
  if (token) {
    params.header.Authorization = `bearer ${token}`;
  }

  return params;
});

serverEndPoint.setResponseInterceptor(
  (params: any) => params,
  (error) => {
    if (error.response.status === 401) {
      TokenService.accessToken = "";
    }

    return Promise.reject(error);
  }
);
