import { TV_GENRES } from "../../shared/utils/constant";
import type { TVShowAPIResponse } from "../tvShowApiResponse";
import type { VideoItem } from "../videoItem";
import type { VideoItemMapper } from "./videoItemMapper";

const IMAGE_BASE = "https://image.tmdb.org/t/p";


export class TVShowMapper implements VideoItemMapper<TVShowAPIResponse> {
  map(show: TVShowAPIResponse): VideoItem {
    return {
      id:          show.id,
      title:       show.name,
      description: show.overview,
      rating:      show.adult ? "TV-MA" : "TV-14",
      year:        new Date(show.first_air_date).getFullYear(),
      duration:    "TV Series",
      genres:      show.genre_ids.map((id) => TV_GENRES[id] ?? "Unknown"),
      heroImage:   show.backdrop_path ? `${IMAGE_BASE}/original${show.backdrop_path}` : "",
      posterImage: show.poster_path   ? `${IMAGE_BASE}/w500${show.poster_path}`       : "",
      match:       Math.round(show.vote_average * 10),
      mediaType:   "tv",
    };
  }

  mapMany(shows: TVShowAPIResponse[]): VideoItem[] {
    return shows.map((s) => this.map(s));
  }
}

// Export a singleton — no need to instantiate everywhere
export const tvShowMapper = new TVShowMapper();