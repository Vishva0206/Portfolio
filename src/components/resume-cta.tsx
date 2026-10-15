import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolio";

export function ResumeCta() {
  return (
    <section id="resume" className="scroll-mt-20 py-8">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Full resume</h2>
          <p className="mt-1 text-muted">
            Download the PDF used to build this site, or open it in a new tab.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={personalInfo.resumeUrl} download={personalInfo.resumeFileName}>
              <Download className="size-4" />
              Download resume
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
              <FileText className="size-4" />
              View resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
