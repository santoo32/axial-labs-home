/**
 * Voice and tone checker for Axial Labs copy.
 * Checks en.json and es.json for forbidden words, em dashes, and exclamation marks in headings.
 */

import en from "../messages/en.json";
import es from "../messages/es.json";

// Keys excluded from forbidden-word checks (code labels, brand marks, legal strings)
const SKIP_KEYS = new Set([
  "eyebrow",
  "principles_eyebrow",
  "code",
  "coordinate",
  "legal",
  "version",
]);

const FORBIDDEN_EN = [
  "innovative",
  "cutting-edge",
  "best-in-class",
  "seamless",
  "robust",
  "powerful",
  "empower",
  "leverage",
  "streamline",
  "revolutionize",
  "transform",
  "synergy",
  "solutions",
  "journey",
  "stunning",
  "beautiful",
];

const FORBIDDEN_ES = [
  "innovador",
  "innovadora",
  "vanguardista",
  "soluciones",
  "potenciar",
  "transformar",
  "revolucionar",
  "sinergia",
  "viaje",
  "impresionante",
  "hermoso",
  "hermosa",
  "poderoso",
  "poderosa",
  "aprovechar",
  "optimizar",
  "optimización",
  "robusto",
  "robusta",
];

// Keys whose values are headings (no exclamation marks allowed)
const HEADING_KEYS = new Set(["heading", "title", "pull_quote"]);

type Issue = { file: string; key: string; value: string; problem: string };

function collectStrings(
  obj: Record<string, unknown>,
  prefix = "",
): Array<{ key: string; value: string }> {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") return [{ key: path, value: v }];
    if (typeof v === "object" && v !== null && !Array.isArray(v))
      return collectStrings(v as Record<string, unknown>, path);
    return [];
  });
}

function leafKey(dotPath: string): string {
  return dotPath.split(".").at(-1) ?? dotPath;
}

function checkFile(
  messages: Record<string, unknown>,
  filename: string,
  forbidden: string[],
): Issue[] {
  const issues: Issue[] = [];
  const entries = collectStrings(messages);

  for (const { key, value } of entries) {
    const leaf = leafKey(key);
    if (SKIP_KEYS.has(leaf)) continue;

    // Forbidden words (case-insensitive, whole-word)
    for (const word of forbidden) {
      const re = new RegExp(`\\b${word}\\b`, "i");
      if (re.test(value)) {
        issues.push({ file: filename, key, value, problem: `forbidden word: "${word}"` });
      }
    }

    // Em dashes in body copy
    if (value.includes("—")) {
      issues.push({ file: filename, key, value, problem: "em dash (—) in copy — prefer a period" });
    }

    // Exclamation marks in headings
    if (HEADING_KEYS.has(leaf) && value.includes("!")) {
      issues.push({ file: filename, key, value, problem: "exclamation mark in heading" });
    }
  }

  return issues;
}

const issues = [
  ...checkFile(en as Record<string, unknown>, "en.json", FORBIDDEN_EN),
  ...checkFile(es as Record<string, unknown>, "es.json", FORBIDDEN_ES),
];

if (issues.length > 0) {
  console.error(`${issues.length} voice issue(s) found:\n`);
  for (const { file, key, problem } of issues) {
    console.error(`  [${file}] ${key}: ${problem}`);
  }
  process.exit(1);
}

console.log("✓ Voice check passed — no forbidden words, em dashes, or heading exclamations found");
