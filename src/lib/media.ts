import type { Media, MediaAspect, Video } from "../content/types";

export const aspectClass: Record<MediaAspect, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "2.39:1": "aspect-[2.39/1]",
  "4:5": "aspect-[4/5]",
  "3:2": "aspect-[3/2]",
  "3:4": "aspect-[3/4]",
};

export function mediaAspectClass(
  media?: Pick<Media, "aspect"> | Pick<Video, "aspect">,
  fallback?: string,
): string | undefined {
  if (media?.aspect) return aspectClass[media.aspect];
  return fallback;
}

export function hasPlayableVideo(video?: Video): boolean {
  return Boolean(video?.src || video?.youtubeId);
}
