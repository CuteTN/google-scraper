import axios, { AxiosInstance } from "axios";

export type HttpRequestConfig = {
  headers?: {
    "x-api-key"?: string;
    "Content-Type"?: "multipart/form-data" | "application/json";
  };
  data?: any;
};

export type HttpRequestInterceptorParam = {
  header: {
    Authorization: string;
  };
};

export type HttpResponseInterceptorError = {
  response: {
    status: number;
  };
};

/**
 * Methods and properties are added on-demand to avoid coupling with Axios
 */
export class HttpHelper {
  readonly axiosInstance: AxiosInstance;

  constructor(public readonly baseUrl: string) {
    this.axiosInstance = axios.create({ baseURL: baseUrl });
  }

  get(path: string, configs?: HttpRequestConfig) {
    return this.axiosInstance.get(path, configs);
  }

  delete(path: string, configs?: HttpRequestConfig) {
    return this.axiosInstance.delete(path, configs);
  }

  put(path: string, body?: any, configs?: HttpRequestConfig) {
    return this.axiosInstance.put(path, body, configs);
  }

  post(path: string, body?: any, configs?: HttpRequestConfig) {
    return this.axiosInstance.post(path, body, configs);
  }

  setRequestInterceptor(resolve?: (params: HttpRequestInterceptorParam) => HttpRequestInterceptorParam) {
    /** @ts-ignore */
    this.axiosInstance.interceptors.request.use((params) => resolve?.(params));
  }

  setResponseInterceptor(
    _resolve: any,
    reject?: (params: HttpResponseInterceptorError) => any
  ) {
    /** @ts-ignore */
    this.axiosInstance.interceptors.request.use(
      (params) => _resolve(params),
      reject
    );
  }
}
