import { useNavigate } from "react-router-dom";
import AddIcon from "./AddIcon";
import LikeIcon from "./LikeIcon";
import PlayIcon from "./PlayIcon";
import type { VideoCardProps } from "../../types/videoCardProps";

export default function VideoCard({ video, onHover }: VideoCardProps) {
  const navigate = useNavigate();
    return (
      <div
        className="relative flex-shrink-0 w-40 sm:w-48 md:w-52 lg:w-56 group cursor-pointer"
        onMouseEnter={() => onHover(video)}
        onMouseLeave={() => onHover(null)}
        onClick={() => navigate('/video')}
        
      >
        {/* Poster */}
        <div className="relative rounded-md overflow-hidden transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black/60 group-hover:z-10">
          <img
            src={video.posterImage}
            alt={video.title}
            className="w-full aspect-[2/3] object-cover"
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
          {/* Hover info panel */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-[var(--text-h)] font-semibold text-sm leading-tight line-clamp-1">
              {video.title}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-green-400 text-xs font-bold">{video.match}% Match</span>
              <span className="text-[var(--text-muted)] text-xs border border-[var(--text-muted)] px-1 rounded-sm">
                {video.rating}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <button className="bg-[var(--text-h)] hover:bg-white/90 text-black rounded-full p-1.5 transition-colors duration-150" onClick={() => navigate('/video')}>
                <PlayIcon />
              </button>
              <button className="border border-white/50 hover:border-white text-[var(--text-h)] rounded-full p-1.5 transition-colors duration-150"  onClick={(event) => {
             event.stopPropagation();
              }}>
                <AddIcon />
              </button>
              <button className="border border-white/50 hover:border-white text-[var(--text-h)] rounded-full p-1.5 transition-colors duration-150 ml-auto" onClick={(event) => {
             event.stopPropagation();
              }}>
                <LikeIcon />
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {video.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="text-[var(--text-muted)] text-xs">
                  {genre}
                  {video.genres.indexOf(genre) < Math.min(video.genres.length, 2) - 1 && (
                    <span className="mx-1 opacity-40">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Rank number for trending */}
        <p className="text-[var(--text-muted)] text-xs mt-1.5 truncate px-0.5">{video.title}</p>
      </div>
    );
  }