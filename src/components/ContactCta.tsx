import { site } from "../content/site";

const socials = [
  ["Instagram", site.socials.instagram],
  ["YouTube", site.socials.youtube],
  ["Behance", site.socials.behance],
  ["LinkedIn", site.socials.linkedin],
] as const;

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-28 border-t border-rule px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:pb-28 lg:pt-32">
      <h2 className="font-medium tracking-[-0.06em] leading-[0.82] text-[clamp(3.5rem,10vw,8rem)]">
        <span className="block">Let's</span>
        <span className="block pl-[12%]">make</span>
        <span className="block pl-[28%] font-editorial italic font-normal">
          something.
        </span>
      </h2>
      <a
        className="mt-10 inline-flex min-h-11 max-w-full items-center break-all border-b border-rule pb-1 text-lg font-medium tracking-[-0.02em] md:text-[28px]"
        href={`mailto:${site.email}`}
      >
        {site.email}
      </a>
      <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-4">
        {socials.map(([label, href]) => (
          <li key={label}>
            <a
              className="inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
              href={href}
              rel="noreferrer"
            >
              {label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
