import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import behanceLogo from "../assets/Ionicons_logo-behance logo.svg";
import githubLogo from "../assets/Ionicons_logo-github logo.svg";
import linkedinLogo from "../assets/LinkedIn_logo_In-Black logo.svg";
import meImage from "../assets/me.png";
import { photography, projects } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { SiteLayout } from "./site-layout";

const skills = [
  "Figma",
  "Framer",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Javascript",
  "React",
  "ReactNative",
  "Python",
  "UX Research",
];

function RotatingIdentity() {
  const { lang, t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const words = t("identityWords");

  useEffect(() => {
    setWordIndex(0);
  }, [lang]);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;
    const interval = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [lang, words?.length]);

  const currentWord = Array.isArray(words)
    ? words[wordIndex % words.length] || ""
    : "";

  return (
    <div className="hero-identity" aria-live="polite">
      <span className="hero-identity-prefix">{t("identityPrefix")}</span>
      <span key={`${lang}-${wordIndex}`} className="hero-identity-word">
        {currentWord}
      </span>
    </div>
  );
}

function MotionPathDesk() {
  return (
    <div className="motion-path-desk" aria-hidden="true">
      <svg viewBox="0 0 160 140" role="presentation">
        <path
          className="motion-path-drawing"
          d="M 18 16 H 132 Q 138 16 138 22 V 78 Q 138 84 132 84 H 18 Q 12 84 12 78 V 22 Q 12 16 18 16 Z"
          pathLength="1"
        />
        <path
          className="motion-path-drawing"
          d="M 75 84 V 105 M 51 112 H 99"
          pathLength="1"
          style={{ "--motion-path-delay": "0.25s" }}
        />
        <path
          className="motion-path-drawing"
          d="M 26 113 H 126 L 143 128 H 9 Z"
          pathLength="1"
          style={{ "--motion-path-delay": "0.5s" }}
        />
        <path
          className="motion-path-drawing motion-path-keys"
          d="M 25 119 H 126 M 34 124 H 116"
          pathLength="1"
          style={{ "--motion-path-delay": "0.7s" }}
        />
        <text className="motion-path-screen-text" x="75" y="55">
          RYAN
        </text>
      </svg>
    </div>
  );
}

function ProjectsIndex() {
  const { t, translateProject } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPoint, setPreviewPoint] = useState({ x: 0, y: 0 });

  return (
    <section className="projects-index">
      <div className="projects-index-intro">
        <h2 className="section-display-heading">{t("projectsTitle")}</h2>
        <p className="projects-index-copy">{t("projectsSub")}</p>
        <Link to="/work" className="projects-index-button">
          VIEW MORE <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div
        className="projects-index-list"
        onMouseLeave={() => setHoveredProject(null)}
      >
        {projects.map((rawProject, index) => {
          const project = translateProject(rawProject);
          return (
            <div key={project.slug} className="project-index-row">
              <Link
                to={`/work/${project.slug}`}
                className="project-index-link"
                onMouseEnter={() => setHoveredProject(project.slug)}
                onFocus={() => setHoveredProject(project.slug)}
                onMouseMove={(event) =>
                  setPreviewPoint({ x: event.clientX, y: event.clientY })
                }
                onBlur={() => setHoveredProject(null)}
              >
                <span>{String(index + 1).padStart(2, "0")}.</span>
                <span>{project.title}</span>
                <span className="project-index-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
              {hoveredProject === project.slug && (
                  <div
                    className={`project-preview project-card-${project.color}`}
                    style={{ left: previewPoint.x + 20, top: previewPoint.y + 20 }}
                    aria-hidden="true"
                  >
                    <div className="project-preview-canvas">
                      <span>CASE STUDY / {project.year}</span>
                      <strong>{project.title}</strong>
                    </div>
                    <span className="project-preview-category">
                      {project.category}
                    </span>
                    <span>{project.summary}</span>
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PhotographyIndex() {
  const featuredPhotos = photography.slice(0, 3);

  return (
    <section className="photography-index">
      <div className="photography-index-intro">
        <h2 className="section-display-heading">PHOTOGRAPHY</h2>
        <p className="photography-index-copy">
          A visual archive of quiet places, passing light, and the details that
          stay with you.
        </p>
        <Link to="/photography" className="projects-index-button">
          VIEW PHOTOGRAPHY <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="photography-index-grid">
        {featuredPhotos.map((photo, index) => (
          <Link
            key={photo.id}
            to="/photography"
            className="photography-index-image photo-placeholder"
            style={{
              backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 0.72), transparent 55%), url(${photo.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <span>
              {String(index + 1).padStart(2, "0")} / {photo.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <div className="home-page">
        <section className="home-hero mx-auto grid min-h-[64vh] w-full max-w-7xl items-stretch gap-12 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-14 lg:pb-10">
          <div className="hero-copy hero-copy-enter flex flex-col gap-5">
            <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">
              AVAILABLE FOR HIRE
            </p>
            <h1 className="max-w-5xl text-balance text-6xl font-medium leading-[0.94] tracking-[-0.07em] sm:text-8xl lg:text-9xl">
              PRODUCT DESIGNER
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
              {t("heroBody")}
            </p>
            <RotatingIdentity />
            <div className="flex flex-wrap gap-4">
              <Link
                to="/work"
                className="w-fit border border-zinc-700 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-100 transition-colors hover:border-[#B10E1E] hover:text-[#B10E1E]"
              >
                {t("exploreWork")} <span className="ml-3">↗</span>
              </Link>
            </div>
          </div>
          <div className="hero-proof lg:mb-3 lg:h-full">
            <div className="hero-portrait-scene">
              <div className="hero-portrait-wrap">
                <span
                  className="hero-portrait-tag"
                >
                  ME
                </span>
                <img className="hero-proof-image" src={meImage} alt="Ryan Monaghan" />
              </div>
              <MotionPathDesk />
            </div>
            <blockquote>
              <em>&ldquo;&thinsp;{t("heroQuote")}&rdquo;</em>
            </blockquote>
            <div className="hero-proof-logos" aria-label="Social profiles">
              <a href="https://www.behance.net" aria-label="Behance">
                <img src={behanceLogo} alt="" />
              </a>
              <a href="https://github.com" aria-label="GitHub">
                <img src={githubLogo} alt="" />
              </a>
              <a href="https://www.linkedin.com" aria-label="LinkedIn">
                <img src={linkedinLogo} alt="" />
              </a>
            </div>
          </div>
          <div className="hero-ticker ticker-strip col-span-full overflow-hidden border-y border-white/10">
            <div className="skills-ticker-track" aria-label={skills.join(", ")}>
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="skills-ticker-group"
                  aria-hidden="true"
                >
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="ticker-item-text whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-6 pb-0 sm:px-10 lg:px-14">
          <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              {t("selectedWork")}
            </h2>
            <Link to="/work" className="text-sm text-zinc-500 hover:text-[#B10E1E]">
              View all ↗
            </Link>
          </div>
        </section>
        <ProjectsIndex />
        <PhotographyIndex />
      </div>
    </SiteLayout>
  );
}