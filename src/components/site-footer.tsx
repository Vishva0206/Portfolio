import { ArrowUp } from "lucide-react";
import { nav, personalInfo, socials } from "@/data/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="editorial-footer on-dark border-t border-border py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">
            {personalInfo.name}
            {personalInfo.availability ? (
              <span className="mt-1 block text-sm font-normal text-muted">
                {personalInfo.availability}
              </span>
            ) : null}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center px-2 hover:text-card"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {socials.length > 0 ? (
          <nav aria-label="Social profiles">
            <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer me"
                    className="inline-flex min-h-11 items-center gap-1.5 px-2 text-accent-soft hover:text-card"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personalInfo.name}
          </p>
          <a href="#home" className="inline-flex min-h-11 items-center gap-2 text-accent-soft">
            <ArrowUp className="size-4" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
