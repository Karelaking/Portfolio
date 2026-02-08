import type { ReactElement } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { HeroData } from "@/types/portfolio";
import { CountUpValue } from "@/components/metrics/count-up-value";
import { FadeIn } from "@/components/motion/fade-in";
import { HeroImage } from "@/components/sections/hero-image";

export interface HeroProps {
  data: HeroData;
}

export const Hero = ({ data }: HeroProps): ReactElement => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
      <div className="flex flex-col gap-6">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Portfolio
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            {data.title}
          </h1>
        </FadeIn>
        <p className="max-w-xl text-base text-muted-foreground">
          {data.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            {data.subtitle}
          </span>
          <span className="text-xs text-muted-foreground">
            {data.location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {data.availability}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
            href="#projects"
          >
            Selected projects
            <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <IconArrowUpRight size={16} />
            </span>
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-foreground"
            href="#contact"
          >
            Let’s collaborate
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.metrics.map((metric) => (
            <div
              className={cn(
                "rounded-2xl border border-border/70 px-4 py-3",
                "bg-card"
              )}
              key={metric.label}
            >
              <p className="text-lg font-semibold">
                <CountUpValue value={metric.value} />
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <HeroImage imageAlt={data.imageAlt} imageSrc={data.imageSrc} />
    </section>
  );
};
