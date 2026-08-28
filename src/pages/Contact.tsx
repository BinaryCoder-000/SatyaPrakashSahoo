import { PageMeta } from "../components/PageMeta";
import { site } from "../content/site";

const socials = [
  ["Instagram", site.socials.instagram],
  ["YouTube", site.socials.youtube],
  ["Behance", site.socials.behance],
  ["LinkedIn", site.socials.linkedin],
] as const;

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact — Satya Prakash Sahoo" path="/contact" />
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">Have an idea?</p>
        <h1 className="mt-4 max-w-xl font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)] lg:text-[clamp(3.5rem,6vw,5.5rem)]">
          Let's make <span className="font-editorial italic font-normal">something.</span>
        </h1>
        <a
          className="mt-10 inline-flex min-h-11 items-center border-b border-rule pb-1 text-xl font-medium tracking-[-0.02em] md:text-2xl"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>
        <ul className="mt-12 flex flex-col gap-4">
          {socials.map(([label, href]) => (
            <li key={label}>
              <a
                className="text-meta font-medium uppercase tracking-[0.14em] text-muted"
                href={href}
                rel="noreferrer"
              >
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
