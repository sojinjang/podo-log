import axios from "axios";
import { getAccessToken, refreshToken } from "src/utils/token";

let isTokenRefreshing = false;
let failedTaskQueue: Callback[] = [];
type Callback = () => void;

const onTokenRefreshed = () => {
  failedTaskQueue.map((callback) => callback());
  failedTaskQueue = [];
};

const addRefreshSubscriber = (callback: Callback) => {
  failedTaskQueue.push(callback);
};

export const formApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

formApi.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

formApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401 && error.response.data.statusCode === "10003") {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        await refreshToken();
        originalRequest.headers.authorization = `Bearer ${getAccessToken()}`;
        isTokenRefreshing = false;
        axios(originalRequest);
        onTokenRefreshed();
      }
      const retryOriginalRequest = new Promise((resolve) => {
        if (isTokenRefreshing) {
          addRefreshSubscriber(() => {
            originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
            resolve(axios(originalRequest));
          });
        }
      });
      return retryOriginalRequest;
    }
    throw new Error(error.response.data.message);
  }
);
