---
name: "Clipper CSS"
applyTo: "**/*.html,**/*.astro,**/*.svelte,**/*.css,**/*.scss"
description: "Build Clipper pages with semantic HTML, framework defaults, shared tokens, and minimal classes."
---

# Clipper CSS

Use Clipper's **semantic first** foundation: classless semantic HTML is the baseline. Let Clipper supply layout, typography, spacing, colors, and focus styles. Configure shared tokens before adding local overrides. Classes express necessary differences from defaults, not a complete styling recipe.

## Contract

Read the installed `variables.css`, `components.css`, and `clipper.css` before editing. They define the current tokens, component contracts, and inherited defaults. Keep page composition in the route or component; configure shared palette, type, scale, page measurements, radii, and focus colors in `variables.css`. Leave `clipper.css` unchanged unless updating the framework itself.

## Class Contract

Every class in new or modified markup must be a documented Clipper class, an existing shared component contract, or a Tailwind utility. This applies equally to routes and newly added Astro, Svelte, or other UI components. Creating a component file is not permission to create CSS classes.

Use semantic HTML and Clipper defaults first, then Clipper helpers and existing contracts such as `row`, `readable`, `page-width`, and `btn`. Use Tailwind only for a specific requirement Clipper cannot express. Prefer semantic color utilities and the fluid token scale, such as `bg-muted`, `text-sm`, and `gap-xs`, over raw palette colors or fixed values. Keep the class list minimal; an available utility is not a required utility.

Never invent CSS class names such as `hero-content`, `feature-card`, or `site-header` when building a page or component. Use semantic elements and utility composition instead. Ordinary authoring must not introduce `style` attributes, framework style directives, `<style>` blocks, page or component stylesheets, CSS modules, or new CSS selectors to style the markup. Moving those selectors into `components.css` does not make them acceptable.

Tailwind fallback utilities do not require approval. Tailwind arbitrary values or properties require explicit user approval; they are separate from invented CSS class names, which are not an authoring fallback. If neither Clipper nor standard Tailwind utilities can satisfy a requirement, explain the specific gap and ask how to proceed.

## Structure

- Build from semantic landmarks with `section` as the direct child of `main` for each page band. Use real controls and heading levels; add headers and footers when the page calls for them.
- A `section` supplies page-width placement, fluid block padding, and vertical rhythm. Ordinary content belongs directly inside it. Use `full-width` for a true breakout, especially a full-bleed hero, and a `page-width` child for bounded hero content.
- `div`, `nav`, and lists already supply vertical flex flow and gaps. Use `row` for horizontal flex groups and `grid` with explicit columns for genuine grids. Add wrappers only for an actual grouping or layout requirement; ordinary vertical flow needs no layout classes. Use `readable` for long-form text.
- Headings already supply size, weight, line height, margins, and wrapping. Choose heading levels semantically and preserve their default appearance unless an intentional scale difference is needed. Likewise, preserve inherited text and background colors instead of repeating them on children.
- Use `header-sticky` when a sticky header is required. Give anchor targets an `id`. Add responsive variants only for an actual layout change; the fluid scales already handle size interpolation.

## Tokens

- Use `variables.css` to define semantic colors such as `background`, `foreground`, `muted`, `accent`, `border`, `link`, and primary variants. Keep light and dark values intentional. Add design-specific role tokens only when existing roles cannot express the design; apply them at the nearest owning container and inherit where possible.
- Configure `--max-page-width`, font families, and the fluid type and spacing scale from the design. Use `text-xs` through `text-6xl` and spacing steps from `4xs` through `4xl` only for intentional local differences. If the overall typography or spacing is wrong, fix the shared scale or layout tokens rather than overriding each element.
- Reuse existing `.btn`, `.card`, `.badge`, and other component contracts wherever their role fits, even for a single instance. Adding a UI component means composing markup and existing classes, not defining a new CSS contract. Add or change shared selectors in `components.css` only when the user explicitly requests shared component styling; repetition alone is not authorization. Preserve an established component library's own theming layer.

## Verification

Audit every added class: locate its definition in Clipper or an existing shared contract, or identify it as a Tailwind utility. An invented class name fails the audit. For each Tailwind fallback, identify the requirement Clipper cannot express. Remove redundant classes and wrappers, check for prohibited custom styling, and confirm approval for arbitrary values or explicitly requested shared CSS changes; visual correctness alone is not a pass.

Check the smallest and largest supported viewports, both color schemes when shared color tokens change, keyboard focus, text wrapping, and overflow. Run the relevant build or test command.

For a supplied website conversion, follow the `clipper-convert-website` skill. Its evidence map controls source matching, token extraction, responsive geometry, borders, type, and screenshot verification.
