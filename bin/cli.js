#!/usr/bin/env node

// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Use path helpers for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const cwd = process.cwd();

  // 1. Detect project type
  /** @type {keyof typeof config} */
  let type;

  if ((await exists(path.join(cwd, "astro.config.mjs"))) || (await exists(path.join(cwd, "astro.config.ts")))) {
    type = "astro";
  } else if ((await exists(path.join(cwd, "svelte.config.js"))) || (await exists(path.join(cwd, "svelte.config.ts")))) {
    type = "sveltekit";
  } else if ((await exists(path.join(cwd, "next.config.js"))) || (await exists(path.join(cwd, "next.config.mjs")))) {
    type = "next";
  } else {
    console.error("❌ No supported framework detected (Astro, SvelteKit, Next.js).");
    console.error("   Run this command at the root of a supported project.");
    process.exit(1);
  }

  console.log(`Detected project type: ${type}`);

  // 2. Configuration for frameworks
  const config = {
    astro: {
      clipperDest: "src/styles",
      nextSteps: [
        "Ensure tailwind v4 is installed: https://docs.astro.build/en/guides/styling/#tailwind",
        "Add \"import '../styles/clipper.css'\" to your global layout.",
      ],
    },
    sveltekit: {
      clipperDest: "src/lib/clipper",
      nextSteps: [
        "Ensure tailwind v4 is installed: https://svelte.dev/docs/cli/tailwind",
        'import "$lib/clipper/clipper.css"; in your src/routes/+layout.svelte.',
      ],
    },
    next: {
      clipperDest: "src/clipper",
      nextSteps: ['Import "./clipper/clipper.css" in your layout.tsx or globals.css.'],
    },
  };

  const selectedConfig = config[/** @type {keyof typeof config} */ (type)];
  const templatesDir = path.resolve(__dirname, "..", "templates");

  // 3. Copy Framework Template (Everything from templates/FRAMEWORK to content root)
  const frameworkTemplateSrc = path.join(templatesDir, type);

  if (await exists(frameworkTemplateSrc)) {
    console.log(`Installing ${type} template files...`);
    await copyDir(frameworkTemplateSrc, cwd);
  } else {
    console.warn(`⚠️ No template directory found for ${type} at ${frameworkTemplateSrc}`);
  }

  // 4. Copy Base Clipper Files
  const clipperSource = path.join(__dirname, "..", "clipper");
  const clipperDestPath = path.join(cwd, selectedConfig.clipperDest);

  console.log(`Installing Clipper core to: ${clipperDestPath}`);
  await copyDir(clipperSource, clipperDestPath);

  // 5. Tailwind Configuration Hint
  console.log("\n✅ Clipper installed successfully!");
  console.log("Next steps:");
  if (selectedConfig.nextSteps) {
    selectedConfig.nextSteps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  }
}

// Helpers
/**
 * @param {string} p
 */
async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} src
 * @param {string} dest
 */
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
