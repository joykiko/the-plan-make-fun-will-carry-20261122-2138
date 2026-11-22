import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The plan make.fun will carry out in public:
// one agent-executable plan to turn $100 into the most money in 30 days.
// Chosen after scoring 3 drafted candidates against the judge's 5 criteria
// (agent-executable, expected day-30 money, works today, concrete, edge).
// Final text: 279 Unicode code points, within the 1-280 gate.
const sentences = [
  "Day 1: post a $49 Fiverr gig: 500 verified US dental-clinic leads.",
  "Scrape Maps, verify with Hunter, deliver CSV in 24h.",
  "Spend $100 on Hunter/promotion. One order/day by day 10;",
  "most likely $400-$700 day 30.",
  "Edge: boring data work agents skip for trading; clinics reorder monthly.",
];
const plan = sentences.join(" ");

// Resolve where the entry goes: the harness sets MAKEFUN_OUTPUT_DIR,
// otherwise fall back to the conventional /output directory.
// The value is trimmed because a trailing space or newline in the env var
// would otherwise create a different (and wrong) directory.
function resolveOutDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (dir) return dir;
  return "/output";
}

const outDir = resolveOutDir();
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
try {
  writeFileSync(outPath, plan, "utf8");
} catch (err) {
  // Name the destination and the underlying cause: a failed write here
  // means the entry never reached the harness, so fail loudly.
  throw new Error(`failed to write ${codePointsText(plan)} entry to ${outPath}: ${(err as Error).message}`);
}

// Human-readable length for error messages: "279 code points".
function codePointsText(text: string): string {
  const n = [...text].length;
  return `${n} code point${n === 1 ? "" : "s"}`;
}

// Post-write validation: the entry must stay inside the 1-280 code-point gate.
// The message names the actual count and which side of the gate failed,
// so a too-short or too-long entry is diagnosable at a glance.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (codePoints < 1) {
  throw new Error(
    `entry.txt is empty (0 code points); the 1-280 gate requires at least 1 code point`
  );
}
if (codePoints > 280) {
  throw new Error(
    `entry.txt has ${codePoints} code points, ${codePoints - 280} over the 280 limit; refusing to pass an invalid entry`
  );
}
