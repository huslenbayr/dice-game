"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [data-cursor-target="true"]';

function useFinePointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return enabled;
}

export function CustomCursor() {
  const enabled = useFinePointer();
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cursorX = useSpring(-120, { stiffness: 220, damping: 26, mass: 0.45 });
  const cursorY = useSpring(-120, { stiffness: 220, damping: 26, mass: 0.45 });
  const glowX = useSpring(-120, { stiffness: 160, damping: 24, mass: 0.7 });
  const glowY = useSpring(-120, { stiffness: 160, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("landing-cursor-active");
      return undefined;
    }

    document.body.classList.add("landing-cursor-active");

    function handlePointerMove(event) {
      const { clientX, clientY } = event;

      cursorX.set(clientX);
      cursorY.set(clientY);
      glowX.set(clientX);
      glowY.set(clientY);
      setVisible(true);
    }

    function handlePointerLeave() {
      setVisible(false);
      setInteractive(false);
      setPressed(false);
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    function handleMouseOver(event) {
      setInteractive(Boolean(event.target?.closest?.(INTERACTIVE_SELECTOR)));
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      document.body.classList.remove("landing-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY, enabled, glowX, glowY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`landing-cursor-glow ${visible ? "is-visible" : ""} ${interactive ? "is-interactive" : ""}`}
        style={{ left: glowX, top: glowY }}
      />
      <motion.div
        aria-hidden="true"
        className={[
          "landing-cursor-core",
          visible ? "is-visible" : "",
          interactive ? "is-interactive" : "",
          pressed ? "is-pressed" : ""
        ].join(" ")}
        style={{ left: cursorX, top: cursorY }}
      />
    </>
  );
}
