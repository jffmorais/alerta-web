import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  //baseURL: "http://127.0.0.1:8080"
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  console.log("config: ", config);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;