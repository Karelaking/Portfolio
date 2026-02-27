import React from 'react'
import { Container } from '../serverComponent';
import { getExpertiseIcon } from '@/data/Expertise';
import { getExpertiseAction } from '@/actions';
import { SectionOrnament } from '../visuals/section-ornament';
import { SectionHeader } from '../sections';
import { AnimatedIcon } from '../motion';

const expertise = await getExpertiseAction();

export const ExpertisePage = (): React.ReactElement => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="expertise"
    >
      <SectionOrnament className="top-10 right-10" />
      <SectionHeader
        label="Expertise"
        title="Disciplined craft across strategy, design, and code."
        copy="A focused toolkit for teams who want speed, polish, and clarity."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {expertise.map((item) => (
          <div
            className="border-border/70 bg-card rounded-3xl border p-6"
            key={item.id}
          >
            <div className="text-foreground flex items-center gap-3">
              <span className="border-border flex h-10 w-10 items-center justify-center rounded-full border">
                <AnimatedIcon>{getExpertiseIcon(item.icon)}</AnimatedIcon>
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-muted-foreground mt-3 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}