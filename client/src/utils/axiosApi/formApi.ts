import axios from "axios";
import { getAccessToken } from "src/utils/token";
import { defaultApi } from "./defaultApi";

export const formApi = axios.create({ ...defaultApi.defaults });

formApi.interceptors.response = defaultApi.interceptors.response;

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
