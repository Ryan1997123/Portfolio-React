import {
  AnimatePresence,
  motion,
  stagger,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { ScrambleText, Ticker } from "motion-plus/react";
import { DownloadSimple } from "@phosphor-icons/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import behanceLogo from "../assets/Ionicons_logo-behance logo.svg";
import githubLogo from "../assets/Ionicons_logo-github logo.svg";
import linkedinLogo from "../assets/LinkedIn_logo_In-Black logo.svg";
import googleWires from "../assets/gaming_gear/Google_wires.png";
import mazeImage from "../assets/gaming_gear/maze.png";
import researchStudyPlan from "../assets/gaming_gear/UX Research Study Plan1_Page_1.jpg";
import sitemapImage from "../assets/gaming_gear/map.png";
import gamingGearHighFidelity from "../assets/gaming_gear/Highfidelity.png";
import ectrimsBoothHero from "../assets/ectrims_booth/Cenrifki2.png";
import aliceImage from "../assets/ectrims_booth/Alice.png";
import wiresImage from "../assets/ectrims_booth/Wires.png";
import funcAnnoImage from "../assets/ectrims_booth/funcanno.png";
import ectrimsSitemapImage from "../assets/ectrims_booth/sitemap.png";
import icotydeOverview from "../assets/icotyde-overview.webp";
import meImage from "../assets/me.png";
import mouseIcon from "../assets/mouse_icon.svg";
import resumePdf from "../assets/resume/ResumeMyResume.pdf";
import { projects, photography } from "../data/projects";
import "./portfolio-pages.css";

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

const identityWords = [
  "Designer",
  "New Yorker",
  "Developer",
  "UX Expert",
  "Leader",
  "World Traveller",
];

const aboutDetails = [
  ["Location", "New York, NY"],
  ["Languages", "English, Korean, Japanese"],
  ["Currently", "Product Designer"],
  ["Years active", "5+ years of experience"],
];

const aboutPrinciples = [
  "Research first /",
  "Prototype early /",
  "Design for access /",
  "Build with intent /",
];

const navItems = [
  ["/", "Home"],
  ["/about", "About"],
  ["/work", "Work"],
  ["/photography", "Photography"],
  ["/contact", "Contact"],
];

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="portfolio-shell min-h-screen bg-[#0A0A0A] text-zinc-100">
      <div
        className="portfolio-cursor"
        aria-hidden="true"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      >
        <span className="portfolio-cursor-circle">
          <img className="portfolio-cursor-icon" src={mouseIcon} alt="" />
        </span>
      </div>
      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link
          to="/"
          data-cursor="pointer"
          className="logo-wordmark text-zinc-100"
        >
          Ryan Monaghan
        </Link>
        <nav
          className="hidden flex-wrap justify-end gap-x-2 gap-y-2 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className="site-nav-link text-zinc-400">
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          data-cursor="pointer"
          className="relative z-40 flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/15 text-zinc-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-0 -z-10 border-b border-white/10 bg-[#0A0A0A] px-6 pb-8 pt-24 shadow-2xl sm:px-10"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-5">
                {navItems.map(([path, label]) => (
                  <Link
                    key={path}
                    to={path}
                    data-cursor="pointer"
                    className="border-b border-white/10 pb-3 text-2xl tracking-tight text-zinc-200 transition-colors hover:text-[#B10E1E]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <FooterReveal>{children}</FooterReveal>
    </div>
  );
}

function FooterReveal({ children }) {
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const [revealAt, setRevealAt] = useState(0.35);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const updateRevealPoint = () => {
      setRevealAt(
        Math.min(
          0.95,
          Math.max(0.05, footer.offsetHeight / (window.innerHeight || 1)),
        ),
      );
    };

    updateRevealPoint();
    const observer = new ResizeObserver(updateRevealPoint);
    observer.observe(footer);
    window.addEventListener("resize", updateRevealPoint);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRevealPoint);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, revealAt], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, revealAt], [0.9, 1]);
  const blur = useTransform(scrollYProgress, [0, revealAt], [6, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div className="footer-reveal-shell">
      <main ref={contentRef} className="footer-reveal-content">
        {children}
      </main>
      <footer ref={footerRef} className="reveal-footer">
        <motion.div
          className="reveal-footer-fade"
          style={{ opacity: prefersReducedMotion ? 1 : opacity }}
        >
          <motion.div
            className="reveal-footer-scale"
            style={{
              scale: prefersReducedMotion ? 1 : scale,
              filter: prefersReducedMotion ? "blur(0px)" : filter,
            }}
          >
            <div className="reveal-footer-inner">
              <div className="reveal-footer-columns">
                <section>
                  <h2>QUICK LINKS</h2>
                  <nav aria-label="Footer navigation">
                    {navItems.map(([path, label]) => (
                      <Link key={path} to={path}>
                        {label}
                      </Link>
                    ))}
                  </nav>
                </section>
                <section>
                  <h2>GET IN TOUCH</h2>
                  <div className="reveal-footer-socials">
                    <a href="https://github.com" aria-label="GitHub">
                      <img src={githubLogo} alt="" />
                    </a>
                    <a href="https://www.behance.net" aria-label="Behance">
                      <img src={behanceLogo} alt="" />
                    </a>
                    <a href="https://www.linkedin.com" aria-label="LinkedIn">
                      <img src={linkedinLogo} alt="" />
                    </a>
                  </div>
                </section>
              </div>
              <div className="reveal-footer-bottom">
                <span>Coded and designed by Ryan Monaghan</span>
                <span>© 2026</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}

function RotatingIdentity() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % identityWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-identity" aria-live="polite">
      <span className="hero-identity-prefix">Also:</span>
      <ScrambleText
        className="hero-identity-word"
        chars="!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡"
      >
        {identityWords[wordIndex]}
      </ScrambleText>
    </div>
  );
}

function MotionPathDesk() {
  const prefersReducedMotion = useReducedMotion();
  const drawTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 3.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      };

  return (
    <div className="motion-path-desk" aria-hidden="true">
      <svg viewBox="0 0 160 140" role="presentation">
        <motion.path
          className="motion-path-drawing"
          d="M 18 16 H 132 Q 138 16 138 22 V 78 Q 138 84 132 84 H 18 Q 12 84 12 78 V 22 Q 12 16 18 16 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
        <motion.path
          className="motion-path-drawing"
          d="M 75 84 V 105 M 51 112 H 99"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.25 }}
        />
        <motion.path
          className="motion-path-drawing"
          d="M 26 113 H 126 L 143 128 H 9 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.5 }}
        />
        <motion.path
          className="motion-path-drawing motion-path-keys"
          d="M 25 119 H 126 M 34 124 H 116"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.7 }}
        />
        <text className="motion-path-screen-text" x="75" y="55">
          RYAN
        </text>
      </svg>
    </div>
  );
}

function PageIntro({ eyebrow, title, body, className = "" }) {
  return (
    <header
      className={`mx-auto flex h-[64vh] min-h-0 w-full max-w-7xl flex-col gap-5 px-6 pb-8 pt-8 sm:px-10 lg:px-14 lg:pb-10 lg:pt-8 ${className}`}
    >
      <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">
        {eyebrow}
      </p>
      <h1 className="max-w-4xl text-balance text-5xl font-medium tracking-[-0.05em] sm:text-7xl">
        {title}
      </h1>
      {body && (
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
          {body}
        </p>
      )}
    </header>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <Link
        to={`/work/${project.slug}`}
        className={`project-card project-card-${project.color} group flex min-h-80 flex-col justify-between border border-white/10 p-6 transition-colors hover:border-[#B10E1E]/70 sm:p-8`}
      >
        <div className="flex items-start justify-between gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
            0{index + 1}
          </span>
          <span className="text-sm text-zinc-500">{project.year}</span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#B10E1E]">
            {project.category}
          </p>
          <h2 className="text-3xl tracking-tight transition-transform group-hover:translate-x-1">
            {project.title} <span className="text-[#B10E1E]">↗</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

function ProjectsIndex() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPoint, setPreviewPoint] = useState({ x: 0, y: 0 });

  return (
    <section className="projects-index">
      <div className="projects-index-intro">
        <h2 className="section-display-heading">PROJECTS</h2>
        <p className="projects-index-copy">
          A closer look at the work, from first idea to final interaction.
        </p>
        <Link to="/work" className="projects-index-button">
          VIEW MORE <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div
        className="projects-index-list"
        onMouseLeave={() => setHoveredProject(null)}
      >
        {projects.map((project, index) => (
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
            <AnimatePresence>
              {hoveredProject === project.slug && (
                <motion.div
                  className={`project-preview project-card-${project.color}`}
                  style={{
                    left: previewPoint.x + 20,
                    top: previewPoint.y + 20,
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
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

const photographyPlaneLabels = photography.map((photo) => photo.label);
const photographyPlaneCount = photography.length;
const photographyPlaneWidth = 300;
const photographyPlaneGap = -56;

function PhotographyPlane({
  index,
  image,
  scrollX,
  scrollVelocity,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const hoverOffset = useSpring(0, { stiffness: 400, damping: 25 });
  const waveOffset = useSpring(0, { stiffness: 300, damping: 20, mass: 0.3 });
  const planeWidth = photographyPlaneWidth + photographyPlaneGap;
  const totalWidth = planeWidth * photographyPlaneCount;
  const startPosition = index * planeWidth;

  useMotionValueEvent(scrollVelocity, "change", (velocity) => {
    const position = startPosition + scrollX.get();
    const centered = wrap(-totalWidth / 2, totalWidth / 2, position);
    waveOffset.set(
      (velocity / 50) *
        Math.sin((centered / (totalWidth / 2)) * Math.PI * 2) *
        5,
    );
  });

  useEffect(() => {
    hoverOffset.set(isHovered ? -24 : 0);
  }, [hoverOffset, isHovered]);

  const transform = useTransform(() => {
    const centered = wrap(
      -totalWidth / 2,
      totalWidth / 2,
      startPosition + scrollX.get(),
    );
    return `translate3d(${centered}px, ${centered * -0.28 + waveOffset.get() + hoverOffset.get()}px, ${centered * -1.1}px) rotateY(-50deg)`;
  });

  return (
    <motion.article
      className={`photography-plane photo-placeholder photo-placeholder-${(index % 6) + 1}`}
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform,
        zIndex: isHovered ? 100 : 1,
        filter: isHovered ? "brightness(1.15)" : "brightness(1)",
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTap={() => (isHovered ? onHoverEnd() : onHoverStart())}
    >
      <div className="photography-plane-index">
        {String(index).padStart(2, "0")}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="photography-plane-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="photography-plane-label-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
            />
            <div className="photography-plane-label-text">
              <ScrambleText
                active={isHovered}
                duration={stagger(0.05)}
                chars="!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█"
              >
                {photographyPlaneLabels[index % photographyPlaneLabels.length]}
              </ScrambleText>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ScrollVelocityPlanes() {
  const rawScrollX = useMotionValue(0);
  const scrollX = useSpring(rawScrollX, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
  const scrollVelocity = useVelocity(scrollX);
  const containerRef = useRef(null);
  const pointerRef = useRef({ active: false, horizontal: false, x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const handlePointerDown = (event) => {
    pointerRef.current = {
      active: true,
      horizontal: false,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const pointer = pointerRef.current;
    if (!pointer.active) return;

    const deltaX = event.clientX - pointer.x;
    const deltaY = event.clientY - pointer.y;
    if (!pointer.horizontal && Math.abs(deltaX) + Math.abs(deltaY) > 8) {
      pointer.horizontal = Math.abs(deltaX) > Math.abs(deltaY);
    }
    if (!pointer.horizontal) return;

    event.preventDefault();
    rawScrollX.set(rawScrollX.get() + deltaX * 2.5);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };

  const handlePointerEnd = (event) => {
    pointerRef.current.active = false;
    pointerRef.current.horizontal = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return undefined;
    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) return;
      event.preventDefault();
      rawScrollX.set(rawScrollX.get() - event.deltaX);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [prefersReducedMotion, rawScrollX]);

  return (
    <section
      ref={containerRef}
      className="photography-planes-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      aria-label="Interactive photography collection"
    >
      <div className="photography-planes-heading">
        <span>ALL PHOTOS / 2026</span>
        <strong>
          MY BEST SHOTS <sup>({photographyPlaneCount})</sup>
        </strong>
      </div>
      <span className="photography-planes-hint photography-planes-hint-desktop">
        HOLD + DRAG OR SCROLL TO VIEW ALL PHOTOS
      </span>
      <span className="photography-planes-hint photography-planes-hint-mobile">
        SWIPE TO VIEW ALL PHOTOS
      </span>
      <div className="photography-planes-viewport">
        <div className="photography-planes-stage">
          {Array.from({ length: photographyPlaneCount }, (_, index) => (
            <PhotographyPlane
              key={index}
              index={index}
              image={photography[index]?.image}
              scrollX={scrollX}
              scrollVelocity={scrollVelocity}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteLayout>
      <main>
        <section className="home-hero mx-auto grid min-h-[64vh] w-full max-w-7xl items-stretch gap-12 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-14 lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-copy flex flex-col gap-5"
          >
            <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">
              AVAILABLE FOR HIRE
            </p>
            <h1 className="max-w-5xl text-balance text-6xl font-medium leading-[0.94] tracking-[-0.07em] sm:text-8xl lg:text-9xl">
              PRODUCT DESIGNER
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
              I'm Ryan, a designer and developer building identities, digital
              experiences, and visual stories for people with something worth
              saying.
            </p>
            <RotatingIdentity />
            <div className="flex flex-wrap gap-4">
              <Link
                to="/work"
                className="w-fit border border-zinc-700 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-100 transition-colors hover:border-[#B10E1E] hover:text-[#B10E1E]"
              >
                Explore the work <span className="ml-3">↗</span>
              </Link>
            </div>
          </motion.div>
          <div className="hero-proof lg:mb-3 lg:h-full">
            <div className="hero-portrait-scene">
              <div className="hero-portrait-wrap">
                <motion.span
                  className="hero-portrait-tag"
                  animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
                  transition={{
                    duration: 3.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  ME
                </motion.span>
                <img
                  className="hero-proof-image"
                  src={meImage}
                  alt="Ryan Monaghan"
                />
              </div>
              <MotionPathDesk />
            </div>
            <blockquote>
              <em>
                &ldquo;&thinsp;Ryan is dedicated to his craft. He takes careful
                effort to design for software applications, and helped keep our
                team organized rolling out new initiatives.&rdquo;
              </em>
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
            <Ticker
              velocity={40}
              gap={0}
              items={skills.map((skill) => (
                <span
                  key={skill}
                  className="ticker-item-text whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            />
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-6 pb-0 sm:px-10 lg:px-14">
          <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              Selected work
            </h2>
            <Link
              to="/work"
              className="text-sm text-zinc-500 hover:text-[#B10E1E]"
            >
              View all ↗
            </Link>
          </div>
          {/* Original selected-work cards kept for future reuse.
          <div className="grid gap-3 md:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
          */}
        </section>
        <ProjectsIndex />
        <PhotographyIndex />
      </main>
    </SiteLayout>
  );
}

export function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const [factsVisible, setFactsVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);

  return (
    <SiteLayout>
      <main className="about-page">
        <section className="about-hero">
          <motion.header
            className="about-intro"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="about-intro-topline">
              <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">
                <ScrambleText
                  active={!prefersReducedMotion}
                  delay={stagger(0.035)}
                  duration={0.4}
                  chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
                >
                  ABOUT / PROFILE
                </ScrambleText>
              </p>
              <p className="about-intro-note">New York / Product design</p>
            </div>
            <h1 aria-label="Ideas Into Digital Experiences">
              <span className="about-title-line">Ideas Into</span>
              <ScrambleText
                as="span"
                className="about-title-line"
                active={!prefersReducedMotion}
                delay={stagger(0.025, { startDelay: 0.25 })}
                duration={0.55}
                chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+"
                aria-hidden="true"
              >
                Digital Experiences
              </ScrambleText>
            </h1>
          </motion.header>

          <div className="about-story-grid">
            <motion.figure
              className="about-portrait"
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 28,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.2,
                duration: prefersReducedMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="about-portrait-frame"
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              >
                <span className="about-portrait-mark" aria-hidden="true">
                  RM
                </span>
                <motion.img
                  className="about-portrait-image"
                  src={meImage}
                  alt="Ryan Monaghan, product designer"
                  fetchPriority="high"
                  initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
                  animate={{ scale: 1 }}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
              <figcaption>
                <ScrambleText
                  active={!prefersReducedMotion}
                  delay={stagger(0.025)}
                  duration={0.35}
                  chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
                >
                  Ryan Monaghan
                </ScrambleText>
                <span>New York / 2026</span>
              </figcaption>
            </motion.figure>

            <motion.div
              className="about-summary"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.35,
                duration: prefersReducedMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="about-summary-label font-mono">
                Profile / 001
              </span>
              <p className="about-summary-copy">
                I am an empathetic product designer with a foundation in
                computer science and over five years of experience transforming
                complex challenges into intuitive, user-centered digital
                products.
              </p>
              <div className="about-actions">
                <a
                  className="about-action about-action-primary"
                  href="/Ryan-Monaghan-Resume.pdf"
                  download
                >
                  <span>Download resume</span>
                  <DownloadSimple size={18} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.dl
            className="about-facts"
            aria-label="Professional details"
            onViewportEnter={() => setFactsVisible(true)}
            viewport={{ once: true, amount: 0.4 }}
          >
            {aboutDetails.map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 16,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  duration: prefersReducedMotion ? 0 : 0.5,
                }}
              >
                <dt>
                  <ScrambleText
                    active={factsVisible && !prefersReducedMotion}
                    delay={stagger(0.025)}
                    duration={0.3}
                    chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
                  >
                    {label}
                  </ScrambleText>
                </dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </section>

        <div className="about-principles-ticker" aria-label="Design principles">
          <Ticker
            velocity={prefersReducedMotion ? 0 : 34}
            hoverFactor={0.3}
            gap={48}
            items={aboutPrinciples.map((principle) => (
              <span key={principle} className="about-principle-item">
                {principle}
              </span>
            ))}
          />
        </div>

        <motion.section
          className="about-approach"
          onViewportEnter={() => setApproachVisible(true)}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="about-approach-inner">
            <motion.div
              className="about-approach-rule"
              initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <div className="about-approach-heading">
              <span className="font-mono">
                <ScrambleText
                  active={approachVisible && !prefersReducedMotion}
                  delay={stagger(0.035)}
                  duration={0.35}
                  chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
                >
                  01 / Process
                </ScrambleText>
              </span>
              <motion.h2
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Approach
              </motion.h2>
            </div>
            <div className="about-approach-copy">
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.12,
                  duration: prefersReducedMotion ? 0 : 0.7,
                }}
              >
                I work end to end, moving from research and wireframes through
                high-fidelity prototypes and design systems. Each decision starts
                with the people using the product and the real constraints around
                them.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.24,
                  duration: prefersReducedMotion ? 0 : 0.7,
                }}
              >
                My background in business and technology helps me connect user
                needs with viable product decisions, then carry the experience
                through with accessible design and clean, robust code.
              </motion.p>
            </div>
          </div>
        </motion.section>
      </main>
    </SiteLayout>
  );
}

export function WorkPage() {
  return (
    <SiteLayout>
      <main>
        <PageIntro
          className="work-page-intro"
          eyebrow="WORK"
          title="Selected projects."
          body="A mix of identity, interaction, and image-making. Open a project to see the thinking behind it."
        />
        <section className="mx-auto grid max-w-7xl gap-3 px-6 pb-24 sm:px-10 md:grid-cols-2 lg:px-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </section>
      </main>
    </SiteLayout>
  );
}

export function PhotographyPage() {
  return (
    <SiteLayout>
      <main>
        <PageIntro
          className="photography-page-intro"
          eyebrow="PHOTOGRAPHY"
          title="Photographs by Ryan"
          body="Photos I have taken along the way, from places I have visited to details I did not want to forget."
        />
        {/* Previous scroll gallery kept for later: <ScrollPhotographyGallery /> */}
        <ScrollVelocityPlanes />
      </main>
    </SiteLayout>
  );
}

export function ContactPage() {
  return (
    <SiteLayout>
      <main>
        <PageIntro
          eyebrow="CONTACT"
          title="Hiring or building something great? Let’s talk."
          body="For roles, collaborations, commissions, and thoughtful questions, email me directly."
        />
        <section className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-14">
          <a
            href="mailto:ryandesigns970501@gmail.com"
            className="group inline-flex items-center gap-4 border-b border-[#B10E1E] pb-3 text-2xl text-zinc-100 transition-colors hover:text-[#B10E1E] sm:text-4xl"
          >
            Email me here{" "}
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
      </main>
    </SiteLayout>
  );
}


export function CaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const prefersReducedMotion = useReducedMotion();
  const [lightboxImage, setLightboxImage] = useState(null);
  if (!project)
    return (
      <SiteLayout>
        <PageIntro
          eyebrow="404"
          title="Project not found."
          body="That case study does not exist yet."
        />
      </SiteLayout>
    );
  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  useEffect(() => {
    if (!lightboxImage) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  const openLightbox = (image) => setLightboxImage(image);

  return (
    <SiteLayout>
      <main>
        <PageIntro
          eyebrow={`${project.category} / ${project.year}`}
          title={project.title}
          body={project.description}
        />
        <section className="case-study-content mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-14">
          <motion.div
            className="case-study-hero"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition}
          >
            <div
              className={`case-study-visual case-study-visual-clickable case-study-visual-${project.color}${project.heroImage ? " case-study-visual-image" : ""}`}
              role="button"
              tabIndex="0"
              aria-label="Open hero image"
              onClick={() =>
                project.heroImage &&
                openLightbox({ type: "hero", label: project.title, heroImage: project.heroImage })
              }
              onKeyDown={(event) =>
                event.key === "Enter" &&
                project.heroImage &&
                openLightbox({ type: "hero", label: project.title, heroImage: project.heroImage })
              }
            >
              {project.heroImage ? (
                <img
                  src={getHeroImageSource(project.heroImage)}
                  alt={`${project.title} hero image`}
                />
              ) : (
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
                  Case study / {project.title}
                </span>
              )}
            </div>
            <div className="case-study-meta">
              <div>
                <p className="case-study-label">Role</p>
                <p>{project.role}</p>
              </div>
              {project.timeline && (
                <div>
                  <p className="case-study-label">Timeline</p>
                  <p>{project.timeline}</p>
                </div>
              )}
              {project.tools && (
                <div>
                  <p className="case-study-label">Tools</p>
                  <p>{project.tools}</p>
                </div>
              )}
              <div>
                <p className="case-study-label">Outcomes</p>
                <ul>
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          <CaseStudySection
            number="01"
            title="Overview"
            body={project.overview}
            index={0}
            prefersReducedMotion={prefersReducedMotion}
          />
          <CaseStudySection
            number="02"
            title="The Problem"
            body={project.problem}
            index={1}
            prefersReducedMotion={prefersReducedMotion}
          />
          <CaseStudySection
            number="03"
            title="Context & Research"
            body={project.research}
            index={2}
            prefersReducedMotion={prefersReducedMotion}
          >
            <CaseStudyImageGrid
              items={project.researchImages}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
              onOpen={openLightbox}
            />
          </CaseStudySection>
          <motion.section
            className="case-study-section case-study-process"
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 60,
              x: prefersReducedMotion ? 0 : 28,
            }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              ...revealTransition,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            <div className="case-study-section-heading">
              <motion.p
                className="case-study-label"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.16,
                }}
              >
                04 / Process & Iterations
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.22,
                }}
              >
                Finding the clearest path through the work.
              </motion.h2>
            </div>
            <motion.p
              className="case-study-section-copy"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                ...revealTransition,
                delay: prefersReducedMotion ? 0 : 0.28,
              }}
            >
              {project.process}
            </motion.p>
            <CaseStudyImageGrid
              items={project.processImages}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
              onOpen={openLightbox}
            />
          </motion.section>
          <motion.section
            className="case-study-section case-study-solution"
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 60,
              x: prefersReducedMotion ? 0 : -28,
            }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              ...revealTransition,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            <div className="case-study-section-heading">
              <motion.p
                className="case-study-label"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.16,
                }}
              >
                05 / The Solution
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.22,
                }}
              >
                A system designed to make the important parts easier to see.
              </motion.h2>
            </div>
            <motion.p
              className="case-study-section-copy"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                ...revealTransition,
                delay: prefersReducedMotion ? 0 : 0.28,
              }}
            >
              {project.solution}
            </motion.p>
            {project.figmaEmbed ? (
              <FigmaEmbed
                src={project.figmaEmbed}
                title={`${project.title} final design in Figma`}
              />
            ) : (
              <CaseStudyImage
                color={project.color}
                label={project.solutionImage}
                index={2}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={() =>
                  openLightbox({
                    type: "panel",
                    label: project.solutionImage,
                    color: project.color,
                    index: 2,
                  })
                }
              />
            )}
          </motion.section>
          <Link to="/work" className="case-study-back">
            ← Back to work
          </Link>
        </section>
        {lightboxImage && (
          <CaseStudyLightbox
            image={lightboxImage}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </main>
    </SiteLayout>
  );
}

function CaseStudySection({
  number,
  title,
  body,
  index,
  prefersReducedMotion,
  children,
}) {
  const direction = index % 2 === 0 ? -1 : 1;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.06 };

  return (
    <motion.section
      className="case-study-section"
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 60,
        x: prefersReducedMotion ? 0 : direction * 28,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
    >
      <div className="case-study-section-heading">
        <motion.p
          className="case-study-label"
          initial={{
            opacity: 0,
            x: prefersReducedMotion ? 0 : direction * -18,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.14 }}
        >
          {number} / {title}
        </motion.p>
        <motion.h2
          initial={{
            opacity: 0,
            x: prefersReducedMotion ? 0 : direction * -24,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {title}
        </motion.h2>
      </div>
      <motion.p
        className="case-study-section-copy"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.26 }}
      >
        {body}
      </motion.p>
      {children}
    </motion.section>
  );
}

function CaseStudyImageGrid({ items, project, prefersReducedMotion, onOpen }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="case-study-image-grid">
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const image = typeof item === "string" ? null : item.image;
        const key = typeof item === "string" ? item : item.label;
        return (
          <CaseStudyImage
            key={key}
            color={project.color}
            label={label}
            image={image}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
            onOpen={() =>
              onOpen({
                type: "panel",
                label,
                image,
                color: project.color,
                index,
              })
            }
          />
        );
      })}
    </div>
  );
}

function getHeroImageSource(heroImage) {
  return heroImage === "gaming-gear-highfidelity"
    ? gamingGearHighFidelity
    : heroImage === "ectrims-booth-hero"
      ? ectrimsBoothHero
      : icotydeOverview;
}

function CaseStudyImage({
  color,
  label,
  image,
  index,
  prefersReducedMotion,
  onOpen,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const imageSource =
    image === "google-wires"
      ? googleWires
      : image === "maze"
        ? mazeImage
        : image === "research-study-plan"
          ? researchStudyPlan
          : image === "sitemap"
            ? sitemapImage
            : image === "alice"
              ? aliceImage
              : image === "wires"
                ? wiresImage
                : image === "func-anno"
                  ? funcAnnoImage
                  : image === "ectrims-sitemap"
                    ? ectrimsSitemapImage
        : image
          ? `/src/assets/jnj-ico/${image}`
          : null;
  const figureStyle = imageSource
    ? {
        backgroundImage: `url(${imageSource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }
    : {};

  return (
    <motion.figure
      className={`case-study-image case-study-image-${color} case-study-image-${index}`}
      style={figureStyle}
      role="button"
      tabIndex="0"
      aria-label={`Open ${label}`}
      initial={{
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.92,
        rotate: prefersReducedMotion ? 0 : index % 2 === 0 ? -2 : 2,
      }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : index * 0.1,
      }}
      onViewportEnter={() => setIsVisible(true)}
      onClick={onOpen}
      onKeyDown={(event) => event.key === "Enter" && onOpen()}
    >
      {image ? (
        <div
          style={{
            backgroundColor: "#B10E1E",
            color: "white",
            padding: "16px",
            width: "100%",
            boxSizing: "border-box",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "0.02em",
          }}
        >
          <ScrambleText
            active={isVisible && !prefersReducedMotion}
            duration={0.7}
            chars="!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█"
          >
            {label}
          </ScrambleText>
        </div>
      ) : (
        <ScrambleText
          active={isVisible && !prefersReducedMotion}
          duration={0.7}
          chars="!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█"
        >
          {label}
        </ScrambleText>
      )}
    </motion.figure>
  );
}

function FigmaEmbed({ src, title }) {
  return (
    <div className="case-study-figma-embed">
      <iframe src={src} title={title} allowFullScreen />
    </div>
  );
}

function CaseStudyLightbox({ image, onClose }) {
  const imageSource =
    image.image === "google-wires"
      ? googleWires
      : image.image === "maze"
        ? mazeImage
        : image.image === "research-study-plan"
          ? researchStudyPlan
          : image.image === "sitemap"
            ? sitemapImage
            : image.image === "alice"
              ? aliceImage
              : image.image === "wires"
                ? wiresImage
                : image.image === "func-anno"
                  ? funcAnnoImage
                  : image.image === "ectrims-sitemap"
                    ? ectrimsSitemapImage
        : image.image
          ? `/src/assets/jnj-ico/${image.image}`
          : null;
  return (
    <motion.div
      className="case-study-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.label} enlarged`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        className="case-study-lightbox-close"
        aria-label="Close image"
        onClick={onClose}
      >
        ×
      </button>
      <div
        className="case-study-lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        {image.type === "hero" ? (
          <img
            src={getHeroImageSource(image.heroImage)}
            alt={`${image.label} hero image`}
          />
        ) : imageSource ? (
          <img
            src={imageSource}
            alt={image.label}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <div
            className={`case-study-lightbox-panel case-study-image-${image.color} case-study-image-${image.index}`}
          >
            <span>{image.label}</span>
          </div>
        )}
        <p>{image.label}</p>
      </div>
    </motion.div>
  );
}
