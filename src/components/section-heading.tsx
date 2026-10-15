import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl", className)}>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-ink">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-muted">{description}</p> : null}
      </header>
    </Reveal>
  );
}
