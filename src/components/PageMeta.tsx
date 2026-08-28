import { useEffect } from "react";
import { applyPageMeta, type PageMeta as PageMetaProps } from "../lib/meta";

export function PageMeta({ title, description, path }: PageMetaProps) {
  useEffect(() => {
    applyPageMeta({ title, description, path });
  }, [title, description, path]);

  return null;
}
