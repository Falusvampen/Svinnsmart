import { readFileSync, writeFileSync } from "fs";
import path from "path";

// Import the function from the TypeScript source file
// ts-node (npx ts-node) will be used to run this script during test.
import { enrichItem } from "../src/utils/dataWasher";

const inputPath = path.join(__dirname, "..", "src", "utils", "testrun.json");
const outputPath = path.join(
  __dirname,
  "..",
  "src",
  "utils",
  "testrun.enriched.json",
);

function main() {
  const raw = JSON.parse(readFileSync(inputPath, "utf8"));
  const enriched = raw.map((it: any) =>
    enrichItem({
      id: it.id || 0,
      name:
        it.Name ||
        it.name ||
        it.NameEn ||
        it.nameEn ||
        it.displayName ||
        it.display ||
        it,
    }),
  );

  writeFileSync(outputPath, JSON.stringify(enriched, null, 2));

  // Print small summary
  const counts: Record<string, number> = {};
  enriched.forEach(
    (e: any) => (counts[e.category] = (counts[e.category] || 0) + 1),
  );

  console.log("Enriched items:", enriched.length);
  console.log("Category counts:", counts);
  console.log("Wrote:", outputPath);
  console.log("First 10 enriched items:");
  console.log(enriched.slice(0, 10));
}

main();
