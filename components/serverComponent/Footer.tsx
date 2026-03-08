import Link from "next/link";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { FooterProps } from "@/types";
import type { ReactElement } from "react";
import { footerLinks, socialLinks } from "@/data/FooterLinks";

export const Footer = async ({
  className,
}: FooterProps): Promise<ReactElement> => {
  await headers();
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-border/60 border-t", className)}>
      <div className="mx-auto w-full max-w-5xl py-12 sm:border-x sm:border-dashed">
        <div className="grid gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 md:text-left lg:px-8">
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
              Portfolio
            </p>
            <p className="text-foreground text-lg font-semibold">
              Crafted in monochrome, tuned for clarity.
            </p>
            <p className="text-muted-foreground text-sm">
              Building resilient product systems with disciplined UI and
              pragmatic engineering.
            </p>
          </div>

          <div className="mx-auto flex w-full justify-center gap-20 sm:justify-end md:flex-row">
            <div className="space-y-3 sm:text-end">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
                Sections
              </p>
              <div className="grid gap-2 text-sm">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="hover:text-foreground transition"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3 sm:text-end">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
                Connect
              </p>
              <div className="grid gap-2 text-sm">
                {socialLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="hover:text-foreground transition"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/60 text-muted-foreground sm:text-normal mt-10 flex flex-col items-center justify-between gap-3 border-t px-4 pt-6 text-center text-xs sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {year} Portfolio. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase sm:tracking-[0.3em]">
            Built with lots of love and patience
          </p>
        </div>
      </div>
    </footer>
  );
};
