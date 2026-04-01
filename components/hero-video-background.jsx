"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideoBackground({ src, playLabel }) {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || hasVideoError) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      video.pause();
      setShowPlayButton(true);
      return undefined;
    }

    let cancelled = false;

    const tryAutoplay = async () => {
      try {
        await video.play();
        if (!cancelled) {
          setShowPlayButton(false);
        }
      } catch {
        if (!cancelled) {
          setShowPlayButton(true);
        }
      }
    };

    tryAutoplay();

    return () => {
      cancelled = true;
    };
  }, [hasVideoError]);

  async function handlePlay() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();
      setShowPlayButton(false);
    } catch {
      setShowPlayButton(true);
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!hasVideoError ? (
        <video
          ref={videoRef}
          className="hero-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setHasVideoError(true)}
        >
          <source src={src} type="video/quicktime" />
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      {showPlayButton && !hasVideoError ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-4">
          <button type="button" onClick={handlePlay} className="pointer-events-auto hero-video-play-button">
            {playLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
