export type ProjectType = "photography" | "film" | "client";

export type MediaAspect = "16:9" | "9:16" | "2.39:1" | "4:5" | "3:2" | "3:4";

export type Media = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  mobileSrc?: string;
  placeholder?: string;
  aspect?: MediaAspect;
};

export type Video = {
  src?: string;
  youtubeId?: string;
  poster?: Media;
  aspect?: MediaAspect;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  type: ProjectType;
  year?: number;
  summary?: string;
  description?: string;
  cover?: Media;
  gallery?: Media[];
  videos?: Video[];
  client?: string;
  roles?: string[];
  featured?: boolean;
  order: number;
};

export type MediaSlotType = "still" | "video" | "sequence" | "placeholder";
