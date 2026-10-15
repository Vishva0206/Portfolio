import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolio";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject."),
  message: z.string().trim().min(12, "Please write a slightly longer message."),
});

type FormValues = z.infer<typeof schema>;

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: FormValues) {
    try {
      const body = [
        values.message,
        "",
        `— ${values.name}`,
        values.email,
      ].join("\n");
      const href = `${personalInfo.emailHref}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s talk"
        description="Use the form to open an email to me, or copy the details below. There is no hidden backend — messages go through your mail client."
      />
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <a
            href={personalInfo.emailHref}
            className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <Mail className="size-4 text-accent-ink" aria-hidden />
            {personalInfo.email}
          </a>
          <a
            href={personalInfo.phoneHref}
            className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <Phone className="size-4 text-accent-ink" aria-hidden />
            {personalInfo.phone}
          </a>
          <p className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-muted">
            <MapPin className="size-4 text-sage" aria-hidden />
            {personalInfo.location}
          </p>
        </div>
        <form
          className="space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              autoComplete="name"
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="mt-1 text-sm text-danger">{form.formState.errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="mt-1 text-sm text-danger">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
              {...form.register("subject")}
            />
            {form.formState.errors.subject ? (
              <p className="mt-1 text-sm text-danger">{form.formState.errors.subject.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-fg"
              {...form.register("message")}
            />
            {form.formState.errors.message ? (
              <p className="mt-1 text-sm text-danger">{form.formState.errors.message.message}</p>
            ) : null}
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Send className="size-4" />
            {form.formState.isSubmitting ? "Opening mail…" : "Send message"}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-success" role="status">
              Your mail client should open with the message ready. If it does not, email{" "}
              {personalInfo.email} directly.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-danger" role="alert">
              Could not open your mail client. Please email {personalInfo.email}.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
