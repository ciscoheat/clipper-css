---
name: clipper-convert-website
description: Convert supplied website content into an Astro or SvelteKit Clipper implementation.
disable-model-invocation: true
---

# Convert A Website To Clipper

Recreate supplied web content in Astro or SvelteKit with Clipper. The source evidence defines the result; Clipper supplies the layout and token system. Do not invent copy, imagery, controls, sections, or visual treatment.

## Workflow

- Inspect the source at every supplied viewport. For a live page, capture desktop and mobile screenshots. If the evidence does not show the content or layout clearly enough, ask for it before building.

- Read the target route, layout, `variables.css`, `components.css`, and `clipper.css`. The existing route is an implementation example, not source evidence.

- Make a short source inventory in top-to-bottom order. Include every visible band, exact text, image, control, repeated-item count, and footer or header. Record every image card as one of: image only, image with overlay text, image with text below, text only, or control. Use source images and copy verbatim.

- Make a two-dimensional geometry map before writing markup:
  - **Vertical map:** ordered page bands, their approximate start, height, background, and space before the next band.
  - **Horizontal map:** for each band, record its left and right edges, alignment, width, columns, gaps, and whether it is page-width, bounded, or full-bleed.
  - **Peer map:** record every horizontal group separately: navigation, buttons, icon-label pairs, metadata, and card rows. Note item order, alignment, gap, and the viewport where it wraps or stacks.
  - **Responsive map:** use the supplied viewport widths to choose breakpoints. A multi-column layout visible at a reference width must be multi-column at that width; never guess that `lg:` means desktop.

- Build the semantic skeleton in the inventory order. Use the project `Body` or equivalent layout, then direct child `section` elements for page bands. Add `header` and `footer` only when they are in the source. Use real headings, links, buttons, inputs, and lists.

- Keep markup flat. A Clipper `section` already places its direct children in the page-width grid column and gives them vertical rhythm. Add a wrapper only when it groups a real unit from the geometry map: a grid, a row, an image overlay, or a bounded module. Do not add wrappers solely for centering or spacing.

- Declare the horizontal layout explicitly. In Clipper, ordinary `div`, `nav`, and lists are flex columns. Add `row` to every mapped horizontal peer group. Add `grid` with explicit column classes for every mapped grid. Use `full-width`, `page-width`, `readable`, or `readable-width` only where the map calls for them. Use `min-w-0` on text-bearing grid or flex children that need to shrink.

- Keep source-specific geometry in static Tailwind or Clipper classes on the route. Put shared colors, fonts, scale, page measurements, and radii in `variables.css`. Put only repeated, generic UI contracts such as buttons, cards, and badges in `components.css`. Do not add a page-specific stylesheet or `<style>` block. A dynamic source image URL may use an inline `background-image` when a background image is the required source treatment.

- Use data in the route script for repeated source items. Create a component only when the same visual contract recurs. An image-backed module must render a real `<img>` with the mapped crop and aspect ratio; overlay only the text the source shows.

- Preserve the source's whitespace. Do not add unrecorded width limits, centered wrappers, descriptions, labels, navigation, decorations, or cards to make the result feel more complete. Do not use a text width constraint to hide a grid or breakpoint mistake.

- Verify at each supplied viewport. Compare the silhouette first: page bands, empty space, left edges, widths, column counts, image crops, and hero height. Then verify the inventory: copy, images, cards, controls, colors, type, and every horizontal peer group. Check mobile wrapping, keyboard focus, and overflow.

- Finish by auditing the route for demo leftovers and running the project build. Keep correcting the map and its classes until the rendered page matches the source at a glance.

## Clipper Quick Reference

- `section` is a page-width grid band with fluid block padding and vertical gap.
- Direct children of `section`, `header`, and `footer` occupy the center page column.
- `div`, `nav`, `ul`, and similar containers default to vertical flex layout with a gap.
- `row` creates a horizontal flex group; `grid` and explicit `*-cols-*` classes create a grid.
- `full-width` breaks a direct child out of the page column; place `page-width` on its inner content when needed.
- Fluid tokens such as `gap-lg`, `py-xl`, and `mt-4xl` provide the default rhythm. Use static utilities only when the geometry map needs a specific exception.
