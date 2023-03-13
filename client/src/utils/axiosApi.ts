import axios from "axios";
import { getAccessToken } from "src/utils/token";

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

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
