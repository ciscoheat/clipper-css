#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Use path helpers for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const cwd = process.cwd();

  // 1. Detect project type
  const isAstro =
    (await exists(path.join(cwd, "astro.config.mjs"))) || (await exists(path.join(cwd, "astro.config.ts")));

  const isSvelte =
    (await exists(path.join(cwd, "svelte.config.js"))) || (await exists(path.join(cwd, "svelte.config.ts")));

  const isNext = (await exists(path.join(cwd, "next.config.js"))) || (await exists(path.join(cwd, "next.config.mjs")));

let type = null;
  if (isAstro) type = "astro";
  else if (isSvelte) type = "sveltekit";
  else if (isNext) type = "next";
  
  if (!type) {
      console.error("❌ No supported framework detected (Astro, SvelteKit, Next.js).");
      console.error("   Run this command at the root of a supported project.");
      process.exit(1);
  }

  console.log(`Detected project type: ${type}`);

  // 2. Locate templates directory relative to this script
  // Considering the script is run from bin/cli.js, templates are ../templates
  const templatesDir = path.resolve(__dirname, "..", "templates");

  // 3. Copy base files (Clipper itself)
  // Always copy src/clipper/* to the correct destination
  const clipperSource = path.join(__dirname, "..", "src", "clipper");
  let clipperDest = path.join(cwd, "src", "clipper");

  if (type === "sveltekit") {
    clipperDest = path.join(cwd, "src", "lib", "clipper");
  }

  console.log(`Installing Clipper core to: ${clipperDest}`);
  await copyDir(clipperSource, clipperDest);

  // 4. Copy framework-specific files (Layouts)
  if (type === "astro") {
    const layoutSource = path.join(templatesDir, "astro", "src", "layouts");
    const layoutDest = path.join(cwd, "src", "layouts");
    console.log(`Installing Astro layouts to: ${layoutDest}`);
    await copyDir(layoutSource, layoutDest);
  } else if (type === "sveltekit") {
    const layoutSource = path.join(templatesDir, "sveltekit", "src", "lib", "layouts");
    const layoutDest = path.join(cwd, "src", "lib", "layouts");
    console.log(`Installing SvelteKit layouts to: ${layoutDest}`);
    await copyDir(layoutSource, layoutDest);
  }

  // 5. Tailwind Configuration Hint
  console.log('\n✅ Clipper installed successfully!');
  console.log('Next steps:');
  console.log('1. Ensure your tailwind config includes the clipper paths.');
  if (type === 'astro') {
    console.log('   Add "src/clipper/*.css" to your global styles import.');
  } else if (type === 'sveltekit') {
    console.log('   Import "$lib/clipper/clipper.css" in your +layout.svelte.');
  }
}

// Helpers
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

main().catch(console.error);
