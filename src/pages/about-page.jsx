import { DownloadSimple } from "@phosphor-icons/react";
import { animate, motion, stagger, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ScrambleText, Ticker } from "motion-plus/react";
import { useEffect, useRef, useState } from "react";
import colorfulStreet from "../assets/aboutme/1000015242.JPG";
import umbrellaStreet from "../assets/aboutme/oT0NlVII6dk9PKKP.jpg";
import milanGallery from "../assets/aboutme/qvd0dER4TEM79Jds.jpg";
import londonStreet from "../assets/aboutme/rmicbVaW7DRN3Scb.jpg";
import meImage from "../assets/me-about.webp";
import resumePdf from "../assets/resume/RyanMonaghan_100226_Resume.pdf";
import { useLanguage } from "../lib/LanguageContext";
import { SiteLayout } from "./site-layout";

const aboutPrinciples = [
  "Research first /",
  "Prototype early /",
  "Design for access /",
  "Build with intent /",
];

const approachBeats = [
  {
    text: [
      "Research, wireframing, and high-fidelity prototyping taught me to question assumptions and design for people with habits and needs very different from my own.",
      "The business side comes from working at a fintech company, where I saw how design decisions tie into revenue, risk, and compliance.",
      "Together, that mix helps me connect user needs with viable product decisions, then carry it through with accessible design and clean, robust code.",
    ],
  },
];

const storyThemes = {
  light: { background: "#f5f3ef", color: "#0a0a0a" },
  dark: { background: "#0a0a0a", color: "#f5f3ef" },
};

const travelPhotos = [
  {
    id: "cartagena",
    src: umbrellaStreet,
    alt: "Colorful umbrellas hanging over a narrow street",
    caption: "01 / Cartagena, Colombia",
  },
  {
    id: "san-juan",
    src: colorfulStreet,
    alt: "Pink, yellow, and green buildings lining a cobbled street",
    caption: "02 / San Juan, Puerto Rico",
  },
  {
    id: "london",
    src: londonStreet,
    alt: "Union Jack flags above a London street",
    caption: "03 / London, England",
  },
  {
    id: "milan",
    src: milanGallery,
    alt: "Glass-domed shopping gallery with ornate architecture",
    caption: "04 / Milan, Italy",
  },
];

const lifeBeats = [
  {
    text: "I went to Fordham University and studied at Korea University in 2017. That time abroad sparked a love of exploring new places and seeing the world from different perspectives.",
    photos: travelPhotos,
  },
  {
    text: [
      "I speak Korean and Japanese, and I'm learning Spanish (day 356 on Duolingo). I've traveled through South Korea, Mexico, Colombia, London, and Italy, and there's still plenty left on my list.",
      "These days I'm based in Midtown New York, always looking for a new restaurant or cafe. Away from my desk, I run half marathons, ski, and practice yoga.",
    ],
  },
];

const sketchStages = ["Research", "Wireframe", "Prototype", "Build"];
const sketchNotes = [
  { x: 36, y: 34, rotate: -6 },
  { x: 118, y: 58, rotate: 4 },
  { x: 200, y: 30, rotate: -3 },
];
const sketchOutlines = [
  "M30 26 H270 V46 H30 Z",
  "M30 60 H140 V150 H30 Z",
  "M156 66 H262",
  "M156 82 H244",
  "M156 98 H254",
  "M156 120 H228 V142 H156 Z",
  "M30 168 H200",
];

function useSketchStage(count) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(count - 1);
      return undefined;
    }
    const interval = setInterval(() => setStage((current) => (current + 1) % count), 1800);
    return () => clearInterval(interval);
  }, [count, prefersReducedMotion]);

  const timing = (delay = 0) => ({
    duration: prefersReducedMotion ? 0 : 0.6,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  });

  return { stage, prefersReducedMotion, timing };
}

function SketchSteps({ stages, stage, markerId, timing }) {
  return (
    <div className="approach-sketch-steps">
      {stages.map((label, index) => (
        <span key={label} className={index === stage ? "is-active" : undefined}>
          {label}
          {index === stage && (
            <motion.span layoutId={markerId} className="approach-sketch-marker" transition={timing()} />
          )}
        </span>
      ))}
    </div>
  );
}

const sketchCentered = { transformBox: "fill-box", transformOrigin: "center" };

function ApproachSketch() {
  const { stage, prefersReducedMotion, timing } = useSketchStage(sketchStages.length);

  const isResearch = stage === 0;
  const isDrawn = stage >= 1;
  const isFilled = stage >= 2;
  const isBuilt = stage === 3;
  const centered = sketchCentered;

  return (
    <div className="approach-sketch" aria-hidden="true">
      <svg viewBox="0 0 300 200">
        <rect className="approach-sketch-frame" x="12" y="10" width="276" height="180" rx="12" />

        {sketchNotes.map((note, index) => (
          <motion.g
            key={note.x}
            style={centered}
            initial={false}
            animate={
              isResearch
                ? { opacity: 1, scale: 1, rotate: note.rotate }
                : { opacity: 0, scale: 0.6, rotate: 0 }
            }
            transition={timing(isResearch ? index * 0.12 : 0)}
          >
            <rect x={note.x} y={note.y} width="64" height="48" rx="4" className="approach-sketch-note" />
            <path d={`M${note.x + 10} ${note.y + 16} H${note.x + 52} M${note.x + 10} ${note.y + 28} H${note.x + 40}`} className="approach-sketch-line" />
          </motion.g>
        ))}
        <motion.g
          initial={false}
          animate={
            isResearch && !prefersReducedMotion
              ? { opacity: 1, x: [0, 84, 166, 0], y: [0, 22, -6, 0] }
              : { opacity: 0, x: 0, y: 0 }
          }
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <circle cx="70" cy="132" r="14" className="approach-sketch-line" />
          <path d="M80 142 L92 154" className="approach-sketch-line" />
        </motion.g>

        {sketchOutlines.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            className="approach-sketch-line"
            initial={false}
            animate={{ pathLength: isDrawn ? 1 : 0, opacity: isDrawn ? 1 : 0 }}
            transition={timing(isDrawn && stage === 1 ? index * 0.08 : 0)}
          />
        ))}
        <motion.path
          d="M30 60 L140 150 M140 60 L30 150"
          className="approach-sketch-line"
          initial={false}
          animate={{ pathLength: isDrawn && !isFilled ? 1 : 0, opacity: isDrawn && !isFilled ? 0.5 : 0 }}
          transition={timing(stage === 1 ? 0.3 : 0)}
        />

        <motion.rect
          x="30"
          y="60"
          width="110"
          height="90"
          className="approach-sketch-fill"
          initial={false}
          animate={{ opacity: isFilled ? 0.14 : 0 }}
          transition={timing()}
        />
        <motion.rect
          x="156"
          y="120"
          width="72"
          height="22"
          className="approach-sketch-accent"
          style={centered}
          initial={false}
          animate={
            isFilled
              ? { opacity: 1, scale: stage === 2 && !prefersReducedMotion ? [1, 1, 0.9, 1] : 1 }
              : { opacity: 0, scale: 1 }
          }
          transition={{ ...timing(), duration: prefersReducedMotion ? 0 : 1.2, times: [0, 0.6, 0.75, 1] }}
        />
        <motion.g
          initial={false}
          animate={
            stage === 2 && !prefersReducedMotion
              ? { opacity: 1, x: 196, y: 132 }
              : { opacity: 0, x: 262, y: 186 }
          }
          transition={timing()}
        >
          <path d="M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z" className="approach-sketch-cursor" />
        </motion.g>

        <motion.g
          style={centered}
          initial={false}
          animate={isBuilt ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 18 }
          }
        >
          <circle cx="252" cy="160" r="22" className="approach-sketch-accent" />
          <text x="252" y="165" textAnchor="middle" className="approach-sketch-code">
            {"</>"}
          </text>
        </motion.g>
      </svg>
      <SketchSteps
        stages={sketchStages}
        stage={stage}
        markerId="approach-sketch-marker"
        timing={timing}
      />
    </div>
  );
}

const lifeStages = ["Seoul '17", "Travel", "Languages", "Midtown"];
// Points along the NYC -> Seoul flight arc so the plane follows the drawn curve.
const flightPoints = { x: [52, 101, 150, 199, 248], y: [140, 87, 57.5, 52, 70] };
const travelPins = [
  { code: "MX", x: 64, y: 108 },
  { code: "CO", x: 96, y: 142 },
  { code: "UK", x: 146, y: 56 },
  { code: "IT", x: 172, y: 82 },
  { code: "KR", x: 244, y: 90 },
];
const languageBubbles = [
  { text: "안녕하세요", x: 24, y: 26, width: 108 },
  { text: "こんにちは", x: 148, y: 48, width: 108 },
  { text: "¡Hola!", x: 36, y: 96, width: 84, accent: true },
];
const skylinePath =
  "M24 172 H44 V124 H62 V142 H80 V100 H94 V74 H100 V46 H104 V74 H110 V100 H124 V132 H144 V110 H164 V150 H180 V90 H200 V150 H216 V128 H236 V172 H276";

function LifeSketch() {
  const { stage, prefersReducedMotion, timing } = useSketchStage(lifeStages.length);
  const streak = useMotionValue(356);
  const streakLabel = useTransform(streak, (value) => Math.round(value));

  useEffect(() => {
    if (stage !== 2 || prefersReducedMotion) {
      streak.set(356);
      return undefined;
    }
    streak.set(300);
    const controls = animate(streak, 356, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [stage, prefersReducedMotion, streak]);

  const scene = (index) => ({
    initial: false,
    animate: { opacity: stage === index ? 1 : 0 },
    transition: timing(),
  });
  const pop = (isActive, delay) => ({
    style: sketchCentered,
    initial: false,
    animate: isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { type: "spring", stiffness: 320, damping: 18, delay: isActive ? delay : 0 },
  });

  return (
    <div className="approach-sketch" aria-hidden="true">
      <svg viewBox="0 0 300 200">
        <rect className="approach-sketch-frame" x="12" y="10" width="276" height="180" rx="12" />

        <motion.g {...scene(0)}>
          <motion.path
            d="M52 140 Q150 10 248 70"
            className="approach-sketch-line"
            initial={false}
            animate={{ pathLength: stage === 0 ? 1 : 0 }}
            transition={{ ...timing(), duration: prefersReducedMotion ? 0 : 1.2 }}
          />
          <circle cx="52" cy="140" r="5" className="approach-sketch-fill" />
          <circle cx="248" cy="70" r="5" className="approach-sketch-fill" />
          <motion.circle
            r="6"
            className="approach-sketch-accent"
            initial={false}
            animate={
              stage === 0 && !prefersReducedMotion
                ? { cx: flightPoints.x, cy: flightPoints.y }
                : { cx: 248, cy: 70 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          />
          <text x="52" y="162" textAnchor="middle" className="approach-sketch-text">NYC</text>
          <text x="248" y="92" textAnchor="middle" className="approach-sketch-text">SEOUL 2017</text>
        </motion.g>

        <motion.g {...scene(1)}>
          <motion.path
            d={`M${travelPins.map((pin) => `${pin.x} ${pin.y}`).join(" L")}`}
            className="approach-sketch-line approach-sketch-route"
            initial={false}
            animate={{ pathLength: stage === 1 ? 1 : 0 }}
            transition={{ ...timing(0.2), duration: prefersReducedMotion ? 0 : 1 }}
          />
          {travelPins.map((pin, index) => (
            <motion.g key={pin.code} {...pop(stage === 1, index * 0.15)}>
              <circle cx={pin.x} cy={pin.y} r="7" className="approach-sketch-accent" />
              <text x={pin.x} y={pin.y - 12} textAnchor="middle" className="approach-sketch-text">
                {pin.code}
              </text>
            </motion.g>
          ))}
        </motion.g>

        <motion.g {...scene(2)}>
          {languageBubbles.map((bubble, index) => (
            <motion.g key={bubble.text} {...pop(stage === 2, index * 0.18)}>
              <rect
                x={bubble.x}
                y={bubble.y}
                width={bubble.width}
                height="36"
                rx="12"
                className={bubble.accent ? "approach-sketch-accent" : "approach-sketch-line"}
              />
              <path
                d={`M${bubble.x + 18} ${bubble.y + 36} l6 10 l6 -10`}
                className={bubble.accent ? "approach-sketch-accent" : "approach-sketch-line"}
              />
              <text
                x={bubble.x + bubble.width / 2}
                y={bubble.y + 23}
                textAnchor="middle"
                className={`approach-sketch-bubble${bubble.accent ? " is-accent" : ""}`}
              >
                {bubble.text}
              </text>
            </motion.g>
          ))}
          <motion.g {...pop(stage === 2, 0.5)}>
            <rect x="168" y="110" width="104" height="64" rx="12" className="approach-sketch-line" />
            <motion.text x="220" y="146" textAnchor="middle" className="approach-sketch-count">
              {streakLabel}
            </motion.text>
            <text x="220" y="162" textAnchor="middle" className="approach-sketch-text">DAY STREAK</text>
          </motion.g>
        </motion.g>

        <motion.g {...scene(3)}>
          <motion.path
            d={skylinePath}
            className="approach-sketch-line"
            initial={false}
            animate={{ pathLength: stage === 3 ? 1 : 0 }}
            transition={{ ...timing(), duration: prefersReducedMotion ? 0 : 1.2 }}
          />
          <path d="M24 182 H276" className="approach-sketch-line approach-sketch-route" />
          <motion.circle
            cy="182"
            r="5"
            className="approach-sketch-accent"
            initial={false}
            animate={{ cx: stage === 3 && !prefersReducedMotion ? [24, 276] : 150 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: "easeInOut" }}
          />
          <text x="272" y="36" textAnchor="end" className="approach-sketch-text">MIDTOWN, NYC</text>
          <text x="272" y="50" textAnchor="end" className="approach-sketch-text is-accent">13.1 MI</text>
        </motion.g>
      </svg>
      <SketchSteps stages={lifeStages} stage={stage} markerId="life-sketch-marker" timing={timing} />
    </div>
  );
}

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

function BeatContent({ beat, renderPhoto }) {
  const paragraphs = [].concat(beat.text ?? beat);
  const photos = beat.photos ?? [];

  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {photos.length > 0 && (
        <div className="about-life-gallery" role="group" aria-label="Travel photos">
          {photos.map(renderPhoto)}
        </div>
      )}
    </>
  );
}

function beatClassName(beat) {
  return `scroll-story-beat${Array.isArray(beat.text) ? " is-multi" : ""}`;
}

function ScrollStoryBeat({ progress, index, segment, color, isLast, beat }) {
  const fade = segment * 0.3;
  const enter = index * segment;
  const exit = enter + segment;
  const isFirst = index === 0;

  // Outgoing text clears before incoming text appears so they never overlap.
  const opacity = useTransform(
    progress,
    ...fullRange(
      [
        ...(isFirst ? [] : [enter + fade * 0.2, enter + fade]),
        ...(isLast ? [] : [exit - fade, exit - fade * 0.6]),
      ],
      [...(isFirst ? [] : [0, 1]), ...(isLast ? [] : [1, 0])],
    ),
  );
  // Incoming beats rise vertically and outgoing beats slide left, tracing an L.
  const y = useTransform(
    progress,
    ...fullRange([enter, enter + fade], isFirst ? [0, 0] : [120, 0]),
  );
  const x = useTransform(
    progress,
    ...fullRange([exit - fade, exit], isLast ? [0, 0] : [0, -160]),
  );

  return (
    <motion.div className={beatClassName(beat)} style={{ color, opacity, x, y }}>
      <BeatContent
        beat={beat}
        renderPhoto={(photo, photoIndex) => (
          <ScrollStoryPhoto
            key={photo.id}
            progress={progress}
            start={enter + fade * 0.2 + photoIndex * segment * 0.04}
            segment={segment}
            photo={photo}
          />
        )}
      />
    </motion.div>
  );
}

function ScrollStoryHeading({ progress, start, end, fade, isFirst, isLast, color, children }) {
  const opacity = useTransform(
    progress,
    ...fullRange(
      [
        ...(isFirst ? [] : [start + fade * 0.2, start + fade]),
        ...(isLast ? [] : [end - fade, end - fade * 0.6]),
      ],
      [...(isFirst ? [] : [0, 1]), ...(isLast ? [] : [1, 0])],
    ),
  );
  const y = useTransform(
    progress,
    ...fullRange(
      [...(isFirst ? [] : [start, start + fade]), ...(isLast ? [] : [end - fade, end])],
      [...(isFirst ? [] : [40, 0]), ...(isLast ? [] : [0, -40])],
    ),
  );

  return (
    <motion.div
      className="about-approach-heading scroll-story-heading"
      style={{ color, opacity, y }}
    >
      {children}
    </motion.div>
  );
}

function ScrollStoryBackdrop({ progress, boundary, fade, background }) {
  const opacity = useTransform(
    progress,
    ...fullRange([boundary - fade * 0.5, boundary + fade * 0.5], [0, 1]),
  );

  return (
    <motion.div
      className="scroll-story-backdrop"
      aria-hidden="true"
      style={{ background, opacity }}
    />
  );
}

function ScrollStoryPhoto({ progress, start, segment, photo, isStatic }) {
  const opacity = useTransform(progress, ...fullRange([start, start + segment * 0.15], [0, 1]));
  const y = useTransform(progress, ...fullRange([start, start + segment * 0.2], [40, 0]));

  return (
    <motion.figure
      className={`about-life-photo about-life-photo-${photo.id}`}
      style={isStatic ? undefined : { opacity, y }}
    >
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      <figcaption>{photo.caption}</figcaption>
    </motion.figure>
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
  const steps = beatCount;
  const segment = 1 / steps;
  const fade = segment * 0.3;
  const themes = chapters.map((chapter) => storyThemes[chapter.theme]);
  const boundaries = starts.slice(1).map((start) => start * segment);

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
                {chapter.visual}
              </div>
              <div className="scroll-story-stage">
                {chapter.beats.map((beat, beatIndex) => (
                  <div key={`${chapter.id}-${beatIndex}`} className={beatClassName(beat)}>
                    <BeatContent
                      beat={beat}
                      renderPhoto={(photo) => (
                        <ScrollStoryPhoto
                          key={photo.id}
                          progress={scrollYProgress}
                          start={0}
                          segment={segment}
                          photo={photo}
                          isStatic
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={storyRef}
      className="scroll-story"
      style={{
        "--story-steps": steps,
        background: themes[0].background,
        color: themes[0].color,
      }}
    >
      {boundaries.map((boundary, index) => (
        <ScrollStoryBackdrop
          key={chapters[index + 1].id}
          progress={scrollYProgress}
          boundary={boundary}
          fade={fade}
          background={themes[index + 1].background}
        />
      ))}
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
              isLast={index === chapters.length - 1}
              color={themes[index].color}
            >
              {chapter.label}
              {chapter.title}
              {chapter.visual}
            </ScrollStoryHeading>
          ))}
        </div>
        <div className="scroll-story-stage">
          {chapters.flatMap((chapter, chapterIndex) =>
            chapter.beats.map((beat, beatIndex) => (
              <ScrollStoryBeat
                key={`${chapter.id}-${beatIndex}`}
                progress={scrollYProgress}
                index={starts[chapterIndex] + beatIndex}
                segment={segment}
                color={themes[chapterIndex].color}
                isLast={starts[chapterIndex] + beatIndex === beatCount - 1}
                beat={beat}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { lang, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [factsVisible, setFactsVisible] = useState(false);
  const [approachVisible, setApproachVisible] = useState(false);

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
                  download="RyanMonaghan_100226_Resume.pdf"
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
                visual: <ApproachSketch />,
                beats: approachBeats,
              },
              {
                id: "life",
                theme: "dark",
                label: <span className="font-mono">02 / Beyond the work</span>,
                title: <h2>Life outside of the screen.</h2>,
                visual: <LifeSketch />,
                beats: lifeBeats,
              },
            ]}
          />
        </motion.section>
      </div>
    </SiteLayout>
  );
}