import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { site } from "../content/site";
import { homeSectionIds, homeSections, scrollToSection } from "../lib/homeNav";
import { easeOutExpo, overlayMenu } from "../lib/motion";
import { useActiveSection } from "../lib/useActiveSection";
import { useHideOnScroll } from "../lib/useHideOnScroll";
import { cx } from "../lib/utils";

const routeLinks = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const reduce = useReducedMotion() ?? false;
  const activeSection = useActiveSection(homeSectionIds, isHome);
  const hidden = useHideOnScroll({
    enabled: isHome && !open,
    interacting: interacting || open,
  });

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = [
      buttonRef.current,
      ...(panel ? Array.from(panel.querySelectorAll<HTMLElement>("a, button")) : []),
    ].filter((node): node is HTMLElement => Boolean(node));
    focusables[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) buttonRef.current?.focus();
  }, [open]);

  function goHomeSection(id: string) {
    setOpen(false);
    window.setTimeout(() => {
      scrollToSection(id, reduce);
      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }
    }, open ? 60 : 0);
  }

  return (
    <>
      <motion.header
        className={cx(
          "fixed inset-x-0 top-0 z-50 px-6 pt-7 md:px-10 lg:px-16",
          hidden && "pointer-events-none",
        )}
        initial={false}
        animate={
          hidden
            ? { opacity: 0, y: "-100%" }
            : { opacity: 1, y: 0 }
        }
        transition={
          reduce ? { duration: 0 } : { duration: 0.3, ease: easeOutExpo }
        }
        aria-hidden={hidden || undefined}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setInteracting(false);
          }
        }}
      >
        <div className="relative flex items-center justify-between">
          <NavLink
            to="/"
            className="relative z-50 flex min-h-11 min-w-11 items-center text-meta font-medium uppercase tracking-[0.18em] text-fg"
            onClick={() => setOpen(false)}
          >
            {site.shortName}
          </NavLink>

          <nav
            aria-label="Primary"
            className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          >
            {isHome
              ? homeSections.map((section) => {
                  const active = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      aria-current={active ? "location" : undefined}
                      className={cx(
                        "relative inline-flex min-h-11 items-center px-1 text-[12px] font-medium uppercase tracking-[0.16em]",
                        active ? "text-accent" : "text-fg",
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        goHomeSection(section.id);
                      }}
                    >
                      {section.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-1 bottom-2 h-px bg-accent"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.28, ease: easeOutExpo }
                          }
                        />
                      ) : null}
                    </a>
                  );
                })
              : routeLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cx(
                        "relative inline-flex min-h-11 items-center px-1 text-[12px] font-medium uppercase tracking-[0.16em]",
                        isActive ? "text-accent" : "text-fg",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive ? (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-1 bottom-2 h-px bg-accent"
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.28, ease: easeOutExpo }
                            }
                          />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                ))}
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="relative z-50 min-h-11 min-w-11 px-1 text-meta font-medium uppercase tracking-[0.14em] text-muted md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 md:px-10"
            variants={overlayMenu}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit={reduce ? undefined : "exit"}
            transition={reduce ? { duration: 0 } : undefined}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {isHome
                ? homeSections.map((section) => {
                    const active = activeSection === section.id;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={active ? "location" : undefined}
                        className={cx(
                          "relative flex min-h-11 items-center py-2 font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)]",
                          active && "text-accent",
                        )}
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection(section.id);
                        }}
                      >
                        {section.label}
                        {active ? (
                          <span className="ml-4 h-px w-8 bg-accent" aria-hidden="true" />
                        ) : null}
                      </a>
                    );
                  })
                : routeLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cx(
                          "flex min-h-11 items-center py-2 font-medium tracking-[-0.04em] leading-[0.88] text-[clamp(2.25rem,8vw,3.25rem)]",
                          isActive && "text-accent",
                        )
                      }
                      onClick={() => setOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {isActive ? (
                            <span className="ml-4 h-px w-8 bg-accent" aria-hidden="true" />
                          ) : null}
                        </>
                      )}
                    </NavLink>
                  ))}
            </nav>
            <p className="mt-8 text-meta font-medium uppercase tracking-[0.14em] text-muted">
              {site.role}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
