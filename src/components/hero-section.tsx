import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="home"
      className="studio-hero relative scroll-mt-20 overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-0"
      />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="fade-up space-y-6">
          <div className="hero-badge-wrap">
            <p className="hero-eyebrow">{personalInfo.greeting}</p>
            {personalInfo.availability ? (
              <p className="hero-badge mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent-ink backdrop-blur-sm">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                {personalInfo.availability}
              </p>
            ) : null}
          </div>
          <div className="hero-text-wrap">
            <h1 className="text-[clamp(2.75rem,7.5vw,5.5rem)] font-semibold">
              {personalInfo.name}
            </h1>
            <p className="mt-3 text-xl text-muted sm:text-2xl">{personalInfo.role}</p>
          </div>
          <p className="max-w-xl text-lg text-muted">{personalInfo.shortBio}</p>
          <ul className="flex flex-wrap gap-2">
            {personalInfo.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="hero-cta">
              <a href="#projects">
                View my work
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="hero-cta">
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4 text-accent-ink" aria-hidden />
            {personalInfo.location}
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="profile-orbit absolute -inset-8 rounded-[2rem]"
          />
          <figure className="profile-card relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-2 shadow-card">
            <img
              src={personalInfo.profileImage}
              alt="Portrait of Vishva N R in professional attire"
              width={640}
              height={800}
              className="profile-image aspect-4/5 w-full rounded-[1.3rem] object-cover object-top"
            />
            <figcaption className="border-t border-border bg-card px-4 py-3">
              <p className="font-medium">{personalInfo.name}</p>
              <p className="text-sm text-muted">{personalInfo.role}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
