import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { SiteShell } from "../../../components/layouts/site-shell";

describe("SiteShell", (): void => {
  it("renders header, content, and footer", (): void => {
    const html = renderToString(
      <SiteShell header={<div>header</div>} footer={<div>footer</div>}>
        <div>content</div>
      </SiteShell>
    );

    expect(html).toContain("header");
    expect(html).toContain("content");
    expect(html).toContain("footer");
  });
});
