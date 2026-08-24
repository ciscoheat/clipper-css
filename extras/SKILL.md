---
name: clipper-convert-website
description: Convert supplied website content into an Astro or SvelteKit Clipper implementation.
disable-model-invocation: true
---

# Convert A Website To Clipper

Recreate supplied web content in Astro or SvelteKit with Clipper. The source evidence defines the result; Clipper supplies the layout and token system. Do not invent copy, imagery, controls, sections, or visual treatment.

## Workflow

Work from an **evidence map**: a compact, source-derived record that controls tokens, layout, and verification. The source wins over Clipper defaults at every step.

1. **Capture and map.** Inspect every supplied viewport; for a live page, capture desktop and mobile screenshots. Ask for clearer evidence when a visible detail is uncertain. Read the target route, layout, `variables.css`, `components.css`, and `clipper.css`.

Create the evidence map in source order. For each band, record its height, full-bleed or bounded edges, background, separator, and spacing. Record every visible text string, image, control, repeated-item count, header, and footer. For each peer group, record columns, item order, width, gap, alignment, and wrap point. For each text role, record family, weight, size, line height, letter spacing, alignment, and text-block edges. For each component, record its surface, border or outline color, width, style, radius, padding, and placement. Record image cards as image only, image with overlay text, image with text below, text only, or control.

Use the supplied widths to map responsive states and only the transitions the evidence supports. A centered parent is not proof of centered text: map the text block's own left and right edges. **Done when** every visible band, peer group, text role, and component has a map entry.

2. **Set tokens before markup.** Set the maximum page width in `variables.css` from the largest supplied viewport. Extract colors for every band, surface, foreground, border, and outline; define semantic tokens, including a deliberate background for every source-visible band. Identify the source typefaces, load the exact or closest Google Font in the HTML header, and assign font tokens. Set the measured display, heading, body, navigation, and control sizes in the fluid scale.

Keep a visual-token table linking each sampled color and type measurement to its source role, token, and consuming utility. Record gradients, images, transparency, and animation separately from their fallback color. **Done when** no source-visible color or text role relies on a starter or inherited value.

3. **Build the mapped structure.** Use the project `Body` or equivalent, then direct child `section` bands in inventory order. Add only source-visible headers and footers; use semantic headings, links, buttons, inputs, and lists. Keep markup flat: wrappers represent a mapped row, grid, overlay, or bounded module.

Use static Tailwind and Clipper classes for all geometry and visual treatment. Shared tokens live in `variables.css`; only generic, repeated UI contracts live in `components.css`. An inline `background-image` is allowed only for a required dynamic image treatment with no utility-class expression.

Declare every mapped row with `row` and every mapped grid with explicit columns. Use `full-width` for a full-bleed hero background and a `page-width` child for its bounded content. Size peer components with shared explicit tracks or `w-full`; their content, images, borders, and wrappers must not alter equal source widths. For centered text, give the block its mapped width before centering text. Use `min-w-0` where text must shrink. **Done when** the route expresses the evidence map without invented sections, decoration, or layout changes.

4. **Match screenshots, not just the build.** At every supplied viewport and immediately below, at, and above each mapped breakpoint, compare the silhouette first: bands, empty space, edges, widths, columns, gaps, image crops, and hero height. Then compare copy, imagery, controls, colors, borders, outlines, typography, and peer alignment.

Inspect computed styles for each band background, representative foreground and border, and each text role's `font-family`, `font-size`, `font-weight`, `line-height`, and `letter-spacing`. Inspect text bounding boxes for true centering and repeated component outer boxes for intended equal widths. Check focus, overflow, and wrapping; text must retain source-supported width without isolated short lines. Rework the evidence map, tokens, or utilities until screenshots match at a glance.

**Done when** every evidence-map entry is matched at the largest and smallest supplied viewport, computed styles use the intended tokens, and the project build passes.

## Clipper Quick Reference

- `section` is a page-width grid band with fluid block padding and vertical gap.
- Direct children of `section`, `header`, and `footer` occupy the center page column.
- `div`, `nav`, `ul`, and similar containers default to vertical flex layout with a gap.
- `row` creates a horizontal flex group; `grid` and explicit `*-cols-*` classes create a grid.
- `full-width` breaks a direct child out of the page column; place `page-width` on its inner content when needed.
- Fluid tokens such as `gap-lg`, `py-xl`, and `mt-4xl` provide the default rhythm. Use static utilities only when the geometry map needs a specific exception.
