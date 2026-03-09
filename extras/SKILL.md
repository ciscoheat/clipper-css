---
name: clipper-convert-website
description: Convert a screenshot, html file or a whole project to the Clipper CSS framework in the web framework of your choice (Astro, SvelteKit, etc).
disable-model-invocation: true
---

# Skill instructions

Use the given data (a screenshot, file(s) or the current project, called "the source") as a template, then convert it to the Clipper CSS framework and move the different parts (header, footer, components, etc) into existing and new pages and css files.

- ALL sections and content from the source should be converted, and **as similar to the source as possible within the Clipper framework**, as a foundation for the rest of the website. Do NOT make up extra content.
- Adhere to `clipper.instructions.md` to cut down on utility classes as much as possible. For example, for horizontal layout elements, use the "row" utility class.
- Study `clipper.css` and `variables.css` to figure out the best possible match for the spacing and convert to that. Example: `gap-3` should be replaced with `gap-AAA` where AAA is the best matching spacing of the source (2xl, sm, etc). Do NOT be lazy and use general Tailwind utility classes.
- Existing components in `components.css` should be replaced with the ones from the source.
- Fonts should be detected and best match taken from Google Fonts. Do NOT simply keep the default font set in `variables.css`.
- Colors in `variables.css` should be redefined according to the source. Figure out primary and eventual secondary color and create shades for them.
- Repeating content is perfect for components, move its data into code above the html **in the same file**, so it can be easily replaced later.
- If you have no access to images, use placeholders, in the same general color as the image.
- ENSURE the page is mobile friendly and that dark mode works.
- Make sure that components and primitives are factorized and easily reusable, but ONLY if they are actually being used multiple times on the page. For example: A "Hero" section should NOT be factorized into a component if it only exists once!
- MCP: Use context7 for the web framework details (Astro, SvelteKit, etc) and chrome-devtools to verify visually before finishing.
- Run a build before finishing to catch any stray errors.
