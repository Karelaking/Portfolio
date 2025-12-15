'use client';

import React, { useCallback, useEffect, useRef } from "react";

export interface ScreenFitTextProps {
  text?: string;
  children?: React.ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
  className?: string;
}

export const ScreenFitText: React.FC<ScreenFitTextProps> = ({
  text,
  children,
  minFontSize = 1,
  maxFontSize = 2500,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const resizeText = useCallback((): void => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const containerWidth = container.offsetWidth;
    let lo = minFontSize;
    let hi = maxFontSize;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      textEl.style.fontSize = mid + "px";

      if (textEl.offsetWidth <= containerWidth) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    textEl.style.fontSize = hi + "px";
  }, [minFontSize, maxFontSize]);

  const handleResize = useCallback(() => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => resizeText(), 50) as unknown as number;
  }, [resizeText]);

  useEffect(() => {
    resizeText();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
  }, [handleResize, resizeText, text, children]);

  return (
    <div
      className={`flex w-full items-center overflow-hidden ${className}`}
      ref={containerRef}
    >
      <span
        ref={textRef}
        className="mx-auto whitespace-nowrap text-center font-bold uppercase text-slate-700"
      >
        {text ?? children ?? "Fit text to container"}
      </span>
    </div>
  );
};

export default ScreenFitText;