import { api } from "./api";

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("authToken", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("authToken");
  }
};
