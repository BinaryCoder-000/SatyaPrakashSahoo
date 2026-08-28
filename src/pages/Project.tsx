import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { Gallery } from "../components/Gallery";
import { Lightbox } from "../components/Lightbox";
import { MediaSlot } from "../components/MediaSlot";
import { PageMeta } from "../components/PageMeta";
import {
  getCollectionIndex,
  getNextProject,
  getProjectBySlug,
  typeLabel,
} from "../content/projects";
import type { MediaSlotType, Project } from "../content/types";
import { hasPlayableVideo, mediaAspectClass } from "../lib/media";
import { mediaEnter, nextReveal, pageEnter } from "../lib/motion";
import { cx, padIndex } from "../lib/utils";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  if (!project) {
    return (
      <>
        <PageMeta title="Not found — Satya Prakash Sahoo" path={`/work/${slug}`} />
        <section className="px-6 py-24 md:px-10 lg:px-16">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">404</p>
          <h1 className="mt-4 font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)] lg:text-[clamp(3.5rem,6vw,5.5rem)]">
            This project is not here.
          </h1>
          <Link
            to="/work"
            className="mt-8 inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
          >
            Back to work →
          </Link>
        </section>
      </>
    );
  }

  const gallery = project.gallery ?? [];
  const next = getNextProject(project.slug);
  const number = getCollectionIndex(project.slug);
  const lightboxOpen = lightboxIndex !== null;
  const playableVideos = project.videos?.filter(hasPlayableVideo) ?? [];
  const showCredits = Boolean(project.client || project.roles?.length);
  const hero = heroConfig(project);

  return (
    <>
      <PageMeta
        title={`${project.title} — Satya Prakash Sahoo`}
        path={`/work/${project.slug}`}
      />
      <article className={cx("pb-16", project.type === "film" && "bg-cinema")}>
        <motion.header
          className="px-6 py-10 md:px-10 lg:px-16"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={pageEnter}
        >
          {number ? (
            <p className="text-lg font-medium tracking-[0.12em] text-accent">
              {padIndex(number)}
            </p>
          ) : null}
          <h1 className="mt-3 font-medium tracking-[-0.05em] leading-[0.85] text-[clamp(2.75rem,8vw,6rem)]">
            {project.title}
          </h1>
          <p className="mt-6 text-meta font-medium uppercase tracking-[0.14em] text-muted">
            {typeLabel(project.type)}
            {project.year ? ` · ${project.year}` : null}
          </p>
        </motion.header>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={mediaEnter}
        >
          <MediaSlot
            type={hero.type}
            media={project.cover}
            video={project.videos?.[0]}
            label={project.cover?.placeholder ?? "HERO MEDIA"}
            priority
            play={hero.play}
            className={hero.className}
          />
        </motion.div>

        {project.description ? (
          <p className="mt-12 max-w-xl px-6 text-base leading-[1.65] text-muted md:px-10 md:text-[17px] lg:px-16">
            {project.description}
          </p>
        ) : null}

        {gallery.length ? (
          <div className="mt-16 px-6 md:px-10 lg:px-16">
            <Gallery items={gallery} onSelect={setLightboxIndex} />
          </div>
        ) : null}

        {playableVideos.length ? (
          <section className="mt-16 px-6 md:px-10 lg:px-16">
            <h2 className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
              Video
            </h2>
            <div className="mt-6 grid gap-8">
              {playableVideos.map((video, index) => (
                <MediaSlot
                  key={`${project.id}-video-${index}`}
                  type="video"
                  video={video}
                  media={video.poster ?? project.cover}
                  label={video.poster?.placeholder ?? "FILM"}
                  play={!video.src}
                  className={cx("min-h-0", mediaAspectClass(video, "aspect-video"))}
                />
              ))}
            </div>
          </section>
        ) : null}

        {showCredits ? (
          <dl
            className={cx(
              "mt-16 grid gap-8 px-6 md:px-10 lg:px-16",
              project.type === "client" && "border-t border-rule pt-10",
            )}
          >
            {project.client ? (
              <div>
                <dt className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
                  Client
                </dt>
                <dd className="mt-2 text-base leading-[1.65] md:text-[17px]">{project.client}</dd>
              </div>
            ) : null}
            {project.roles?.length ? (
              <div>
                <dt className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="mt-2 text-base leading-[1.65] md:text-[17px]">
                  {project.roles.join(", ")}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {next ? (
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={nextReveal}
          >
            <Link
              to={`/work/${next.slug}`}
              className="mt-20 flex min-h-11 items-baseline justify-between gap-6 border-t border-rule px-6 py-10 md:px-10 lg:px-16"
            >
              <span className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
                Next →
              </span>
              <span className="text-right text-xl font-medium tracking-[-0.03em] md:text-[2.5rem]">
                {next.title}
              </span>
            </Link>
          </motion.div>
        ) : null}
      </article>

      <Lightbox
        items={gallery}
        index={lightboxIndex ?? 0}
        open={lightboxOpen}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((current) =>
            current === null ? current : (current - 1 + gallery.length) % gallery.length,
          )
        }
        onNext={() =>
          setLightboxIndex((current) =>
            current === null ? current : (current + 1) % gallery.length,
          )
        }
      />
    </>
  );
}

function heroConfig(project: Project): {
  type: MediaSlotType;
  play: boolean;
  className: string;
} {
  if (project.type === "film") {
    return {
      type: "video",
      play: !hasPlayableVideo(project.videos?.[0]),
      className: "aspect-video min-h-0 border-x-0 bg-cinema",
    };
  }

  if (project.type === "photography") {
    return {
      type: project.cover?.src ? "still" : "placeholder",
      play: false,
      className: cx(
        "min-h-0 mx-6 md:mx-10 lg:mx-16 lg:max-w-[70%]",
        mediaAspectClass(project.cover, "aspect-[3/2]"),
      ),
    };
  }

  return {
    type: project.cover?.src ? "still" : "placeholder",
    play: false,
    className: cx("min-h-0 border-x-0", mediaAspectClass(project.cover, "aspect-video")),
  };
}
