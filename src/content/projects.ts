import type { Project, ProjectType } from "./types";

/**
 * Placeholder-only catalogue until real photography and film arrive.
 * Titles are labels, not invented client or series names.
 */
export const projects: Project[] = [
  {
    id: "photo-placeholder-01",
    slug: "photography-placeholder",
    title: "Photography Placeholder",
    type: "photography",
    featured: true,
    order: 1,
    cover: {
      placeholder: "PHOTO",
      alt: "Placeholder for a photography still. Original image not provided yet.",
      aspect: "4:5",
    },
  },
  {
    id: "photo-placeholder-02",
    slug: "photography-placeholder-02",
    title: "Photography Placeholder",
    type: "photography",
    featured: true,
    order: 2,
    cover: {
      placeholder: "PHOTO",
      alt: "Placeholder for a second photography still. Original image not provided yet.",
      aspect: "3:2",
    },
  },
  {
    id: "film-placeholder-01",
    slug: "film-placeholder",
    title: "Film Placeholder",
    type: "film",
    featured: true,
    order: 3,
    cover: {
      placeholder: "FILM",
      alt: "Placeholder for a film poster. Original video not provided yet.",
      aspect: "16:9",
    },
    videos: [
      {
        poster: {
          placeholder: "FILM POSTER",
          alt: "Placeholder for a film poster. Original video not provided yet.",
        },
        aspect: "16:9",
      },
    ],
  },
  {
    id: "client-placeholder-01",
    slug: "client-work-placeholder",
    title: "Client Work Placeholder",
    type: "client",
    featured: true,
    order: 4,
    cover: {
      placeholder: "CLIENT WORK",
      alt: "Placeholder for a client-work still. Original image not provided yet.",
      aspect: "16:9",
    },
  },
  {
    id: "client-placeholder-02",
    slug: "client-work-placeholder-02",
    title: "Editing Placeholder",
    type: "client",
    featured: false,
    order: 5,
    cover: {
      placeholder: "CLIENT WORK",
      alt: "Placeholder for an editing still. Original image not provided yet.",
      aspect: "16:9",
    },
  },
  {
    id: "client-placeholder-03",
    slug: "client-work-placeholder-03",
    title: "Visual Placeholder",
    type: "client",
    featured: false,
    order: 6,
    cover: {
      placeholder: "CLIENT WORK",
      alt: "Placeholder for a visual still. Original image not provided yet.",
      aspect: "16:9",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByType(type: Project["type"]): Project[] {
  return projects.filter((project) => project.type === type).sort((a, b) => a.order - b.order);
}

export function getNextProject(slug: string): Project | undefined {
  const current = getProjectBySlug(slug);
  if (!current) return undefined;
  const collection = getProjectsByType(current.type);
  const index = collection.findIndex((project) => project.slug === slug);
  if (index === -1 || collection.length < 2) return undefined;
  return collection[(index + 1) % collection.length];
}

export function getCollectionIndex(slug: string): number {
  const current = getProjectBySlug(slug);
  if (!current) return 0;
  const collection = getProjectsByType(current.type);
  return collection.findIndex((project) => project.slug === slug) + 1;
}

export function typeLabel(type: ProjectType): string {
  if (type === "photography") return "Photography";
  if (type === "film") return "Film";
  return "Client";
}

export function collectionPath(type: ProjectType): string {
  if (type === "photography") return "/photography";
  if (type === "film") return "/films";
  return "/client";
}
