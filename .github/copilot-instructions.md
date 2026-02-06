# Copilot instructions for this repo

## Project snapshot

- Next.js 16 App Router (see `app/layout.tsx`, `app/page.tsx`) with React 19 + TypeScript (`strict: true`).
- Tailwind CSS v4 with `fluid-tailwind` and `tailwindcss-animate`; global styles and theme tokens live in `app/globals.css`.
- shadcn/ui config in `components.json` (style: new-york, lucide icons, RSC on). Use `@/components/ui` for generated UI components.

## Code style & conventions

- Prefer TypeScript for new code; keep types explicit and RSC-friendly.
- Use `cn` from `lib/utils.ts` for `className` composition (clsx + tailwind-merge).
- Formatting is driven by Biome: tabs for indent and double quotes (see `biome.json`).
- Always use explicit imports (no `export * from` or barrel files) to keep tree-shaking effective and avoid circular dependencies.
- Always use `export const` for components and functions (no default exports) to improve readability and maintainability.
- Alwyas use the explicit input and output types for functions, even if they can be inferred. This improves readability and maintainability, especially in a React codebase where props and state types are important.
- For React components, prefer defining props types with `interface` instead of `type` for better readability and consistency. Use `type` for other type definitions (e.g., utility types, union types).
- Always use the consistent naming and casing conventions for variables, functions, and components (e.g., camelCase for variables and functions, PascalCase for components). This improves readability and maintainability across the codebase.
- For React components, prefer using arrow functions instead of function declarations for better readability and consistency. This also helps to avoid issues with `this` binding in class components.
- Always use the test drivern development (TDD) approach when writing new features or fixing bugs. This helps to ensure that the code is well-tested and reduces the likelihood of introducing new bugs or regressions.

## App Router patterns

- Define metadata/viewport via exports in `app/layout.tsx` instead of manual `<head>` tags.
- Keep routes in `app/` (avoid `pages/` unless required). RSC is enabled in shadcn config.
- Use `generateMetadata` for dynamic metadata (see `app/blog/[slug]/page.tsx`).
- Use `not-found.tsx` for 404 pages (see `app/not-found.ts
- Use `error.tsx` for error handling (see `app/error.tsx`).
- Use `loading.tsx` for loading states (see `app/loading.tsx`).
- Use `redirect()` from `next/navigation` for server-side redirects (see `app/redirect-example/page.tsx`).
- Use `useRouter()` from `next/navigation` for client-side navigation (see `app/client-nav-example/page.tsx`).
- Use `useSearchParams()` from `next/navigation` for reading URL query parameters (see `app/search-params-example/page.tsx`).
- Use `usePathname()` from `next/navigation` for reading the current pathname (see `app/pathname-example/page.tsx`).
- Always perfer server components by default, and only use client components when necessary (e.g., for interactivity or state). This is enabled by default in the shadcn config, so just avoid adding `"use client"` unless needed.
- For shared components that need to be used in both server and client components, define them as server components by default and only add `"use client"` if they require client-side features (e.g., state, effects, event handlers). This allows you to maximize the benefits of server components while still enabling interactivity when needed.
- Use `app/api/` for API routes (see `app/api/hello/route.ts`).
- For data fetching, prefer using `fetch()` directly in server components or `generateMetadata`, and use React hooks (e.g., `useEffect`) for client components when necessary. Avoid using external data fetching libraries unless they provide significant benefits for your specific use case.
- Always perfer the built-in features of Next.js and React for routing, data fetching, and state management before considering external libraries. This helps to keep the codebase simpler and more maintainable, and allows you to take full advantage of the capabilities of Next.js and React.
- For styling, prefer using Tailwind CSS utility classes directly in the JSX for most cases, and use the `cn` function for conditional class names. Avoid creating separate CSS files or using inline styles unless necessary for specific cases (e.g., complex animations, third-party library overrides).

## Assets & images

- Allowed remote image domains are configured in `next.config.ts` (Instagram, Unsplash, GitHub, GitHub avatars). Update that list when adding new external images.

## Tooling & workflows

- `pnpm dev` runs `next dev` then `next-devtools-mcp` (two-step dev workflow).
- `pnpm build`, `pnpm start`, `pnpm lint` for build/run/lint.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).
