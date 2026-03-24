import type { VideoItem } from "../videoItem";

// Every mapper must implement this
export interface VideoItemMapper<TRaw> {
  map(raw: TRaw): VideoItem;
  mapMany(raw: TRaw[]): VideoItem[];
}