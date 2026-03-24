import { useState } from "react";
import PlayIcon from "./PlayIcon";
import MuteIcon from "./MuteIcon";
import InfoIcon from "./InfoIcon";
import type { VideoItem } from "../../types/videoItem";
import { useNavigate } from "react-router-dom";



export default function HeroBanner(video: VideoItem) {
  const {
    heroImage,
    title,
    match,
    genres,
    description,
    rating,
    year,
    duration,
  } = video;
    const [muted, setMuted] = useState(true);

    const navigate = useNavigate();
  
    return (
      <div className="relative w-full h-[85vh] min-h-[520px] max-h-[900px] overflow-hidden">
        {/* Background image */}
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.55)" }}
        />
  
        {/* Vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
  
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end pb-24 px-4 md:px-12 max-w-3xl">
          {/* NetMirror badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#e50914] text-xs font-bold tracking-[0.2em] uppercase border border-[#e50914] px-2 py-0.5 rounded-sm">
              N Series
            </span>
          </div>
  
          {/* Title */}
          <h1
            className="text-[var(--text-h)] font-black leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              textShadow: "0 4px 24px rgba(0,0,0,0.8)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
  
          {/* Metadata row */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-green-400 font-semibold text-sm md:text-base">
              {match}% Match
            </span>
            <span className="text-[var(--text-muted)] text-sm">{year}</span>
            <span className="border border-[var(--text-muted)] text-[var(--text-muted)] text-xs px-1.5 py-0.5 rounded-sm">
              {rating}
            </span>
            <span className="text-[var(--text-muted)] text-sm">{duration}</span>
            <span className="border border-white/20 bg-white/5 backdrop-blur-sm text-[var(--text-h)] text-xs px-2 py-0.5 rounded-sm">
              HD
            </span>
          </div>
  
          {/* Genres */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {genres.map((g, i) => (
              <span key={g} className="text-[var(--text)] text-sm flex items-center gap-2">
                {g}
                {i < genres.length - 1 && <span className="text-[var(--text-muted)] opacity-50">•</span>}
              </span>
            ))}
          </div>
  
          {/* Description */}
          <p
            className="text-[var(--text)] text-sm md:text-base leading-relaxed mb-7 line-clamp-3"
            style={{ maxWidth: "520px", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
          >
            {description}
          </p>
  
          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2.5 bg-white hover:bg-white/90 active:scale-95 text-black font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-md text-sm md:text-base transition-all duration-150 shadow-xl" onClick={()=> navigate("/video")}>
              <PlayIcon />
              Play
            </button>
            <button className="flex items-center gap-2.5 bg-white/20 hover:bg-white/30 active:scale-95 text-[var(--text-h)] backdrop-blur-sm font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-md text-sm md:text-base transition-all duration-150 border border-white/10">
              <InfoIcon />
              More Info
            </button>
          </div>
        </div>
  
        {/* Mute toggle — bottom right */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-24 right-4 md:right-12 flex items-center justify-center w-9 h-9 rounded-full border border-white/40 text-[var(--text-h)] hover:border-white transition-colors duration-150 backdrop-blur-sm bg-black/20"
        >
          <MuteIcon muted={muted} />
        </button>
      </div>
    );
  }