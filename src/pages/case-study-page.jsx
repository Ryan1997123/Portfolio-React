import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "motion-plus/react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import sibosHero from "../assets/sibos_tote/hero.png";
import sibosFinal from "../assets/sibos_tote/final_design.png";
import sibosConcept1 from "../assets/sibos_tote/initial_concept1.png";
import sibosConcept2 from "../assets/sibos_tote/initial_concept2.png";
import sibosPremium from "../assets/sibos_tote/premium.png";
import icotydeProcess1 from "../assets/jnj-ico/example1.png";
import icotydeProcess2 from "../assets/jnj-ico/example2.png";
import icotydeOverview from "../assets/icotyde-overview.webp";
import sftHero from "../assets/secure_file_transfer/hero.jpeg";
import sftLowFi1 from "../assets/secure_file_transfer/lofi-1.png";
import sftLowFi2 from "../assets/secure_file_transfer/lofi-2.png";
import sftHighFi1 from "../assets/secure_file_transfer/artboard-11.png";
import lillyBoothHero from "../assets/lilly_booth/lilly.webp";
import lillyBoothSchematic from "../assets/lilly_booth/schematic.webp";
import lillyBoothMockup from "../assets/lilly_booth/imac-mockup.webp";
import { projects } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { PageIntro, SiteLayout } from "./site-layout";

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

const heroImages = {
  "gaming-gear-highfidelity": gamingGearHighFidelity,
  "ectrims-booth-hero": ectrimsBoothHero,
  "sibos-tote-hero": sibosHero,
  "icotyde-overview": icotydeOverview,
  "sft-hero": sftHero,
  "lilly-booth-hero": lillyBoothHero,
};

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
  "lilly-booth-mockup": lillyBoothMockup,
  "lilly-booth-hero": lillyBoothHero,
  ...sftFinalImages,
};

function getHeroImageSource(heroImage) {
  return heroImages[heroImage] || icotydeOverview;
}

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

  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  const openLightbox = (image) => setLightboxImage(image);

  return (
    <SiteLayout>
      <div className="case-study-page">
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
            </div>
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
            {project.figmaEmbed ? (
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
            )}
          </motion.section>
          {project.finalImages && project.finalImages.length > 0 && (
            <CaseStudyCarousel
              items={project.finalImages}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
              onOpen={openLightbox}
            />
          )}
          <div className="case-study-nav flex items-center justify-between">
            <Link to="/work" className="case-study-back">
              ← {t("backToWork")}
            </Link>
            {nextProject && (
              <Link to={`/work/${nextProject.slug}`} className="case-study-next">
                <span>
                  {t("nextProject")}: {nextProject.title}
                </span>{" "}
                ←
              </Link>
            )}
          </div>
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
      className="case-study-section case-study-carousel-section"
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
        <h2>{t("finalImagesSub")}</h2>
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
        <div className="case-study-carousel-track" ref={trackRef}>
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