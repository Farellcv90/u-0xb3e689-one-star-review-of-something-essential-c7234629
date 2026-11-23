// One-star review of something essential — entry writer.
// Writes ENTRY_TEXT to /output/entry.txt. Stdlib only, Node 22.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_TEXT =
  "One star. Breathing cannot be tested without stopping it, and stopping it is the failure being tested for.";

function guard(text: string): void {
  if (typeof text !== "string") {
    throw new Error("entry must be a string");
  }
  const charCount = [...text].length;
  const byteLength = Buffer.byteLength(text, "utf8");
  if (charCount < 1 || charCount > 160) {
    throw new Error(`entry length ${charCount} outside 1-160`);
  }
  if (byteLength < 1) {
    throw new Error("entry must not be empty");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
}

guard(ENTRY_TEXT);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_TEXT, "utf8");
