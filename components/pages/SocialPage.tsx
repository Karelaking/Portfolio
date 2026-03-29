import React from "react";
import { getSocialLinksAction } from "@/actions";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";
import { SocialLink } from "../clientComponent";
import type { SocialLink as SocialLinkType } from "@/types";

const socialLinks = await getSocialLinksAction();

export const SocialPage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="social"
    >
      <SectionOrnament className="right-6" />
      <SectionHeader
        label="Social"
        title="Find me across the digital word."
        copy="Open DMs for collaborations, talks, discussions and product ideas."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {socialLinks.map((link: SocialLinkType, index: number) => (
          <SocialLink key={link.id} link={link} index={index} />
        ))}
      </div>
    </Container>
  );
};
