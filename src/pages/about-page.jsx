import { DownloadSimple } from "@phosphor-icons/react";
import { motion, stagger, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ScrambleText, Ticker } from "motion-plus/react";
import { useRef, useState } from "react";
import colorfulStreet from "../assets/aboutme/1000015242.JPG";
import umbrellaStreet from "../assets/aboutme/oT0NlVII6dk9PKKP.jpg";
import milanGallery from "../assets/aboutme/qvd0dER4TEM79Jds.jpg";
import londonStreet from "../assets/aboutme/rmicbVaW7DRN3Scb.jpg";
import meImage from "../assets/me-about.webp";
import resumePdf from "../assets/resume/RyanMonaghan_resume.pdf";
import { useLanguage } from "../lib/LanguageContext";
import { SiteLayout } from "./site-layout";

const aboutPrinciples = [
  "Research first /",
  "Prototype early /",
  "Design for access /",
  "Build with intent /",
];

const approachBeats = [
  "Research, wireframing, and high-fidelity prototyping taught me to question assumptions and design for people with habits and needs very different from my own.",
  "The business side comes from working at a fintech company, where I saw how design decisions tie into revenue, risk, and compliance.",
  "Together, that mix helps me connect user needs with viable product decisions, then carry it through with accessible design and clean, robust code.",
];

const lifeBeats = [
  "I went to Fordham University and studied at Korea University in 2017. That time abroad sparked a love of exploring new places and seeing the world from different perspectives.",
  "I speak Korean and Japanese, and I'm learning Spanish (day 356 on Duolingo). I've traveled through South Korea, Mexico, Colombia, London, and Italy, and there's still plenty left on my list.",
  "These days I'm based in Midtown New York, always looking for a new restaurant or cafe. Away from my desk, I run half marathons, ski, and practice yoga.",
];

const storyThemes = {
  light: { background: "#f5f3ef", color: "#0a0a0a" },
  dark: { background: "#0a0a0a", color: "#f5f3ef" },
};

// Native scroll-timeline animations snap back outside their keyframes, so hold values across 0..1.
function fullRange(input, output) {
  const paddedInput = [...input];
  const paddedOutput = [...output];
  if (paddedInput[0] > 0) {
    paddedInput.unshift(0);
    paddedOutput.unshift(paddedOutput[0]);
  }
  if (paddedInput[paddedInput.length - 1] < 1) {
    paddedInput.push(1);
    paddedOutput.push(paddedOutput[paddedOutput.length - 1]);
  }
  return [paddedInput, paddedOutput];
}

function ScrollStoryBeat({ progress, index, segment, children }) {
  const fade = segment * 0.3;
  const enter = index * segment;
  const exit = enter + segment;
  const isFirst = index === 0;

  // Outgoing text clears before incoming text appears so they never overlap.
  const opacity = useTransform(
    progress,
    ...fullRange(
      isFirst
        ? [exit - fade, exit - fade * 0.6]
        : [enter + fade * 0.2, enter + fade, exit - fade, exit - fade * 0.6],
      isFirst ? [1, 0] : [0, 1, 1, 0],
    ),
  );
  // Incoming beats rise vertically and outgoing beats slide left, tracing an L.
  const y = useTransform(
    progress,
    ...fullRange([enter, enter + fade], isFirst ? [0, 0] : [120, 0]),
  );
  const x = useTransform(progress, ...fullRange([exit - fade, exit], [0, -160]));

  return (
    <motion.p className="scroll-story-beat" style={{ opacity, x, y }}>
      {children}
    </motion.p>
  );
}

function ScrollStoryHeading({ progress, start, end, fade, isFirst, children }) {
  const opacity = useTransform(
    progress,
    ...fullRange(
      isFirst
        ? [end - fade, end - fade * 0.6]
        : [start + fade * 0.2, start + fade, end - fade, end - fade * 0.6],
      isFirst ? [1, 0] : [0, 1, 1, 0],
    ),
  );
  const y = useTransform(
    progress,
    ...fullRange(
      isFirst ? [end - fade, end] : [start, start + fade, end - fade, end],
      isFirst ? [0, -40] : [40, 0, 0, -40],
    ),
  );

  return (
    <motion.div
      className="about-approach-heading scroll-story-heading"
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

function ScrollStory({ chapters }) {
  const prefersReducedMotion = useReducedMotion();
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const starts = [];
  let beatCount = 0;
  for (const chapter of chapters) {
    starts.push(beatCount);
    beatCount += chapter.beats.length;
  }
  // The extra half step lets the final paragraph exit before the section unpins.
  const segment = 1 / (beatCount + 0.5);
  const fade = segment * 0.3;
  const themes = chapters.map((chapter) => storyThemes[chapter.theme]);
  const boundaries = starts.slice(1).map((start) => start * segment);
  const colorInput = boundaries.length
    ? boundaries.flatMap((boundary) => [boundary - fade * 0.5, boundary + fade * 0.5])
    : [0, 1];
  const colorOutput = (key) =>
    boundaries.length
      ? boundaries.flatMap((_, i) => [themes[i][key], themes[i + 1][key]])
      : [themes[0][key], themes[0][key]];
  const backgroundColor = useTransform(
    scrollYProgress,
    ...fullRange(colorInput, colorOutput("background")),
  );
  const color = useTransform(scrollYProgress, ...fullRange(colorInput, colorOutput("color")));

  const rule = (
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
  );

  if (prefersReducedMotion) {
    return (
      <div ref={storyRef} className="scroll-story is-static">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} style={themes[index]}>
            <div className="scroll-story-pin about-approach-inner">
              {index === 0 && rule}
              <div className="about-approach-heading scroll-story-heading">
                {chapter.label}
                {chapter.title}
              </div>
              <div className="scroll-story-stage">
                {chapter.beats.map((beat) => (
                  <p key={beat} className="scroll-story-beat">
                    {beat}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={storyRef}
      className="scroll-story"
      style={{ "--story-beats": beatCount, backgroundColor, color }}
    >
      <div className="scroll-story-pin about-approach-inner">
        {rule}
        <div className="scroll-story-headings">
          {chapters.map((chapter, index) => (
            <ScrollStoryHeading
              key={chapter.id}
              progress={scrollYProgress}
              start={starts[index] * segment}
              end={(starts[index] + chapter.beats.length) * segment}
              fade={fade}
              isFirst={index === 0}
            >
              {chapter.label}
              {chapter.title}
            </ScrollStoryHeading>
          ))}
        </div>
        <div className="scroll-story-stage">
          {chapters.flatMap((chapter, chapterIndex) =>
            chapter.beats.map((beat, beatIndex) => (
              <ScrollStoryBeat
                key={beat}
                progress={scrollYProgress}
                index={starts[chapterIndex] + beatIndex}
                segment={segment}
              >
                {beat}
              </ScrollStoryBeat>
            )),
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  const { lang, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [factsVisible, setFactsVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const photoParallax = useTransform(scrollYProgress, [0, 1], [32, -32]);

  const aboutDetails = [
    [t("location"), t("locationVal")],
    [t("languagesLabel"), t("languagesVal")],
    [t("currentlyLabel"), t("currentlyVal")],
    [t("yearsActiveLabel"), t("yearsActiveVal")],
  ];

  return (
    <SiteLayout>
      <div className="about-page">
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
                  key={lang}
                  active={!prefersReducedMotion}
                  delay={stagger(0.035)}
                  duration={0.4}
                  chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
                >
                  {t("aboutEyebrow")} / PROFILE
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
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
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
                  width="720"
                  height="720"
                  decoding="async"
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
                {t("aboutProfileLabel")}
              </span>
              <p className="about-summary-copy">{t("aboutSummaryCopy")}</p>
              <div className="about-actions">
                <a
                  className="about-action about-action-primary"
                  href={resumePdf}
                  download="RyanMonaghan_resume.pdf"
                >
                  <span>{t("downloadResume")}</span>
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
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  duration: prefersReducedMotion ? 0 : 0.5,
                }}
              >
                <dt>
                  <ScrambleText
                    key={`${lang}-${label}`}
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
          viewport={{ once: true, amount: 0.1 }}
        >
          <ScrollStory
            chapters={[
              {
                id: "approach",
                theme: "light",
                label: (
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
                ),
                title: <h2>{t("approach")}</h2>,
                beats: approachBeats,
              },
              {
                id: "life",
                theme: "dark",
                label: <span className="font-mono">02 / Beyond the work</span>,
                title: <h2>Life outside of the screen.</h2>,
                beats: lifeBeats,
              },
            ]}
          />
        </motion.section>

        <section className="about-life" aria-label="Travel photos">
          <div className="about-life-inner about-life-gallery-wrap">
            <div className="about-life-gallery" ref={galleryRef}>
              <motion.figure
                className="about-life-photo about-life-photo-umbrellas"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
              >
                <img
                  src={umbrellaStreet}
                  alt="Colorful umbrellas hanging over a narrow street"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>01 / Cartagena, Colombia</figcaption>
              </motion.figure>
              <motion.figure
                className="about-life-photo about-life-photo-main"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0 : 0.8 }}
              >
                <div className="about-life-photo-window">
                  <motion.img
                    src={colorfulStreet}
                    alt="Pink, yellow, and green buildings lining a cobbled street"
                    loading="lazy"
                    decoding="async"
                    style={{ y: prefersReducedMotion ? 0 : photoParallax }}
                  />
                </div>
                <figcaption>02 / San Juan, Puerto Rico</figcaption>
              </motion.figure>
              <motion.figure
                className="about-life-photo about-life-photo-london"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.24, duration: prefersReducedMotion ? 0 : 0.7 }}
              >
                <img
                  src={londonStreet}
                  alt="Union Jack flags above a London street"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>03 / London, England</figcaption>
              </motion.figure>
              <motion.figure
                className="about-life-photo about-life-photo-milan"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.36, duration: prefersReducedMotion ? 0 : 0.7 }}
              >
                <img
                  src={milanGallery}
                  alt="Glass-domed shopping gallery with ornate architecture"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>04 / Milan, Italy</figcaption>
              </motion.figure>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}