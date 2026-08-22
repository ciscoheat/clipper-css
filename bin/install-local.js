#!/usr/bin/env node

import path from "node:path";

const args = process.argv.slice(2);
const target = args.find((arg) => !arg.startsWith("-"));

if (!target) {
  console.error("Usage: pnpm install:local <project-directory> [--yes]");
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), target);
process.chdir(targetPath);

await import(new URL("./cli.js", import.meta.url));
