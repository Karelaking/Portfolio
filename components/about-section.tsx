"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { PixelatedCanvas } from "./ui/pixelated-canvas";
import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <SectionContainer
      id="about"
      className="mb-12 flex min-h-screen w-full items-center justify-center py-0"
    >
      <div className="flex flex-col md:flex-row md:gap-25 items-center">
        <div className="flex h-screen flex-col items-center justify-center md:w-1/3">
          <div className="flex w-full">
            <div className="h-max w-full">
              <div
                ref={containerRef}
                className="relative flex aspect-9/14 w-full rounded-4xl"
              >
                {dimensions.width > 0 && dimensions.height > 0 && (
                  <PixelatedCanvas
                    src="/photo.jpeg"
                    width={dimensions.width}
                    height={dimensions.height}
                    cellSize={4}
                    dotScale={0.9}
                    shape="square"
                    backgroundColor="#000000"
                    dropoutStrength={0.1}
                    interactive
                    distortionStrength={0.1}
                    distortionRadius={200}
                    distortionMode="repel"
                    followSpeed={0.2}
                    jitterStrength={4}
                    jitterSpeed={1}
                    sampleAverage
                    className="rounded-xl shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
          <h1 className="font-mea-culpa mt-6 w-fit text-center text-5xl md:hidden">
            Mradul kumar katiyar
          </h1>
          <div className="mt-4 flex gap-4 md:hidden">
            <span className="size-2 animate-pulse rounded-full bg-neutral-500" />
            <span className="size-2 animate-pulse rounded-full bg-neutral-500 delay-100" />
            <span className="size-2 animate-pulse rounded-full bg-neutral-500 delay-200" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-16 md:h-full">
          <h1 className="font-mea-culpa mt-6 hidden w-fit text-8xl md:block">
            Mradul kumar katiyar
          </h1>
          <span className="first-letter:float font-mea-culpa text-center text-2xl wrap-break-word first-letter:mr first-letter:text-5xl first-letter:leading-4 md:text-start md:text-4xl lowercase first-letter:font-bold first-letter:uppercase px-2 md:px-0">
            I am a passionate full-stack developer with a love for crafting
            beautiful, intuitive, and performant web experiences. with expertise
            in modern technologies like React, Next.js, and Node.js, I transform
            ideas into reality through clean code and creative problem-solving.
            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community. I believe in continuous learning and pushing
            the boundaries of what&apos;s possible on the web.
          </span>
          <div className="mt-4 hidden w-full justify-center gap-4 md:flex">
            <span className="size-2 animate-pulse rounded-full bg-neutral-500" />
            <span className="size-2 animate-pulse rounded-full bg-neutral-500 delay-100" />
            <span className="size-2 animate-pulse rounded-full bg-neutral-500 delay-200" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
