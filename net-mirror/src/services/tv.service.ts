import { tvShowMapper } from "../types/mapper/tvShowMapper";
import type { TVShowAPIResponse } from "../types/tvShowApiResponse";
import { api } from "./api";

// Trending TV
export const getTrendingTV = async () => {
  const json = await api.get<{ results: TVShowAPIResponse[] }>("/trending/tv/week");
  return tvShowMapper.mapMany(json.results);
};

// Popular TV
export const getPopularTV = async () => {
  const json = await api.get<{ results: TVShowAPIResponse[] }>("/tv/popular");
  return tvShowMapper.mapMany(json.results);
};

// Top Rated TV
export const getTopRatedTV = async () => {
  const json = await api.get<{ results: TVShowAPIResponse[] }>("/tv/top_rated");
  return tvShowMapper.mapMany(json.results);
};

// TV by Genre
export const getTVByGenre = (genreId: number) => {
  return api.get<{ results: TVShowAPIResponse[] }>("/discover/tv", {
    params: { with_genres: genreId },
  });
};

// TV Details
export const getTVDetails = (id: number) => {
  return api.get<TVShowAPIResponse>(`/tv/${id}`);
};