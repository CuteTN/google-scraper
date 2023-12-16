import axios from "axios";

/**
 * Fields are added on demands, don't directly use AxiosRequestConfig
 */
export type HttpRequestConfig = {
  headers?: {
    "x-api-key"?: string;
    "Content-Type"?: "multipart/form-data" | "application/json";
  };
  data?: any;
};

/**
 * This class abstracts away the use of Axios from business logic
 */
export class HttpHelper {
  constructor(public readonly baseUrl: string) {
    if (!baseUrl.endsWith("/")) this.baseUrl = baseUrl + "/";
  }

  private combinePath(path: string) {
    let firstNonSlash = 0;
    while (path[firstNonSlash] === "/") firstNonSlash++;

    return this.baseUrl + path.substring(firstNonSlash);
  }

  get(path: string, body?: any, configs?: HttpRequestConfig) {
    const url = this.combinePath(path);
    if (body) {
      if (!configs) configs = {};
      configs.data = body;
    }
    return axios.get(url, configs);
  }

  delete(path: string, body?: any, configs?: HttpRequestConfig) {
    const url = this.combinePath(path);
    if (body) {
      if (!configs) configs = {};
      configs.data = body;
    }
    return axios.delete(url, configs);
  }

  put(path: string, body?: any, configs?: HttpRequestConfig) {
    const url = this.combinePath(path);
    return axios.put(url, body, configs);
  }

  post(path: string, body?: any, configs?: HttpRequestConfig) {
    const url = this.combinePath(path);
    return axios.post(url, body, configs);
  }
}
