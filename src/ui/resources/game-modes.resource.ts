import { apiClient } from "./api-client";

export const gameModesResource = {
  getAll: <T = any>() => apiClient.get<T>("/api/game-modes"),
};
