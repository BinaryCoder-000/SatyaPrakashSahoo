import { motion, useReducedMotion } from "framer-motion";
import { getProjectsByType, typeLabel } from "../content/projects";
import type { Project, ProjectType } from "../content/types";
import { mediaAspectClass } from "../lib/media";
import { pageEnter } from "../lib/motion";
import { cx } from "../lib/utils";
import { CreditRow } from "./CreditRow";
import { ProjectCover } from "./ProjectCover";

type CollectionIndexProps = {
  type: ProjectType;
  title: string;
  description?: string;
};

const photoLayouts = [
  "md:col-span-3 md:col-start-6 lg:col-span-5 lg:col-start-8",
  "md:col-span-6 md:col-start-1 lg:col-span-8 lg:col-start-1 lg:mt-8",
  "md:col-span-3 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-16",
  "md:col-span-8 lg:col-span-10 lg:col-start-2 lg:mt-12",
] as const;

const filmLayouts = [
  "lg:col-span-12",
  "md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-8",
  "lg:col-span-12",
] as const;

function kickerFor(type: ProjectType): string {
  if (type === "photography") return "Still";
  if (type === "film") return "Moving image";
  return "Editing";
}

export function CollectionIndex({ type, title, description }: CollectionIndexProps) {
  const items = getProjectsByType(type);
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className={type === "film" ? "bg-cinema" : undefined}
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={pageEnter}
    >
      <header className="px-6 pb-10 pt-6 md:px-10 md:pb-12 lg:px-16 lg:pb-16">
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {kickerFor(type)}
        </p>
        <h1 className="mt-3 font-medium tracking-[-0.06em] leading-[0.8] text-[clamp(3.5rem,10vw,8.75rem)]">
          {type === "photography" ? (
            <>
              Photo
              <br />
              graphy
            </>
          ) : (
            title
          )}
        </h1>
        {description ? (
          <p className="mt-8 max-w-md text-base leading-[1.65] text-muted md:text-[17px]">
            {description}
          </p>
        ) : null}
      </header>

      {items.length ? (
        renderCollection(type, items)
      ) : (
        <p className="px-6 pb-24 text-base leading-[1.65] text-muted md:px-10 md:text-[17px] lg:px-16">
          {typeLabel(type)} work is not available yet.
        </p>
      )}
    </motion.div>
  );
}

function renderCollection(type: ProjectType, items: Project[]) {
  if (type === "photography") {
    return (
      <section className="grid grid-cols-1 gap-14 px-6 pb-24 md:grid-cols-8 md:gap-10 md:px-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-20 lg:px-16 lg:pb-32">
        {items.map((project, index) => (
          <ProjectCover
            key={project.id}
            project={project}
            heading="h2"
            priority={index === 0}
            className={cx(photoLayouts[index % photoLayouts.length])}
            mediaClassName={cx("min-h-0", mediaAspectClass(project.cover, "aspect-[3/2]"))}
          />
        ))}
      </section>
    );
  }

  if (type === "film") {
    return (
      <section className="grid grid-cols-1 gap-16 bg-cinema pb-24 md:grid-cols-8 lg:grid-cols-12 lg:gap-y-20 lg:pb-32">
        {items.map((project, index) => {
          const rhythm = index % filmLayouts.length;
          const large = rhythm !== 1;
          return (
            <ProjectCover
              key={project.id}
              project={project}
              heading="h2"
              index={index + 1}
              play
              overlay={large}
              compact={!large}
              priority={index === 0}
              className={cx(
                large ? "lg:col-span-12" : cx("px-6 md:px-10 lg:px-16", filmLayouts[rhythm]),
              )}
              mediaClassName={cx(
                "min-h-0 bg-cinema",
                large && rhythm === 2 ? "aspect-[2.39/1] border-x-0" : "aspect-video",
                large && "border-x-0",
              )}
            />
          );
        })}
      </section>
    );
  }

  return (
    <section className="px-6 pb-24 md:px-10 lg:px-16 lg:pb-32">
      {items.map((project, index) => (
        <CreditRow key={project.id} index={index + 1} project={project} />
      ))}
    </section>
  );
}
