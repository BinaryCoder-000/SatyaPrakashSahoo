import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { useLocation, useOutlet } from "react-router";
import { Footer } from "../components/Footer";
import { SiteNav } from "../components/SiteNav";
import { easeOutExpo } from "../lib/motion";
import { cx } from "../lib/utils";

export function SiteLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const isHome = location.pathname === "/";
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg">
      <a
        className="absolute left-4 z-[100] -top-full bg-elevated px-4 py-3 text-fg focus:top-4"
        href="#main"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className={cx("flex-1", !isHome && "pt-24")}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="relative">
            <Suspense
              fallback={
                <p className="px-6 py-16 text-meta font-medium uppercase tracking-[0.14em] text-muted md:px-10 lg:px-16">
                  Loading
                </p>
              }
            >
              {outlet}
            </Suspense>
            {reduce ? null : (
              <motion.div
                className="pointer-events-none fixed inset-0 z-[70] bg-bg"
                initial={false}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                aria-hidden="true"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
