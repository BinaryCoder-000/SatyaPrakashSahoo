import { site } from "../content/site";

export type PageMeta = {
  title?: string;
  description?: string;
  path?: string;
};

export function applyPageMeta({ title, description, path }: PageMeta): void {
  const nextTitle = title ?? site.defaultTitle;
  const nextDescription = description ?? site.defaultDescription;

  document.title = nextTitle;
  setMeta("description", nextDescription);
  setMeta("og:title", nextTitle, "property");
  setMeta("og:description", nextDescription, "property");
  setMeta("og:type", "website", "property");
  setLink("canonical", path ? `${window.location.origin}${path}` : window.location.href);
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name"): void {
  let node = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function setLink(rel: string, href: string): void {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}
