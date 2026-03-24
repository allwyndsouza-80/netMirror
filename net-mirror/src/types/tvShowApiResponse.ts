export interface TVShowAPIResponse {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    media_type: string;
    origin_country: string[];
    original_language: string;
  }