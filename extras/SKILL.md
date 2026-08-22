---
name: clipper-convert-website
description: Convert supplied website content into an Astro or SvelteKit Clipper implementation.
disable-model-invocation: true
---

# Convert A Website To Clipper

Convert the supplied screenshot, HTML, or project into a working Clipper page that is as visually and behaviorally faithful to the source as possible. Preserve every source section, item, meaningful interaction, and visual decision. Do not blend in Clipper's default theme or invent a new aesthetic.

## Non-Negotiable Fidelity Rules

- Never substitute source copy, imagery, branding, sections, or page composition with invented alternatives. A visually polished but different website is a failed conversion.
- Never add a header, sub-navigation, eyebrow, card description, metadata, CTA, decorative label, or other visible element that is not present in the source evidence. Absence, whitespace, and empty space are part of the design.
- Only the source evidence may justify visible content or visual treatment. The target project's demo route, example copy, section labels, components, utility combinations, and styles are implementation artifacts, not source evidence. Never carry their labels, all-caps micro-headings, tracked text, layout patterns, or visual hierarchy into the conversion unless the source independently shows the same treatment.
- Conversion override for generic readability guidance: do not use `max-w-*`, `w-*`, `w-fit`, `readable`, or `mx-auto` on text, headings, article bodies, or their wrappers. Do not narrow source text to make it look tidy. The only exception is a visually bounded text module that is not a direct section child and whose exact narrower width is plainly visible and recorded in the geometry map; use one specific matching static width value only for that module. No recorded width means no width utility.
- Keep styling within Clipper's intended ownership boundaries. Route and page components must express presentation with static Tailwind and Clipper classes in `class` attributes; do not add a `<style>` block, scoped styles, CSS modules, inline `style` attributes, or page-specific CSS selectors. Use static classes so Tailwind can detect them at build time.
- `variables.css` owns source-wide visual tokens such as fonts, colors, spacing, widths, radii, borders, and shadows. `components.css` owns only genuinely reusable generic primitives. Use Tailwind arbitrary values and responsive variants in route markup for source-specific geometry that does not warrant a reusable component. Do not create a page-specific CSS class merely to move styling out of a `class` attribute.
- Do not infer a page from its industry, domain name, or a partial text fetch. Use inspectable source evidence: a supplied screenshot, HTML, a browser-rendered source page, or source assets.
- When the source cannot be loaded, is blocked, redirects unexpectedly, or lacks enough evidence to reproduce the page, stop before writing the page and request the missing screenshot, HTML, or assets. Do not fill the gap with placeholder content beyond a clearly identified missing image.
- An empty target is a blank canvas, not a reason to retain a demo layout, generic component styling, or an unrelated theme. Replace the route's existing content as needed to match the source.

## 1. Capture Source Evidence

Before editing, capture or inspect the source at the target desktop viewport and a mobile viewport. For a screenshot-only task, use the supplied screenshot as the canonical evidence. For a live site, use browser inspection and screenshots; do not rely on a text-only page fetch for visual decisions.

Create a source inventory before building markup. It must list, in top-to-bottom order:

- Every visible header, hero, content section, CTA, footer, and overlay.
- Exact visible copy, navigation labels, and repeated-card counts.
- Each image's source, role, crop, aspect ratio, and placement.
- The page's major horizontal bands, container widths, alignment, background colors, and approximate vertical spacing.
- Typography family, weight, case, scale, and treatment for headings, body text, labels, and buttons.

For each repeated visual module, record its content model exactly: `image-only`, `image with overlaid text`, `image plus visible text below`, `text-only`, or `interactive control`. For every module that visibly contains media, record an image-card manifest: card count, one image asset or source crop per card, aspect ratio, and whether its title is overlaid or outside the image. Do not use generic cards as a substitute for this model. In particular, an image-only or image-overlay module must not gain a title, paragraph, metadata, or button below the image unless it is visibly present in the source.

Create a compact geometry map from the desktop source before implementation. Record the outer page margins, the left edge and width of each major content group, each section's vertical start, image aspect ratios, and whether groups are left-aligned, centered, right-aligned, or full-bleed. Treat shared left/right edges and deliberately large blank areas as constraints, not unused room to fill.

Record the pixel width of each supplied reference screenshot and identify the layout mode it shows. Derive the responsive breakpoint map from this evidence: a multi-column layout shown at a reference width must already use its required `sm:`, `md:`, `lg:`, or arbitrary breakpoint classes at that width. Never assume `lg:` is the desktop breakpoint or that a narrower supplied screenshot represents mobile.

Record every horizontal peer group separately: icon-and-label features, navigation items, button clusters, inline metadata, paired cards, and controls shown on one line. For each group, note its item order, alignment, gap, vertical alignment, and whether it wraps, scrolls, or changes to a column on mobile. A row visible in the source is a layout requirement, not a suggestion.

Do not begin implementation until every visible source region has an inventory entry. Use the inventory as the acceptance checklist during verification.

**Done:** Reliable visual evidence exists at desktop and mobile widths, and a complete, ordered inventory and geometry map describe the source without invented content.

## 2. Establish The Target

Inspect the source first: identify its typefaces, type scale, colors, spacing rhythm, borders, radii, shadows, layout widths, imagery, responsive behavior, and interaction states. Treat the source as the visual authority.

Then read the target project's `variables.css`, `components.css`, and `clipper.css`, plus the existing route and layout. Use Clipper only as the implementation foundation and token interface. Its defaults are not design constraints: replace or extend them whenever they differ from the source. For Astro or SvelteKit syntax that affects the conversion, consult current framework documentation.

Treat an existing route as contaminated demo content until proven otherwise. Before implementation, remove or replace its visible page markup, demo data, page-specific styles, style blocks, and imported demo components. Retain only framework setup, routing, and source-faithful code. Do not use the existing page as a visual starting point or a source of section labels.

Record source content as data in the route or component script when a set repeats. Give entries stable keys and source-faithful fields so the markup can later receive real data with little change.

**Done:** Every source region has a target semantic home, repeated content has a source-faithful data shape, and the source visual system is identified before markup is duplicated.

## 3. Build The Semantic Skeleton

Build the markup in the exact top-to-bottom order of the source inventory. Match the source's section count, repeated-item counts, major visual bands, and geometry-map alignment before polishing individual elements. Add a `header` or `footer` only when that region is visible in the source; do not add a semantic region merely because a typical website would have one. Use `main`, direct child `section` elements, and other semantic elements where they preserve the source structure.

Clipper sections already place direct children in the page-width grid column. Treat that as the default width for each direct heading, paragraph, grid, and content wrapper. Do not add `max-w-*`, `readable`, `w-*`, `mx-auto`, or an extra centering wrapper to a direct section child unless the source visibly overrides the section width. A paragraph directly inside a section inherits the intended page width; it is not an invitation to add a second readability constraint.

Clipper makes ordinary `div` elements flex columns by default. Apply the `row` class to every source-inventoried horizontal peer group, such as icon-and-label features and button clusters. Add `flex-wrap` or responsive direction utilities only when the source evidence calls for wrapping or stacking at that viewport. Do not leave source-visible peer items as an implicit column because that is the framework default. Use Clipper's grid, rhythm, `readable`, and `full-width` utilities when they produce the intended result; use static Tailwind utility classes when they do not. Do not reshape the source to fit framework defaults.

Use the source's visible copy verbatim unless a specific string is illegible in the provided evidence. Represent real destinations as links and real actions as buttons. Keep a logical heading hierarchy and expose labels for controls that lack visible text.

Use a supported icon library for source-visible interface icons when one is available in the target. Do not approximate menu, account, tracker, cart, or feature icons with emoji, Unicode characters, or arbitrary text glyphs. Inputs must remain visible, focusable native controls; never hide an input and visually substitute its label or another non-input element.

Maintain a content-origin check while writing markup: every visible string, including headings, labels, buttons, card text, and navigation items, must map to a specific source-inventory entry. If it has no entry, omit it. This applies especially to small uppercase headings, which must never be used as generic section decoration.

**Done:** The page contains every inventoried source region, item, and visible string in a keyboard-usable semantic structure before visual polish.

## 4. Translate The Visual System

Rebuild the source's page-wide visual system in `variables.css`. Override the target's existing defaults whenever they do not match the source:

- Define source-faithful semantic colors, including light and dark values when the source provides both themes.
- Identify the source fonts and weights, then set `--font-heading` and `--font-text` to the closest legally usable available fonts. Add the required font loading through the target framework; do not leave the target's default fonts in place when they differ.
- Reconfigure type, spacing, page-width, radius, border, shadow, and component tokens to reproduce the source. Use Clipper's fluid scale as a mechanism, not a visual prescription: change its values or use static Tailwind utilities when necessary for fidelity.

Before removing existing route CSS or replacing a prototype, make a one-for-one layout-class mapping for every source module. Each mapping must specify the static Tailwind/Clipper classes that establish its display mode, column count, measured width, spacing, alignment, and responsive change. For example, a three-up desktop card group needs an explicit `grid` and the required `grid-cols-3` at the source desktop width; a two-column feature needs an explicit `grid-cols-2` at that width; and a horizontal group needs `row`. Never delete styling and rely on browser defaults or Clipper's default flex-column behavior to recreate the layout.

Do not add `lg:` or any responsive breakpoint as a generic desktop default. Use the breakpoint map derived from the supplied reference widths. A content group that spans its parent in the source must remain `w-full` and must not be narrowed by an unrecorded descendant width constraint. Never use a text width constraint to compensate for a layout or breakpoint error.

Use Tailwind utilities in template class attributes for source-specific layout and typography. Apply `min-w-0` to flex or grid children that contain text so they can wrap within their intended column instead of forcing overflow or collapsing sibling widths. Do not apply a single centered container, `readable` width, or default section rhythm to every section: implement the alignment and width recorded in the geometry map. Update `components.css` for generic primitives that recur in the source; replace existing primitives when their current styling conflicts with the source. Keep truly one-off sections composed in their template without adding page-scoped CSS.

Use the actual source image assets when available. When an image is unavailable, use a restrained placeholder only for that image; preserve its role, dimensions, crop, and dominant tone. Implement each image-card-manifest entry with a real `<img>` in its card: use explicit `aspect-*`, `overflow-hidden`, and `object-cover` classes. For an image with overlaid text, place the image in an explicit relative card, then layer only the source-visible text over it with positioned utility classes and any needed overlay. Never represent an image-backed source card as a text-only tile, a solid-color tile, or a card using a different image. The rendered card count and image count must exactly match the manifest.

**Done:** `variables.css` expresses the source's visual system, source fonts are loaded and applied, repeated source UI has matching primitives, and one-off layout remains local to its page.

## 5. Verify The Conversion

Render the result at the exact pixel dimensions of every supplied desktop and mobile reference before declaring the work complete. Compare it directly with the source. First compare the silhouette: header presence or absence, major band heights, content-group left edges, container widths, image sizes and crops, and intentionally empty areas. Then verify every inventory entry: section order and count, exact copy, imagery, major band colors, typography and font weights, color, spacing, layout proportions, overflow, wrapping, responsive order, dark mode when applicable, keyboard focus, and meaningful interactive states. Verify each inventoried horizontal peer group independently: its items must be in the source order and horizontal at the desktop reference width, with only the source-supported wrapping or stacking behavior at mobile. Verify that each responsive class has activated the intended layout mode at the actual reference width.

Run a no-collapse visual pass at every checked viewport. Reject the result and repair its class mapping when any paragraph or label wraps one word per line, any direct section child or text wrapper has `max-w-*`, `readable`, `w-*`, `w-fit`, or `mx-auto` without the documented bounded-module exception, a source image block is missing or rendered as text, an image-card manifest count does not equal the rendered image count, a grid has fewer or more columns than the source at that viewport, peer items stack unexpectedly, a source desktop grid is still single-column because a guessed breakpoint has not activated, or a content group is narrower than its geometry-map width. These are layout failures, not acceptable responsive interpretations.

For each repeated module, confirm that its rendered content model matches the inventory. Remove any generated text below image-only or image-overlay modules. Remove any header or other visible element that cannot be pointed to in the source evidence.

Perform a source-to-markup media audit before completion. For every source image card, locate its corresponding rendered `<img>` and confirm the source asset/crop, aspect ratio, position in the grid, and text placement match the image-card manifest. A title string alone is not evidence that an image-backed card was implemented.

Audit the final route and page-specific styles for remnants of the target demo. Remove demo labels, sample data, imported demo components, and CSS selectors that create visual elements not present in the source. In the final screenshot, every small uppercase label, eyebrow, or tracked heading must have a matching source-inventory entry; otherwise remove it.

Audit styling ownership before the build: the route must contain no `<style>` element, CSS import, CSS module, or inline `style` attribute. Confirm that every route-level visual decision is expressed by a static Tailwind or Clipper class, every shared token change is in `variables.css`, and every reusable primitive change is in `components.css`. Search the route for `max-w-`, `readable`, `w-fit`, and text-container `w-` utilities; remove each unless it is the single documented bounded-module exception. Also verify that form controls are real visible controls and interface icons are proper icons, not text substitutes.

If the rendered result does not visibly resemble the source at a glance, continue adjusting it. Do not declare success because the build passes, the page is attractive, or it uses Clipper correctly.

Run the target project's build command. Resolve conversion-caused errors and keep the final implementation compatible with the existing project structure.

**Done:** The build passes, every inventory entry is present and source-faithful, the rendered result closely resembles the source at both checked viewport sizes, and the page remains legible and operable across the checked viewport and theme states.
