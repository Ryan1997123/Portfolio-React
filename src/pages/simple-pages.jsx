import { useState } from "react";
import { projects } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { PageIntro, ProjectCard, SiteLayout } from "./site-layout";

const WORK_FILTERS = [
  { key: "all", labelKey: "workFilterAll" },
  { key: "website", labelKey: "workFilterWebsite" },
  { key: "mobile", labelKey: "workFilterMobile" },
  { key: "saas", labelKey: "workFilterSaas" },
  { key: "booth", labelKey: "workFilterBooth" },
  { key: "graphic", labelKey: "workFilterGraphic" },
];

export function WorkPage() {
  const { t, translateProject } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.type === activeFilter,
  );

  return (
    <SiteLayout>
      <div className="work-page">
        <PageIntro
          className="work-page-intro"
          eyebrow={t("workEyebrow")}
          title={t("workTitle")}
          body={t("workBody")}
        />
        <div className="work-page-filters mx-auto flex max-w-7xl flex-wrap gap-2 px-6 pb-8 sm:px-10 lg:px-14">
          {WORK_FILTERS.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              data-cursor="pointer"
              className={`work-filter-button ${activeFilter === key ? "is-active" : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
        <section className="mx-auto grid max-w-7xl gap-3 px-6 pb-24 sm:px-10 md:grid-cols-2 lg:px-14">
          {filteredProjects.map((rawProject, index) => {
            const project = translateProject(rawProject);
            return <ProjectCard key={project.slug} project={project} index={index} />;
          })}
        </section>
      </div>
    </SiteLayout>
  );
}

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <div className="contact-page">
        <PageIntro
          eyebrow={t("contactEyebrow")}
          title={t("contactTitle")}
          body={t("contactBody")}
        />
        <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-14">
          <a
            href="mailto:ryandesigns970501@gmail.com"
            className="group inline-flex items-center gap-4 border-b border-[#B10E1E] pb-3 text-2xl text-zinc-100 transition-colors hover:text-[#B10E1E] sm:text-4xl"
          >
            {t("emailMe")} {" "}
            <span className="text-[#B10E1E] transition-transform group-hover:translate-x-2">
              ↗
            </span>
          </a>
          <div className="mt-10 flex flex-col gap-4 text-lg text-zinc-300 sm:text-xl">
            <div className="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>631-655-8827</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <span>ryandesigns970501@gmail.com</span>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}