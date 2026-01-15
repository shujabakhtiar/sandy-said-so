import { apiClient } from "./api-client";
import { PaginatedResponse, PaginationParams } from "@/api/types";

export const gameDecksResource = {
  getAll: <T = any>(gameModeId?: number | string, params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (gameModeId) searchParams.append("gameModeId", String(gameModeId));
    if (params?.page) searchParams.append("page", String(params.page));
    if (params?.limit) searchParams.append("limit", String(params.limit));
    
    const queryString = searchParams.toString();
    const url = queryString ? `/api/game-decks?${queryString}` : "/api/game-decks";
    
    return apiClient.get<PaginatedResponse<T>>(url);
  },
  getById: <T = any>(id: string | number) => apiClient.get<T>(`/api/game-decks/${id}`),
  create: <T = any>(data: any) => apiClient.post<T>("/api/game-decks", data),
  update: <T = any>(id: string | number, data: any) => apiClient.patch<T>(`/api/game-decks/${id}`, data),
  delete: <T = any>(id: string | number) => apiClient.delete<T>(`/api/game-decks/${id}`),
};
