import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getHero } from "@/lib/portfolio/queries";
import { cn } from "@/lib";
import { CountUpValue, HeroImage } from "../clientComponent";
import { Container } from "../serverComponent";
import { ZoomHollowText } from "../clientComponent/zoom-hollow";
import { GREETINGS } from "@/data/NavigationLinks";

const heroData = await getHero();

const REGEX = /[.·•]/;
export const HeroPage = (): React.ReactElement => {
  const subtitleItems: string[] = heroData.subtitle
    .split(REGEX)
    .map((item: string): string => item.trim())
    .filter((item: string): boolean => item.length > 0);

  return (
    <Container
      className="relative grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]"
      id="#"
    >
      <div className="flex flex-col gap-6">
        <ZoomHollowText
          className="font-neutral-600 text-7xl"
          words={GREETINGS}
        />
        <h1 className="text-foreground text-4xl font-bold tracking-wider text-neutral-600 uppercase sm:text-5xl dark:text-neutral-300">
          mradul kumar katiyar
        </h1>
        <p className="max-w-xl font-sans text-base text-neutral-400 dark:text-neutral-400">
          {heroData.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {subtitleItems.map(
            (item: string): React.ReactElement => (
              <span
                className="border-border bg-muted/40 text-foreground/80 dark:bg-muted/20 inline-flex items-center rounded-full border px-3 py-1 text-[10px] leading-5 font-semibold tracking-[0.22em] uppercase sm:text-xs"
                key={item}
              >
                {item}
              </span>
            ),
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {heroData.metrics.map((metric) => (
            <div
              className={cn(
                "border-border/70 rounded-2xl border px-4 py-3",
                "bg-card hover:border-foreground/20 hover:bg-background/80 flex cursor-pointer items-center justify-center gap-6 text-end transition-transform duration-100 hover:scale-105 hover:shadow sm:flex-col sm:gap-2 sm:text-center",
              )}
              key={metric.label}
            >
              <p className="text-lg font-semibold text-neutral-600">
                <CountUpValue value={metric.value} />
              </p>
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="group text-background hover:text-foreground inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-600 px-5 py-2 text-sm font-medium transition hover:bg-transparent hover:opacity-90 dark:bg-transparent dark:text-white"
            href="#projects"
          >
            Selected projects
            <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <IconArrowUpRight size={16} />
            </span>
          </Link>
          <Link
            className="border-border text-foreground hover:border-foreground inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition"
            href="#contact"
          >
            Let’s collaborate
          </Link>
        </div>
      </div>
      <HeroImage imageAlt={heroData.imageAlt} imageSrc={heroData.imageSrc} />
    </Container>
  );
};
