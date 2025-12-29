import { apiClient } from "./api-client";

export const gameCardsResource = {
  getById: <T = any>(id: string | number) => apiClient.get<T>(`/api/game-cards/${id}`),
  update: <T = any>(id: string | number, data: any) => apiClient.patch<T>(`/api/game-cards/${id}`, data),
  delete: <T = any>(id: string | number) => apiClient.delete<T>(`/api/game-cards/${id}`),
};
