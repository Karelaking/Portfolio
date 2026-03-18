# UI Component Tracker & Consistency Guide

_Last updated: 2026-03-15_

This document is the **single source of truth** for UI reuse in this repo.
Use it before creating any new UI to avoid duplicate implementations and keep visual/system consistency.

---

## Why this file exists

- Prevent rewriting the same UI logic repeatedly.
- Keep spacing, typography, motion, and interaction patterns consistent.
- Help agents choose existing components first, then extend, then create new only if necessary.

---

## Reuse-first decision flow (must follow)

1. **Check existing section/page components** in `components/pages`.
2. **Check shared server layout primitives** in `components/serverComponent`.
3. **Check client interaction components** in `components/clientComponent`.
4. **Check UI primitives** in `components/ui`.
5. If still missing, **extend an existing component**.
6. Create a new component **only when no existing component or variant fits**.

If a new component is created, update this file in the same PR/change.

---

## Global UI architecture

### App composition

- Home route composition: `app/page.tsx`
  - `HeroPage` → `AboutPage` → `ExpertisePage` → `ExperiencePage` → `ProjectsPage` → `SocialPage` → `WritingPage` → `GalleryPage` → `ContactPage`
- Dedicated writing route: `app/writing/page.tsx`

### Global providers

- `app/providers.tsx`
  - `AppThemeProvider`
  - `CursorFollower`
  - `AnalyticsProvider` (lazy)
  - `Toaster`

---

## Core layout primitives (reuse everywhere)

| Component         | Path                                              | Purpose                                              | Reuse notes                                                      |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| `Container`       | `components/serverComponent/Container.tsx`        | Standard section shell with border/scales/max widths | Use for every major page section before creating custom wrappers |
| `SectionHeader`   | `components/serverComponent/SectionHeader.tsx`    | Consistent label/title/copy pattern                  | Use for all section headers                                      |
| `SectionOrnament` | `components/serverComponent/section-ornament.tsx` | Decorative section marker                            | Use as optional section accent                                   |
| `NavigationBar`   | `components/serverComponent/NavigationBar.tsx`    | Desktop nav + mobile menu + theme toggle             | Do not duplicate top-nav logic                                   |
| `Footer`          | `components/serverComponent/Footer.tsx`           | Global footer                                        | Extend here instead of custom footers                            |

---

## Client interaction components

| Component          | Path                                                | Purpose                                                | Reuse notes                                              |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| `WritingPostsGrid` | `components/clientComponent/writing-posts-grid.tsx` | Expandable writing cards (cover, title, content, tags) | Use for all writing/post card experiences                |
| `GalleryImage`     | `components/clientComponent/gallery-image.tsx`      | Gallery item with modal/open interactions              | Reuse for media grid cards                               |
| `ContactForm`      | `components/clientComponent/contact-form.tsx`       | Contact submission UI                                  | Reuse for public contact workflow                        |
| `ThemeToggle`      | `components/clientComponent/theme-toggle.tsx`       | Light/dark switch                                      | Reuse globally; do not recreate toggles                  |
| `MobileMenu`       | `components/clientComponent/MobileMenu.tsx`         | Mobile nav drawer/sheet                                | Reuse for nav-only mobile interactions                   |
| `CursorFollower`   | `components/clientComponent/cursor-follower.tsx`    | Optimized pointer follower effect                      | Already globally mounted; avoid duplicate cursor effects |
| `SocialLink`       | `components/clientComponent/social-link.tsx`        | Social link card                                       | Use in social listing sections                           |
| `ExperienceCard`   | `components/clientComponent/experience-card.tsx`    | Experience item card                                   | Reuse in timeline/list views                             |

Note: `blog-grid.tsx` is legacy from old Blog section; prefer `WritingPostsGrid` for writing content UIs.

---

## UI primitives (base building blocks)

Use from `components/ui/index.ts`:

- `Button`, `buttonVariants`
- `AlertDialog` family
- `Sheet` family
- `Toaster`
- `PixelatedCanvas`

Rule: if behavior is button/dialog/sheet/toast-like, compose from these primitives first.

---

## Page sections map (source of truth)

| Section label | Component        | Path                                  |
| ------------- | ---------------- | ------------------------------------- |
| Hero          | `HeroPage`       | `components/pages/HeroPage.tsx`       |
| About         | `AboutPage`      | `components/pages/AboutPage.tsx`      |
| Expertise     | `ExpertisePage`  | `components/pages/ExpertisePage.tsx`  |
| Experience    | `ExperiencePage` | `components/pages/ExperiencePage.tsx` |
| Projects      | `ProjectsPage`   | `components/pages/ProjectsPage.tsx`   |
| Social        | `SocialPage`     | `components/pages/SocialPage.tsx`     |
| Writing       | `WritingPage`    | `components/pages/WritingPage.tsx`    |
| Gallery       | `GalleryPage`    | `components/pages/GalleryPage.tsx`    |
| Contact       | `ContactPage`    | `components/pages/ContactPage.tsx`    |

---

## Content models and where to edit

| Content type                                  | Source file               |
| --------------------------------------------- | ------------------------- |
| Writing posts (cover/title/content/tags/date) | `data/WritingPosts.ts`    |
| Navigation links                              | `data/NavigationLinks.ts` |
| Footer links                                  | `data/FooterLinks.ts`     |
| Social icons/links                            | `data/SocialIcons.tsx`    |

Type contracts:

- Writing post interface: `types/writing-post.interface.ts`

---

## Consistency rules for new UI generation

### Visual consistency

- Use `Container` + `SectionHeader` pattern for section-level UI.
- Keep monochrome palette and existing border-radius scale (`rounded-2xl/3xl`).
- Reuse tracking/uppercase micro-label style for metadata.

### Interaction consistency

- Use `framer-motion` for motion where needed; prefer subtle hover/fade/lift.
- Respect reduced motion (`useReducedMotion`) for optional effects.
- Use existing outside-click and escape-close patterns for overlays/modals.

### Technical consistency

- Reuse `cn()` from `lib/utils.ts` for class composition.
- Keep explicit exports/imports (no barrels beyond existing intentional index files).
- Prefer extending existing components over introducing similar variants.

---

## Anti-duplication checklist (before adding a new component)

- [ ] I searched `components/clientComponent` for similar interaction behavior.
- [ ] I searched `components/serverComponent` for matching section/layout wrapper.
- [ ] I checked `components/ui` for primitive replacement.
- [ ] I confirmed no existing component can be extended with props/slots.
- [ ] I documented the new component in this tracker.

If any box above is unchecked, do not add a new component yet.

---

## Naming and structure conventions

- Place reusable interactive components in `components/clientComponent`.
- Place section/page composites in `components/pages`.
- Place stable layout primitives in `components/serverComponent`.
- Place low-level primitives in `components/ui`.
- Use PascalCase file names for page components (`WritingPage.tsx`) and existing repo naming conventions for client/server parts.

---

## Agent note for future UI tasks

When asked to generate new UI:

1. Start with this file.
2. Reuse from listed components.
3. Keep existing section rhythm (header + content + subtle ornament).
4. Avoid introducing new visual language unless explicitly requested.
5. Update this file after meaningful UI additions/refactors.
