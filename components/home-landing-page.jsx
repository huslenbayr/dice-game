"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomeLandingPage({ copy }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, prefersReducedMotion ? 1.06 : 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 96]);
  const brandY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.68, 1], [1, 0.78, 0.32]);

  function scrollToExperience() {
    document.getElementById("experience")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function freezeVideoOnLastFrame() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(video.duration - 0.05, 0);
    }

    video.pause();
  }

  return (
    <div className="landing-page">
      <section ref={heroRef} className="landing-hero">
        <motion.div className="landing-video-shell" style={{ scale: videoScale, y: videoY }}>
          <video
            ref={videoRef}
            className="landing-video"
            src="/huske.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={freezeVideoOnLastFrame}
            aria-hidden="true"
          />
        </motion.div>
        <div className="landing-video-overlay" />
        <div className="landing-video-vignette" />

        <div className="landing-hero-content shell-container flex flex-col items-center justify-center text-center">
          <div className="landing-hero-stack">
            <motion.h1
              className="landing-hero-brand"
              initial={{ opacity: 0, filter: "blur(18px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: brandY, opacity: brandOpacity }}
            >
              mongolway.com
            </motion.h1>

            <motion.div
              className="landing-hero-actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                type="button"
                onClick={scrollToExperience}
                className="landing-primary-button"
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              >
                {copy.cta}
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="landing-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.8 }}
          >
            <span>{copy.scroll}</span>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="landing-section">
        <div className="shell-container">
          <Reveal className="landing-section-intro">
            <p className="landing-eyebrow">{copy.introLabel}</p>
            <h2 className="landing-section-title">{copy.introTitle}</h2>
            <p className="landing-section-body">{copy.introBody}</p>
          </Reveal>

          <div className="landing-card-grid">
            {copy.cards.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="landing-card">
                  <p className="landing-card-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="landing-card-title">{item.title}</h3>
                  <p className="landing-card-body">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="signature" className="landing-section pt-0">
        <div className="shell-container">
          <div className="landing-feature-grid">
            <Reveal className="landing-feature-panel">
              <p className="landing-eyebrow">{copy.signatureLabel}</p>
              <h2 className="landing-feature-title">{copy.signatureTitle}</h2>
              <p className="landing-section-body">{copy.signatureBody}</p>
              <div className="landing-feature-list">
                {copy.signaturePoints.map((point) => (
                  <div key={point.title} className="landing-feature-item">
                    <p className="landing-feature-item-title">{point.title}</p>
                    <p className="landing-feature-item-body">{point.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="landing-quote-panel" delay={0.12}>
              <p className="landing-quote-mark">“</p>
              <p className="landing-quote">{copy.quote}</p>
              <Link href="/tours" className="landing-inline-link">
                {copy.secondaryLink}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="landing-section pt-0">
        <div className="shell-container">
          <Reveal className="landing-closing-panel">
            <p className="landing-eyebrow">{copy.closingLabel}</p>
            <h2 className="landing-closing-title">{copy.closingTitle}</h2>
            <p className="landing-section-body">{copy.closingBody}</p>
            <div className="landing-closing-links">
              <Link href="/tours" className="landing-secondary-button">
                {copy.secondaryLink}
              </Link>
              <Link href="/contact" className="landing-text-link">
                {copy.contactLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
