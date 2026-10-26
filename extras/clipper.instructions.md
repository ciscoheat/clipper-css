---
name: "Clipper CSS"
applyTo: "**/*.html,**/*.astro,**/*.svelte,**/*.css,**/*.scss"
description: "Build Clipper pages with semantic HTML, framework defaults, shared tokens, and minimal classes."
---

# Clipper CSS

Use Clipper's **semantic first** foundation: classless semantic HTML is the baseline. Let Clipper supply layout, typography, spacing, colors, and focus styles. Configure shared tokens before adding local overrides. Classes express necessary differences from defaults, not a complete styling recipe.

## Contract

Read the installed `variables.css`, `components.css`, and `clipper.css` before editing. They define the current tokens, component contracts, and inherited defaults. Keep page composition in the route; configure shared palette, type, scale, page measurements, radii, and focus colors in `variables.css`; define new repeated generic primitives in `components.css`. Leave `clipper.css` unchanged unless updating the framework itself.

Add classes only for necessary Clipper structural helpers, existing component contracts, semantic color roles, and intentional size or spacing differences using the fluid token scale. These include `row`, `readable`, `page-width`, `grid` with explicit columns, `.btn`, `bg-muted`, `text-sm`, and `gap-xs`. Prefer the smallest expression that satisfies the requirement; an allowed class is not a required class.

Tailwind is an implementation tool, not the next styling layer. Utilities outside those categories, arbitrary values, and custom page styling require explicit user approval before use. Ordinary page authoring must not introduce `style` attributes, framework style directives, page-local style blocks, page stylesheets, or one-off CSS classes. Do not move one-off page styling into `components.css` to bypass this boundary. If the allowed tools cannot satisfy a requirement, explain the specific gap and ask for approval rather than silently adding an exception.

## Structure

- Build from semantic landmarks with `section` as the direct child of `main` for each page band. Use real controls and heading levels; add headers and footers when the page calls for them.
- A `section` supplies page-width placement, fluid block padding, and vertical rhythm. Ordinary content belongs directly inside it. Use `full-width` for a true breakout, especially a full-bleed hero, and a `page-width` child for bounded hero content.
- `div`, `nav`, and lists already supply vertical flex flow and gaps. Use `row` for horizontal flex groups and `grid` with explicit columns for genuine grids. Add wrappers only for an actual grouping or layout requirement; ordinary vertical flow needs no layout classes. Use `readable` for long-form text.
- Headings already supply size, weight, line height, margins, and wrapping. Choose heading levels semantically and preserve their default appearance unless an intentional scale difference is needed. Likewise, preserve inherited text and background colors instead of repeating them on children.
- Use `header-sticky` when a sticky header is required. Give anchor targets an `id`. Add responsive variants only for an actual layout change; the fluid scales already handle size interpolation.

## Tokens

- Use `variables.css` to define semantic colors such as `background`, `foreground`, `muted`, `accent`, `border`, `link`, and primary variants. Keep light and dark values intentional. Add design-specific role tokens only when existing roles cannot express the design; apply them at the nearest owning container and inherit where possible.
- Configure `--max-page-width`, font families, and the fluid type and spacing scale from the design. Use `text-xs` through `text-6xl` and spacing steps from `4xs` through `4xl` only for intentional local differences. If the overall typography or spacing is wrong, fix the shared scale or layout tokens rather than overriding each element.
- Reuse existing `.btn`, `.card`, `.badge`, and other component contracts wherever their role fits, even for a single instance. Create a new contract only for a repeated generic UI pattern, not to hide a utility-heavy one-off. Preserve an established component library's own theming layer.

## Verification

Audit every added class: identify the requirement it serves that semantics, inherited defaults, shared tokens, or an existing component do not already satisfy. Remove redundant classes and wrappers. Confirm that styling stays within the allowed categories and that every exception has explicit user approval; visual correctness alone is not a pass.

Check the smallest and largest supported viewports, both color schemes when shared color tokens change, keyboard focus, text wrapping, and overflow. Run the relevant build or test command.

For a supplied website conversion, follow the `clipper-convert-website` skill. Its evidence map controls source matching, token extraction, responsive geometry, borders, type, and screenshot verification.
