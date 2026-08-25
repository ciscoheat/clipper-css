---
name: clipper-convert-website
description: Convert supplied website content into an Astro or SvelteKit Clipper implementation.
disable-model-invocation: true
---

# Convert A Website To Clipper

Recreate supplied web content in Astro or SvelteKit with Clipper. The source evidence defines the result; Clipper supplies the layout and token system. Do not invent copy, imagery, controls, sections, or visual treatment.

## Workflow

Work in this order: **bands, flow, skeleton, metrics, color, verify**. Do not advance until each step's completion check passes. The source controls the result; Clipper supplies the simplest structure that expresses it.

1. **Bands.** Inspect every supplied viewport; capture desktop and mobile screenshots for a live page. Read the target route, layout, `variables.css`, `components.css`, and `clipper.css`. Divide the page top to bottom into visible horizontal bands: header, hero, content sections, footer, and any separator or full-bleed region. For each band, record its vertical start and end, height, full-bleed or bounded edges, and the space before the next band. **Done when** every visible pixel row belongs to one ordered band.

2. **Flow.** Parse each band independently from top to bottom. Record its direct content units: heading group, copy, image, control, horizontal peer group, repeated items, or nested full-bleed module. Mark each unit as vertical flow, horizontal row, or multi-column grid. A group is a grid only when source peers occupy explicit columns; record its desktop columns and the supplied viewport where it collapses. For live pages, audit the DOM and rendered boxes so image-only links, SVGs, CSS backgrounds, below-the-fold items, and empty-label controls remain in the inventory. Record every item's copy, destination, media, source order, and count. **Done when** every band has an ordered list of units and every source item is accounted for.

3. **Skeleton.** Write the smallest semantic markup that matches the band and flow map: `header`, `main`, direct child `section` bands, and `footer` only when present. A section's ordinary content stays direct. Add one wrapper only for a mapped row, grid, overlay, or bounded module. Let Clipper's default column flex flow express vertical units; add `row` for horizontal peers and explicit grid columns for mapped multi-column groups, with evidence-supported mobile collapse. Use real headings, links, buttons, inputs, lists, and images. Use `full-width` for a full-bleed hero or band, with `page-width` on bounded inner content. **Done when** the route mirrors the map without invented wrappers, cards, sections, or missing items.

4. **Metrics.** Match geometry before decoration. Set `--max-page-width` from the largest source viewport. Match band heights, content edges, grid tracks, peer widths, gaps, padding, image crops, and responsive states with static Tailwind and Clipper classes. Size equal peers with shared tracks or `w-full`; use `min-w-0` where text must shrink. Map each text role's family, weight, size, line height, letter spacing, alignment, and measured text-block width. Load the exact or closest Google Font in the HTML header and set the fluid scale in `variables.css`. **Done when** screenshots match in silhouette, alignment, and wrapping before color comparison.

5. **Color.** Extract and tokenise every band background, surface, foreground, border, outline, and focus color in `variables.css`; each source-visible band has an intentional background token. Record image, gradient, transparency, and animation treatments separately from fallback colors. Apply visual treatment with Tailwind and Clipper utilities; shared generic contracts belong in `components.css`. Use an inline `background-image` only for a required dynamic source image. **Done when** no visible color or type role falls back to an unmeasured starter or inherited value.

6. **Verify.** Compare every supplied viewport and each mapped breakpoint boundary: first bands and geometry, then copy, media, controls, borders, type, colors, and peer alignment. Inspect computed background, foreground, border, `font-family`, `font-size`, `font-weight`, `line-height`, and `letter-spacing`; verify repeated item count, order, destinations, and media against the source. Check focus, overflow, and text wrapping, especially centered blocks and short-line failures from unsupported `max-w-*` constraints. Rework the earliest failing map stage, then rerun the comparison. **Done when** the rendered result matches every map entry at the largest and smallest supplied viewports and the project build passes.

## Clipper Quick Reference

- `section` is a page-width grid band with fluid block padding and vertical gap.
- Direct children of `section`, `header`, and `footer` occupy the center page column.
- `div`, `nav`, `ul`, and similar containers default to vertical flex layout with a gap.
- `row` creates a horizontal flex group; `grid` and explicit `*-cols-*` classes create a grid.
- `full-width` breaks a direct child out of the page column; place `page-width` on its inner content when needed.
- Fluid tokens such as `gap-lg`, `py-xl`, and `mt-4xl` provide the default rhythm. Use static utilities only when the geometry map needs a specific exception.
