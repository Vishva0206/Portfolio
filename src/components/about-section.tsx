import { SectionHeading } from "@/components/section-heading";
import { personalInfo } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeading
        eyebrow="About"
        title="Who I am"
        description="A software engineer shipping production SaaS work and independent full-stack products."
      />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <p className="text-muted">{personalInfo.longBio}</p>
        </div>
        <aside className="rounded-lg border border-border bg-surface p-6">
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-accent-ink">
            Currently focusing on
          </h3>
          <p className="mt-3 text-muted">{personalInfo.currentlyFocusing}</p>
        </aside>
      </div>
    </section>
  );
}
