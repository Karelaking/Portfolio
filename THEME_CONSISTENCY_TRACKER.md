# Theme Consistency Tracker

_Last updated: 2026-08-07_

This file is the **single source of truth for theme decisions** (colors, tokens, dark mode, typography, and theme behavior) across the project.

Use this before creating or editing UI so agents/devs keep styling consistent and avoid duplicate theme logic.

---

## Purpose

- Keep theme usage consistent across all pages/components.
- Prevent hardcoded colors and repeated custom theme logic.
- Ensure dark/light/system behavior remains predictable.
- Provide a reusable checklist for future UI generation.

---

## Source-of-truth theme files

| Concern                                         | File                                          |
| ----------------------------------------------- | --------------------------------------------- |
| Theme tokens + CSS variables + dark mode values | `app/globals.css`                             |
| Theme provider (next-themes) + app wiring       | `app/providers.tsx`                           |
| User toggle UI                                  | `components/clientComponent/theme-toggle.tsx` |
| View Transition circular reveal around toggle   | `components/animations/transitions/theme-toggle-circular.tsx` |
| Font families (`geist-sans`, `instrument-sans`) | `tailwind.config.ts`                          |

---

## Current theme runtime behavior

### Provider configuration

From `app/providers.tsx`:

- `attribute="class"`
- `defaultTheme="system"`
- `enableSystem`

This means:

- Theme is applied via `.dark` class.
- First load follows OS preference by default.
- Transitions are handled by the View Transition API (see below) rather than `disableTransitionOnChange`.

### Toggle behavior

From `theme-toggle.tsx` + `theme-toggle-circular.tsx`:

- Uses `useTheme()` from `next-themes`.
- Reads `resolvedTheme`; toggles between `dark` and `light` via `setTheme`.
- Uses mounted guard (`useMounted`) to avoid hydration mismatch visuals.
- Wrapped by `ThemeToggleCircular`, which animates a circular `clip-path` reveal around the click origin using the View Transition API (see `app/globals.css`).
- Falls back to an instant toggle when `startViewTransition` is unavailable or `prefers-reduced-motion: reduce` is set.

---

## Theme token system

### Base token mapping

In `app/globals.css`, `@theme inline` maps semantic utility tokens to CSS variables.

Key semantic tokens:

- Surface/background: `--color-background`, `--color-card`, `--color-popover`
- Text/foreground: `--color-foreground`, `--color-card-foreground`
- Inputs/borders/ring: `--color-input`, `--color-border`, `--color-ring`
- Muted/accent/secondary/primary/destructive
- Chart/sidebar token families

### Radius scale

Defined from base `--radius`:

- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- additional: `--radius-2xl`, `--radius-3xl`, `--radius-4xl`

### Color spaces

Uses OKLCH values for both light (`:root`) and dark (`.dark`).

---

## Typography theme constraints

From `tailwind.config.ts` + globals:

- `geist-sans` and `instrument-sans` families are theme-backed via CSS vars.
- Use semantic font utilities and existing classes:
  - Body/UI: Geist (`font-sans`)
  - Display headings: Instrument (`font-instrument-sans`)

Do not introduce random font families in component-level CSS.

---

## Global style conventions tied to theme

From `app/globals.css`:

- `body`: `bg-background text-foreground overflow-x-hidden antialiased`
- global border + outline alignment: `@apply border-border outline-ring/50`
- all text/headings: `select-none`
- monochrome custom scrollbar with dark variant overrides
- smooth scrolling + `scroll-padding-top: 6rem` + reduced-motion fallback
- View Transition rules: root override keeps colors normal, `::view-transition-new(root)` on top for the circular reveal, page navigation slide-fade via `vt-slide-fade-in`/`vt-slide-fade-out`, interaction disabled during transition, all disabled under reduced motion.
- Named animations defined in `@theme inline`: `--animate-cell-ripple`, `--animate-scroll`.
- Utility classes (non-token): `.hero-name` text stroke, `.animate-ping-slow`, `.scroll-section` reveal.

Use these conventions instead of redefining per component.

---

## Do / Don’t rules for new UI

### ✅ Do

- Use semantic theme classes:
  - `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`
- Use opacity variants on semantic colors when needed (e.g., `border-border/70`).
- Reuse existing radius scale (`rounded-2xl`, `rounded-3xl`) for cards/surfaces.
- Use `ThemeToggle` for user-facing theme switch.

### ❌ Don’t

- Don’t hardcode hex colors for normal surfaces/text (except intentional media/visual effects).
- Don’t create extra theme context/providers.
- Don’t implement separate dark-mode logic in components when semantic classes already solve it.
- Don’t duplicate toggle logic outside `ThemeToggle` unless extending the existing component.

---

## Theme consistency checklist (before merging UI changes)

- [ ] I used semantic theme utilities, not raw hardcoded colors for core UI.
- [ ] New cards/surfaces use existing radius and border patterns.
- [ ] Dark mode works via `.dark` class without component-specific hacks.
- [ ] I reused `ThemeToggle`/the `next-themes` provider in `app/providers.tsx` instead of adding parallel logic.
- [ ] I checked contrast/readability in both light and dark modes.
- [ ] If I introduced new theme tokens, I documented them here and in `app/globals.css`.

---

## Quick token usage map (recommended)

| Use case        | Preferred classes                              |
| --------------- | ---------------------------------------------- |
| Page background | `bg-background`                                |
| Card surface    | `bg-card border border-border/70`              |
| Primary text    | `text-foreground`                              |
| Secondary text  | `text-muted-foreground`                        |
| Focus ring      | `focus-visible:ring-1 focus-visible:ring-ring` |
| Input shell     | `bg-background border border-input`            |
| Subtle accents  | `bg-accent text-accent-foreground`             |

---

## Agent workflow for theme-safe UI generation

1. Check this file first.
2. Build with semantic theme classes only.
3. Reuse existing layout primitives (`Container`, `SectionHeader`) and UI primitives.
4. Verify both light and dark variants visually.
5. Update this file if token rules or theme architecture changes.

---

## Relation to other tracker docs

- UI inventory and component reuse: `UI_COMPONENT_TRACKER.md`
- This file focuses only on theme consistency and token usage.
