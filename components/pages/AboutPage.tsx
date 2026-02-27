import { ReactElement } from 'react'
import { FadeIn } from '../motion';
import { SectionHeader } from '../sections';
import { SectionOrnament } from '../visuals';
import { getCurrentFocusAction } from '@/actions';
import { Container } from '../serverComponent';

const currentFocus = await getCurrentFocusAction();

export const AboutPage = (): ReactElement => {
  return (
    <Container className="relative flex flex-col gap-8 py-12" id="about">
      <SectionOrnament />
      <SectionHeader
        label="About"
        title="Focused, detail-driven, and built for scale."
        copy="I build full stack systems where disciplined UI meets pragmatic backend engineering. The goal is always the same: clean UX, reliable APIs, and long-term maintainability."
      />
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <FadeIn className="border-border/70 bg-card rounded-3xl border p-6">
          <p className="text-muted-foreground text-sm">
            I craft monochrome, high-precision experiences that prioritize
            performance, clarity, and resilience. Every interface I ship is
            meant to be fast, consistent, and easy to extend.
          </p>
        </FadeIn>
        <FadeIn className="border-border/70 bg-card rounded-3xl border p-6">
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            Current focus
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {currentFocus.map((item) => (
              <li key={item.id}>↳ {item.label}</li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Container>
  );
}