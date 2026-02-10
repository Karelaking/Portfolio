import type { ReactElement } from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { HeroData } from "@/types/hero-data.interface";
import { CountUpValue } from "@/components/metrics";
import { FadeIn } from "@/components/motion";
import { HeroImage } from "@/components/sections/hero-image";

export interface HeroProps {
  data: HeroData;
}

export const Hero = ({ data }: HeroProps): ReactElement => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
      <div className="flex flex-col gap-6">
        <FadeIn>
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            Portfolio
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
            {data.title}
          </h1>
        </FadeIn>
        <p className="text-muted-foreground max-w-xl text-base">
          {data.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
            {data.subtitle}
          </span>
          <span className="text-muted-foreground text-xs">{data.location}</span>
        </div>
        <p className="text-muted-foreground text-sm">{data.availability}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="group bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition hover:opacity-90"
            href="#projects"
          >
            Selected projects
            <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
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
        <div className="grid gap-4 sm:grid-cols-3">
          {data.metrics.map((metric) => (
            <div
              className={cn(
                "border-border/70 rounded-2xl border px-4 py-3",
                "bg-card",
              )}
              key={metric.label}
            >
              <p className="text-lg font-semibold">
                <CountUpValue value={metric.value} />
              </p>
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
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
