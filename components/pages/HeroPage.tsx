import React from 'react'
import { cn } from '@/lib';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
import { getHeroAction } from '@/actions';
import { FadeIn } from '../motion';
import { Container } from '../serverComponent';
import { CountUpValue, HeroImage } from '../clientComponent';

const heroData = await getHeroAction();

export const HeroPage = (): React.ReactElement => {
  return (
    <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] py-12" id="hero">
      <div className="flex flex-col gap-6">
        <FadeIn>
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            Portfolio
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
            {heroData.title}
          </h1>
        </FadeIn>
        <p className="text-muted-foreground max-w-xl text-base">
          {heroData.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="border-foreground rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase">
            {heroData.subtitle}
          </span>
          <span className="text-muted-foreground text-xs">{heroData.location}</span>
        </div>
        <p className="text-muted-foreground text-sm">{heroData.availability}</p>
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
          {heroData.metrics.map((metric) => (
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
      <HeroImage imageAlt={heroData.imageAlt} imageSrc={heroData.imageSrc} />
    </Container>
  );
}