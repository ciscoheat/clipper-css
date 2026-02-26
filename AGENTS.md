# AGENTS Guide: Working in the Clipper site

This is the operating manual for any agent changing this repository.

Goal: make safe, minimal, maintainable changes that fit the existing Clipper system.

---

## Scope

This guide applies to **all modifications**, including:

- Screenshot recreations
- New sections/pages
- Refactors and cleanup
- Bug fixes
- Styling and theming changes
- Layout/header/footer/navigation changes

---

## Core principles

- Preserve semantic HTML and accessibility first.
- Prefer existing system primitives over custom CSS.
- Keep changes minimal and scoped to the request.
- Minimize repetition in both markup and style declarations.
- Fix root causes, not cosmetic symptoms.
- Do not invent extra features unless explicitly requested.

---

## Project architecture (must follow)

- `src/styles/variables.css` = design tokens + Tailwind v4 `@theme` exports
- `src/styles/clipper.css` = base layout, typography, foundations
- `src/styles/components.css` = reusable component primitives only
- `src/layouts/Header.astro` = shared header chrome component
- `src/layouts/Footer.astro` = shared footer chrome component
- `src/layouts/Body.astro` = shared site shell that composes `Header.astro` + `main` + `Footer.astro`
- `src/pages/*.astro` = page-specific content sections

### Layout ownership rule

- Shared chrome belongs in layout components and is assembled by `Body.astro`:
  - `Header.astro` owns header/nav/search/brand shell
  - `Footer.astro` owns global footer content
  - `Body.astro` composes those around page `<main>` content
- Pages should use `Body.astro` and should not import or duplicate `Header.astro` / `Footer.astro` directly.
- `src/pages/*.astro` should contain page content, not duplicated global shell markup.

---

## Styling policy (utility-first)

- Use utility classes directly in `.astro` markup for page-specific styling.
- Keep `components.css` small and generic.
- Add to `components.css` only if the pattern is reused across pages/components.
- Keep utility strings in the element `class` attribute by default (do not extract class-string constants).

### Allowed reusable component classes

Use generic names such as:

- `.btn`
- `.card`
- `.badge`

### Avoid in `components.css`

- Page-scoped names (`page-*`, `home-*`, etc.)
- Section-scoped names (`hero-*`, `footer-*`, etc.)
- One-off namespace blocks (`cs-*` and similar)

If a style is one-off to a page, keep it in markup as utilities.

---

## Repetition and maintainability rules

- Keep repeated utility classes inline in markup unless a true reusable primitive is warranted.
- If content structures repeat (cards, nav items, link groups), render from arrays/objects instead of duplicated markup.
- Keep abstractions lightweight: only extract what improves readability and maintainability.
- Prefer reusable primitives in `components.css` (`.btn`, `.card`, `.badge`) over ad-hoc page class abstractions.

---

## Data modeling for pages

- Place initial page data in the top script block (`---`) as mock arrays/objects.
- Shape mock data to resemble expected real data (stable keys, clear names, realistic types).
- Keep rendering logic in template markup and data definitions in the script block.
- When real data arrives (CMS/API/content collections), replace the data source with minimal template changes.
- Avoid scattering hardcoded content values throughout markup when they can be data-driven.

---

## Tokens and theme rules

- Prefer semantic tokens from `variables.css` (`--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--border`, etc.).
- Do not hardcode arbitrary color values when a token exists.
- If a new utility-facing color is needed, export it in `@theme` first.
- Dark mode should be handled through token switching, not duplicate per-component palettes.
- **For spacing**: Always use Clipper's spacing utilities (`gap-2xs`, `gap-xs`, `gap-sm`, `gap-base`, `gap-lg`, `gap-xl`, `gap-2xl`) or the underlying `--spacing-*` tokens. Never use Tailwind's numeric gap utilities (gap-1, gap-2, gap-3, etc.) as they bypass the fluid spacing system.

---

## Tailwind v4 documentation rule

- If Tailwind v4 behavior is uncertain, use Context7 MCP to verify guidance before implementing.
- Prefer Tailwind's utility-first markup approach as the default.
- Use custom utilities/primitives only when repetition is genuinely reusable across pages.

---

## Screenshot implementation workflow

When working from an image/reference:

1. Extract semantic structure first (`header`, `main`, `section`, `footer`, lists/cards/nav).
2. Implement structure in Astro with minimal wrappers.
3. Map visual decisions to existing tokens.
4. Use utility classes for page-specific layout/spacing/typography.
5. Add reusable primitives only when repetition justifies `components.css`.
6. Validate desktop/mobile + dark mode.

---

## Accessibility baseline

- Use correct landmarks and `aria-label` where needed.
- Keep heading hierarchy logical (`h1` once per page intent).
- Ensure focus-visible states remain clear.
- Use real links/buttons for interaction.
- **Typography flexibility**: Use `.h1`–`.h4` classes on heading elements when they need to be visually larger or smaller than their semantic level. For example, an `<h3>` with `class="h2"` maintains semantic structure while displaying at heading-2 size.

---

## Definition of done

Before finishing, ensure:

- [ ] Requested behavior/visual outcome is implemented.
- [ ] Global shell remains composed in `Body.astro` using `Header.astro` and `Footer.astro` (no page-level duplication).
- [ ] Page-specific styling is utility-first in markup.
- [ ] Repetition is reduced using local constants and data maps where appropriate.
- [ ] Initial/mock data is defined in the top script block and structured for real data replacement.
- [ ] `components.css` contains only reusable generic primitives.
- [ ] Tokens are used consistently; no unnecessary hardcoded colors.
- [ ] Dark mode remains intentional/readable.
- [ ] `pnpm build` passes.

---

## Practical do / don’t

Do:

- Reuse existing primitives first.
- Keep markup semantic and lean.
- Prefer utilities for local/page styling.
- Centralize reusable visual rules in tokens.
- Use Clipper's `gap-*` spacing utilities to maintain consistent fluid spacing across breakpoints.

Don't:

- Move quickly by adding many one-off CSS classes in `components.css`.
- Duplicate shared header/footer across pages.
- Add unrelated enhancements beyond the request.
- Fight the existing layout system with excessive wrappers.
- Use Tailwind's numeric gap utilities (`gap-1`, `gap-2`, `gap-4`, etc.)—use `gap-2xs` through `gap-2xl` instead.
