import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, FileDown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hemant Bhanot — Software Engineer" },
      {
        name: "description",
        content:
          "Hemant Bhanot is a software engineer with experience at AWS, Shopify, Flipp, and RBC. Building reliable, scalable systems.",
      },
      { property: "og:title", content: "Hemant Bhanot — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software engineer with experience at AWS, Shopify, Flipp, and RBC. Building reliable, scalable systems.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const experience = [
  {
    company: "Amazon Web Services (AWS)",
    role: "Software Development Engineer",
    dates: "2023 — 2025",
    location: "",
    bullets: [
      "Build and operate distributed services powering AWS infrastructure at global scale.",
      "Own features end-to-end across design, implementation, deployment, and on-call.",
      "Partner with senior engineers and PMs to ship customer-impacting improvements each sprint.",
    ],
  },
  {
    company: "Amazon Web Services (AWS)",
    role: "Software Development Engineer Intern",
    dates: "Summer 2022",
    location: "",
    bullets: [
      "Designed and shipped a backend service used by internal teams to streamline a manual workflow.",
      "Returned a full-time offer based on launch impact and operational quality.",
    ],
  },
  {
    company: "Shopify",
    role: "Backend Developer Intern",
    dates: "Fall, 2021",
    location: "",
    bullets: [
      "Built backend features in Ruby on Rails supporting merchant-facing commerce flows.",
      "Improved reliability and observability of a high-traffic service with new metrics and alerts.",
    ],
  },
  {
    company: "Flipp",
    role: "Software Engineer Intern",
    dates: "Winter, 2021",
    location: "",
    bullets: [
      "Delivered new features across the consumer shopping app used by millions of users.",
      "Collaborated with cross-functional teams on A/B-tested improvements to user engagement.",
    ],
  },
  {
    company: "Verto Health",
    role: "Software Engineer Intern",
    dates: "Fall, 2020",
    location: "",
    bullets: [
      "Developed healthcare workflow tooling used by clinicians during the COVID-19 response.",
      "Shipped frontend and backend features on a fast-moving, mission-critical product.",
    ],
  },
  {
    company: "Royal Bank of Canada",
    role: "Software Developer Intern",
    dates: "Winter 2020",
    location: "",
    bullets: [
      "Contributed to internal banking platforms with a focus on data accuracy and automation.",
      "First professional engineering role; established strong foundations in code review and testing.",
    ],
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            Hemant Bhanot
          </a>
          <ul className="hidden gap-7 text-sm text-neutral-600 sm:flex">
            <li><a href="#about" className="hover:text-neutral-900">About</a></li>
            <li><a href="#experience" className="hover:text-neutral-900">Experience</a></li>
            <li><a href="#education" className="hover:text-neutral-900">Education</a></li>
            <li><a href="#contact" className="hover:text-neutral-900">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <p className="text-sm font-medium text-neutral-500">Software Engineer</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hemant Bhanot
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">
            I build reliable & scalable backend systems. Previously a SDE at AWS
            building infrastructure/systems for AWS graph & key-value databases
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="mailto:hemant@example.com">
                <Mail className="h-4 w-4" />
                Email me
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="/resume.pdf" download>
                <FileDown className="h-4 w-4" />
                Download resume
              </a>
            </Button>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* About */}
        <section id="about" className="py-16 sm:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            About
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-neutral-800">
            <p>
              I'm a software engineer who enjoys building systems people depend
              on. My focus is on writing clear code, designing for reliability,
              and shipping work that holds up in production.
            </p>
            <p>
              Across roles at AWS, Shopify, Flipp, Verto Health, and RBC, I've
              owned features end-to-end — from design and implementation to
              deployment and on-call — and worked closely with product, design,
              and other engineers to deliver impact for customers
            </p>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Experience */}
        <section id="experience" className="py-16 sm:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Experience
          </h2>
          <ol className="mt-8 space-y-12">
            {experience.map((job) => (
              <li key={`${job.company}-${job.dates}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">
                      {job.role}
                    </h3>
                    <p className="text-sm text-neutral-600">{job.company}</p>
                  </div>
                  <div className="text-sm text-neutral-500 sm:text-right">
                    <div>{job.dates}</div>
                    {job.location && <div>{job.location}</div>}
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  {job.bullets[0]}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <hr className="border-neutral-200" />

        {/* Education */}
        <section id="education" className="py-16 sm:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Education
          </h2>
          <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">
                University of Toronto
              </h3>
              <p className="text-sm text-neutral-600">
                Honours Bachelor of Science, Computer Science — Graduated with
                Distinction
              </p>
            </div>
            <div className="text-sm text-neutral-500 sm:text-right">
              {"\n"}
            </div>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Contact / Footer */}
        <section id="contact" className="py-16 sm:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Get in touch
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-800">
            I'm always open to conversations with hiring teams and engineering
            leaders. The fastest way to reach me is email.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <a
              href="mailto:hemant@example.com"
              className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
            >
              <Mail className="h-4 w-4" />
              hemant@example.com
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </section>

        <footer className="border-t border-neutral-200 py-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} Hemant Bhanot
        </footer>
      </main>
    </div>
  );
}
