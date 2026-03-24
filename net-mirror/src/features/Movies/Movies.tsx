import { useState} from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from "../../services/movies";
import HeroBannerSkeleton from "../../shared/components/HeroBannerSkeleton";
import VideoRow from "../../shared/components/VideoRow";
import VideoRowSkeleton from "../../shared/components/VideoRowSkeleton";
import { QUERY_KEYS } from "../../shared/utils/queryKeys";
import type { VideoItem } from "../../types/videoItem";





// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function Movies() {
  const [_hoveredMovie, setHoveredMovie] = useState<VideoItem | null>(null);

  const trending = useQuery({ queryKey: [QUERY_KEYS.trending("movie")], queryFn: getTrendingMovies });
  const popular  = useQuery({ queryKey: [QUERY_KEYS.popular("movie")],  queryFn: getPopularMovies  });
  const topRated = useQuery({ queryKey: [QUERY_KEYS.topRated("movie")], queryFn: getTopRatedMovies });

  const heroMovieItem = trending.data?.[0];

  return (
    <div>
      {/* Hero — skeleton until trending resolves */}
      {trending.isPending ? <HeroBannerSkeleton /> : <HeroBanner {...heroMovieItem!} />}

      <div className="">
        {trending.isPending ? (
          <VideoRowSkeleton />
        ) : (
          <VideoRow title="Trending Now" videos={trending.data ?? []} onMovieHover={setHoveredMovie} />
        )}

        {popular.isPending ? (
          <VideoRowSkeleton />
        ) : (
          <VideoRow title="Popular" videos={popular.data ?? []} onMovieHover={setHoveredMovie} />
        )}

        {topRated.isPending ? (
          <VideoRowSkeleton />
        ) : (
          <VideoRow title="Top Rated" videos={topRated.data ?? []} onMovieHover={setHoveredMovie} />
        )}

        <div className="h-16 md:h-24" />
      </div>
    </div>
  );
}