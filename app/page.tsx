import type { ReactElement } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteShell } from "@/components/layouts/site-shell";

const Page = (): ReactElement => {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="flex flex-col gap-6" id="about">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Portfolio
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Designing expressive interfaces for ambitious teams.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          I craft product experiences that balance clarity, speed, and elegance.
          From design systems to production-ready builds, I help teams ship with
          confidence.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
            href="#work"
          >
            View work
          </Link>
          <Link
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-foreground"
            href="#contact"
          >
            Let’s talk
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3" id="work">
        {[
          {
            title: "Product Strategy",
            description:
              "Translating vision into measurable, human-centered outcomes.",
          },
          {
            title: "Design Systems",
            description:
              "Building cohesive libraries that keep teams aligned and fast.",
          },
          {
            title: "Frontend Delivery",
            description:
              "Shipping refined interfaces with performance-first engineering.",
          },
        ].map((item) => (
          <div
            className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm"
            key={item.title}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 flex flex-col gap-4" id="contact">
        <h2 className="text-2xl font-semibold">Let’s build your next release.</h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Reach out for partnerships, product collaborations, or speaking
          engagements.
        </p>
        <Link
          className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          href="mailto:hello@portfolio.com"
        >
          hello@portfolio.com
        </Link>
      </section>
    </SiteShell>
  );
};

export default Page;