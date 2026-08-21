# Clipper

Clipper is a simple Tailwind framework for building pages fast without fighting CSS. It is designed for designers and developers alike: semantic markup by default, token-driven styling, and just enough utilities to stay productive.

You can start with clean HTML and only add utilities when they actually help.

## Quick start

The best way to install clipper is to run it in a freshly installed framework project with [Tailwind](https://tailwindcss.com/) installed. Clipper currently supports **Astro** and **SvelteKit**.

### Astro

- [How to install Astro](https://docs.astro.build/en/install-and-setup/)
- [How to install Tailwind for Astro](https://docs.astro.build/en/guides/styling/#tailwind)

### SvelteKit

- [How to install SvelteKit](https://svelte.dev/docs/kit/creating-a-project)
- [How to install Tailwind for SvelteKit](https://svelte.dev/docs/cli/tailwind)

After installation, run this in your project folder:

```sh
npx clipper-css
```

The installation is user-friendly and won't overwrite anything without your permission. You can run it multiple times to update clipper to the latest version (will only overwrite `clipper.css` in that case).

After installing, the root page will display a demo of Clipper's features.

## Core idea in one example

The section is the fundamental building block. Put these directly below `main`. The rest is pretty much self-explanatory.

```html
<body>
  <header class="header-sticky"></header>
  <main>
    <section id="intro">
      <h1>Hello Clipper</h1>
      <p class="readable">Start semantic, then add only the few utilities you really need.</p>
      <div class="row">
        <a href="/primary" class="btn">Primary action</a>
        <a href="/secondary" class="btn btn-outline">Secondary action</a>
      </div>
    </section>
  </main>
  <footer></footer>
</body>
```

## Spacing (the fluent part)

Spacing is tokenized and fluid via a ratio-based `clamp()` scale. Use Clipper spacing utilities between `4xs` and `4xl` as normal Tailwind classes. `base` is the center of the scale.

Example:

```html
<div class="gap-sm">
  <span>First item</span>
  <span>Second item</span>
  <span>Third item</span>
</div>
```

The default spacing ratio is a Major Third (`1.25`) and the scale interpolates between `360px` and `1600px`. Change the base range or ratio in `variables.css` and the rhythm updates everywhere:

```css
:root {
  --space-ratio: 1.25;
  --space-base-min: 0.75rem;
  --space-base-max: 1rem;
}
```

## Colors

Colors are also tokenized in `variables.css`, with semantic tokens so theme decisions stay centralized and dark mode works properly. Built-in tokens that can be used directly on the utility classes:

### Base colors

```
background
foreground
accent
accent-foreground
muted
muted-foreground
```

### Primary color

```
primary (incl. 50-900)
primary-foreground
primary-hover
primary-muted
```

### Other

```
link
link-hover
link-underline
link-underline-hover
border
```

Example:

```html
<span class="bg-accent-foreground">First item</span>
```

## Typography

Headings are semantic first (`h1`..`h5`).
If a heading needs a different visual size, apply the display class directly:

```astro
<h3 class="h2">Semantically h3, visually h2</h3>
```

Body text and headings use separate fluid geometric scales. Body and UI text use `--text-ratio` with `text-base` as the center token. Headings use `--heading-ratio` with `heading-base` as their `2xl` starting point. Both scales interpolate between `360px` and `1600px` without breakpoint-specific values:

```css
:root {
  --text-ratio: 1.18;
  --text-base-min: 1rem;
  --text-base-max: 1rem;
  --heading-ratio: 1.25;
  --heading-base-min: 1.1875rem;
  --heading-base-max: 1.1875rem;
}
```

Semantic headings use `text-6xl` for `h1`, `text-5xl` for `h2`, `text-4xl` for `h3`, `text-3xl` for `h4`, and `text-2xl` for `h5`. The fluid viewport bounds can be changed with `--fluid-screen-min` and `--fluid-screen-max`.

## List of utility classes

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

## List of components

Clipper includes three generic reusable primitives, compatible with dark mode, purely for "getting started" convenience. They can be replaced by any UI framework or custom styles.

| Class name        | Function                               |
| ----------------- | -------------------------------------- |
| `btn`             | You guessed it!                        |
| `card`            | You guessed that too                   |
| `badge`           | You guessed right three times in a row |
| `btn btn-outline` | Outline button version                 |

## Where to edit what

- `variables.css` → tokens (color, type, spacing)
- `components.css` → reusable components (`.btn`, `.card`, `.badge`)
- `clipper.css` → framework definitions - usually no need to change this file! Will be updated if `npx clipper-css` is run multiple times.

## Skills and instructions for AI

The installations comes with an [instructions file](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) for AI Agents, copied to `.github/instructions/clipper.instructions.md` and a [skill](https://code.visualstudio.com/docs/copilot/customization/agent-skills) called `clipper-convert-website` for converting websites to Clipper, copied to `.github/skills/clipper-convert-website/SKILL.md`.

## Design philosophy

Clipper is intentionally small and unobtrusive. Use Tailwind classes or a UI component framework whenever you need, Clipper won't stand in your way.

> If you can express it semantically, do that first. If you need control, use tokens/utilities. If it repeats, make it a component.

## Get in touch

Please suggest fixes etc on [Github](https://github.com/ciscoheat/clipper-css/issues). Improvements can surely be made.
