import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { checkPublicContent } from "./check-public.mjs";
import { finalizeSecurity } from "./finalize-security.mjs";

checkPublicContent();
const require = createRequire(import.meta.url);
let next;
try {
  next = require.resolve("next/dist/bin/next");
} catch {
  console.error("Next.js is not installed. Run npm install in the portfolio directory, then npm run build.");
  process.exit(1);
}
const result = spawnSync(process.execPath, [next, "build"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
finalizeSecurity();
