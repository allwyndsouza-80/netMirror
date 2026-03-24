export const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
export type MediaType = "movie" | "tv" | "anime" | "documentary" | "short";

export type MaturityRating = "G" | "PG" | "PG-13" | "R" | "TV-Y" | "TV-G" | "TV-PG" | "TV-14" | "TV-MA";
export const REDIRECT_AFTER_PROFILE_SELECTION = '/home'
export const API_TIMEOUT = 10000

export const MOVIE_GENRES: Record<number, string> = {
    28:    "Action",
    12:    "Adventure",
    16:    "Animation",
    35:    "Comedy",
    80:    "Crime",
    18:    "Drama",
    14:    "Fantasy",
    27:    "Horror",
    9648:  "Mystery",
    878:   "Science Fiction",
    53:    "Thriller",
    37:    "Western",
  };
  export const TV_GENRES: Record<number, string> = {
    18:    "Drama",
    35:    "Comedy",
    80:    "Crime",
    10759: "Action & Adventure",
    10765: "Sci-Fi & Fantasy",
    10751: "Family",
    9648:  "Mystery",
    37:    "Western",
  };
  