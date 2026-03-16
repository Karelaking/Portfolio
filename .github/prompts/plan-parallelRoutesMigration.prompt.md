## Plan: Parallel Routes Migration for Simpler, Faster App

Refactor routing architecture from page-level composition to App Router route groups + parallel slots so each major section and dashboard panel can render independently, stream progressively, and share layouts without repeating wrappers. Start with homepage and dedicated content routes, then extend the same slot pattern to dashboard CRUD flows.

**Steps**

1. Baseline architecture and constraints (foundational)
   - Confirm current route map under `app/` and duplicated composition patterns (already discovered).
   - Record baseline behavior: current home section order, dedicated routes (`/projects`, `/experience`, `/gallery`, `/writing`), dashboard routes (`/dashboard/*`).
   - Decide migration principle: prefer route groups and slots over giant composed pages; allow URL restructuring (user-approved).

2. Introduce route-grouped home shell with parallel slots (Phase 1)
   - Create a route group for marketing/public shell (e.g., `app/(site)/`).
   - Add a slot-based layout in `app/(site)/layout.tsx` with explicit slots for independently loading sections (example: `@hero`, `@about`, `@expertise`, `@experience`, `@projects`, `@social`, `@writing`, `@gallery`, `@contact`).
   - Move each home section from composition in `app/page.tsx` into slot pages in their respective parallel folders.
   - Add `default.tsx` per slot to keep layout stable when slot route is absent.
   - Dependency: blocks Step 3; this is the core architecture change.

3. Collapse duplicated page wrappers via shared route-group layouts (Phase 2)
   - Move shared wrappers (`Container`, `SectionHeader`, `SectionOrnament`, back-link zones) into route-group layout templates for content pages.
   - Replace repeated per-page suspense skeletons with slot-level `loading.tsx` where possible.
   - Keep individual page files focused on data + content mapping only.
   - Parallel with Step 4 for independent route families.

4. Add parallel routes to dedicated content pages (Phase 3)
   - For routes like `/projects`, `/experience`, `/gallery`, `/writing`, create grouped layouts with secondary slots (example: main list + side summary/filters/meta).
   - If side panels are optional, provide `default.tsx` for dormant slots to avoid rendering errors.
   - Introduce intercepting routes only where modal/detail overlays are needed (optional optimization path).
   - Depends on Step 2 patterns; can run parallel with Step 5 once slot conventions are fixed.

5. Apply slot architecture to dashboard CRUD flows (Phase 4)
   - Restructure dashboard using parallel routes for stable shell + independent panels, e.g.:
     - `@overview` (index stats/cards)
     - `@resourceList` (projects/experience/gallery list)
     - `@editor` (new/edit forms)
     - `@activity` or `@preview` (optional)
   - Use route groups for resources to reduce repeated list/form boilerplate.
   - Add intercepting routes for `new`/`edit` modals if you want in-context editing without full navigational jumps.
   - Dependency: follows slot conventions from Steps 2–4.

6. Streaming, loading, and error boundaries hardening (Phase 5)
   - Add `loading.tsx`/`error.tsx` per route group and per heavy slot to prevent full-page blocking.
   - Ensure each slot fetches independently and avoids parent-level await bottlenecks.
   - Keep Suspense boundaries close to data-heavy UI instead of wrapping entire pages.

7. Navigation and URL finalization (Phase 6)
   - Update `data/NavigationLinks.ts` and section anchors/links to final URL design.
   - Ensure old links either remain valid or are redirected.
   - Validate mobile + desktop navigation parity.

8. Performance verification and regression checks (Phase 7)
   - Measure perceived improvements: faster first paint of shell, progressive section render, fewer blocking waterfalls.
   - Confirm functional parity of all public pages and dashboard CRUD paths.
   - Stabilize with final cleanup: remove dead composition files and obsolete wrappers.

**Relevant files**

- `e:\portfolio\app\page.tsx` — current monolithic section composition; primary migration target.
- `e:\portfolio\app\layout.tsx` — global shell; ensure new route groups remain compatible.
- `e:\portfolio\app\projects\page.tsx` — repeated wrapper/suspense pattern to migrate into grouped layout+slots.
- `e:\portfolio\app\experience\page.tsx` — same repeated content-route pattern.
- `e:\portfolio\app\gallery\page.tsx` — same repeated content-route pattern with custom skeleton.
- `e:\portfolio\app\writing\page.tsx` — align with grouped content-slot conventions.
- `e:\portfolio\app\dashboard\layout.tsx` — dashboard shell for parallel slot integration.
- `e:\portfolio\app\dashboard\page.tsx` — dashboard overview candidate for `@overview` slot.
- `e:\portfolio\app\dashboard\projects\**\page.tsx` — CRUD route family to convert to list/editor slots.
- `e:\portfolio\app\dashboard\experience\**\page.tsx` — CRUD route family to convert to list/editor slots.
- `e:\portfolio\app\dashboard\gallery\**\page.tsx` — CRUD route family to convert to list/editor slots.
- `e:\portfolio\components\serverComponent\Container.tsx` — shared wrapper to avoid per-page duplication.
- `e:\portfolio\components\serverComponent\SectionHeader.tsx` — shared section heading abstraction.
- `e:\portfolio\components\pages\*.tsx` — candidates for decomposition into route-slot content.
- `e:\portfolio\data\NavigationLinks.ts` — URL/nav updates after route-group changes.

**Verification**

1. Route architecture checks
   - Confirm all intended App Router entry points are discoverable and compile.
   - Validate each parallel slot has a `default.tsx` where required.
2. UX correctness
   - Public home route renders full shell even when one slot is delayed.
   - Dedicated routes render with shared grouped layout and no duplicated wrappers.
   - Dashboard shows stable shell while list/editor slots stream independently.
3. Performance behavior
   - Verify independent slot loading reduces full-page waiting (manual dev check).
   - Confirm Suspense boundaries are granular and not wrapped at whole-page level.
4. Regression checks
   - Navigation links resolve to final URLs.
   - Existing CRUD paths still functional (or redirected if intentionally changed).
   - No new type/lint/build errors after migration.

**Decisions**

- Include scope: homepage + dedicated content routes + dashboard (user-approved).
- URL updates are allowed if they simplify architecture (user-approved).
- Prioritize route groups + parallel routes before adding intercepting/modal route complexity.

**Further Considerations**

1. Dashboard UX mode
   - Option A: side-by-side list/editor slots (best for power users).
   - Option B: list-only + intercepting modal editor (cleaner, less layout complexity).
   - Recommendation: start with A for clarity, add B selectively.
2. Homepage slot count
   - Option A: one slot per section (max modularity).
   - Option B: grouped slots by domain (e.g., `@content`, `@social`, `@contact`) for less file overhead.
   - Recommendation: start A, collapse to B only if maintenance cost rises.
3. Migration strategy
   - Option A: incremental per route family (safer).
   - Option B: big-bang full routing rewrite (faster but riskier).
   - Recommendation: Option A with phased rollout.
