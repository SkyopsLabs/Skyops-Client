import axios from "axios";
import { setAuthToken } from "./setAuthToken";
import { baseUrl } from "./config";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err);
    if (err.response.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(err);
  },
);
