import { Link } from "react-router";
import type { Project } from "../content/types";
import { dash, padIndex } from "../lib/utils";
import { MediaSlot } from "./MediaSlot";

type CreditRowProps = {
  index: number;
  project: Project;
};

export function CreditRow({ index, project }: CreditRowProps) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="grid min-h-11 items-center gap-2 border-t border-rule py-5 md:grid-cols-[64px_minmax(0,1.4fr)_1fr_1fr_minmax(96px,0.8fr)] md:gap-4"
    >
      <span className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
        {padIndex(index)}
      </span>
      <span className="text-[15px] leading-snug md:text-base">{project.title}</span>
      <span className="text-[15px] leading-snug text-muted md:text-base">
        {dash(project.roles?.[0])}
      </span>
      <span className="text-[15px] leading-snug text-muted md:text-base">
        {dash(project.year)}
      </span>
      <MediaSlot
        type={project.cover?.src ? "still" : "placeholder"}
        media={project.cover}
        label={project.cover?.placeholder ?? "CLIENT WORK"}
        className="aspect-video min-h-0 w-full max-w-[7.5rem] md:justify-self-end"
      />
    </Link>
  );
}
