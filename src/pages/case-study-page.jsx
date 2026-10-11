import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ScrambleText } from "motion-plus/react";
import { Children, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import googleWires from "../assets/gaming_gear/Google_wires.png";
import mazeImage from "../assets/gaming_gear/maze.png";
import researchStudyPlan from "../assets/gaming_gear/UX Research Study Plan1_Page_1.jpg";
import sitemapImage from "../assets/gaming_gear/map.png";
import aliceImage from "../assets/ectrims_booth/Alice.png";
import wiresImage from "../assets/ectrims_booth/Wires.png";
import funcAnnoImage from "../assets/ectrims_booth/funcanno.png";
import ectrimsSitemapImage from "../assets/ectrims_booth/sitemap.png";
import sibosFinal from "../assets/sibos_tote/final_design.png";
import sibosConcept1 from "../assets/sibos_tote/initial_concept1.png";
import sibosConcept2 from "../assets/sibos_tote/initial_concept2.png";
import sibosPremium from "../assets/sibos_tote/premium.png";
import icotydeProcess1 from "../assets/jnj-ico/example1.png";
import icotydeProcess2 from "../assets/jnj-ico/example2.png";
import sftLowFi1 from "../assets/secure_file_transfer/lofi-1.png";
import sftLowFi2 from "../assets/secure_file_transfer/lofi-2.png";
import sftHighFi1 from "../assets/secure_file_transfer/artboard-11.png";
import lillyBoothSchematic from "../assets/lilly_booth/schematic.webp";
import lillyBoothScreen1 from "../assets/lilly_booth/1.png";
import lillyBoothScreen3 from "../assets/lilly_booth/3.png";
import lillyBoothScreen4 from "../assets/lilly_booth/4.png";
import lillyBoothScreen5 from "../assets/lilly_booth/5.png";
import lillyBoothScreen6 from "../assets/lilly_booth/6.png";
import lillyBoothScreen7 from "../assets/lilly_booth/7.png";
import lillyBoothScreen8 from "../assets/lilly_booth/8.png";
import lillyBoothScreen9 from "../assets/lilly_booth/9.png";
import lillyBoothScreen10 from "../assets/lilly_booth/10.png";
import imaavySitemap from "../assets/imaavy caregiver/Typography.png";
import imaavyDesktopAccessibility from "../assets/imaavy caregiver/2_03_1.2 Home - AccessiBe Expanded.png";
import imaavyDesktopHome from "../assets/imaavy caregiver/2_05_1.4 Home_Opt4.png";
import imaavyDesktopGmg from "../assets/imaavy caregiver/2_07_1.6 About gMG.png";
import imaavyDesktopAbout from "../assets/imaavy caregiver/2_09_1.9 About IMAAVY - MG-ADL.png";
import imaavyDesktopGetStarted from "../assets/imaavy caregiver/2_12_1.12 Get Started.png";
import imaavyDesktopResources from "../assets/imaavy caregiver/2_15_1.15 Resources.png";
import imaavyDesktopLookup from "../assets/imaavy caregiver/2_17_1.18 Lookup.png";
import imaavyMobileLanding from "../assets/imaavy caregiver/3_02_2.1 Landing.png";
import imaavyMobileHome from "../assets/imaavy caregiver/3_04_2.6 Home.png";
import imaavyMobileHomeExtended from "../assets/imaavy caregiver/3_08_2.5 Home.png";
import imaavyMobileGmg from "../assets/imaavy caregiver/3_09_2.7 About gMG.png";
import imaavyMobileAbout from "../assets/imaavy caregiver/3_10_2.9 About IMAAVY.png";
import imaavyMobileGetStarted from "../assets/imaavy caregiver/3_12_2.11 Get Started.png";
import imaavyMobileResources from "../assets/imaavy caregiver/3_14_2.13 Resources.png";
import imaavyMobileLookup from "../assets/imaavy caregiver/3_18_2.19 Lookup.png";
import imaavyMobileLookupMap from "../assets/imaavy caregiver/3_18_2.19 Lookup-1.png";
import { getHeroImageSource } from "../data/project-images";
import { projects } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { PageIntro, ProjectMockup, SiteLayout } from "./site-layout";

const sftFinalImages = Object.fromEntries(
  Object.entries(
    import.meta.glob("../assets/secure_file_transfer/final/*.png", {
      eager: true,
      import: "default",
    }),
  ).map(([path, image]) => {
    const index = path.match(/screen-(\d+)\.png$/)[1];
    return [`sft-final-${index}`, image];
  }),
);

const caseStudyImages = {
  "google-wires": googleWires,
  maze: mazeImage,
  "research-study-plan": researchStudyPlan,
  sitemap: sitemapImage,
  alice: aliceImage,
  wires: wiresImage,
  "func-anno": funcAnnoImage,
  "ectrims-sitemap": ectrimsSitemapImage,
  "sibos-final": sibosFinal,
  "sibos-concept1": sibosConcept1,
  "sibos-concept2": sibosConcept2,
  "sibos-premium": sibosPremium,
  "example1.png": icotydeProcess1,
  "example2.png": icotydeProcess2,
  "sft-lowfi-1": sftLowFi1,
  "sft-lowfi-2": sftLowFi2,
  "sft-highfi-1": sftHighFi1,
  "lilly-booth-schematic": lillyBoothSchematic,
  "lilly-booth-screen-1": lillyBoothScreen1,
  "lilly-booth-screen-3": lillyBoothScreen3,
  "lilly-booth-screen-4": lillyBoothScreen4,
  "lilly-booth-screen-5": lillyBoothScreen5,
  "lilly-booth-screen-6": lillyBoothScreen6,
  "lilly-booth-screen-7": lillyBoothScreen7,
  "lilly-booth-screen-8": lillyBoothScreen8,
  "lilly-booth-screen-9": lillyBoothScreen9,
  "lilly-booth-screen-10": lillyBoothScreen10,
  "lilly-booth-hero": getHeroImageSource("lilly-booth-hero"),
  "imaavy-caregiver-sitemap": imaavySitemap,
  "imaavy-caregiver-desktop-landing": getHeroImageSource("imaavy-caregiver-hero"),
  "imaavy-caregiver-desktop-accessibility": imaavyDesktopAccessibility,
  "imaavy-caregiver-desktop-home": imaavyDesktopHome,
  "imaavy-caregiver-desktop-gmg": imaavyDesktopGmg,
  "imaavy-caregiver-desktop-about": imaavyDesktopAbout,
  "imaavy-caregiver-desktop-get-started": imaavyDesktopGetStarted,
  "imaavy-caregiver-desktop-resources": imaavyDesktopResources,
  "imaavy-caregiver-desktop-lookup": imaavyDesktopLookup,
  "imaavy-caregiver-mobile-landing": imaavyMobileLanding,
  "imaavy-caregiver-mobile-home": imaavyMobileHome,
  "imaavy-caregiver-mobile-home-extended": imaavyMobileHomeExtended,
  "imaavy-caregiver-mobile-gmg": imaavyMobileGmg,
  "imaavy-caregiver-mobile-about": imaavyMobileAbout,
  "imaavy-caregiver-mobile-get-started": imaavyMobileGetStarted,
  "imaavy-caregiver-mobile-resources": imaavyMobileResources,
  "imaavy-caregiver-mobile-lookup": imaavyMobileLookup,
  "imaavy-caregiver-mobile-lookup-map": imaavyMobileLookupMap,
  ...sftFinalImages,
};

const PROJECT_PASSWORD = "Ryanswork123@";
const UNLOCK_STORAGE_KEY = "portfolio-projects-unlocked";

function resolveCaseStudyImage(imageKey) {
  return caseStudyImages[imageKey] || null;
}

export function CaseStudyPage() {
  const { t, translateProject } = useLanguage();
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const rawProject = projects[projectIndex];
  const project = translateProject(rawProject);
  const nextProject =
    projectIndex !== -1 && projectIndex < projects.length - 1
      ? translateProject(projects[projectIndex + 1])
      : null;
  const prefersReducedMotion = useReducedMotion();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "true");
  }, []);

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

  if (!project) {
    return (
      <SiteLayout>
        <PageIntro
          eyebrow="404"
          title="Project not found."
          body="That case study does not exist yet."
        />
      </SiteLayout>
    );
  }

  if (project.protected && !unlocked) {
    return (
      <SiteLayout>
        <PasswordGate
          title={project.title}
          onUnlock={() => {
            sessionStorage.setItem(UNLOCK_STORAGE_KEY, "true");
            setUnlocked(true);
          }}
        />
      </SiteLayout>
    );
  }

  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  const openLightbox = (image) => setLightboxImage(image);

  return (
    <SiteLayout>
      <div className={`case-study-page${project.slug === "imaavy-caregiver-resource" ? " imaavy-case-study" : ""}`}>
        <PageIntro
          className={project.slug === "imaavy-caregiver-resource" ? "imaavy-case-study-intro" : ""}
          eyebrow={[project.category, project.year].filter(Boolean).join(" / ")}
          title={project.title}
          body={project.description}
        />
        <section className="case-study-content mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-14">
          <motion.div
            className={`case-study-hero${project.heroScreens || project.thumbnail ? " case-study-hero-responsive" : ""}`}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={revealTransition}
          >
            {project.thumbnail ? (
              <div
                className="case-study-thumbnail-hero"
                role="img"
                aria-label={`${project.title} design preview`}
              >
                <ProjectMockup thumbnail={project.thumbnail} />
              </div>
            ) : (<div
              className={`case-study-visual case-study-visual-clickable case-study-visual-${project.color}${project.heroImage ? " case-study-visual-image" : ""}`}
              role="button"
              tabIndex="0"
              aria-label="Open hero image"
              onClick={() =>
                project.heroImage &&
                openLightbox({
                  type: "hero",
                  label: project.title,
                  heroImage: project.heroImage,
                })
              }
              onKeyDown={(event) =>
                event.key === "Enter" &&
                project.heroImage &&
                openLightbox({
                  type: "hero",
                  label: project.title,
                  heroImage: project.heroImage,
                })
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
            </div>)}
            {project.heroScreens && (
              <div className="case-study-hero-image-links">
                {project.heroScreens.map(({ label, image }) => (
                  <a key={image} href={resolveCaseStudyImage(image)} target="_blank" rel="noopener noreferrer">
                    {label}: {t("viewFullSizeImage")}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> ({t("opensInNewTab")})</span>
                  </a>
                ))}
              </div>
            )}
            {project.liveUrl && (
              <div className="case-study-live-action">
                <a
                  className="case-study-live-button"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("viewLiveWebsite")}
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> ({t("opensInNewTab")})</span>
                </a>
              </div>
            )}
            <div className="case-study-meta">
              <div>
                <p className="case-study-label">{t("roleHeading")}</p>
                <p>{project.role}</p>
              </div>
              {project.timeline && (
                <div>
                  <p className="case-study-label">{t("timelineHeading")}</p>
                  <p>{project.timeline}</p>
                </div>
              )}
              {project.tools && (
                <div>
                  <p className="case-study-label">{t("toolsHeading")}</p>
                  <p>{project.tools}</p>
                </div>
              )}
              <div>
                <p className="case-study-label">{t("impactHeading")}</p>
                <ul>
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          <HorizontalScrollSections
            enabled={project.horizontalSections}
            prefersReducedMotion={prefersReducedMotion}
          >
          <CaseStudySection
            number="01"
            title={t("overview").replace(/^01 \/ /, "")}
            body={project.overview}
            index={0}
            prefersReducedMotion={prefersReducedMotion}
          />
          <CaseStudySection
            number="02"
            title={t("challenge").replace(/^02 \/ /, "")}
            body={project.problem}
            index={1}
            prefersReducedMotion={prefersReducedMotion}
          />
          <CaseStudySection
            number="03"
            title={t("researchLabel").replace(/^03 \/ /, "")}
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
            id="case-study-section-04"
            tabIndex={-1}
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
                {t("processLabel")}
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
                {t("processSub")}
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
            {project.processImageLayout === "carousel" ? (
              <CaseStudyMediaCarousel
                items={project.processImages}
                project={project}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openLightbox}
              />
            ) : (
              <CaseStudyImageGrid
                items={project.processImages}
                project={project}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openLightbox}
              />
            )}
          </motion.section>
          <motion.section
            id="case-study-section-05"
            tabIndex={-1}
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
                {t("solutionLabel")}
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
                {t("solutionSub")}
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
            {!project.figmaEmbedAtEnd && (project.figmaEmbed ? (
              <FigmaEmbed
                src={project.figmaEmbed}
                title={`${project.title} final design in Figma`}
              />
            ) : (
              <CaseStudyImage
                color={project.color}
                label={project.solutionImage}
                image={project.solutionImageKey}
                index={2}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={() =>
                  openLightbox({
                    type: "panel",
                    label: project.solutionImage,
                    image: project.solutionImageKey,
                    color: project.color,
                    index: 2,
                  })
                }
              />
            ))}
          </motion.section>
          {project.finalImages && project.finalImages.length > 0 && (
            <CaseStudyCarousel
              items={project.finalImages}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
              onOpen={openLightbox}
            />
          )}
          </HorizontalScrollSections>
          {project.resourceLinks && (
            <div className="case-study-resource-links">
              {project.resourceLinks.map(({ labelKey, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  {t(labelKey)}
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> ({t("opensInNewTab")})</span>
                </a>
              ))}
            </div>
          )}
          {project.figmaEmbedAtEnd && (
            <section className="case-study-bottom-figma" aria-labelledby="case-study-figma-heading">
              <div className="case-study-section-heading">
                <h2 id="case-study-figma-heading">{t("fullDesignHeading")}</h2>
              </div>
              <FigmaEmbed
                src={project.figmaEmbed}
                title={`${project.title} final design in Figma`}
              />
            </section>
          )}
          <nav className="case-study-nav" aria-label={t("work")}>
            <Link to="/work" className="case-study-back">
              <ArrowLeft aria-hidden="true" />
              <span>{t("backToWork")}</span>
            </Link>
            {nextProject && (
              <Link to={`/work/${nextProject.slug}`} className="case-study-next">
                <span className="case-study-next-copy">
                  <span className="case-study-next-label">{t("nextProject")}</span>
                  <span className="case-study-next-title">{nextProject.title}</span>
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </nav>
        </section>
        {lightboxImage && (
          <CaseStudyLightbox
            image={lightboxImage}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </div>
    </SiteLayout>
  );
}

function PasswordGate({ title, onUnlock }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") navigate("/work");
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === PROJECT_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPassword("");
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="password-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-gate-title"
    >
      <form className="password-gate-panel" onSubmit={handleSubmit}>
        <p className="case-study-label">Protected project</p>
        <h2 id="password-gate-title">{title}</h2>
        <p className="password-gate-copy">
          This case study is password protected. Enter the password to view it.
        </p>
        <label htmlFor="password-gate-input" className="sr-only">
          Password
        </label>
        <input
          id="password-gate-input"
          ref={inputRef}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
          aria-invalid={error}
          aria-describedby={error ? "password-gate-error" : undefined}
        />
        {error && (
          <p id="password-gate-error" className="password-gate-error" role="alert">
            Incorrect password. Please try again.
          </p>
        )}
        <div className="password-gate-actions">
          <Link to="/work" className="password-gate-cancel">
            Cancel
          </Link>
          <button type="submit" className="password-gate-submit">
            Unlock
          </button>
        </div>
      </form>
    </div>
  );
}

const sectionLabelKeys = ["overview", "challenge", "researchLabel", "processLabel", "solutionLabel", "finalImagesLabel"];

function HorizontalScrollSections({ enabled, prefersReducedMotion, children }) {
  const [isWideViewport, setIsWideViewport] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const update = () => setIsWideViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [enabled]);

  if (!enabled || prefersReducedMotion || !isWideViewport) return children;
  return <HorizontalScrollTrack>{children}</HorizontalScrollTrack>;
}

function HorizontalScrollTrack({ children }) {
  const { t } = useLanguage();
  const panels = Children.toArray(children).filter(Boolean);
  const outerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const lastIndex = Math.max(panels.length - 1, 1);

  useEffect(() => {
    const measure = () => {
      const lastPanel = trackRef.current?.lastElementChild;
      if (!lastPanel || !viewportRef.current) return;
      // Use panel geometry; scrollWidth also includes the translated parallax numbers.
      setDistance(Math.max(0, lastPanel.offsetLeft + lastPanel.offsetWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(Math.round(value * lastIndex));
  });

  // Keyboard focus inside an off-screen panel scrolls the page to the matching horizontal position.
  const handleFocus = (event) => {
    const panel = event.target.closest("[data-panel-index]");
    if (!panel || !outerRef.current) return;
    const index = Number(panel.dataset.panelIndex);
    const top = outerRef.current.getBoundingClientRect().top + window.scrollY;
    const target = top + (index / lastIndex) * distance;
    if (Math.abs(window.scrollY - target) > 2) window.scrollTo({ top: target, behavior: "instant" });
  };

  return (
    <div
      ref={outerRef}
      className="case-study-horizontal-scroll"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div ref={viewportRef} className="case-study-horizontal-viewport" onFocus={handleFocus}>
        <motion.div ref={trackRef} className="case-study-horizontal-track" style={{ x }}>
          {panels.map((panel, index) => (
            <HorizontalScrollPanel
              key={panel.key ?? index}
              index={index}
              lastIndex={lastIndex}
              progress={scrollYProgress}
            >
              {panel}
            </HorizontalScrollPanel>
          ))}
        </motion.div>
        <div className="case-study-horizontal-progress" aria-hidden="true">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
          </span>
          <span className="case-study-horizontal-progress-label">
            {t(sectionLabelKeys[activeIndex] ?? sectionLabelKeys[0]).replace(/^\d+ \/ /, "")}
          </span>
          <span className="case-study-horizontal-progress-bar">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </span>
        </div>
      </div>
    </div>
  );
}

function HorizontalScrollPanel({ index, lastIndex, progress, children }) {
  const center = index / lastIndex;
  const step = 1 / lastIndex;
  // Keep offsets inside 0–1 so Motion can hardware-accelerate the scroll timeline.
  const points = [
    index > 0 && [center - step, 0],
    [center, 1],
    index < lastIndex && [center + step, 2],
  ].filter(Boolean);
  const range = points.map(([offset]) => offset);
  const pick = (values) => points.map(([, slot]) => values[slot]);
  const numberX = useTransform(progress, range, pick(["45vw", "0vw", "-45vw"]));
  const contentX = useTransform(progress, range, pick([120, 0, -120]));
  const contentOpacity = useTransform(progress, range, pick([0.35, 1, 0.35]));

  return (
    <div className="case-study-horizontal-panel" data-panel-index={index}>
      <motion.span className="case-study-horizontal-number" style={{ x: numberX }} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.div className="case-study-horizontal-content" style={{ x: contentX, opacity: contentOpacity }}>
        {children}
      </motion.div>
    </div>
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
      id={`case-study-section-${number}`}
      tabIndex={-1}
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

function CaseStudyCarousel({ items, project, prefersReducedMotion, onOpen }) {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    const slide = track?.children[clamped];
    slide?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <motion.section
      id="case-study-section-06"
      tabIndex={-1}
      className={`case-study-section case-study-carousel-section${project.finalImageLayout === "screenshots" ? " case-study-screenshot-carousel" : ""}`}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="case-study-section-heading">
        <p className="case-study-label">{t("finalImagesLabel")}</p>
        <h2>{t(project.finalImageLayout === "screenshots" ? "selectedFinalImagesSub" : "finalImagesSub")}</h2>
      </div>
      <div className="case-study-carousel">
        <button
          type="button"
          className="case-study-carousel-arrow case-study-carousel-arrow-prev"
          aria-label="Previous image"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          ←
        </button>
        <div
          className="case-study-carousel-track"
          ref={trackRef}
          onScroll={(event) => {
            const track = event.currentTarget;
            const closestIndex = Array.from(track.children).reduce(
              (closest, slide, index, slides) =>
                Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft) <
                Math.abs(slides[closest].offsetLeft - track.offsetLeft - track.scrollLeft)
                  ? index
                  : closest,
              0,
            );
            setActiveIndex(closestIndex);
          }}
        >
          {items.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className="case-study-carousel-slide"
              aria-label={`Open ${item.label}`}
              onClick={() =>
                onOpen({
                  type: "panel",
                  label: item.label,
                  image: item.image,
                  color: project.color,
                  index,
                })
              }
            >
              <img
                src={resolveCaseStudyImage(item.image)}
                alt={item.label}
                loading="lazy"
              />
              {project.finalImageLayout === "screenshots" && (
                <span className="case-study-carousel-caption">{item.label}</span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="case-study-carousel-arrow case-study-carousel-arrow-next"
          aria-label="Next image"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
        >
          →
        </button>
      </div>
      <p className="case-study-carousel-counter font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
        {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </p>
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

function CaseStudyMediaCarousel({ items, project, prefersReducedMotion, onOpen }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    const slide = track?.children[clamped];
    slide?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <>
      <motion.div
        className="case-study-carousel case-study-process-carousel"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <button
          type="button"
          className="case-study-carousel-arrow case-study-carousel-arrow-prev"
          aria-label="Previous image"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          ←
        </button>
        <div className="case-study-carousel-track" ref={trackRef}>
          {items.map((item, index) => (
            <motion.button
              key={item.image}
              type="button"
              className="case-study-carousel-slide case-study-process-slide"
              aria-label={`Open ${item.label}`}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: prefersReducedMotion ? 0 : index * 0.04,
              }}
              onClick={() =>
                onOpen({
                  type: "panel",
                  label: item.label,
                  image: item.image,
                  color: project.color,
                  index,
                })
              }
            >
              <img
                src={resolveCaseStudyImage(item.image)}
                alt={item.label}
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
        <button
          type="button"
          className="case-study-carousel-arrow case-study-carousel-arrow-next"
          aria-label="Next image"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
        >
          →
        </button>
      </motion.div>
      <p className="case-study-carousel-counter case-study-process-carousel-counter font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
        {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </p>
    </>
  );
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
  const imageSource = resolveCaseStudyImage(image);
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
      <iframe src={src} title={title} allowFullScreen loading="lazy" />
    </div>
  );
}

function CaseStudyLightbox({ image, onClose }) {
  const imageSource = resolveCaseStudyImage(image.image);
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