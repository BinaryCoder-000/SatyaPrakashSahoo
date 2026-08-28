import { getFeaturedProjects } from "../content/projects";
import { cx } from "../lib/utils";
import { ProjectCover } from "./ProjectCover";

const layouts = [
  {
    wrap: "md:col-span-5 md:col-start-4 lg:col-span-8 lg:col-start-5",
    media: "aspect-[3/2] min-h-0",
  },
  {
    wrap: "relative z-20 md:col-span-4 md:col-start-1 lg:col-span-5 lg:col-start-1 lg:-mt-18",
    media: "aspect-[4/5] min-h-0 bg-cinema",
  },
  {
    wrap: "md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-14",
    media: "aspect-[4/5] min-h-0 bg-cinema",
  },
  {
    wrap: "md:col-span-8 lg:col-span-12 lg:mt-20",
    media: "aspect-[2.39/1] min-h-0",
  },
] as const;

export function SelectedWork() {
  const featured = getFeaturedProjects();

  return (
    <section id="work" className="relative scroll-mt-28 px-6 pb-12 pt-16 md:px-10 md:pt-24 lg:px-16 lg:pb-16">
      <h2 className="sr-only">Selected work</h2>
      <p
        className="pointer-events-none absolute left-4 top-4 z-0 select-none font-medium tracking-[-0.06em] leading-[0.8] text-[clamp(4.5rem,14vw,10rem)] text-[#1a1916] md:left-8"
        aria-hidden="true"
      >
        Work
      </p>
      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-8 md:gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
        {featured.map((project, index) => {
          const layout = layouts[index] ?? layouts[layouts.length - 1];
          return (
            <ProjectCover
              key={project.id}
              project={project}
              heading="h3"
              className={cx(layout.wrap)}
              mediaClassName={layout.media}
            />
          );
        })}
      </div>
    </section>
  );
}
