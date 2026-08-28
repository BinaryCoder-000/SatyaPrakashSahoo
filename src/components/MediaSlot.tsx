import type { Media, MediaSlotType, Video } from "../content/types";
import { mediaAspectClass } from "../lib/media";
import { cx } from "../lib/utils";

type MediaSlotProps = {
  type: MediaSlotType;
  media?: Media;
  video?: Video;
  sequence?: Media[];
  label?: string;
  className?: string;
  priority?: boolean;
  play?: boolean;
};

export function MediaSlot({
  type,
  media,
  video,
  sequence,
  label,
  className,
  priority = false,
  play,
}: MediaSlotProps) {
  const still = type === "sequence" ? (sequence?.[0] ?? media) : media;
  const poster = video?.poster ?? still;
  const src = poster?.src;
  const alt = poster?.alt ?? label ?? "";
  const placeholder = poster?.placeholder ?? label ?? "MEDIA";
  const showPlay = play ?? (type === "video" && !video?.src);
  const ratio = mediaAspectClass(video);
  const videoSrc = type === "video" ? video?.src : undefined;

  return (
    <div
      className={cx(
        "relative overflow-hidden border border-rule bg-elevated",
        ratio,
        !ratio && !className?.includes("aspect-") && "min-h-40",
        className,
      )}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={src}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 size-full object-cover"
        />
      ) : src ? (
        <img
          src={src}
          alt={alt}
          width={poster?.width}
          height={poster?.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex min-h-40 items-center justify-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
          role="img"
          aria-label={alt || placeholder}
        >
          {placeholder}
        </div>
      )}

      {showPlay ? (
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg lg:size-16"
          aria-hidden="true"
        >
          <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-fg" />
        </span>
      ) : null}
    </div>
  );
}
