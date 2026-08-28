import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { typeLabel } from "../content/projects";
import type { Project } from "../content/types";
import { captionHover, coverHover } from "../lib/motion";
import { useFinePointer } from "../lib/useFinePointer";
import { cx, padIndex } from "../lib/utils";
import { MediaSlot } from "./MediaSlot";

type ProjectCoverProps = {
  project: Project;
  className?: string;
  mediaClassName?: string;
  heading?: "h2" | "h3";
  play?: boolean;
  overlay?: boolean;
  compact?: boolean;
  index?: number;
  priority?: boolean;
};

export function ProjectCover({
  project,
  className,
  mediaClassName,
  heading = "h2",
  play = false,
  overlay = false,
  compact = false,
  index,
  priority = false,
}: ProjectCoverProps) {
  const fine = useFinePointer();
  const reduce = useReducedMotion() ?? false;
  const hoverEnabled = fine && !reduce;
  const [hovered, setHovered] = useState(false);
  const active = hoverEnabled && hovered;
  const Title = heading;

  const slotType =
    project.type === "film"
      ? "video"
      : project.cover?.src
        ? "still"
        : "placeholder";

  return (
    <Link
      to={`/work/${project.slug}`}
      className={cx("group relative z-10 block", className)}
      onMouseEnter={() => {
        if (hoverEnabled) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        if (hoverEnabled) setHovered(true);
      }}
      onBlur={() => setHovered(false)}
    >
      <div className="relative overflow-hidden">
        <motion.div
          initial={false}
          animate={active ? "hover" : "rest"}
          variants={coverHover}
        >
          <MediaSlot
            type={slotType}
            media={project.cover}
            label={project.cover?.placeholder ?? project.title}
            className={mediaClassName}
            play={play}
            priority={priority}
          />
        </motion.div>
        {overlay ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-5 md:px-8 md:pb-8">
            {index ? (
              <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
                {padIndex(index)}
              </p>
            ) : null}
            <Title className="mt-1 font-medium tracking-[-0.03em] leading-[0.9] text-[clamp(1.75rem,4vw,3rem)]">
              {project.title}
            </Title>
          </div>
        ) : null}
      </div>
      {overlay ? null : compact ? (
        <p className="mt-3 text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {index ? `${padIndex(index)} — ` : null}
          {project.title}
          {project.year ? ` · ${project.year}` : null}
        </p>
      ) : (
        <>
          <motion.div
            className="mt-3 flex items-baseline justify-between gap-4"
            initial={false}
            animate={hoverEnabled ? (active ? "hover" : "rest") : "hover"}
            variants={captionHover}
          >
            <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
              {typeLabel(project.type)}
              {index ? ` · ${padIndex(index)}` : null}
            </p>
            {project.year ? (
              <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
                {project.year}
              </p>
            ) : null}
          </motion.div>
          <motion.div
            initial={false}
            animate={hoverEnabled ? (active ? "hover" : "rest") : "hover"}
            variants={captionHover}
          >
            <Title className="mt-1 text-xl font-medium leading-snug tracking-[-0.02em] md:text-[22px]">
              {project.title}
            </Title>
          </motion.div>
        </>
      )}
    </Link>
  );
}
