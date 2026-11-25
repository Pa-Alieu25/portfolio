import { createHash } from "node:crypto";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
// Phase 4: the only approved public PDF, pinned to the text-verified export.
const approvedCv = { path: join("public", "Pa_Alieu_Njie_CV.pdf"), href: "/Pa_Alieu_Njie_CV.pdf", sha256: "9162e7beb068d4848cdc1718c98ce8271bd88271e947ca809e5a562a35e7c543" };
const sourceExtensions = /\.(?:tsx?|jsx?|json|md|html|svg|css|txt|xml)$/i;
const allowedGitHubUrls = new Set([
  "https://github.com/Pa-Alieu25",
  "https://github.com/Pa-Alieu25/mobile-project",
  "https://github.com/Pa-Alieu25/ReportIt",
]);

function files(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

export function checkPublicContent() {
  const errors = [];
  for (const directory of ["src", "public"]) {
    for (const path of files(join(root, directory))) {
      const name = relative(root, path);
      if (/\.env(?:\.|$)|\.(?:pem|key)$/i.test(path)) errors.push(`${name}: restricted file type`);
      if (/\.pdf$/i.test(path)) {
        if (name !== approvedCv.path) errors.push(`${name}: unapproved PDF`);
        else if (createHash("sha256").update(readFileSync(path)).digest("hex") !== approvedCv.sha256) errors.push(`${name}: differs from the verified Phase 4 export`);
      }
      if (!sourceExtensions.test(path)) continue;
      const content = readFileSync(path, "utf8");
      const githubUrls = content.match(/https?:\/\/github\.com\/[^\s"'<>`]+/gi) ?? [];
      if (githubUrls.some(url => !allowedGitHubUrls.has(url))) errors.push(`${name}: GitHub link outside the public allowlist`);
      if (/href\s*[=:]\s*["'](?:#|\/cv|[^"']*\.pdf)["']/i.test(content.replaceAll(`"${approvedCv.href}"`, ""))) errors.push(`${name}: placeholder or premature CV link`);
      // Public launch has no telephone contact or project credentials.
      if (/tel:|\+220[\s().-]*\d|(?:api[_-]?key|password|secret)\s*[=:]\s*["'][^"']{8,}["']/i.test(content)) errors.push(`${name}: possible private contact or credential`);
    }
  }
  if (errors.length) throw new Error(`Public content check failed:\n${errors.join("\n")}`);
  console.log("Public content check passed: no restricted source links, phone contacts, credentials or pending CV files detected in src/public.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) checkPublicContent();
