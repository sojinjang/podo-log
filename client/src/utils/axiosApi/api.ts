import axios from "axios";
import { getAccessToken } from "src/utils/token";
import { defaultApi } from "./defaultApi";

export const api = axios.create({ ...defaultApi.defaults });

api.interceptors.response = defaultApi.interceptors.response;

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "Content-Type";
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
