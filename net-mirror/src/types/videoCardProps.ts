import type { VideoItem } from "./videoItem";

export interface VideoCardProps {
    video: VideoItem;
    onHover: (video: VideoItem | null) => void;
  }