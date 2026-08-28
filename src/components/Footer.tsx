import { site } from "../content/site";

const socialEntries = [
  ["Instagram", site.socials.instagram],
  ["YouTube", site.socials.youtube],
  ["Behance", site.socials.behance],
  ["LinkedIn", site.socials.linkedin],
] as const;

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-rule px-6 py-5 md:px-10 lg:px-16">
      <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
        {site.name}
      </p>
      <a
        className="flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
        href={`mailto:${site.email}`}
      >
        {site.email}
      </a>
      <ul className="flex flex-wrap gap-6">
        {socialEntries.map(([label, href]) => (
          <li key={label}>
            <a
              className="inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
              href={href}
              rel="noreferrer"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
        © 2026 {site.name}
      </p>
    </footer>
  );
}
