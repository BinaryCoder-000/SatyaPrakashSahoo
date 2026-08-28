export const homeSections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const homeSectionIds = ["work", "about", "contact"] as const;

export type HomeSectionId = (typeof homeSectionIds)[number];

export function isHomeSectionId(value: string): value is HomeSectionId {
  return (homeSectionIds as readonly string[]).includes(value);
}

export function scrollToSection(id: string, reduce: boolean): void {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
[]