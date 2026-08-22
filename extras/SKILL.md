---
name: clipper-convert-website
description: Convert supplied website content into an Astro or SvelteKit Clipper implementation.
disable-model-invocation: true
---

# Convert A Website To Clipper

Convert the supplied screenshot, HTML, or project into a working Clipper page that is as visually and behaviorally faithful to the source as possible. Preserve every source section, item, meaningful interaction, and visual decision. Do not blend in Clipper's default theme or invent a new aesthetic.

## Non-Negotiable Fidelity Rules

- Never substitute source copy, imagery, branding, sections, or page composition with invented alternatives. A visually polished but different website is a failed conversion.
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

Do not begin implementation until every visible source region has an inventory entry. Use the inventory as the acceptance checklist during verification.

**Done:** Reliable visual evidence exists at desktop and mobile widths, and a complete, ordered inventory describes the source without invented content.

## 2. Establish The Target

Inspect the source first: identify its typefaces, type scale, colors, spacing rhythm, borders, radii, shadows, layout widths, imagery, responsive behavior, and interaction states. Treat the source as the visual authority.

Then read the target project's `variables.css`, `components.css`, and `clipper.css`, plus the existing route and layout. Use Clipper only as the implementation foundation and token interface. Its defaults are not design constraints: replace or extend them whenever they differ from the source. For Astro or SvelteKit syntax that affects the conversion, consult current framework documentation.

Record source content as data in the route or component script when a set repeats. Give entries stable keys and source-faithful fields so the markup can later receive real data with little change.

**Done:** Every source region has a target semantic home, repeated content has a source-faithful data shape, and the source visual system is identified before markup is duplicated.

## 3. Build The Semantic Skeleton

Build the markup in the exact top-to-bottom order of the source inventory. Match the source's section count, repeated-item counts, and major visual bands before polishing individual elements. Use `header`, `main`, direct child `section` elements, and `footer` where they preserve the source structure. Use Clipper's grid, rhythm, `row`, `readable`, and `full-width` utilities when they produce the intended result; override them locally when they do not. Do not reshape the source to fit framework defaults.

Use the source's visible copy verbatim unless a specific string is illegible in the provided evidence. Represent real destinations as links and real actions as buttons. Keep a logical heading hierarchy and expose labels for controls that lack visible text.

**Done:** The page contains every inventoried source region, item, and visible string in a keyboard-usable semantic structure before visual polish.

## 4. Translate The Visual System

Rebuild the source's page-wide visual system in `variables.css`. Override the target's existing defaults whenever they do not match the source:

- Define source-faithful semantic colors, including light and dark values when the source provides both themes.
- Identify the source fonts and weights, then set `--font-heading` and `--font-text` to the closest legally usable available fonts. Add the required font loading through the target framework; do not leave the target's default fonts in place when they differ.
- Reconfigure type, spacing, page-width, radius, border, shadow, and component tokens to reproduce the source. Use Clipper's fluid scale as a mechanism, not a visual prescription: change its values or add local styles when necessary for fidelity.

Use template utilities and local page styles for source-specific layout and typography. Update `components.css` for generic primitives that recur in the source; replace existing primitives when their current styling conflicts with the source. Keep truly one-off sections composed in their template.

Use the actual source image assets when available. When an image is unavailable, use a restrained placeholder only for that image; preserve its role, dimensions, crop, and dominant tone. Never replace a source image with unrelated stock imagery or change the source's media concept.

**Done:** `variables.css` expresses the source's visual system, source fonts are loaded and applied, repeated source UI has matching primitives, and one-off layout remains local to its page.

## 5. Verify The Conversion

Render the result at the same desktop and mobile viewports used for the source evidence. Compare it directly with the source before declaring the work complete. Verify every inventory entry: section order and count, exact copy, imagery, major band colors, container geometry, typography and font weights, color, spacing, layout proportions, overflow, wrapping, responsive order, dark mode when applicable, keyboard focus, and meaningful interactive states.

If the rendered result does not visibly resemble the source at a glance, continue adjusting it. Do not declare success because the build passes, the page is attractive, or it uses Clipper correctly.

Run the target project's build command. Resolve conversion-caused errors and keep the final implementation compatible with the existing project structure.

**Done:** The build passes, every inventory entry is present and source-faithful, the rendered result closely resembles the source at both checked viewport sizes, and the page remains legible and operable across the checked viewport and theme states.
