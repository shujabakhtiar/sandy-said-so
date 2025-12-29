import { apiClient } from "./api-client";

export const authResource = {
  me: <T = any>() => apiClient.get<T>("/api/auth/me"),
  login: <T = any>(data: any) => apiClient.post<T>("/api/auth/login", data),
  signup: <T = any>(data: any) => apiClient.post<T>("/api/auth/signup", data),
  logout: () => apiClient.post("/api/auth/logout"),
};
