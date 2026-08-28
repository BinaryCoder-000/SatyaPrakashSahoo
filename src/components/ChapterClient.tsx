import { Link } from "react-router";
import type { Project } from "../content/types";
import { CreditRow } from "./CreditRow";

type ChapterClientProps = {
  projects?: Project[];
  door?: boolean;
};

export function ChapterClient({ projects = [], door = false }: ChapterClientProps) {
  return (
    <section className="border-t border-rule px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:pb-32">
      <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">03</p>
      <h2 className="mt-3 font-medium tracking-[-0.05em] leading-[0.85] text-[clamp(3.5rem,9vw,7.5rem)]">
        Client
      </h2>
      {door ? null : (
        <div className="mt-10 md:mt-12">
          {projects.map((project, index) => (
            <CreditRow key={project.id} index={index + 1} project={project} />
          ))}
        </div>
      )}
      <Link
        to="/client"
        className="mt-8 inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
      >
        View edits →
      </Link>
    </section>
  );
}
