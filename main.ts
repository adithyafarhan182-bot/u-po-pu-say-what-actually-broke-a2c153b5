// Say What Actually Broke — make.fun entry.
// Writes one single-line error message (123 chars) to /output/entry.txt.
// Node 22 stdlib only, deterministic, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Our database crashed mid-save, so your file is in limbo \u2014 not lost, just homeless. Hit save again and we'll give it a home.";

const OUT = "/output/entry.txt";

// The gate requires 1-200 chars, a single line, not only whitespace:
// fail loudly instead of writing an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n") || !ENTRY.trim()) {
  throw new Error(`entry is ${ENTRY.length} chars; must be a single line of 1-200 chars`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUT}`);
