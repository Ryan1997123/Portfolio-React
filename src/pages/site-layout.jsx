import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import behanceLogo from "../assets/Ionicons_logo-behance logo.svg";
import githubLogo from "../assets/Ionicons_logo-github logo.svg";
import linkedinLogo from "../assets/LinkedIn_logo_In-Black logo.svg";
import mouseIcon from "../assets/mouse_icon.svg";
import { LanguageSwitcher } from "../components/ui/LanguageSwitcher";
import { projects } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { getPageMetadata, getStructuredData } from "../seo";
import "./portfolio-pages.css";

function usePageSEO() {
  const { lang, t, translateProject } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;

    const metadata = getPageMetadata(pathname);
    let pageTitle = metadata.title;
    let pageDescription = metadata.description;

    if (pathname === "/about") {
      pageTitle = `${t("aboutEyebrow")} | Ryan Monaghan — Product Designer`;
      pageDescription = t("aboutSummaryCopy");
    } else if (pathname === "/work") {
      pageTitle = `${t("workEyebrow")} | Selected Projects — Ryan Monaghan`;
      pageDescription = t("workBody");
    } else if (pathname.startsWith("/work/")) {
      const slug = pathname.replace("/work/", "");
      const rawProject = projects.find((project) => project.slug === slug);
      if (rawProject) {
        const project = translateProject(rawProject);
        pageTitle = `${project.title} — Case Study | Ryan Monaghan`;
        pageDescription = project.summary || project.description;
      }
    } else if (pathname === "/photography") {
      pageTitle = `${t("photoEyebrow")} | Photographs by Ryan Monaghan`;
      pageDescription = t("photoBody");
    } else if (pathname === "/contact") {
      pageTitle = `${t("contactEyebrow")} | Get in Touch — Ryan Monaghan`;
      pageDescription = t("contactBody");
    }

    document.title = pageTitle;

    const metaUpdates = [
      ['meta[name="title"]', pageTitle],
      ['meta[name="description"]', pageDescription],
      ['meta[name="robots"]', metadata.robots],
      ['meta[property="og:type"]', metadata.ogType],
      ['meta[property="og:url"]', metadata.canonical],
      ['meta[property="og:title"]', pageTitle],
      ['meta[property="og:description"]', pageDescription],
      ['meta[property="og:image"]', metadata.image],
      ['meta[property="og:image:alt"]', metadata.imageAlt],
      ['meta[name="twitter:url"]', metadata.canonical],
      ['meta[name="twitter:title"]', pageTitle],
      ['meta[name="twitter:description"]', pageDescription],
      ['meta[name="twitter:image"]', metadata.image],
      ['meta[name="twitter:image:alt"]', metadata.imageAlt],
    ];

    metaUpdates.forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute("content", content);
    });

    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", metadata.canonical);

    const structuredData = document.querySelector("#seo-structured-data");
    if (structuredData) {
      structuredData.textContent = JSON.stringify(
        getStructuredData({
          ...metadata,
          title: pageTitle,
          description: pageDescription,
        }),
      );
    }
  }, [pathname, lang, t, translateProject]);
}

export function SiteLayout({ children }) {
  const { t } = useLanguage();
  usePageSEO();
  const navItems = [
    ["/", t("home")],
    ["/about", t("about")],
    ["/work", t("work")],
    ["/photography", t("photography")],
    ["/contact", t("contact")],
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorRef = useRef(null);
  const cursorFrameRef = useRef(null);
  const pointerPositionRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const applyCursorPosition = () => {
      cursorFrameRef.current = null;
      const cursorNode = cursorRef.current;
      if (!cursorNode) return;
      const { x, y } = pointerPositionRef.current;
      cursorNode.style.left = `${x}px`;
      cursorNode.style.top = `${y}px`;
    };

    const handlePointerMove = (event) => {
      pointerPositionRef.current = { x: event.clientX, y: event.clientY };
      if (cursorFrameRef.current == null) {
        cursorFrameRef.current = requestAnimationFrame(applyCursorPosition);
      }
    };

    const handlePointerLeave = () => {
      pointerPositionRef.current = { x: -100, y: -100 };
      if (cursorFrameRef.current == null) {
        cursorFrameRef.current = requestAnimationFrame(applyCursorPosition);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (cursorFrameRef.current) cancelAnimationFrame(cursorFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="portfolio-shell min-h-screen bg-[#0A0A0A] text-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:rounded focus:bg-[#B10E1E] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <div
        className="portfolio-cursor"
        ref={cursorRef}
        aria-hidden="true"
        style={{ left: -100, top: -100 }}
      >
        <span className="portfolio-cursor-circle">
          <img className="portfolio-cursor-icon" src={mouseIcon} alt="" />
        </span>
      </div>
      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link to="/" data-cursor="pointer" className="logo-wordmark text-zinc-100">
          Ryan Monaghan
        </Link>
        <nav
          className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className="site-nav-link text-zinc-400">
              {label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            data-cursor="pointer"
            className="relative z-40 flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/15 text-zinc-100 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
        </div>
        {menuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="mobile-navigation absolute inset-x-0 top-0 -z-10 overflow-hidden border-b border-white/10 bg-[#0A0A0A] px-6 pb-8 pt-24 shadow-2xl sm:px-10"
            >
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                <div className="mobile-navigation-curtain h-full w-full bg-[#B10E1E]" />
              </div>
              <div className="mx-auto flex max-w-7xl flex-col gap-5">
                {navItems.map(([path, label], index) => (
                  <div
                    key={path}
                    className="mobile-navigation-item"
                    style={{ animationDelay: `${0.5 + index * 0.06}s` }}
                  >
                    <Link
                      to={path}
                      data-cursor="pointer"
                      className="block border-b border-white/10 pb-3 text-2xl tracking-tight text-zinc-200 transition-colors hover:text-[#B10E1E]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
        )}
      </header>
      <FooterReveal>{children}</FooterReveal>
    </div>
  );
}

function FooterReveal({ children }) {
  const { t } = useLanguage();
  const navItems = [
    ["/", t("home")],
    ["/about", t("about")],
    ["/work", t("work")],
    ["/photography", t("photography")],
    ["/contact", t("contact")],
  ];
  return (
    <div className="footer-reveal-shell">
      <main
        id="main-content"
        tabIndex="-1"
        className="footer-reveal-content focus:outline-none"
      >
        {children}
      </main>
      <footer className="reveal-footer">
        <div className="reveal-footer-fade">
          <div className="reveal-footer-scale">
            <div className="reveal-footer-inner">
              <div className="reveal-footer-columns">
                <section>
                  <h2>{t("quickLinks")}</h2>
                  <nav aria-label="Footer navigation">
                    {navItems.map(([path, label]) => (
                      <Link key={path} to={path}>
                        {label}
                      </Link>
                    ))}
                  </nav>
                </section>
                <section>
                  <h2>{t("getInTouch")}</h2>
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
                <span>{t("codedBy")}</span>
                <span>© 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, body, className = "" }) {
  return (
    <header
      className={`mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 sm:px-10 lg:px-14 lg:pt-14 lg:pb-8 ${className}`}
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

export function ProjectCard({ project, index }) {
  return (
    <article className="project-card-entry">
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
    </article>
  );
}