import type { VideoItem } from "./videoItem";

export interface VideoRowProps {
    title: string;
    videos: VideoItem[];
    onMovieHover: (video: VideoItem | null) => void;
  }