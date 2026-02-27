#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Use path helpers for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const cwd = process.cwd();

  // 1. Detect project type
  let type = null;
  
  if ((await exists(path.join(cwd, "astro.config.mjs"))) || (await exists(path.join(cwd, "astro.config.ts")))) {
      type = "astro";
  } else if ((await exists(path.join(cwd, "svelte.config.js"))) || (await exists(path.join(cwd, "svelte.config.ts")))) {
      type = "sveltekit";
  } else if ((await exists(path.join(cwd, "next.config.js"))) || (await exists(path.join(cwd, "next.config.mjs")))) {
      type = "next";
  }

  if (!type) {
      console.error("❌ No supported framework detected (Astro, SvelteKit, Next.js).");
      console.error("   Run this command at the root of a supported project.");
      process.exit(1);
  }

  console.log(`Detected project type: ${type}`);

  // 2. Configuration for frameworks
  const config = {
      astro: {
          clipperDest: 'src/clipper',
          templateSrc: 'astro'
      },
      sveltekit: {
          clipperDest: 'src/lib/clipper',
          templateSrc: 'sveltekit'
      },
      next: {
          clipperDest: 'src/clipper', // fallback
          templateSrc: 'next'
      }
  };

  const selectedConfig = config[type];
  const templatesDir = path.resolve(__dirname, "..", "templates");
  
  // 3. Copy Framework Template (Everything from templates/FRAMEWORK to content root)
  const frameworkTemplateSrc = path.join(templatesDir, selectedConfig.templateSrc);
  
  if (await exists(frameworkTemplateSrc)) {
       console.log(`Installing ${type} template files...`);
       await copyDir(frameworkTemplateSrc, cwd);
  } else {
       console.warn(`⚠️ No template directory found for ${type} at ${frameworkTemplateSrc}`);
  }

  // 4. Copy Base Clipper Files (src/clipper to Configured Destination)
  const clipperSource = path.join(__dirname, "..", "src", "clipper");
  const clipperDestPath = path.join(cwd, selectedConfig.clipperDest);
  
  console.log(`Installing Clipper core to: ${clipperDestPath}`);
  await copyDir(clipperSource, clipperDestPath);

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
