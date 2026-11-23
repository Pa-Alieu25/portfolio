import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
  });
}

// Static rendering keeps the site fast. Hash the actual generated inline Next.js
// scripts instead of allowing arbitrary inline JavaScript or forcing every request dynamic.
export function finalizeSecurity() {
  const appDirectory = join(root, ".next", "server", "app");
  const manifestPath = join(root, ".next", "routes-manifest.json");
  if (!existsSync(appDirectory) || !existsSync(manifestPath)) throw new Error("Next.js production output is missing; cannot finalize CSP.");
  const pages = htmlFiles(appDirectory);
  const hashes = new Set();
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
      hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
    }
  }
  if (!pages.length || !hashes.size) throw new Error("No static page scripts found; review the production rendering model before serving.");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  let updated = 0;
  for (const route of manifest.headers ?? []) {
    for (const header of route.headers ?? []) {
      if (header.key.toLowerCase() !== "content-security-policy") continue;
      header.value = header.value.replace(/script-src[^;]*/, `script-src 'self' ${[...hashes].join(" ")}`);
      updated++;
    }
  }
  if (!updated) throw new Error("The production CSP header was not found in the routes manifest.");
  writeFileSync(manifestPath, JSON.stringify(manifest));
  console.log(`CSP finalized for ${pages.length} static pages with ${hashes.size} script hashes. Verify response headers when previewing/deploying.`);
}
