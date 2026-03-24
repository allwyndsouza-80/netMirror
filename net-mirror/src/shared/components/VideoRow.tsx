import { useRef, useState } from "react";
import ChevronIcon from "./ChevronIcon";
import Modal from "./Modal";
import VideoCard from "./VideoCard";
import VideoList from "./VideoList";
import type { VideoRowProps } from "../../types/videoRow";

export default function VideoRow({ title, videos, onMovieHover }: VideoRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!rowRef.current) return;
    setShowLeft(rowRef.current.scrollLeft > 20);
    setShowRight(
      rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 20
    );
  };

  return (
    <>
      <section className="mb-8 relative group/row">
        {/* Row header */}
        <div className="flex items-center justify-between px-4 md:px-12 mb-3">
          <h2 className="text-[var(--text-h)] text-base md:text-lg font-semibold tracking-wide group-hover/row:text-[#e50914] transition-colors duration-200">
            {title}
            <span
              onClick={() => setIsOpen(true)}
              className="text-[#54b3d6] text-xs ml-3 font-normal opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer hover:underline"
            >
              Explore All
            </span>
          </h2>
        </div>

        {/* Scroll container */}
        <div className="relative">
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-0 bottom-6 z-20 w-10 md:w-12 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent text-white hover:text-white/80 transition-all duration-200 opacity-0 group-hover/row:opacity-100"
            >
              <ChevronIcon direction="left" />
            </button>
          )}

          <div
            ref={rowRef}
            onScroll={handleScroll}
            className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {(videos ?? []).map((video) => (
              <VideoCard key={video.id} video={video} onHover={onMovieHover} />
            ))}
            
          </div>

          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-0 bottom-6 z-20 w-10 md:w-12 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent text-white hover:text-white/80 transition-all duration-200 opacity-0 group-hover/row:opacity-100"
            >
              <ChevronIcon direction="right" />
            </button>
          )}
        </div>
      </section>

      {/* Modal — passes the FULL videos array to MovieList in one go */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Explore: ${title}`}>
        <VideoList title={title} videos={videos} />
      </Modal>
    </>
  );
}