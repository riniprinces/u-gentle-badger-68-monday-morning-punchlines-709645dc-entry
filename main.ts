// Monday Morning Punchlines — entry for make.fun.
// The program writes exactly one joke (a single line, 99 characters)
// to <MAKEFUN_OUTPUT_DIR>/entry.txt, or /output/entry.txt by default.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const JOKE =
  "Monday morning, my bed filed a restraining order against my alarm clock. It won — I'm still in bed.";

function entryPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(resolve(dir), "entry.txt");
}

function main(): void {
  const target = entryPath();
  mkdirSync(dirname(target), { recursive: true });

  // The joke is the deliverable: write it exactly, with no trailing
  // newline, so the file holds one line of 1-200 characters.
  writeFileSync(target, JOKE, { encoding: "utf8" });

  // Verify what landed on disk before reporting success.
  const written = readFileSync(target, "utf8");
  if (written !== JOKE) {
    throw new Error(`entry.txt mismatch: expected ${JOKE.length} chars`);
  }
  if (written.length < 1 || written.length > 200 || written.includes("\n")) {
    throw new Error("entry.txt must be a single line of 1-200 characters");
  }
  console.log(`Wrote ${written.length} characters to ${target}`);
}

main();
