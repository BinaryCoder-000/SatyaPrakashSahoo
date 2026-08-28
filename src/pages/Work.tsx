import { ChapterClient } from "../components/ChapterClient";
import { ChapterFilm } from "../components/ChapterFilm";
import { ChapterPhoto } from "../components/ChapterPhoto";
import { PageMeta } from "../components/PageMeta";
import { getProjectsByType } from "../content/projects";

export default function Work() {
  const photo = getProjectsByType("photography")[0];
  const film = getProjectsByType("film")[0];

  return (
    <>
      <PageMeta title="Work — Satya Prakash Sahoo" path="/work" />
      <section className="px-6 pb-8 pt-6 md:px-10 lg:px-16">
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">Index</p>
        <h1 className="mt-3 font-medium tracking-[-0.06em] leading-[0.8] text-[clamp(3.5rem,10vw,8.75rem)]">
          Work
        </h1>
      </section>
      <ChapterPhoto cover={photo?.cover} />
      <ChapterFilm cover={film?.cover} />
      <ChapterClient door />
    </>
  );
}
