// src/services/tmdb/movies.ts
// import { mapMovie } from "../types/mapper/movieMapper";
import { movieMapper } from "../types/mapper/movieMapper";
import type { MovieAPIResponse } from "../types/movieApiResponse";
import { api } from "./api";

export const getTrendingMovies = async () => {
  // const res = await api.get<any>("/trending/movie/day");
  // return res.results.map(mapMovie);
  const json = await api.get<{ results: MovieAPIResponse[] }>("/trending/movie/week");
  return movieMapper.mapMany(json.results);
};

export const getPopularMovies = async () => {
  const json =await api.get<{ results: MovieAPIResponse[] }>("/movie/popular");
  return movieMapper.mapMany(json.results);
};

export const getTopRatedMovies = async () => {
  const json = await api.get<{ results: MovieAPIResponse[] }>("/movie/top_rated");
  return movieMapper.mapMany(json.results);
};

export const getMoviesByGenre = (genreId: number) => {
  return api.get<{ results: MovieAPIResponse[] }>("/discover/movie", {
    params: { with_genres: genreId },
  });
};

export const getMovieDetails = (id: number) => {
  return api.get<{ results: MovieAPIResponse[] }>(`/movie/${id}`);
};