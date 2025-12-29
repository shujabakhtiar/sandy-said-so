import { apiClient } from "./api-client";

export const gameDecksResource = {
  getAll: (gameModeId?: number | string) => {
    const url = gameModeId ? `/api/game-decks?gameModeId=${gameModeId}` : "/api/game-decks";
    return apiClient.get(url);
  },
  getById: <T = any>(id: string | number) => apiClient.get<T>(`/api/game-decks/${id}`),
  create: <T = any>(data: any) => apiClient.post<T>("/api/game-decks", data),
  update: <T = any>(id: string | number, data: any) => apiClient.patch<T>(`/api/game-decks/${id}`, data),
  delete: <T = any>(id: string | number) => apiClient.delete<T>(`/api/game-decks/${id}`),
};
