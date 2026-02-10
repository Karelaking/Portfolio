import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import Page from "../../app/page";

describe("Page", (): void => {
  it("renders the page content", async (): Promise<void> => {
    const html = renderToString(await Page());

    expect(html).toContain("Selected projects");
  });

  it("includes all primary sections", async (): Promise<void> => {
    const html = renderToString(await Page());

    expect(html).toContain("id=\"hero\"");
    expect(html).toContain("id=\"about\"");
    expect(html).toContain("id=\"expertise\"");
    expect(html).toContain("id=\"experience\"");
    expect(html).toContain("id=\"projects\"");
    expect(html).toContain("id=\"social\"");
    expect(html).toContain("id=\"blog\"");
    expect(html).toContain("id=\"gallery\"");
    expect(html).toContain("id=\"contact\"");
  });
});
