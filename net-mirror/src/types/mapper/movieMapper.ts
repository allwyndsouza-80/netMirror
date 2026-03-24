
import { IMAGE_BASE, MOVIE_GENRES } from "../../shared/utils/constant";
import type { MovieAPIResponse } from "../movieApiResponse";
import type { VideoItem } from "../videoItem";
import type { VideoItemMapper } from "./videoItemMapper";



export class MovieMapper implements VideoItemMapper<MovieAPIResponse> {
  map(movie: MovieAPIResponse): VideoItem {
    return {
      id:          movie.id,
      title:       movie.title,
      description: movie.overview,
      rating:      movie.adult ? "R" : "PG-13",
      year:        new Date(movie.release_date).getFullYear(),
      duration:    movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Movie",
      genres:      movie.genre_ids.map((id) => MOVIE_GENRES[id] ?? "Unknown"),
      heroImage:   movie.backdrop_path ? `${IMAGE_BASE}/${movie.backdrop_path}` : "",
      posterImage: movie.poster_path   ? `${IMAGE_BASE}/${movie.poster_path}`       : "",
      match:       Math.round(movie.vote_average * 10),
      mediaType:   "movie",
    };
  }

  mapMany(movies: MovieAPIResponse[]): VideoItem[] {
    return movies.map((m) => this.map(m));
  }
}

export const movieMapper = new MovieMapper();