import { apiClient } from "./api-client";

export const aiGenerationsResource = {
  getAll: <T = any>(params?: any) => apiClient.get<T>("/api/ai-generations", params),
};
