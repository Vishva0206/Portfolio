import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/portfolio";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <article
      className="project-card flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.featured ? (
          <span className="rounded-full bg-sage/15 px-2 py-1 text-xs text-sage">
            Featured
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm text-muted">{project.description}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-accent-ink">{project.status}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-surface px-2 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Button type="button" variant="outline" size="sm" onClick={() => onOpen(project)}>
          View details
        </Button>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="editorial-projects scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          className="on-dark"
          eyebrow="Projects"
          title="What I have built"
          description="Production SaaS work, a ranked hackathon, and independent full-stack products. Links are shown only when a URL exists."
        />
        {projects.length === 0 ? (
          <p className="rounded-lg border border-border bg-surface p-6 text-muted">
            No projects match this filter.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpen={setSelected} />
            ))}
          </div>
        )}
      </div>

      <Dialog.Root open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/80" />
          <Dialog.Content className="fixed inset-x-4 top-[8%] z-50 mx-auto max-h-[84dvh] max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-card focus:outline-none">
            {selected ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="text-2xl font-semibold">
                    {selected.title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-md border border-border"
                      aria-label="Close project details"
                    >
                      <X className="size-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="mt-2 text-muted">
                  {selected.description}
                </Dialog.Description>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-accent-ink">Problem</dt>
                    <dd className="mt-1 text-muted">{selected.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-accent-ink">What I built</dt>
                    <dd className="mt-1 text-muted">{selected.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-accent-ink">My contribution</dt>
                    <dd className="mt-1 text-muted">{selected.role}</dd>
                  </div>
                  {selected.outcome ? (
                    <div>
                      <dt className="text-accent-ink">Result</dt>
                      <dd className="mt-1 text-muted">{selected.outcome}</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="mt-5 text-sm text-muted">Status: {selected.status}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.liveUrl ? (
                    <Button asChild size="sm">
                      <a href={selected.liveUrl} target="_blank" rel="noreferrer">
                        Live demo <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  ) : null}
                  {selected.sourceUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={selected.sourceUrl} target="_blank" rel="noreferrer">
                        Source <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  ) : null}
                  {!selected.liveUrl && !selected.sourceUrl ? (
                    <p className="text-sm text-muted">
                      Live demo and source URLs are not listed yet.
                    </p>
                  ) : null}
                  {selected.liveUrl && !selected.sourceUrl ? (
                    <p className="text-sm text-muted">
                      Source code is not published yet.
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
