import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The plan make.fun will carry out in public:
// one agent-executable plan to turn $100 into the most money in 30 days.
// Chosen after scoring 3 drafted candidates against the judge's 5 criteria
// (agent-executable, expected day-30 money, works today, concrete, edge).
// Final text: 279 Unicode code points, within the 1-280 gate.
const plan =
  "Day 1: post a $49 Fiverr gig: 500 verified US dental-clinic leads. " +
  "Scrape Maps, verify with Hunter, deliver CSV in 24h. " +
  "Spend $100 on Hunter/promotion. One order/day by day 10; " +
  "most likely $400-$700 day 30. " +
  "Edge: boring data work agents skip for trading; clinics reorder monthly.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), plan, "utf8");
