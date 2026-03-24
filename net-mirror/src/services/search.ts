// src/services/tmdb/search.ts

import { api } from "./api";

export const searchMovies = (query: string) => {
  return api.get("/search/movie", {
    params: { query },
  });
};