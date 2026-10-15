import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeCta } from "@/components/resume-cta";
import { SkillsSection } from "@/components/skills-section";
import { personalInfo } from "@/data/portfolio";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.role,
    email: personalInfo.email,
    telephone: personalInfo.phoneHref.replace("tel:", ""),
    address: personalInfo.location,
    image: personalInfo.profileImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ProjectsSection is a full-bleed dark band, so it sits outside the
          padded container and supplies its own inner container. */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
      </div>
      <ProjectsSection />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <ExperienceSection />
        <EducationSection />
        <ResumeCta />
        <ContactSection />
      </div>
    </>
  );
}
