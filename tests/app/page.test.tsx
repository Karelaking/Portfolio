import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import Page from "../../app/page";

describe("Page", (): void => {
  it("renders the page content", (): void => {
    const html = renderToString(<Page />);

    expect(html).toContain("Designing expressive interfaces");
  });
});
