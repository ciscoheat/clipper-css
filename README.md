# Clipper

Clipper is a simple tailwind framework for building pages fast without fighting CSS.
It is designed for designers and developers alike: semantic markup by default, token-driven styling, and just enough utilities to stay productive.

## What Clipper tries to do

Clipper removes repetitive setup work so you can focus on content and visual decisions.  
Sections, spacing rhythm, typography, and layout constraints are already wired in.

You can start with clean HTML and only add utilities when they actually help.

## Quick start

```sh
pnpm install
pnpm dev
```

Build:

```sh
pnpm build
```

## Core idea in one example

```astro
---
import Body from "../layouts/Body.astro";
---

<Body title="My Page">
  <section id="intro">
    <h1>Hello Clipper</h1>
    <p class="readable">
      Start semantic, then add only the few utilities you really need.
    </p>
    <div class="row">
      <a href="#" class="btn">Primary action</a>
      <a href="#" class="btn btn-outline">Secondary action</a>
    </div>
  </section>
</Body>
```

## Spacing (the fluent part)

Spacing is tokenized and fluid via `clamp()`. Use Clipper spacing utilities:

`gap-2xs`, `gap-xs`, `gap-sm`, `gap-base`, `gap-lg`, `gap-xl`, `gap-2xl`

Example:

```astro
<div class="gap-base">
  <span>First item</span>
  <span>Second item</span>
  <span>Third item</span>
</div>
```

Change a spacing token once in `src/styles/variables.css`, and rhythm updates everywhere.

## Colors

Colors are also tokenized in `src/styles/variables.css`.
Use semantic tokens like `--background`, `--foreground`, `--primary`, `--muted`, and `--border` so theme decisions stay centralized and dark mode works properly.

Example:

```html
<span class="bg-background">First item</span>
```

## Typography

Headings are semantic first (`h1`..`h5`).
If a heading needs a different visual size, apply the display class directly:

```astro
<h3 class="h2">Semantically h3, visually h2</h3>
```

Body text stays stable (`--text-base`), while display sizes scale fluidly.

## Where to edit what

### Styling

- `src/styles/variables.css` → tokens (color, type, spacing)
- `src/styles/components.css` → reusable primitives (`.btn`, `.card`, `.badge`)
- `src/styles/clipper.css` → foundational behavior - usually no need to change this file

### HTML

- `src/layouts/Html.astro` → document wrapper (`<html>`, `<head>`, font imports, global stylesheet)
- `src/layouts/Body.astro` → default site shell (`Header` + `<main>` + `Footer`)
- `src/layouts/Header.astro` → shared header chrome (currently minimal/stub)
- `src/layouts/Footer.astro` → shared footer chrome (currently minimal/stub)
- `src/layouts/Demo.astro` → style-guide/demo layout that showcases tokens, spacing, and primitives
- `src/pages/*.astro` → page content that plugs into `Body.astro`

## Design philosophy

Clipper is intentionally small: fewer custom classes, fewer one-off fixes, better defaults.  
Designers get predictable rhythm and type behavior. Developers get maintainable markup and a clear token system.

If you can express it semantically, do that first. If you need control, use tokens/utilities. If it repeats, make it a primitive.
