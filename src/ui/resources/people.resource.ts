import { apiClient } from "./api-client";

export const peopleResource = {
  getAll: <T = any>(params?: any) => apiClient.get<T>("/api/people", params),
  getById: <T = any>(id: string | number) => apiClient.get<T>(`/api/people/${id}`),
};
