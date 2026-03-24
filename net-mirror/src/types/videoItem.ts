import type { MaturityRating, MediaType } from "../shared/utils/constant";

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  rating: MaturityRating | string;
  year: number;
  duration: string;           // "2h 18m" for movies, "S1 · 10 eps" for TV
  genres: string[];
  heroImage: string;
  posterImage: string;
  match: number;              // 0–100
  mediaType: MediaType;       // every item knows what it is
}