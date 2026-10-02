import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import behanceLogo from "../assets/Ionicons_logo-behance logo.svg";
import githubLogo from "../assets/Ionicons_logo-github logo.svg";
import linkedinLogo from "../assets/LinkedIn_logo_In-Black logo.svg";
import meImage from "../assets/me-optimized.webp";
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

function PortraitDesignBackdrop({ x, y, prefersReducedMotion }) {
  const drift = (distance, duration, delay = 0) => ({
    initial: false,
    animate: { y: prefersReducedMotion ? 0 : [0, distance, 0] },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, ease: "easeInOut" },
  });

  return (
    <motion.div
      className="hero-design-backdrop"
      aria-hidden="true"
      style={{ x, y }}
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.9 }}
    >
      <svg viewBox="0 0 440 360" fill="none" role="presentation">
        <g className="hero-design-guides">
          <path d="M40 90H400 M40 270H400 M110 28V332 M330 28V332" />
          <circle cx="220" cy="180" r="142" strokeDasharray="3 8" />
          <path d="M30 180H48 M39 171V189 M392 180H410 M401 171V189" />
        </g>
        <motion.g {...drift(-8, 6)}>
          <g className="hero-design-wireframe" transform="rotate(-12 84 100)">
            <rect x="30" y="42" width="108" height="116" rx="4" />
            <path d="M30 62H138 M42 52H46 M51 52H55 M60 52H64" />
            <rect x="42" y="75" width="84" height="34" rx="2" />
            <path d="M42 122H104 M42 132H87 M42 142H112 M48 102L67 84L81 96L96 83L120 102" />
          </g>
        </motion.g>
        <motion.g {...drift(8, 7, 0.4)}>
          <g className="hero-design-wireframe" transform="rotate(12 366 220)">
            <rect x="334" y="154" width="64" height="128" rx="8" />
            <path d="M355 163H377 M344 238H388 M344 247H372" />
            <rect x="344" y="178" width="44" height="48" rx="2" />
            <rect x="344" y="257" width="44" height="12" rx="2" />
            <path d="M356 196L366 187L376 196 M366 187V215" />
          </g>
        </motion.g>
        <path
          className="hero-design-skyline"
          d="M46 318H65V292H85V305H104V279H127V299H149V272H165V254H174V234H178V254H187V272H201V307H227V284H250V300H272V269H292V292H310V306H333V281H354V300H376V318H394"
        />
        <motion.g {...drift(4, 8)}>
          <g className="hero-design-handles">
            <path d="M60 248L93 51 M347 309L383 112" />
            <circle cx="93" cy="51" r="4" />
            <circle cx="347" cy="309" r="4" />
          </g>
          <motion.path
            className="hero-design-curve"
            d="M60 248C93 51 347 309 383 112"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: "easeInOut" }}
          />
          <g className="hero-design-anchors">
            <rect x="55" y="243" width="10" height="10" />
            <rect x="378" y="107" width="10" height="10" />
          </g>
        </motion.g>
        <motion.g
          initial={false}
          animate={prefersReducedMotion ? { x: 0, y: 0 } : { x: [0, 10, -4, 0], y: [0, 8, 3, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <g className="hero-design-cursor" transform="rotate(-14 312 76)">
            <path d="M312 56V88L321 80L328 94L335 90L328 77H340Z" />
          </g>
        </motion.g>
      </svg>
    </motion.div>
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
        {projects.slice(0, 3).map((rawProject, index) => {
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
          >
            <img
              src={photo.image}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
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
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backdropX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const backdropY = useSpring(pointerY, { stiffness: 90, damping: 20 });

  const moveBackdrop = (event) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  };

  const resetBackdrop = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      pointerX.set(0);
      pointerY.set(0);
    }
  }, [prefersReducedMotion, pointerX, pointerY]);

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
            <div
              className="hero-portrait-scene"
              onPointerMove={moveBackdrop}
              onPointerLeave={resetBackdrop}
              onPointerCancel={resetBackdrop}
            >
              <PortraitDesignBackdrop x={backdropX} y={backdropY} prefersReducedMotion={prefersReducedMotion} />
              <div className="hero-portrait-wrap">
                <span
                  className="hero-portrait-tag"
                >
                  ME
                </span>
                <img className="hero-proof-image" src={meImage} alt="Ryan Monaghan" />
              </div>
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
            <p className="sr-only">Skills: {skills.join(", ")}</p>
            <div className="skills-ticker-track">
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
        <section className="projects-index-header">
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