import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

function htmlFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith(".html") ? [path] : [];
  });
}

const withHashes = (value, hashes) => value.replace(/script-src[^;]*/, `script-src 'self' ${hashes.join(" ")}`);

// Static rendering keeps the site fast. Hash the actual generated inline Next.js
// scripts instead of allowing arbitrary inline JavaScript or forcing every request dynamic.
// Local `next start` reads headers from .next/routes-manifest.json. On Vercel, the
// Next.js adapter writes the deployable Build Output (including headers) to
// .next/output/config.json during `next build`, so that file is patched as well.
export function finalizeSecurity() {
  const dist = join(root, ".next");
  const manifestPath = join(dist, "routes-manifest.json");
  const outputConfigPath = join(dist, "output", "config.json");
  if (!existsSync(manifestPath)) throw new Error("Next.js production output is missing; cannot finalize CSP.");
  // Standard builds prerender HTML into .next/server/app; adapter builds use
  // .next/server/route-cache and copy it into .next/output.
  const pages = [...htmlFiles(join(dist, "server")), ...htmlFiles(join(dist, "output"))];
  const hashes = new Set();
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
      hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
    }
  }
  if (!pages.length || !hashes.size) throw new Error("No static page scripts found; review the production rendering model before serving.");
  const list = [...hashes];

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  let updated = 0;
  for (const route of manifest.headers ?? []) {
    for (const header of route.headers ?? []) {
      if (header.key.toLowerCase() !== "content-security-policy") continue;
      header.value = withHashes(header.value, list);
      updated++;
    }
  }
  if (!updated) throw new Error("The production CSP header was not found in the routes manifest.");
  writeFileSync(manifestPath, JSON.stringify(manifest));

  let outputUpdated = 0;
  if (existsSync(outputConfigPath)) {
    const config = JSON.parse(readFileSync(outputConfigPath, "utf8"));
    for (const route of config.routes ?? []) {
      for (const key of Object.keys(route.headers ?? {})) {
        if (key.toLowerCase() !== "content-security-policy") continue;
        route.headers[key] = withHashes(route.headers[key], list);
        outputUpdated++;
      }
    }
    if (!outputUpdated) throw new Error("The CSP header was not found in the Vercel Build Output config.");
    writeFileSync(outputConfigPath, JSON.stringify(config, null, 2));
  }
  console.log(`CSP finalized for ${pages.length} HTML files with ${hashes.size} script hashes${outputUpdated ? " (routes manifest and Vercel Build Output)" : ""}. Verify response headers when previewing/deploying.`);
}
