import en from "../messages/en.json";
import es from "../messages/es.json";

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      return flattenKeys(val as Record<string, unknown>, path);
    }
    return [path];
  });
}

const enKeys = new Set(flattenKeys(en as Record<string, unknown>));
const esKeys = new Set(flattenKeys(es as Record<string, unknown>));

const missing = [...enKeys].filter((k) => !esKeys.has(k));
const orphan = [...esKeys].filter((k) => !enKeys.has(k));

let hasError = false;

if (missing.length > 0) {
  console.error("Missing keys in es.json (exist in en.json):");
  for (const k of missing) console.error(`  - ${k}`);
  hasError = true;
}

if (orphan.length > 0) {
  console.error("Orphan keys in es.json (not in en.json):");
  for (const k of orphan) console.error(`  - ${k}`);
  hasError = true;
}

if (hasError) process.exit(1);

console.log(`✓ ${enKeys.size} keys match between en.json and es.json`);
