import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "Content-Type";
    config.headers["Authorization"] = axios.defaults.headers.common.Authorization;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
