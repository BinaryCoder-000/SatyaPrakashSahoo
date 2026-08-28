import { Link } from "react-router";
import { PageMeta } from "../components/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta title="Not found — Satya Prakash Sahoo" />
      <section className="px-6 py-24 md:px-10 lg:px-16">
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">404</p>
        <h1 className="mt-4 font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)] lg:text-[clamp(3.5rem,6vw,5.5rem)]">
          This page is not here.
        </h1>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
        >
          Back home →
        </Link>
      </section>
    </>
  );
}
