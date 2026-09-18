import { DownloadSimple } from "@phosphor-icons/react";
import { motion, stagger, useReducedMotion } from "motion/react";
import { ScrambleText, Ticker } from "motion-plus/react";
import { useState } from "react";
import meImage from "../assets/me.png";
import resumePdf from "../assets/resume/RyanMonaghan_resume.pdf";
import { useLanguage } from "../lib/LanguageContext";
import { SiteLayout } from "./site-layout";

const aboutPrinciples = [
  "Research first /",
  "Prototype early /",
  "Design for access /",
  "Build with intent /",
];

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
                {t("approach")}
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
                I picked up research, wireframing, and high-fidelity
                prototyping at Fordham University, then studying abroad at
                Korea University in South Korea pushed it further, designing
                for people with very different habits than my own.
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
                The business side comes from working at a fintech company,
                where I saw how design decisions tie into revenue, risk, and
                compliance.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.36,
                  duration: prefersReducedMotion ? 0 : 0.7,
                }}
              >
                Together, that mix helps me connect user needs with viable
                product decisions, then carry it through with accessible
                design and clean, robust code.
              </motion.p>
            </div>
          </div>
        </motion.section>
      </div>
    </SiteLayout>
  );
}