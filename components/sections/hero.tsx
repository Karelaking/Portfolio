"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { HeroData } from "@/lib/portfolio/types";

export interface HeroProps {
  data: HeroData;
}

export const Hero = ({ data }: HeroProps): ReactElement => {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
      <div className="flex flex-col gap-6">
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold leading-tight sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {data.title}
        </motion.h1>
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
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
            href="#projects"
          >
            Selected projects
            <motion.span
              className="inline-flex"
              whileHover={{ x: 3, y: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <IconArrowUpRight size={16} />
            </motion.span>
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
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        className="relative flex h-full items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          className="absolute -left-6 top-6 h-24 w-24 rounded-full border border-border"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-6 right-4 h-16 w-16 rounded-full border border-border"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-4 h-px w-32 -translate-x-1/2 bg-border/60" />
        <Image
          alt={data.imageAlt}
          src={data.imageSrc}
          width={420}
          height={520}
          className="relative w-full max-w-sm rounded-[2.5rem] border border-border bg-card p-6"
          priority
        />
      </motion.div>
    </section>
  );
};
