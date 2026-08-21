---
name: "Clipper CSS"
applyTo: "**/*.html,**/*.astro,**/*.svelte,**/*.css,**/*.scss"
description: "Build and theme Clipper pages with its semantic layout, fluid tokens, and generic primitives."
---

# Clipper CSS

Use Clipper's **semantic first** order: semantic HTML, then Clipper tokens and utilities, then a reusable component only when the same UI contract recurs. Keep each change in the narrowest layer that owns it.

## Read The Local Contract

Before styling, locate the project's installed `variables.css`, `components.css`, and `clipper.css`. They are the source of truth for available tokens and existing primitives; their locations vary by framework. Preserve project-specific tokens and components unless the request changes them.

Clipper is additive. Tailwind utilities and another UI library remain valid when they express the design better; prefer Clipper's tokens where a spacing, color, type, or layout decision should remain coherent across the page.

## Layout And Markup

- Build pages from landmarks: `header`, `main`, direct child `section` elements, and `footer`.
- A Clipper `section` already provides page-width grid placement, fluid block padding, and vertical rhythm. Place ordinary section content directly inside it; use `full-width` only for intentional breakouts like hero sections, in which case the closest child element with page-width constraints should have `page-width` set.
- Ordinary `div`, `nav`, lists, forms, and several semantic containers are column flex layouts with the base gap. Use `row` for a horizontal group and add responsive layout utilities only when the content needs them.
- Use `readable` for long-form content. On a `section`, it changes the grid to the readable width; elsewhere, it constrains the element width. Use `page-width` or `readable-width` when an inner container needs the corresponding width.
- Use `header-sticky` only when the header should stay visible. Give anchor targets an `id` and retain Clipper's scroll-offset behavior.
- Prefer real controls and landmarks, one logical `h1`, and semantic heading levels. Use `.h1` through `.h5` only to change a heading's visual level.

## Tokens And Primitives

- Set palette, typography, page measurements, fluid-scale settings, and focus color in `variables.css`. Keep light and dark values intentional through the semantic variables.
- Use the named fluid spacing scale (`4xs` through `4xl`) for Tailwind spacing utilities such as `gap-sm` and `py-xl`. Omit `base` when the default Clipper rhythm already supplies it.
- Use semantic color utilities backed by Clipper tokens: `background`, `foreground`, `muted`, `accent`, `border`, `link`, and `primary` variants. Define secondary or tertiary scales only when the design needs them.
- Treat `components.css` as the home for generic, repeated primitives. Adapt `.btn`, `.card`, and `.badge` when the page establishes their shared contract; keep page- or section-specific composition in markup.
- When a project uses a component library, compose that library's components and put its shared theming in its established layer.

## Implementation Loop

1. Identify the requested visual or behavioral change and the owning layer: markup, tokens, generic primitive, or framework foundation.
2. Make the semantic structure work with Clipper defaults before adding layout classes.
3. Map repeated visual decisions to tokens and repeated generic UI to components; keep one-off composition in the template.
4. Check the smallest and largest supported viewports and both color schemes when colors or shared primitives changed. Verify keyboard focus and text wrapping for changed interactive or text-heavy areas.
5. Run the project's relevant build or test command. The work is complete when the requested result renders without overflow, uses the local token/component contract consistently, and the available validation passes.
