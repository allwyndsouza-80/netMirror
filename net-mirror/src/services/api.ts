// src/services/api.ts

import { apiClient } from "./apiClient";

export const api = {
  get: <T>(endpoint: string, params?: Record<string, any>) => {
    return apiClient<T>(endpoint, {
      method: "GET",
      params,
    });
  },

  post: <T>(endpoint: string, body?: any) => {
    return apiClient<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: <T>(endpoint: string, body?: any) => {
    return apiClient<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: <T>(endpoint: string) => {
    return apiClient<T>(endpoint, {
      method: "DELETE",
    });
  },
};