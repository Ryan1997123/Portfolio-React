import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { photography } from "../data/projects";
import { useLanguage } from "../lib/LanguageContext";
import { PageIntro, SiteLayout } from "./site-layout";

function PhotographyGallery() {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const closeButtonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedPhoto) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previousFocus?.focus?.();
    };
  }, [selectedPhoto]);

  return (
    <section
      className="photography-gallery-section"
      aria-labelledby="photography-gallery-title"
    >
      <div className="photography-gallery-heading">
        <span>{t("allPhotos")}</span>
        <h2 id="photography-gallery-title">
          {t("bestShots")} <sup>{photography.length}</sup>
        </h2>
      </div>
      <div className="photography-card-grid">
        {photography.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            className="photography-card"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              delay: prefersReducedMotion ? 0 : (index % 3) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={prefersReducedMotion ? undefined : { y: -5 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`${photo.label}, view full-size photo`}
          >
            <img src={photo.image} alt="" loading="lazy" decoding="async" />
            <span className="photography-card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="photography-card-label">{photo.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photography-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            role="presentation"
          >
            <motion.div
              className="photography-lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="photography-lightbox-title"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                className="photography-lightbox-close"
                type="button"
                aria-label="Close photo"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={22} weight="bold" aria-hidden="true" />
              </button>
              <img src={selectedPhoto.image} alt={selectedPhoto.label} />
              <p id="photography-lightbox-title">{selectedPhoto.label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <PhotographyGallery />
      </div>
    </SiteLayout>
  );
}