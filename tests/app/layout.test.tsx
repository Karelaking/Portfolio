import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import RootLayout, { metadata, viewport } from "../../app/layout";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains-mono" }),
  Mea_Culpa: () => ({ variable: "--font-mea-culpa" }),
}));

vi.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe("RootLayout", (): void => {
  it("renders the html shell with children", (): void => {
    const html = renderToString(
      <RootLayout>
        <div>hello</div>
      </RootLayout>
    );

    expect(html).toContain("<html lang=\"en\"");
    expect(html).toContain("hello");
  });

  it("exposes typed metadata", (): void => {
    expect(metadata.title).toEqual({
      default: "Portfolio",
      template: "%s | Portfolio",
    });
    expect(metadata.description).toBe("Personal portfolio website");
  });

  it("exposes typed viewport", (): void => {
    expect(viewport.width).toBe("device-width");
    expect(viewport.initialScale).toBe(1);
  });
});
