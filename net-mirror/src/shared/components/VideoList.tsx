import { useState } from "react";
import type { VideoItem } from "../../types/videoItem";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VideoListProps {
  title?: string;
  videos: VideoItem[];
}

interface VideoListItemProps {
  video: VideoItem;
  index: number;
}

// ─── Video List Item ──────────────────────────────────────────────────────────

function VideoListItem({ video, index }: VideoListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
      style={{
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        border: hovered
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      {/* Rank number */}
      <span
        className="text-sm font-bold w-6 text-center flex-shrink-0 transition-colors duration-200"
        style={{ color: hovered ? "rgba(229,9,20,0.9)" : "rgba(255,255,255,0.2)" }}
      >
        {index + 1}
      </span>

      {/* Poster thumbnail */}
      <div className="relative flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden">
        {!imgError ? (
          <img
            src={video.posterImage}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.2)" strokeWidth={1.5}
              strokeLinecap="round" strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <path d="M2 10l5-5 4 4 3-3 5 5" />
              <circle cx="8.5" cy="7.5" r="1.5" />
            </svg>
          </div>
        )}

        {/* Play overlay on hover */}
        {hovered && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="#141414">
                <path d="M0 0l10 6-10 6z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* video info */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm leading-tight truncate transition-colors duration-200"
          style={{ color: hovered ? "white" : "rgba(255,255,255,0.85)" }}
        >
          {video.title}
        </p>

        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1">
          <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>
            {video.match}% Match
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            {video.year}
          </span>
          <span
            className="text-xs px-1 rounded-sm"
            style={{
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.2)",
              lineHeight: "1.4",
            }}
          >
            {video.rating}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            {video.duration}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {video.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Chevron */}
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round"
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
          transform: hovered ? "translateX(2px)" : "translateX(0)",
        }}
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </li>
  );
}

// ─── VideoList ────────────────────────────────────────────────────────────────

// VideoList.tsx — replace the outer div with just a fragment
export default function VideoList({ videos }: VideoListProps) {
    return (                         
  
        <ul className="flex flex-col">
          {videos.map((video, index) => (
            <VideoListItem key={video.id} video={video} index={index} />
          ))}
        </ul>
    );
  }