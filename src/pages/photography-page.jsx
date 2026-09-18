import {
  AnimatePresence,
  motion,
  stagger,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { ScrambleText } from "motion-plus/react";
import { useEffect, useRef, useState } from "react";
import { photography } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { PageIntro, SiteLayout } from "./site-layout";

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
  const { t } = useLanguage();
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
    if (event.button !== undefined && event.button !== 0) return;
    pointerRef.current = {
      active: true,
      horizontal: false,
      x: event.clientX,
      y: event.clientY,
    };
    try {
      if (
        event.currentTarget &&
        typeof event.currentTarget.setPointerCapture === "function"
      ) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    } catch {
      // Pointer capture can fail during rapid repeated input.
    }
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

    if (event.cancelable) event.preventDefault();
    rawScrollX.set(rawScrollX.get() + deltaX * 2.5);
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };

  const handlePointerEnd = (event) => {
    pointerRef.current.active = false;
    pointerRef.current.horizontal = false;
    if (event?.currentTarget && event?.pointerId !== undefined) {
      try {
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        // The pointer may already have been released by the browser.
      }
    }
  };

  useEffect(() => {
    const handleGlobalPointerEnd = () => {
      pointerRef.current.active = false;
      pointerRef.current.horizontal = false;
    };
    window.addEventListener("pointerup", handleGlobalPointerEnd);
    window.addEventListener("pointercancel", handleGlobalPointerEnd);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerEnd);
      window.removeEventListener("pointercancel", handleGlobalPointerEnd);
    };
  }, []);

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
      onLostPointerCapture={handlePointerEnd}
      onDoubleClick={(event) => event.preventDefault()}
      aria-label="Interactive photography collection"
    >
      <div className="photography-planes-heading">
        <span>{t("allPhotos")}</span>
        <strong>
          {t("bestShots")} <sup>({photographyPlaneCount})</sup>
        </strong>
      </div>
      <span className="photography-planes-hint photography-planes-hint-desktop">
        {t("dragHintDesktop")}
      </span>
      <span className="photography-planes-hint photography-planes-hint-mobile">
        {t("dragHintMobile")}
      </span>
      <div className="photography-planes-viewport">
        <div className="photography-planes-stage">
          {photography.map((photo, index) => (
            <PhotographyPlane
              key={photo.id}
              index={index}
              image={photo.image}
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

export function PhotographyPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <div className="photography-page">
        <PageIntro
          className="photography-page-intro"
          eyebrow={t("photoEyebrow")}
          title={t("photoTitle")}
          body={t("photoBody")}
        />
        <ScrollVelocityPlanes />
      </div>
    </SiteLayout>
  );
}