#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const srcPath = path.resolve(__dirname, "../src/data/livsmedeldb.json");
const outPath = path.resolve(__dirname, "../src/models/foodGroup.ts");

async function main() {
  try {
    const raw = await fs.promises.readFile(srcPath, "utf8");
    const data = JSON.parse(raw);

    const groups = Array.from(
      new Set(
        (Array.isArray(data) ? data : [])
          .map((it) =>
            it && typeof it.Group === "string" ? it.Group.trim() : null,
          )
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b, "sv"));

    const arrayItems = groups.map((g) => `  ${JSON.stringify(g)}`).join(",\n");

    const file = `/**\n * AUTO-GENERATED from src/data/livsmedeldb.json\n * Kör: npm run generate:food-groups\n * Kommentar: Denna fil innehåller en runtime-array och en TypeScript-union-typ.\n * (Kommentarer i svenska enligt projektkonvention.)\n */\n\nexport const livsmedelsverketGroups = [\n${arrayItems}\n] as const;\n\nexport type LivsmedelsverketGroup = typeof livsmedelsverketGroups[number];\n`;

    let prev = null;
    try {
      prev = await fs.promises.readFile(outPath, "utf8");
    } catch (e) {
      /* ignore */
    }

    if (prev !== file) {
      await fs.promises.writeFile(outPath, file, "utf8");
      console.log(
        `Updated ${path.relative(process.cwd(), outPath)} (${groups.length} groups)`,
      );
    } else {
      console.log("No changes — already up to date.");
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

main();
