import { IconArrowUpRight } from '@tabler/icons-react';
import React from 'react'
import { AnimatedIcon } from '../motion';
import { SectionHeader } from '../sections';
import { SectionOrnament } from '../visuals';
import { getSocialLinksAction } from '@/actions';
import { Container } from '../serverComponent';
import { getSocialIcon } from '@/data/SocialIcons';

const socialLinks = await getSocialLinksAction();

export const SocialPage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="social"
    >
      <SectionOrnament className="right-auto left-8" />
      <SectionHeader
        label="Social"
        title="Find me across the monochrome web."
        copy="Open DMs for collaborations, talks, and product ideas."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {socialLinks.map((link) => (
          <a
            className="border-border/70 bg-card flex items-center justify-between rounded-2xl border px-4 py-4 text-sm"
            href={link.href}
            key={link.id}
            rel="noreferrer"
            target="_blank"
          >
            <div className="flex items-center gap-3">
              <span className="border-border flex h-9 w-9 items-center justify-center rounded-full border">
                <AnimatedIcon>{getSocialIcon(link.platform)}</AnimatedIcon>
              </span>
              <span>{link.label}</span>
            </div>
            <IconArrowUpRight size={16} />
          </a>
        ))}
      </div>
    </Container>
  );
}
