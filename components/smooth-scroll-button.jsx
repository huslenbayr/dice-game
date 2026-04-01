"use client";

export function SmoothScrollButton({ targetId, className = "", children }) {
  function handleClick() {
    const target = document.getElementById(targetId);

    if (!target) {
      window.location.hash = targetId;
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
  }

  return (
    <button type="button" onClick={handleClick} className={className} aria-controls={targetId}>
      {children}
    </button>
  );
}
