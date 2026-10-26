import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const cliPath = fileURLToPath(new URL("../bin/cli.js", import.meta.url));

test("updates an existing SvelteKit configuration from version 0.9.1 to 0.10.1", () => {
  const projectDir = mkdtempSync(path.join(os.tmpdir(), "clipper-cli-test-"));
  const clipperPath = path.join(projectDir, "src", "lib", "clipper", "clipper.css");

  try {
    mkdirSync(path.dirname(clipperPath), { recursive: true });
    writeFileSync(path.join(projectDir, "src", "app.html"), "<!doctype html>");
    writeFileSync(clipperPath, "/* Clipper CSS Framework\n * v0.9.1\n */\n");

    const output = execFileSync(process.execPath, [cliPath, "--yes"], {
      cwd: projectDir,
      encoding: "utf8",
    });

    assert.match(output, /Current version:\s+0\.9\.1/);
    assert.match(output, /New version:\s+0\.10\.1/);
    assert.match(output, /Updated clipper\.css/);
    assert.match(readFileSync(clipperPath, "utf8"), /v0\.10\.1/);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});
