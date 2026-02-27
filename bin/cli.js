#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";
import prompts from "prompts";

// Use path helpers for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

const c = colors; // shorthand

// Helper to automatically reset colors after logging
function log(message, color = "") {
  // Replace any internal ._reset patterns with nothing since we'll reset at the end
  const cleaned = message.replace(/\x1b\[0m/g, "");
  console.log(`${color}${cleaned}${c.reset}`);
}

async function main() {
  const cwd = process.cwd();
  const autoYes = process.argv.includes("-y") || process.argv.includes("--yes");

  // Print header
  log(`\n  ✨ Clipper CSS Installer ✨\n`, `${c.cyan}${c.bright}`);

  // Detect dev mode: if clipper/ source directory exists relative to bin/, we're in development
  const devMode = await exists(path.resolve(__dirname, "..", "clipper"));

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
    log(`❌ No supported framework detected\n   Supported: Astro, SvelteKit, Next.js`, `${c.red}${c.bright}`);
    log(`   Run this command at the root of a supported project.`, c.gray);
    process.exit(1);
  }

  log(`✓ Detected project type: ${c.bright}${type}${c.reset}`, c.green);

  // 2. Configuration for frameworks
  const config = {
    astro: {
      clipperDest: "src/styles",
      templateSrc: "astro",
    },
    sveltekit: {
      clipperDest: "src/lib/clipper",
      templateSrc: "sveltekit",
    },
    next: {
      clipperDest: "src/clipper",
      templateSrc: "next",
    },
  };

  const selectedConfig = config[type];
  const clipperSourceDir = path.resolve(__dirname, "..", "clipper");
  const templatesDir = path.resolve(__dirname, "..", "templates");
  const templateSourceDir = path.join(templatesDir, selectedConfig.templateSrc);

  // 3. Scan for existing clipper.css
  // Using globby with gitignore support to avoid manual ignore lists
  // In dev mode, only ignore node_modules; in production, respect .gitignore
  const existingClipperFiles = await globby("**/clipper.css", {
    cwd,
    ...(devMode ? { ignore: ["node_modules/**"] } : { gitignore: true }),
  });

  const existingClipperPath = existingClipperFiles.length > 0 ? existingClipperFiles[0] : null;

  if (existingClipperPath) {
    // --- FLOW 2: FOUND ---
    log(`\n⚠️  Found existing configuration\n   ${existingClipperPath}`, c.yellow);

    const newClipperCssPath = path.join(clipperSourceDir, "clipper.css");

    let oldContent = "";
    try {
      oldContent = await fs.readFile(path.join(cwd, existingClipperPath), "utf-8");
    } catch (e) {
      log(`Could not read existing file`, c.red);
    }

    const newContent = await fs.readFile(newClipperCssPath, "utf-8");

    const oldVersion = parseVersion(oldContent);
    const newVersion = parseVersion(newContent);
    const isNewer = oldVersion && newVersion && oldVersion < newVersion;

    log(`   Current version: ${oldVersion || "unknown"}`);
    log(`   New version:     ${newVersion || "unknown"}`);

    let overwrite = isNewer;

    if (isNewer && !autoYes) {
      const response = await prompts({
        type: "confirm",
        name: "overwrite",
        message: "Do you want to overwrite clipper.css with the latest version?",
        initial: true,
      });
      overwrite = response.overwrite;
    }

    if (overwrite) {
      await fs.copyFile(newClipperCssPath, path.join(cwd, existingClipperPath));
      log(`✅ Updated clipper.css`, c.green);
    } else {
      log(`Skipping update.`, c.gray);
    }
  } else {
    // --- FLOW 1: NOT FOUND ---
    log(`\n✨ New setup detected`, c.cyan);

    // Gather potential files
    const allCoreFiles = [];
    const allTemplateFiles = [];

    // Core Clipper Files
    if (await exists(clipperSourceDir)) {
      const coreFiles = await globby("**/*", {
        cwd: clipperSourceDir,
        ...(devMode ? { ignore: ["node_modules/**"] } : { gitignore: true }),
      });
      for (const f of coreFiles) {
        allCoreFiles.push({
          src: path.join(clipperSourceDir, f),
          dest: path.join(selectedConfig.clipperDest, f),
        });
      }
    }

    // Framework Template Files
    if (await exists(templateSourceDir)) {
      const templFiles = await globby("**/*", {
        cwd: templateSourceDir,
        ...(devMode ? { ignore: ["node_modules/**"] } : { gitignore: true }),
      });
      for (const f of templFiles) {
        allTemplateFiles.push({
          src: path.join(templateSourceDir, f),
          dest: f, // relative to root
        });
      }
    }

    const filesToCopy = [];

    // Question 1: Core Files
    let copyCore = autoYes;
    if (allCoreFiles.length > 0) {
      log(`\nClipper CSS Core Files:`, c.gray);
      allCoreFiles.forEach((f) => log(` + ${f.dest}`, c.cyan));

      if (!autoYes) {
        const response = await prompts({
          type: "confirm",
          name: "copyCore",
          message: "Install Clipper CSS core files?",
          initial: true,
        });
        copyCore = response.copyCore;
      }
    }

    if (copyCore) {
      filesToCopy.push(...allCoreFiles);
    }

    // Question 2: Template Files
    let copyTemplate = autoYes;
    if (allTemplateFiles.length > 0) {
      log(`\nTemplate Files:`, c.gray);
      allTemplateFiles.forEach((f) => log(` + ${f.dest}`, c.cyan));

      if (!autoYes) {
        const response = await prompts({
          type: "confirm",
          name: "copyTemplate",
          message: "Install template files?",
          initial: true,
        });
        copyTemplate = response.copyTemplate;
      }
    }

    if (copyTemplate) {
      filesToCopy.push(...allTemplateFiles);
    }

    if (filesToCopy.length === 0) {
      log(`No files selected to install.`, c.gray);
      process.exit(0);
    }

    log(`\nInstalling selected files...`, c.gray);

    // Perform Copy
    for (const f of filesToCopy) {
      const absDest = path.join(cwd, f.dest);
      await fs.mkdir(path.dirname(absDest), { recursive: true });
      await fs.copyFile(f.src, absDest);
    }

    log(`✅ Files installed.`, c.green);

    // Inject @import
    const destDir = selectedConfig.clipperDest;
    await injectImport(cwd, destDir, devMode);
  }
}

// Helpers

/**
 * Parses version from CSS file if present (e.g. v1.0.0 in comment blocks)
 * @param {string} content
 */
function parseVersion(content) {
  const match = content.match(/v([\d\.]+)/);
  return match ? match[1] : null;
}

/**
 * Scans for tailwind imports and injects clipper import
 * @param {string} cwd
 * @param {string} clipperDestRelative
 * @param {boolean} devMode
 */
async function injectImport(cwd, clipperDestRelative, devMode) {
  // Use .gitignore or custom ignore based on dev mode
  const cssFiles = await globby("**/*.css", {
    cwd,
    ...(devMode ? { ignore: ["node_modules/**"] } : { gitignore: true }),
  });

  if (cssFiles.length === 0) {
    log(`ℹ️  No CSS files found to inject import.`, c.gray);
    return;
  }

  let patched = false;

  for (const file of cssFiles) {
    const absPath = path.join(cwd, file);
    let content = await fs.readFile(absPath, "utf-8");

    // Regex to match @import "tailwindcss" or 'tailwindcss' or similar
    // Matches: @import "tailwindcss"; OR @import 'tailwindcss'
    const tailwindImportRegex = /@import\s+['"]tailwindcss['"]\s*;?/i;
    const match = content.match(tailwindImportRegex);

    if (match) {
      // Check if already imported
      if (content.includes("clipper.css")) continue;

      // Calculate relative path from this css file to the installed clipper.css
      // clipperDestRelative is usually src/clipper
      // file is usually src/app.css

      const clipperCssAbsPath = path.join(cwd, clipperDestRelative, "clipper.css");
      const cssFileDir = path.dirname(absPath);

      let relPath = path.relative(cssFileDir, clipperCssAbsPath);

      // Ensure "./" prefix if it's in the same directory or simple relative path
      if (!relPath.startsWith(".")) {
        relPath = "./" + relPath;
      }
      // Fix windows backslashes
      relPath = relPath.replace(/\\/g, "/");

      const injection = `\n@import '${relPath}';`;

      // Insert after the match
      const insertPos = match.index + match[0].length;
      const newContent = content.slice(0, insertPos) + injection + content.slice(insertPos);

      await fs.writeFile(absPath, newContent, "utf-8");
      log(`✅ Injected import into ${file}`, c.green);
      patched = true;
      break;
    }
  }

  if (!patched) {
    log(
      `ℹ️  Could not automatically inject CSS import.\n   Please import ${clipperDestRelative}/clipper.css manually.`,
      c.gray,
    );
  }
}

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

main().catch(console.error);
