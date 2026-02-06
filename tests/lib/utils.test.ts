import { describe, expect, it } from "vitest";
import { cn } from "../../lib/utils";

describe("cn", (): void => {
  it("merges tailwind classes", (): void => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("filters falsy values", (): void => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});
