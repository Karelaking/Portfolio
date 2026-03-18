"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactElement } from "react";

const SPRING_CONFIG = {
  stiffness: 500,
  damping: 35,
  mass: 0.25,
};

const CURSOR_SIZE = 28;
const INITIAL_POSITION = -100;

export const CursorFollower = (): ReactElement | null => {
  const [isPointerDevice, setIsPointerDevice] = useState<boolean>(false);

  const rawX = useMotionValue<number>(INITIAL_POSITION);
  const rawY = useMotionValue<number>(INITIAL_POSITION);
  const opacity = useMotionValue<number>(0);
  const scale = useMotionValue<number>(0.8);

  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);
  const smoothOpacity = useSpring(opacity, {
    stiffness: 350,
    damping: 30,
    mass: 0.2,
  });
  const smoothScale = useSpring(scale, {
    stiffness: 350,
    damping: 30,
    mass: 0.2,
  });

  const rafIdRef = useRef<number | null>(null);
  const pendingXRef = useRef<number>(INITIAL_POSITION);
  const pendingYRef = useRef<number>(INITIAL_POSITION);
  const isVisibleRef = useRef<boolean>(false);

  useEffect((): (() => void) => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
      setIsPointerDevice(event.matches);
    };

    setIsPointerDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return (): void => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect((): (() => void) | void => {
    if (!isPointerDevice) {
      opacity.set(0);
      scale.set(0.8);
      rawX.set(INITIAL_POSITION);
      rawY.set(INITIAL_POSITION);
      return;
    }

    const flushPointerPosition = (): void => {
      rawX.set(pendingXRef.current);
      rawY.set(pendingYRef.current);
      rafIdRef.current = null;
    };

    const scheduleFlush = (): void => {
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(flushPointerPosition);
    };

    const showCursor = (): void => {
      if (isVisibleRef.current) {
        return;
      }

      isVisibleRef.current = true;
      opacity.set(1);
      scale.set(1);
    };

    const hideCursor = (): void => {
      if (!isVisibleRef.current) {
        return;
      }

      isVisibleRef.current = false;
      opacity.set(0);
      scale.set(0.8);
    };

    const handlePointerMove = (event: MouseEvent): void => {
      pendingXRef.current = event.clientX - CURSOR_SIZE / 2;
      pendingYRef.current = event.clientY - CURSOR_SIZE / 2;
      showCursor();
      scheduleFlush();
    };

    const handlePointerLeave = (): void => {
      hideCursor();
    };

    const handlePointerEnter = (): void => {
      showCursor();
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("mouseenter", handlePointerEnter);

    return (): void => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("mouseenter", handlePointerEnter);

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isPointerDevice, opacity, rawX, rawY, scale]);

  if (!isPointerDevice) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="border-foreground/40 bg-foreground/5 pointer-events-none fixed top-0 left-0 z-9999 h-7 w-7 rounded-full border"
      style={{
        x,
        y,
        opacity: smoothOpacity,
        scale: smoothScale,
        willChange: "transform, opacity",
      }}
    />
  );
};
