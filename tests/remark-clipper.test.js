// @ts-check

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkClipper } from "../extras/remark-clipper.js";

const variablesCss = readFileSync(fileURLToPath(new URL("../clipper/variables.css", import.meta.url)), "utf8");
const clipperCss = readFileSync(fileURLToPath(new URL("../clipper/clipper.css", import.meta.url)), "utf8");

/**
 * Process markdown through the remarkClipper plugin and return HTML.
 * @param {string} markdown
 * @returns {Promise<string>}
 */
async function process(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkClipper)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

test("fluid scales expose the ratio-based token contract", () => {
  assert.match(clipperCss, /accent-color:\s*var\(--primary\)/);
  assert.match(variablesCss, /--fluid-screen-min:\s*22\.5rem/);
  assert.match(variablesCss, /--fluid-screen-max:\s*100rem/);
  assert.match(variablesCss, /--text-ratio:\s*1\.2/);
  assert.match(variablesCss, /--heading-ratio:\s*1\.25/);
  assert.match(variablesCss, /--space-ratio:\s*1\.3/);
  assert.match(variablesCss, /--text-base-min:/);
  assert.match(variablesCss, /--text-base-max:/);
  assert.match(variablesCss, /--space-base-min:/);
  assert.match(variablesCss, /--space-base-max:/);
  assert.doesNotMatch(variablesCss, /--text-scale|--heading-scale|--space-scale-|--space-offset-/);

  for (const token of ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]) {
    assert.match(variablesCss, new RegExp(`--text-${token}:`));
    assert.match(variablesCss, new RegExp(`--text-${token}:[^;]*var\\(--fluid-progress\\)`));
  }

  for (const token of ["4xs", "3xs", "2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"]) {
    assert.match(variablesCss, new RegExp(`--space-${token}:`));
    assert.match(variablesCss, new RegExp(`--space-${token}:[^;]*var\\(--fluid-progress\\)`));
    assert.match(clipperCss, new RegExp(`--spacing-${token}:\\s*var\\(--space-${token}\\)`));
  }
});

test('column="first": image is pinned before the content wrapper', async () => {
  const md = `
<section column="first">

![Hero](./hero.jpg)

Some text here.

More text here.

</section>
`.trim();

  const html = await process(md);

  // Section must have the markdownContentClass and no column attribute
  assert.ok(html.includes('<section class="markdown-content">'), "section has markdown-content class");
  assert.ok(!html.includes("column="), "column attribute is removed");

  // Grid wrapper must be present
  assert.ok(html.includes('class="grid gap-2xl lg:grid-cols-2 lg:items-center"'), "wrapper div has grid classes");

  // Pinned image (first child) must come before the content <div>
  const imgPos = html.indexOf("<img");
  const contentDivPos = html.indexOf("<div>");
  assert.ok(imgPos !== -1, "image is present");
  assert.ok(imgPos < contentDivPos, "image appears before the content wrapper div");

  // Remaining paragraphs live inside the content wrapper
  assert.ok(html.includes("Some text here"), "first paragraph rendered");
  assert.ok(html.includes("More text here"), "second paragraph rendered");
});

test('column="last": image is pinned after the content wrapper', async () => {
  const md = `
<section column="last">

Some text here.

More text here.

![Hero](./hero.jpg)

</section>
`.trim();

  const html = await process(md);

  assert.ok(html.includes('<section class="markdown-content">'), "section has markdown-content class");
  assert.ok(!html.includes("column="), "column attribute is removed");
  assert.ok(html.includes('class="grid gap-2xl lg:grid-cols-2 lg:items-center"'), "wrapper div has grid classes");

  // Pinned image (last child) must come after the first closing </div>
  const firstClosingDiv = html.indexOf("</div>");
  const imgPos = html.indexOf("<img");
  assert.ok(imgPos !== -1, "image is present");
  assert.ok(imgPos > firstClosingDiv, "image appears after the content wrapper div");

  assert.ok(html.includes("Some text here"), "first paragraph rendered");
  assert.ok(html.includes("More text here"), "second paragraph rendered");
});

test("no column attribute: section passes through with its content unchanged", async () => {
  const md = `
<section id="ok" class="bg-muted">

Some text here.

</section>
`.trim();

  const html = await process(md);

  // Section must have the markdownContentClass added, preserving existing classes and attributes
  assert.ok(
    html.includes('<section id="ok" class="bg-muted markdown-content">'),
    "section has markdown-content class added",
  );
  assert.ok(html.includes("</section>"), "closing section tag preserved");

  // No grid wrapper or content divs should appear
  assert.ok(!html.includes("grid"), "no grid wrapper injected");
  assert.ok(!html.includes("<div"), "no wrapper divs injected");

  // Text content must still be rendered
  assert.ok(html.includes("Some text here"), "paragraph content rendered");
});
