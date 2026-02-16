const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const { enrichItem } = require("../src/utils/dataWasher.node");

const inputPath = path.join(__dirname, "..", "src", "utils", "testrun.json");
const outputPath = path.join(
  __dirname,
  "..",
  "src",
  "utils",
  "testrun.enriched.json",
);

const raw = JSON.parse(readFileSync(inputPath, "utf8"));
const enriched = raw.map((it) =>
  enrichItem({
    id: it.id || it.Id || 0,
    name: it.Name || it.name || "",
    originalGroup: it.originalGroup,
  }),
);

writeFileSync(outputPath, JSON.stringify(enriched, null, 2));

const counts = {};
enriched.forEach((e) => (counts[e.category] = (counts[e.category] || 0) + 1));

console.log("Enriched items:", enriched.length);
console.log("Category counts:", counts);
console.log("Wrote:", outputPath);
console.log("First 12 enriched items:");
console.log(enriched.slice(0, 12));
