import { site } from "../content/site";

export function TypeRule() {
  return (
    <p className="overflow-hidden border-y border-rule px-6 py-6 text-meta font-medium uppercase tracking-[0.14em] text-muted md:px-10 lg:px-16">
      {site.typeRule}
    </p>
  );
}
