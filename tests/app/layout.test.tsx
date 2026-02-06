import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import RootLayout, { metadata, viewport } from "../../app/layout";

describe("RootLayout", (): void => {
  it("renders the html shell with children", (): void => {
    const html = renderToString(
      <RootLayout>
        <div>hello</div>
      </RootLayout>
    );

    expect(html).toContain("<html lang=\"en\">");
    expect(html).toContain("hello");
  });

  it("exposes typed metadata", (): void => {
    expect(metadata.title).toBe("Portfolio");
    expect(metadata.description).toBe("Personal portfolio website");
  });

  it("exposes typed viewport", (): void => {
    expect(viewport.width).toBe("device-width");
    expect(viewport.initialScale).toBe(1);
  });
});
