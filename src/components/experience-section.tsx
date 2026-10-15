import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Experience"
        title="Where I work"
        description="Professional history from the resume only."
      />
      <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.9rem] top-1 size-3 rounded-full bg-accent sm:-left-[2.15rem]"
            />
            <article className="rounded-lg border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-accent-ink">{job.dates}</p>
              </div>
              <p className="mt-1 text-muted">{job.company}</p>
              <p className="mt-2 text-sm text-muted">{job.extra}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-surface px-2 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
