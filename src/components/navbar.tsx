import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex min-h-11 items-center gap-2 text-fg">
          <span className="grid size-9 place-items-center rounded-md bg-card text-sm font-semibold text-accent-ink">
            {personalInfo.initials}
          </span>
          <span className="hidden font-medium sm:inline">{personalInfo.name}</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className={cn(
                "nav-link inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm transition-colors duration-150",
                active === item.href ? "text-accent-ink" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card transition-transform duration-200 hover:-translate-y-0.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-menu"
          className="mobile-menu border-t border-border bg-surface/95 px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-11 items-center text-base"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full">
                <a href={personalInfo.resumeUrl} download={personalInfo.resumeFileName}>
                  Download resume
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
