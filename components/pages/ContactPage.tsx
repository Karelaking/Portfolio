import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
import { SectionHeader, ContactForm } from '../sections';
import { SectionOrnament } from '../visuals';
import { Container } from '../serverComponent';
import { getPrimaryServicesAction } from '@/actions';

const primaryServices = await getPrimaryServicesAction();

export const ContactPage = ():React.ReactNode => {
  return (
    <Container
      className="border-border/70 relative flex flex-col gap-8 py-12"
      id="contact"
    >
      <SectionOrnament className="right-auto left-8" />
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
        <div className="border-border/70 bg-card rounded-3xl border p-6">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
            Primary services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryServices.map((item) => (
              <li key={item.id}>• {item.label}</li>
            ))}
          </ul>
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
}