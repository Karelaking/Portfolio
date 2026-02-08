import type { ReactElement } from "react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandBehance,
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
  IconLayoutGrid,
  IconMail,
  IconSparkles,
  IconStack,
} from "@tabler/icons-react";
import { FadeIn } from "@/components/motion/fade-in";
import { AnimatedIcon } from "@/components/motion/animated-icon";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteShell } from "@/components/layouts/site-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { Hero } from "@/components/sections/hero";
import { GalleryImage } from "@/components/sections/gallery-image";
import { HeroSkeleton } from "@/components/sections/hero-skeleton";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionOrnament } from "@/components/visuals/section-ornament";
import {
  getBlogPosts,
  getCurrentFocus,
  getExperience,
  getExpertise,
  getGalleryImages,
  getHero,
  getPrimaryServices,
  getProjects,
  getSocialLinks,
} from "@/lib/portfolio/queries";
import type { ExpertiseItem, SocialLink } from "@/types/portfolio";

export const revalidate = 0;

const getExpertiseIcon = (icon: ExpertiseItem["icon"]): ReactElement => {
  switch (icon) {
    case "strategy":
      return <IconSparkles size={22} />;
    case "system":
      return <IconLayoutGrid size={22} />;
    case "frontend":
      return <IconCode size={22} />;
    case "direction":
      return <IconStack size={22} />;
    default:
      return <IconSparkles size={22} />;
  }
};

const getSocialIcon = (platform: SocialLink["platform"]): ReactElement => {
  switch (platform) {
    case "github":
      return <IconBrandGithub size={20} />;
    case "linkedin":
      return <IconBrandLinkedin size={20} />;
    case "x":
      return <IconBrandX size={20} />;
    case "dribbble":
      return <IconBrandDribbble size={20} />;
    case "behance":
      return <IconBrandBehance size={20} />;
    case "instagram":
      return <IconBrandInstagram size={20} />;
    case "email":
      return <IconMail size={20} />;
    default:
      return <IconBrandGithub size={20} />;
  }
};

const Page = async (): Promise<ReactElement> => {
  const [
    expertise,
    experience,
    projects,
    socialLinks,
    blogPosts,
    gallery,
    currentFocus,
    primaryServices,
  ] = await Promise.all([
    getExpertise(),
    getExperience(),
    getProjects(),
    getSocialLinks(),
    getBlogPosts(),
    getGalleryImages(),
    getCurrentFocus(),
    getPrimaryServices(),
  ]);

  const featuredProjects = projects.slice(0, 4);
  const featuredExperience = experience.slice(0, 3);
  const hasMoreExperience = experience.length > featuredExperience.length;
  const featuredGallery = gallery.slice(0, 4);
  const hasMoreGallery = gallery.length > featuredGallery.length;

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="about"
      >
        <SectionOrnament />
        <SectionHeader
          label="About"
          title="Focused, detail-driven, and built for scale."
          copy="I build full stack systems where disciplined UI meets pragmatic backend engineering. The goal is always the same: clean UX, reliable APIs, and long-term maintainability."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <FadeIn className="rounded-3xl border border-border/70 bg-card p-6">
            <p className="text-sm text-muted-foreground">
              I craft monochrome, high-precision experiences that prioritize
              performance, clarity, and resilience. Every interface I ship is
              meant to be fast, consistent, and easy to extend.
            </p>
          </FadeIn>
          <FadeIn className="rounded-3xl border border-border/70 bg-card p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Current focus
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {currentFocus.map((item) => (
                <li key={item.id}>↳ {item.label}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="expertise"
      >
        <SectionOrnament className="right-10 top-10" />
        <SectionHeader
          label="Expertise"
          title="Disciplined craft across strategy, design, and code."
          copy="A focused toolkit for teams who want speed, polish, and clarity."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {expertise.map((item) => (
            <div
              className="rounded-3xl border border-border/70 bg-card p-6"
              key={item.id}
            >
              <div className="flex items-center gap-3 text-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                  <AnimatedIcon>{getExpertiseIcon(item.icon)}</AnimatedIcon>
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="experience"
      >
        <SectionOrnament className="left-6 right-auto" />
        <SectionHeader
          label="Experience"
          title="Monochrome systems in the wild."
          copy="Product, studio, and engineering roles that refined the craft."
        />
        <div className="space-y-6">
          {featuredExperience.map((item) => (
            <div
              className="rounded-3xl border border-border/70 bg-card p-6"
              key={item.id}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-lg font-semibold">
                    {item.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.company}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.summary}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {item.highlights.map((highlight) => (
                  <li key={`${item.id}-${highlight}`}>• {highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {hasMoreExperience ? (
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
              href="/experience"
            >
              Show more
              <IconArrowUpRight size={14} />
            </Link>
          </div>
        ) : null}
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="projects"
      >
        <SectionOrnament className="right-8" />
        <SectionHeader
          label="Projects"
          title="Selected builds in black and white."
          copy="A snapshot of recent work across product and interface design."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              className="rounded-3xl border border-border/70 bg-card p-6"
              key={project.id}
            >
              <Image
                alt={project.imageAlt}
                src={project.imageSrc}
                width={520}
                height={360}
                className="h-40 w-full rounded-2xl border border-border bg-background object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <a
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground"
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  View
                  <IconArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    className="rounded-full border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        {projects.length > featuredProjects.length ? (
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
              href="/projects"
            >
              Show more
              <IconArrowUpRight size={14} />
            </Link>
          </div>
        ) : null}
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="social"
      >
        <SectionOrnament className="left-8 right-auto" />
        <SectionHeader
          label="Social"
          title="Find me across the monochrome web."
          copy="Open DMs for collaborations, talks, and product ideas."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-4 text-sm"
              href={link.href}
              key={link.id}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <AnimatedIcon>
                    {getSocialIcon(link.platform)}
                  </AnimatedIcon>
                </span>
                <span>{link.label}</span>
              </div>
              <IconArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="blog"
      >
        <SectionOrnament />
        <SectionHeader
          label="Blog"
          title="Writing about quiet product systems."
          copy="Thoughts on minimalism, systems, and the craft of building."
        />
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <a
              className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card px-5 py-4"
              href={post.href}
              key={post.id}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>{post.date}</span>
                <IconArrowUpRight size={14} />
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="gallery"
      >
        <SectionOrnament className="right-10" />
        <SectionHeader
          label="Gallery"
          title="Minimal frames, maximal focus."
          copy="Recent explorations in monochrome composition."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredGallery.map((image) => (
            <GalleryImage
              key={image.id}
              alt={image.alt}
              src={image.src}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
        {hasMoreGallery ? (
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground"
              href="/gallery"
            >
              Show more
              <IconArrowUpRight size={14} />
            </Link>
          </div>
        ) : null}
      </section>

      <section
        className="relative mt-20 flex flex-col gap-8 border-t border-border/70 pt-12"
        id="contact"
      >
        <SectionOrnament className="left-8 right-auto" />
        <SectionHeader
          label="Contact"
          title="Let’s craft a minimal presence for your next launch."
          copy="Reach out for product partnerships, leadership, or speaking opportunities."
        />
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Send a note with your product goals or upcoming milestones.
            </p>
            <ContactForm />
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Primary services
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryServices.map((item) => (
                <li key={item.id}>• {item.label}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          href="#hero"
        >
          Back to top
          <IconArrowUpRight size={14} />
        </Link>
      </section>
    </SiteShell>
  );
};

export default Page;

const HeroSection = async (): Promise<ReactElement> => {
  const hero = await getHero();
  return <Hero data={hero} />;
};