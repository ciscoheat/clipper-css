---
name: "Clipper CSS"
applyTo: "**/*.html,**/*.astro,**/*.svelte,**/*.css,**/*.scss"
description: "Instructions for working with Clipper, the CSS framework for Tailwind."
---

# Working in Clipper - The CSS framework for Tailwind

This guide is for agents making changes to codebases where Clipper is used as the CSS framework.

**Goal:** Make safe, minimal, maintainable changes that align with Clipper's philosophy: "If you can express it semantically, do that first. If you need control, use tokens/utilities. If it repeats, make it a component."

## Scope

This guide applies to:

- New sections/pages
- Refactors and cleanup
- Bug fixes
- Styling and theming changes
- Layout/header/footer/navigation changes

## Core principles

- **Semantic first** — Use semantic HTML and preserve accessibility
- **Minimal changes** — Change as few lines as possible to achieve the goal
- **Token-driven** — Use design tokens from `variables.css`, not arbitrary values
- **Utility-first** — Use Tailwind utilities for page-specific styling
- **Component when it repeats** — Only extract reusable primitives to `components.css`

## Project architecture

### File structure

- `src/styles/variables.css` → design tokens (color, spacing, typography) + Tailwind v4 `@theme` exports
- `src/styles/components.css` → reusable component primitives (`.btn`, `.card`, `.badge`)
- `src/styles/clipper.css` → framework foundations - no need to change this file unless explicitly asked

## Styling rules

### Utility-first approach

- Use Tailwind utilities directly in markup for page-specific styling
- Keep utility strings in the `class` attribute (don't extract as constants)
- Only add to `components.css` if the pattern repeats across pages

### Components in `components.css`

**NOTE:** If another UI framework is being used (e.g. Material UI, Radix, Daisy UI), do not use `components.css` - stick to that framework's components.

**Allowed** — Generic, reusable primitives:

- `.btn`
- `.card`
- `.badge`
- `.btn .btn-outline`

**Avoid** — Page/section-scoped classes:

- Page-scoped: `.page-*`, `.home-*`
- Section-scoped: `.hero-*`, `.footer-*`
- One-off namespaces: `.cs-*`

If it's one-off, keep it as utilities in markup.

## Tokens and spacing

### Color tokens

Use semantic tokens from `variables.css`:

**Base colors:**

- `background`, `foreground`
- `accent`, `accent-foreground`
- `muted`, `muted-foreground`

**Primary colors:**

- `primary` (500 is usually the base color, with the other 50-900 shades)
- `primary-foreground`
- `primary-hover`
- `primary-muted`

Same goes for `secondary` and `tertiary` if they exist in the project.

**Other:**

- `link`, `link-hover`
- `link-underline`, `link-underline-hover`
- `border`

### Spacing utilities

**Always use Clipper's fluid spacing scale:**

- `4xs`, `3xs`, `2xs`, `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

Examples: `gap-sm`, `pb-xl`.

**Note** that `base` is the default spacing unit for all elements except `section`, and should not be added explicitly to keep the markup clean.

**Never use** Tailwind's numeric scale (`gap-1`, `gap-2`, `gap-4`, etc.) — it bypasses the fluid spacing system.

## Typography

### Headings

- Semantic first: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`
- Visual flexibility: Apply display classes to change size

```astro
<h3 class="h2">Semantically h3, visually h2</h3>
```

### Body text

Body text stays stable while heading sizes scale fluidly via `clamp()`.

## Utility classes

| Class           | Function                                |
| --------------- | --------------------------------------- |
| `row`           | `flex-row` with sensible defaults       |
| `readable`      | Max-width for readable text             |
| `full-width`    | Break children out of max page width    |
| `page-width`    | Restore max page width to inner content |
| `trim-top`      | Trim padding and margin of first child  |
| `trim-bottom`   | Trim padding and margin of last child   |
| `trim`          | Trim padding and margin of both         |
| `header-sticky` | Simple sticky header                    |

## Data modeling

- Define page data in the top script block as arrays/objects
- Structure mock data like real data (stable keys, realistic types)
- Keep rendering logic in templates, data in the script block
- When real data arrives (CMS/API), swap the source with minimal template changes

## Accessibility checklist

- Use correct landmarks and `aria-label` where needed
- Keep heading hierarchy logical (`h1` once per page)
- Ensure focus-visible states remain clear
- Use real links/buttons for interaction

## Implementation workflow

When working from a design/screenshot:

- Extract semantic structure (`header`, `main`, `section`, `footer`)
- Implement with minimal wrappers
- Map visual decisions to existing tokens
- Use utilities for page-specific layout/spacing/typography
- Add to `components.css` only if the pattern truly repeats
- Validate desktop/mobile + dark mode
- Run `pnpm build` to verify

## Definition of done

- [ ] Requested outcome is implemented
- [ ] Page-specific styling uses utilities in markup, as few as possible and primarily the clipper utilities
- [ ] Mock data is defined in script block, structured for real data
- [ ] `components.css` contains only generic reusable primitives
- [ ] Tokens are used consistently (no arbitrary colors)
- [ ] Dark mode remains intentional/readable
- [ ] `pnpm build` passes

## Quick reference: Do / Don't

### Do

- Reuse existing primitives first
- Keep markup semantic and lean - don't add utilities unless required
- Use Clipper's spacing utilities (`gap-sm`, `mb-xl` etc.)
- Use utilities for page styling
- Centralize colors in tokens

### Don't

- Add one-off classes to `components.css`
- Duplicate Header/Footer across pages
- Hardcode colors when tokens exist
- Use Tailwind's numeric gap utilities (`gap-1`, `gap-2`, etc.)
- Add unrelated features beyond the request
- Use inline styles or arbitrary values instead of tokens/utilities
