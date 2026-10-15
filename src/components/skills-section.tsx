import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/data/portfolio";

const order = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Tools",
  "Practices",
] as const;

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I work with"
        description="Grouped from the resume — no invented proficiency scores."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((category) => {
          const items = skills.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <article
              key={category}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sage">
                {category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
