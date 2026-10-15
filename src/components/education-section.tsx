import { SectionHeading } from "@/components/section-heading";
import { certifications, education } from "@/data/portfolio";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeading eyebrow="Education" title="Study and certifications" />
      <ol className="divide-y divide-border rounded-lg border border-border bg-card">
        {education.map((ed) => (
          <li
            key={`${ed.school}-${ed.year}-${ed.credential}`}
            className="grid gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
          >
            <div>
              <p className="font-medium">{ed.credential}</p>
              <p className="text-sm text-muted">{ed.school}</p>
            </div>
            <p className="text-sm text-accent-ink">
              {ed.year} · {ed.score}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {certifications.map((item) => (
          <article key={item.title} className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-medium">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
