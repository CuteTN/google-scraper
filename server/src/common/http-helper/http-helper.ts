import axios from "axios";

/**
 * Fields are added on demands, don't directly use AxiosRequestConfig
 */
export type HttpRequestConfig = {
  headers?: {
    "x-api-key"?: string;
    "Content-Type"?: "multipart/form-data" | "application/json",
    "User-Agent"?: string;
  };
  data?: any;
};

/**
 * This class abstracts away the use of Axios from business logic
 */
export class HttpHelper {
  static get(url: string, body?: any, configs?: HttpRequestConfig) {
    if (body) {
      if (!configs) configs = {};
      configs.data = body;
    }
    return axios.get(url, configs);
  }

  static delete(url: string, body?: any, configs?: HttpRequestConfig) {
    if (body) {
      if (!configs) configs = {};
      configs.data = body;
    }
    return axios.delete(url, configs);
  }

  static put(url: string, body?: any, configs?: HttpRequestConfig) {
    return axios.put(url, body, {headers: {"Content-Type": ""}});
  }

  static post(url: string, body?: any, configs?: HttpRequestConfig) {
    return axios.post(url, body, configs);
  }
}
