import { describe, expect, it } from "vitest";
import {
  getBlogPosts,
  getCurrentFocus,
  getExperience,
  getExpertise,
  getGalleryImages,
  getPrimaryServices,
  getProjects,
  getSocialLinks,
} from "@/lib/portfolio/queries";

describe("portfolio data", (): void => {
  it("returns expertise entries", async (): Promise<void> => {
    const data = await getExpertise();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns experience entries", async (): Promise<void> => {
    const data = await getExperience();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns current focus entries", async (): Promise<void> => {
    const data = await getCurrentFocus();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns projects entries", async (): Promise<void> => {
    const data = await getProjects();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns social links", async (): Promise<void> => {
    const data = await getSocialLinks();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns blog posts", async (): Promise<void> => {
    const data = await getBlogPosts();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns gallery images", async (): Promise<void> => {
    const data = await getGalleryImages();
    expect(data.length).toBeGreaterThan(0);
  });

  it("returns primary services entries", async (): Promise<void> => {
    const data = await getPrimaryServices();
    expect(data.length).toBeGreaterThan(0);
  });
});
