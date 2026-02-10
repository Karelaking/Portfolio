import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { SiteHeader } from "../../../components/layouts/site-header";

describe("SiteHeader", (): void => {
  it("renders the primary navigation", (): void => {
    const html = renderToString(<SiteHeader />);

    expect(html).toContain("MRADUL");
    expect(html).toContain("Home");
    expect(html).toContain("About");
    expect(html).toContain("Expertise");
    expect(html).toContain("Experience");
    expect(html).toContain("Projects");
    expect(html).toContain("Social");
    expect(html).toContain("Blog");
    expect(html).toContain("Gallery");
    expect(html).toContain("Contact");
  });
});
