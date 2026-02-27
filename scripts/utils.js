#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

/**
 * Clean up test directories by removing src folders
 */
async function clean() {
  try {
    const srcFolders = await globby(["tests/*/src"], {
      cwd: projectRoot,
      onlyDirectories: true,
    });

    if (srcFolders.length === 0) {
      console.log("✅ No test artifacts to clean.");
      return;
    }

    for (const folder of srcFolders) {
      const fullPath = path.join(projectRoot, folder);
      await fs.rm(fullPath, { recursive: true, force: true });
      console.log(`✅ Cleaned: ${folder}`);
    }

    console.log("✅ Cleanup complete.");
  } catch (error) {
    console.error("❌ Error during cleanup:", error.message);
    process.exit(1);
  }
}

/**
 * Update version in clipper.css to match package.json
 */
async function updateVersion() {
  try {
    // Read package.json version
    const packagePath = path.join(projectRoot, "package.json");
    const packageContent = await fs.readFile(packagePath, "utf-8");
    const packageJson = JSON.parse(packageContent);
    const version = packageJson.version;

    // Read clipper.css
    const clipperPath = path.join(projectRoot, "clipper", "clipper.css");
    let clipperContent = await fs.readFile(clipperPath, "utf-8");

    // Replace version line (e.g., " * v0.1.0" -> " * v<new-version>")
    const oldVersionRegex = /(\s\*\s)v[\d.]+/;
    const newVersionLine = `$1v${version}`;

    const updatedContent = clipperContent.replace(oldVersionRegex, newVersionLine);

    if (updatedContent === clipperContent) {
      console.log(`ℹ️  clipper.css already at version v${version}`);
      return;
    }

    // Write back
    await fs.writeFile(clipperPath, updatedContent, "utf-8");
    console.log(`✅ Updated clipper.css to v${version}`);
  } catch (error) {
    console.error("❌ Error updating version:", error.message);
    process.exit(1);
  }
}

// Export for use in other scripts
export { clean, updateVersion };

// Allow running directly
const args = process.argv.slice(2);
if (args.includes("clean")) {
  await clean();
}
if (args.includes("update-version")) {
  await updateVersion();
}
