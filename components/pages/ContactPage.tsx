import Link from "next/link";
import { ContactForm } from "../clientComponent";
import { getSocialLinksAction } from "@/actions";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { SocialLink as SocialLinkType } from "@/types";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

const socialLinks = await getSocialLinksAction();

export const ContactPage = (): React.ReactNode => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="contact"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        label="Contact"
        title="Let’s craft a minimal presence for your next launch."
        copy="Reach out for product partnerships, leadership, or speaking opportunities."
      />
      <div className="grid w-full gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="border-border/70 bg-card rounded-3xl border p-6">
          <p className="text-muted-foreground text-sm">
            Send a note with your product goals or upcoming milestones.
          </p>
          <ContactForm />
        </div>
        <div className="border-border/70 bg-card rounded-3xl border p-6 text-center">
          <p className="text-muted-foreground text-lg tracking-[0.3em] uppercase">
            Connect with me on
          </p>
          <div className="mt-4 flex h-max w-full flex-col items-start justify-center gap-4 sm:h-full sm:items-center">
            {socialLinks.map((link: SocialLinkType) => (
              <Link
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 py-2 text-sm tracking-widest uppercase hover:underline"
              >
                <IconArrowUpRight size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="my-4 flex w-full justify-center">
        <Link
          className="border-border text-foreground hover:border-foreground inline-flex w-max items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition"
          href="/"
        >
          Back to the top
          <IconArrowUpRight size={14} />
        </Link>
      </div>
    </Container>
  );
};
