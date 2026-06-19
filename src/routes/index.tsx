import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const experience = [
  {
    company: "Amazon Web Services (AWS) / Graph and Key-Value Databases",
    role: "Software Development Engineer",
    dates: "2023 — 2025",
    location: "",
    bullets: [
      <>Java, C, React/JavaScript, Docker, Lots of AWS services: DynamoDB,
      Lambda, API Gateway, CloudFormation, CloudWatch, 
      etc.<br></br><br></br>
      Notable Products I helped ship: <a href="https://aws.amazon.com/blogs/aws/introducing-amazon-neptune-analytics-a-high-performance-graph-analytics/" target="_blank" className="text-neutral-900 hover:underline">Neptune Analytics Launch, </a>
      <a href="https://aws.amazon.com/blogs/database/use-amazon-neptune-analytics-to-analyze-relationships-in-your-data-faster-part-1-introducing-parquet-and-csv-import-and-export/" target="_blank" className="text-neutral-900 hover:underline">Neptune Analytics Export Feature</a>
      </>
    ],
  },
  {
    company: "Amazon Web Services (AWS) / Graph Databases",
    role: "Software Development Engineer Intern",
    dates: "Summer 2022",
    location: "",
    bullets: [
      <>Java, Python, Shell scripting in Bash</>
    ],
  },
  {
    company: "Shopify / Inventory Management",
    role: "Backend Developer Intern",
    dates: "Fall, 2021",
    location: "",
    bullets: [
      <>Ruby on Rails, React, SQL (MySQL), GraphQL</>
    ],
  },
  {
    company: "Flipp / Backend Data Ingestion",
    role: "Software Engineer Intern",
    dates: "Winter, 2021",
    location: "",
    bullets: [
      <>Ruby on Rails, SQL (PostgreSQL), Kafka, Vanilla HTML/JavaScript</>
    ],
  },
  {
    company: "Verto Health / Full-stack Development",
    role: "Full-stack Developer Intern",
    dates: "Fall, 2020",
    location: "",
    bullets: [
      <>Angular/TypeScript, Ruby on Rails, SQL (PostgreSQL), Python</>
    ],
  },
  {
    company: "Royal Bank of Canada / DevOps",
    role: "Software Developer Intern",
    dates: "Winter 2020",
    location: "",
    bullets: [
      <>Java, Jenkins CI/CD</>
    ],
  },
  {
    company: "Staples Canada",
    role: "Sales Associate",
    dates: "2017 - 2019",
    location: "",
    bullets: [
      <p>First "real" Job :) where I learned a lot of soft skills while talking to lots of people</p>
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
            building infrastructure/systems for graph & key-value databases
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hemant.bhanot01@gmail.com"
                className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
              >
              <Mail className="h-4 w-4" />
                hemant.bhanot01@gmail.com
              </a>
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/in/hemant-bhanot/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
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
              on. My focus is on writing scalable and highly available 
              backend distributed systems. I graduated from University of Toronto 
              with a bachelor's degree in computer science and worked as a Teaching assistant
              for software engineering courses.
            </p>
            <p>
              In my professional career so far, I have worked across roles at AWS, Shopify, Flipp, Verto Health, and RBC, I've
              owned features end-to-end — from design and implementation to
              deployment and on-call — and worked closely with product, design,
              and other engineers to deliver impact for customers. 
            </p>
          </div>
        </section>

        <hr className="border-neutral-200" />

        {/* Experience */}
        <section id="experience" className="py-16 sm:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Experience
          </h2>
          <div className="mt-6">
            <Button asChild variant="ghost">
              <a href="/Hemant-Bhanot-Resume.pdf?v=2" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View Resume
              </a>
            </Button>
          </div>
          <ol className="mt-10 space-y-8">
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
                <div className="mt-4 text-[15px] italic leading-relaxed text-neutral-700">
                  {job.bullets[0]}
                </div>
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
              <p className="text-sm text-neutral-600">
                Teaching Assistant for <a href="https://utsc.calendar.utoronto.ca/course/cscc01h3" target="_blank" className="text-neutral-900 underline">
                  Intro to Software Engineering (CSCC01)
                </a> and <a href="https://utsc.calendar.utoronto.ca/course/cscd01h3" target="_blank" className="text-neutral-900 underline">
                  Engineering Large Software Systems (CSCD01)
                </a>
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
            leaders. The fastest way to reach me is email or a linkedin message.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <a
              href="mailto:hemant.bhanot01@gmail.com"
              className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
            >
              <Mail className="h-4 w-4" />
              hemant.bhanot01@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/hemant-bhanot/"
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
