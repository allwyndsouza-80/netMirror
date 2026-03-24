import { useState} from "react";
import HeroBanner from "../../shared/components/HeroBanner";
import type { VideoItem } from "../../types/videoItem";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../shared/utils/queryKeys";
import { getPopularTV, getTopRatedTV, getTrendingTV } from "../../services/tv.service";
import HeroBannerSkeleton from "../../shared/components/HeroBannerSkeleton";
import VideoRowSkeleton from "../../shared/components/VideoRowSkeleton";
import VideoRow from "../../shared/components/VideoRow";





// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function TvShows() {
  const [_hoveredMovie, setHoveredMovie] = useState<VideoItem | null>(null);

  const trending = useQuery({ queryKey: [QUERY_KEYS.trending("tv")], queryFn: getTrendingTV });
  const popular  = useQuery({ queryKey: [QUERY_KEYS.popular("tv")],  queryFn: getPopularTV  });
  const topRated = useQuery({ queryKey: [QUERY_KEYS.topRated("tv")], queryFn: getTopRatedTV });

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