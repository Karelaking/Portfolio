"use client";

import type { ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface ParsedMetric {
  value: number | null;
  decimals: number;
  suffix: string;
}

const parseMetricValue = (raw: string): ParsedMetric => {
  const match = raw.match(/\d+(?:\.\d+)?/);
  if (!match) {
    return { value: null, decimals: 0, suffix: raw };
  }

  const numeric = match[0];
  const decimals = numeric.includes(".")
    ? numeric.split(".")[1]?.length ?? 0
    : 0;
  const value = Number(numeric);
  const suffix = raw.replace(numeric, "").trim();

  return { value, decimals, suffix };
};

const formatMetricValue = (value: number, decimals: number): string => {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return Math.round(value).toString();
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export interface CountUpValueProps {
  value: string;
}

export const CountUpValue = ({ value }: CountUpValueProps): ReactElement => {
  const parsed = useMemo(() => parseMetricValue(value), [value]);
  const [display, setDisplay] = useState<string>(value);
  const [runKey, setRunKey] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect((): (() => void) => {
    if (parsed.value === null || Number.isNaN(parsed.value)) {
      setDisplay(value);
      return () => undefined;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(
        `${formatMetricValue(parsed.value, parsed.decimals)}${parsed.suffix}`,
      );
      return () => undefined;
    }

    const animationKey = runKey;
    const duration = 1200;
    let start: number | null = null;

    const step = (timestamp: number): void => {
      void animationKey;
      if (start === null) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const current = parsed.value ? parsed.value * eased : 0;
      setDisplay(
        `${formatMetricValue(current, parsed.decimals)}${parsed.suffix}`,
      );
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };

    rafRef.current = window.requestAnimationFrame(step);

    return (): void => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [parsed, value, runKey]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRunKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return (): void => {
      observer.disconnect();
    };
  }, []);

  return <span ref={containerRef}>{display}</span>;
};
