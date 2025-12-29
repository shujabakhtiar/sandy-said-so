import { apiClient } from "./api-client";

export const aiCardsGeneratorResource = {
  generate: <T = any>(data: any) => apiClient.post<T>("/api/ai-cards-generator", data),
};
