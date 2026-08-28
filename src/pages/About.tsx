import { PageMeta } from "../components/PageMeta";
import { site } from "../content/site";

export default function About() {
  return (
    <>
      <PageMeta title="About — Satya Prakash Sahoo" path="/about" />
      <section className="max-w-2xl px-6 py-16 md:px-10 lg:px-16">
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">{site.name}</p>
        <h1 className="mt-4 font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)] lg:text-[clamp(3.5rem,6vw,5.5rem)]">
          I see the world in <span className="font-editorial italic font-normal">frames.</span>
        </h1>
        <p className="mt-8 text-base leading-[1.65] text-muted md:text-[17px]">{site.bio}</p>
        <p className="mt-4 text-base leading-[1.65] text-muted md:text-[17px]">{site.bioSecondary}</p>
        <p className="mt-12 text-meta font-medium uppercase tracking-[0.14em] text-muted">
          Foundation copy. Full About composition is Step 5.
        </p>
      </section>
    </>
  );
}
