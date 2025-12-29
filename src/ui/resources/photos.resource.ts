import { apiClient } from "./api-client";

export const photosResource = {
  upload: <T = any>(formData: FormData) => apiClient.post<T>("/api/photos", formData),
};
