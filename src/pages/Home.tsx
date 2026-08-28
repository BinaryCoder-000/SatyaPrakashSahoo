import { useLayoutEffect } from "react";
import { AboutStrip } from "../components/AboutStrip";
import { ChapterClient } from "../components/ChapterClient";
import { ChapterFilm } from "../components/ChapterFilm";
import { ChapterPhoto } from "../components/ChapterPhoto";
import { ContactCta } from "../components/ContactCta";
import { Hero } from "../components/Hero";
import { PageMeta } from "../components/PageMeta";
import { SelectedWork } from "../components/SelectedWork";
import { TypeRule } from "../components/TypeRule";
import { getProjectsByType } from "../content/projects";
import { site } from "../content/site";

export default function Home() {
  const photography = getProjectsByType("photography")[0];
  const film = getProjectsByType("film")[0];
  const clients = getProjectsByType("client");

  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <>
      <PageMeta title={site.defaultTitle} description={site.defaultDescription} path="/" />
      <Hero />
      <SelectedWork />
      <TypeRule />
      <ChapterPhoto cover={photography?.cover} />
      <ChapterFilm cover={film?.cover} />
      <ChapterClient projects={clients} />
      <AboutStrip />
      <ContactCta />
    </>
  );
}
