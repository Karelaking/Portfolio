import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { SiteHeader } from "../../../components/layouts/site-header";

describe("SiteHeader", (): void => {
  it("renders the primary navigation", (): void => {
    const html = renderToString(<SiteHeader />);

    expect(html).toContain("Portfolio");
    expect(html).toContain("About");
    expect(html).toContain("Work");
    expect(html).toContain("Contact");
  });
});
